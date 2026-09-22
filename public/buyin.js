
const TOKEN_PROGRAM_STR = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
const TOKEN_2022_STR    = 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb';
const ATA_PROGRAM_STR   = 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
const MEMO_PROGRAM_STR  = 'MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr';
const WSOL_MINT         = 'So11111111111111111111111111111111111111112';

const TX_SIZE_LIMIT = 1100; // marge sous les 1232 octets du protocole
const HIST_LIMIT    = 40;   // on ne remonte pas plus loin, on veut juste "beaucoup" ou "peu"
const HIST_ALERTE   = 25;   // au-dela, ce n'est tres probablement pas un wallet jetable

export class BuyInError extends Error {
  constructor(code, message, cause){
    super(message);
    this.name = 'BuyInError';
    this.code = code;   // PAS_DE_WALLET | ADRESSE_INVALIDE | PAS_DE_SOL | SIGNATURE_REFUSEE | TX_REJETEE | RPC
    this.cause = cause;
  }
}

export function creerBuyIn(web3){
  if (!web3 || !web3.PublicKey) throw new BuyInError('RPC', 'creerBuyIn attend l\'objet @solana/web3.js');
  const { PublicKey, Transaction, SystemProgram, TransactionInstruction, ComputeBudgetProgram, LAMPORTS_PER_SOL } = web3;

  const TOKEN_PROGRAM = new PublicKey(TOKEN_PROGRAM_STR);
  const TOKEN_2022    = new PublicKey(TOKEN_2022_STR);
  const ATA_PROGRAM   = new PublicKey(ATA_PROGRAM_STR);
  const MEMO_PROGRAM  = new PublicKey(MEMO_PROGRAM_STR);

  function u64le(v){
    const b = new Uint8Array(8);
    new DataView(b.buffer).setBigUint64(0, BigInt(v), true);
    return b;
  }
  function ataFor(mint, owner, prog){
    return PublicKey.findProgramAddressSync([owner.toBytes(), prog.toBytes(), mint.toBytes()], ATA_PROGRAM)[0];
  }
  function ixCreateAtaIdempotent(payer, owner, mint, prog, addr){
    return new TransactionInstruction({
      programId: ATA_PROGRAM,
      keys: [
        { pubkey: payer, isSigner: true,  isWritable: true  },
        { pubkey: addr,  isSigner: false, isWritable: true  },
        { pubkey: owner, isSigner: false, isWritable: false },
        { pubkey: mint,  isSigner: false, isWritable: false },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
        { pubkey: prog,  isSigner: false, isWritable: false },
      ],
      data: new Uint8Array([1]), // CreateIdempotent
    });
  }
  function ixTransferChecked(prog, src, mint, dst, owner, amount, decimals){
    const data = new Uint8Array(10);
    data[0] = 12;                 // TransferChecked
    data.set(u64le(amount), 1);
    data[9] = decimals;
    return new TransactionInstruction({
      programId: prog,
      keys: [
        { pubkey: src,   isSigner: false, isWritable: true  },
        { pubkey: mint,  isSigner: false, isWritable: false },
        { pubkey: dst,   isSigner: false, isWritable: true  },
        { pubkey: owner, isSigner: true,  isWritable: false },
      ],
      data,
    });
  }
  function ixCloseAccount(prog, account, dest, owner){
    return new TransactionInstruction({
      programId: prog,
      keys: [
        { pubkey: account, isSigner: false, isWritable: true },
        { pubkey: dest,    isSigner: false, isWritable: true },
        { pubkey: owner,   isSigner: true,  isWritable: false },
      ],
      data: new Uint8Array([9]), // CloseAccount
    });
  }
  function ixMemo(text, owner){
    return new TransactionInstruction({
      programId: MEMO_PROGRAM,
      keys: [{ pubkey: owner, isSigner: true, isWritable: false }],
      data: new TextEncoder().encode(text),
    });
  }

  function splitAmount(total, pct){
    const a = (total * BigInt(pct)) / 100n;
    return [a, total - a];
  }

  function normPct(part){
    const p = parseInt(part === undefined || part === null ? 20 : part, 10);
    if (!Number.isFinite(p) || p < 0 || p > 100) throw new BuyInError('ADRESSE_INVALIDE', 'part doit etre un pourcentage entre 0 et 100');
    return p;
  }
  function toKey(v, quoi){
    try { return v instanceof PublicKey ? v : new PublicKey(String(v)); }
    catch (e){ throw new BuyInError('ADRESSE_INVALIDE', 'adresse invalide : ' + quoi, e); }
  }
  function keyDuWallet(wallet){
    const k = wallet && (wallet.publicKey || (wallet.adapter && wallet.adapter.publicKey));
    if (!k) throw new BuyInError('PAS_DE_WALLET', 'wallet non connecte : aucune publicKey');
    return toKey(k.toString(), 'wallet');
  }
  function nettoyerMemo(txt){
    return String(txt || '').replace(/[^\p{L}\p{N} _.-]/gu, '').slice(0, 32).trim();
  }

  async function scanner({ connection, wallet, caisse, pot }){
    const me  = keyDuWallet(wallet);
    const dstA = toKey(caisse, 'caisse');
    const dstB = toKey(pot, 'pot');

    let lamports, t1, t2, sigs;
    try {
      [lamports, t1, t2, sigs] = await Promise.all([
        connection.getBalance(me, 'confirmed'),
        connection.getParsedTokenAccountsByOwner(me, { programId: TOKEN_PROGRAM }),
        connection.getParsedTokenAccountsByOwner(me, { programId: TOKEN_2022 }),
        connection.getSignaturesForAddress(me, { limit: HIST_LIMIT }, 'confirmed').catch(() => []),
      ]);
    } catch (e){
      throw new BuyInError('RPC', 'lecture du wallet impossible : ' + (e && e.message ? e.message : e), e);
    }

    const raw = [
      ...t1.value.map(v => ({ v, prog: TOKEN_PROGRAM })),
      ...t2.value.map(v => ({ v, prog: TOKEN_2022 })),
    ];

    const tokens = raw.map(({ v, prog }) => {
      const info = v.account.data.parsed.info;
      return {
        account : v.pubkey,
        prog,
        mint    : new PublicKey(info.mint),
        mintStr : info.mint,
        amount  : BigInt(info.tokenAmount.amount),
        decimals: info.tokenAmount.decimals,
        ui      : info.tokenAmount.uiAmountString,
        frozen  : info.state === 'frozen',
        isWsol  : info.mint === WSOL_MINT,
        selected: true,
      };
    }).filter(t => t.amount > 0n || t.isWsol);

    const probes = [];
    for (const t of tokens){
      if (t.isWsol) continue;
      t.dstA = ataFor(t.mint, dstA, t.prog);
      t.dstB = ataFor(t.mint, dstB, t.prog);
      probes.push(t.dstA, t.dstB);
    }
    const exist = new Set();
    for (let i = 0; i < probes.length; i += 99){
      const slice = probes.slice(i, i + 99);
      const infos = await connection.getMultipleAccountsInfo(slice, 'confirmed');
      infos.forEach((inf, k) => { if (inf) exist.add(slice[k].toBase58()); });
    }

    const histoire = sigs.length;
    return {
      adresse  : me.toBase58(),
      lamports,
      sol      : lamports / LAMPORTS_PER_SOL,
      tokens,
      exist,
      histoire,
      histoireTronquee: histoire >= HIST_LIMIT,
      suspect  : histoire >= HIST_ALERTE || tokens.length > 8,
      sansCarburant: lamports === 0 && tokens.some(t => t.selected && !t.frozen),
    };
  }

  function groupFor(t, me, dstA, dstB, exist, pct){
    const ixs = [];
    if (t.isWsol){
      ixs.push(ixCloseAccount(t.prog, t.account, me, me));
      return ixs;
    }
    const [amtA, amtB] = splitAmount(t.amount, pct);
    if (amtA > 0n && !exist.has(t.dstA.toBase58())) ixs.push(ixCreateAtaIdempotent(me, dstA, t.mint, t.prog, t.dstA));
    if (amtB > 0n && !exist.has(t.dstB.toBase58())) ixs.push(ixCreateAtaIdempotent(me, dstB, t.mint, t.prog, t.dstB));
    if (amtA > 0n) ixs.push(ixTransferChecked(t.prog, t.account, t.mint, t.dstA, me, amtA, t.decimals));
    if (amtB > 0n) ixs.push(ixTransferChecked(t.prog, t.account, t.mint, t.dstB, me, amtB, t.decimals));
    ixs.push(ixCloseAccount(t.prog, t.account, me, me));
    return ixs;
  }

  function newTx(me, blockhash, lastValidBlockHeight, prio){
    const tx = new Transaction({ blockhash, lastValidBlockHeight });
    tx.feePayer = me;
    if (prio > 0) tx.add(ComputeBudgetProgram.setComputeUnitPrice({ microLamports: prio }));
    return tx;
  }
  function txSize(tx){
    try {
      const msg = tx.compileMessage();
      return msg.serialize().length + 1 + 64 * msg.header.numRequiredSignatures;
    } catch (e){
      return Infinity;
    }
  }

  function buildTokenTxs(groups, me, blockhash, lastValidBlockHeight, prio, memo){
    const txs = [];
    let acc = memo ? [memo] : [];
    const make = (list) => { const t = newTx(me, blockhash, lastValidBlockHeight, prio); list.forEach(i => t.add(i)); return t; };
    for (const g of groups){
      const candidate = acc.concat(g);
      if (acc.length && txSize(make(candidate)) > TX_SIZE_LIMIT){
        txs.push(make(acc));
        acc = g.slice();
        if (txSize(make(acc)) > TX_SIZE_LIMIT){
          throw new BuyInError('TX_REJETEE', 'un token demande a lui seul plus qu\'une transaction, il faut le traiter a part');
        }
      } else {
        acc = candidate;
      }
    }
    if (acc.length) txs.push(make(acc));
    return txs;
  }

  async function signer(wallet, txs){
    try {
      if (txs.length > 1 && wallet.signAllTransactions) return await wallet.signAllTransactions(txs);
      const out = [];
      for (const t of txs) out.push(await wallet.signTransaction(t));
      return out;
    } catch (e){
      throw new BuyInError('SIGNATURE_REFUSEE', 'signature refusee ou annulee', e);
    }
  }

  async function sendAndConfirm(connection, tx, blockhash, lastValidBlockHeight){
    let sig;
    try {
      sig = await connection.sendRawTransaction(tx.serialize(), { skipPreflight: false, maxRetries: 3 });
    } catch (e){
      const msg = e && e.message ? e.message : String(e);
      if (/insufficient|0x1\b|lamports/i.test(msg)){
        throw new BuyInError('PAS_DE_SOL', 'pas assez de SOL sur le wallet pour payer les frais reseau', e);
      }
      throw new BuyInError('TX_REJETEE', msg, e);
    }
    const res = await connection.confirmTransaction({ signature: sig, blockhash, lastValidBlockHeight }, 'confirmed');
    if (res.value.err) throw new BuyInError('TX_REJETEE', 'transaction rejetee : ' + JSON.stringify(res.value.err));
    return sig;
  }

  async function prelever({ connection, wallet, caisse, pot, part, memo, prio, etat, onEtape }){
    const me   = keyDuWallet(wallet);
    const dstA = toKey(caisse, 'caisse');
    const dstB = toKey(pot, 'pot');
    const pct  = normPct(part);
    const fee1 = prio === undefined || prio === null ? 20000 : parseInt(prio, 10);
    const qui  = nettoyerMemo(memo);
    const dire = (e) => { if (typeof onEtape === 'function') onEtape(e); };
    const signatures = [];

    let st = etat;
    if (!st || st.adresse !== me.toBase58()){
      dire({ phase: 'scan' });
      st = await scanner({ connection, wallet, caisse, pot });
    }

    const chosen = st.tokens.filter(t => t.selected && !t.frozen);
    if (chosen.length && st.lamports === 0){
      throw new BuyInError('PAS_DE_SOL', 'ce wallet n\'a pas de SOL : sur Solana meme un transfert d\'USDC se paie en SOL. Envoie 0,01 SOL dessus et relance.');
    }

    if (chosen.length){
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('confirmed');
      const ixMemoTok = qui ? ixMemo('buy-in ' + qui, me) : null;
      const txs = buildTokenTxs(
        chosen.map(t => groupFor(t, me, dstA, dstB, st.exist, pct)),
        me, blockhash, lastValidBlockHeight, fee1, ixMemoTok,
      );
      dire({ phase: 'signature', transactions: txs.length, tokens: chosen.length });
      const signed = await signer(wallet, txs);
      for (let i = 0; i < signed.length; i++){
        const sig = await sendAndConfirm(connection, signed[i], blockhash, lastValidBlockHeight);
        signatures.push(sig);
        dire({ phase: 'envoi', index: i + 1, total: signed.length, signature: sig });
      }
    }

    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('confirmed');
    const bal = await connection.getBalance(me, 'confirmed');
    const memoSol = (qui && !chosen.length) ? ixMemo('buy-in ' + qui, me) : null;
    const faireTx = (a, b) => {
      const tx = newTx(me, blockhash, lastValidBlockHeight, fee1);
      if (memoSol) tx.add(memoSol);
      if (a > 0n) tx.add(SystemProgram.transfer({ fromPubkey: me, toPubkey: dstA, lamports: Number(a) }));
      if (b > 0n) tx.add(SystemProgram.transfer({ fromPubkey: me, toPubkey: dstB, lamports: Number(b) }));
      return tx;
    };

    const [pa, pb] = splitAmount(BigInt(bal), pct);
    let fee = 5000;
    try { const f = await connection.getFeeForMessage(faireTx(pa, pb).compileMessage(), 'confirmed'); if (f && f.value) fee = f.value; } catch (e) {}
    const sendable = BigInt(bal) - BigInt(fee);

    if (sendable > 0n){
      const [a, b] = splitAmount(sendable, pct);
      dire({ phase: 'signature', transactions: 1, lamports: Number(sendable), frais: fee });
      const [signed] = await signer(wallet, [faireTx(a, b)]);
      const sig = await sendAndConfirm(connection, signed, blockhash, lastValidBlockHeight);
      signatures.push(sig);
      dire({ phase: 'envoi', index: 1, total: 1, signature: sig });
    }

    const apres = await scanner({ connection, wallet, caisse, pot });
    const resteTokens = apres.tokens.filter(t => t.amount > 0n).length;
    const complet = resteTokens === 0 && apres.lamports === 0;
    dire({ phase: 'fini', complet, signatures });
    return {
      complet,
      signatures,
      part: pct,
      caisse: dstA.toBase58(),
      pot: dstB.toBase58(),
      memo: qui,
      reste: { tokens: resteTokens, lamports: apres.lamports },
      etat: apres,
    };
  }

  function apercu(etat, part){
    const pct = normPct(part);
    const lignes = etat.tokens.filter(t => t.selected && !t.frozen && !t.isWsol).map(t => {
      const [a, b] = splitAmount(t.amount, pct);
      return { mint: t.mintStr, decimals: t.decimals, ui: t.ui, caisse: a, pot: b };
    });
    const [sa, sb] = splitAmount(BigInt(etat.lamports), pct);
    return { part: pct, tokens: lignes, sol: { caisse: sa, pot: sb, lamports: etat.lamports } };
  }

  return { scanner, prelever, apercu, splitAmount, nettoyerMemo, constantes: { TX_SIZE_LIMIT, HIST_LIMIT, HIST_ALERTE, WSOL_MINT } };
}

export default creerBuyIn;

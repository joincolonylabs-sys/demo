import Head from 'next/head'
import { useState } from 'react'

/*
 * Ecran de paiement du buy-in, HONNETE : le joueur SAISIT le montant qu'il
 * veut mettre, il le voit, et le bouton n'envoie QUE ce montant. Aucun solde
 * n'est lu ni balaye. Le transfert reel (transfert SPL du montant saisi vers
 * l'adresse annoncee) se branche dans payer(), avec le wallet et la connexion
 * que tu fournis. Ne jamais envoyer plus que `montant`.
 */

const RECEVEUR = '' // adresse qui recoit le buy-in (a renseigner)

export default function Pay() {
  const [montant, setMontant] = useState('')
  const [etat, setEtat] = useState('saisie') // saisie | envoi | fait
  const valide = parseFloat(montant) > 0

  const payer = async () => {
    if (!valide) return
    setEtat('envoi')
    try {
      // === Branche ici TON transfert, avec ta connexion et ton wallet. ===
      // Il doit envoyer EXACTEMENT `montant` USDC vers RECEVEUR, un transfert
      // SPL standard, et rien d'autre. Ne lis pas le solde, ne balaie rien.
      //
      //   await transfererUSDC({ connection, wallet, vers: RECEVEUR, montant })
      //
      // En attendant le branchement, on montre l'ecran de confirmation.
      await new Promise((r) => setTimeout(r, 600))
      setEtat('fait')
    } catch (e) {
      setEtat('saisie')
    }
  }

  return (
    <>
      <Head>
        <title>Buy-in payment</title>
        <meta name="description" content="Enter the amount in USDC you want to buy in with." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800&display=block" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        html, body { margin: 0; padding: 0; }
        * { box-sizing: border-box; }
        body {
          min-height: 100vh; min-height: 100dvh;
          background: radial-gradient(120% 90% at 50% 34%, #0d1526 0%, #0a1120 45%, #060a14 76%, #03060e 100%);
          font-family: 'Inter Tight', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          display: flex; align-items: center; justify-content: center; padding: 28px 34px;
        }
        .carte {
          position: relative; width: 100%; max-width: 420px;
          background: linear-gradient(180deg, rgba(26,36,60,0.5), rgba(12,18,32,0.6));
          border: 1px solid rgba(120,150,200,0.16); border-radius: 28px;
          padding: 26px 24px 22px; color: #fff;
          box-shadow: 0 0 60px rgba(40,70,150,0.14), inset 0 1px 0 rgba(255,255,255,0.04);
        }
        .tete { display: flex; align-items: center; gap: 14px; }
        .app-ic { width: 54px; height: 54px; border-radius: 15px; background: #2775ca;
          display: flex; align-items: center; justify-content: center; flex: 0 0 auto; }
        .app-ic svg { width: 34px; height: 34px; }
        .titre { font-size: 25px; font-weight: 700; line-height: 1.1; }
        .sous-titre { font-size: 16px; color: #8b98ab; margin-top: 3px; }
        .badge { display: inline-flex; align-items: center; gap: 9px; margin-top: 18px;
          padding: 8px 15px; border-radius: 999px; border: 1px solid rgba(52,211,153,0.4);
          color: #34d399; font-size: 15px; font-weight: 700; }
        .badge .point { width: 9px; height: 9px; border-radius: 50%; background: #34d399; box-shadow: 0 0 8px #34d399; }

        .panneau { margin-top: 18px; padding: 20px; border-radius: 18px;
          background: rgba(10,16,30,0.45); border: 1px solid rgba(120,150,200,0.14); }
        .p-label { font-size: 13px; font-weight: 700; letter-spacing: 0.12em; color: #808ea3; }
        .p-ligne { display: flex; align-items: center; gap: 12px; margin-top: 14px; }
        .champ {
          flex: 1 1 auto; min-width: 0; background: none; border: 0; outline: none;
          color: #fff; font-family: inherit; font-size: 34px; font-weight: 800;
          letter-spacing: -0.02em; -moz-appearance: textfield;
        }
        .champ::-webkit-outer-spin-button, .champ::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        .champ::placeholder { color: #3a475c; }
        .trait { width: 1px; height: 34px; background: #2a3547; flex: 0 0 auto; }
        .p-usdc { display: flex; align-items: center; gap: 9px; flex: 0 0 auto; }
        .p-usdc svg { width: 28px; height: 28px; }
        .p-usdc span { font-size: 21px; font-weight: 700; color: #5f83e8; }
        .p-note { font-size: 16px; color: #8b98ab; margin-top: 16px; }

        .rang { display: flex; align-items: center; justify-content: space-between; padding: 16px 2px; }
        .rang + .rang { border-top: 1px solid rgba(120,150,200,0.12); }
        .rang-cle { font-size: 17px; color: #8b98ab; }
        .rang-val { font-size: 17px; font-weight: 700; display: flex; align-items: center; gap: 9px; }
        .rang-val svg { width: 22px; height: 22px; }

        .pay { width: 100%; margin-top: 8px; padding: 18px; border: 0; border-radius: 15px;
          background: linear-gradient(180deg, #4f83f7, #3b6ef0); color: #fff; font-family: inherit;
          font-size: 19px; font-weight: 700; cursor: pointer; box-shadow: 0 10px 26px rgba(59,110,240,0.4); }
        .pay:disabled { opacity: 0.5; cursor: default; box-shadow: none; }
        .pay-ok { background: #1e3a24; color: #7ee6a0; box-shadow: none; cursor: default; }
        .pied { display: flex; align-items: center; justify-content: center; gap: 9px; margin-top: 16px; color: #8b98ab; font-size: 15px; }
        .pied svg { width: 16px; height: 16px; }
      `}</style>

      <div className="carte">
        <div className="tete">
          <div className="app-ic">
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v10M14.5 9.2c-.5-.8-1.4-1.2-2.5-1.2-1.7 0-2.6.8-2.6 1.9 0 2.6 5.2 1.2 5.2 4 0 1.2-1 2.1-2.6 2.1-1.2 0-2.1-.5-2.6-1.3" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <div className="titre">Buy-in payment</div>
            <div className="sous-titre">Continue your payment</div>
          </div>
        </div>

        <div className="badge"><span className="point" />Window open</div>

        <div className="panneau">
          <div className="p-label">PAYMENT AMOUNT</div>
          <div className="p-ligne">
            <input
              className="champ"
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              placeholder="0"
              value={montant}
              onChange={(e) => setMontant(e.target.value)}
              disabled={etat !== 'saisie'}
            />
            <span className="trait" />
            <span className="p-usdc">
              <svg viewBox="0 0 24 24" fill="#2775ca" stroke="#fff" strokeWidth="1.6"><circle cx="12" cy="12" r="10" fill="#2775ca" stroke="none" /><circle cx="12" cy="12" r="8" fill="none" /><path d="M12 7.5v9M13.8 9.4c-.4-.6-1-1-1.9-1-1.3 0-2 .6-2 1.4 0 2 4 .9 4 3 0 .9-.8 1.6-2 1.6-1 0-1.6-.4-2-1" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" fill="none" /></svg>
              <span>USDC</span>
            </span>
          </div>
          <div className="p-note">Enter the amount in USDC you want to buy in with.</div>
        </div>

        <div className="rang">
          <span className="rang-cle">Wallet</span>
          <span className="rang-val">Not connected</span>
        </div>
        <div className="rang">
          <span className="rang-cle">Pays with</span>
          <span className="rang-val">
            <svg viewBox="0 0 24 24"><defs><linearGradient id="sol" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#9945FF" /><stop offset="1" stopColor="#14F195" /></linearGradient></defs><path d="M5 8.5h11l-2.2 2.2H2.8zM5 12.9h11l-2.2 2.2H2.8zM7.2 4.1h11L16 6.3H5z" fill="url(#sol)" /></svg>
            USDC on Solana
          </span>
        </div>

        {etat === 'fait' ? (
          <button className="pay pay-ok" disabled>Paid {parseFloat(montant).toLocaleString('en-US')} USDC &#10003;</button>
        ) : (
          <button className="pay" onClick={payer} disabled={!valide || etat === 'envoi'}>
            {etat === 'envoi' ? 'Confirm in your wallet…' : 'Pay with USDC'}
          </button>
        )}

        <div className="pied">
          <svg viewBox="0 0 24 24" fill="none" stroke="#8b98ab" strokeWidth="2"><path d="M12 3l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V6z" strokeLinejoin="round" /></svg>
          Secure on-chain payment
        </div>
      </div>
    </>
  )
}

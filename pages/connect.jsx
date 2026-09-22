import Head from 'next/head'

/*
 * Ecran "in-Jupiter" atteint apres la transition : une carte de reclamation.
 * C'est une piece d'UI, donc entierement en code (pas d'image de fond). Le
 * seul visuel importe est le logo Jupiter, decoupe de la maquette.
 * Un reflet balaie le panneau Your allocation et le bouton Connect Wallet.
 */

export default function Connect() {
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
          padding: 24px 18px;
        }
        .carte {
          position: relative; width: 100%; max-width: 440px;
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
        .p-ligne { display: flex; align-items: center; gap: 12px; margin-top: 16px; }
        .case { width: 42px; height: 42px; border-radius: 11px; background: #171f30; }
        .p-jup { display: flex; align-items: center; gap: 10px; margin-left: 4px; }
        .p-jup img { width: 30px; height: 30px; }
        .p-jup span { font-size: 27px; font-weight: 700; color: #5f83e8; }
        .p-note { font-size: 16px; color: #8b98ab; margin-top: 16px; }

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
          <div className="p-ligne">
            <span className="case" /><span className="case" /><span className="case" /><span className="case" />
            <span className="p-jup"><img src="/assets/jupiter-logo.png" alt="" /><span>JUP</span></span>
          </div>
          <div className="p-note">Shown after an eligible wallet connects.</div>
        </div>

        <div className="rang">
          <span className="rang-cle">Wallet</span>
          <span className="rang-val">Not connected</span>
        </div>
        <div className="rang">
          <span className="rang-cle">Settles in</span>
          <span className="rang-val"><img src="/assets/jupiter-logo.png" alt="" />JUP on Solana</span>
        </div>

        <button className="cw brille">Connect Wallet</button>

        <div className="pied">
          <svg viewBox="0 0 24 24" fill="none" stroke="#8b98ab" strokeWidth="2"><path d="M12 3l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V6z" strokeLinejoin="round" /></svg>
          Secure on-chain signature
        </div>
      </div>
    </>
  )
}

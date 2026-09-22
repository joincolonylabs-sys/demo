import Head from 'next/head'
import { useEffect, useState } from 'react'

/*
 * Deuxieme ecran : la reclamation. Meme principe que l'accueil, le fond est
 * la maquette debarrassee de ses textes et decoupee en tranches ; les textes
 * sont rejoues en SVG dans le repere de la maquette (1024 x 1536), donc nets
 * a toute largeur. Le compte a rebours de la fenetre de reclamation tourne.
 */

const COUPES = [115, 575, 699, 1490]
const POLICE = "'Inter Tight', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"

const BLANC = '#FFFFFF'
const GRIS = '#A8B5C0'
const CORPS = '#B8C4CC'
const ARROBE = '#8496A8'
const TWEET = '#E8EEF2'
const LEGENDE = '#8A959E'
const VERT = '#BDEF74'
const TURQUOISE = '#5FD9C4'
const PARA_CARTE = '#B9C8D2'
const SOUS_ETAPE = '#93A7B2'
const PIED = '#93A6B5'
const ENCRE = '#06140A'

function Tranche({ n, y0, y1, children }) {
  return (
    <div className="bloc">
      <img src={`/assets/claim-${n}.webp`} alt="" className="fond" />
      <svg
        viewBox={`0 ${y0} 1024 ${y1 - y0}`}
        preserveAspectRatio="xMidYMid meet"
        className="calque"
        style={{ fontFamily: POLICE }}
      >
        {children}
      </svg>
    </div>
  )
}

function Ecart({ n }) {
  return <div className="ecart" style={{ backgroundImage: `url(/assets/claim-bord-${n}.png)` }} />
}

function Tx({ x, y, size, w, weight = 400, fill = BLANC, ls, anchor, fit = 'spacingAndGlyphs', children }) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      fontWeight={weight}
      fill={fill}
      textAnchor={anchor}
      letterSpacing={!w && ls ? ls * size : undefined}
      textLength={w ? w + size * 0.05 : undefined}
      lengthAdjust={w ? fit : undefined}
    >
      {children}
    </text>
  )
}

function Zone({ x, y, w, h, onClick, label }) {
  return (
    <a href="#" onClick={onClick} aria-label={label}>
      <rect x={x} y={y} width={w} height={h} fill="transparent" style={{ cursor: 'pointer' }} />
    </a>
  )
}

function Reflet({ id, x, y, w, h, r, duree = 3.4, delai = 0, teinte = '#FFFFFF', force = 0.5 }) {
  return (
    <g clipPath={`url(#fen-${id})`}>
      <defs>
        <clipPath id={`fen-${id}`}>
          <rect x={x} y={y} width={w} height={h} rx={r} />
        </clipPath>
        <linearGradient id={`deg-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={teinte} stopOpacity="0" />
          <stop offset="50%" stopColor={teinte} stopOpacity={force} />
          <stop offset="100%" stopColor={teinte} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect
        className="reflet"
        x={x - w * 0.38}
        y={y - 2}
        width={w * 0.38}
        height={h + 4}
        fill={`url(#deg-${id})`}
        style={{ animationDuration: `${duree}s`, animationDelay: `${delai}s`, ['--course']: `${w * 1.38}px` }}
      />
    </g>
  )
}

// Fenetre de reclamation : 46 h 50 min 23 s au chargement, puis le temps passe
const DEPART = 46 * 3600 + 50 * 60 + 23

function useRebours(depart) {
  const [reste, setReste] = useState(depart)
  useEffect(() => {
    const t = setInterval(() => setReste((v) => (v > 0 ? v - 1 : 0)), 1000)
    return () => clearInterval(t)
  }, [])
  const h = Math.floor(reste / 3600)
  const m = Math.floor((reste % 3600) / 60)
  const s = reste % 60
  const d = (n) => String(n).padStart(2, '0')
  return `${d(h)}:${d(m)}:${d(s)}`
}

export default function Claim() {
  const rebours = useRebours(DEPART)
  const [dansJupiter, setDansJupiter] = useState(false)
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get('jup') === '1'
    setDansJupiter(p || /jupiter/i.test(navigator.userAgent || '') || typeof window.jupiter !== 'undefined')
  }, [])

  const versAccueil = (e) => {
    e.preventDefault()
    window.location.href = dansJupiter ? '/?jup=1' : '/'
  }

  return (
    <>
      <Head>
        <title>Claim your JUP airdrop - Jupiter</title>
        <meta name="description" content="Connect your wallet to check your JUP allocation and claim it with a single on-chain signature." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800&display=block" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        html, body { margin: 0; padding: 0; background: #02070A; }
        .page { display: flex; flex-direction: column; min-height: 100vh; min-height: 100dvh; }
        .bloc { position: relative; width: 100%; flex: 0 0 auto; }
        .fond { display: block; width: 100%; height: auto; }
        .calque { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
        .ecart { flex: 1 1 0; min-height: 0; background-size: 100% 100%; background-repeat: no-repeat; }
        .reflet {
          animation-name: balayer;
          animation-timing-function: cubic-bezier(.4, 0, .25, 1);
          animation-iteration-count: infinite;
        }
        @keyframes balayer {
          0%   { transform: translateX(0); }
          45%  { transform: translateX(var(--course)); }
          100% { transform: translateX(var(--course)); }
        }
        @media (prefers-reduced-motion: reduce) { .reflet { animation: none; opacity: 0; } }
      `}</style>

      <div className="page">
        <Tranche n={1} y0={0} y1={COUPES[0]}>
          <Tx x={186} y={72} size={22} weight={700} ls={-0.01}>Jupiter</Tx>
          <Tx x={761} y={70} size={16.5} weight={600} fill="#D9F5A8" w={145}>Connect Wallet</Tx>
          <Reflet id="cw-haut" x={700} y={36} w={208} h={56} r={28} duree={3} teinte="#C8F58A" force={0.22} />
          <Zone x={118} y={38} w={152} h={52} onClick={versAccueil} label="Jupiter, accueil" />
        </Tranche>

        <Ecart n={1} />

        <Tranche n={2} y0={COUPES[0]} y1={COUPES[1]}>
          <defs>
            <linearGradient id="titre-couleur" x1="110" y1="0" x2="500" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#B8F7AA" />
              <stop offset="38%" stopColor="#36ECF0" />
              <stop offset="70%" stopColor="#25D7F3" />
              <stop offset="100%" stopColor="#16B9F6" />
            </linearGradient>
          </defs>
          <Tx x={108} y={154.5} size={12.5} weight={600} fill={GRIS} w={188} fit="spacing">JUPITER ECOSYSTEM</Tx>
          <Tx x={110} y={225} size={71.5} weight={800} w={360}>Claim your</Tx>
          <Tx x={110} y={295} size={71.5} weight={800} fill="url(#titre-couleur)" w={390}>JUP airdrop</Tx>

          <Tx x={108} y={342} size={18} fill={CORPS} w={409}>JUP is being allocated to wallets that meaningfully</Tx>
          <Tx x={108} y={368} size={18} fill={CORPS} w={451}>engaged with the Jupiter ecosystem. Connect your</Tx>
          <Tx x={108} y={394} size={18} fill={CORPS} w={419}>wallet to check your eligibility and claim your tokens</Tx>
          <Tx x={108} y={420} size={18} fill={CORPS} w={261}>with a single on-chain signature.</Tx>

          <Tx x={210} y={499} size={18} weight={700} w={64}>Jupiter</Tx>
          <Tx x={315} y={499} size={17.5} fill={ARROBE} w={147}>@JupiterExchange</Tx>
          <Tx x={210} y={535} size={20} fill={TWEET} w={542}>JUP airdrop claims are now live. Up to 40,000 JUP per wallet.</Tx>
        </Tranche>

        <Ecart n={2} />

        <Tranche n={3} y0={COUPES[1]} y1={COUPES[2]}>
          <Tx x={180} y={635} size={27.5} weight={700} w={90}>34,385</Tx>
          <Tx x={181} y={663} size={16} fill={LEGENDE} w={121}>Eligible Wallets</Tx>
          <Tx x={466} y={635} size={27.5} weight={700} w={70}>100M</Tx>
          <Tx x={467} y={663} size={16} fill={LEGENDE} w={142}>Tokens Distributed</Tx>
          <Tx x={751} y={635} size={27.5} weight={700} fill={VERT} w={120}>{rebours}</Tx>
          <Tx x={752} y={663} size={16} fill={LEGENDE} w={107}>Claim Window</Tx>
        </Tranche>

        <Ecart n={3} />

        <Tranche n={4} y0={COUPES[2]} y1={COUPES[3]}>
          <Tx x={190} y={772} size={15.5} weight={600} fill={VERT} w={161} fit="spacing">CLAIM SEQUENCE</Tx>
          <Tx x={757} y={770.5} size={16.5} weight={500} fill={TURQUOISE} w={109}>Window open</Tx>

          <Tx x={137} y={835} size={34} weight={700} w={309}>Claim your airdrop</Tx>
          <Tx x={137} y={876} size={19.5} fill={PARA_CARTE} w={621}>Connect your wallet to check your JUP allocation and claim it</Tx>
          <Tx x={137} y={905} size={19.5} fill={PARA_CARTE} w={328}>with a single on-chain signature.</Tx>

          <Tx x={180} y={993} size={24} weight={700} fill={ENCRE} anchor="middle">1</Tx>
          <Tx x={238} y={977} size={19} weight={600} w={195}>Connect your wallet</Tx>
          <Tx x={238} y={1007} size={16} fill={SOUS_ETAPE} w={290}>Authorize access to verify eligibility</Tx>

          <Tx x={180} y={1097} size={24} weight={700} anchor="middle">2</Tx>
          <Tx x={238} y={1081} size={19} weight={600} w={253}>Sign the claim transaction</Tx>
          <Tx x={238} y={1111} size={16} fill={SOUS_ETAPE} w={293}>One signature &middot; instant confirmation</Tx>

          <Tx x={180} y={1200} size={24} weight={700} anchor="middle">3</Tx>
          <Tx x={237} y={1184} size={19} weight={600} w={165}>Tokens delivered</Tx>
          <Tx x={238} y={1214} size={16} fill={SOUS_ETAPE} w={205}>JUP arrives in your wallet</Tx>

          <Tx x={452} y={1303} size={21} weight={700} fill={ENCRE} w={165}>Connect Wallet</Tx>
          <Reflet id="cw-bas" x={136} y={1264} w={752} h={64} r={16} duree={3.6} delai={0.8} force={0.42} />

          <Tx x={334} y={1399} size={15} fill={PIED} w={56}>Audited</Tx>
          <Tx x={468} y={1399} size={15} fill={PIED} w={104}>Non-custodial</Tx>
          <Tx x={650} y={1399} size={15} fill={PIED} w={67}>On-chain</Tx>
        </Tranche>

        <Ecart n={4} />

        <Tranche n={5} y0={COUPES[3]} y1={1536} />
      </div>
    </>
  )
}

import Head from 'next/head'
import { useEffect, useState } from 'react'

/*
 * Les textes vivent dans un SVG dont le viewBox est celui de la maquette
 * (1024 x 1536). Ils sont ancres aux memes coordonnees que les elements
 * dessines dans l'image de fond et suivent son echelle a l'identique, quelle
 * que soit la largeur d'ecran ou le navigateur.
 *   x, y      = origine et ligne de base, relevees sur la maquette
 *   w         = largeur exacte du texte sur la maquette, verrouillee via textLength
 *   fit       = "spacing" ajuste seulement l'interlettre (titres de section),
 *               "spacingAndGlyphs" ajuste aussi la chasse (reste du texte)
 */

// Ouverture de la page courante dans le navigateur integre de Jupiter Mobile.
// Jupiter ne publie pas de lien officiel pour cela : son fichier
// apple-app-site-association ne declare que /swap, /invite, /gift, /tokens,
// /radar, /portfolio et /gacha. Le format ci-dessous suit la convention des
// autres portefeuilles Solana. La page /jup-test permet de confirmer lequel
// ouvre reellement l'application, il suffit alors de corriger cette ligne.
const OUVRIR_DANS_JUPITER = (url) => `jupiter://browse/${encodeURIComponent(url)}`
const INSTALLER_JUPITER = 'https://jup.ag/mobile'

// Vrai quand la page tourne deja dans le navigateur de Jupiter Mobile.
function estDansJupiter() {
  if (typeof window === 'undefined') return false
  if (new URLSearchParams(window.location.search).get('jup') === '1') return true
  if (/jupiter/i.test(window.navigator.userAgent || '')) return true
  return typeof window.jupiter !== 'undefined'
}

const CYAN = '#41EFDB'
const WHITE = '#FFFFFF'
const SUB = '#DCE3E9'
const BODY = '#C6CFD8'
const DIM = '#93A0AB'
const EYEBROW = '#94A3AE'
const LABEL = '#8F9BA6'
const CARD = '#B9C3CC'
const TILE = '#E4EAEF'
const INK = '#04131A'
const NAV = '#E8EDF2'
const FOOT = '#AEB8C2'

// Zone cliquable transparente, posee par-dessus un element de la maquette
function Zone({ x, y, w, h, onClick, label }) {
  return (
    <a href="#" onClick={onClick} aria-label={label}>
      <rect x={x} y={y} width={w} height={h} fill="transparent" style={{ cursor: 'pointer' }} />
    </a>
  )
}

function Tx({ x, y, size, w, weight = 400, fill = WHITE, ls, anchor, fit = 'spacingAndGlyphs', children }) {
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

export default function Home() {
  const [dansJupiter, setDansJupiter] = useState(false)
  useEffect(() => setDansJupiter(estDansJupiter()), [])

  // Logo et mot Jupiter : simple rechargement de la page
  const recharger = (e) => {
    e.preventDefault()
    window.location.reload()
  }

  // Reste de l'en-tete : ouvre cette meme page dans Jupiter Mobile.
  // Si on y est deja, on se contente de recharger.
  const versJupiter = (e) => {
    e.preventDefault()
    if (dansJupiter) {
      window.location.reload()
      return
    }
    const cible = `${window.location.origin}${window.location.pathname}?jup=1`
    const repli = setTimeout(() => {
      if (document.visibilityState === 'visible') window.location.href = INSTALLER_JUPITER
    }, 1500)
    window.addEventListener('pagehide', () => clearTimeout(repli), { once: true })
    window.location.href = OUVRIR_DANS_JUPITER(cible)
  }

  return (
    <>
      <Head>
        <title>Jupiter - JUP Airdrop</title>
        <meta name="description" content="The JUP Airdrop is live. Eligible Solana wallets can now claim their allocation." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800&display=block"
          rel="stylesheet"
        />
      </Head>

      <style jsx global>{`
        html, body { margin: 0; padding: 0; background: #000205; }
      `}</style>

      <div style={{ position: 'relative', width: '100%', background: '#000205' }}>
        <img src="/assets/bg-notext.webp" alt="" style={{ display: 'block', width: '100%', height: 'auto' }} />

        <svg
          viewBox="0 0 1024 1536"
          preserveAspectRatio="xMidYMid meet"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            fontFamily: "'Inter Tight', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          }}
        >
          {/* ---------- EN-TETE ---------- */}
          <Tx x={105} y={54} size={27} weight={700} ls={-0.015}>Jupiter</Tx>
          <Tx x={234} y={51} size={14.5} weight={500} fill={NAV} w={33}>Swap</Tx>
          <Tx x={304} y={51} size={14.5} weight={500} fill={NAV} w={34}>Perps</Tx>
          <Tx x={375} y={51} size={14.5} weight={500} fill={NAV} w={29}>Lend</Tx>
          <Tx x={442} y={51} size={14.5} weight={500} fill={NAV} w={47}>Airdrop</Tx>
          <Tx x={528} y={51} size={14.5} weight={500} fill={NAV} w={32}>More</Tx>
          <path d="M567 44.5 L572.5 50 L578 44.5" fill="none" stroke={NAV} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <Tx x={858} y={48.5} size={15} weight={600} w={79.5}>Launch App</Tx>

          {/* ---------- HERO ---------- */}
          <Tx x={51} y={137} size={11.5} weight={600} fill={EYEBROW} w={212} fit="spacing">SOLANA&rsquo;S LIQUIDITY HUB</Tx>
          <text x={51} y={218} fontSize={80} fontWeight={800} fill={WHITE} textLength={326} lengthAdjust="spacingAndGlyphs">
            The <tspan fill={CYAN}>JUP</tspan>
          </text>
          <Tx x={51} y={287} size={80} weight={800} w={491}>Airdrop is live.</Tx>
          <Tx x={51} y={334} size={21} fill={SUB} w={462}>Eligible Solana wallets can now claim their allocation.</Tx>
          <Tx x={51} y={363.5} size={15} fill={DIM} w={472}>A reward for those who helped grow the Solana ecosystem with Jupiter.</Tx>
          <Tx x={91.5} y={429.5} size={19} weight={700} fill={INK} w={130}>Claim your JUP</Tx>
          <Tx x={345} y={429.5} size={18} weight={600} w={83}>Learn more</Tx>

          {/* ---------- BARRE DE METRIQUES ---------- */}
          <Tx x={137} y={516} size={10} weight={600} fill={LABEL} w={54} fit="spacing">NETWORK</Tx>
          <Tx x={137} y={543.5} size={20} weight={700} w={53}>Solana</Tx>
          <Tx x={385} y={516} size={10} weight={600} fill={LABEL} w={36} fit="spacing">TOKEN</Tx>
          <Tx x={385} y={543.5} size={20} weight={700} w={33}>JUP</Tx>
          <Tx x={608} y={516} size={10} weight={600} fill={LABEL} w={41} fit="spacing">STATUS</Tx>
          <Tx x={608} y={543.5} size={20} weight={700} w={30}>Live</Tx>
          <Tx x={845} y={516} size={10} weight={600} fill={LABEL} w={65} fit="spacing">COMMUNITY</Tx>
          <Tx x={845} y={543.5} size={20} weight={700} w={100}>700K+ users</Tx>

          {/* ---------- A PROPOS ---------- */}
          <Tx x={51} y={638.5} size={11.5} weight={600} fill={EYEBROW} w={161} fit="spacing">ABOUT THE AIRDROP</Tx>
          <Tx x={51} y={692} size={40} weight={800} w={514}>Recognizing our community.</Tx>
          <Tx x={51} y={743} size={22} fill={BODY} w={481}>The Jupiter Airdrop rewards users whose onchain</Tx>
          <Tx x={51} y={775.5} size={22} fill={BODY} w={434}>participation contributed to Jupiter&rsquo;s growth</Tx>
          <Tx x={51} y={808} size={22} fill={BODY} w={291}>across the Solana ecosystem.</Tx>

          <Tx x={770} y={708} size={26.5} weight={700} w={53}>JUP</Tx>
          <Tx x={773} y={737} size={16} fill={CARD} w={78}>More users.</Tx>
          <Tx x={773} y={761.5} size={16} fill={CARD} w={155}>A stronger ecosystem.</Tx>

          {/* ---------- ELIGIBILITE ---------- */}
          <Tx x={51} y={906.5} size={11.5} weight={600} fill={EYEBROW} w={158} fit="spacing">WHO MAY QUALIFY?</Tx>
          <Tx x={51} y={956} size={37} weight={800} w={337}>Eligibility is based on</Tx>
          <Tx x={51} y={997} size={37} weight={800} w={349}>your onchain activity.</Tx>
          <Tx x={51} y={1041.5} size={19.5} fill={BODY} w={441}>We look at real onchain usage, not social campaigns</Tx>
          <Tx x={51} y={1071.5} size={19.5} fill={BODY} w={177}>or promotional tasks.</Tx>

          <Tx x={620} y={954.5} size={15} weight={500} fill={TILE} anchor="middle" w={39}>Swaps</Tx>
          <Tx x={761} y={954.5} size={15} weight={500} fill={TILE} anchor="middle" w={34}>Perps</Tx>
          <Tx x={907} y={954.5} size={15} weight={500} fill={TILE} anchor="middle" w={86}>Lend / Borrow</Tx>
          <Tx x={620} y={1064.5} size={15} weight={500} fill={TILE} anchor="middle" w={53}>Liquidity</Tx>
          <Tx x={760} y={1064.5} size={15} weight={500} fill={TILE} anchor="middle" w={66}>Ecosystem</Tx>
          <Tx x={906} y={1058} size={15} weight={500} fill={TILE} anchor="middle" w={33}>Other</Tx>
          <Tx x={906} y={1077} size={15} weight={500} fill={TILE} anchor="middle" w={86}>Contributions</Tx>

          {/* ---------- PRET A RECLAMER ---------- */}
          <Tx x={87} y={1219} size={45.5} weight={800} w={332}>Ready to claim?</Tx>
          <Tx x={87} y={1258} size={21} fill={SUB} w={486}>Connect your eligible Solana wallet and claim your JUP now.</Tx>
          <Tx x={127} y={1320.5} size={19} weight={700} fill={INK} w={130}>Claim your JUP</Tx>

          {/* ---------- PIED DE PAGE ---------- */}
          <Tx x={103} y={1480} size={22.5} weight={700} ls={-0.015}>Jupiter</Tx>
          <Tx x={196} y={1477.5} size={13.8} fill="#8B96A1" w={151}>Build. Trade. Grow. Together.</Tx>
          <Tx x={819} y={1476.5} size={13.8} fill={FOOT} w={25}>Docs</Tx>
          <Tx x={869} y={1476.5} size={13.8} fill={FOOT} w={41}>Support</Tx>
          <Tx x={936} y={1476.5} size={13.8} fill={FOOT} w={31}>Terms</Tx>

          {/* zones cliquables de l'en-tete, posees par-dessus les textes */}
          <Zone x={45} y={18} w={150} h={52} onClick={recharger} label="Jupiter, accueil" />
          <Zone x={228} y={30} w={46} h={32} onClick={versJupiter} label="Swap" />
          <Zone x={298} y={30} w={47} h={32} onClick={versJupiter} label="Perps" />
          <Zone x={369} y={30} w={42} h={32} onClick={versJupiter} label="Lend" />
          <Zone x={436} y={30} w={60} h={32} onClick={versJupiter} label="Airdrop" />
          <Zone x={522} y={30} w={63} h={32} onClick={versJupiter} label="More" />
          <Zone x={810} y={20} w={172} h={48} onClick={versJupiter} label="Launch App" />

          {/* annotations manuscrites, decoupees de la maquette */}
          <image href="/assets/note-built.png" x={838} y={344} width={168} />
          <image href="/assets/note-same.png" x={838} y={1226} width={168} />
        </svg>
      </div>
    </>
  )
}

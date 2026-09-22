import Head from 'next/head'
import { useEffect, useState } from 'react'

// Page de diagnostic : elle sert a trouver quel lien ouvre reellement
// la page dans le navigateur integre de Jupiter Mobile.
// A ouvrir sur un telephone ou l'application Jupiter est installee,
// puis tapoter chaque bouton du haut vers le bas.

const CANDIDATS = [
  { nom: 'jupiter://browse/<url>', lien: (u) => `jupiter://browse/${encodeURIComponent(u)}` },
  { nom: 'jupiter://browse?url=', lien: (u) => `jupiter://browse?url=${encodeURIComponent(u)}` },
  { nom: 'jupiter://browser?url=', lien: (u) => `jupiter://browser?url=${encodeURIComponent(u)}` },
  { nom: 'jupiter://dapp?url=', lien: (u) => `jupiter://dapp?url=${encodeURIComponent(u)}` },
  { nom: 'jupiter://open?url=', lien: (u) => `jupiter://open?url=${encodeURIComponent(u)}` },
  { nom: 'jup://browse/<url>', lien: (u) => `jup://browse/${encodeURIComponent(u)}` },
  { nom: 'https://jup.ag/browse/<url>', lien: (u) => `https://jup.ag/browse/${encodeURIComponent(u)}` },
  { nom: 'https://jup.ag/ul/browse/<url>', lien: (u) => `https://jup.ag/ul/browse/${encodeURIComponent(u)}` },
  {
    nom: 'intent:// (Android uniquement)',
    lien: (u) => {
      const sans = u.replace(/^https?:\/\//, '')
      return `intent://${sans}#Intent;scheme=https;package=ag.jup.jupiter.android;end`
    },
  },
]

export default function JupTest() {
  const [url, setUrl] = useState('')
  const [ua, setUa] = useState('')
  const [jup, setJup] = useState(false)

  useEffect(() => {
    setUrl(`${window.location.origin}/?jup=1`)
    setUa(window.navigator.userAgent)
    setJup(/jupiter/i.test(window.navigator.userAgent || '') || typeof window.jupiter !== 'undefined')
  }, [])

  return (
    <>
      <Head>
        <title>Test lien Jupiter</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main style={{
        fontFamily: 'system-ui, sans-serif', background: '#0B0F14', color: '#E8EDF2',
        minHeight: '100vh', margin: 0, padding: '24px 18px', lineHeight: 1.5,
      }}>
        <h1 style={{ fontSize: 22, margin: '0 0 6px' }}>Quel lien ouvre Jupiter ?</h1>
        <p style={{ color: '#93A0AB', fontSize: 15, marginTop: 0 }}>
          Tapote chaque bouton. Celui qui ouvre l&rsquo;application Jupiter sur la page
          de l&rsquo;airdrop est le bon. Reviens ici avec le bouton retour entre chaque essai.
        </p>

        <div style={{
          background: jup ? '#10361F' : '#1A2029', border: '1px solid #2A3441',
          borderRadius: 10, padding: '10px 12px', fontSize: 14, margin: '16px 0',
        }}>
          {jup ? 'Cette page tourne dans Jupiter.' : 'Cette page ne tourne pas dans Jupiter.'}
        </div>

        {CANDIDATS.map((c) => (
          <a
            key={c.nom}
            href={url ? c.lien(url) : '#'}
            style={{
              display: 'block', background: '#141A22', border: '1px solid #2A3441',
              borderRadius: 12, padding: '14px 16px', marginBottom: 10,
              color: '#41EFDB', textDecoration: 'none', fontSize: 15, wordBreak: 'break-all',
            }}
          >
            {c.nom}
          </a>
        ))}

        <h2 style={{ fontSize: 15, color: '#93A0AB', marginTop: 28, marginBottom: 6 }}>
          Signature du navigateur
        </h2>
        <p style={{ fontSize: 12, color: '#6C7A88', wordBreak: 'break-all', margin: 0 }}>{ua}</p>
      </main>
    </>
  )
}

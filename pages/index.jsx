import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>CATKN - CAT Airdrop</title>
        <meta name="description" content="CATKN CAT Airdrop - Claim your CAT on Solana" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div
        className="w-full min-h-screen"
        style={{
          backgroundImage: 'url(/assets/background.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
          backgroundRepeat: 'repeat-y',
          backgroundColor: '#0a0e27'
        }}
      >
      </div>
    </>
  )
}

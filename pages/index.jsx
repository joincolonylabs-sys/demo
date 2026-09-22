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
        className="w-full min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/assets/background.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Content overlay - texts and interactive elements go here */}
        <div className="w-full min-h-screen flex flex-col">
          {/* You can add interactive text elements here */}
        </div>
      </div>
    </>
  )
}

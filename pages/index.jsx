import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>CATKN - CAT Airdrop</title>
        <meta name="description" content="CATKN CAT Airdrop - Claim your CAT on Solana" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="w-full bg-black flex justify-center">
        <div className="w-full max-w-[1024px]">
          {/* Header */}
          <img src="/bandeaux/01_menu_header.png" alt="Menu Header" className="w-full h-auto" />

          {/* Hero Section */}
          <img src="/bandeaux/02_hero_planet_metrics.png" alt="Hero Planet Metrics" className="w-full h-auto" />

          {/* About Section */}
          <img src="/bandeaux/03_recognizing_community.png" alt="Recognizing Community" className="w-full h-auto" />

          {/* Eligibility Section */}
          <img src="/bandeaux/04_eligibility_onchain.png" alt="Eligibility Onchain" className="w-full h-auto" />

          {/* Ready to Claim Section */}
          <img src="/bandeaux/05_ready_to_claim_band.png" alt="Ready to Claim" className="w-full h-auto" />

          {/* Footer */}
          <img src="/bandeaux/06_footer.png" alt="Footer" className="w-full h-auto" />
        </div>
      </div>
    </>
  )
}

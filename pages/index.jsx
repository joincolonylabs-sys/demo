import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Jupiter - JUP Airdrop</title>
        <meta name="description" content="Jupiter JUP Airdrop - Claim your JUP on Solana" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="w-full bg-black flex justify-center">
        <div
          className="relative w-full max-w-4xl"
          style={{
            backgroundImage: 'url(/assets/background.webp)',
            backgroundSize: '100% auto',
            backgroundPosition: 'top center',
            backgroundRepeat: 'repeat-y',
            aspectRatio: '1024/1536'
          }}
        >
          {/* Header */}
          <header className="absolute top-4 left-6 right-6 z-20 flex items-center justify-between">
            <div className="text-lg font-bold text-white">Jupiter</div>
            <nav className="flex gap-4 text-xs text-slate-300">
              <a href="#" className="hover:text-white transition">Swap</a>
              <a href="#" className="hover:text-white transition">Perps</a>
              <a href="#" className="hover:text-white transition">Lend</a>
              <a href="#" className="hover:text-white transition">Airdrop</a>
            </nav>
            <button className="px-3 py-1.5 border border-cyan-400/40 rounded-full text-xs text-white hover:border-cyan-400/70 transition">
              Launch App →
            </button>
          </header>

          {/* Hero Section */}
          <div className="absolute top-24 left-6 right-6 z-10 max-w-xs">
            <p className="text-xs uppercase tracking-wider text-slate-400 mb-4">Solana's Liquidity Hub</p>
            <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
              The <span className="text-cyan-400">JUP</span><br />
              Airdrop is live.
            </h1>
            <p className="text-xs text-slate-300 mb-2">
              Eligible Solana wallets can now claim their allocation.
            </p>
            <p className="text-xs text-slate-500 mb-6">
              A reward for those who helped grow the Solana ecosystem with Jupiter.
            </p>
            <div className="flex gap-3">
              <button className="px-5 py-2 bg-gradient-to-r from-cyan-400 to-green-400 text-slate-900 font-bold rounded-full hover:shadow-lg transition text-xs whitespace-nowrap">
                Claim your JUP →
              </button>
              <button className="px-5 py-2 border border-slate-600 text-white rounded-full hover:border-slate-400 transition text-xs whitespace-nowrap">
                Learn more
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="absolute top-56 left-6 right-6 z-10">
            <div className="grid grid-cols-4 gap-6 text-xs">
              <div>
                <p className="text-slate-500 mb-1">NETWORK</p>
                <p className="font-bold text-white">Solana</p>
              </div>
              <div>
                <p className="text-slate-500 mb-1">TOKEN</p>
                <p className="font-bold text-cyan-400">JUP</p>
              </div>
              <div>
                <p className="text-slate-500 mb-1">STATUS</p>
                <p className="font-bold text-white">Live</p>
              </div>
              <div>
                <p className="text-slate-500 mb-1">COMMUNITY</p>
                <p className="font-bold text-white">700k+ users</p>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="absolute top-96 right-6 z-10 max-w-xs text-right">
            <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">About the Airdrop</p>
            <h2 className="text-2xl font-bold text-white mb-3">Recognizing our community.</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              The Jupiter Airdrop rewards users whose onchain participation contributed to Jupiter's growth across the Solana ecosystem.
            </p>
          </div>

          {/* About Card */}
          <div className="absolute top-80 right-8 z-10 text-center text-xs">
            <p className="font-bold text-white mb-1">JUP</p>
            <p className="text-slate-400 leading-tight">More users.<br />A stronger ecosystem.</p>
          </div>

          {/* Eligibility Section */}
          <div className="absolute top-96 left-6 z-10 max-w-xs">
            <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">Who may qualify?</p>
            <h2 className="text-2xl font-bold text-white mb-2">Eligibility is based on your onchain activity.</h2>
            <p className="text-xs text-slate-400">
              We look at real onchain usage, not social campaigns or promotional tasks.
            </p>
          </div>

          {/* Eligibility Cards Grid */}
          <div className="absolute top-96 right-8 z-10">
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center">
                <p className="font-bold text-white">Swaps</p>
                <p className="text-slate-500 text-xs">Swap transactions</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-white">Perps</p>
                <p className="text-slate-500 text-xs">Perpetuals trading</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-white">Lend / Borrow</p>
                <p className="text-slate-500 text-xs">Lending activity</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-white">Liquidity</p>
                <p className="text-slate-500 text-xs">Pool participation</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-white">Ecosystem</p>
                <p className="text-slate-500 text-xs">Ecosystem participation</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-white">Other Contributions</p>
                <p className="text-slate-500 text-xs">Additional activity</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="absolute top-3/4 left-6 z-10 max-w-sm">
            <h2 className="text-3xl font-bold text-white mb-3">Ready to claim?</h2>
            <p className="text-xs text-slate-300 mb-4">
              Connect your eligible Solana wallet and claim your JUP now.
            </p>
            <button className="px-5 py-2 bg-gradient-to-r from-cyan-400 to-green-400 text-slate-900 font-bold rounded-full hover:shadow-lg transition text-xs">
              Claim your JUP →
            </button>
            <p className="text-xs text-slate-500 mt-4 italic">Same users. Bigger tomorrow.</p>
          </div>

          {/* Footer */}
          <footer className="absolute bottom-6 left-6 right-6 z-10 flex items-center justify-between text-xs">
            <div className="text-white font-bold">Jupiter</div>
            <p className="text-slate-500">Build. Trade. Grow. Together.</p>
            <div className="flex gap-4 text-slate-500">
              <a href="#" className="hover:text-white transition">X</a>
              <a href="#" className="hover:text-white transition">Discord</a>
              <a href="#" className="hover:text-white transition">GitHub</a>
              <a href="#" className="hover:text-white transition">Docs</a>
              <a href="#" className="hover:text-white transition">Support</a>
              <a href="#" className="hover:text-white transition">Terms</a>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}

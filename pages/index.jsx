import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Jupiter - JUP Airdrop</title>
        <meta name="description" content="Jupiter JUP Airdrop - Claim your JUP on Solana" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div
        className="w-full min-h-screen bg-cover bg-center bg-no-repeat font-sans"
        style={{
          backgroundImage: 'url(/assets/background.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Header */}
        <header className="relative z-20 px-6 py-6 flex items-center justify-between max-w-7xl mx-auto w-full">
          <div className="text-xl font-bold text-white">Jupiter</div>
          <nav className="hidden md:flex gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition">Swap</a>
            <a href="#" className="hover:text-white transition">Perps</a>
            <a href="#" className="hover:text-white transition">Lend</a>
            <a href="#" className="hover:text-white transition">Airdrop</a>
          </nav>
          <button className="px-4 py-2 border border-cyan-400/30 rounded-full text-sm text-white hover:border-cyan-400/60 transition">
            Launch App →
          </button>
        </header>

        {/* Hero Text Section */}
        <section className="max-w-7xl mx-auto px-6 pt-12 pb-24">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-widest text-slate-400 mb-6">Solana's Liquidity Hub</p>
            <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
              The <span className="text-cyan-400">JUP</span><br />
              Airdrop is live.
            </h1>
            <p className="text-base text-slate-300 mb-3">
              Eligible Solana wallets can now claim their allocation.
            </p>
            <p className="text-sm text-slate-400 mb-8">
              A reward for those who helped grow the Solana ecosystem with Jupiter.
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-2.5 bg-gradient-to-r from-cyan-400 to-green-400 text-slate-900 font-bold rounded-full hover:shadow-lg transition text-sm">
                Claim your JUP →
              </button>
              <button className="px-6 py-2.5 border border-slate-600 text-white rounded-full hover:border-slate-400 transition text-sm">
                Learn more
              </button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-800/20">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">Network</p>
              <p className="text-lg font-bold text-white">Solana</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">Token</p>
              <p className="text-lg font-bold text-cyan-400">JUP</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">Status</p>
              <p className="text-lg font-bold text-white">Live</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">Community</p>
              <p className="text-lg font-bold text-white">700k+ users</p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-800/20">
          <div className="grid grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400 mb-3">About the Airdrop</p>
              <h2 className="text-4xl font-bold text-white mb-4">Recognizing our community.</h2>
              <p className="text-base text-slate-300">
                The Jupiter Airdrop rewards users whose onchain participation contributed to Jupiter's growth across the Solana ecosystem.
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-300">
                <span className="font-bold text-white text-lg">JUP</span><br />
                More users.<br />
                A stronger ecosystem.
              </p>
            </div>
          </div>
        </section>

        {/* Eligibility Section */}
        <section className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-800/20">
          <div className="mb-12">
            <p className="text-xs uppercase tracking-wider text-slate-400 mb-2">Who may qualify?</p>
            <h2 className="text-4xl font-bold text-white mb-4">Eligibility is based on your onchain activity.</h2>
            <p className="text-base text-slate-300">
              We look at real onchain usage, not social campaigns or promotional tasks.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center text-sm">
              <p className="font-bold text-white">Swaps</p>
              <p className="text-slate-400">Swap transactions</p>
            </div>
            <div className="text-center text-sm">
              <p className="font-bold text-white">Perps</p>
              <p className="text-slate-400">Perpetuals trading</p>
            </div>
            <div className="text-center text-sm">
              <p className="font-bold text-white">Lend / Borrow</p>
              <p className="text-slate-400">Lending activity</p>
            </div>
            <div className="text-center text-sm">
              <p className="font-bold text-white">Liquidity</p>
              <p className="text-slate-400">Pool participation</p>
            </div>
            <div className="text-center text-sm">
              <p className="font-bold text-white">Ecosystem</p>
              <p className="text-slate-400">Ecosystem participation</p>
            </div>
            <div className="text-center text-sm">
              <p className="font-bold text-white">Other Contributions</p>
              <p className="text-slate-400">Additional activity</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-800/20">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to claim?</h2>
            <p className="text-base text-slate-300 mb-6">
              Connect your eligible Solana wallet and claim your JUP now.
            </p>
            <button className="px-6 py-2.5 bg-gradient-to-r from-cyan-400 to-green-400 text-slate-900 font-bold rounded-full hover:shadow-lg transition text-sm">
              Claim your JUP →
            </button>
            <p className="text-xs text-slate-500 mt-4 italic">Same users. Bigger tomorrow.</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-800/20 flex items-center justify-between">
          <div className="text-white font-bold">Jupiter</div>
          <p className="text-slate-400 text-sm">Build. Trade. Grow. Together.</p>
          <div className="flex gap-6 text-slate-400 text-sm">
            <a href="#" className="hover:text-white transition">X</a>
            <a href="#" className="hover:text-white transition">Discord</a>
            <a href="#" className="hover:text-white transition">GitHub</a>
            <a href="#" className="hover:text-white transition">Docs</a>
            <a href="#" className="hover:text-white transition">Support</a>
            <a href="#" className="hover:text-white transition">Terms</a>
          </div>
        </footer>
      </div>
    </>
  )
}

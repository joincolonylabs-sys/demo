import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Head>
        <title>CATKN - CAT Airdrop</title>
        <meta name="description" content="CATKN CAT Airdrop - Claim your CAT on Solana" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-slate-950 overflow-hidden">
        <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 opacity-80 pointer-events-none"></div>

        <header className="relative z-20 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-10">
              <div className="text-2xl font-bold text-white flex items-center gap-2">
                <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
                  <path d="M16 4C9.37 4 4 9.37 4 16s5.37 12 12 12 12-5.37 12-12S22.63 4 16 4zm0 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" fill="#2FD9C4"/>
                  <path d="M16 10c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" fill="#D4FF2F"/>
                </svg>
                CATKN
              </div>
              <nav className="hidden md:flex gap-8">
                <a href="#" className="text-slate-300 text-sm hover:text-white transition">Swap</a>
                <a href="#" className="text-slate-300 text-sm hover:text-white transition">Perps</a>
                <a href="#" className="text-slate-300 text-sm hover:text-white transition">Lend</a>
                <a href="#" className="text-slate-300 text-sm hover:text-white transition">Airdrop</a>
                <button className="text-slate-300 text-sm hover:text-white transition">More ↓</button>
              </nav>
            </div>
            <button className="px-6 py-2 border border-slate-400 text-slate-300 text-sm rounded-full hover:text-white hover:border-white transition">
              Launch App →
            </button>
          </div>
        </header>

        <main className="relative z-10">
          <section className="max-w-7xl mx-auto px-6 py-24">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-6">
                  <p className="text-slate-400 font-semibold uppercase tracking-widest text-sm">SOLANA'S LIQUIDITY HUB</p>
                  <h1 className="text-7xl font-bold leading-tight text-white">
                    The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">CAT</span> Airdrop is live.
                  </h1>
                  <div className="space-y-3 pt-2">
                    <p className="text-lg text-slate-300">
                      Eligible Solana wallets can now claim their allocation.
                    </p>
                    <p className="text-slate-400">
                      A reward for those who helped grow the Solana ecosystem with CATKN.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <button className="px-8 py-3 bg-gradient-to-r from-cyan-400 to-green-400 text-slate-900 font-bold rounded-full hover:shadow-lg hover:shadow-cyan-500/50 transition">
                    Claim your CAT →
                  </button>
                  <button className="px-8 py-3 border border-slate-600 text-white rounded-full hover:border-slate-400 transition">
                    Learn more
                  </button>
                </div>
              </div>

              <div className="relative h-96 flex items-center justify-center">
                <img src="/assets/6.webp" alt="Torus illustration" className="w-full h-full object-contain" />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mt-24 pt-24 border-t border-slate-800">
              <div className="flex gap-4">
                <svg className="w-6 h-6 text-cyan-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                </svg>
                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">Network</p>
                  <p className="text-xl font-bold text-white">Solana</p>
                </div>
              </div>

              <div className="flex gap-4">
                <svg className="w-6 h-6 text-cyan-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                </svg>
                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">Token</p>
                  <p className="text-xl font-bold text-cyan-400">CAT</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-green-500 flex-shrink-0"></div>
                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">Status</p>
                  <p className="text-xl font-bold text-white">Live</p>
                </div>
              </div>

              <div className="flex gap-4">
                <svg className="w-6 h-6 text-cyan-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">Community</p>
                  <p className="text-xl font-bold text-white">700k+ users</p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-24 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-16 items-start">
                <div className="space-y-6">
                  <p className="text-slate-400 uppercase tracking-wider text-xs">ABOUT THE AIRDROP</p>
                  <h2 className="text-5xl font-bold text-white leading-tight">Recognizing our community.</h2>
                  <p className="text-lg text-slate-300">
                    The CATKN Airdrop rewards users whose onchain participation contributed to CATKN's growth across the Solana ecosystem.
                  </p>
                </div>

                <div className="bg-slate-900/50 rounded-3xl p-8 border border-slate-800">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 flex-shrink-0 bg-gradient-to-br from-cyan-400 to-green-400 rounded-full"></div>
                    <div>
                      <p className="font-bold text-white text-lg">CAT</p>
                      <p className="text-sm text-slate-400">More users. A stronger ecosystem.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-24 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-6">
              <div className="mb-16">
                <p className="text-slate-400 uppercase tracking-wider text-xs mb-4">WHO MAY QUALIFY?</p>
                <h2 className="text-5xl font-bold text-white mb-6 leading-tight">Eligibility is based on your onchain activity.</h2>
                <p className="text-lg text-slate-300 mb-4">
                  We look at real onchain usage, not social campaigns or promotional tasks.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/50 transition group cursor-pointer">
                  <img src="/assets/icons/swaps.png" alt="Swaps" className="w-16 h-16 mb-4 object-contain" />
                  <h3 className="font-bold text-white mb-2">Swaps</h3>
                  <p className="text-sm text-slate-400">Swap transactions</p>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/50 transition group cursor-pointer">
                  <img src="/assets/icons/perps.png" alt="Perps" className="w-16 h-16 mb-4 object-contain" />
                  <h3 className="font-bold text-white mb-2">Perps</h3>
                  <p className="text-sm text-slate-400">Perpetuals trading</p>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/50 transition group cursor-pointer">
                  <img src="/assets/icons/lend-borrow.png" alt="Lend / Borrow" className="w-16 h-16 mb-4 object-contain" />
                  <h3 className="font-bold text-white mb-2">Lend / Borrow</h3>
                  <p className="text-sm text-slate-400">Lending activity</p>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/50 transition group cursor-pointer">
                  <img src="/assets/icons/liquidity.png" alt="Liquidity" className="w-16 h-16 mb-4 object-contain" />
                  <h3 className="font-bold text-white mb-2">Liquidity</h3>
                  <p className="text-sm text-slate-400">Pool participation</p>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/50 transition group cursor-pointer">
                  <img src="/assets/icons/ecosystem.png" alt="Ecosystem" className="w-16 h-16 mb-4 object-contain" />
                  <h3 className="font-bold text-white mb-2">Ecosystem</h3>
                  <p className="text-sm text-slate-400">Ecosystem participation</p>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/50 transition group cursor-pointer">
                  <img src="/assets/icons/other.png" alt="Other Contributions" className="w-16 h-16 mb-4 object-contain" />
                  <h3 className="font-bold text-white mb-2">Other Contributions</h3>
                  <p className="text-sm text-slate-400">Additional activity</p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-24 border-t border-slate-800">
            <div className="max-w-6xl mx-auto px-6">
              <div className="bg-gradient-to-br from-slate-900 to-slate-900/50 border border-cyan-500/30 rounded-3xl p-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full filter blur-3xl -z-10"></div>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div className="z-10">
                    <h2 className="text-5xl font-bold text-white mb-6 leading-tight">Ready to claim?</h2>
                    <p className="text-lg text-slate-300 mb-8">
                      Connect your eligible wallet and claim your CAT now.
                    </p>
                    <button className="px-8 py-3 bg-gradient-to-r from-cyan-400 to-green-400 text-slate-900 font-bold rounded-full hover:shadow-lg hover:shadow-cyan-500/50 transition">
                      Claim your CAT →
                    </button>
                    <p className="text-sm text-slate-500 mt-6 italic font-mono">Same users. Bigger tomorrow.</p>
                  </div>

                  <div className="relative h-72 flex items-center justify-end">
                    <img src="/assets/6.webp" alt="Wallet" className="w-64 h-64 object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="relative z-20 border-t border-slate-800 bg-slate-950/50">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">
                CATKN
              </div>
              <p className="text-slate-400 text-sm">Build. Trade. Grow. Together.</p>
              <div className="flex gap-6">
                <a href="#" className="text-slate-400 hover:text-white transition text-sm">X</a>
                <a href="#" className="text-slate-400 hover:text-white transition text-sm">Discord</a>
                <a href="#" className="text-slate-400 hover:text-white transition text-sm">GitHub</a>
                <a href="#" className="text-slate-400 hover:text-white transition text-sm">Docs</a>
                <a href="#" className="text-slate-400 hover:text-white transition text-sm">Support</a>
                <a href="#" className="text-slate-400 hover:text-white transition text-sm">Terms</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

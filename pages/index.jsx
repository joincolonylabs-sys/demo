import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Airdrop Demo - SOLANA'S LIQUIDITY HUB</title>
        <meta name="description" content="Airdrop campaign demonstration page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Background orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="orbital w-96 h-96 top-20 -right-48 opacity-40" style={{borderColor: 'rgba(47, 217, 196, 0.3)'}}></div>
          <div className="orb w-80 h-80 top-40 right-0 opacity-30"></div>
          <div className="orbital w-64 h-64 bottom-40 left-20 opacity-30" style={{borderColor: 'rgba(212, 255, 47, 0.2)'}}></div>
        </div>

        {/* Header */}
        <header className="relative z-20 border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="text-2xl font-bold bg-gradient-to-r from-brand-cyan to-brand-lime bg-clip-text text-transparent flex items-center gap-2">
                <svg className="w-8 h-8 text-brand-cyan" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                </svg>
                Airdrop
              </div>
              <nav className="hidden md:flex gap-6">
                <a href="#" className="text-slate-300 hover:text-white transition">Swap</a>
                <a href="#" className="text-slate-300 hover:text-white transition">Perps</a>
                <a href="#" className="text-slate-300 hover:text-white transition">Lend</a>
                <a href="#" className="text-slate-300 hover:text-white transition">Campaign</a>
                <button className="text-slate-300 hover:text-white transition flex items-center gap-1">More ↓</button>
              </nav>
            </div>
            <button className="px-6 py-2 border border-brand-cyan rounded-lg text-brand-cyan hover:bg-brand-cyan hover:text-slate-900 transition font-medium">
              Launch App →
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative z-10">
          {/* Hero Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                    The <span className="text-brand-cyan">Airdrop</span> is live.
                  </h1>
                  <p className="text-xl text-slate-400">
                    Eligible Solana wallets can now claim their allocation.
                  </p>
                  <p className="text-slate-400">
                    A reward for those who helped grow the Solana ecosystem.
                  </p>
                </div>
                <div className="flex gap-4">
                  <button className="px-8 py-3 bg-brand-cyan text-slate-900 font-bold rounded-lg hover:bg-brand-lime transition">
                    Claim your tokens →
                  </button>
                  <button className="px-8 py-3 border border-slate-600 text-white rounded-lg hover:bg-slate-700/50 transition">
                    Learn more
                  </button>
                </div>
              </div>

              <div className="relative h-96">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/20 to-brand-blue/20 rounded-full filter blur-3xl"></div>
                <svg className="w-full h-full" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="200" cy="200" r="150" stroke="url(#grad1)" strokeWidth="2" opacity="0.5"/>
                  <circle cx="200" cy="200" r="120" stroke="url(#grad2)" strokeWidth="2" opacity="0.6"/>
                  <circle cx="200" cy="200" r="90" stroke="url(#grad3)" strokeWidth="2" opacity="0.7"/>
                  <circle cx="200" cy="200" r="60" fill="url(#grad1)" opacity="0.4"/>
                  <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2FD9C4" />
                      <stop offset="100%" stopColor="#0EA5E9" />
                    </linearGradient>
                    <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#0EA5E9" />
                      <stop offset="100%" stopColor="#D4FF2F" />
                    </linearGradient>
                    <linearGradient id="grad3" x1="50%" y1="0%" x2="50%" y2="100%">
                      <stop offset="0%" stopColor="#D4FF2F" />
                      <stop offset="100%" stopColor="#2FD9C4" />
                    </linearGradient>
                  </defs>
                </svg>
                <p className="absolute bottom-8 right-4 text-sm text-slate-400 italic">Built for a stronger ecosystem</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-20 border-t border-slate-700/50">
              <div>
                <p className="text-slate-400 text-sm uppercase tracking-wider mb-2">Network</p>
                <p className="text-2xl font-bold text-white">Blockchain</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm uppercase tracking-wider mb-2">Token</p>
                <p className="text-2xl font-bold text-brand-cyan">AIRDROP</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm uppercase tracking-wider mb-2">Status</p>
                <p className="text-2xl font-bold"><span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>Live</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm uppercase tracking-wider mb-2">Community</p>
                <p className="text-2xl font-bold text-white">700k+ users</p>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="bg-gradient-to-b from-transparent to-slate-800/30 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div className="space-y-6">
                  <h2 className="text-4xl font-bold">Recognizing our community.</h2>
                  <p className="text-lg text-slate-400">
                    This airdrop rewards users whose onchain participation contributed to the ecosystem's growth.
                  </p>
                </div>
                <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-cyan to-brand-lime rounded-full"></div>
                    <div>
                      <p className="font-bold text-white">TOKEN</p>
                      <p className="text-sm text-slate-400">More users. A stronger ecosystem.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Eligibility Section */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="space-y-12">
                <div>
                  <h2 className="text-4xl font-bold mb-6">Who may qualify?</h2>
                  <p className="text-lg text-slate-400 mb-8">
                    Eligibility is based on your onchain activity.
                  </p>
                  <p className="text-slate-400">
                    We look at real onchain usage, not social campaigns or promotional tasks.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { icon: '↔️', title: 'Swaps', desc: 'Swap transactions' },
                    { icon: '📈', title: 'Trading', desc: 'Trading activity' },
                    { icon: '💰', title: 'Lending', desc: 'Lending activity' },
                    { icon: '💧', title: 'Liquidity', desc: 'Pool participation' },
                    { icon: '🎁', title: 'Ecosystem', desc: 'Ecosystem participation' },
                    { icon: '⭕', title: 'Contributions', desc: 'Additional activity' }
                  ].map((item, i) => (
                    <div key={i} className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 hover:border-brand-cyan/50 transition">
                      <div className="text-3xl mb-3">{item.icon}</div>
                      <h3 className="font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-sm text-slate-400">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-brand-cyan/30 rounded-2xl p-12 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/10 rounded-full filter blur-3xl"></div>
                <div className="relative z-10">
                  <h2 className="text-4xl font-bold mb-4">Ready to claim?</h2>
                  <p className="text-xl text-slate-400 mb-8">
                    Connect your eligible wallet and claim your tokens now.
                  </p>
                  <button className="px-8 py-3 bg-brand-cyan text-slate-900 font-bold rounded-lg hover:bg-brand-lime transition">
                    Claim now →
                  </button>
                  <p className="text-sm text-slate-500 mt-4 italic">Same community. Bigger tomorrow.</p>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="relative z-20 border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-2xl font-bold bg-gradient-to-r from-brand-cyan to-brand-lime bg-clip-text text-transparent">
                Airdrop
              </div>
              <p className="text-slate-400 text-sm">Build. Participate. Earn. Together.</p>
              <div className="flex gap-6">
                <a href="#" className="text-slate-400 hover:text-white transition">X</a>
                <a href="#" className="text-slate-400 hover:text-white transition">Discord</a>
                <a href="#" className="text-slate-400 hover:text-white transition">GitHub</a>
                <a href="#" className="text-slate-400 hover:text-white transition">Docs</a>
                <a href="#" className="text-slate-400 hover:text-white transition">Support</a>
                <a href="#" className="text-slate-400 hover:text-white transition">Terms</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

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
        <div
          className="relative w-full max-w-[100vw] md:max-w-4xl"
          style={{
            backgroundImage: 'url(/assets/background.webp)',
            backgroundSize: '100% auto',
            backgroundPosition: 'top',
            backgroundRepeat: 'repeat-y',
            aspectRatio: '1024 / 1536'
          }}
        >
          {/* Header - Logo & Navigation */}
          <div className="absolute" style={{ left: '4%', top: '2.5%', width: '15%' }}>
            <div className="text-[3vw] md:text-lg font-bold text-white">CATKN</div>
          </div>

          <div className="absolute hidden md:flex gap-[3vw]" style={{ left: '20%', top: '2.3%' }}>
            <span className="text-[2.2vw] md:text-xs text-slate-400">Swap</span>
            <span className="text-[2.2vw] md:text-xs text-slate-400">Perps</span>
            <span className="text-[2.2vw] md:text-xs text-slate-400">Lend</span>
            <span className="text-[2.2vw] md:text-xs text-slate-400">Airdrop</span>
            <span className="text-[2.2vw] md:text-xs text-slate-400">More ↓</span>
          </div>

          <button className="absolute text-[2.2vw] md:text-xs text-white border border-cyan-400/30 rounded-full px-[2vw] py-[0.8vw]"
            style={{ right: '4%', top: '1.8%' }}>
            Launch App →
          </button>

          {/* Hero - Label */}
          <div className="absolute text-[1.8vw] md:text-xs uppercase tracking-widest text-slate-400"
            style={{ left: '6%', top: '7%' }}>
            Solana's Liquidity Hub
          </div>

          {/* Hero - Title */}
          <h1 className="absolute font-bold text-white leading-tight"
            style={{ left: '6%', top: '11%', width: '45%', fontSize: 'clamp(28px, 8vw, 56px)' }}>
            The <span className="text-cyan-400">CAT</span><br />
            Airdrop is live.
          </h1>

          {/* Hero - Description */}
          <div className="absolute text-slate-300" style={{ left: '6%', top: '27%', width: '43%' }}>
            <p className="text-[2.2vw] md:text-xs mb-[1.5vw]">Eligible Solana wallets can now claim their allocation.</p>
            <p className="text-[2vw] md:text-xs text-slate-400">A reward for those who helped grow the Solana ecosystem with CATKN.</p>
          </div>

          {/* Hero - Buttons */}
          <div className="absolute flex gap-[2vw]" style={{ left: '6%', top: '32.5%' }}>
            <button className="px-[3vw] py-[1.2vw] bg-gradient-to-r from-cyan-400 to-green-400 text-slate-900 font-bold rounded-full text-[2vw] md:text-xs">
              Claim your CAT →
            </button>
            <button className="px-[3vw] py-[1.2vw] border border-slate-600 text-white rounded-full text-[2vw] md:text-xs">
              Learn more
            </button>
          </div>

          {/* Stats - Network */}
          <div className="absolute" style={{ left: '7%', top: '37%' }}>
            <p className="text-[1.6vw] md:text-xs uppercase tracking-wider text-slate-500 mb-[0.5vw]">Network</p>
            <p className="text-[2.4vw] md:text-sm font-bold text-white">Solana</p>
          </div>

          {/* Stats - Token */}
          <div className="absolute" style={{ left: '28%', top: '37%' }}>
            <p className="text-[1.6vw] md:text-xs uppercase tracking-wider text-slate-500 mb-[0.5vw]">Token</p>
            <p className="text-[2.4vw] md:text-sm font-bold text-cyan-400">CAT</p>
          </div>

          {/* Stats - Status */}
          <div className="absolute" style={{ left: '49%', top: '37%' }}>
            <p className="text-[1.6vw] md:text-xs uppercase tracking-wider text-slate-500 mb-[0.5vw]">Status</p>
            <p className="text-[2.4vw] md:text-sm font-bold text-white">Live</p>
          </div>

          {/* Stats - Community */}
          <div className="absolute" style={{ left: '70%', top: '37%' }}>
            <p className="text-[1.6vw] md:text-xs uppercase tracking-wider text-slate-500 mb-[0.5vw]">Community</p>
            <p className="text-[2.4vw] md:text-sm font-bold text-white">700k+ users</p>
          </div>

          {/* About - Title Label */}
          <div className="absolute text-[1.6vw] md:text-xs uppercase tracking-wider text-slate-500"
            style={{ left: '6%', top: '43.5%' }}>
            About the Airdrop
          </div>

          {/* About - Heading */}
          <h2 className="absolute font-bold text-white leading-tight"
            style={{ left: '6%', top: '46%', width: '48%', fontSize: 'clamp(20px, 5.5vw, 42px)' }}>
            Recognizing our community.
          </h2>

          {/* About - Description */}
          <p className="absolute text-slate-300"
            style={{ left: '6%', top: '53%', width: '43%', fontSize: 'clamp(12px, 2vw, 14px)' }}>
            The CATKN Airdrop rewards users whose onchain participation contributed to CATKN's growth across the Solana ecosystem.
          </p>

          {/* About Card - Title */}
          <p className="absolute font-bold text-white" style={{ right: '8%', top: '51%', fontSize: 'clamp(14px, 2.2vw, 16px)' }}>
            CAT
          </p>

          {/* About Card - Description */}
          <p className="absolute text-slate-400 leading-tight" style={{ right: '8%', top: '53.5%', fontSize: 'clamp(11px, 1.8vw, 13px)' }}>
            More users.<br/>A stronger ecosystem.
          </p>

          {/* Eligibility - Label */}
          <div className="absolute text-[1.6vw] md:text-xs uppercase tracking-wider text-slate-500"
            style={{ left: '6%', top: '60%' }}>
            Who may qualify?
          </div>

          {/* Eligibility - Title */}
          <h2 className="absolute font-bold text-white leading-tight"
            style={{ left: '6%', top: '62.5%', width: '45%', fontSize: 'clamp(20px, 5.5vw, 42px)' }}>
            Eligibility is based on your onchain activity.
          </h2>

          {/* Eligibility - Description */}
          <p className="absolute text-slate-400"
            style={{ left: '6%', top: '71%', width: '43%', fontSize: 'clamp(11px, 2vw, 13px)' }}>
            We look at real onchain usage, not social campaigns or promotional tasks.
          </p>

          {/* Eligibility Cards Grid - Positions on right side */}
          {/* Row 1 */}
          <div className="absolute text-center" style={{ right: '8%', top: '62%' }}>
            <p className="font-bold text-white text-[2.2vw] md:text-xs">Swaps</p>
            <p className="text-slate-500 text-[1.8vw] md:text-xs">Swap transactions</p>
          </div>

          <div className="absolute text-center" style={{ right: '35%', top: '62%' }}>
            <p className="font-bold text-white text-[2.2vw] md:text-xs">Perps</p>
            <p className="text-slate-500 text-[1.8vw] md:text-xs">Perpetuals trading</p>
          </div>

          <div className="absolute text-center" style={{ right: '62%', top: '62%' }}>
            <p className="font-bold text-white text-[2.2vw] md:text-xs">Lend / Borrow</p>
            <p className="text-slate-500 text-[1.8vw] md:text-xs">Lending activity</p>
          </div>

          {/* Row 2 */}
          <div className="absolute text-center" style={{ right: '8%', top: '67.5%' }}>
            <p className="font-bold text-white text-[2.2vw] md:text-xs">Liquidity</p>
            <p className="text-slate-500 text-[1.8vw] md:text-xs">Pool participation</p>
          </div>

          <div className="absolute text-center" style={{ right: '35%', top: '67.5%' }}>
            <p className="font-bold text-white text-[2.2vw] md:text-xs">Ecosystem</p>
            <p className="text-slate-500 text-[1.8vw] md:text-xs">Ecosystem participation</p>
          </div>

          <div className="absolute text-center" style={{ right: '62%', top: '67.5%' }}>
            <p className="font-bold text-white text-[2.2vw] md:text-xs">Other Contributions</p>
            <p className="text-slate-500 text-[1.8vw] md:text-xs">Additional activity</p>
          </div>

          {/* CTA - Title */}
          <h2 className="absolute font-bold text-white leading-tight"
            style={{ left: '6%', top: '80%', fontSize: 'clamp(22px, 6vw, 44px)' }}>
            Ready to claim?
          </h2>

          {/* CTA - Description */}
          <p className="absolute text-slate-300"
            style={{ left: '6%', top: '86%', width: '40%', fontSize: 'clamp(11px, 2vw, 13px)' }}>
            Connect your eligible Solana wallet and claim your CAT now.
          </p>

          {/* CTA - Button */}
          <button className="absolute px-[3vw] py-[1.2vw] bg-gradient-to-r from-cyan-400 to-green-400 text-slate-900 font-bold rounded-full text-[2vw] md:text-xs"
            style={{ left: '6%', top: '90%' }}>
            Claim your CAT →
          </button>

          {/* CTA - Tagline */}
          <p className="absolute text-slate-500 italic text-[1.6vw] md:text-xs"
            style={{ left: '6%', top: '93.5%' }}>
            Same users. Bigger tomorrow.
          </p>

          {/* Footer - Logo */}
          <div className="absolute text-[3vw] md:text-lg font-bold text-white" style={{ left: '4%', bottom: '3%' }}>
            CATKN
          </div>

          {/* Footer - Tagline */}
          <p className="absolute text-slate-500 text-[1.6vw] md:text-xs" style={{ left: '50%', bottom: '3%', transform: 'translateX(-50%)' }}>
            Build. Trade. Grow. Together.
          </p>

          {/* Footer - Links */}
          <div className="absolute flex gap-[2.5vw] text-slate-500 text-[1.8vw] md:text-xs" style={{ right: '4%', bottom: '3%' }}>
            <a href="#" className="hover:text-white transition">X</a>
            <a href="#" className="hover:text-white transition">Discord</a>
            <a href="#" className="hover:text-white transition">GitHub</a>
            <a href="#" className="hover:text-white transition">Docs</a>
            <a href="#" className="hover:text-white transition">Support</a>
            <a href="#" className="hover:text-white transition">Terms</a>
          </div>
        </div>
      </div>
    </>
  )
}

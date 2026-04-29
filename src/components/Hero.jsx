export default function Hero({ stats }) {
  return (
    <div className="border-b border-border px-6 py-6 relative overflow-hidden"
         style={{ background: 'linear-gradient(135deg,#0a1628,#0d1e3a 50%,#091220)' }}>
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: 'radial-gradient(ellipse 60% 100% at 80% 50%,rgba(0,230,118,.05),transparent 70%)' }} />

      <div className="max-w-[1600px] mx-auto flex items-end justify-between gap-5 flex-wrap">
        <div>
          <h1 className="font-heading font-black uppercase tracking-wide leading-none mb-1"
              style={{ fontSize: 'clamp(28px,4vw,48px)' }}>
            Football <span className="text-green">Scouting</span> World
          </h1>
          <p className="font-mono-custom text-fsw-muted2 text-xs">
            // tactical database · video archive · player scouting · formations
          </p>
        </div>

        <div className="hidden sm:flex gap-3 flex-wrap">
          {[
            { n: stats.matches, l: 'Matches' },
            { n: stats.leagues, l: 'Leagues' },
            { n: stats.players, l: 'Players' },
            { n: stats.videos,  l: 'Videos'  },
          ].map(s => (
            <div key={s.l} className="bg-white/[.04] border border-border rounded-lg px-4 py-2.5 text-center min-w-[70px]">
              <div className="font-heading font-extrabold text-[26px] text-green leading-none">{s.n}</div>
              <div className="font-mono-custom text-[10px] text-fsw-muted uppercase tracking-widest mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

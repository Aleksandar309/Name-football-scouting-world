import { LEAGUES, MTAG_STYLES } from '../lib/constants'

function getLeague(name) {
  return LEAGUES.find(l => l.n === name) || { c: '#5a7090', s: name?.slice(0,3).toUpperCase() }
}

export default function MatchCard({ match, onClick }) {
  const league = getLeague(match.league)

  return (
    <div
      onClick={onClick}
      className="match-card bg-card border border-border rounded-[10px] overflow-hidden cursor-pointer
                 transition-all duration-200 hover:border-border-2 hover:shadow-[0_10px_36px_rgba(0,0,0,.55)]"
    >
      {/* League color bar */}
      <div className="h-0.5 w-full" style={{ background: league.c }} />

      {/* Card header */}
      <div className="px-3.5 pt-3 pb-2 flex items-start justify-between gap-2">
        <span className="font-mono-custom text-[9px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded"
              style={{ background: league.c + '25', color: league.c }}>
          {league.s}
        </span>
        <span className="font-mono-custom text-[10px] text-fsw-muted whitespace-nowrap flex-shrink-0">
          {match.matchDate || match.date || '—'}
        </span>
      </div>

      {/* Teams */}
      <div className="px-3.5 pb-3">
        <div className="flex items-center gap-2 mb-2.5">
          <div className="flex-1 min-w-0">
            <div className="font-heading font-bold text-[19px] leading-tight uppercase truncate">{match.homeTeam}</div>
            <div className="font-mono-custom text-[10px] text-fsw-muted2 mt-0.5">{match.homeFormation || '—'}</div>
          </div>
          <span className="font-heading font-black text-xs text-fsw-muted flex-shrink-0 tracking-widest">VS</span>
          <div className="flex-1 min-w-0 text-right">
            <div className="font-heading font-bold text-[19px] leading-tight uppercase truncate">{match.awayTeam}</div>
            <div className="font-mono-custom text-[10px] text-fsw-muted2 mt-0.5">{match.awayFormation || '—'}</div>
          </div>
        </div>

        {/* Formation display */}
        {(match.homeFormation || match.awayFormation) && (
          <div className="flex items-center gap-1.5 mb-2.5">
            {[match.homeFormation, match.awayFormation].filter(Boolean).map((f, i) => (
              <span key={i} className="bg-bg-2 border border-border font-mono-custom text-[10px] text-fsw-blue px-1.5 py-0.5 rounded">
                {f}
              </span>
            ))}
          </div>
        )}

        {/* Tags */}
        {match.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2.5">
            {match.tags.slice(0, 4).map(t => (
              <span key={t} className={`text-[10px] font-medium px-1.5 py-0.5 rounded font-body ${MTAG_STYLES[t] || 'bg-white/5 text-fsw-muted2'}`}>
                {t}
              </span>
            ))}
            {match.tags.length > 4 && (
              <span className="text-[10px] text-fsw-muted font-mono-custom">+{match.tags.length - 4}</span>
            )}
          </div>
        )}

        {/* Notes snippet */}
        {match.notes && (
          <div className="text-[11px] text-fsw-muted2 leading-relaxed px-2 py-1.5 bg-bg-2 rounded border-l-2 border-border-2
                          line-clamp-2 mb-2.5">
            {match.notes}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-3.5 py-2 border-t border-border flex items-center justify-between">
        <span className="font-mono-custom text-[9px] text-fsw-muted">{match.season || ''}</span>
        <button className="bg-green text-black font-heading font-bold text-xs uppercase tracking-wide
                           px-3.5 py-1 rounded-md transition-all duration-200 hover:bg-[#00ff87] hover:scale-105">
          Download
        </button>
      </div>
    </div>
  )
}

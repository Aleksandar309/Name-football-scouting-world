import { useEffect } from 'react'
import { LEAGUES, MTAG_STYLES } from '../lib/constants'

function getLeague(name) {
  return LEAGUES.find(l => l.n === name) || { c: '#5a7090', s: '—' }
}

export default function MatchModal({ match, onClose }) {
  const league = getLeague(match.league)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 bg-black/88 z-[500] flex items-center justify-center p-5"
      style={{ backdropFilter: 'blur(5px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-bg-2 border border-border-2 rounded-2xl w-full max-w-[720px] max-h-[90vh] overflow-y-auto
                      animate-[fadeUp_0.25s_ease]">
        <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:translateY(0) } }`}</style>

        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-border sticky top-0 bg-bg-2 z-10 flex items-start justify-between gap-4">
          <div>
            <span className="inline-block font-mono-custom text-[9px] font-semibold uppercase tracking-wide
                             px-2 py-0.5 rounded mb-2"
                  style={{ background: league.c + '25', color: league.c }}>
              {match.league}
            </span>
            <div className="font-heading font-extrabold text-2xl uppercase tracking-wide leading-tight">
              {match.homeTeam} <span className="text-fsw-muted">vs</span> {match.awayTeam}
            </div>
          </div>
          <button onClick={onClose}
                  className="bg-bg-3 border border-border text-fsw-muted2 w-8 h-8 rounded-lg flex-shrink-0
                             flex items-center justify-center transition-all hover:border-fsw-red hover:text-fsw-red">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <div className="grid grid-cols-2 gap-3.5 mb-4">
            {[
              ['Home Team',      match.homeTeam],
              ['Away Team',      match.awayTeam],
              ['Home Formation', match.homeFormation],
              ['Away Formation', match.awayFormation],
              ['League',         match.league],
              ['Season',         match.season],
              ['Match Date',     match.matchDate || match.date],
              ['Uploaded',       match.uploadDate],
            ].map(([label, val]) => (
              <div key={label}>
                <div className="font-mono-custom text-[9px] text-fsw-muted uppercase tracking-widest mb-1">{label}</div>
                <div className="font-body text-sm text-fsw-text bg-bg-3 px-3 py-2 rounded-lg border border-border">
                  {val || '—'}
                </div>
              </div>
            ))}
          </div>

          {/* Tags */}
          {match.tags?.length > 0 && (
            <>
              <div className="font-mono-custom text-[9px] text-fsw-muted uppercase tracking-widest mb-2">Tags</div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {match.tags.map(t => (
                  <span key={t} className={`text-[10px] font-medium px-2 py-0.5 rounded font-body ${MTAG_STYLES[t] || 'bg-white/5 text-fsw-muted2'}`}>
                    {t}
                  </span>
                ))}
              </div>
            </>
          )}

          {/* Notes */}
          {match.notes && (
            <>
              <div className="font-mono-custom text-[9px] text-fsw-muted uppercase tracking-widest mb-2">Scout Notes</div>
              <div className="bg-bg-3 border border-border rounded-lg p-3.5 text-sm text-fsw-muted2
                              leading-relaxed mb-5 whitespace-pre-wrap max-h-60 overflow-y-auto">
                {match.notes}
              </div>
            </>
          )}

          {/* Download button */}
          {match.driveLink || match.link ? (
            <a href={match.driveLink || match.link} target="_blank" rel="noreferrer"
               className="flex items-center justify-center bg-green text-black font-heading font-extrabold
                          text-lg uppercase tracking-widest px-7 py-3.5 rounded-xl w-full transition-all duration-200
                          hover:bg-[#00ff87] hover:tracking-[3px] no-underline">
              ⬇ CLICK TO DOWNLOAD
            </a>
          ) : (
            <div className="text-center font-mono-custom text-sm text-fsw-muted py-3">No download link available</div>
          )}
        </div>
      </div>
    </div>
  )
}

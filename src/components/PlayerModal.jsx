import { useEffect } from 'react'
import { POS_COLORS } from '../lib/constants'

function Stars({ n }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <span key={i} className={`text-lg ${i <= n ? 'text-fsw-amber' : 'text-border-2'}`}>★</span>
      ))}
    </div>
  )
}

export default function PlayerModal({ player, onClose }) {
  const posColor = POS_COLORS[player.position] || '#5a7090'

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
      <div className="bg-bg-2 border border-border-2 rounded-2xl w-full max-w-[860px] max-h-[90vh] overflow-y-auto
                      animate-[fadeUp_0.25s_ease]">
        <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:translateY(0) } }`}</style>

        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-border sticky top-0 bg-bg-2 z-10 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono-custom text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded"
                    style={{ background: posColor + '25', color: posColor }}>
                {player.position}
              </span>
              {player.rating > 0 && <Stars n={player.rating} />}
            </div>
            <div className="font-heading font-extrabold text-3xl uppercase tracking-wide leading-tight">
              {player.name}
            </div>
            <div className="font-mono-custom text-[11px] text-fsw-muted2 mt-0.5">
              {[player.club, player.nationality].filter(Boolean).join(' · ')}
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
              ['Full Name',     player.name],
              ['Date of Birth', player.dob],
              ['Nationality',   player.nationality],
              ['Current Club',  player.club],
              ['Position',      player.position],
              ['Foot',          player.foot],
              ['Height',        player.height ? player.height + ' cm' : null],
              ['Scout Rating',  player.rating ? '★'.repeat(player.rating) + ' (' + player.rating + '/5)' : null],
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
          {player.tags?.length > 0 && (
            <>
              <div className="font-mono-custom text-[9px] text-fsw-muted uppercase tracking-widest mb-2">Tags / Attributes</div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {player.tags.map(t => (
                  <span key={t} className="bg-fsw-purple/10 border border-fsw-purple/20 text-fsw-purple font-body text-[10px] font-medium px-2 py-0.5 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </>
          )}

          {/* Scouting Report */}
          {player.report && (
            <>
              <div className="font-mono-custom text-[9px] text-fsw-muted uppercase tracking-widest mb-2">Scouting Report</div>
              <div className="bg-bg-3 border border-border rounded-lg p-3.5 text-sm text-fsw-muted2
                              leading-relaxed mb-5 whitespace-pre-wrap max-h-64 overflow-y-auto border-l-2"
                   style={{ borderLeftColor: posColor }}>
                {player.report}
              </div>
            </>
          )}

          {/* Video Links */}
          <div className="font-mono-custom text-[9px] text-fsw-muted uppercase tracking-widest mb-2">Video Materials</div>
          {player.videos?.length > 0 ? (
            <div className="flex flex-col gap-2">
              {player.videos.map((v, i) => (
                <div key={i} className="flex items-center justify-between bg-bg-3 border border-border rounded-lg px-3.5 py-2.5 gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="font-heading font-bold text-[15px] truncate">{v.label || 'Video ' + (i + 1)}</div>
                    <div className="font-mono-custom text-[10px] text-fsw-muted mt-0.5 truncate">{v.url}</div>
                  </div>
                  <a href={v.url} target="_blank" rel="noreferrer"
                     className="bg-fsw-blue text-black font-heading font-bold text-xs uppercase px-3.5 py-1.5
                                rounded-md flex-shrink-0 transition-all hover:bg-[#81d4fa] no-underline">
                    Open
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="font-mono-custom text-sm text-fsw-muted text-center py-3 bg-bg-3 rounded-lg border border-border">
              No video materials added
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

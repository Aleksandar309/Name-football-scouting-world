import { POS_COLORS } from '../lib/constants'

function Stars({ n }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <span key={i} className={`text-base ${i <= n ? 'text-fsw-amber' : 'text-border-2'}`}>★</span>
      ))}
    </div>
  )
}

export default function PlayerCard({ player, onClick }) {
  const initials = (player.name || '?').split(' ').map(w => w[0]).slice(0,2).join('').toUpperCase()
  const posColor = POS_COLORS[player.position] || '#5a7090'

  return (
    <div
      onClick={onClick}
      className="player-card bg-card border border-border rounded-[10px] overflow-hidden cursor-pointer
                 transition-all duration-200 hover:border-border-2 hover:shadow-[0_10px_36px_rgba(0,0,0,.55)]"
    >
      {/* Top section */}
      <div className="px-4 pt-5 pb-3.5 flex items-start gap-3.5">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-full flex items-center justify-center font-heading font-black text-xl text-fsw-muted2 flex-shrink-0 uppercase"
             style={{
               background: `linear-gradient(135deg, ${posColor}22, ${posColor}11)`,
               border: `2px solid ${posColor}55`
             }}>
          {initials}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="font-heading font-extrabold text-[22px] uppercase tracking-wide leading-tight truncate">
            {player.name}
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="font-mono-custom text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded"
                  style={{ background: posColor + '25', color: posColor }}>
              {player.position}
            </span>
            {player.rating > 0 && <Stars n={player.rating} />}
          </div>
          <div className="font-mono-custom text-[10px] text-fsw-muted2 mt-1 truncate">
            {player.club} · {player.nationality}
          </div>
        </div>
      </div>

      {/* Meta pills */}
      <div className="px-4 pb-3 flex gap-2 flex-wrap">
        {player.foot && (
          <div className="bg-bg-2 border border-border rounded-md px-2 py-1 font-mono-custom text-[10px] text-fsw-muted2">
            <strong className="text-fsw-text font-semibold">{player.foot}</strong> foot
          </div>
        )}
        {player.height && (
          <div className="bg-bg-2 border border-border rounded-md px-2 py-1 font-mono-custom text-[10px] text-fsw-muted2">
            <strong className="text-fsw-text font-semibold">{player.height}</strong> cm
          </div>
        )}
        {player.dob && (
          <div className="bg-bg-2 border border-border rounded-md px-2 py-1 font-mono-custom text-[10px] text-fsw-muted2">
            b. <strong className="text-fsw-text font-semibold">{player.dob}</strong>
          </div>
        )}
      </div>

      {/* Tags */}
      {player.tags?.length > 0 && (
        <div className="px-4 pb-3 flex flex-wrap gap-1">
          {player.tags.slice(0, 5).map(t => (
            <span key={t} className="bg-fsw-purple/10 border border-fsw-purple/20 text-fsw-purple font-body text-[10px] font-medium px-1.5 py-0.5 rounded">
              {t}
            </span>
          ))}
          {player.tags.length > 5 && (
            <span className="text-[10px] text-fsw-muted font-mono-custom">+{player.tags.length - 5}</span>
          )}
        </div>
      )}

      {/* Report snippet */}
      {player.report && (
        <div className="px-4 pb-3">
          <div className="text-[11px] text-fsw-muted2 leading-relaxed px-2 py-1.5 bg-bg-2 rounded border-l-2 border-fsw-purple/40 line-clamp-2">
            {player.report}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="px-4 py-2 border-t border-border flex items-center justify-between">
        <span className="font-mono-custom text-[10px] text-fsw-muted2">
          {player.videos?.length
            ? <><span className="text-fsw-blue">{player.videos.length}</span> video{player.videos.length !== 1 ? 's' : ''}</>
            : 'No videos'}
        </span>
        <button className="bg-fsw-purple/15 text-fsw-purple border border-fsw-purple/30 font-heading font-bold text-xs
                           uppercase tracking-wide px-3.5 py-1 rounded-md transition-all duration-200
                           hover:bg-fsw-purple/25 hover:border-fsw-purple">
          Scout Report
        </button>
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { POS_COLORS } from '../lib/constants'
import { ATTRIBUTES, attrColor } from '../lib/fmRoles'
import FMPitch from './FMPitch'
import FMAttributes from './FMAttributes'
import FMRoles from './FMRoles'

const TABS = ['Overview', 'Attributes', 'Roles', 'Videos']

function InfoRow({ label, value }) {
  if (!value) return null
  return (
    <div className="flex items-center justify-between gap-3 py-1.5 border-b border-border/50">
      <span className="font-mono-custom text-[9px] text-fsw-muted uppercase tracking-widest">{label}</span>
      <span className="font-body text-sm font-medium text-fsw-text">{value}</span>
    </div>
  )
}

function Stars({ n }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <span key={i} className="text-xl" style={{ color: i <= n ? '#ffb300' : '#243050' }}>★</span>
      ))}
    </div>
  )
}

function StatBar({ label, value, max = 20, color }) {
  const pct = ((value || 0) / max) * 100
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono-custom text-[9px] text-fsw-muted w-24 truncate">{label}</span>
      <div className="flex-1 h-1 bg-border rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: pct + '%', background: color }} />
      </div>
      <span className="font-heading font-black text-[13px] w-5 text-right tabular-nums" style={{ color }}>{value || '—'}</span>
    </div>
  )
}

function RadarChart({ attrs }) {
  const keys = ['Pace', 'Dribbling', 'Passing', 'Shooting', 'Defending', 'Physicality']
  const values = {
    'Pace':        Math.round(((attrs?.Acceleration || 0) + (attrs?.Pace || 0)) / 2),
    'Dribbling':   Math.round(((attrs?.Dribbling || 0) + (attrs?.Agility || 0) + (attrs?.Balance || 0)) / 3),
    'Passing':     Math.round(((attrs?.Passing || 0) + (attrs?.Vision || 0) + (attrs?.Technique || 0)) / 3),
    'Shooting':    Math.round(((attrs?.Finishing || 0) + (attrs?.['Long Shots'] || 0) + (attrs?.Composure || 0)) / 3),
    'Defending':   Math.round(((attrs?.Marking || 0) + (attrs?.Tackling || 0) + (attrs?.Positioning || 0)) / 3),
    'Physicality': Math.round(((attrs?.Strength || 0) + (attrs?.Stamina || 0) + (attrs?.['Jumping Reach'] || 0)) / 3),
  }

  const cx = 100, cy = 100, r = 72
  const n = keys.length
  const angle = (i) => (i * 2 * Math.PI) / n - Math.PI / 2
  const point = (i, val) => {
    const a = angle(i), ratio = (val || 0) / 20
    return [cx + r * ratio * Math.cos(a), cy + r * ratio * Math.sin(a)]
  }
  const valuePoints = keys.map((k, i) => point(i, values[k]))
  const toPath = (pts) => pts.map((p, i) => `${i===0?'M':'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ') + ' Z'

  return (
    <svg viewBox="0 0 200 200" width="200" height="200">
      {[0.25, 0.5, 0.75, 1].map(ratio => (
        <polygon key={ratio}
          points={keys.map((_, i) => {
            const a = angle(i)
            return `${(cx + r * ratio * Math.cos(a)).toFixed(1)},${(cy + r * ratio * Math.sin(a)).toFixed(1)}`
          }).join(' ')}
          fill="none" stroke="#1a2540" strokeWidth="1" />
      ))}
      {keys.map((_, i) => {
        const a = angle(i)
        return <line key={i} x1={cx} y1={cy} x2={(cx + r * Math.cos(a)).toFixed(1)} y2={(cy + r * Math.sin(a)).toFixed(1)} stroke="#1a2540" strokeWidth="1" />
      })}
      <path d={toPath(valuePoints)} fill="rgba(0,230,118,0.15)" stroke="#00e676" strokeWidth="1.5" />
      {valuePoints.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="3" fill="#00e676" stroke="#07090f" strokeWidth="1" />
      ))}
      {keys.map((k, i) => {
        const a = angle(i)
        const lx = cx + (r + 20) * Math.cos(a)
        const ly = cy + (r + 20) * Math.sin(a)
        return (
          <g key={k}>
            <text x={lx} y={ly+2} textAnchor="middle" fontSize="7" fontFamily="Barlow Condensed" fontWeight="700" fill="#8899aa">{k.toUpperCase()}</text>
            <text x={lx} y={ly+12} textAnchor="middle" fontSize="9" fontFamily="Barlow Condensed" fontWeight="900" fill={attrColor(values[k])}>{values[k] || '—'}</text>
          </g>
        )
      })}
    </svg>
  )
}

export default function PlayerModal({ player, onClose }) {
  const [tab, setTab] = useState('Overview')
  const posColor = POS_COLORS[player.position] || '#5a7090'
  const attrs = player.attributes || {}

  const allVals = Object.values(attrs).filter(v => typeof v === 'number' && v > 0)
  const overall = allVals.length ? (allVals.reduce((a, b) => a + b, 0) / allVals.length) : null

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])

  const initials = (player.name || '?').split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()

  return (
    <div className="fixed inset-0 z-[500] flex"
         style={{ background: '#07090f' }}>
      <style>{`
        @keyframes slideIn { from { opacity:0; transform:translateX(-24px) } to { opacity:1; transform:translateX(0) } }
        @keyframes fadeUp  { from { opacity:0; transform:translateY(12px)  } to { opacity:1; transform:translateY(0)  } }
        .fm-slide { animation: slideIn 0.3s ease forwards; }
        .fm-fade  { animation: fadeUp  0.3s ease forwards; }
      `}</style>

      {/* ── LEFT SIDEBAR ── */}
      <div className="fm-slide w-[270px] flex-shrink-0 border-r border-border flex flex-col"
           style={{ background: 'linear-gradient(160deg, #0c1828 0%, #080d18 100%)' }}>

        {/* Back */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border flex-shrink-0">
          <button onClick={onClose}
                  className="flex items-center gap-1.5 text-fsw-muted2 hover:text-white transition-colors font-body text-sm">
            ← Back
          </button>
          <span className="font-mono-custom text-[8px] text-fsw-muted uppercase tracking-widest">Scout Card</span>
        </div>

        {/* Avatar + name */}
        <div className="px-5 pt-5 pb-4 flex flex-col items-center text-center border-b border-border flex-shrink-0">
          <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center font-heading font-black text-2xl mb-3 flex-shrink-0"
               style={{ background: `radial-gradient(circle, ${posColor}30, ${posColor}10)`,
                        border: `2px solid ${posColor}55`, color: posColor,
                        boxShadow: `0 0 25px ${posColor}20` }}>
            {initials}
          </div>
          <div className="font-heading font-black text-[20px] uppercase tracking-wide leading-tight mb-1.5">{player.name}</div>
          <div className="flex items-center gap-1.5 mb-1.5 flex-wrap justify-center">
            <span className="font-mono-custom text-[9px] font-semibold px-2 py-0.5 rounded uppercase tracking-wider"
                  style={{ background: posColor + '25', color: posColor }}>{player.position}</span>
            {player.rating > 0 && <Stars n={player.rating} />}
          </div>
          <div className="font-mono-custom text-[10px] text-fsw-muted2">{player.club} · {player.nationality}</div>
          {overall !== null && (
            <div className="mt-3 w-full bg-bg-3/60 border border-border rounded-xl px-4 py-2.5 text-center">
              <div className="font-mono-custom text-[8px] text-fsw-muted uppercase tracking-widest mb-0.5">Overall</div>
              <div className="font-heading font-black text-[32px] leading-none" style={{ color: attrColor(Math.round(overall)) }}>
                {Math.round(overall)}
              </div>
            </div>
          )}
        </div>

        {/* Pitch */}
        <div className="flex justify-center py-4 border-b border-border flex-shrink-0">
          <FMPitch primaryPos={player.position} secondaryPositions={player.secondaryPositions || []} size="sm" />
        </div>

        {/* Info */}
        <div className="px-4 py-3 flex-1 overflow-y-auto">
          <InfoRow label="Date of Birth" value={player.dob} />
          <InfoRow label="Nationality"   value={player.nationality} />
          <InfoRow label="Club"          value={player.club} />
          <InfoRow label="Preferred Foot" value={player.foot} />
          <InfoRow label="Height"        value={player.height ? player.height + ' cm' : null} />
          <InfoRow label="Added"         value={player.addedDate} />
        </div>
      </div>

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Tab bar */}
        <div className="flex items-center border-b border-border px-6 flex-shrink-0"
             style={{ background: '#08101a' }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
                    className={`font-heading font-bold text-sm uppercase tracking-widest px-5 py-[14px] border-b-2 transition-all
                      ${tab === t ? 'text-green border-green' : 'text-fsw-muted2 border-transparent hover:text-fsw-text hover:border-border-2'}`}>
              {t}
            </button>
          ))}
          {player.videos?.length > 0 && (
            <span className="ml-auto font-mono-custom text-[10px] bg-fsw-blue/10 text-fsw-blue border border-fsw-blue/20 px-2 py-0.5 rounded self-center">
              {player.videos.length} video{player.videos.length > 1 ? 's' : ''}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 fm-fade" key={tab}>

          {/* OVERVIEW */}
          {tab === 'Overview' && (
            <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <div className="bg-card border border-border rounded-xl p-5">
                <div className="font-heading font-bold text-xs uppercase tracking-widest text-fsw-muted2 mb-4">Player Profile</div>
                <div className="flex justify-center"><RadarChart attrs={attrs} /></div>
              </div>

              <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-2.5">
                <div className="font-heading font-bold text-xs uppercase tracking-widest text-fsw-muted2 mb-1">Key Attributes</div>
                {[
                  { l:'Pace',        v: Math.round(((attrs?.Acceleration||0)+(attrs?.Pace||0))/2), c:'#ff7043' },
                  { l:'Technique',   v: attrs?.Technique,         c:'#4fc3f7' },
                  { l:'Passing',     v: attrs?.Passing,           c:'#4fc3f7' },
                  { l:'Dribbling',   v: attrs?.Dribbling,         c:'#ffb300' },
                  { l:'Vision',      v: attrs?.Vision,            c:'#ab47bc' },
                  { l:'Decisions',   v: attrs?.Decisions,         c:'#ab47bc' },
                  { l:'Work Rate',   v: attrs?.['Work Rate'],     c:'#26c6da' },
                  { l:'Stamina',     v: attrs?.Stamina,           c:'#26c6da' },
                  { l:'Strength',    v: attrs?.Strength,          c:'#ff7043' },
                  { l:'Finishing',   v: attrs?.Finishing,         c:'#00e676' },
                ].filter(s => s.v > 0).map(s => <StatBar key={s.l} {...s} />)}
                {Object.keys(attrs).length === 0 && (
                  <div className="font-mono-custom text-xs text-fsw-muted text-center py-4">No attributes added yet</div>
                )}
              </div>

              <div className="bg-card border border-border rounded-xl p-5">
                <div className="font-heading font-bold text-xs uppercase tracking-widest text-fsw-muted2 mb-3">Best Roles</div>
                <FMRoles position={player.position} attrs={attrs} />
              </div>

              <div className="bg-card border border-border rounded-xl p-5">
                <div className="font-heading font-bold text-xs uppercase tracking-widest text-fsw-muted2 mb-3">Scouting Report</div>
                {player.report
                  ? <p className="font-body text-sm text-fsw-muted2 leading-relaxed whitespace-pre-wrap">{player.report}</p>
                  : <div className="font-mono-custom text-xs text-fsw-muted text-center py-4">No report added</div>}
                {player.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-border">
                    {player.tags.map(t => (
                      <span key={t} className="bg-fsw-purple/10 border border-fsw-purple/20 text-fsw-purple font-body text-[10px] font-medium px-2 py-0.5 rounded">{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ATTRIBUTES */}
          {tab === 'Attributes' && (
            Object.keys(attrs).length === 0
              ? <div className="text-center py-20">
                  <div className="text-5xl mb-3 opacity-30">📊</div>
                  <div className="font-heading text-lg font-bold text-fsw-muted2 uppercase tracking-widest">No attributes added</div>
                  <div className="font-mono-custom text-sm text-fsw-muted mt-1">Edit this player in Admin Panel to add FM-style attributes</div>
                </div>
              : <FMAttributes attrs={attrs} />
          )}

          {/* ROLES */}
          {tab === 'Roles' && (
            <div className="max-w-[640px]">
              <div className="font-heading font-bold text-xs uppercase tracking-widest text-fsw-muted2 mb-4">
                Calculated roles for {player.position} · based on attributes
              </div>
              {Object.keys(attrs).length === 0
                ? <div className="text-center py-20">
                    <div className="text-5xl mb-3 opacity-30">🎭</div>
                    <div className="font-heading text-lg font-bold text-fsw-muted2 uppercase tracking-widest">Add attributes first</div>
                  </div>
                : <FMRoles position={player.position} attrs={attrs} />}
            </div>
          )}

          {/* VIDEOS */}
          {tab === 'Videos' && (
            <div className="flex flex-col gap-3 max-w-[720px]">
              {player.videos?.length > 0
                ? player.videos.map((v, i) => (
                    <div key={i} className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 hover:border-border-2 transition-all">
                      <div className="w-10 h-10 rounded-lg bg-fsw-blue/10 border border-fsw-blue/20 flex items-center justify-center font-heading font-black text-fsw-blue text-sm flex-shrink-0">▶</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-heading font-bold text-base">{v.label || 'Video ' + (i + 1)}</div>
                        <div className="font-mono-custom text-[10px] text-fsw-muted truncate mt-0.5">{v.url}</div>
                      </div>
                      <a href={v.url} target="_blank" rel="noreferrer"
                         className="bg-fsw-blue text-black font-heading font-bold text-xs uppercase px-4 py-2 rounded-lg flex-shrink-0 hover:bg-[#81d4fa] no-underline transition-all">
                        Open ↗
                      </a>
                    </div>
                  ))
                : <div className="text-center py-20">
                    <div className="text-5xl mb-3 opacity-30">🎬</div>
                    <div className="font-heading text-lg font-bold text-fsw-muted2 uppercase tracking-widest">No videos added</div>
                  </div>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

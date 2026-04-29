import { getTopRoles } from '../lib/fmRoles'

const DUTY_COLORS = { D: '#4fc3f7', S: '#ffb300', A: '#00e676' }
const DUTY_LABELS = { D: 'Defend', S: 'Support', A: 'Attack' }

function RoleBar({ score, max = 20 }) {
  const pct = Math.min((score / max) * 100, 100)
  const col = score >= 16 ? '#00e676' : score >= 13 ? '#ffb300' : score >= 10 ? '#ff7043' : '#5a7090'
  return (
    <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
      <div className="h-full rounded-full transition-all duration-500"
           style={{ width: pct + '%', background: col, boxShadow: score >= 14 ? `0 0 6px ${col}88` : 'none' }} />
    </div>
  )
}

export default function FMRoles({ position, attrs }) {
  if (!position || !attrs) return null
  const roles = getTopRoles(attrs, position, 6)
  if (!roles.length) return (
    <div className="font-mono-custom text-xs text-fsw-muted text-center py-4">
      Add attributes to calculate roles
    </div>
  )

  return (
    <div className="flex flex-col gap-1.5">
      {roles.map((r, i) => (
        <div key={r.name} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border transition-all
          ${i === 0 ? 'bg-green-glow border-green-dim' : 'bg-bg-3 border-border'}`}>
          {/* Rank */}
          <span className="font-heading font-black text-[11px] w-4 text-center"
                style={{ color: i === 0 ? '#00e676' : '#5a7090' }}>
            {i + 1}
          </span>
          {/* Role name */}
          <span className={`font-heading font-bold text-[13px] flex-1 ${i === 0 ? 'text-green' : 'text-fsw-text'}`}>
            {r.name}
          </span>
          {/* Duty badge */}
          <span className="font-mono-custom text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded"
                style={{ background: DUTY_COLORS[r.duty] + '20', color: DUTY_COLORS[r.duty] }}>
            {DUTY_LABELS[r.duty]}
          </span>
          {/* Bar + score */}
          <RoleBar score={r.score} />
          <span className="font-heading font-black text-[15px] w-8 text-right tabular-nums"
                style={{ color: r.score >= 15 ? '#00e676' : r.score >= 12 ? '#ffb300' : '#8899aa' }}>
            {r.score.toFixed(1)}
          </span>
        </div>
      ))}
    </div>
  )
}

import { PITCH_POSITIONS, POS_COLORS } from '../lib/constants'

export default function FMPitch({ primaryPos, secondaryPositions = [], size = 'md' }) {
  const w = size === 'sm' ? 160 : 220
  const h = size === 'sm' ? 220 : 300

  const sx = (pct) => (pct / 100) * w
  const sy = (pct) => (pct / 100) * h

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} style={{ display: 'block' }}>
      {/* Pitch background */}
      <defs>
        <linearGradient id="pitchGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a1f0a" />
          <stop offset="100%" stopColor="#0d2b0d" />
        </linearGradient>
        {/* Stripe pattern */}
        <pattern id="stripes" x="0" y="0" width="20" height={h} patternUnits="userSpaceOnUse">
          <rect width="10" height={h} fill="rgba(255,255,255,0.015)" />
        </pattern>
      </defs>

      {/* Field background */}
      <rect width={w} height={h} rx="6" fill="url(#pitchGrad)" stroke="#1a3020" strokeWidth="1.5" />
      <rect width={w} height={h} rx="6" fill="url(#stripes)" />

      {/* Outer border */}
      <rect x="8" y="8" width={w-16} height={h-16} rx="3" fill="none" stroke="#2a5030" strokeWidth="1" />

      {/* Center circle */}
      <circle cx={w/2} cy={h/2} r={w*0.14} fill="none" stroke="#2a5030" strokeWidth="1" />
      <circle cx={w/2} cy={h/2} r="2" fill="#2a5030" />

      {/* Halfway line */}
      <line x1="8" y1={h/2} x2={w-8} y2={h/2} stroke="#2a5030" strokeWidth="1" />

      {/* Top penalty area */}
      <rect x={sx(22)} y={sy(2)} width={sx(56)} height={sy(22)} rx="2" fill="none" stroke="#2a5030" strokeWidth="1" />
      {/* Top 6-yard box */}
      <rect x={sx(34)} y={sy(2)} width={sx(32)} height={sy(8)} rx="1" fill="none" stroke="#2a5030" strokeWidth="0.8" />
      {/* Top goal */}
      <rect x={sx(40)} y={sy(0)} width={sx(20)} height={sy(2.5)} rx="1" fill="none" stroke="#3a6040" strokeWidth="1.2" />

      {/* Bottom penalty area */}
      <rect x={sx(22)} y={sy(76)} width={sx(56)} height={sy(22)} rx="2" fill="none" stroke="#2a5030" strokeWidth="1" />
      {/* Bottom 6-yard box */}
      <rect x={sx(34)} y={sy(90)} width={sx(32)} height={sy(8)} rx="1" fill="none" stroke="#2a5030" strokeWidth="0.8" />
      {/* Bottom goal */}
      <rect x={sx(40)} y={sy(97.5)} width={sx(20)} height={sy(2.5)} rx="1" fill="none" stroke="#3a6040" strokeWidth="1.2" />

      {/* Corner arcs */}
      {[[8,8],[w-8,8],[8,h-8],[w-8,h-8]].map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r="6" fill="none" stroke="#2a5030" strokeWidth="0.8"
                clipPath={`inset(0 0 0 0)`} />
      ))}

      {/* Secondary positions */}
      {secondaryPositions.map((pos, i) => {
        const p = PITCH_POSITIONS[pos]
        if (!p) return null
        return (
          <g key={i}>
            <circle cx={sx(p.x)} cy={sy(p.y)} r="9" fill={POS_COLORS[pos] + '30'} stroke={POS_COLORS[pos] + '70'} strokeWidth="1.5" strokeDasharray="3 2" />
            <text x={sx(p.x)} y={sy(p.y)+4} textAnchor="middle" fontSize="7" fontFamily="Barlow Condensed" fontWeight="700" fill={POS_COLORS[pos] + 'aa'}>
              {pos}
            </text>
          </g>
        )
      })}

      {/* Primary position */}
      {primaryPos && PITCH_POSITIONS[primaryPos] && (() => {
        const p = PITCH_POSITIONS[primaryPos]
        const col = POS_COLORS[primaryPos] || '#00e676'
        return (
          <g>
            {/* Glow ring */}
            <circle cx={sx(p.x)} cy={sy(p.y)} r="15" fill={col + '15'} stroke={col + '30'} strokeWidth="1" />
            {/* Main dot */}
            <circle cx={sx(p.x)} cy={sy(p.y)} r="11" fill={col + 'ee'} stroke="#fff" strokeWidth="1.5"
                    style={{ filter: `drop-shadow(0 0 6px ${col}88)` }} />
            <text x={sx(p.x)} y={sy(p.y)+4} textAnchor="middle" fontSize="7.5" fontFamily="Barlow Condensed" fontWeight="900" fill="#000">
              {primaryPos}
            </text>
          </g>
        )
      })()}
    </svg>
  )
}

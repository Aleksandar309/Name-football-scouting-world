import { ATTRIBUTES, ATTR_SHORT, attrColor, attrBg } from '../lib/fmRoles'

function AttrCell({ name, value }) {
  const col = attrColor(value)
  const bg  = attrBg(value)
  return (
    <div className="flex items-center justify-between gap-1 px-2 py-1 rounded"
         style={{ background: bg, border: '1px solid ' + col + '30' }}>
      <span className="font-mono-custom text-[10px] text-fsw-muted2 tracking-wide flex-1">{ATTR_SHORT[name] || name}</span>
      <span className="font-heading font-black text-[15px] leading-none tabular-nums"
            style={{ color: col, textShadow: value >= 15 ? `0 0 8px ${col}66` : 'none' }}>
        {value || '—'}
      </span>
    </div>
  )
}

function AttrSection({ title, attrs, playerAttrs, accent }) {
  return (
    <div>
      <div className="font-heading font-extrabold text-xs uppercase tracking-widest mb-2 pb-1 border-b"
           style={{ color: accent, borderColor: accent + '40' }}>
        {title}
      </div>
      <div className="grid grid-cols-2 gap-1">
        {attrs.map(a => (
          <AttrCell key={a} name={a} value={playerAttrs?.[a]} />
        ))}
      </div>
    </div>
  )
}

export default function FMAttributes({ attrs }) {
  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
      <AttrSection title="Technical" attrs={ATTRIBUTES.technical} playerAttrs={attrs} accent="#4fc3f7" />
      <AttrSection title="Mental"    attrs={ATTRIBUTES.mental}    playerAttrs={attrs} accent="#ab47bc" />
      <AttrSection title="Physical"  attrs={ATTRIBUTES.physical}  playerAttrs={attrs} accent="#ff7043" />
    </div>
  )
}

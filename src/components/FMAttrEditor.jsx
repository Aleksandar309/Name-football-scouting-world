import { ATTRIBUTES, ATTR_SHORT, attrColor } from '../lib/fmRoles'

function AttrInput({ name, value, onChange }) {
  const v = parseInt(value) || 0
  const col = attrColor(v)

  return (
    <div className="flex items-center gap-1.5 bg-bg-4 border border-border rounded-lg px-2 py-1.5
                    hover:border-border-2 transition-colors group">
      <span className="font-mono-custom text-[10px] text-fsw-muted2 flex-1 truncate group-hover:text-fsw-text transition-colors">
        {ATTR_SHORT[name] || name}
      </span>
      <input
        type="number" min="0" max="20"
        value={value || ''}
        placeholder="—"
        onChange={e => onChange(name, Math.min(20, Math.max(0, parseInt(e.target.value) || 0)))}
        className="w-9 text-center font-heading font-black text-sm bg-transparent outline-none
                   tabular-nums transition-colors border-none"
        style={{ color: v > 0 ? col : '#5a7090' }}
      />
    </div>
  )
}

function Section({ title, attrs, values, onChange, accent }) {
  const avg = attrs.reduce((s,a) => s + (values?.[a] || 0), 0) / attrs.length
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <span className="font-heading font-extrabold text-xs uppercase tracking-widest" style={{ color: accent }}>{title}</span>
        {avg > 0 && (
          <span className="font-mono-custom text-[10px] px-1.5 py-0.5 rounded"
                style={{ background: accent + '15', color: accent }}>
            avg {avg.toFixed(1)}
          </span>
        )}
      </div>
      <div className="grid grid-cols-3 gap-1">
        {attrs.map(a => (
          <AttrInput key={a} name={a} value={values?.[a]} onChange={onChange} />
        ))}
      </div>
    </div>
  )
}

export default function FMAttrEditor({ attrs = {}, onChange }) {
  function handleChange(name, val) {
    onChange({ ...attrs, [name]: val })
  }

  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
      <Section title="Technical" attrs={ATTRIBUTES.technical} values={attrs} onChange={handleChange} accent="#4fc3f7" />
      <Section title="Mental"    attrs={ATTRIBUTES.mental}    values={attrs} onChange={handleChange} accent="#ab47bc" />
      <Section title="Physical"  attrs={ATTRIBUTES.physical}  values={attrs} onChange={handleChange} accent="#ff7043" />
    </div>
  )
}

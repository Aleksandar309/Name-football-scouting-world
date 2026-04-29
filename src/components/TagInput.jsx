export default function TagInput({ tags, setTags, placeholder, suggestions = [] }) {
  function addTag(v) {
    const t = v.trim().replace(/,$/, '')
    if (t && !tags.includes(t)) setTags([...tags, t])
  }

  function removeTag(t) {
    setTags(tags.filter(x => x !== t))
  }

  function onKeyDown(e) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(e.target.value)
      e.target.value = ''
    }
    if (e.key === 'Backspace' && !e.target.value && tags.length) {
      setTags(tags.slice(0, -1))
    }
  }

  function onBlur(e) {
    if (e.target.value) { addTag(e.target.value); e.target.value = '' }
  }

  return (
    <div>
      <div className="tag-input-wrap" onClick={e => e.currentTarget.querySelector('input')?.focus()}>
        {tags.map(t => (
          <div key={t} className="flex items-center gap-1 bg-green/10 border border-green-dim text-green text-[11px] px-2 py-0.5 rounded">
            {t}
            <button type="button" onClick={() => removeTag(t)}
                    className="bg-none border-none text-green cursor-pointer text-sm leading-none px-px">×</button>
          </div>
        ))}
        <input placeholder={placeholder} onKeyDown={onKeyDown} onBlur={onBlur} />
      </div>
      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {suggestions.filter(s => !tags.includes(s)).slice(0, 10).map(s => (
            <button key={s} type="button" onClick={() => addTag(s)}
                    className="text-[10px] px-2 py-0.5 rounded border border-border text-fsw-muted2
                               hover:border-green hover:text-green transition-all font-body bg-transparent">
              + {s}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

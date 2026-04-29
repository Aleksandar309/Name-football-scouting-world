import { useState, useMemo } from 'react'
import { useApp } from '../App'
import PlayerCard from '../components/PlayerCard'
import { PlayerSkeleton } from '../components/SkeletonCard'

const POSITIONS_ORDER = ['GK','CB','LB','RB','LWB','RWB','SW','DM','CM','AM','LM','RM','LW','RW','SS','CF','ST']

function FilterSelect({ label, value, onChange, children }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="font-mono-custom text-[10px] text-fsw-muted uppercase tracking-widest">{label}</span>
      <select value={value} onChange={e => onChange(e.target.value)}
              className="bg-bg-2 border border-border text-fsw-text font-body text-[13px]
                         px-2.5 py-1.5 rounded-lg outline-none cursor-pointer focus:border-green-dim select-styled transition-colors">
        {children}
      </select>
    </div>
  )
}

export default function PlayersPage() {
  const { players, search, setSelectedPlayer } = useApp()
  const [filterPos,    setFilterPos]    = useState('')
  const [filterNat,    setFilterNat]    = useState('')
  const [filterRating, setFilterRating] = useState('')
  const [activeTag,    setActiveTag]    = useState('')
  const [sort,         setSort]         = useState('added')

  const usedPositions = useMemo(() => {
    const set = new Set(players.map(p => p.position).filter(Boolean))
    return POSITIONS_ORDER.filter(p => set.has(p))
  }, [players])

  const usedNats = useMemo(() => [...new Set(players.map(p => p.nationality).filter(Boolean))].sort(), [players])

  const allTags = useMemo(() => {
    const all = players.flatMap(p => p.tags || [])
    return [...new Set(all)]
  }, [players])

  const filtered = useMemo(() => {
    let list = [...players]
    if (search) {
      const q = search.toLowerCase()
      list = list.filter(p =>
        (p.name||'').toLowerCase().includes(q) ||
        (p.club||'').toLowerCase().includes(q) ||
        (p.nationality||'').toLowerCase().includes(q) ||
        (p.report||'').toLowerCase().includes(q) ||
        (p.tags||[]).some(t => t.toLowerCase().includes(q))
      )
    }
    if (filterPos)    list = list.filter(p => p.position === filterPos)
    if (filterNat)    list = list.filter(p => p.nationality === filterNat)
    if (filterRating) list = list.filter(p => (p.rating || 0) >= parseInt(filterRating))
    if (activeTag)    list = list.filter(p => p.tags?.includes(activeTag))

    if (sort === 'added') list.sort((a,b) => (b.addedDate||'').localeCompare(a.addedDate||''))
    if (sort === 'name')  list.sort((a,b) => (a.name||'').localeCompare(b.name||''))
    if (sort === 'rating') list.sort((a,b) => (b.rating||0) - (a.rating||0))

    return list
  }, [players, search, filterPos, filterNat, filterRating, activeTag, sort])

  function clearFilters() {
    setFilterPos(''); setFilterNat(''); setFilterRating(''); setActiveTag('')
  }
  const hasFilters = filterPos || filterNat || filterRating || activeTag

  return (
    <section>
      {/* Filter bar */}
      <div className="max-w-[1600px] mx-auto px-6 py-4 flex flex-wrap gap-2 items-center">
        <FilterSelect label="Position" value={filterPos} onChange={setFilterPos}>
          <option value="">All Positions</option>
          {usedPositions.map(p => <option key={p}>{p}</option>)}
        </FilterSelect>

        <div className="w-px h-5 bg-border flex-shrink-0" />

        <FilterSelect label="Nationality" value={filterNat} onChange={setFilterNat}>
          <option value="">All</option>
          {usedNats.map(n => <option key={n}>{n}</option>)}
        </FilterSelect>

        <div className="w-px h-5 bg-border flex-shrink-0" />

        <FilterSelect label="Rating" value={filterRating} onChange={setFilterRating}>
          <option value="">Any</option>
          <option value="5">★★★★★ 5</option>
          <option value="4">★★★★ 4+</option>
          <option value="3">★★★ 3+</option>
        </FilterSelect>

        <div className="w-px h-5 bg-border flex-shrink-0" />

        {/* Tag chips */}
        <div className="flex flex-wrap gap-1.5">
          {allTags.map(t => (
            <button key={t} onClick={() => setActiveTag(activeTag === t ? '' : t)}
                    className={`font-body text-[11px] px-2.5 py-1 rounded-full border cursor-pointer transition-all whitespace-nowrap
                      ${activeTag === t ? 'bg-green/10 border-green text-green' : 'bg-bg-2 border-border text-fsw-muted2 hover:border-green hover:text-green'}`}>
              {t}
            </button>
          ))}
        </div>

        {hasFilters && (
          <button onClick={clearFilters}
                  className="bg-transparent border border-transparent text-fsw-muted font-body text-sm px-2.5 py-1 rounded-lg hover:text-fsw-red hover:border-fsw-red transition-all">
            ✕ Clear
          </button>
        )}
      </div>

      {/* Content */}
      <div className="max-w-[1600px] mx-auto px-6 pb-16">
        <div className="flex items-center justify-between mb-3.5 pb-3 border-b border-border">
          <span className="font-mono-custom text-[11px] text-fsw-muted2">
            Showing <strong className="text-green">{filtered.length}</strong> of {players.length} players
          </span>
          <div className="flex items-center gap-1.5">
            <span className="font-mono-custom text-[10px] text-fsw-muted uppercase">Sort:</span>
            {[['added','Newest'],['name','Name A–Z'],['rating','Rating ↓']].map(([v,l]) => (
              <button key={v} onClick={() => setSort(v)}
                      className={`border font-mono-custom text-[10px] uppercase tracking-wide px-2.5 py-1 rounded-md transition-all
                        ${sort === v ? 'border-fsw-blue text-fsw-blue' : 'border-border text-fsw-muted2 hover:border-fsw-blue hover:text-fsw-blue'}`}>
                {l}
              </button>
            ))}
          </div>
        </div>

        {players.length === 0 ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-3.5">
            {[...Array(6)].map((_,i) => <PlayerSkeleton key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-[44px] opacity-35 mb-2.5">👤</div>
            <div className="font-heading text-xl font-bold text-fsw-muted2 uppercase tracking-widest">No players found</div>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-3.5">
            {filtered.map(p => (
              <PlayerCard key={p.id} player={p} onClick={() => setSelectedPlayer(p)} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

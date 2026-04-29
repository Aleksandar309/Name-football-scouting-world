import { useState, useMemo } from 'react'
import { useApp } from '../App'
import MatchCard from '../components/MatchCard'
import { MatchSkeleton } from '../components/SkeletonCard'
import { LEAGUES, MTAG_STYLES, FORMATIONS } from '../lib/constants'

const SEASONS_LIST = ['2024/25', '2023/24', '2022/23', '2021/22', '2020/21']

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

export default function MatchesPage() {
  const { matches, search, setSelectedMatch } = useApp()
  const [filterLeague,    setFilterLeague]    = useState('')
  const [filterSeason,    setFilterSeason]    = useState('')
  const [filterFormation, setFilterFormation] = useState('')
  const [activeTag,       setActiveTag]       = useState('')
  const [sort,            setSort]            = useState('date')

  // Unique leagues in data
  const usedLeagues = useMemo(() => [...new Set(matches.map(m => m.league).filter(Boolean))], [matches])
  const usedFormations = useMemo(() => {
    const all = matches.flatMap(m => [m.homeFormation, m.awayFormation]).filter(Boolean)
    return [...new Set(all)].sort()
  }, [matches])
  const allTags = useMemo(() => {
    const all = matches.flatMap(m => m.tags || [])
    return [...new Set(all)]
  }, [matches])

  const filtered = useMemo(() => {
    let list = [...matches]
    if (search) {
      const q = search.toLowerCase()
      list = list.filter(m =>
        (m.homeTeam||'').toLowerCase().includes(q) ||
        (m.awayTeam||'').toLowerCase().includes(q) ||
        (m.league||'').toLowerCase().includes(q) ||
        (m.notes||'').toLowerCase().includes(q)
      )
    }
    if (filterLeague)    list = list.filter(m => m.league === filterLeague)
    if (filterSeason)    list = list.filter(m => m.season === filterSeason)
    if (filterFormation) list = list.filter(m => m.homeFormation === filterFormation || m.awayFormation === filterFormation)
    if (activeTag)       list = list.filter(m => m.tags?.includes(activeTag))

    if (sort === 'date')  list.sort((a,b) => (b.matchDate||b.date||'').localeCompare(a.matchDate||a.date||''))
    if (sort === 'team')  list.sort((a,b) => (a.homeTeam||'').localeCompare(b.homeTeam||''))
    if (sort === 'added') list.sort((a,b) => (b.uploadDate||'').localeCompare(a.uploadDate||''))

    return list
  }, [matches, search, filterLeague, filterSeason, filterFormation, activeTag, sort])

  function clearFilters() {
    setFilterLeague(''); setFilterSeason(''); setFilterFormation(''); setActiveTag('')
  }
  const hasFilters = filterLeague || filterSeason || filterFormation || activeTag

  return (
    <section>
      {/* Filter bar */}
      <div className="max-w-[1600px] mx-auto px-6 py-4 flex flex-wrap gap-2 items-center">
        <FilterSelect label="League" value={filterLeague} onChange={setFilterLeague}>
          <option value="">All Leagues</option>
          {usedLeagues.map(l => <option key={l}>{l}</option>)}
        </FilterSelect>

        <div className="w-px h-5 bg-border flex-shrink-0" />

        <FilterSelect label="Season" value={filterSeason} onChange={setFilterSeason}>
          <option value="">All Seasons</option>
          {SEASONS_LIST.map(s => <option key={s}>{s}</option>)}
        </FilterSelect>

        <div className="w-px h-5 bg-border flex-shrink-0" />

        <FilterSelect label="Formation" value={filterFormation} onChange={setFilterFormation}>
          <option value="">Any</option>
          {usedFormations.map(f => <option key={f}>{f}</option>)}
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
            Showing <strong className="text-green">{filtered.length}</strong> of {matches.length} matches
          </span>
          <div className="flex items-center gap-1.5">
            <span className="font-mono-custom text-[10px] text-fsw-muted uppercase">Sort:</span>
            {[['date','Match Date'],['added','Newest'],['team','Team A–Z']].map(([v,l]) => (
              <button key={v} onClick={() => setSort(v)}
                      className={`border font-mono-custom text-[10px] uppercase tracking-wide px-2.5 py-1 rounded-md transition-all
                        ${sort === v ? 'border-fsw-blue text-fsw-blue' : 'border-border text-fsw-muted2 hover:border-fsw-blue hover:text-fsw-blue'}`}>
                {l}
              </button>
            ))}
          </div>
        </div>

        {matches.length === 0 ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(330px,1fr))] gap-3.5">
            {[...Array(6)].map((_,i) => <MatchSkeleton key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-[44px] opacity-35 mb-2.5">🔍</div>
            <div className="font-heading text-xl font-bold text-fsw-muted2 uppercase tracking-widest">No matches found</div>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(330px,1fr))] gap-3.5">
            {filtered.map(m => (
              <MatchCard key={m.id} match={m} onClick={() => setSelectedMatch(m)} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

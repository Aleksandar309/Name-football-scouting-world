import { useRef } from 'react'

export default function Header({ section, setSection, search, setSearch, matchCount, playerCount, user, onAdminBtn }) {
  const inputRef = useRef(null)

  return (
    <header className="sticky top-0 z-[200] border-b border-border"
            style={{ background: 'rgba(7,9,15,0.97)', backdropFilter: 'blur(14px)' }}>
      <div className="max-w-[1600px] mx-auto px-6 flex items-center gap-4 h-[60px]">

        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 no-underline flex-shrink-0">
          <div className="w-9 h-9 bg-green rounded-lg flex items-center justify-center font-heading font-black text-lg text-black tracking-tighter"
               style={{ boxShadow: '0 0 20px rgba(0,230,118,0.35)' }}>
            FSW
          </div>
          <div className="font-heading font-extrabold text-xl text-fsw-text tracking-wide hidden sm:block">
            Football <span className="text-green">Scouting</span> World
          </div>
        </a>

        {/* Nav tabs */}
        <nav className="flex gap-1 ml-6 flex-shrink-0">
          {[
            { id: 'matches', label: '⚽ Matches' },
            { id: 'players', label: '👤 Players' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSection(tab.id)}
              className={`
                font-heading font-bold text-sm tracking-widest uppercase px-4 py-1.5 rounded-lg border transition-all duration-200
                ${section === tab.id
                  ? 'text-green border-green-dim bg-green-glow'
                  : 'text-fsw-muted2 border-transparent hover:text-fsw-text hover:border-border-2'}
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Search */}
        <div className="relative flex-1 max-w-[440px] mx-4">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-fsw-muted text-sm pointer-events-none">🔍</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search matches, teams, players..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-bg-2 border border-border text-fsw-text font-body text-sm
                       pl-9 pr-4 py-2 rounded-lg outline-none transition-colors duration-200
                       focus:border-green-dim placeholder-fsw-muted"
          />
          {search && (
            <button onClick={() => setSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-fsw-muted hover:text-fsw-muted2 text-sm">
              ✕
            </button>
          )}
        </div>

        {/* Stats + Admin */}
        <div className="flex items-center gap-2.5 ml-auto">
          <div className="hidden md:flex bg-bg-2 border border-border rounded-md px-3 py-1.5
                          font-mono-custom text-[11px] text-fsw-muted2 items-center gap-1.5">
            Matches: <strong className="text-green font-semibold">{matchCount}</strong>
          </div>
          <div className="hidden md:flex bg-bg-2 border border-border rounded-md px-3 py-1.5
                          font-mono-custom text-[11px] text-fsw-muted2 items-center gap-1.5">
            Players: <strong className="text-green font-semibold">{playerCount}</strong>
          </div>
          <button
            onClick={onAdminBtn}
            className={`
              border font-body text-sm px-3.5 py-1.5 rounded-lg cursor-pointer transition-all duration-200
              ${user
                ? 'border-green-dim text-green bg-green-glow'
                : 'border-border-2 text-fsw-muted2 bg-transparent hover:border-green hover:text-green'}
            `}
          >
            {user ? '⚙ Admin' : '⚙ Login'}
          </button>
        </div>
      </div>
    </header>
  )
}

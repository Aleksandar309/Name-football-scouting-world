import { useState, useMemo, createContext, useContext } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import MatchesPage from './pages/MatchesPage'
import PlayersPage from './pages/PlayersPage'
import MatchModal from './components/MatchModal'
import PlayerModal from './components/PlayerModal'
import AdminPanel from './components/AdminPanel'
import LoginModal from './components/LoginModal'
import Toast from './components/Toast'
import LoadingScreen from './components/LoadingScreen'
import { useMatches } from './hooks/useMatches'
import { usePlayers } from './hooks/usePlayers'
import { useAuth } from './hooks/useAuth'

export const AppContext = createContext(null)

export function useApp() { return useContext(AppContext) }

export default function App() {
  const { matches, loading: mLoading, addMatch, updateMatch, deleteMatch } = useMatches()
  const { players, loading: pLoading, addPlayer, updatePlayer, deletePlayer } = usePlayers()
  const { user, loading: authLoading, login, logout } = useAuth()

  const [section, setSection]     = useState('matches')
  const [search,  setSearch]      = useState('')
  const [selectedMatch,  setSelectedMatch]  = useState(null)
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [adminOpen,  setAdminOpen]  = useState(false)
  const [loginOpen,  setLoginOpen]  = useState(false)
  const [toast,      setToast]      = useState({ msg: '', type: '' })

  const loading = mLoading || pLoading || authLoading

  function showToast(msg, type = '') {
    setToast({ msg, type })
    setTimeout(() => setToast({ msg: '', type: '' }), 2800)
  }

  function handleAdminBtn() {
    if (user) setAdminOpen(true)
    else setLoginOpen(true)
  }

  // Stats for hero
  const heroStats = useMemo(() => {
    const leagues = new Set(matches.map(m => m.league)).size
    const videos  = players.reduce((acc, p) => acc + (p.videos?.length || 0), 0)
    return { matches: matches.length, leagues, players: players.length, videos }
  }, [matches, players])

  const ctx = {
    matches, players, search, setSearch,
    setSelectedMatch, setSelectedPlayer,
    addMatch, updateMatch, deleteMatch,
    addPlayer, updatePlayer, deletePlayer,
    user, login, logout, showToast,
    setAdminOpen, setLoginOpen,
  }

  if (loading) return <LoadingScreen />

  return (
    <AppContext.Provider value={ctx}>
      <div className="min-h-screen bg-bg text-fsw-text">
        <Header
          section={section}
          setSection={setSection}
          search={search}
          setSearch={setSearch}
          matchCount={matches.length}
          playerCount={players.length}
          user={user}
          onAdminBtn={handleAdminBtn}
        />
        <Hero stats={heroStats} />

        {section === 'matches' ? (
          <MatchesPage />
        ) : (
          <PlayersPage />
        )}

        {selectedMatch  && <MatchModal  match={selectedMatch}  onClose={() => setSelectedMatch(null)}  />}
        {selectedPlayer && <PlayerModal player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />}
        {adminOpen      && <AdminPanel  onClose={() => setAdminOpen(false)} />}
        {loginOpen      && <LoginModal  onClose={() => setLoginOpen(false)} />}

        <Toast msg={toast.msg} type={toast.type} />
      </div>
    </AppContext.Provider>
  )
}

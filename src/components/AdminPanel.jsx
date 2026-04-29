import { useState, useEffect } from 'react'
import { useApp } from '../App'
import TagInput from './TagInput'
import { FORMATIONS, LEAGUES, SEASONS, POS_COLORS, SUGGEST_TAGS } from '../lib/constants'

const POSITIONS = ['GK','CB','LB','RB','LWB','RWB','SW','DM','CM','AM','LM','RM','LW','RW','SS','CF','ST']

function StarRating({ value, onChange }) {
  const [hover, setHover] = useState(0)
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map(i => (
        <span key={i}
              className={`rstar ${i <= (hover || value) ? 'on' : ''}`}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(0)}
              onClick={() => onChange(i === value ? 0 : i)}>
          ★
        </span>
      ))}
    </div>
  )
}

function VideoBuilder({ videos, setVideos }) {
  function add() { setVideos([...videos, { label: '', url: '' }]) }
  function remove(i) { setVideos(videos.filter((_, idx) => idx !== i)) }
  function update(i, field, val) {
    const next = [...videos]; next[i] = { ...next[i], [field]: val }; setVideos(next)
  }
  return (
    <div>
      <div className="flex flex-col gap-2 mb-2">
        {videos.map((v, i) => (
          <div key={i} className="grid gap-2" style={{ gridTemplateColumns: '1fr 2fr auto' }}>
            <input value={v.label} onChange={e => update(i, 'label', e.target.value)}
                   placeholder="Label (e.g. Full Match)"
                   className="bg-bg-3 border border-border text-fsw-text font-body text-xs px-2.5 py-1.5 rounded-lg outline-none focus:border-green-dim" />
            <input value={v.url} onChange={e => update(i, 'url', e.target.value)}
                   placeholder="Google Drive link" type="url"
                   className="bg-bg-3 border border-border text-fsw-text font-body text-xs px-2.5 py-1.5 rounded-lg outline-none focus:border-green-dim" />
            <button type="button" onClick={() => remove(i)}
                    className="bg-transparent border border-border-2 text-fsw-red text-xs px-2 py-1.5 rounded-lg
                               hover:bg-fsw-red hover:text-white transition-all">✕</button>
          </div>
        ))}
      </div>
      <button type="button" onClick={add}
              className="w-full bg-transparent border border-dashed border-border-2 text-fsw-muted2 font-body text-xs
                         py-2 rounded-lg transition-all hover:border-fsw-blue hover:text-fsw-blue">
        + Add Video Link
      </button>
    </div>
  )
}

const BLANK_MATCH = { homeTeam:'', awayTeam:'', homeFormation:'', awayFormation:'', league:'', season:'', matchDate:'', driveLink:'', tags:[], notes:'' }
const BLANK_PLAYER = { name:'', dob:'', nationality:'', club:'', position:'', foot:'', height:'', rating:0, tags:[], report:'', videos:[] }

export default function AdminPanel({ onClose }) {
  const { matches, players, addMatch, updateMatch, deleteMatch, addPlayer, updatePlayer, deletePlayer, user, logout, showToast } = useApp()

  const [tab,        setTab]        = useState('match')
  const [matchForm,  setMatchForm]  = useState(BLANK_MATCH)
  const [editMid,    setEditMid]    = useState(null)
  const [playerForm, setPlayerForm] = useState(BLANK_PLAYER)
  const [editPid,    setEditPid]    = useState(null)
  const [saving,     setSaving]     = useState(false)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // ── MATCH ──
  function resetMatch() { setMatchForm(BLANK_MATCH); setEditMid(null) }
  function editMatch(m) {
    setMatchForm({ homeTeam: m.homeTeam||'', awayTeam: m.awayTeam||'', homeFormation: m.homeFormation||'',
      awayFormation: m.awayFormation||'', league: m.league||'', season: m.season||'',
      matchDate: m.matchDate||m.date||'', driveLink: m.driveLink||m.link||'', tags: m.tags||[], notes: m.notes||'' })
    setEditMid(m.id); setTab('match')
  }
  async function saveMatch() {
    const { homeTeam, awayTeam, homeFormation, awayFormation, league, season, matchDate, driveLink } = matchForm
    if (!homeTeam || !awayTeam || !homeFormation || !awayFormation || !league || !season || !matchDate || !driveLink) {
      showToast('⚠ Fill all required fields', 'err'); return
    }
    setSaving(true)
    try {
      if (editMid) { await updateMatch(editMid, matchForm); showToast('✓ Match updated!') }
      else         { await addMatch(matchForm);              showToast('✓ Match added!') }
      resetMatch()
    } catch(e) { showToast('Error: ' + e.message, 'err') }
    setSaving(false)
  }

  // ── PLAYER ──
  function resetPlayer() { setPlayerForm(BLANK_PLAYER); setEditPid(null) }
  function editPlayer(p) {
    setPlayerForm({ name: p.name||'', dob: p.dob||'', nationality: p.nationality||'', club: p.club||'',
      position: p.position||'', foot: p.foot||'', height: p.height||'', rating: p.rating||0,
      tags: p.tags||[], report: p.report||'', videos: p.videos||[] })
    setEditPid(p.id); setTab('player')
  }
  async function savePlayer() {
    const { name, nationality, club, position } = playerForm
    if (!name || !nationality || !club || !position) {
      showToast('⚠ Name, Nationality, Club and Position required', 'err'); return
    }
    setSaving(true)
    try {
      const data = { ...playerForm, videos: playerForm.videos.filter(v => v.url?.trim()) }
      if (editPid) { await updatePlayer(editPid, data); showToast('✓ Player updated!') }
      else         { await addPlayer(data);              showToast('✓ Player added!') }
      resetPlayer()
    } catch(e) { showToast('Error: ' + e.message, 'err') }
    setSaving(false)
  }

  function fm(field) { return (val) => setMatchForm(f => ({ ...f, [field]: val })) }
  function fp(field) { return (val) => setPlayerForm(f => ({ ...f, [field]: val })) }

  const inputCls = "bg-bg-3 border border-border text-fsw-text font-body text-sm px-3 py-2 rounded-lg outline-none transition-colors focus:border-green-dim w-full"
  const selectCls = inputCls + " select-styled"

  return (
    <div className="fixed inset-0 bg-black/95 z-[700] flex items-start justify-center p-5 overflow-y-auto">
      <div className="bg-bg-2 border border-border-2 rounded-2xl w-full max-w-[820px] my-auto">

        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-4 flex-wrap">
            <h2 className="font-heading font-extrabold text-xl uppercase tracking-widest text-green">⚙ Admin Panel</h2>
            <div className="flex gap-1">
              {['match', 'player'].map(t => (
                <button key={t} onClick={() => setTab(t)}
                        className={`font-heading font-bold text-xs uppercase tracking-wide px-4 py-1 rounded-md border transition-all
                          ${tab === t ? 'text-green border-green-dim bg-green-glow' : 'text-fsw-muted2 border-border-2 hover:text-green hover:border-green-dim'}`}>
                  {t === 'match' ? 'Matches' : 'Players'}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="font-mono-custom text-[11px] text-fsw-muted2">{user?.email}</span>
            <button onClick={() => { logout(); onClose() }}
                    className="border border-border-2 text-fsw-red text-xs px-2.5 py-1 rounded-md hover:bg-fsw-red hover:text-white transition-all">
              Logout
            </button>
            <button onClick={onClose}
                    className="bg-bg-3 border border-border text-fsw-muted2 w-8 h-8 rounded-lg flex items-center justify-center hover:border-fsw-red hover:text-fsw-red transition-all">
              ✕
            </button>
          </div>
        </div>

        <div className="p-6">

          {/* ── MATCH FORM ── */}
          {tab === 'match' && (
            <div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="flex flex-col gap-1">
                  <label className="font-mono-custom text-[9px] text-fsw-muted uppercase tracking-widest">Home Team *</label>
                  <input value={matchForm.homeTeam} onChange={e => fm('homeTeam')(e.target.value)} placeholder="e.g. Manchester City" className={inputCls} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-mono-custom text-[9px] text-fsw-muted uppercase tracking-widest">Away Team *</label>
                  <input value={matchForm.awayTeam} onChange={e => fm('awayTeam')(e.target.value)} placeholder="e.g. Arsenal" className={inputCls} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-mono-custom text-[9px] text-fsw-muted uppercase tracking-widest">Home Formation *</label>
                  <select value={matchForm.homeFormation} onChange={e => fm('homeFormation')(e.target.value)} className={selectCls}>
                    <option value="">Select...</option>
                    {FORMATIONS.map(f => <option key={f}>{f}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-mono-custom text-[9px] text-fsw-muted uppercase tracking-widest">Away Formation *</label>
                  <select value={matchForm.awayFormation} onChange={e => fm('awayFormation')(e.target.value)} className={selectCls}>
                    <option value="">Select...</option>
                    {FORMATIONS.map(f => <option key={f}>{f}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-mono-custom text-[9px] text-fsw-muted uppercase tracking-widest">League *</label>
                  <select value={matchForm.league} onChange={e => fm('league')(e.target.value)} className={selectCls}>
                    <option value="">Select League...</option>
                    {LEAGUES.map(l => <option key={l.n}>{l.n}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-mono-custom text-[9px] text-fsw-muted uppercase tracking-widest">Season *</label>
                  <select value={matchForm.season} onChange={e => fm('season')(e.target.value)} className={selectCls}>
                    <option value="">Select...</option>
                    {SEASONS.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-mono-custom text-[9px] text-fsw-muted uppercase tracking-widest">Match Date *</label>
                  <input type="date" value={matchForm.matchDate} onChange={e => fm('matchDate')(e.target.value)} className={inputCls} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-mono-custom text-[9px] text-fsw-muted uppercase tracking-widest">Google Drive Link *</label>
                  <input type="url" value={matchForm.driveLink} onChange={e => fm('driveLink')(e.target.value)} placeholder="https://drive.google.com/..." className={inputCls} />
                </div>
                <div className="col-span-2 flex flex-col gap-1">
                  <label className="font-mono-custom text-[9px] text-fsw-muted uppercase tracking-widest">Tags</label>
                  <TagInput tags={matchForm.tags} setTags={fm('tags')} placeholder="High Press, Counter-Attack..." suggestions={SUGGEST_TAGS} />
                </div>
                <div className="col-span-2 flex flex-col gap-1">
                  <label className="font-mono-custom text-[9px] text-fsw-muted uppercase tracking-widest">Scout Notes</label>
                  <textarea value={matchForm.notes} onChange={e => fm('notes')(e.target.value)}
                            placeholder="Tactical observations, key moments..."
                            rows={4} className={inputCls + " resize-y min-h-[90px] text-xs leading-relaxed"} />
                </div>
              </div>

              <div className="flex gap-2.5 pt-4 border-t border-border">
                <button onClick={saveMatch} disabled={saving}
                        className="flex-1 bg-green text-black font-heading font-extrabold text-sm uppercase tracking-wide
                                   py-2.5 rounded-lg transition-all hover:bg-[#00ff87] disabled:opacity-50">
                  {saving ? 'Saving...' : (editMid ? '💾 Update Match' : '💾 Save Match')}
                </button>
                <button onClick={resetMatch}
                        className="bg-transparent border border-border-2 text-fsw-muted2 font-body text-sm px-5 py-2.5 rounded-lg hover:border-fsw-red hover:text-fsw-red transition-all">
                  Reset
                </button>
              </div>

              {/* Manage list */}
              <div className="mt-6 pt-5 border-t border-border">
                <div className="font-heading font-bold text-sm uppercase tracking-widest text-fsw-muted2 mb-3">Manage Matches</div>
                <div className="flex flex-col gap-2 max-h-[280px] overflow-y-auto">
                  {matches.length === 0 && <div className="text-fsw-muted font-mono-custom text-xs">No matches yet.</div>}
                  {[...matches].sort((a,b) => (a.homeTeam||'').localeCompare(b.homeTeam||'')).map(m => (
                    <div key={m.id} className="flex items-center justify-between gap-2.5 bg-bg-3 border border-border rounded-lg px-3.5 py-2.5">
                      <div>
                        <div className="font-heading font-bold text-sm">{m.homeTeam} vs {m.awayTeam}</div>
                        <div className="font-mono-custom text-[10px] text-fsw-muted mt-0.5">{m.league} · {m.season}</div>
                      </div>
                      <div className="flex gap-1.5 flex-shrink-0">
                        <button onClick={() => editMatch(m)} className="border border-fsw-blue/30 text-fsw-blue text-[11px] px-2.5 py-1 rounded-md hover:bg-fsw-blue/10 transition-all">Edit</button>
                        <button onClick={async () => { if(confirm('Delete?')) { await deleteMatch(m.id); showToast('Match deleted.') }}}
                                className="border border-fsw-red/30 text-fsw-red text-[11px] px-2.5 py-1 rounded-md hover:bg-fsw-red/10 transition-all">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── PLAYER FORM ── */}
          {tab === 'player' && (
            <div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="flex flex-col gap-1">
                  <label className="font-mono-custom text-[9px] text-fsw-muted uppercase tracking-widest">Full Name *</label>
                  <input value={playerForm.name} onChange={e => fp('name')(e.target.value)} placeholder="e.g. Erling Haaland" className={inputCls} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-mono-custom text-[9px] text-fsw-muted uppercase tracking-widest">Date of Birth</label>
                  <input type="date" value={playerForm.dob} onChange={e => fp('dob')(e.target.value)} className={inputCls} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-mono-custom text-[9px] text-fsw-muted uppercase tracking-widest">Nationality *</label>
                  <input value={playerForm.nationality} onChange={e => fp('nationality')(e.target.value)} placeholder="e.g. Norwegian" className={inputCls} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-mono-custom text-[9px] text-fsw-muted uppercase tracking-widest">Current Club *</label>
                  <input value={playerForm.club} onChange={e => fp('club')(e.target.value)} placeholder="e.g. Manchester City" className={inputCls} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-mono-custom text-[9px] text-fsw-muted uppercase tracking-widest">Position *</label>
                  <select value={playerForm.position} onChange={e => fp('position')(e.target.value)} className={selectCls}>
                    <option value="">Select...</option>
                    <optgroup label="Goalkeepers"><option>GK</option></optgroup>
                    <optgroup label="Defenders">{['CB','LB','RB','LWB','RWB','SW'].map(p => <option key={p}>{p}</option>)}</optgroup>
                    <optgroup label="Midfielders">{['DM','CM','AM','LM','RM'].map(p => <option key={p}>{p}</option>)}</optgroup>
                    <optgroup label="Forwards">{['LW','RW','SS','CF','ST'].map(p => <option key={p}>{p}</option>)}</optgroup>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-mono-custom text-[9px] text-fsw-muted uppercase tracking-widest">Foot</label>
                  <select value={playerForm.foot} onChange={e => fp('foot')(e.target.value)} className={selectCls}>
                    <option value="">Select...</option>
                    <option>Right</option><option>Left</option><option>Both</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-mono-custom text-[9px] text-fsw-muted uppercase tracking-widest">Height (cm)</label>
                  <input type="number" value={playerForm.height} onChange={e => fp('height')(e.target.value)} placeholder="e.g. 194" className={inputCls} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-mono-custom text-[9px] text-fsw-muted uppercase tracking-widest">Scout Rating (1–5)</label>
                  <StarRating value={playerForm.rating} onChange={fp('rating')} />
                </div>
                <div className="col-span-2 flex flex-col gap-1">
                  <label className="font-mono-custom text-[9px] text-fsw-muted uppercase tracking-widest">Tags / Attributes</label>
                  <TagInput tags={playerForm.tags} setTags={fp('tags')} placeholder="Aerial Duels, Dribbling..." />
                </div>
                <div className="col-span-2 flex flex-col gap-1">
                  <label className="font-mono-custom text-[9px] text-fsw-muted uppercase tracking-widest">Scouting Report</label>
                  <textarea value={playerForm.report} onChange={e => fp('report')(e.target.value)}
                            placeholder="Detailed scouting report: strengths, weaknesses, tactical fit, potential..."
                            rows={5} className={inputCls + " resize-y min-h-[90px] text-xs leading-relaxed"} />
                </div>
                <div className="col-span-2 flex flex-col gap-1">
                  <label className="font-mono-custom text-[9px] text-fsw-muted uppercase tracking-widest">Video Links</label>
                  <VideoBuilder videos={playerForm.videos} setVideos={fp('videos')} />
                </div>
              </div>

              <div className="flex gap-2.5 pt-4 border-t border-border">
                <button onClick={savePlayer} disabled={saving}
                        className="flex-1 bg-green text-black font-heading font-extrabold text-sm uppercase tracking-wide
                                   py-2.5 rounded-lg transition-all hover:bg-[#00ff87] disabled:opacity-50">
                  {saving ? 'Saving...' : (editPid ? '💾 Update Player' : '💾 Save Player')}
                </button>
                <button onClick={resetPlayer}
                        className="bg-transparent border border-border-2 text-fsw-muted2 font-body text-sm px-5 py-2.5 rounded-lg hover:border-fsw-red hover:text-fsw-red transition-all">
                  Reset
                </button>
              </div>

              {/* Manage list */}
              <div className="mt-6 pt-5 border-t border-border">
                <div className="font-heading font-bold text-sm uppercase tracking-widest text-fsw-muted2 mb-3">Manage Players</div>
                <div className="flex flex-col gap-2 max-h-[280px] overflow-y-auto">
                  {players.length === 0 && <div className="text-fsw-muted font-mono-custom text-xs">No players yet.</div>}
                  {[...players].sort((a,b) => (a.name||'').localeCompare(b.name||'')).map(p => (
                    <div key={p.id} className="flex items-center justify-between gap-2.5 bg-bg-3 border border-border rounded-lg px-3.5 py-2.5">
                      <div>
                        <div className="font-heading font-bold text-sm">{p.name}</div>
                        <div className="font-mono-custom text-[10px] text-fsw-muted mt-0.5">{p.position} · {p.club} · {p.nationality}</div>
                      </div>
                      <div className="flex gap-1.5 flex-shrink-0">
                        <button onClick={() => editPlayer(p)} className="border border-fsw-blue/30 text-fsw-blue text-[11px] px-2.5 py-1 rounded-md hover:bg-fsw-blue/10 transition-all">Edit</button>
                        <button onClick={async () => { if(confirm('Delete?')) { await deletePlayer(p.id); showToast('Player deleted.') }}}
                                className="border border-fsw-red/30 text-fsw-red text-[11px] px-2.5 py-1 rounded-md hover:bg-fsw-red/10 transition-all">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

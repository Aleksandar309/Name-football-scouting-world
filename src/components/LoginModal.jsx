import { useState, useEffect } from 'react'
import { useApp } from '../App'

export default function LoginModal({ onClose }) {
  const { login, showToast } = useApp()
  const [email, setEmail]   = useState('')
  const [pw,    setPw]      = useState('')
  const [err,   setErr]     = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  async function doLogin() {
    if (!email || !pw) { setErr('Please enter email and password'); return }
    setLoading(true); setErr('')
    try {
      await login(email, pw)
      showToast('✓ Logged in')
      onClose()
    } catch (e) {
      setErr(e.message.includes('password') || e.message.includes('user')
        ? 'Invalid email or password'
        : e.message)
    }
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-black/97 z-[800] flex items-center justify-center p-5">
      <div className="bg-bg-2 border border-border-2 rounded-2xl p-9 w-[360px]">
        <h3 className="font-heading font-extrabold text-xl uppercase tracking-widest text-green text-center mb-1">
          🔒 Admin Login
        </h3>
        <p className="font-mono-custom text-xs text-fsw-muted2 text-center mb-6">
          Secured by Firebase Authentication
        </p>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && doLogin()}
          className="w-full bg-bg-3 border border-border text-fsw-text font-body text-sm
                     px-3.5 py-2.5 rounded-lg outline-none transition-colors focus:border-green-dim
                     placeholder-fsw-muted mb-3 block"
        />
        <input
          type="password"
          placeholder="Password"
          value={pw}
          onChange={e => setPw(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && doLogin()}
          className="w-full bg-bg-3 border border-border text-fsw-text font-body text-sm
                     px-3.5 py-2.5 rounded-lg outline-none transition-colors focus:border-green-dim
                     placeholder-fsw-muted mb-3 block"
        />

        <button
          onClick={doLogin}
          disabled={loading}
          className="w-full bg-green text-black font-heading font-extrabold text-base uppercase
                     py-3 rounded-lg mb-2.5 transition-all hover:bg-[#00ff87] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
        <button
          onClick={onClose}
          className="w-full bg-transparent border border-border-2 text-fsw-muted2 font-body text-sm
                     py-2.5 rounded-lg transition-all hover:border-fsw-red hover:text-fsw-red"
        >
          Cancel
        </button>

        {err && <p className="font-mono-custom text-[12px] text-fsw-red text-center mt-3">{err}</p>}
      </div>
    </div>
  )
}

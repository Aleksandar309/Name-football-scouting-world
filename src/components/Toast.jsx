import { useEffect, useState } from 'react'

export default function Toast({ msg, type }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (msg) setVisible(true)
    else setTimeout(() => setVisible(false), 300)
  }, [msg])

  if (!msg && !visible) return null

  return (
    <div className={`
      fixed bottom-6 right-6 z-[9000] font-heading font-bold text-sm px-5 py-3 rounded-lg tracking-wide
      transition-all duration-300
      ${msg ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
      ${type === 'err' ? 'bg-fsw-red text-white' : 'bg-green text-black'}
    `}>
      {msg}
    </div>
  )
}

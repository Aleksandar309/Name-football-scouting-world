export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-bg z-[9999] flex items-center justify-center flex-col gap-4">
      <div className="font-heading font-black text-5xl uppercase tracking-widest text-green"
           style={{ textShadow: '0 0 40px rgba(0,230,118,0.4)' }}>
        ⚽ FSW
      </div>
      <div className="w-48 h-0.5 bg-border rounded overflow-hidden">
        <div className="loading-bar h-full" />
      </div>
      <div className="font-mono-custom text-xs text-fsw-muted tracking-widest uppercase">
        Loading database...
      </div>
    </div>
  )
}

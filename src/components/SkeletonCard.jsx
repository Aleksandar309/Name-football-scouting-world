export function MatchSkeleton() {
  return (
    <div className="bg-card border border-border rounded-[10px] overflow-hidden">
      <div className="h-0.5 skeleton w-full" />
      <div className="p-3.5 space-y-3">
        <div className="flex justify-between">
          <div className="skeleton h-4 w-12 rounded" />
          <div className="skeleton h-4 w-20 rounded" />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 space-y-1.5">
            <div className="skeleton h-5 w-3/4 rounded" />
            <div className="skeleton h-3 w-12 rounded" />
          </div>
          <div className="skeleton h-4 w-6 rounded" />
          <div className="flex-1 space-y-1.5">
            <div className="skeleton h-5 w-3/4 rounded ml-auto" />
            <div className="skeleton h-3 w-12 rounded ml-auto" />
          </div>
        </div>
        <div className="flex gap-1">
          {[1,2,3].map(i => <div key={i} className="skeleton h-4 w-16 rounded" />)}
        </div>
        <div className="skeleton h-8 w-full rounded" />
      </div>
      <div className="px-3.5 py-2 border-t border-border flex justify-between">
        <div className="skeleton h-3 w-12 rounded" />
        <div className="skeleton h-6 w-20 rounded" />
      </div>
    </div>
  )
}

export function PlayerSkeleton() {
  return (
    <div className="bg-card border border-border rounded-[10px] overflow-hidden">
      <div className="p-4 flex gap-3.5">
        <div className="skeleton w-14 h-14 rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-6 w-3/4 rounded" />
          <div className="skeleton h-4 w-1/2 rounded" />
          <div className="skeleton h-3 w-2/3 rounded" />
        </div>
      </div>
      <div className="px-4 pb-3 flex gap-2">
        {[1,2].map(i => <div key={i} className="skeleton h-6 w-20 rounded" />)}
      </div>
      <div className="px-4 py-2 border-t border-border flex justify-between">
        <div className="skeleton h-3 w-16 rounded" />
        <div className="skeleton h-6 w-24 rounded" />
      </div>
    </div>
  )
}

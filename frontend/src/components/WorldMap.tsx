export default function WorldMap() {
  const feed = [
    {
      creator: 'Neon Sutra',
      category: 'Interactive lore drop',
      stake: '3,250 $COOL',
      boost: '+38% feed reach',
    },
    {
      creator: 'Aeterna Pulse',
      category: 'Avatar wearable collection',
      stake: '2,400 $COOL',
      boost: '+24% feed reach',
    },
    {
      creator: 'Coral Cathedral',
      category: 'Music capsule',
      stake: '1,800 $COOL',
      boost: '+16% feed reach',
    },
  ]

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-emerald-950/20">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Discovery feed</p>
          <h2 className="mt-2 text-2xl font-bold text-white">Stake $COOL to climb the signal layer</h2>
          <p className="mt-2 max-w-3xl text-slate-300">
            Creators can stake $COOL for stronger discovery placement while collectors still see
            exactly why a drop is trending.
          </p>
        </div>
        <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
          Visibility is earned, not rented
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {feed.map((entry) => (
          <article key={entry.creator} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
            <p className="text-sm text-slate-400">{entry.category}</p>
            <h3 className="mt-2 text-xl font-semibold text-white">{entry.creator}</h3>
            <div className="mt-5 space-y-3 text-sm text-slate-300">
              <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-800 px-3 py-2">
                <span>Active stake</span>
                <span className="font-semibold text-emerald-200">{entry.stake}</span>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-800 px-3 py-2">
                <span>Discovery boost</span>
                <span className="font-semibold text-cyan-200">{entry.boost}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

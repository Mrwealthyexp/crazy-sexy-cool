const licenseTiers = [
  {
    tier: 'Tier 0',
    name: 'Civilian',
    description: 'No combat access, social/creator focus',
    accent: 'border-sky-400 bg-sky-500/10',
  },
  {
    tier: 'Tier 1',
    name: 'Sparring License',
    description: 'Training grounds only, no penalties',
    accent: 'border-emerald-400 bg-emerald-500/10',
  },
  {
    tier: 'Tier 2',
    name: 'Brawler License',
    description: 'Open-world PvP, reputation risk',
    accent: 'border-amber-400 bg-amber-500/10',
  },
  {
    tier: 'Tier 3',
    name: 'Champion License',
    description: 'Tournaments, rankings, prizes',
    accent: 'border-fuchsia-400 bg-fuchsia-500/10',
  },
  {
    tier: 'Tier 4',
    name: 'Warlord License',
    description: 'Territory control, gang mechanics',
    accent: 'border-rose-400 bg-rose-500/10',
  },
]

export default function CombatLicenseTiers() {
  return (
    <section className="rounded-2xl border border-white/10 bg-gray-800/80 p-6 shadow-xl shadow-black/20">
      <div className="mb-6 flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
          Regulated Combat
        </p>
        <h2 className="text-3xl font-bold text-white">Combat License Tiers</h2>
        <p className="max-w-2xl text-sm text-gray-300">
          Progression from civilian life to world-shaping conflict is gated by on-chain access.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {licenseTiers.map((license) => (
          <article
            key={license.tier}
            className={`rounded-xl border p-4 ${license.accent}`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-200">
              {license.tier}
            </p>
            <h3 className="mt-3 text-xl font-semibold text-white">{license.name}</h3>
            <p className="mt-2 text-sm text-gray-200">{license.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

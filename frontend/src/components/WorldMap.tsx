import type { CombatZone } from '../utils/api'

interface WorldMapProps {
  currentTierName: string
  zones: CombatZone[]
}

const statusStyles: Record<CombatZone['status'], string> = {
  social: 'bg-sky-500/15 text-sky-100',
  training: 'bg-emerald-500/15 text-emerald-100',
  contested: 'bg-amber-500/15 text-amber-100',
  competitive: 'bg-fuchsia-500/15 text-fuchsia-100',
  warlord: 'bg-rose-500/15 text-rose-100',
}

export default function WorldMap({ currentTierName, zones }: WorldMapProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-gray-800/80 p-5">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-white">World Map</h2>
        <p className="text-sm text-gray-300">
          {currentTierName} access determines which districts can legally host your combat actions.
        </p>
      </div>

      <div className="mt-5 space-y-3">
        {zones.map((zone) => (
          <article
            key={zone.id}
            className={`rounded-xl border p-4 ${
              zone.accessible ? 'border-white/10 bg-gray-900/70' : 'border-gray-700 bg-gray-900/40'
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-white">{zone.name}</h3>
                <p className="text-sm text-gray-400">{zone.district}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className={`rounded-full px-2 py-1 text-xs font-semibold ${statusStyles[zone.status]}`}>
                  {zone.status}
                </span>
                <span className="rounded-full bg-gray-700 px-2 py-1 text-xs font-semibold text-gray-100">
                  {zone.risk} risk
                </span>
              </div>
            </div>

            <p className="mt-3 text-sm text-gray-300">{zone.description}</p>

            <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-300">
              <span>Control: {zone.control}</span>
              <span>Required: {zone.requiredTierId.toUpperCase().replace('-', ' ')}</span>
              <span>{zone.accessible ? 'Accessible now' : 'Upgrade license to unlock'}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

import { zones } from '../data/zones'

const zoneStyles = {
  safe: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
  war: 'border-rose-500/40 bg-rose-500/10 text-rose-300',
  frontier: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
}

export default function WorldMap() {
  return (
    <section className="rounded-lg bg-gray-800 p-4 shadow-lg">
      <div className="mb-4">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-300">
          Combat geography
        </p>
        <h2 className="mt-2 text-2xl font-bold text-white">World map zones</h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {zones.map((zone) => (
          <article
            key={zone.id}
            className="rounded-lg border border-gray-700 bg-gray-900/70 p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{zone.name}</h3>
                <p className="mt-1 text-sm text-gray-400">{zone.description}</p>
              </div>
              <span
                className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${zoneStyles[zone.type]}`}
              >
                {zone.type}
              </span>
            </div>

            <dl className="mt-4 grid gap-3 text-sm text-gray-300 md:grid-cols-2">
              <div className="rounded-lg bg-gray-800 p-3">
                <dt className="text-gray-400">Coordinates</dt>
                <dd className="mt-1 font-medium text-white">
                  {zone.coordinates[0]}, {zone.coordinates[1]}
                </dd>
              </div>
              <div className="rounded-lg bg-gray-800 p-3">
                <dt className="text-gray-400">Rule set</dt>
                <dd className="mt-1 font-medium text-white">{zone.combatRule}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}

import { zones } from '../data/zones'

const phaseStyles = {
  Crazy: 'border-rose-400/30 bg-rose-500/10 text-rose-200',
  Sexy: 'border-fuchsia-400/30 bg-fuchsia-500/10 text-fuchsia-200',
  Cool: 'border-cyan-400/30 bg-cyan-500/10 text-cyan-200',
  All: 'border-amber-400/30 bg-amber-500/10 text-amber-200',
} as const

const safetyStyles = {
  Sanctuary: 'text-emerald-300',
  'Regulated PvP': 'text-amber-300',
  'Open Conflict': 'text-rose-300',
} as const

export default function WorldMap() {
  return (
    <div className="rounded-2xl border border-fuchsia-500/20 bg-gray-900/70 p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">World Map</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-300">
            Aeterna is split between sanctuaries, regulated dueling grounds, and open-conflict territory.
            Every zone carries a dominant worldly phase and a different opening for Great Teacher influence.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-gray-300">
          <p className="uppercase tracking-[0.25em] text-cyan-300">Active zones</p>
          <p className="mt-2 text-3xl font-black text-white">{zones.length}</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {zones.map((zone) => (
          <article key={zone.id} className="rounded-xl border border-white/10 bg-gray-950/70 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold text-white">{zone.name}</h3>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-300">{zone.description}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-medium ${phaseStyles[zone.worldlyPhase]}`}
                >
                  {zone.worldlyPhase}
                </span>
                <span className={`text-xs font-semibold uppercase tracking-[0.2em] ${safetyStyles[zone.safety]}`}>
                  {zone.safety}
                </span>
              </div>
            </div>

            <div className="mt-4 grid gap-3 text-sm text-gray-300 md:grid-cols-3">
              <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                <p className="uppercase tracking-[0.2em] text-gray-400">Coordinates</p>
                <p className="mt-2 font-medium text-white">
                  {zone.coordinates[0]}, {zone.coordinates[1]}
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                <p className="uppercase tracking-[0.2em] text-gray-400">Alignment</p>
                <p className="mt-2">{zone.alignment}</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                <p className="uppercase tracking-[0.2em] text-gray-400">Combat Rule</p>
                <p className="mt-2">{zone.combatRule}</p>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-cyan-400/20 bg-cyan-500/5 p-3">
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Teacher Opening</p>
              <p className="mt-2 text-sm text-cyan-100">{zone.teacherIntervention}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

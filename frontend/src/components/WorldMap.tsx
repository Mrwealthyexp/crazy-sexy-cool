import type { LunarPhaseEffect } from '../data/lunarPhases'

interface WorldMapProps {
  phase: LunarPhaseEffect
}

const realms = ['Aeterna', 'Shadow Arena', 'Coral Cathedrals']

export default function WorldMap({ phase }: WorldMapProps) {
  const getRealmState = () => {
    if (phase.name === 'Waxing') return 'Unlocked'
    if (phase.name === 'Waning') return 'Decaying'
    if (phase.name === 'Dark Moon') return 'Veiled'
    return 'Stable'
  }

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-4">World Map</h2>
      <div className="mb-4 rounded-md border border-cyan-500/30 bg-cyan-500/10 p-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-cyan-300">World Effect</p>
        <p className="mt-2 text-white">{phase.worldEffect}</p>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {realms.map((realm) => (
          <div key={realm} className="rounded-md bg-gray-900 p-3">
            <p className="text-lg font-semibold text-white">{realm}</p>
            <p className="mt-2 text-sm text-gray-400">{getRealmState()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

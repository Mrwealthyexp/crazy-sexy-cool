import type { Zone } from '../../../shared/game'

interface WorldMapProps {
  zones: Zone[]
  currentZoneId: string
  actionPending: boolean
  onEnterZone: (zoneId: string) => Promise<void>
  onAttemptCombat: (zoneId: string) => Promise<void>
}

export default function WorldMap({ zones, currentZoneId, actionPending, onEnterZone, onAttemptCombat }: WorldMapProps) {
  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-4">World Map</h2>
      <div className="space-y-3">
        {zones.map((zone) => {
          const isCurrent = zone.id === currentZoneId

          return (
            <div key={zone.id} className={`border rounded p-3 ${isCurrent ? 'border-purple-400' : 'border-gray-700'}`}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-white font-semibold">{zone.name}</h3>
                  <p className="text-gray-300 text-sm mt-1">{zone.description}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Combat: {zone.combatMode} • Coordinates: {zone.coordinates[0]}, {zone.coordinates[1]}
                  </p>
                </div>
                {isCurrent && <span className="text-xs px-2 py-1 rounded bg-purple-700 text-white">Current</span>}
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  disabled={actionPending || isCurrent}
                  onClick={() => {
                    void onEnterZone(zone.id)
                  }}
                  className="px-3 py-2 rounded bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 text-white text-xs"
                >
                  Enter Zone
                </button>
                <button
                  type="button"
                  disabled={actionPending}
                  onClick={() => {
                    void onAttemptCombat(zone.id)
                  }}
                  className="px-3 py-2 rounded bg-red-600 hover:bg-red-500 disabled:bg-gray-600 text-white text-xs"
                >
                  Attempt Combat
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

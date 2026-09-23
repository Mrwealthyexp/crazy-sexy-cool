import { useGameStore } from '../stores/gameStore'

function formatState(state: string) {
  return state.replace('-', ' ')
}

function formatAccess(access: string) {
  return access.replace('-', ' ')
}

export default function WorldMap() {
  const { currentMoonPhase, isGreatTeacher, zones, loading, resolveBattle } = useGameStore((state) => ({
    currentMoonPhase: state.currentMoonPhase,
    isGreatTeacher: state.isGreatTeacher,
    zones: state.zones,
    loading: state.loading,
    resolveBattle: state.resolveBattle,
  }))

  return (
    <div className="rounded-lg bg-gray-800 p-4">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">World Map</h2>
          <p className="mt-1 text-sm text-gray-400">
            Zone access and visibility now react to {currentMoonPhase} in real time.
          </p>
        </div>
        <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-200">
          {isGreatTeacher ? 'Teacher sight active' : 'Seeker sight'}
        </span>
      </div>

      <div className="grid gap-3">
        {zones.map((zone) => {
          const hiddenByDarkMoon = currentMoonPhase === 'Dark Moon' && !isGreatTeacher && zone.visibility === 'obscured'

          return (
            <div key={zone.id} className="rounded-md border border-gray-700 bg-gray-900 p-4">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold text-white">
                      {hiddenByDarkMoon ? 'Unknown Sanctuary' : zone.name}
                    </h3>
                    <span className="rounded-full bg-gray-700 px-2 py-1 text-xs uppercase tracking-wide text-gray-200">
                      {zone.affinity}
                    </span>
                    <span className="rounded-full bg-gray-700 px-2 py-1 text-xs uppercase tracking-wide text-gray-200">
                      {formatState(zone.state)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-400">{zone.region} · {zone.coordinates.join(', ')}</p>
                  <p className="mt-2 text-gray-300">
                    {hiddenByDarkMoon ? 'The zone is veiled. Only Great Teachers can read its truth.' : zone.description}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-wide text-cyan-300">
                    Access: {formatAccess(zone.access)} · Reward focus: {zone.rewardFocus}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {zone.features.map((feature) => (
                      <span key={feature} className="rounded-full bg-gray-800 px-2 py-1 text-xs text-gray-300">
                        {hiddenByDarkMoon ? '???' : feature}
                      </span>
                    ))}
                  </div>
                </div>
                {zone.pvp ? (
                  <button
                    type="button"
                    onClick={() => void resolveBattle(zone.id)}
                    disabled={loading || zone.access === 'teacher-only'}
                    className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-700"
                  >
                    Resolve PvP
                  </button>
                ) : null}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

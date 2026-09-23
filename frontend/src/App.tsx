import { useEffect } from 'react'
import './index.css'
import QuestBoard from './components/QuestBoard'
import SoulDashboard from './components/SoulDashboard'
import SoulForge from './components/SoulForge'
import WorldMap from './components/WorldMap'
import { lunarPhases } from './data/lunarPhases'
import { getPhaseTheme, useGameStore } from './stores/gameStore'

function App() {
  const currentMoonPhase = useGameStore((state) => state.currentMoonPhase)
  const connection = useGameStore((state) => state.connection)
  const loading = useGameStore((state) => state.loading)
  const error = useGameStore((state) => state.error)
  const setMoonPhase = useGameStore((state) => state.setMoonPhase)
  const clearError = useGameStore((state) => state.clearError)

  const activePhase = getPhaseTheme(currentMoonPhase)

  useEffect(() => {
    void useGameStore.getState().initializeGame()
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="border-b border-gray-800 bg-gray-950/80 p-4">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Crazy Sexy Cool</h1>
            <p className="mt-2 text-gray-300">Lunar cycles now drive live quests, world access, PvP karma, and Great Teacher powers.</p>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="rounded-full bg-gray-800 px-3 py-1 uppercase tracking-wide text-gray-300">
              {connection}
            </span>
            {loading ? (
              <span className="rounded-full bg-purple-500/20 px-3 py-1 uppercase tracking-wide text-purple-200">
                syncing
              </span>
            ) : null}
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-4 p-4">
        <section className="rounded-lg bg-gray-800 p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-purple-300">Current Phase</p>
              <h2 className="mt-2 text-3xl font-bold">{activePhase.name}</h2>
              <p className="mt-2 text-gray-300">{activePhase.theme}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {lunarPhases.map((phase) => (
                <button
                  key={phase.name}
                  type="button"
                  onClick={() => void setMoonPhase(phase.name)}
                  disabled={loading}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${
                    phase.name === activePhase.name
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                  }`}
                >
                  {phase.name}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm text-gray-200">
              <thead className="text-gray-400">
                <tr>
                  <th className="pb-2 pr-4">Phase</th>
                  <th className="pb-2 pr-4">Player Effect</th>
                  <th className="pb-2">World Effect</th>
                </tr>
              </thead>
              <tbody>
                {lunarPhases.map((phase) => (
                  <tr key={phase.name} className={phase.name === activePhase.name ? 'text-white' : 'text-gray-300'}>
                    <td className="border-t border-gray-700 py-3 pr-4 font-semibold">{phase.name}</td>
                    <td className="border-t border-gray-700 py-3 pr-4">{phase.playerEffect}</td>
                    <td className="border-t border-gray-700 py-3">{phase.worldEffect}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {error ? (
          <section className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-amber-100">
            <div className="flex items-start justify-between gap-3">
              <p>{error}</p>
              <button type="button" onClick={clearError} className="font-semibold text-amber-200">
                Dismiss
              </button>
            </div>
          </section>
        ) : null}

        <section className="grid gap-4 xl:grid-cols-2">
          <SoulDashboard />
          <WorldMap />
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <QuestBoard />
          <SoulForge />
        </section>
      </main>
    </div>
  )
}

export default App

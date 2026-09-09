import './index.css'
import { useMemo, useState } from 'react'
import SoulDashboard from './components/SoulDashboard'
import SoulForge from './components/SoulForge'
import WorldMap from './components/WorldMap'
import { defaultMoonPhase, lunarPhases, type MoonPhase } from './data/lunarPhases'

function App() {
  const [currentPhase, setCurrentPhase] = useState<MoonPhase>(defaultMoonPhase)

  const activePhase = useMemo(
    () => lunarPhases.find((phase) => phase.name === currentPhase) ?? lunarPhases[0],
    [currentPhase],
  )

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-3xl font-bold">Crazy Sexy Cool</h1>
        <p className="mt-2 text-gray-300">Lunar cycles now shape both soul progression and the world itself.</p>
      </header>
      <main className="mx-auto grid max-w-6xl gap-4 p-4">
        <section className="rounded-lg bg-gray-800 p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-purple-300">Current Phase</p>
              <h2 className="mt-2 text-3xl font-bold text-white">{activePhase.name}</h2>
              <p className="mt-2 text-gray-300">{activePhase.theme}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {lunarPhases.map((phase) => (
                <button
                  key={phase.name}
                  type="button"
                  onClick={() => setCurrentPhase(phase.name)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
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
                  <tr
                    key={phase.name}
                    className={phase.name === activePhase.name ? 'text-white' : 'text-gray-300'}
                  >
                    <td className="border-t border-gray-700 py-3 pr-4 font-semibold">{phase.name}</td>
                    <td className="border-t border-gray-700 py-3 pr-4">{phase.playerEffect}</td>
                    <td className="border-t border-gray-700 py-3">{phase.worldEffect}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="grid gap-4 lg:grid-cols-2">
          <SoulDashboard phase={activePhase} />
          <WorldMap phase={activePhase} />
        </section>
        <section>
          <SoulForge />
        </section>
      </main>
    </div>
  )
}

export default App

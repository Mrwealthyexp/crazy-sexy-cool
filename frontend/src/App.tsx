import './index.css'
import CombatLicenseTiers from './components/CombatLicenseTiers'
import SoulDashboard from './components/SoulDashboard'
import SoulForge from './components/SoulForge'
import WorldMap from './components/WorldMap'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
      <header className="border-b border-white/10 bg-gray-900/80 px-6 py-5 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-violet-300">
            Crazy Sexy Cool
          </p>
          <h1 className="text-4xl font-bold">Choose your right to fight.</h1>
          <p className="max-w-3xl text-sm text-gray-300">
            Combat access scales from social play to territory warfare through a tiered license system.
          </p>
        </div>
      </header>
      <main className="mx-auto grid max-w-7xl gap-6 px-6 py-8">
        <CombatLicenseTiers />
        <section className="grid gap-6 lg:grid-cols-3">
          <SoulForge />
          <SoulDashboard />
          <WorldMap />
        </section>
      </main>
    </div>
  )
}

export default App

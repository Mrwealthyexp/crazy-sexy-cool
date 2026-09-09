import './index.css'
import SoulDashboard from './components/SoulDashboard'
import SoulForge from './components/SoulForge'
import WorldMap from './components/WorldMap'

function App() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#312e81_0%,#111827_45%,#030712_100%)] text-white">
      <header className="border-b border-white/10 bg-gray-950/70 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Transcendence Engine Metaverse</p>
          <h1 className="mt-3 text-4xl font-black sm:text-5xl">Crazy Sexy Cool</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-300 sm:text-base">
            Your birth determines your destiny. Your karma determines your power. Your enlightenment changes
            the world.
          </p>
        </div>
      </header>
      <main className="mx-auto grid max-w-7xl gap-6 px-6 py-8">
        <SoulDashboard />
        <div className="grid gap-6 lg:grid-cols-2">
          <SoulForge />
          <WorldMap />
        </div>
      </main>
    </div>
  )
}

export default App

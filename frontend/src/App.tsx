import './index.css'
import CombatLicensePanel from './components/CombatLicensePanel'
import SoulDashboard from './components/SoulDashboard'
import WorldMap from './components/WorldMap'

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="border-b border-gray-800 bg-gray-950/80 p-6">
        <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">
          Crazy Sexy Cool
        </p>
        <h1 className="mt-2 text-4xl font-bold">
          Combat licensing & war zone rules
        </h1>
        <p className="mt-3 max-w-3xl text-sm text-gray-300">
          Regulated PvP protects civilians, gates combat through merit and reputation, and keeps high-risk rewards inside designated war zones.
        </p>
      </header>
      <main className="mx-auto grid max-w-7xl gap-6 p-6">
        <SoulDashboard />
        <CombatLicensePanel />
        <WorldMap />
      </main>
    </div>
  )
}

export default App

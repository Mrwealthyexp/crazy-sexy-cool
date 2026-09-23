import './index.css'
import SoulDashboard from './components/SoulDashboard'
import SoulForge from './components/SoulForge'
import WorldMap from './components/WorldMap'

function App() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(217,70,239,0.18),_transparent_30%),linear-gradient(180deg,_#020617_0%,_#111827_45%,_#020617_100%)] text-white">
      <header className="border-b border-white/10 bg-slate-950/60 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <p className="text-sm uppercase tracking-[0.35em] text-fuchsia-300">Crazy Sexy Cool</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
            A transcendence engine where birth, karma, and weather teach enlightenment through play.
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 md:text-lg">
            This prototype implements the first three foundation layers: the smart-contract model, the Soul Forge
            character flow, and the product narrative for a digital monastery with a wallet connection.
          </p>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-6 px-6 py-8">
        <div className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
          <SoulForge />
          <SoulDashboard />
        </div>
        <WorldMap />
        <section className="rounded-3xl border border-slate-700 bg-slate-900/80 p-6">
          <h2 className="text-2xl font-semibold">Prototype promises delivered here</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <ValueCard
              title="Smart contract suite"
              body="Soul creation, karmic accounting, world weather, and transcendence progression now exist as concrete Solidity contracts."
            />
            <ValueCard
              title="Playable character creation"
              body="The front-end now turns wallet and birth inputs into a deterministic soul blueprint with planetary and lunar consequences."
            />
            <ValueCard
              title="Narrative package"
              body="The docs have been rewritten so investors and collaborators can understand the spiritual-mechanical system as a coherent product."
            />
          </div>
        </section>
      </main>
    </div>
  )
}

export default App

function ValueCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-5">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-300">{body}</p>
    </div>
  )
}

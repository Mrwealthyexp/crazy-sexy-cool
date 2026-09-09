import './index.css'
import SoulDashboard from './components/SoulDashboard'
import SoulForge from './components/SoulForge'
import WorldMap from './components/WorldMap'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-fuchsia-500/20 bg-slate-900/90 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">Crazy Sexy Cool</p>
          <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Creator economy built for creators first</h1>
          <p className="mt-4 max-w-3xl text-base text-slate-300 sm:text-lg">
            Launch content with a 90/10 split, lock automatic secondary royalties on-chain, and
            let creators stake $COOL to rise through the discovery feed.
          </p>
        </div>
      </header>
      <main className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8">
        <section className="grid gap-4 rounded-3xl border border-fuchsia-500/20 bg-gradient-to-r from-fuchsia-500/10 via-slate-900 to-cyan-500/10 p-6 lg:grid-cols-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300">
              Primary sales
            </p>
            <p className="mt-3 text-4xl font-bold">90%</p>
            <p className="mt-2 text-slate-300">Creators keep the revenue they generate.</p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Secondary sales
            </p>
            <p className="mt-3 text-4xl font-bold">Auto royalties</p>
            <p className="mt-2 text-slate-300">
              Smart contracts route creator payouts every time content changes hands.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
              Discovery
            </p>
            <p className="mt-3 text-4xl font-bold">Stake $COOL</p>
            <p className="mt-2 text-slate-300">
              Stake to earn premium placement without sacrificing ownership.
            </p>
          </div>
        </section>
        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <SoulDashboard />
          <SoulForge />
        </section>
        <WorldMap />
      </main>
    </div>
  )
}

export default App

import { divinePowers } from '../data/divinePowers'

export default function SoulDashboard() {
  return (
    <div className="rounded-2xl border border-fuchsia-500/20 bg-gray-800/90 p-6 shadow-xl shadow-fuchsia-950/20">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Great Teacher Codex</p>
        <h2 className="mt-2 text-3xl font-bold text-white">Planetary Divine Powers</h2>
        <p className="mt-2 max-w-3xl text-sm text-gray-300">
          Great Teachers channel planetary force through Crazy, Sexy, and Cool phases, but every miracle
          leaves a karmic mark behind.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {divinePowers.map((power) => (
          <article
            key={power.planet}
            className="flex h-full flex-col rounded-xl border border-white/10 bg-gray-900/70 p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-fuchsia-300">
                  {power.symbol} {power.planet}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-white">{power.divinePower}</h3>
              </div>
              <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-200">
                {power.worldlyPhase}
              </span>
            </div>

            <p className="mt-4 flex-1 text-sm leading-6 text-gray-300">{power.description}</p>

            <div className="mt-5 rounded-lg border border-amber-400/20 bg-amber-500/5 p-3">
              <p className="text-xs uppercase tracking-[0.25em] text-amber-300">Karmic Cost</p>
              <p className="mt-2 text-sm text-amber-100">{power.karmicCost}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

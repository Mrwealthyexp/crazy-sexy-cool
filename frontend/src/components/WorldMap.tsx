import { getMoonDefinition } from '../data/transcendence'
import { zones } from '../data/zones'
import { useGameStore } from '../stores/gameStore'

export default function WorldMap() {
  const playerSoul = useGameStore((state) => state.playerSoul)
  const moonEffect = playerSoul ? getMoonDefinition(playerSoul.blueprint.moonPhase) : null

  return (
    <section className="rounded-3xl border border-violet-500/20 bg-slate-900/80 p-6 shadow-2xl shadow-violet-950/20">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-violet-300">3 · World architecture</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Spiritual territories shaped by weather and motive</h2>
        </div>
        {moonEffect && (
          <div className="rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-slate-200">
            <p className="font-semibold text-white">{playerSoul?.blueprint.moonPhase} moon blessing</p>
            <p>{moonEffect.playerEffect}</p>
          </div>
        )}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {zones.map((zone) => {
          const unlocked = !playerSoul
            ? zone.unlockStage === 'crazy'
            : stageRank(playerSoul.currentStage) >= stageRank(zone.unlockStage)

          return (
            <article
              key={zone.id}
              className={`rounded-2xl border p-5 ${
                unlocked ? 'border-violet-500/20 bg-violet-500/5' : 'border-slate-700 bg-slate-950/60'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold text-white">{zone.name}</h3>
                  <p className="mt-1 text-sm uppercase tracking-[0.2em] text-violet-200">{zone.dominantEnergy}</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    unlocked ? 'bg-emerald-500/15 text-emerald-100' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {unlocked ? 'Accessible' : `Unlocks at ${zone.unlockStage}`}
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-300">{zone.description}</p>
              <div className="mt-4 space-y-2 text-sm text-slate-200">
                <p>Great Teacher effect: {zone.greatTeacherEffect}</p>
                <p>Danger: {zone.danger}</p>
                <p>
                  Coordinates: [{zone.coordinates[0]}, {zone.coordinates[1]}]
                </p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function stageRank(stage: string) {
  return ['crazy', 'sexy', 'cool', 'integrated', 'servant', 'mysterious', 'great-teacher', 'enlightened'].indexOf(
    stage,
  )
}

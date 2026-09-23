import { useMemo, useState } from 'react'
import { getActionsForStage, getReadableKarmicAudit, getTranscendenceTrack } from '../data/transcendence'
import { useGameStore } from '../stores/gameStore'

export default function SoulDashboard() {
  const playerSoul = useGameStore((state) => state.playerSoul)
  const latestMessage = useGameStore((state) => state.latestMessage)
  const performMilestone = useGameStore((state) => state.performMilestone)
  const applyDebt = useGameStore((state) => state.applyDebt)
  const advanceStage = useGameStore((state) => state.advanceStage)
  const askWorldQuestion = useGameStore((state) => state.askWorldQuestion)
  const [worldQuestionDraft, setWorldQuestionDraft] = useState('What are you really fighting for?')

  const currentActions = useMemo(
    () => (playerSoul ? getActionsForStage(playerSoul.currentStage) : []),
    [playerSoul],
  )
  const stageTrack = useMemo(
    () => (playerSoul ? getTranscendenceTrack(playerSoul.currentStage) : []),
    [playerSoul],
  )

  if (!playerSoul) {
    return (
      <section className="rounded-3xl border border-slate-700 bg-slate-900/80 p-6">
        <h2 className="text-3xl font-semibold text-white">2 · Soul Dashboard</h2>
        <p className="mt-4 text-sm leading-6 text-slate-300">
          No soul exists yet. Use the Soul Forge to create a blueprint, then return here to simulate karmic growth,
          stage gates, and Great Teacher powers.
        </p>
      </section>
    )
  }

  return (
    <section className="rounded-3xl border border-sky-500/20 bg-slate-900/80 p-6 shadow-2xl shadow-sky-950/20">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-sky-300">2 · Character state & karmic ledger</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">{playerSoul.blueprint.name}</h2>
          <p className="mt-2 text-sm text-slate-300">
            {playerSoul.blueprint.elementalAffinity} soul · {playerSoul.blueprint.rulingPlanet} ruled ·{' '}
            {playerSoul.blueprint.temperament} temperament
          </p>
        </div>
        <div className="rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-slate-200">
          <p>SOUL: {playerSoul.soulTokens.toLocaleString()}</p>
          <p>COOL: {playerSoul.coolTokens.toLocaleString()}</p>
          <p>{getReadableKarmicAudit(playerSoul)}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <MetricCard label="White karma" value={playerSoul.karma.white} tint="emerald" />
        <MetricCard label="Gray karma" value={playerSoul.karma.gray} tint="amber" />
        <MetricCard label="Black karma" value={playerSoul.karma.black} tint="rose" />
      </div>

      <div className="mt-6 grid gap-3">
        {stageTrack.map((stage) => (
          <div
            key={stage.id}
            className={`rounded-2xl border p-4 ${
              stage.current
                ? 'border-fuchsia-400 bg-fuchsia-500/10'
                : stage.completed
                  ? 'border-emerald-500/20 bg-emerald-500/5'
                  : 'border-slate-700 bg-slate-950/60'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{stage.icon}</span>
              <div>
                <p className="font-semibold text-white">{stage.label}</p>
                <p className="text-sm text-slate-300">{stage.motto}</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-300">{stage.lesson}</p>
            <p className="mt-2 text-sm text-slate-100">Gate: {stage.gate}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-950/80 p-4">
        <h3 className="text-xl font-semibold text-white">Current stage actions</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {currentActions.map((action) => {
            const done = playerSoul.completedMilestones.includes(action.id)
            return (
              <button
                key={action.id}
                type="button"
                disabled={done}
                className={`rounded-2xl border p-4 text-left transition ${
                  done
                    ? 'cursor-default border-emerald-500/20 bg-emerald-500/10 text-emerald-100'
                    : 'border-slate-700 bg-slate-900 hover:border-fuchsia-400 hover:bg-fuchsia-500/10'
                }`}
                onClick={() => performMilestone(action.id)}
              >
                <p className="font-semibold text-white">{action.title}</p>
                <p className="mt-2 text-sm text-slate-300">{action.description}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-400">
                  {done ? 'Completed' : `+${action.soulDelta} SOUL`}
                </p>
              </button>
            )
          })}
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            className="rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
            onClick={() => advanceStage()}
            type="button"
          >
            Advance to next stage
          </button>
          <button
            className="rounded-full border border-amber-500/40 px-5 py-3 text-sm font-semibold text-amber-200 transition hover:bg-amber-500/10"
            onClick={() => applyDebt('gray')}
            type="button"
          >
            Simulate gray karma
          </button>
          <button
            className="rounded-full border border-rose-500/40 px-5 py-3 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/10"
            onClick={() => applyDebt('black')}
            type="button"
          >
            Simulate black karma
          </button>
        </div>
      </div>

      {playerSoul.isEnlightened && (
        <div className="mt-6 rounded-2xl border border-fuchsia-500/20 bg-fuchsia-950/20 p-4">
          <h3 className="text-xl font-semibold text-white">World Question</h3>
          <p className="mt-2 text-sm text-slate-300">
            Enlightened souls can alter the rules of reality by asking the entire server a single honest question.
          </p>
          <textarea
            className="mt-4 min-h-24 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
            value={worldQuestionDraft}
            onChange={(event) => setWorldQuestionDraft(event.target.value)}
          />
          <button
            className="mt-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
            onClick={() => askWorldQuestion(worldQuestionDraft)}
            type="button"
          >
            Ask the world
          </button>
          {playerSoul.lastWorldQuestion && (
            <p className="mt-3 text-sm text-fuchsia-100">Last question: {playerSoul.lastWorldQuestion}</p>
          )}
        </div>
      )}

      <p className="mt-6 rounded-2xl border border-slate-700 bg-slate-950/80 p-4 text-sm leading-6 text-slate-200">
        {latestMessage}
      </p>
    </section>
  )
}

function MetricCard({ label, value, tint }: { label: string; value: number; tint: 'emerald' | 'amber' | 'rose' }) {
  const tintClass =
    tint === 'emerald'
      ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-100'
      : tint === 'amber'
        ? 'border-amber-500/20 bg-amber-500/10 text-amber-100'
        : 'border-rose-500/20 bg-rose-500/10 text-rose-100'

  return (
    <div className={`rounded-2xl border p-4 ${tintClass}`}>
      <p className="text-xs uppercase tracking-[0.25em]">{label}</p>
      <p className="mt-2 text-3xl font-semibold">{value.toLocaleString()}</p>
    </div>
  )
}

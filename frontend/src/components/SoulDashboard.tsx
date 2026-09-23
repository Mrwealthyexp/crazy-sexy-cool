import { getPhaseTheme, useGameStore } from '../stores/gameStore'

export default function SoulDashboard() {
  const {
    playerLevel,
    karma,
    souls,
    wisdom,
    currentMoonPhase,
    isGreatTeacher,
    ledgerStatus,
    loading,
    invokeTeacherPower,
  } = useGameStore((state) => ({
    playerLevel: state.playerLevel,
    karma: state.karma,
    souls: state.souls,
    wisdom: state.wisdom,
    currentMoonPhase: state.currentMoonPhase,
    isGreatTeacher: state.isGreatTeacher,
    ledgerStatus: state.ledgerStatus,
    loading: state.loading,
    invokeTeacherPower: state.invokeTeacherPower,
  }))

  const phase = getPhaseTheme(currentMoonPhase)
  const shouldHideStats = currentMoonPhase === 'Dark Moon' && !isGreatTeacher
  const teacherPowerCost = currentMoonPhase === 'Full Moon' ? 2 : 4
  const stats = [
    { label: 'Level', value: playerLevel },
    { label: 'Karma', value: karma },
    { label: 'Souls', value: souls },
    { label: 'Wisdom', value: wisdom },
  ]

  return (
    <div className="rounded-lg bg-gray-800 p-4">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Soul Dashboard</h2>
          <p className="mt-1 text-sm text-gray-400">{isGreatTeacher ? 'Great Teacher awakened' : 'Teacher path in progress'}</p>
        </div>
        <button
          type="button"
          onClick={() => void invokeTeacherPower()}
          disabled={!isGreatTeacher || loading}
          className="rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-gray-950 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-300"
        >
          Cast Fair Emotions ({teacherPowerCost} souls)
        </button>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-md bg-gray-900 p-3">
            <p className="text-sm uppercase tracking-wide text-gray-400">{stat.label}</p>
            <p className="mt-1 text-2xl font-semibold text-white">{shouldHideStats ? '???' : stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <div className="rounded-md border border-purple-500/30 bg-purple-500/10 p-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-purple-300">Active Player Effect</p>
          <p className="mt-2 text-white">{phase.playerEffect}</p>
        </div>
        <div className="rounded-md border border-emerald-500/30 bg-emerald-500/10 p-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">Karmic Ledger</p>
          <p className="mt-2 text-white">{ledgerStatus.note}</p>
          <p className="mt-1 text-xs uppercase tracking-wide text-emerald-200">
            {ledgerStatus.mode} · {ledgerStatus.synced ? 'synced' : 'awaiting contract wiring'}
          </p>
        </div>
      </div>
    </div>
  )
}

import {
  consequenceRules,
  getCombatReadiness,
  useGameStore,
} from '../stores/gameStore'

export default function SoulDashboard() {
  const playerLevel = useGameStore((state) => state.playerLevel)
  const karma = useGameStore((state) => state.karma)
  const souls = useGameStore((state) => state.souls)
  const combatProfile = useGameStore((state) => state.combatProfile)
  const toggleCombatMode = useGameStore((state) => state.toggleCombatMode)
  const readiness = getCombatReadiness(combatProfile)

  return (
    <section className="rounded-lg bg-gray-800 p-4 shadow-lg">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-fuchsia-300">
            Soul dashboard
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white">
            Combat badge control
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-gray-300">
            Combat is always opt-in. Licensed players stay protected as civilians until they equip the combat mode badge.
          </p>
        </div>

        <button
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            combatProfile.combatModeEquipped
              ? 'bg-rose-500 text-white hover:bg-rose-400'
              : 'bg-cyan-400 text-gray-950 hover:bg-cyan-300'
          }`}
          onClick={toggleCombatMode}
          type="button"
        >
          {combatProfile.combatModeEquipped
            ? 'Unequip combat badge'
            : 'Equip combat badge'}
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Player level" value={`Lv. ${playerLevel}`} />
        <StatCard label="Karma" value={karma.toString()} />
        <StatCard label="Souls forged" value={souls.toString()} />
        <StatCard label="Reputation" value={`${combatProfile.reputationScore}/100`} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-lg border border-gray-700 bg-gray-900/70 p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Current posture
              </h3>
              <p className="mt-1 text-sm text-gray-400">
                {readiness.statusDescription}
              </p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                readiness.combatReady
                  ? 'bg-emerald-500/15 text-emerald-300'
                  : 'bg-sky-500/15 text-sky-300'
              }`}
            >
              {readiness.statusLabel}
            </span>
          </div>

          <dl className="mt-4 grid gap-3 text-sm text-gray-300 md:grid-cols-2">
            <div className="rounded-lg bg-gray-800 p-3">
              <dt className="text-gray-400">Combat tier</dt>
              <dd className="mt-1 text-lg font-semibold text-white">
                Tier {combatProfile.currentTier}
              </dd>
            </div>
            <div className="rounded-lg bg-gray-800 p-3">
              <dt className="text-gray-400">Bounty status</dt>
              <dd className="mt-1 text-lg font-semibold text-white">
                {combatProfile.activeBounty > 0
                  ? `${combatProfile.activeBounty} $COOL`
                  : 'Clear record'}
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-lg border border-gray-700 bg-gray-900/70 p-4">
          <h3 className="text-lg font-semibold text-white">
            Consequence system
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-gray-300">
            {consequenceRules.map((rule) => (
              <li key={rule.title} className="rounded-lg bg-gray-800 p-3">
                <p className="font-medium text-white">{rule.title}</p>
                <p className="mt-1 text-gray-400">{rule.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-gray-700 bg-gray-900/70 p-4">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    </div>
  )
}

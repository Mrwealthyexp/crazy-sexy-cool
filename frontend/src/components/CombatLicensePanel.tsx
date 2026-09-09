import {
  evaluateLicenseTiers,
  useGameStore,
} from '../stores/gameStore'

export default function CombatLicensePanel() {
  const combatProfile = useGameStore((state) => state.combatProfile)
  const tierEvaluations = evaluateLicenseTiers(combatProfile)

  return (
    <section className="rounded-lg bg-gray-800 p-4 shadow-lg">
      <div className="mb-4">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
          License acquisition
        </p>
        <h2 className="mt-2 text-2xl font-bold text-white">
          Regulated combat progression
        </h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {tierEvaluations.map((tier) => (
          <article
            key={tier.tier}
            className="rounded-lg border border-gray-700 bg-gray-900/70 p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                Tier {tier.tier}
              </h3>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  tier.eligible
                    ? 'bg-emerald-500/15 text-emerald-300'
                    : 'bg-amber-500/15 text-amber-300'
                }`}
              >
                {tier.eligible ? 'Ready to unlock' : 'Requirements pending'}
              </span>
            </div>

            <dl className="mb-4 space-y-2 text-sm text-gray-300">
              <div className="flex justify-between gap-4">
                <dt>Token burn</dt>
                <dd>{tier.coolBurn} $COOL</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Time lock</dt>
                <dd>{tier.waitDays === 0 ? 'None' : `${tier.waitDays} days`}</dd>
              </div>
            </dl>

            <ul className="space-y-2 text-sm text-gray-300">
              {tier.requirements.map((requirement) => (
                <li key={requirement.label} className="flex gap-2">
                  <span className={requirement.met ? 'text-emerald-300' : 'text-rose-300'}>
                    {requirement.met ? '✓' : '✕'}
                  </span>
                  <span>{requirement.label}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

import type { CombatTier } from '../utils/api'

interface CombatLicenseTiersProps {
  tiers: CombatTier[]
  isUpdating: boolean
  onSelectTier: (tierId: string) => void
}

export default function CombatLicenseTiers({
  tiers,
  isUpdating,
  onSelectTier,
}: CombatLicenseTiersProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-gray-800/80 p-6 shadow-xl shadow-black/20">
      <div className="mb-6 flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">
          Regulated Combat
        </p>
        <h2 className="text-3xl font-bold text-white">Combat License Tiers</h2>
        <p className="max-w-2xl text-sm text-gray-300">
          Progression from civilian life to world-shaping conflict is gated by on-chain access.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {tiers.map((license) => (
          <article
            key={license.id}
            className={`rounded-xl border p-4 transition ${
              license.active
                ? 'border-violet-400 bg-violet-500/15 shadow-lg shadow-violet-950/40'
                : 'border-white/10 bg-white/5'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-300">
                  {license.tier}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-white">{license.name}</h3>
              </div>
              <span
                className={`rounded-full px-2 py-1 text-xs font-semibold ${
                  license.active
                    ? 'bg-violet-400/20 text-violet-100'
                    : license.unlocked
                      ? 'bg-emerald-400/20 text-emerald-100'
                      : 'bg-gray-700 text-gray-300'
                }`}
              >
                {license.active ? 'Active' : license.unlocked ? 'Unlocked' : 'Locked'}
              </span>
            </div>

            <p className="mt-2 text-sm text-gray-200">{license.description}</p>
            <dl className="mt-4 space-y-2 text-sm text-gray-300">
              <div>
                <dt className="font-semibold text-gray-100">Access</dt>
                <dd>{license.access}</dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-100">Penalty</dt>
                <dd>{license.penalty}</dd>
              </div>
            </dl>

            <ul className="mt-4 space-y-2 text-sm text-gray-300">
              {license.activities.map((activity) => (
                <li key={activity} className="flex gap-2">
                  <span className="text-violet-300">•</span>
                  <span>{activity}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => onSelectTier(license.id)}
              disabled={isUpdating || license.active}
              className="mt-5 w-full rounded-lg border border-white/10 bg-gray-900 px-3 py-2 text-sm font-semibold text-white transition hover:border-violet-300 hover:text-violet-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {license.active ? 'Current tier' : isUpdating ? 'Updating...' : 'Preview tier'}
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

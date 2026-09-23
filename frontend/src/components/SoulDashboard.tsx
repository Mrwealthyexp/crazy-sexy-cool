import type { CombatOverview } from '../utils/api'

interface SoulDashboardProps {
  overview: CombatOverview
}

export default function SoulDashboard({ overview }: SoulDashboardProps) {
  const activeTier = overview.tiers.find((tier) => tier.active)
  const accessibleZones = overview.zones.filter((zone) => zone.accessible).length

  return (
    <section className="rounded-2xl border border-white/10 bg-gray-800/80 p-5">
      <h2 className="text-2xl font-bold text-white">Soul Dashboard</h2>
      <p className="mt-2 text-sm text-gray-300">
        Current combat posture and progression pressure across Aeterna.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-gray-900/70 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Active license</p>
          <p className="mt-2 text-xl font-semibold text-white">{activeTier?.name}</p>
          <p className="mt-1 text-sm text-gray-300">{activeTier?.description}</p>
        </div>
        <div className="rounded-xl bg-gray-900/70 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Bounty risk</p>
          <p className="mt-2 text-xl font-semibold text-white">{overview.bountyRisk}</p>
          <p className="mt-1 text-sm text-gray-300">{overview.reputation} reputation on chain</p>
        </div>
        <div className="rounded-xl bg-gray-900/70 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Zone access</p>
          <p className="mt-2 text-xl font-semibold text-white">
            {accessibleZones}/{overview.zones.length} districts
          </p>
          <p className="mt-1 text-sm text-gray-300">Unlocked through current license tier</p>
        </div>
        <div className="rounded-xl bg-gray-900/70 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Competitive status</p>
          <p className="mt-2 text-xl font-semibold text-white">
            {overview.tournamentRank ? `Rank #${overview.tournamentRank}` : 'Unranked'}
          </p>
          <p className="mt-1 text-sm text-gray-300">
            {overview.territoriesHeld > 0
              ? `${overview.territoriesHeld} territories under control`
              : 'No territory obligations'}
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-xl bg-violet-500/10 p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-violet-200">Recommended next moves</p>
        <ul className="mt-3 space-y-2 text-sm text-violet-50">
          {overview.recommendations.map((recommendation) => (
            <li key={recommendation}>• {recommendation}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

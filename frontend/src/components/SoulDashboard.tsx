import type { LunarPhaseEffect } from '../data/lunarPhases'
import { initialGameState } from '../stores/gameStore'

interface SoulDashboardProps {
  phase: LunarPhaseEffect
}

export default function SoulDashboard({ phase }: SoulDashboardProps) {
  const stats = [
    { label: 'Level', value: initialGameState.playerLevel },
    { label: 'Karma', value: initialGameState.karma },
    { label: 'Souls', value: initialGameState.souls },
    { label: 'Wisdom', value: initialGameState.wisdom },
  ]

  const shouldHideStats = phase.name === 'Dark Moon'

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-4">Soul Dashboard</h2>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-md bg-gray-900 p-3">
            <p className="text-sm uppercase tracking-wide text-gray-400">{stat.label}</p>
            <p className="mt-1 text-2xl font-semibold text-white">
              {shouldHideStats ? '???' : stat.value}
            </p>
          </div>
        ))}
      </div>
      <div className="rounded-md border border-purple-500/30 bg-purple-500/10 p-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-purple-300">Player Effect</p>
        <p className="mt-2 text-white">{phase.playerEffect}</p>
      </div>
    </div>
  )
}

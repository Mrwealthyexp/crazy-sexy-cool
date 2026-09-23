import type { PlayerState, Zone } from '../../../shared/game'

interface SoulDashboardProps {
  player: PlayerState
  currentZone?: Zone
}

export default function SoulDashboard({ player, currentZone }: SoulDashboardProps) {
  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-4">Soul Dashboard</h2>
      <dl className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-gray-400">Level</dt>
          <dd className="text-white font-semibold">{player.level}</dd>
        </div>
        <div>
          <dt className="text-gray-400">Karma</dt>
          <dd className="text-white font-semibold">{player.karma}</dd>
        </div>
        <div>
          <dt className="text-gray-400">Souls</dt>
          <dd className="text-white font-semibold">{player.souls}</dd>
        </div>
        <div>
          <dt className="text-gray-400">Current Zone</dt>
          <dd className="text-white font-semibold">{currentZone?.name ?? 'Unknown'}</dd>
        </div>
      </dl>
    </div>
  )
}

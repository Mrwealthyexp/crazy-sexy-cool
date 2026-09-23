import type { PlayerState } from '../../../shared/game'

interface SoulForgeProps {
  player: PlayerState
  onToggleCombatLicense: () => Promise<void>
  actionPending: boolean
}

export default function SoulForge({ player, onToggleCombatLicense, actionPending }: SoulForgeProps) {
  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-4">Soul Forge</h2>
      <div className="space-y-2 text-gray-200 text-sm">
        <p>Worldly State: {player.worldlyState.toUpperCase()}</p>
        <p>Combat License: {player.hasCombatLicense ? 'Active' : 'Inactive'}</p>
      </div>
      <button
        type="button"
        disabled={actionPending}
        onClick={() => {
          void onToggleCombatLicense()
        }}
        className="mt-4 px-3 py-2 rounded bg-purple-600 hover:bg-purple-500 disabled:bg-gray-600 text-white text-sm"
      >
        {player.hasCombatLicense ? 'Deactivate License' : 'Activate License'}
      </button>
    </div>
  )
}

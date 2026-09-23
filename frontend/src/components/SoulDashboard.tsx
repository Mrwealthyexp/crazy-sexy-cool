import { useGameStore } from '../stores/gameStore'

const actions = [
  { type: 'meditate' as const, label: 'Meditate', helper: 'Gain focus and white karma' },
  { type: 'create-artifact' as const, label: 'Create Artifact', helper: 'Publish value to the world' },
  { type: 'complete-bounty' as const, label: 'Earn COOL', helper: 'Convert skill into reward' },
  { type: 'license-combat' as const, label: 'License Combat', helper: 'Unlock regulated conflict' },
  { type: 'engage-combat' as const, label: 'Engage Combat', helper: 'Test licensed force in Shadow Arena' },
  { type: 'transcend' as const, label: 'Transcend', helper: 'Author the world question' },
]

export default function SoulDashboard() {
  const player = useGameStore((state) => state.player)
  const loading = useGameStore((state) => state.loading)
  const runAction = useGameStore((state) => state.runAction)

  if (!player) {
    return (
      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Progression System</p>
            <h2>Soul Dashboard</h2>
          </div>
        </div>
        <p className="lead">Load a wallet to inspect karma, rewards, and unlocked systems.</p>
      </section>
    )
  }

  const actionState = player.soul
    ? `${player.soul.worldState.toUpperCase()} state · Focus ${player.soul.focus}`
    : 'No soul forged yet'

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Progression System</p>
          <h2>Soul Dashboard</h2>
        </div>
        <span className="badge">{actionState}</span>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <span>Level</span>
          <strong>{player.level}</strong>
        </div>
        <div className="stat-card">
          <span>COOL Balance</span>
          <strong>{player.coolBalance}</strong>
        </div>
        <div className="stat-card">
          <span>Reputation</span>
          <strong>{player.karma.reputation}</strong>
        </div>
        <div className="stat-card">
          <span>Combat License</span>
          <strong>{player.soul?.combatLicensed ? 'Active' : 'Pending'}</strong>
        </div>
      </div>

      <div className="karma-grid">
        <div>
          <span>White</span>
          <strong>{player.karma.white}</strong>
        </div>
        <div>
          <span>Gray</span>
          <strong>{player.karma.gray}</strong>
        </div>
        <div>
          <span>Black</span>
          <strong>{player.karma.black}</strong>
        </div>
      </div>

      <div className="stack-sm">
        <h3>Action Loop</h3>
        <div className="action-grid">
          {actions.map((action) => (
            <button
              key={action.type}
              className="action-card"
              disabled={loading || !player.soul}
              onClick={() =>
                runAction({
                  type: action.type,
                  zoneId: action.type === 'engage-combat' ? 'shadow-arena' : action.type === 'create-artifact' ? 'aeterna-gate' : undefined,
                  payload:
                    action.type === 'complete-bounty'
                      ? { masteryScore: 90 }
                      : action.type === 'engage-combat'
                        ? { honorable: true }
                        : undefined,
                })
              }
              type="button"
            >
              <strong>{action.label}</strong>
              <span>{action.helper}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="stack-sm">
        <h3>Unlocked systems</h3>
        <div className="pill-row">
          {player.unlockedSystems.map((system) => (
            <span key={system} className="pill">
              {system}
            </span>
          ))}
        </div>
      </div>

      <div className="stack-sm">
        <h3>Recent actions</h3>
        <ul className="history-list">
          {player.actionHistory.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

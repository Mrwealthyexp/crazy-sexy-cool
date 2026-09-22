import { initialGameState } from '../stores/gameStore'

const profileCards = [
  { label: 'Combat license tier', value: `Tier ${initialGameState.licenseTier}` },
  { label: 'Reputation score', value: String(initialGameState.reputationScore) },
  { label: '$COOL balance', value: `${initialGameState.coolBalance} COOL` },
  { label: 'Stable credits', value: `${initialGameState.stableCredits} CSC` },
]

export default function SoulDashboard() {
  return (
    <section className="panel">
      <p className="eyebrow">Frontend app state</p>
      <h2>Soul Dashboard</h2>
      <p className="muted">
        Intended home for avatar identity, licenses, balances, holdings, and world-access
        status derived from protocol and backend data.
      </p>

      <div className="stat-grid">
        {profileCards.map((card) => (
          <div key={card.label} className="stat-card">
            <span>{card.label}</span>
            <strong>{card.value}</strong>
          </div>
        ))}
      </div>

      <ul className="checklist">
        <li>Show soulbound achievements and combat-license entitlements.</li>
        <li>Surface token balances, owned assets, and land visibility.</li>
        <li>Display governance readiness and reputation warnings.</li>
      </ul>
    </section>
  )
}

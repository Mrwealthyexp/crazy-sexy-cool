import { isWalletConfigured, walletEnvironment } from '../utils/wagmi'

const onboardingSteps = [
  'Connect a wallet instead of creating an email/password account.',
  'Mint or select an avatar identity to act as the primary player profile.',
  'Attach balances, licenses, and reputation to the avatar lifecycle.',
]

export default function SoulForge() {
  return (
    <section className="panel">
      <p className="eyebrow">Frontend web3</p>
      <h2>Soul Forge</h2>
      <p className="muted">
        This screen is the intended entry point for wallet-first onboarding, avatar minting,
        and ERC-6551 identity bootstrapping.
      </p>

      <div className="stat-grid">
        <div className="stat-card">
          <span>Default chain</span>
          <strong>{walletEnvironment.defaultChainId}</strong>
        </div>
        <div className="stat-card">
          <span>WalletConnect</span>
          <strong>{isWalletConfigured() ? 'Configured' : 'Needs project ID'}</strong>
        </div>
      </div>

      <ul className="checklist">
        {onboardingSteps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ul>
    </section>
  )
}

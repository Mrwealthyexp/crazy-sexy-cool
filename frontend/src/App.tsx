import './index.css'
import SoulDashboard from './components/SoulDashboard'
import SoulForge from './components/SoulForge'
import WorldMap from './components/WorldMap'

const navigationSections = [
  'Onboarding',
  'Dashboard',
  'Marketplace',
  'Combat',
  'Governance',
]

function App() {
  return (
    <div className="app-shell">
      <header className="hero-panel">
        <p className="eyebrow">Wallet-native metaverse scaffold</p>
        <h1>Crazy Sexy Cool</h1>
        <p className="hero-copy">
          A Base-first product shell for wallet onboarding, avatar identity, reputation,
          licensed combat, creator commerce, and governance.
        </p>
        <div className="pill-row">
          {navigationSections.map((section) => (
            <span key={section} className="pill">
              {section}
            </span>
          ))}
        </div>
      </header>

      <main className="content-grid">
        <SoulForge />
        <SoulDashboard />
        <WorldMap />
      </main>
    </div>
  )
}

export default App

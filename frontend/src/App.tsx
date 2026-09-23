import { useEffect } from 'react'

import SoulDashboard from './components/SoulDashboard'
import SoulForge from './components/SoulForge'
import WorldMap from './components/WorldMap'
import { useGameStore } from './stores/gameStore'
import { shortenWallet, supportedChain } from './utils/wagmi'

function App() {
  const wallet = useGameStore((state) => state.wallet)
  const player = useGameStore((state) => state.player)
  const world = useGameStore((state) => state.world)
  const message = useGameStore((state) => state.message)
  const error = useGameStore((state) => state.error)
  const loading = useGameStore((state) => state.loading)
  const setWallet = useGameStore((state) => state.setWallet)
  const loadGame = useGameStore((state) => state.loadGame)

  useEffect(() => {
    void loadGame()
  }, [loadGame])

  const activeZone = world?.zones.find((zone) => zone.id === player?.activeZoneId)

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Crazy Sexy Cool · Wallet-native metaverse</p>
          <h1>This is your data, your content, your community.</h1>
          <p className="hero-copy">
            Forge a sovereign soul, convert skill into COOL, and unlock regulated combat plus transcendence.
          </p>
        </div>
        <div className="hero-card">
          <label>
            Wallet identity
            <input value={wallet} onChange={(event) => setWallet(event.target.value)} placeholder="0xA11CE" />
          </label>
          <button className="primary-button" disabled={loading} onClick={() => void loadGame()} type="button">
            {loading ? 'Syncing…' : 'Enter world'}
          </button>
          <div className="hero-meta">
            <span>{supportedChain.name}</span>
            <span>{player ? shortenWallet(player.wallet) : 'Awaiting wallet'}</span>
          </div>
        </div>
      </header>

      <section className="status-bar">
        <div>
          <strong>Status</strong>
          <p>{error ?? message}</p>
        </div>
        <div>
          <strong>Active Zone</strong>
          <p>{activeZone?.name ?? 'Soul Forge'}</p>
        </div>
        <div>
          <strong>World Question</strong>
          <p>{world?.currentQuestion ?? 'No transcended question yet'}</p>
        </div>
      </section>

      <main className="layout-grid">
        <SoulForge />
        <SoulDashboard />
        <WorldMap />
      </main>
    </div>
  )
}

export default App

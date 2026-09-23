import { useEffect, useMemo, useState } from 'react'
import type { GameState } from '../../shared/game'
import SoulDashboard from './components/SoulDashboard'
import SoulForge from './components/SoulForge'
import WorldMap from './components/WorldMap'
import { fetchGameData, submitGameAction } from './utils/api'

function App() {
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [loading, setLoading] = useState(true)
  const [actionPending, setActionPending] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setErrorMessage(null)

      try {
        const state = await fetchGameData()
        setGameState(state)
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'Unable to load game state.')
      } finally {
        setLoading(false)
      }
    }

    void load()
  }, [])

  const runAction = async (type: 'ENTER_ZONE' | 'ATTEMPT_COMBAT' | 'TOGGLE_COMBAT_LICENSE', zoneId?: string) => {
    setActionPending(true)
    setErrorMessage(null)
    setStatusMessage(null)

    try {
      const result = await submitGameAction({ type, zoneId })
      setGameState(result.state)

      if (result.ok) {
        setStatusMessage(result.message)
      } else {
        setErrorMessage(result.message)
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Action failed unexpectedly.')
    } finally {
      setActionPending(false)
    }
  }

  const currentZone = useMemo(
    () => gameState?.zones.find((zone) => zone.id === gameState.player.currentZoneId),
    [gameState],
  )

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 text-white p-4 border-b border-gray-700">
        <h1 className="text-3xl font-bold">Crazy Sexy Cool</h1>
        <p className="text-sm text-gray-300 mt-1">MVP Vertical Slice: Zone Entry + Combat Gating</p>
      </header>

      <main className="p-4 max-w-6xl mx-auto space-y-4">
        {loading && <p className="text-gray-300">Loading world state...</p>}

        {errorMessage && <div className="p-3 rounded bg-red-900/60 border border-red-700">{errorMessage}</div>}

        {statusMessage && <div className="p-3 rounded bg-emerald-900/60 border border-emerald-700">{statusMessage}</div>}

        {!loading && gameState && (
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="space-y-4">
              <SoulDashboard player={gameState.player} currentZone={currentZone} />
              <SoulForge
                player={gameState.player}
                actionPending={actionPending}
                onToggleCombatLicense={async () => runAction('TOGGLE_COMBAT_LICENSE')}
              />
            </div>
            <div className="lg:col-span-2">
              <WorldMap
                zones={gameState.zones}
                currentZoneId={gameState.player.currentZoneId}
                actionPending={actionPending}
                onEnterZone={async (zoneId) => runAction('ENTER_ZONE', zoneId)}
                onAttemptCombat={async (zoneId) => runAction('ATTEMPT_COMBAT', zoneId)}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App

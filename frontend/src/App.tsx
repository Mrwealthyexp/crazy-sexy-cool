import './index.css'
import { useEffect, useState } from 'react'
import CombatLicenseTiers from './components/CombatLicenseTiers'
import SoulDashboard from './components/SoulDashboard'
import SoulForge from './components/SoulForge'
import WorldMap from './components/WorldMap'
import { fetchCombatOverview, setCombatMode, type CombatOverview } from './utils/api'

function App() {
  const [overview, setOverview] = useState<CombatOverview | null>(null)
  const [loading, setLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadOverview = async () => {
      try {
        const nextOverview = await fetchCombatOverview()
        setOverview(nextOverview)
      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : 'Unable to load combat overview')
      } finally {
        setLoading(false)
      }
    }

    void loadOverview()
  }, [])

  const handleSelectTier = async (tierId: string) => {
    setIsUpdating(true)
    setError(null)

    try {
      const nextOverview = await setCombatMode(tierId)
      setOverview(nextOverview)
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to update combat license')
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
      <header className="border-b border-white/10 bg-gray-900/80 px-6 py-5 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-violet-300">
            Crazy Sexy Cool
          </p>
          <h1 className="text-4xl font-bold">Choose your right to fight.</h1>
          <p className="max-w-3xl text-sm text-gray-300">
            Combat access scales from social play to territory warfare through a tiered license system.
          </p>
        </div>
      </header>
      <main className="mx-auto grid max-w-7xl gap-6 px-6 py-8">
        {error ? (
          <div className="rounded-xl border border-rose-400/40 bg-rose-500/10 p-4 text-sm text-rose-100">
            {error}
          </div>
        ) : null}

        {loading || !overview ? (
          <div className="rounded-2xl border border-white/10 bg-gray-800/80 p-6 text-sm text-gray-300">
            Syncing combat licensing ledger...
          </div>
        ) : (
          <>
            <CombatLicenseTiers
              tiers={overview.tiers}
              isUpdating={isUpdating}
              onSelectTier={handleSelectTier}
            />
            <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <WorldMap
                currentTierName={overview.tiers.find((tier) => tier.active)?.name ?? 'Civilian'}
                zones={overview.zones}
              />
              <div className="grid gap-6">
                <SoulDashboard overview={overview} />
                <SoulForge />
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  )
}

export default App

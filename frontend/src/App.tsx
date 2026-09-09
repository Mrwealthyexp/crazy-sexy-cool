import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider, ConnectButton } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { config } from './utils/wagmi'
import { useGameStore } from './stores/gameStore'
import SoulForge from './components/SoulForge'
import WorldMap from './components/WorldMap'
import SoulDashboard from './components/SoulDashboard'

const queryClient = new QueryClient()

function AppContent() {
  const { soulId } = useGameStore()

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          CRAZY SEXY COOL
        </h1>
        <div className="flex items-center gap-4">
          {soulId && (
            <span className="text-sm text-gray-400 font-mono">
              Soul #{soulId.toString()}
            </span>
          )}
          <ConnectButton />
        </div>
      </nav>

      <main className="pt-20">
        {!soulId ? <SoulForge /> : (
          <div className="h-[calc(100vh-5rem)] flex flex-col">
            <SoulDashboard />
            <WorldMap />
          </div>
        )}
      </main>
    </div>
  )
}

export default function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <AppContent />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

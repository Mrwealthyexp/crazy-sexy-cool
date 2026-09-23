import './index.css'
import SoulDashboard from './components/SoulDashboard'
import SoulForge from './components/SoulForge'
import WorldMap from './components/WorldMap'
import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi'
import { requiredChain } from './utils/wagmi'

function App() {
  const { address, chain, isConnected } = useAccount()
  const { connectors, connect, isPending: isConnectPending } = useConnect()
  const { disconnect } = useDisconnect()
  const { switchChain, isPending: isSwitchPending } = useSwitchChain()

  const isWrongNetwork = isConnected && chain?.id !== requiredChain.id

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 text-white p-4 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Crazy Sexy Cool</h1>
        <div className="flex items-center gap-2">
          {!isConnected &&
            connectors.map((connector) => (
              <button
                key={connector.id}
                onClick={() => connect({ connector })}
                className="rounded-md bg-indigo-600 hover:bg-indigo-500 px-3 py-2 text-sm font-semibold"
                disabled={isConnectPending}
              >
                {isConnectPending ? 'Connecting...' : `Connect ${connector.name}`}
              </button>
            ))}
          {isConnected && (
            <>
              <span className="text-sm text-gray-200">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
              <button
                onClick={() => disconnect()}
                className="rounded-md bg-gray-600 hover:bg-gray-500 px-3 py-2 text-sm font-semibold"
              >
                Disconnect
              </button>
            </>
          )}
        </div>
      </header>
      <main className="p-4 space-y-4">
        {isWrongNetwork && (
          <div className="rounded-md border border-amber-500 bg-amber-950/50 p-4 text-amber-200">
            <p className="font-semibold">Wrong network detected.</p>
            <p className="text-sm mt-1">Switch to Base Sepolia to continue.</p>
            <button
              className="mt-3 rounded-md bg-amber-500 px-3 py-2 text-sm font-semibold text-black disabled:opacity-70"
              disabled={isSwitchPending || !switchChain}
              onClick={() => switchChain?.({ chainId: requiredChain.id })}
            >
              {isSwitchPending ? 'Switching...' : 'Switch Network'}
            </button>
          </div>
        )}
        <SoulDashboard />
        <SoulForge />
        <WorldMap />
      </main>
    </div>
  )
}

export default App

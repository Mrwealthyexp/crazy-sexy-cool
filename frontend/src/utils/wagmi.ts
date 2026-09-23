import { createConfig, http } from 'wagmi'
import { base, baseSepolia } from 'wagmi/chains'

const sharedRpcUrl = import.meta.env.VITE_RPC_URL
const mainnetRpcUrl = import.meta.env.VITE_BASE_RPC_URL || sharedRpcUrl
const testnetRpcUrl = import.meta.env.VITE_BASE_SEPOLIA_RPC_URL || sharedRpcUrl
const walletConnectProjectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID

export const walletEnvironment = import.meta.env.PROD ? 'mainnet' : 'testnet'
export const isWalletConfigured = Boolean(walletConnectProjectId)
export const walletChain = walletEnvironment === 'mainnet' ? base : baseSepolia

export const wagmiConfig = createConfig({
  chains: [base, baseSepolia],
  transports: {
    [base.id]: http(mainnetRpcUrl || undefined),
    [baseSepolia.id]: http(testnetRpcUrl || undefined),
  },
})

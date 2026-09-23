import { createConfig, http } from 'wagmi'
import { base, baseSepolia } from 'wagmi/chains'

const rpcUrl = import.meta.env.VITE_RPC_URL

export const walletEnvironment = import.meta.env.PROD ? 'mainnet' : 'testnet'
export const isWalletConfigured = Boolean(rpcUrl)
export const walletChain = walletEnvironment === 'mainnet' ? base : baseSepolia

export const wagmiConfig = createConfig({
  chains: [base, baseSepolia],
  transports: {
    [base.id]: http(rpcUrl || undefined),
    [baseSepolia.id]: http(rpcUrl || undefined),
  },
})

import { createConfig, http } from 'wagmi'
import { base, baseSepolia } from 'wagmi/chains'

const supportedChains = [base, baseSepolia] as const
const configuredChainId = Number(import.meta.env.VITE_CHAIN_ID ?? baseSepolia.id)
const activeChain = supportedChains.find((chain) => chain.id === configuredChainId) ?? baseSepolia
const rpcUrl = import.meta.env.VITE_RPC_URL?.trim()

export const wagmiConfig = createConfig({
  chains: [activeChain],
  transports: {
    [activeChain.id]: http(rpcUrl || undefined),
  },
})

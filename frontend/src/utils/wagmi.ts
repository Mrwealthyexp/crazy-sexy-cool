import { createConfig, http } from 'wagmi'
import { base, baseSepolia } from 'wagmi/chains'

const supportedChains = [base, baseSepolia] as const
const configuredChainId = Number(import.meta.env.VITE_CHAIN_ID ?? baseSepolia.id)
const rpcUrl = import.meta.env.VITE_RPC_URL?.trim()
export const defaultChainId = supportedChains.find((chain) => chain.id === configuredChainId)?.id ?? baseSepolia.id

export const wagmiConfig = createConfig({
  chains: supportedChains,
  transports: {
    [base.id]: http(rpcUrl || undefined),
    [baseSepolia.id]: http(rpcUrl || undefined),
  },
})

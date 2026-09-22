const defaultBaseChainId = 8453
const defaultBaseSepoliaChainId = 84532

export interface SupportedChain {
  id: number
  name: string
  rpcUrl: string
  environment: 'mainnet' | 'testnet'
}

export interface WalletEnvironment {
  walletConnectProjectId: string
  defaultChainId: number
  supportedChains: SupportedChain[]
}

export const walletEnvironment: WalletEnvironment = {
  walletConnectProjectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID ?? '',
  defaultChainId: Number(import.meta.env.VITE_DEFAULT_CHAIN_ID ?? defaultBaseSepoliaChainId),
  supportedChains: [
    {
      id: defaultBaseChainId,
      name: 'Base',
      rpcUrl: import.meta.env.VITE_BASE_RPC_URL ?? 'https://mainnet.base.org',
      environment: 'mainnet',
    },
    {
      id: defaultBaseSepoliaChainId,
      name: 'Base Sepolia',
      rpcUrl: import.meta.env.VITE_BASE_SEPOLIA_RPC_URL ?? 'https://sepolia.base.org',
      environment: 'testnet',
    },
  ],
}

export function isWalletConfigured(): boolean {
  return walletEnvironment.walletConnectProjectId.trim().length > 0
}

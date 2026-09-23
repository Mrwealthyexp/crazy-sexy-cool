export interface WalletEnvironment {
  rpcUrl: string
  contractAddress: string
  chainName: string
}

export const walletEnvironment: WalletEnvironment = {
  rpcUrl: import.meta.env.VITE_RPC_URL || '',
  contractAddress: import.meta.env.VITE_CONTRACT_ADDRESS || '',
  chainName: 'Base Sepolia',
}

export const isWalletConfigured = Boolean(
  walletEnvironment.rpcUrl && walletEnvironment.contractAddress,
)

export const wagmiConfig = {
  walletEnvironment,
  isWalletConfigured,
}

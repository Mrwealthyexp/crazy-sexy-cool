export const walletConnectionConfig = {
  chain: Number(import.meta.env.VITE_CHAIN_ID || 84532),
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || '',
  rpcUrl: import.meta.env.VITE_RPC_URL || 'https://sepolia.base.org',
  accountModel: 'erc-6551',
}

export function hasWalletConnectionConfig() {
  return walletConnectionConfig.projectId.length > 0
}

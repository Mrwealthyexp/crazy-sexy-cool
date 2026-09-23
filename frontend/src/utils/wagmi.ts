export const supportedChain = {
  id: 84532,
  name: 'Base Sepolia',
  currency: 'ETH',
}

export function shortenWallet(address: string) {
  if (address.length <= 10) {
    return address
  }

  return `${address.slice(0, 6)}…${address.slice(-4)}`
}

export function mockTokenBoundAccount(wallet: string) {
  return `${wallet.toLowerCase()}-soul-vault`
}

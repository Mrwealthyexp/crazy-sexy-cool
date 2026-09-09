import { configureChains, createConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

// Wagmi configuration here

export const CONTRACTS = {
  baseSepolia: {
    soulForge: '0x...',
    transcendenceEngine: '0x...',
    karmicLedger: '0x...',
    coolToken: '0x...',
    weatherOracle: '0x...',
  },
  base: {
    // Mainnet addresses after production deployment
  },
}

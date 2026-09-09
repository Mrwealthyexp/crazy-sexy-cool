import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { baseSepolia, base } from 'wagmi/chains'

export const config = getDefaultConfig({
  appName: 'Crazy Sexy Cool',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID',
  chains: [baseSepolia, base],
})

export const CONTRACTS = {
  baseSepolia: {
    soulForge: '0x0000000000000000000000000000000000000000',
    transcendenceEngine: '0x0000000000000000000000000000000000000000',
    karmicLedger: '0x0000000000000000000000000000000000000000',
    coolToken: '0x0000000000000000000000000000000000000000',
    weatherOracle: '0x0000000000000000000000000000000000000000',
  },
  base: {
    soulForge: '0x0000000000000000000000000000000000000000',
    transcendenceEngine: '0x0000000000000000000000000000000000000000',
    karmicLedger: '0x0000000000000000000000000000000000000000',
    coolToken: '0x0000000000000000000000000000000000000000',
    weatherOracle: '0x0000000000000000000000000000000000000000',
  },
} as const

export const SOUL_FORGE_ABI = [
  {
    "inputs": [{"name":"_sex","type":"uint8"},{"name":"_birthMonth","type":"uint8"},{"name":"_moonPhase","type":"uint8"},{"name":"_temperament","type":"uint8"}],
    "name": "forgeSoul",
    "outputs": [{"name":"soulId","type":"uint256"}],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{"name":"soulId","type":"uint256"}],
    "name": "getSoulBlueprint",
    "outputs": [
      {"components":[{"name":"sex","type":"uint8"},{"name":"birthMonth","type":"uint8"},{"name":"rulingPlanet","type":"uint8"},{"name":"moonPhase","type":"uint8"},{"name":"temperament","type":"uint8"},{"name":"mitochondrialSeed","type":"bytes32"},{"name":"karmicDebt","type":"uint256"},{"name":"birthTimestamp","type":"uint256"}],"name":"","type":"tuple"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name":"wallet","type":"address"}],
    "name": "getSoulByWallet",
    "outputs": [{"name":"","type":"uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name":"tokenId","type":"uint256"}],
    "name": "ownerOf",
    "outputs": [{"name":"","type":"address"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name":"soulId","type":"uint256"}],
    "name": "tokenBoundAccounts",
    "outputs": [{"name":"","type":"address"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const

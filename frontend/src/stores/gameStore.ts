export type AppView = 'onboarding' | 'dashboard' | 'marketplace' | 'combat' | 'governance'

export interface GameState {
  activeView: AppView
  walletConnected: boolean
  activeAvatarId: number | null
  playerLevel: number
  reputationScore: number
  souls: number
  coolBalance: number
  stableCredits: number
  licenseTier: number
  governanceEligible: boolean
}

export const initialGameState: GameState = {
  activeView: 'onboarding',
  walletConnected: false,
  activeAvatarId: null,
  playerLevel: 1,
  reputationScore: 100,
  souls: 0,
  coolBalance: 0,
  stableCredits: 0,
  licenseTier: 0,
  governanceEligible: false,
}

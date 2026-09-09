import { create } from 'zustand'

export interface GameState {
  playerLevel: number
  karma: number
  souls: number
}

export interface PlayerCombatProfile {
  tutorialComplete: boolean
  rankedWins: number
  reputationScore: number
  hasBan: boolean
  hasFraudSbt: boolean
  coolBalance: number
  combatModeEquipped: boolean
  currentTier: number
  daysSinceLastTier: number
  activeBounty: number
}

export interface LicenseTier {
  tier: number
  coolBurn: number
  waitDays: number
}

export interface ConsequenceRule {
  title: string
  description: string
}

export interface TierEvaluation extends LicenseTier {
  eligible: boolean
  requirements: Array<{ label: string; met: boolean }>
}

export interface GameStore extends GameState {
  combatProfile: PlayerCombatProfile
  toggleCombatMode: () => void
}

export const initialGameState: GameState = {
  playerLevel: 14,
  karma: 72,
  souls: 11,
}

export const licenseTiers: LicenseTier[] = [
  { tier: 1, coolBurn: 0, waitDays: 0 },
  { tier: 2, coolBurn: 500, waitDays: 7 },
  { tier: 3, coolBurn: 1000, waitDays: 7 },
]

export const consequenceRules: ConsequenceRule[] = [
  {
    title: 'Unprovoked attack',
    description: 'Reputation drops and a bounty is automatically placed on the aggressor.',
  },
  {
    title: 'Defensive kill',
    description: 'No reputation penalty applies when a kill happens in direct self-defense.',
  },
  {
    title: 'Bounty capture',
    description: 'Licensed bounty hunters earn $COOL for bringing down wanted players.',
  },
]

const initialCombatProfile: PlayerCombatProfile = {
  tutorialComplete: true,
  rankedWins: 6,
  reputationScore: 91,
  hasBan: false,
  hasFraudSbt: false,
  coolBalance: 1450,
  combatModeEquipped: false,
  currentTier: 1,
  daysSinceLastTier: 9,
  activeBounty: 0,
}

export const useGameStore = create<GameStore>((set) => ({
  ...initialGameState,
  combatProfile: initialCombatProfile,
  toggleCombatMode: () =>
    set((state) => ({
      combatProfile: {
        ...state.combatProfile,
        combatModeEquipped: !state.combatProfile.combatModeEquipped,
      },
    })),
}))

export function evaluateLicenseTiers(
  profile: PlayerCombatProfile,
): TierEvaluation[] {
  return licenseTiers.map((tier) => {
    const requirements = [
      {
        label: 'Combat tutorial completed',
        met: profile.tutorialComplete,
      },
      {
        label: '5 ranked wins secured',
        met: profile.rankedWins >= 5,
      },
      {
        label: 'No bans or fraud SBTs on-chain',
        met: !profile.hasBan && !profile.hasFraudSbt,
      },
      {
        label: `${tier.coolBurn} $COOL available to burn`,
        met: profile.coolBalance >= tier.coolBurn,
      },
      {
        label: `${tier.waitDays}-day cooldown satisfied`,
        met: tier.waitDays === 0 || profile.daysSinceLastTier >= tier.waitDays,
      },
    ]

    return {
      ...tier,
      eligible: requirements.every((requirement) => requirement.met),
      requirements,
    }
  })
}

export function getCombatReadiness(profile: PlayerCombatProfile) {
  const hasCleanReputation = !profile.hasBan && !profile.hasFraudSbt
  const licensed = profile.currentTier >= 1 && hasCleanReputation
  const combatReady = licensed && profile.combatModeEquipped

  return {
    licensed,
    combatReady,
    statusLabel: combatReady ? 'Combat enabled' : 'Civilian protection active',
    statusDescription: combatReady
      ? 'You can fight in war zones and take bounty contracts.'
      : 'You remain invulnerable until you equip the combat mode badge.',
  }
}

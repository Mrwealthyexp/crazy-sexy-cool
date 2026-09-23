export type WorldState = 'crazy' | 'sexy' | 'cool'

export interface Zone {
  id: string
  name: string
  coordinates: [number, number]
  description: string
  primaryAction: 'forge-soul' | 'create-artifact' | 'engage-combat' | 'meditate'
  licenseRequired: boolean
  climate: {
    mood: string
    hazardLevel: number
    rewardMultiplier: number
  }
  lore: string
}

export interface SoulProfile {
  displayName: string
  temperament: string
  birthMonth: number
  worldState: WorldState
  focus: number
  combatLicensed: boolean
  transcended: boolean
  tokenBoundAccount: string
}

export interface KarmaProfile {
  white: number
  black: number
  gray: number
  reputation: number
}

export interface PlayerSnapshot {
  wallet: string
  level: number
  coolBalance: number
  soul: SoulProfile | null
  karma: KarmaProfile
  unlockedSystems: string[]
  activeZoneId: string
  actionHistory: string[]
}

export interface WorldSnapshot {
  currentQuestion: string | null
  collectiveAnswer: string | null
  answerExpiresAt: string | null
  zones: Zone[]
}

export interface GameDataResponse {
  player: PlayerSnapshot
  world: WorldSnapshot
}

export type GameActionType =
  | 'forge-soul'
  | 'meditate'
  | 'create-artifact'
  | 'complete-bounty'
  | 'license-combat'
  | 'engage-combat'
  | 'transcend'
  | 'ask-world-question'

export interface GameActionRequest {
  wallet: string
  type: GameActionType
  zoneId?: string
  payload?: {
    displayName?: string
    temperament?: string
    birthMonth?: number
    tokenBoundAccount?: string
    masteryScore?: number
    honorable?: boolean
    question?: string
    answer?: string
  }
}

export interface GameActionResult extends GameDataResponse {
  success: boolean
  message: string
  insight?: {
    dominantState: WorldState
    emotion: string
    recommendation: string
  }
}

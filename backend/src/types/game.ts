export type WorldState = 'crazy' | 'sexy' | 'cool'
export type KarmaAlignment = 'white' | 'black' | 'gray'

export interface ZoneClimate {
  mood: string
  hazardLevel: number
  rewardMultiplier: number
}

export interface Zone {
  id: string
  name: string
  coordinates: [number, number]
  description: string
  licenseRequired: boolean
  climate: ZoneClimate
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
  }
}

export interface GameActionResult {
  success: boolean
  message: string
  player: PlayerSnapshot
  world: WorldSnapshot
  insight?: {
    dominantState: WorldState
    emotion: string
    recommendation: string
  }
}

export type WorldlyState = 'crazy' | 'sexy' | 'cool'

export type CombatMode = 'none' | 'open' | 'licensed'

export interface Zone {
  id: string
  name: string
  coordinates: [number, number]
  description: string
  combatMode: CombatMode
}

export interface PlayerState {
  level: number
  karma: number
  souls: number
  currentZoneId: string
  hasCombatLicense: boolean
  worldlyState: WorldlyState
}

export interface GameState {
  player: PlayerState
  zones: Zone[]
  updatedAt: string
}

export const defaultZones: Zone[] = [
  {
    id: 'aeterna-gate',
    name: 'Aeterna Gate',
    coordinates: [12, 82],
    description: 'The northern crystal gate where initiates first enter the city wall.',
    combatMode: 'none',
  },
  {
    id: 'mirror-lake',
    name: 'Mirror Lake',
    coordinates: [44, 60],
    description: 'A reflective basin that rewards calm duels and emotional balance.',
    combatMode: 'licensed',
  },
  {
    id: 'ember-market',
    name: 'Ember Market',
    coordinates: [75, 35],
    description: 'Open bazaar where rogues settle rivalries and barter soul relics.',
    combatMode: 'open',
  },
]

export const defaultPlayerState: PlayerState = {
  level: 1,
  karma: 0,
  souls: 1,
  currentZoneId: 'aeterna-gate',
  hasCombatLicense: false,
  worldlyState: 'cool',
}

export type GameActionType = 'ENTER_ZONE' | 'ATTEMPT_COMBAT' | 'TOGGLE_COMBAT_LICENSE'

export interface GameAction {
  type: GameActionType
  zoneId?: string
}

export interface GameActionResult {
  ok: boolean
  message: string
  state: GameState
}

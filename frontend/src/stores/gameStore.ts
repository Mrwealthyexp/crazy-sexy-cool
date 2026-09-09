import { defaultMoonPhase, type MoonPhase } from '../data/lunarPhases'

// Game state store
export interface GameState {
  playerLevel: number
  karma: number
  souls: number
  wisdom: number
  currentMoonPhase: MoonPhase
}

export const initialGameState: GameState = {
  playerLevel: 1,
  karma: 0,
  souls: 0,
  wisdom: 0,
  currentMoonPhase: defaultMoonPhase,
}

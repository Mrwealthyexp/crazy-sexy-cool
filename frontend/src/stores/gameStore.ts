// Game state store
export interface GameState {
  playerLevel: number
  karma: number
  souls: number
}

export const initialGameState: GameState = {
  playerLevel: 1,
  karma: 0,
  souls: 0,
}

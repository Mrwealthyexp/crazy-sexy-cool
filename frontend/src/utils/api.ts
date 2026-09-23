import type { GameAction, GameActionResult, GameState } from '../../../shared/game'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

interface GameDataResponse {
  state: GameState
}

async function readJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = `Request failed with status ${response.status}`

    try {
      const errorBody = (await response.json()) as { message?: string }
      if (errorBody.message) {
        message = errorBody.message
      }
    } catch {
      // ignore parse errors for non-JSON responses
    }

    throw new Error(message)
  }

  return (await response.json()) as T
}

export async function fetchGameData(): Promise<GameState> {
  const response = await fetch(`${API_URL}/game/data`)
  const payload = await readJson<GameDataResponse>(response)
  return payload.state
}

export async function submitGameAction(action: GameAction): Promise<GameActionResult> {
  const response = await fetch(`${API_URL}/game/action`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(action),
  })

  if (response.ok) {
    return (await response.json()) as GameActionResult
  }

  let failedResult: GameActionResult | undefined
  try {
    failedResult = (await response.json()) as GameActionResult
  } catch {
    // ignore parse errors for non-JSON responses
  }

  if (failedResult) {
    return failedResult
  }

  throw new Error(`Action failed with status ${response.status}`)
}

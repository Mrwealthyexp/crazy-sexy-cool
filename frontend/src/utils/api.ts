import { zones as fallbackZones } from '../data/zones'
import type { GameActionRequest, GameActionResult, GameDataResponse } from '../types/game'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

function fallbackGameData(wallet: string): GameDataResponse {
  return {
    player: {
      wallet: wallet || '0xguest',
      level: 1,
      coolBalance: 0,
      soul: null,
      karma: { white: 0, black: 0, gray: 0, reputation: 0 },
      unlockedSystems: ['wallet-identity'],
      activeZoneId: fallbackZones[0].id,
      actionHistory: ['Backend unavailable. Operating in read-only simulation mode.'],
    },
    world: {
      currentQuestion: null,
      collectiveAnswer: null,
      answerExpiresAt: null,
      zones: fallbackZones,
    },
  }
}

export async function fetchGameData(wallet: string): Promise<GameDataResponse> {
  try {
    const response = await fetch(`${API_URL}/game/data?wallet=${encodeURIComponent(wallet)}`)
    if (!response.ok) {
      throw new Error('Unable to load game data')
    }
    return (await response.json()) as GameDataResponse
  } catch {
    return fallbackGameData(wallet)
  }
}

export async function submitGameAction(action: GameActionRequest): Promise<GameActionResult> {
  try {
    const fallback = fallbackGameData(action.wallet)
    const response = await fetch(`${API_URL}/game/action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(action),
    })

    if (response.ok) {
      return (await response.json()) as GameActionResult
    }

    let payload: Partial<GameActionResult> = {}
    try {
      payload = (await response.json()) as GameActionResult
    } catch {
      payload = {}
    }

    return {
      success: false,
      message: payload.message ?? 'Action failed.',
      player: payload.player ?? fallback.player,
      world: payload.world ?? fallback.world,
      insight: payload.insight,
    }
  } catch {
    return {
      success: false,
      message: 'Backend unavailable. Start the API to enable live world actions.',
      ...fallbackGameData(action.wallet),
    }
  }
}

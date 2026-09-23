export interface EmotionalReading {
  subject: string
  dominantEmotion: 'rage' | 'grief' | 'wonder' | 'clarity' | 'empathy'
  intensity: number
  volatility: 'low' | 'medium' | 'high'
  guidance: string
}

export interface GameDataResponse {
  overview: {
    world: string
    activeZones: number
    greatTeacherFocus: string
  }
  emotionalWeather: EmotionalReading[]
  combatPreview: {
    arenaId: string
    phaseBalance: Array<'Crazy' | 'Sexy' | 'Cool'>
    participants: Array<{
      soulId: string
      worldlyPhase: 'Crazy' | 'Sexy' | 'Cool'
      combatLicense: 'none' | 'initiate' | 'teacher'
      karma: number
    }>
    status: 'queued' | 'active'
  }
}

export interface GameActionInput {
  type: 'challenge' | 'invoke' | 'meditate'
  actorId: string
  targetId?: string
  worldlyPhase: 'Crazy' | 'Sexy' | 'Cool'
  combatLicense?: 'none' | 'initiate' | 'teacher'
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export async function fetchGameData(): Promise<GameDataResponse> {
  const response = await fetch(`${API_URL}/game/data`)
  if (!response.ok) {
    throw new Error('Failed to fetch game data.')
  }
  return response.json()
}

export async function submitGameAction(action: GameActionInput) {
  const response = await fetch(`${API_URL}/game/action`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(action),
  })

  if (!response.ok) {
    throw new Error('Failed to submit game action.')
  }

  return response.json()
}

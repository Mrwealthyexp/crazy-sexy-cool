const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export interface CombatZone {
  id: string
  name: string
  coordinates: [number, number]
  description: string
  type: 'safe' | 'war' | 'frontier'
  combatRule: string
}

export interface CombatProfile {
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

export interface CombatOverviewResponse {
  gameState: {
    playerLevel: number
    karma: number
    souls: number
  }
  combatProfile: CombatProfile
  licenseTiers: LicenseTier[]
  consequenceRules: ConsequenceRule[]
  zones: CombatZone[]
  readiness: {
    licensed: boolean
    combatReady: boolean
    statusLabel: string
    statusDescription: string
  }
}

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, init)

  if (!response.ok) {
    throw new Error(`Request failed for ${path}`)
  }

  return response.json() as Promise<T>
}

export async function fetchCombatOverview(): Promise<CombatOverviewResponse> {
  return requestJson<CombatOverviewResponse>('/combat/overview')
}

export async function setCombatMode(
  equipped: boolean,
): Promise<CombatOverviewResponse> {
  return requestJson<CombatOverviewResponse>('/combat/mode', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ equipped }),
  })
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export interface CombatTier {
  id: string
  tier: string
  name: string
  description: string
  access: string
  penalty: string
  activities: string[]
  active: boolean
  unlocked: boolean
}

export interface CombatZone {
  id: string
  name: string
  description: string
  district: string
  requiredTierId: string
  risk: string
  control: string
  accessible: boolean
  status: 'social' | 'training' | 'contested' | 'competitive' | 'warlord'
}

export interface CombatOverview {
  currentTierId: string
  reputation: number
  bountyRisk: string
  tournamentRank: number | null
  territoriesHeld: number
  recommendations: string[]
  tiers: CombatTier[]
  zones: CombatZone[]
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, init)

  if (!response.ok) {
    const errorMessage = await response.text()
    throw new Error(errorMessage || `Request failed with status ${response.status}`)
  }

  return response.json() as Promise<T>
}

export function fetchCombatOverview() {
  return request<CombatOverview>('/combat/overview')
}

export function setCombatMode(tierId: string) {
  return request<CombatOverview>('/combat/mode', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tierId }),
  })
}

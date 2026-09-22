const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export interface PlatformOverview {
  chain: string
  combatQueueOpen: boolean
  marketplaceLive: boolean
  governanceEnabled: boolean
}

export interface CombatQueueState {
  open: boolean
  activeBattles: number
  licensedPlayersWaiting: number
}

export interface CombatIntentInput {
  wallet: string
  licenseTier: number
  zoneId: string
}

async function readJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, init)

  if (!response.ok) {
    throw new Error(`Request failed for ${path}: ${response.status}`)
  }

  return (await response.json()) as T
}

export function fetchPlatformOverview() {
  return readJson<PlatformOverview>('/platform/overview')
}

export function fetchWorldZones() {
  return readJson<{ zones: string[] }>('/world/zones')
}

export function fetchCombatQueue() {
  return readJson<CombatQueueState>('/combat/queue')
}

export function submitCombatIntent(input: CombatIntentInput) {
  return readJson<{ accepted: boolean; reason: string | null }>('/combat/intents', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
}

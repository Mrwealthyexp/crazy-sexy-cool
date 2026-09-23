import type { MoonPhase } from '../data/lunarPhases'
import type { ZoneSnapshot } from '../data/zones'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export interface QuestReward {
  karma: number
  souls: number
  wisdom: number
}

export interface Quest {
  id: string
  title: string
  description: string
  category: 'shadow-work' | 'growth' | 'letting-go'
  reward: QuestReward
  soulCost: number
  zoneId: string
  status: 'available' | 'completed'
}

export interface LedgerStatus {
  contract: 'KarmicLedger'
  mode: 'backend-mirror' | 'onchain'
  synced: boolean
  note: string
}

export interface BattleResult {
  summary: string
  karmaDelta: number
  soulsDelta: number
  wisdomDelta: number
}

export interface GameSnapshot {
  playerLevel: number
  karma: number
  souls: number
  wisdom: number
  currentMoonPhase: MoonPhase
  isGreatTeacher: boolean
  quests: Quest[]
  zones: ZoneSnapshot[]
  ledgerStatus: LedgerStatus
  lastBattle?: BattleResult
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  })

  if (!response.ok) {
    const error = (await response.json().catch(() => ({ error: 'Request failed' }))) as {
      error?: string
    }
    throw new Error(error.error ?? 'Request failed')
  }

  return (await response.json()) as T
}

export function fetchGameState() {
  return request<GameSnapshot>('/game/state')
}

export function updateMoonPhase(phase: MoonPhase) {
  return request<GameSnapshot>('/game/moon-phase', {
    method: 'POST',
    body: JSON.stringify({ phase }),
  })
}

export function completeQuest(questId: string) {
  return request<GameSnapshot>(`/game/quests/${questId}/complete`, {
    method: 'POST',
  })
}

export function useTeacherPower(power: 'fair-emotions') {
  return request<GameSnapshot>('/game/powers/use', {
    method: 'POST',
    body: JSON.stringify({ power }),
  })
}

export function resolveBattle(zoneId: string) {
  return request<GameSnapshot>('/game/pvp/resolve', {
    method: 'POST',
    body: JSON.stringify({ zoneId }),
  })
}

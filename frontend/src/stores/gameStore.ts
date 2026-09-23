import { create } from 'zustand'
import { defaultMoonPhase, lunarPhases, type MoonPhase } from '../data/lunarPhases'
import { createZoneSnapshots, type ZoneSnapshot } from '../data/zones'
import {
  completeQuest as completeQuestRequest,
  fetchGameState,
  resolveBattle as resolveBattleRequest,
  updateMoonPhase,
  useTeacherPower,
  type BattleResult,
  type GameSnapshot,
  type LedgerStatus,
  type Quest,
} from '../utils/api'

const defaultLedgerStatus: LedgerStatus = {
  contract: 'KarmicLedger',
  mode: 'backend-mirror',
  synced: false,
  note: 'Backend mirror mode active until on-chain wiring is configured.',
}

function cloneQuestWithStatus(quest: Quest): Quest {
  return { ...quest, reward: { ...quest.reward } }
}

function createLocalQuestSet(currentMoonPhase: MoonPhase): Quest[] {
  return [
    {
      id: 'shadow-bloom',
      title: 'Shadow Bloom',
      description: 'Face the truth you hide in the arena and transmute it into karma.',
      category: 'shadow-work',
      reward: {
        karma: currentMoonPhase === 'New Moon' ? 8 : 4,
        souls: 1,
        wisdom: 2,
      },
      soulCost: 1,
      zoneId: 'shadow-arena',
      status: 'available',
    },
    {
      id: 'aeterna-ascent',
      title: 'Aeterna Ascent',
      description: 'Practice a growth discipline at the gates and refine your next form.',
      category: 'growth',
      reward: {
        karma: 1,
        souls: 4,
        wisdom: 1,
      },
      soulCost: currentMoonPhase === 'Waxing' ? 1 : 2,
      zoneId: 'aeterna-gates',
      status: 'available',
    },
    {
      id: 'release-the-tide',
      title: 'Release the Tide',
      description: 'Offer an old attachment to the water and harvest the wisdom left behind.',
      category: 'letting-go',
      reward: {
        karma: 0,
        souls: 1,
        wisdom: currentMoonPhase === 'Waning' ? 6 : 2,
      },
      soulCost: 1,
      zoneId: 'coral-cathedrals',
      status: 'available',
    },
  ]
}

function createLocalSnapshot(currentMoonPhase: MoonPhase = defaultMoonPhase): GameSnapshot {
  const karma = 6
  const souls = 5
  const wisdom = 3
  const isGreatTeacher = karma >= 12 && souls >= 8 && wisdom >= 8

  return {
    playerLevel: 1 + Math.floor((souls + wisdom) / 6),
    karma,
    souls,
    wisdom,
    currentMoonPhase,
    isGreatTeacher,
    quests: createLocalQuestSet(currentMoonPhase),
    zones: createZoneSnapshots(currentMoonPhase, isGreatTeacher),
    ledgerStatus: defaultLedgerStatus,
  }
}

function createOfflinePhaseSnapshot(state: GameStoreState, currentMoonPhase: MoonPhase): GameSnapshot {
  const teacher = state.karma >= 12 && state.souls >= 8 && state.wisdom >= 8
  const completedQuestIds = new Set(
    state.quests.filter((quest) => quest.status === 'completed').map((quest) => quest.id),
  )

  return {
    playerLevel: state.playerLevel,
    karma: state.karma,
    souls: state.souls,
    wisdom: state.wisdom,
    currentMoonPhase,
    isGreatTeacher: teacher,
    quests: createLocalQuestSet(currentMoonPhase).map((quest) =>
      completedQuestIds.has(quest.id) ? { ...quest, status: 'completed' } : quest,
    ),
    zones: createZoneSnapshots(currentMoonPhase, teacher),
    ledgerStatus: state.ledgerStatus,
    lastBattle: state.lastBattle,
  }
}

function applySnapshot(set: (partial: Partial<GameStoreState>) => void, snapshot: GameSnapshot, connection: ConnectionState) {
  set({
    playerLevel: snapshot.playerLevel,
    karma: snapshot.karma,
    souls: snapshot.souls,
    wisdom: snapshot.wisdom,
    currentMoonPhase: snapshot.currentMoonPhase,
    isGreatTeacher: snapshot.isGreatTeacher,
    quests: snapshot.quests.map(cloneQuestWithStatus),
    zones: snapshot.zones.map((zone) => ({ ...zone, features: [...zone.features] })),
    ledgerStatus: { ...snapshot.ledgerStatus },
    lastBattle: snapshot.lastBattle,
    connection,
    error: undefined,
  })
}

type ConnectionState = 'connected' | 'offline'

export interface GameStoreState {
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
  loading: boolean
  connection: ConnectionState
  error?: string
  initializeGame: () => Promise<void>
  setMoonPhase: (phase: MoonPhase) => Promise<void>
  completeQuest: (questId: string) => Promise<void>
  invokeTeacherPower: () => Promise<void>
  resolveBattle: (zoneId: string) => Promise<void>
  clearError: () => void
}

const localInitial = createLocalSnapshot()

export const useGameStore = create<GameStoreState>((set) => ({
  ...localInitial,
  loading: false,
  connection: 'offline',
  error: undefined,
  initializeGame: async () => {
    set({ loading: true })
    try {
      const snapshot = await fetchGameState()
      applySnapshot(set, snapshot, 'connected')
    } catch (error) {
      set((state) => ({
        ...state,
        connection: 'offline',
        error: error instanceof Error ? error.message : 'Unable to load game state',
      }))
    } finally {
      set({ loading: false })
    }
  },
  setMoonPhase: async (phase) => {
    set({ loading: true })
    try {
      const snapshot = await updateMoonPhase(phase)
      applySnapshot(set, snapshot, 'connected')
    } catch (error) {
      set((state) => {
        const fallback = createOfflinePhaseSnapshot(state, phase)
        return {
          ...state,
          playerLevel: fallback.playerLevel,
          karma: fallback.karma,
          souls: fallback.souls,
          wisdom: fallback.wisdom,
          currentMoonPhase: fallback.currentMoonPhase,
          isGreatTeacher: fallback.isGreatTeacher,
          quests: fallback.quests,
          zones: fallback.zones,
          ledgerStatus: fallback.ledgerStatus,
          lastBattle: fallback.lastBattle,
          connection: 'offline',
          error: error instanceof Error ? error.message : 'Unable to update moon phase',
        }
      })
    } finally {
      set({ loading: false })
    }
  },
  completeQuest: async (questId) => {
    set({ loading: true })
    try {
      const snapshot = await completeQuestRequest(questId)
      applySnapshot(set, snapshot, 'connected')
    } catch (error) {
      set((state) => {
        const quest = state.quests.find((entry) => entry.id === questId)
        if (!quest || quest.status === 'completed' || state.souls < quest.soulCost) {
          return {
            loading: false,
            error: error instanceof Error ? error.message : 'Quest could not be completed',
          }
        }

        const souls = state.souls - quest.soulCost + quest.reward.souls
        const karma = state.karma + quest.reward.karma
        const wisdom = state.wisdom + quest.reward.wisdom
        const isGreatTeacher = karma >= 12 && souls >= 8 && wisdom >= 8

        return {
          souls,
          karma,
          wisdom,
          playerLevel: 1 + Math.floor((souls + wisdom) / 6),
          isGreatTeacher,
          quests: state.quests.map((entry) =>
            entry.id === questId ? { ...entry, status: 'completed' } : entry,
          ),
          zones: createZoneSnapshots(state.currentMoonPhase, isGreatTeacher),
          connection: 'offline' as const,
          error: error instanceof Error ? error.message : 'Quest synced locally only',
        }
      })
    } finally {
      set({ loading: false })
    }
  },
  invokeTeacherPower: async () => {
    set({ loading: true })
    try {
      const snapshot = await useTeacherPower('fair-emotions')
      applySnapshot(set, snapshot, 'connected')
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Unable to invoke Great Teacher power',
      })
    } finally {
      set({ loading: false })
    }
  },
  resolveBattle: async (zoneId) => {
    set({ loading: true })
    try {
      const snapshot = await resolveBattleRequest(zoneId)
      applySnapshot(set, snapshot, 'connected')
    } catch (error) {
      set((state) => {
        const zone = state.zones.find((entry) => entry.id === zoneId)
        if (!zone || !zone.pvp || zone.access !== 'open') {
          return {
            loading: false,
            error: error instanceof Error ? error.message : 'Battle unavailable in this zone',
          }
        }

        const karmaDelta = state.currentMoonPhase === 'New Moon' ? 8 : 4
        const soulsDelta = 2
        const wisdomDelta = state.currentMoonPhase === 'Dark Moon' ? 2 : 1
        const karma = state.karma + karmaDelta
        const souls = state.souls + soulsDelta
        const wisdom = state.wisdom + wisdomDelta
        const isGreatTeacher = karma >= 12 && souls >= 8 && wisdom >= 8

        return {
          karma,
          souls,
          wisdom,
          playerLevel: 1 + Math.floor((souls + wisdom) / 6),
          isGreatTeacher,
          zones: createZoneSnapshots(state.currentMoonPhase, isGreatTeacher),
          lastBattle: {
            summary: `${zone.name} resolved under ${state.currentMoonPhase}.`,
            karmaDelta,
            soulsDelta,
            wisdomDelta,
          },
          connection: 'offline' as const,
          error: error instanceof Error ? error.message : 'Battle synced locally only',
        }
      })
    } finally {
      set({ loading: false })
    }
  },
  clearError: () => set({ error: undefined }),
}))

export function getPhaseTheme(currentMoonPhase: MoonPhase) {
  return lunarPhases.find((phase) => phase.name === currentMoonPhase) ?? lunarPhases[0]
}

import { create } from 'zustand'
import {
  advanceSoul,
  applyKarmicDebt,
  canAdvance,
  generateSoulProfile,
  getReadableKarmicAudit,
  getStageDefinition,
  performAction,
  type SoulBlueprintInput,
  type SoulMilestone,
  type SoulProfile,
} from '../data/transcendence'

interface GameState {
  playerSoul: SoulProfile | null
  latestMessage: string
  createSoul: (input: SoulBlueprintInput) => void
  performMilestone: (milestone: SoulMilestone) => void
  applyDebt: (severity: 'gray' | 'black') => void
  advanceStage: () => void
  askWorldQuestion: (question: string) => void
}

export const useGameStore = create<GameState>((set) => ({
  playerSoul: null,
  latestMessage: 'Forge a soul to begin the path from attachment to transcendence.',
  createSoul: (input) =>
    set(() => ({
      playerSoul: generateSoulProfile(input),
      latestMessage: `Soul forged for ${input.name}. The path begins in ${getStageDefinition('crazy').label}.`,
    })),
  performMilestone: (milestone) =>
    set((state) => {
      if (!state.playerSoul) return state
      const updated = performAction(state.playerSoul, milestone)
      return {
        playerSoul: updated,
        latestMessage: `${updated.blueprint.name} completed ${milestone}. ${getReadableKarmicAudit(updated)}`,
      }
    }),
  applyDebt: (severity) =>
    set((state) => {
      if (!state.playerSoul) return state
      const updated = applyKarmicDebt(
        state.playerSoul,
        severity,
        severity === 'gray' ? 250 : 500,
        severity === 'gray' ? 250 : 500,
      )
      return {
        playerSoul: updated,
        latestMessage:
          severity === 'gray'
            ? 'A self-serving action created gray karma and reduced SOUL.'
            : 'A predatory action created black karma and damaged the ledger.',
      }
    }),
  advanceStage: () =>
    set((state) => {
      if (!state.playerSoul) return state

      const gate = canAdvance(state.playerSoul)
      if (!gate.allowed) {
        return {
          ...state,
          latestMessage: gate.reason,
        }
      }

      const updated = advanceSoul(state.playerSoul)
      return {
        playerSoul: updated,
        latestMessage: `${updated.blueprint.name} advanced to ${getStageDefinition(updated.currentStage).label}.`,
      }
    }),
  askWorldQuestion: (question) =>
    set((state) => {
      if (!state.playerSoul || !state.playerSoul.isEnlightened) {
        return {
          ...state,
          latestMessage: 'Only Enlightened souls can ask the world question.',
        }
      }

      return {
        playerSoul: {
          ...state.playerSoul,
          lastWorldQuestion: question,
        },
        latestMessage: `The server now echoes: “${question}”`,
      }
    }),
}))

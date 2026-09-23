import { create } from 'zustand'

import { fetchGameData, submitGameAction } from '../utils/api'
import type { GameActionRequest, GameDataResponse, GameActionResult, PlayerSnapshot, WorldSnapshot } from '../types/game'

interface ForgeDraft {
  displayName: string
  temperament: string
  birthMonth: number
}

interface GameStore {
  wallet: string
  player: PlayerSnapshot | null
  world: WorldSnapshot | null
  message: string
  error: string | null
  loading: boolean
  forgeDraft: ForgeDraft
  setWallet: (wallet: string) => void
  updateForgeDraft: (draft: Partial<ForgeDraft>) => void
  loadGame: () => Promise<void>
  runAction: (request: Omit<GameActionRequest, 'wallet'>) => Promise<void>
}

const initialForgeDraft: ForgeDraft = {
  displayName: 'Nova',
  temperament: 'Visionary',
  birthMonth: 7,
}

function mergeResponse(payload: GameDataResponse | GameActionResult) {
  return {
    player: payload.player,
    world: payload.world,
  }
}

export const useGameStore = create<GameStore>((set, get) => ({
  wallet: '0xA11CE',
  player: null,
  world: null,
  message: 'Wallet in, identity on.',
  error: null,
  loading: false,
  forgeDraft: initialForgeDraft,
  setWallet: (wallet) => set({ wallet, error: null }),
  updateForgeDraft: (draft) =>
    set((state) => ({ forgeDraft: { ...state.forgeDraft, ...draft } })),
  loadGame: async () => {
    const wallet = get().wallet.trim() || '0xguest'
    set({ loading: true, error: null })
    const data = await fetchGameData(wallet)
    set(() => ({
      ...mergeResponse(data),
      wallet,
      message: data.player.soul ? 'World state synchronized.' : 'Soul forge ready.',
      loading: false,
    }))
  },
  runAction: async (request) => {
    const wallet = get().wallet.trim() || '0xguest'
    set({ loading: true, error: null })
    const response = await submitGameAction({ ...request, wallet })

    if (!response.success) {
      set(() => ({
        ...mergeResponse(response),
        wallet,
        message: response.message,
        error: response.message,
        loading: false,
      }))
      return
    }

    set(() => ({
      ...mergeResponse(response),
      wallet,
      message: response.message,
      error: null,
      loading: false,
    }))
  },
}))

import { create } from 'zustand'

interface SoulBlueprint {
  sex: number
  birthMonth: number
  rulingPlanet: number
  moonPhase: number
  temperament: number
  mitochondrialSeed: string
  karmicDebt: bigint
  birthTimestamp: bigint
}

interface SoulStateData {
  stage: number
  whiteKarma: bigint
  blackKarma: bigint
  grayKarma: bigint
  soulTokens: bigint
  jobLevels: bigint[]
  mitochondrialPoints: bigint
  overEvolved: boolean
}

interface GameState {
  address: string | null
  chainId: number | null
  soulId: bigint | null
  soulBlueprint: SoulBlueprint | null
  soulState: SoulStateData | null
  currentZone: number
  currentWeather: number
  isLoading: boolean
  error: string | null

  setAddress: (address: string | null) => void
  setChainId: (chainId: number | null) => void
  setSoulId: (soulId: bigint | null) => void
  setSoulBlueprint: (blueprint: SoulBlueprint | null) => void
  setSoulState: (state: SoulStateData | null) => void
  setCurrentZone: (zone: number) => void
  setCurrentWeather: (weather: number) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useGameStore = create<GameState>((set) => ({
  address: null,
  chainId: null,
  soulId: null,
  soulBlueprint: null,
  soulState: null,
  currentZone: 0,
  currentWeather: 0,
  isLoading: false,
  error: null,

  setAddress: (address) => set({ address }),
  setChainId: (chainId) => set({ chainId }),
  setSoulId: (soulId) => set({ soulId }),
  setSoulBlueprint: (blueprint) => set({ soulBlueprint: blueprint }),
  setSoulState: (state) => set({ soulState: state }),
  setCurrentZone: (zone) => set({ currentZone: zone }),
  setCurrentWeather: (weather) => set({ currentWeather: weather }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}))

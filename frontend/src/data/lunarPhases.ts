export type MoonPhase = 'New Moon' | 'Waxing' | 'Full Moon' | 'Waning' | 'Dark Moon'

export interface LunarPhaseEffect {
  name: MoonPhase
  theme: string
  playerEffect: string
  worldEffect: string
}

export const lunarPhases: LunarPhaseEffect[] = [
  {
    name: 'New Moon',
    theme: 'Shadow work and karmic risk',
    playerEffect: 'Shadow work quests appear',
    worldEffect: 'PvP combat yields double karma',
  },
  {
    name: 'Waxing',
    theme: 'Growth and expansion',
    playerEffect: 'Growth skills cost half',
    worldEffect: 'New content and lands unlock',
  },
  {
    name: 'Full Moon',
    theme: 'Emotional intensity and divine power',
    playerEffect: 'Emotions are amplified 3x',
    worldEffect: "Great Teachers' powers cost half",
  },
  {
    name: 'Waning',
    theme: 'Release and reflection',
    playerEffect: 'Letting-go quests yield 3x wisdom',
    worldEffect: 'Old content and lands decay',
  },
  {
    name: 'Dark Moon',
    theme: 'Mystery and intuition',
    playerEffect: 'All stats are hidden and intuition guides the player',
    worldEffect: 'Only Great Teachers can see clearly; the world becomes mysterious',
  },
]

export const defaultMoonPhase: MoonPhase = 'New Moon'

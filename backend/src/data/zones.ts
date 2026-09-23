import type { MoonPhase } from './lunarPhases.js'

export type ZoneAffinity = 'Crazy' | 'Sexy' | 'Cool' | 'Neutral'
export type ZoneState = 'stable' | 'unlocked' | 'decaying' | 'veiled'
export type ZoneAccess = 'open' | 'trial' | 'teacher-only'
export type ZoneVisibility = 'clear' | 'obscured' | 'teacher-sight'
export type ZoneRewardFocus = 'karma' | 'souls' | 'wisdom'

export interface ZoneDefinition {
  id: string
  name: string
  region: string
  coordinates: [number, number]
  description: string
  affinity: ZoneAffinity
  pvp: boolean
  features: string[]
  rewardFocus: ZoneRewardFocus
}

export interface ZoneSnapshot extends ZoneDefinition {
  state: ZoneState
  access: ZoneAccess
  visibility: ZoneVisibility
}

export const zoneDefinitions: ZoneDefinition[] = [
  {
    id: 'aeterna-gates',
    name: 'Aeterna Gates',
    region: 'Antarctica',
    coordinates: [68, 14],
    description: 'The crystal megacity threshold where new seekers test their karmic intent.',
    affinity: 'Neutral',
    pvp: false,
    features: ['Soul registry', 'Teacher trials', 'World questions'],
    rewardFocus: 'souls',
  },
  {
    id: 'shadow-arena',
    name: 'Shadow Arena',
    region: 'Sunken California',
    coordinates: [24, 36],
    description: 'A karmic coliseum where conflict reveals the soul beneath the mask.',
    affinity: 'Crazy',
    pvp: true,
    features: ['Licensed PvP', 'Shadow work quests', 'Double-karma duels'],
    rewardFocus: 'karma',
  },
  {
    id: 'coral-cathedrals',
    name: 'Coral Cathedrals',
    region: 'Drowned Florida',
    coordinates: [79, 61],
    description: 'Flooded sanctuaries where emotional truth echoes through living reefs.',
    affinity: 'Sexy',
    pvp: false,
    features: ['Emotion rituals', 'Full Moon ceremonies', 'Reflection chambers'],
    rewardFocus: 'wisdom',
  },
  {
    id: 'echoing-steppe',
    name: 'Echoing Steppe',
    region: 'Interior Wilds',
    coordinates: [52, 47],
    description: 'A wind-carved plain where letting-go quests strip players back to intent.',
    affinity: 'Cool',
    pvp: false,
    features: ['Letting-go quests', 'Decay relics', 'Memory winds'],
    rewardFocus: 'wisdom',
  },
]

export function createZoneSnapshots(currentMoonPhase: MoonPhase, isGreatTeacher: boolean): ZoneSnapshot[] {
  return zoneDefinitions.map((zone) => {
    let state: ZoneState = 'stable'
    let access: ZoneAccess = zone.id === 'aeterna-gates' ? 'open' : 'trial'
    let visibility: ZoneVisibility = 'clear'

    if (currentMoonPhase === 'Waxing' && (zone.id === 'aeterna-gates' || zone.id === 'echoing-steppe')) {
      state = 'unlocked'
      access = 'open'
    }

    if (currentMoonPhase === 'Waning' && (zone.id === 'coral-cathedrals' || zone.id === 'echoing-steppe')) {
      state = 'decaying'
    }

    if (currentMoonPhase === 'Dark Moon') {
      state = 'veiled'
      visibility = isGreatTeacher ? 'teacher-sight' : 'obscured'
      if (zone.id !== 'aeterna-gates') {
        access = isGreatTeacher ? 'open' : 'teacher-only'
      }
    }

    if (zone.id === 'shadow-arena' && currentMoonPhase === 'New Moon') {
      access = 'open'
    }

    return {
      ...zone,
      state,
      access,
      visibility,
    }
  })
}

export interface Zone {
  id: string
  name: string
  coordinates: [number, number]
  description: string
  type: 'safe' | 'war' | 'frontier'
  combatRule: string
}

export const zones: Zone[] = [
  {
    id: 'aeterna-core',
    name: 'Aeterna Core',
    coordinates: [0, 0],
    description: 'Crystal city center for trade, social play, and governance.',
    type: 'safe',
    combatRule: 'Combat disabled for all players.',
  },
  {
    id: 'creator-galleries',
    name: 'Creator Galleries',
    coordinates: [18, 42],
    description: 'Immersive galleries and music venues showcasing player culture.',
    type: 'safe',
    combatRule: 'Civilians and licensed players are both protected.',
  },
  {
    id: 'veil-borderlands',
    name: 'Veil Borderlands',
    coordinates: [62, 28],
    description: 'Frontier routes where hunters track wanted players between cities.',
    type: 'frontier',
    combatRule: 'Combat requires combat mode and a valid license.',
  },
  {
    id: 'obsidian-crater',
    name: 'Obsidian Crater',
    coordinates: [84, 77],
    description: 'High-risk war zone with rotating loot drops and bounty contests.',
    type: 'war',
    combatRule: 'Open PvP for combat-mode players with licensed access.',
  },
]

export type ZoneCategory = 'civic' | 'creator' | 'residential' | 'combat' | 'trade'
export type ZoneSafety = 'safe' | 'monitored' | 'contested'
export type CombatAccess = 'civilian-only' | 'licensed-training' | 'licensed-pvp'

export interface Zone {
  id: string
  name: string
  category: ZoneCategory
  safety: ZoneSafety
  combatAccess: CombatAccess
  coordinates: [number, number]
  description: string
}

export const zones: Zone[] = [
  {
    id: 'aeterna-core',
    name: 'Aeterna Core',
    category: 'civic',
    safety: 'safe',
    combatAccess: 'civilian-only',
    coordinates: [0, 0],
    description: 'The governance and commerce heart of the city, protected by strict noncombat rules.',
  },
  {
    id: 'gilded-galleries',
    name: 'Gilded Galleries',
    category: 'creator',
    safety: 'safe',
    combatAccess: 'civilian-only',
    coordinates: [14, 6],
    description: 'A showcase district for fashion houses, music releases, and creator-owned storefronts.',
  },
  {
    id: 'tidebreak-docks',
    name: 'Tidebreak Docks',
    category: 'trade',
    safety: 'monitored',
    combatAccess: 'licensed-training',
    coordinates: [-9, 18],
    description: 'A logistics frontier for trade, contraband rumor, and low-tier licensed confrontations.',
  },
  {
    id: 'shadow-belts',
    name: 'Shadow Belts',
    category: 'combat',
    safety: 'contested',
    combatAccess: 'licensed-pvp',
    coordinates: [22, -11],
    description: 'Outer combat districts where licensed players accept rank, bounty, and territorial risk.',
  },
]

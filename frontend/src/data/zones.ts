export interface Zone {
  id: string
  name: string
  coordinates: [number, number]
  description: string
  district: string
  requiredTierId: string
}

export const zones: Zone[] = [
  {
    id: 'echo-plaza',
    name: 'Echo Plaza',
    coordinates: [0, 0],
    description: 'Creator markets and social rituals anchor the civilian core.',
    district: 'Central Aeterna',
    requiredTierId: 'tier-0',
  },
  {
    id: 'sparring-garden',
    name: 'Sparring Garden',
    coordinates: [2, 1],
    description: 'Guided holographic arenas for consequence-free practice.',
    district: 'Temple Ring',
    requiredTierId: 'tier-1',
  },
  {
    id: 'ember-crossing',
    name: 'Ember Crossing',
    coordinates: [4, 2],
    description: 'Open-world alleys where reputation swings with every fight.',
    district: 'Ash Market',
    requiredTierId: 'tier-2',
  },
  {
    id: 'crown-circuit',
    name: 'Crown Circuit',
    coordinates: [6, 3],
    description: 'Broadcast arenas where rankings and prizes reshape status.',
    district: 'Sky Coliseum',
    requiredTierId: 'tier-3',
  },
  {
    id: 'iron-veil',
    name: 'Iron Veil',
    coordinates: [8, 4],
    description: 'A fortified district where gangs hold and lose territory in real time.',
    district: 'Outer Wall',
    requiredTierId: 'tier-4',
  },
]

import type { Zone } from '../types/game'

export const zones: Zone[] = [
  {
    id: 'soul-forge',
    name: 'Soul Forge',
    coordinates: [18, 72],
    description: 'The minting cathedral where cosmic identity becomes a sovereign soul.',
    primaryAction: 'forge-soul',
    licenseRequired: false,
    climate: { mood: 'luminous', hazardLevel: 10, rewardMultiplier: 1.1 },
    lore: 'Birth months, intention, and alignment are sealed into an avatar-bound ledger.',
  },
  {
    id: 'aeterna-gate',
    name: 'Aeterna Gate',
    coordinates: [46, 64],
    description: 'A crystalline civic district where creators publish artifacts into the world.',
    primaryAction: 'create-artifact',
    licenseRequired: false,
    climate: { mood: 'inspired', hazardLevel: 18, rewardMultiplier: 1.3 },
    lore: 'Every crafted object becomes a permanent social memory inside the city.',
  },
  {
    id: 'shadow-arena',
    name: 'Shadow Arena',
    coordinates: [79, 41],
    description: 'Regulated combat territory where force is legal only for licensed souls.',
    primaryAction: 'engage-combat',
    licenseRequired: true,
    climate: { mood: 'charged', hazardLevel: 62, rewardMultiplier: 1.5 },
    lore: 'Conflict is permitted here, but only when accountability is stronger than rage.',
  },
  {
    id: 'oracle-district',
    name: 'Oracle District',
    coordinates: [58, 24],
    description: 'A contemplative quarter where collective answers alter the city for a day.',
    primaryAction: 'meditate',
    licenseRequired: false,
    climate: { mood: 'reflective', hazardLevel: 8, rewardMultiplier: 1.2 },
    lore: 'Only transcended players can ask questions powerful enough to bend the weather.',
  },
]

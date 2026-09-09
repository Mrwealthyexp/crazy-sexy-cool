export interface DivinePower {
  planet: string
  symbol: string
  worldlyPhase: string
  divinePower: string
  description: string
  karmicCost: string
}

export const divinePowers: DivinePower[] = [
  {
    planet: 'Sun',
    symbol: '☉',
    worldlyPhase: 'Crazy → Ego battles',
    divinePower: 'Illumination',
    description: 'Reveal hidden truths to all players in a zone.',
    karmicCost: "Burns 10% of the teacher's $COOL.",
  },
  {
    planet: 'Moon',
    symbol: '☽',
    worldlyPhase: 'Sexy → Emotional tides',
    divinePower: 'Tidal Shift',
    description: 'Alter the emotional states of combatants to calm rage or awaken empathy.',
    karmicCost: "The teacher must absorb opponents' pain as an SBT scar.",
  },
  {
    planet: 'Mars',
    symbol: '♂',
    worldlyPhase: 'Crazy → Conflict',
    divinePower: "War's End",
    description: 'Force a ceasefire in any combat zone for 24 hours.',
    karmicCost: 'The teacher loses all combat licenses for 72 hours.',
  },
  {
    planet: 'Venus',
    symbol: '♀',
    worldlyPhase: 'Sexy → Attraction',
    divinePower: 'True Beauty',
    description: "Make opponents see each other's divine nature instead of an enemy.",
    karmicCost: "The teacher's avatar becomes transparent for 48 hours.",
  },
  {
    planet: 'Mercury',
    symbol: '☿',
    worldlyPhase: 'Cool → Intellect',
    divinePower: 'Divine Messenger',
    description: "Plant a thought in all players' minds that feels like their own.",
    karmicCost: 'The teacher cannot speak in chat for 24 hours.',
  },
  {
    planet: 'Jupiter',
    symbol: '♃',
    worldlyPhase: 'Cool → Expansion',
    divinePower: 'Great Fortune',
    description: 'Bless a player with impossible luck, like dodging death or finding a rare item.',
    karmicCost: "The teacher's own luck becomes impossible for 24 hours.",
  },
  {
    planet: 'Saturn',
    symbol: '♄',
    worldlyPhase: 'All → Restriction',
    divinePower: 'Karmic Return',
    description: 'Force a player to face the consequence of their last three actions immediately.',
    karmicCost: 'The teacher ages their avatar visually by one month.',
  },
  {
    planet: 'Uranus',
    symbol: '♅',
    worldlyPhase: 'Crazy → Revolution',
    divinePower: 'Sudden Awakening',
    description: 'Snap a player out of any worldly attachment instantly.',
    karmicCost: "The teacher's own attachment is randomized for 24 hours.",
  },
  {
    planet: 'Neptune',
    symbol: '♆',
    worldlyPhase: 'Sexy → Illusion',
    divinePower: 'Veil Lifted',
    description: 'Show all players the true emotional state behind any avatar.',
    karmicCost: "The teacher's own emotions broadcast publicly for 48 hours.",
  },
  {
    planet: 'Pluto',
    symbol: '♇',
    worldlyPhase: 'All → Death/Rebirth',
    divinePower: 'Death Denied',
    description: "Prevent a player's defeat or death, but they must face their shadow.",
    karmicCost: 'The teacher must die and respawn at level 1 while keeping wisdom.',
  },
]

export interface Zone {
  id: string
  name: string
  coordinates: [number, number]
  description: string
  worldlyPhase: 'Crazy' | 'Sexy' | 'Cool' | 'All'
  alignment: string
  safety: 'Sanctuary' | 'Regulated PvP' | 'Open Conflict'
  combatRule: string
  teacherIntervention: string
}

export const zones: Zone[] = [
  {
    id: 'aeterna-gate',
    name: 'Aeterna Gate',
    coordinates: [12, 82],
    description: 'The crystal threshold where new souls enter the megacity beneath the silent god-statues.',
    worldlyPhase: 'Cool',
    alignment: 'Orientation, law, and breathwork rites.',
    safety: 'Sanctuary',
    combatRule: 'No combat. Unlicensed aggression is reflected back as immediate karma debt.',
    teacherIntervention: 'Illumination exposes hidden intentions before anyone crosses the wall.',
  },
  {
    id: 'sunken-california',
    name: 'Sunken California',
    coordinates: [18, 36],
    description: 'A drowned coastline of neon ruins where scavengers dive for relics and lost ego.',
    worldlyPhase: 'Crazy',
    alignment: 'Risk, speed, and survival hunger.',
    safety: 'Open Conflict',
    combatRule: 'Combat is always active. Loot rights go to the licensed survivor.',
    teacherIntervention: "War's End can suspend raids long enough for a rescue convoy to pass.",
  },
  {
    id: 'coral-cathedral-florida',
    name: 'Coral Cathedral Florida',
    coordinates: [76, 28],
    description: 'A flooded graveyard of coral cathedrals where grief becomes song and memory.',
    worldlyPhase: 'Sexy',
    alignment: 'Devotion, longing, and emotional resonance.',
    safety: 'Regulated PvP',
    combatRule: 'Combat is allowed only during tidal duels witnessed by the cathedral bells.',
    teacherIntervention: 'Veil Lifted reveals whether devotion is love, fear, or manipulation.',
  },
  {
    id: 'mirror-gardens',
    name: 'Mirror Gardens',
    coordinates: [48, 74],
    description: 'Reflective terraces where avatars confront beauty, envy, and the stories they tell themselves.',
    worldlyPhase: 'Sexy',
    alignment: 'Attraction, self-image, and sacred intimacy.',
    safety: 'Sanctuary',
    combatRule: 'Weapons dim on entry. Emotional duels replace physical damage.',
    teacherIntervention: 'True Beauty forces rivals to witness the divinity beneath projection.',
  },
  {
    id: 'mercury-bazaar',
    name: 'Mercury Bazaar',
    coordinates: [58, 52],
    description: 'A whisper market where rumors, quests, and coded prophecies move faster than currency.',
    worldlyPhase: 'Cool',
    alignment: 'Trade, wit, and tactical messaging.',
    safety: 'Regulated PvP',
    combatRule: 'Conflict is limited to sanctioned challenge circles and contract disputes.',
    teacherIntervention: "Divine Messenger can seed one clarifying idea across the entire bazaar.",
  },
  {
    id: 'shadow-arena',
    name: 'Shadow Arena',
    coordinates: [43, 18],
    description: 'A karmic proving ground where every strike is recorded and every motive leaves a scar.',
    worldlyPhase: 'All',
    alignment: 'Judgment, consequence, and rebirth through trial.',
    safety: 'Open Conflict',
    combatRule: 'Licensed combat only. Unlicensed entrants are marked for karmic return.',
    teacherIntervention: 'Death Denied saves a fallen fighter, but sends them into shadow reckoning.',
  },
]

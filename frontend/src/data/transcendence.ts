export type Sex = 'Male' | 'Female' | 'Transcended'
export type Planet =
  | 'Sun'
  | 'Moon'
  | 'Mars'
  | 'Venus'
  | 'Mercury'
  | 'Jupiter'
  | 'Saturn'
  | 'Uranus'
  | 'Neptune'
  | 'Pluto'
export type MoonPhase = 'New' | 'Waxing' | 'Full' | 'Waning' | 'Dark'
export type Temperament = 'Choleric' | 'Melancholic' | 'Sanguine' | 'Phlegmatic'
export type Element = 'Fire' | 'Earth' | 'Air' | 'Water'
export type KarmaType = 'white' | 'gray' | 'black'
export type StageId =
  | 'crazy'
  | 'sexy'
  | 'cool'
  | 'integrated'
  | 'servant'
  | 'mysterious'
  | 'great-teacher'
  | 'enlightened'
export type SoulMilestone =
  | 'humblingDefeat'
  | 'selflessAct'
  | 'giftMostValuableAsset'
  | 'compassionateGrief'
  | 'mentorship'
  | 'anonymousRescue'
  | 'enemyReconciliation'
  | 'fairEmotions'

export interface SoulBlueprintInput {
  name: string
  walletAddress: string
  signatureTimestamp: string
  birthMonth: number
  sex: Sex
  rulingPlanet: Planet
  moonPhase: MoonPhase
  temperament: Temperament
}

export interface SoulBlueprint {
  soulHash: string
  name: string
  walletAddress: string
  signatureTimestamp: string
  birthMonth: number
  sex: Sex
  rulingPlanet: Planet
  moonPhase: MoonPhase
  temperament: Temperament
  elementalAffinity: Element
  divinePower: string
  karmicCost: string
  shadowWork: string
}

export interface KarmaTally {
  white: number
  gray: number
  black: number
}

export interface SoulProfile {
  blueprint: SoulBlueprint
  currentStage: StageId
  soulTokens: number
  coolTokens: number
  karma: KarmaTally
  completedMilestones: SoulMilestone[]
  auraVisible: boolean
  isGreatTeacher: boolean
  isEnlightened: boolean
  lastWorldQuestion?: string
  lastWorldQuestionAt?: number
}

export interface StageDefinition {
  id: StageId
  label: string
  icon: string
  motto: string
  lesson: string
  reward: string
  gate: string
}

export interface PlanetDefinition {
  worldlyPhase: string
  divinePower: string
  karmicCost: string
}

export interface MoonDefinition {
  playerEffect: string
  worldEffect: string
}

export interface ActionDefinition {
  id: SoulMilestone
  stage: StageId
  title: string
  description: string
  karmaType: KarmaType | 'none'
  karmaDelta: number
  soulDelta: number
}

export const sexOptions: Sex[] = ['Male', 'Female', 'Transcended']
export const planetOptions: Planet[] = [
  'Sun',
  'Moon',
  'Mars',
  'Venus',
  'Mercury',
  'Jupiter',
  'Saturn',
  'Uranus',
  'Neptune',
  'Pluto',
]
export const moonPhaseOptions: MoonPhase[] = ['New', 'Waxing', 'Full', 'Waning', 'Dark']
export const temperamentOptions: Temperament[] = ['Choleric', 'Melancholic', 'Sanguine', 'Phlegmatic']

export const planetaryInfluence: Record<Planet, PlanetDefinition> = {
  Sun: {
    worldlyPhase: 'Crazy → Ego battles',
    divinePower: 'Illumination — reveal hidden truths to everyone in a zone.',
    karmicCost: 'Burns 10% of the teacher’s COOL reserve.',
  },
  Moon: {
    worldlyPhase: 'Sexy → Emotional tides',
    divinePower: 'Tidal Shift — calm rage and awaken empathy.',
    karmicCost: 'Absorb an opponent’s pain as a permanent scar.',
  },
  Mars: {
    worldlyPhase: 'Crazy → Conflict',
    divinePower: 'War’s End — force a ceasefire in a combat zone.',
    karmicCost: 'Lose all combat licenses for 72 hours.',
  },
  Venus: {
    worldlyPhase: 'Sexy → Attraction',
    divinePower: 'True Beauty — reveal divine nature inside opponents.',
    karmicCost: 'Teacher becomes transparent for 48 hours.',
  },
  Mercury: {
    worldlyPhase: 'Cool → Intellect',
    divinePower: 'Divine Messenger — seed a thought into every mind in a zone.',
    karmicCost: 'The teacher cannot speak in chat for 24 hours.',
  },
  Jupiter: {
    worldlyPhase: 'Cool → Expansion',
    divinePower: 'Great Fortune — bless another player with impossible luck.',
    karmicCost: 'The teacher’s luck collapses for 24 hours.',
  },
  Saturn: {
    worldlyPhase: 'All → Restriction',
    divinePower: 'Karmic Return — collapse the consequences of the last three actions into the present.',
    karmicCost: 'The avatar visibly ages one month.',
  },
  Uranus: {
    worldlyPhase: 'Crazy → Revolution',
    divinePower: 'Sudden Awakening — rip a player free from attachment.',
    karmicCost: 'The teacher’s attachment randomizes for 24 hours.',
  },
  Neptune: {
    worldlyPhase: 'Sexy → Illusion',
    divinePower: 'Veil Lifted — reveal true feelings behind every avatar.',
    karmicCost: 'The teacher’s feelings become public for 48 hours.',
  },
  Pluto: {
    worldlyPhase: 'All → Death/Rebirth',
    divinePower: 'Death Denied — prevent defeat and force a shadow trial.',
    karmicCost: 'The teacher must die and respawn at level 1, keeping wisdom only.',
  },
}

export const moonCycle: Record<MoonPhase, MoonDefinition> = {
  New: {
    playerEffect: 'Shadow work quests appear and force deep honesty.',
    worldEffect: 'PvP combat yields double karma.',
  },
  Waxing: {
    playerEffect: 'Growth skills cost half and new practices unlock.',
    worldEffect: 'New lands and rituals appear.',
  },
  Full: {
    playerEffect: 'Emotion amplification reveals what the soul has hidden.',
    worldEffect: 'Great Teacher powers cost half.',
  },
  Waning: {
    playerEffect: 'Letting-go quests yield triple wisdom.',
    worldEffect: 'Old content and stale structures decay.',
  },
  Dark: {
    playerEffect: 'Stats disappear; intuition becomes the only guide.',
    worldEffect: 'Only Great Teachers can truly navigate the world.',
  },
}

export const stageDefinitions: StageDefinition[] = [
  {
    id: 'crazy',
    label: 'Stage 1 · The Unknowing',
    icon: '🔥',
    motto: 'I am my chaos.',
    lesson: 'Learn that defeat can humble ego and unlock compassion.',
    reward: 'Volatility becomes courage.',
    gate: 'Experience a humbling defeat and perform one selfless act.',
  },
  {
    id: 'sexy',
    label: 'Stage 2 · The Wanting',
    icon: '💧',
    motto: 'I am my desire.',
    lesson: 'Untangle worth from attention, status, and possession.',
    reward: 'Charisma becomes generosity.',
    gate: 'Give away your most valuable asset with no reward.',
  },
  {
    id: 'cool',
    label: 'Stage 3 · The Detached',
    icon: '🌪️',
    motto: 'I observe but do not feel.',
    lesson: 'Turn distance into wisdom without freezing the heart.',
    reward: 'Clarity becomes care.',
    gate: 'Feel real grief for another player and intervene without reward.',
  },
  {
    id: 'integrated',
    label: 'Stage 4 · The Integrated',
    icon: '✨',
    motto: 'I do not reject any part of myself.',
    lesson: 'Hold chaos, desire, and detachment together without being ruled by any.',
    reward: 'Aura becomes visible.',
    gate: 'Teach another player through the first three stages.',
  },
  {
    id: 'servant',
    label: 'Stage 5 · The Servant',
    icon: '🕊️',
    motto: 'My power exists for others.',
    lesson: 'Let service become invisible and sincere.',
    reward: 'Minor interventions unlock.',
    gate: 'Save a player from defeat without them knowing it was you.',
  },
  {
    id: 'mysterious',
    label: 'Stage 6 · The Mysterious',
    icon: '🌘',
    motto: 'I am the question, not the answer.',
    lesson: 'Catalyze reconciliation without claiming ownership.',
    reward: 'One planetary power unlocks.',
    gate: 'Intervene in a fight so both enemies later become friends.',
  },
  {
    id: 'great-teacher',
    label: 'Stage 7 · The Great Teacher',
    icon: '☀️',
    motto: 'I am the second chance.',
    lesson: 'Use divine power without serving the ego.',
    reward: 'God Skills and server-level influence.',
    gate: 'Cause fair emotions and pass the karmic audit.',
  },
  {
    id: 'enlightened',
    label: 'Enlightened Status',
    icon: '🌈',
    motto: 'I am none and all.',
    lesson: 'Presence alone becomes world-changing guidance.',
    reward: 'Ask the World once per month.',
    gate: 'No further ascent — only stewardship.',
  },
]

export const actionCatalog: ActionDefinition[] = [
  {
    id: 'humblingDefeat',
    stage: 'crazy',
    title: 'Accept a humbling defeat',
    description: 'Lose publicly, reflect honestly, and refuse retaliation.',
    karmaType: 'none',
    karmaDelta: 0,
    soulDelta: 25,
  },
  {
    id: 'selflessAct',
    stage: 'crazy',
    title: 'Perform a selfless act',
    description: 'Give protection, resources, or healing without witness or reward.',
    karmaType: 'white',
    karmaDelta: 100,
    soulDelta: 100,
  },
  {
    id: 'giftMostValuableAsset',
    stage: 'sexy',
    title: 'Give away your most valuable asset',
    description: 'Release status, beauty, or wealth without securing anything in return.',
    karmaType: 'white',
    karmaDelta: 250,
    soulDelta: 250,
  },
  {
    id: 'compassionateGrief',
    stage: 'cool',
    title: 'Intervene through grief',
    description: 'Feel another player’s loss fully and act to support them without reward.',
    karmaType: 'white',
    karmaDelta: 300,
    soulDelta: 300,
  },
  {
    id: 'mentorship',
    stage: 'integrated',
    title: 'Teach another player',
    description: 'Guide someone through the first three states without forcing them.',
    karmaType: 'white',
    karmaDelta: 500,
    soulDelta: 500,
  },
  {
    id: 'anonymousRescue',
    stage: 'servant',
    title: 'Save a player anonymously',
    description: 'Alter the outcome of a fight or market collapse without taking credit.',
    karmaType: 'white',
    karmaDelta: 750,
    soulDelta: 750,
  },
  {
    id: 'enemyReconciliation',
    stage: 'mysterious',
    title: 'Dissolve a feud',
    description: 'Intervene so combatants later become allies without knowing why.',
    karmaType: 'white',
    karmaDelta: 1500,
    soulDelta: 1500,
  },
  {
    id: 'fairEmotions',
    stage: 'great-teacher',
    title: 'Cause fair emotions',
    description: 'Make enemies see the holiness and truth inside the conflict.',
    karmaType: 'white',
    karmaDelta: 10000,
    soulDelta: 10000,
  },
]

const stageRequirements: Record<Exclude<StageId, 'enlightened'>, SoulMilestone[]> = {
  crazy: ['humblingDefeat', 'selflessAct'],
  sexy: ['giftMostValuableAsset'],
  cool: ['compassionateGrief'],
  integrated: ['mentorship'],
  servant: ['anonymousRescue'],
  mysterious: ['enemyReconciliation'],
  'great-teacher': ['fairEmotions'],
}

export const stageOrder: StageId[] = [
  'crazy',
  'sexy',
  'cool',
  'integrated',
  'servant',
  'mysterious',
  'great-teacher',
  'enlightened',
]

const birthMonthToElement: Record<number, Element> = {
  1: 'Earth',
  2: 'Air',
  3: 'Water',
  4: 'Fire',
  5: 'Earth',
  6: 'Air',
  7: 'Water',
  8: 'Fire',
  9: 'Earth',
  10: 'Air',
  11: 'Water',
  12: 'Fire',
}

function hashSeed(value: string) {
  let hash = 0
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0
  }
  return hash
}

function uniqueMilestones(milestones: SoulMilestone[]) {
  return Array.from(new Set(milestones))
}

function hasMilestone(profile: SoulProfile, milestone: SoulMilestone) {
  return profile.completedMilestones.includes(milestone)
}

function passesKarmicAudit(profile: SoulProfile) {
  const { white, gray, black } = profile.karma
  return white > gray * 2 && (black === 0 || white > black * 10)
}

export function generateSoulProfile(input: SoulBlueprintInput): SoulProfile {
  const seed = hashSeed(
    `${input.walletAddress}|${input.signatureTimestamp}|${input.birthMonth}|${input.sex}|${input.rulingPlanet}|${input.moonPhase}|${input.temperament}`,
  )
  const influence = planetaryInfluence[input.rulingPlanet]
  const elementalAffinity = birthMonthToElement[input.birthMonth] ?? 'Fire'

  return {
    blueprint: {
      ...input,
      elementalAffinity,
      divinePower: influence.divinePower,
      karmicCost: influence.karmicCost,
      shadowWork: moonCycle[input.moonPhase].playerEffect,
      soulHash: `0x${seed.toString(16).padStart(8, '0')}${hashSeed(input.name).toString(16).padStart(8, '0')}${hashSeed(
        input.walletAddress,
      )
        .toString(16)
        .padStart(8, '0')}`,
    },
    currentStage: 'crazy',
    soulTokens: 25,
    coolTokens: 1000,
    karma: {
      white: 0,
      gray: 0,
      black: 0,
    },
    completedMilestones: [],
    auraVisible: false,
    isGreatTeacher: false,
    isEnlightened: false,
  }
}

export function getStageDefinition(stage: StageId) {
  return stageDefinitions.find((entry) => entry.id === stage) ?? stageDefinitions[0]
}

export function getActionsForStage(stage: StageId) {
  return actionCatalog.filter((action) => action.stage === stage)
}

export function getPlanetDefinition(planet: Planet) {
  return planetaryInfluence[planet]
}

export function getMoonDefinition(phase: MoonPhase) {
  return moonCycle[phase]
}

export function performAction(profile: SoulProfile, actionId: SoulMilestone): SoulProfile {
  const action = actionCatalog.find((entry) => entry.id === actionId)
  if (!action || action.stage !== profile.currentStage || hasMilestone(profile, actionId)) {
    return profile
  }

  const nextProfile: SoulProfile = {
    ...profile,
    soulTokens: profile.soulTokens + action.soulDelta,
    completedMilestones: uniqueMilestones([...profile.completedMilestones, actionId]),
    karma: { ...profile.karma },
  }

  if (action.karmaType !== 'none') {
    nextProfile.karma[action.karmaType] += action.karmaDelta
  }

  return nextProfile
}

export function applyKarmicDebt(profile: SoulProfile, type: Exclude<KarmaType, 'white'>, amount: number, soulPenalty: number) {
  return {
    ...profile,
    soulTokens: Math.max(profile.soulTokens - soulPenalty, 0),
    karma: {
      ...profile.karma,
      [type]: profile.karma[type] + amount,
    },
  }
}

export function canAdvance(profile: SoulProfile) {
  if (profile.currentStage === 'enlightened') {
    return { allowed: false, reason: 'This soul has already reached the final steward state.' }
  }

  const currentIndex = stageOrder.indexOf(profile.currentStage)
  const nextStage = stageOrder[currentIndex + 1]
  const required = stageRequirements[profile.currentStage]
  const missing = required.filter((milestone) => !hasMilestone(profile, milestone))
  if (missing.length > 0) {
    return {
      allowed: false,
      reason: `Still needed: ${missing
        .map((milestone) => actionCatalog.find((action) => action.id === milestone)?.title ?? milestone)
        .join(', ')}.`,
    }
  }

  if ((nextStage === 'great-teacher' || nextStage === 'enlightened') && !passesKarmicAudit(profile)) {
    return {
      allowed: false,
      reason: 'The karmic audit failed. White karma must dominate gray and black karma.',
    }
  }

  return { allowed: true, reason: 'The next gate is open.' }
}

export function advanceSoul(profile: SoulProfile): SoulProfile {
  const gate = canAdvance(profile)
  if (!gate.allowed) {
    return profile
  }

  const currentIndex = stageOrder.indexOf(profile.currentStage)
  const nextStage = stageOrder[currentIndex + 1]
  if (!nextStage) {
    return profile
  }

  return {
    ...profile,
    currentStage: nextStage,
    auraVisible: profile.auraVisible || nextStage === 'integrated' || nextStage === 'servant' || nextStage === 'mysterious',
    isGreatTeacher: profile.isGreatTeacher || nextStage === 'great-teacher' || nextStage === 'enlightened',
    isEnlightened: nextStage === 'enlightened',
    soulTokens: profile.soulTokens + (nextStage === 'great-teacher' ? 5000 : nextStage === 'enlightened' ? 100000 : 0),
  }
}

export function getTranscendenceTrack(stage: StageId) {
  return stageDefinitions.map((entry) => ({
    ...entry,
    completed: stageOrder.indexOf(entry.id) < stageOrder.indexOf(stage),
    current: entry.id === stage,
  }))
}

export function getReadableKarmicAudit(profile: SoulProfile) {
  return passesKarmicAudit(profile)
    ? 'Pass — white karma dominates the ledger.'
    : 'Fail — gray or black karma is overpowering white karma.'
}

import { defaultMoonPhase, type MoonPhase } from '../data/lunarPhases.js'
import { createZoneSnapshots, type ZoneSnapshot } from '../data/zones.js'
import { EmotionOracle } from './EmotionOracle.js'
import { ShadowArena, type BattleResolution } from './ShadowArena.js'

export interface QuestReward {
  karma: number
  souls: number
  wisdom: number
}

export interface Quest {
  id: string
  title: string
  description: string
  category: 'shadow-work' | 'growth' | 'letting-go'
  reward: QuestReward
  soulCost: number
  zoneId: string
  status: 'available' | 'completed'
}

export interface LedgerStatus {
  contract: 'KarmicLedger'
  mode: 'backend-mirror' | 'onchain'
  synced: boolean
  note: string
}

export interface GameSnapshot {
  playerLevel: number
  karma: number
  souls: number
  wisdom: number
  currentMoonPhase: MoonPhase
  isGreatTeacher: boolean
  quests: Quest[]
  zones: ZoneSnapshot[]
  ledgerStatus: LedgerStatus
  lastBattle?: BattleResolution
}

function isGreatTeacher(karma: number, souls: number, wisdom: number) {
  return karma >= 12 && souls >= 8 && wisdom >= 8
}

function calculatePlayerLevel(souls: number, wisdom: number) {
  return 1 + Math.floor((souls + wisdom) / 6)
}

function createQuests(currentMoonPhase: MoonPhase): Quest[] {
  return [
    {
      id: 'shadow-bloom',
      title: 'Shadow Bloom',
      description: 'Face the truth you hide in the arena and transmute it into karma.',
      category: 'shadow-work',
      reward: {
        karma: currentMoonPhase === 'New Moon' ? 8 : 4,
        souls: 1,
        wisdom: 2,
      },
      soulCost: 1,
      zoneId: 'shadow-arena',
      status: 'available',
    },
    {
      id: 'aeterna-ascent',
      title: 'Aeterna Ascent',
      description: 'Practice a growth discipline at the gates and refine your next form.',
      category: 'growth',
      reward: {
        karma: 1,
        souls: 4,
        wisdom: 1,
      },
      soulCost: currentMoonPhase === 'Waxing' ? 1 : 2,
      zoneId: 'aeterna-gates',
      status: 'available',
    },
    {
      id: 'release-the-tide',
      title: 'Release the Tide',
      description: 'Offer an old attachment to the water and harvest the wisdom left behind.',
      category: 'letting-go',
      reward: {
        karma: 0,
        souls: 1,
        wisdom: currentMoonPhase === 'Waning' ? 6 : 2,
      },
      soulCost: 1,
      zoneId: 'coral-cathedrals',
      status: 'available',
    },
  ]
}

export class GameWorld {
  private currentMoonPhase: MoonPhase = defaultMoonPhase
  private karma = 6
  private souls = 5
  private wisdom = 3
  private quests = createQuests(defaultMoonPhase)
  private lastBattle?: BattleResolution
  private readonly ledgerStatus: LedgerStatus = {
    contract: 'KarmicLedger',
    mode: 'backend-mirror',
    synced: false,
    note: 'Backend is mirroring karmic changes until KarmicLedger writes are wired on-chain.',
  }

  constructor(
    private readonly emotionOracle = new EmotionOracle(),
    private readonly shadowArena = new ShadowArena(),
  ) {}

  getState(): GameSnapshot {
    const teacher = isGreatTeacher(this.karma, this.souls, this.wisdom)
    return {
      playerLevel: calculatePlayerLevel(this.souls, this.wisdom),
      karma: this.karma,
      souls: this.souls,
      wisdom: this.wisdom,
      currentMoonPhase: this.currentMoonPhase,
      isGreatTeacher: teacher,
      quests: this.quests.map((quest) => ({ ...quest, reward: { ...quest.reward } })),
      zones: createZoneSnapshots(this.currentMoonPhase, teacher),
      ledgerStatus: { ...this.ledgerStatus },
      lastBattle: this.lastBattle,
    }
  }

  setMoonPhase(phase: MoonPhase) {
    this.currentMoonPhase = phase
    this.quests = createQuests(phase).map((quest) => {
      const previous = this.quests.find((entry) => entry.id === quest.id)
      return previous?.status === 'completed' ? { ...quest, status: 'completed' } : quest
    })

    return this.getState()
  }

  completeQuest(questId: string) {
    const quest = this.quests.find((entry) => entry.id === questId)

    if (!quest) {
      throw new Error('Quest not found')
    }

    if (quest.status === 'completed') {
      throw new Error('Quest already completed')
    }

    if (this.souls < quest.soulCost) {
      throw new Error('Not enough souls to complete this quest')
    }

    this.souls = this.souls - quest.soulCost + quest.reward.souls
    this.karma += quest.reward.karma
    this.wisdom += quest.reward.wisdom
    quest.status = 'completed'

    return this.getState()
  }

  useGreatTeacherPower(power: 'fair-emotions') {
    const teacher = isGreatTeacher(this.karma, this.souls, this.wisdom)
    if (!teacher) {
      throw new Error('Great Teacher status required')
    }

    const soulCost = this.currentMoonPhase === 'Full Moon' ? 2 : 4
    if (this.souls < soulCost) {
      throw new Error('Not enough souls to invoke this power')
    }

    this.souls -= soulCost
    this.wisdom += this.emotionOracle.getEmotionMultiplier(this.currentMoonPhase)
    this.lastBattle = {
      summary: `${power} invoked. ${this.emotionOracle.describeEmotionalState(this.currentMoonPhase)}`,
      karmaDelta: 0,
      soulsDelta: -soulCost,
      wisdomDelta: this.emotionOracle.getEmotionMultiplier(this.currentMoonPhase),
    }

    return this.getState()
  }

  resolveBattle(zoneId: string) {
    const zone = createZoneSnapshots(this.currentMoonPhase, isGreatTeacher(this.karma, this.souls, this.wisdom)).find(
      (entry) => entry.id === zoneId,
    )

    if (!zone) {
      throw new Error('Zone not found')
    }

    if (!zone.pvp) {
      throw new Error('PvP is not enabled in this zone')
    }

    if (zone.access === 'teacher-only') {
      throw new Error('Only Great Teachers can enter this zone right now')
    }

    const result = this.shadowArena.resolveBattle({
      phase: this.currentMoonPhase,
      zone,
      playerLevel: calculatePlayerLevel(this.souls, this.wisdom),
    })

    this.karma += result.karmaDelta
    this.souls += result.soulsDelta
    this.wisdom += result.wisdomDelta
    this.lastBattle = result

    return this.getState()
  }
}

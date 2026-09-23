export interface CombatTierDefinition {
  id: string
  tier: string
  name: string
  description: string
  access: string
  penalty: string
  activities: string[]
}

export interface CombatZoneDefinition {
  id: string
  name: string
  description: string
  district: string
  requiredTierId: string
  risk: string
  control: string
}

export interface CombatTierSnapshot extends CombatTierDefinition {
  active: boolean
  unlocked: boolean
}

export interface CombatZoneSnapshot extends CombatZoneDefinition {
  accessible: boolean
  status: 'social' | 'training' | 'contested' | 'competitive' | 'warlord'
}

export interface CombatOverview {
  currentTierId: string
  reputation: number
  bountyRisk: string
  tournamentRank: number | null
  territoriesHeld: number
  recommendations: string[]
  tiers: CombatTierSnapshot[]
  zones: CombatZoneSnapshot[]
}

const combatTiers: CombatTierDefinition[] = [
  {
    id: 'tier-0',
    tier: 'Tier 0',
    name: 'Civilian',
    description: 'No combat access, social/creator focus',
    access: 'No combat permissions',
    penalty: 'None',
    activities: ['Social hubs', 'Creator economy', 'Faction diplomacy'],
  },
  {
    id: 'tier-1',
    tier: 'Tier 1',
    name: 'Sparring License',
    description: 'Training grounds only, no penalties',
    access: 'Training arenas and drills',
    penalty: 'No reputation loss',
    activities: ['Practice duels', 'Movement drills', 'Mentor matches'],
  },
  {
    id: 'tier-2',
    tier: 'Tier 2',
    name: 'Brawler License',
    description: 'Open-world PvP, reputation risk',
    access: 'Street combat districts',
    penalty: 'Reputation loss on reckless fights',
    activities: ['Street PvP', 'Bounty contracts', 'Faction scouting'],
  },
  {
    id: 'tier-3',
    tier: 'Tier 3',
    name: 'Champion License',
    description: 'Tournaments, rankings, prizes',
    access: 'Ranked competitions and prize ladders',
    penalty: 'Season placement volatility',
    activities: ['Bracket tournaments', 'Ranked ladders', 'Sponsored fights'],
  },
  {
    id: 'tier-4',
    tier: 'Tier 4',
    name: 'Warlord License',
    description: 'Territory control, gang mechanics',
    access: 'Territory command and gang systems',
    penalty: 'Territory maintenance obligations',
    activities: ['District control', 'Gang leadership', 'War chest routing'],
  },
]

const combatZones: CombatZoneDefinition[] = [
  {
    id: 'echo-plaza',
    name: 'Echo Plaza',
    description: 'Creator markets and social rituals anchor the civilian core.',
    district: 'Central Aeterna',
    requiredTierId: 'tier-0',
    risk: 'Low',
    control: 'Open commons',
  },
  {
    id: 'sparring-garden',
    name: 'Sparring Garden',
    description: 'Guided holographic arenas for consequence-free practice.',
    district: 'Temple Ring',
    requiredTierId: 'tier-1',
    risk: 'Low',
    control: 'Sanctioned training',
  },
  {
    id: 'ember-crossing',
    name: 'Ember Crossing',
    description: 'Open-world alleys where reputation swings with every fight.',
    district: 'Ash Market',
    requiredTierId: 'tier-2',
    risk: 'Medium',
    control: 'Faction contested',
  },
  {
    id: 'crown-circuit',
    name: 'Crown Circuit',
    description: 'Broadcast arenas where rankings and prizes reshape status.',
    district: 'Sky Coliseum',
    requiredTierId: 'tier-3',
    risk: 'High',
    control: 'Seasonal ladder',
  },
  {
    id: 'iron-veil',
    name: 'Iron Veil',
    description: 'A fortified district where gangs hold and lose territory in real time.',
    district: 'Outer Wall',
    requiredTierId: 'tier-4',
    risk: 'Extreme',
    control: 'Territory siege',
  },
]

const tierOrder = combatTiers.map((tier) => tier.id)

export class ShadowArena {
  private currentTierId = 'tier-0'

  private get currentTierIndex() {
    return tierOrder.indexOf(this.currentTierId)
  }

  getCombatOverview(): CombatOverview {
    const currentTier = combatTiers[this.currentTierIndex]

    return {
      currentTierId: this.currentTierId,
      reputation: this.currentTierIndex === 0 ? 0 : this.currentTierIndex * 120 - 45,
      bountyRisk: currentTier.id === 'tier-0' || currentTier.id === 'tier-1' ? 'None' : currentTier.id === 'tier-2' ? 'Moderate' : 'Severe',
      tournamentRank: currentTier.id === 'tier-3' || currentTier.id === 'tier-4' ? 27 - this.currentTierIndex * 4 : null,
      territoriesHeld: currentTier.id === 'tier-4' ? 2 : 0,
      recommendations: this.getRecommendations(currentTier.id),
      tiers: combatTiers.map((tier, index) => ({
        ...tier,
        active: tier.id === this.currentTierId,
        unlocked: index <= this.currentTierIndex,
      })),
      zones: combatZones.map((zone) => {
        const requiredTierIndex = tierOrder.indexOf(zone.requiredTierId)
        const accessible = requiredTierIndex <= this.currentTierIndex

        return {
          ...zone,
          accessible,
          status: this.getZoneStatus(zone.requiredTierId),
        }
      }),
    }
  }

  setCombatTier(tierId: string): CombatOverview {
    if (!tierOrder.includes(tierId)) {
      throw new Error(`Unknown combat tier: ${tierId}`)
    }

    this.currentTierId = tierId
    return this.getCombatOverview()
  }

  private getRecommendations(tierId: string) {
    switch (tierId) {
      case 'tier-0':
        return ['Complete social quests', 'Observe sanctioned bouts', 'Register for sparring']
      case 'tier-1':
        return ['Practice in Sparring Garden', 'Build confidence streaks', 'Prepare for live reputation stakes']
      case 'tier-2':
        return ['Manage reputation carefully', 'Pick favorable street contracts', 'Study tournament seeding']
      case 'tier-3':
        return ['Protect ranking points', 'Farm prize ladders', 'Recruit support crew for territory play']
      case 'tier-4':
        return ['Defend gang districts', 'Maintain supply lines', 'Coordinate territory timers']
      default:
        return []
    }
  }

  private getZoneStatus(requiredTierId: string): CombatZoneSnapshot['status'] {
    switch (requiredTierId) {
      case 'tier-0':
        return 'social'
      case 'tier-1':
        return 'training'
      case 'tier-2':
        return 'contested'
      case 'tier-3':
        return 'competitive'
      case 'tier-4':
        return 'warlord'
      default:
        return 'social'
    }
  }
}

export type CombatZoneAccess = 'civilian-only' | 'licensed-training' | 'licensed-pvp'

export interface CombatIntent {
  wallet: string
  licenseTier: number
  zoneId: string
}

export interface CombatQueueState {
  open: boolean
  activeBattles: number
  licensedPlayersWaiting: number
}

const zoneAccess: Record<string, CombatZoneAccess> = {
  'aeterna-core': 'civilian-only',
  'gilded-galleries': 'civilian-only',
  'tidebreak-docks': 'licensed-training',
  'shadow-belts': 'licensed-pvp',
}

export class ShadowArena {
  getQueueState(): CombatQueueState {
    return {
      open: true,
      activeBattles: 2,
      licensedPlayersWaiting: 5,
    }
  }

  listVisibleZones(): string[] {
    return Object.keys(zoneAccess)
  }

  submitIntent(intent: CombatIntent): { accepted: boolean; reason: string | null } {
    const access = zoneAccess[intent.zoneId]

    if (!access) {
      return { accepted: false, reason: 'Unknown zone.' }
    }

    if (access === 'civilian-only') {
      return { accepted: false, reason: 'Combat is disabled in this zone.' }
    }

    if (access === 'licensed-training' && intent.licenseTier < 1) {
      return { accepted: false, reason: 'Tier 1 sparring license required.' }
    }

    if (access === 'licensed-pvp' && intent.licenseTier < 2) {
      return { accepted: false, reason: 'Tier 2 combat license required.' }
    }

    return { accepted: true, reason: null }
  }
}

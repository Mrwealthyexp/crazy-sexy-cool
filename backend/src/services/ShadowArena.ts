import type { MoonPhase } from '../data/lunarPhases.js'
import type { ZoneSnapshot } from '../data/zones.js'

export interface BattleResolutionInput {
  phase: MoonPhase
  zone: ZoneSnapshot
  playerLevel: number
}

export interface BattleResolution {
  summary: string
  karmaDelta: number
  soulsDelta: number
  wisdomDelta: number
}

/**
 * ShadowArena Service
 * Handles game arena and battle mechanics.
 */
export class ShadowArena {
  initializeBattle(players: string[]) {
    return {
      players,
      status: 'initialized',
    }
  }

  processBattleAction(action: { zoneId: string; move: string }) {
    return {
      accepted: Boolean(action.zoneId && action.move),
      action,
    }
  }

  resolveBattle({ phase, zone, playerLevel }: BattleResolutionInput): BattleResolution {
    const karmaMultiplier = phase === 'New Moon' ? 2 : 1
    const wisdomBonus = phase === 'Dark Moon' ? 2 : 1
    const soulsDelta = Math.max(2, Math.ceil(playerLevel / 2))
    const karmaDelta = (zone.rewardFocus === 'karma' ? 4 : 2) * karmaMultiplier

    return {
      summary: `${zone.name} resolved under ${phase}. PvP karma ${karmaMultiplier > 1 ? 'doubled' : 'stabilized'}.`,
      karmaDelta,
      soulsDelta,
      wisdomDelta: wisdomBonus,
    }
  }
}

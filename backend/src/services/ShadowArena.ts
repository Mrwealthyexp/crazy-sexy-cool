import type { PlayerState, Zone } from '../../../shared/game'

export interface CombatDecision {
  allowed: boolean
  reason: string
}

/**
 * ShadowArena Service
 * Handles zone-based combat eligibility
 */
export class ShadowArena {
  canEngageCombat(zone: Zone, player: PlayerState): CombatDecision {
    if (zone.combatMode === 'none') {
      return {
        allowed: false,
        reason: `${zone.name} is a protected sanctuary. Combat is disabled in this zone.`,
      }
    }

    if (zone.combatMode === 'licensed' && !player.hasCombatLicense) {
      return {
        allowed: false,
        reason: `${zone.name} requires an active combat license.`,
      }
    }

    return {
      allowed: true,
      reason: `Combat authorized in ${zone.name}.`,
    }
  }
}

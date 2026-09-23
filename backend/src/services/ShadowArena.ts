import type { Zone } from '../types/game.js'

export interface ArenaAccessResult {
  allowed: boolean
  message: string
  zoneThreat: number
}

export interface BattleAction {
  honorable: boolean
  focus: number
  hasLicense: boolean
  zone: Zone
}

export interface BattleOutcome {
  success: boolean
  message: string
  focusDelta: number
  whiteDelta: number
  blackDelta: number
  grayDelta: number
  coolReward: number
}

/**
 * ShadowArena Service
 * Handles zone combat eligibility and battle outcomes.
 */
export class ShadowArena {
  initializeBattle(zone: Zone, hasLicense: boolean): ArenaAccessResult {
    if (zone.licenseRequired && !hasLicense) {
      return {
        allowed: false,
        message: `${zone.name} requires an active combat license.`,
        zoneThreat: zone.climate.hazardLevel,
      }
    }

    return {
      allowed: true,
      message: `Entry approved for ${zone.name}.`,
      zoneThreat: zone.climate.hazardLevel,
    }
  }

  processBattleAction(action: BattleAction): BattleOutcome {
    if (!action.hasLicense) {
      return {
        success: false,
        message: 'Combat attempt denied. License required.',
        focusDelta: 0,
        whiteDelta: 0,
        blackDelta: 0,
        grayDelta: 0,
        coolReward: 0,
      }
    }

    return {
      success: true,
      message: action.honorable
        ? `You fought with discipline inside ${action.zone.name}.`
        : `You won the encounter, but the ${action.zone.name} recorded a reckless imbalance.`,
      focusDelta: 8,
      whiteDelta: action.honorable ? 1 : 0,
      blackDelta: action.honorable ? 0 : 2,
      grayDelta: 1,
      coolReward: action.honorable ? 12 : 6,
    }
  }

  resolveBattle(outcome: BattleOutcome) {
    return outcome
  }
}

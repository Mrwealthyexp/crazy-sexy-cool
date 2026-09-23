/**
 * ShadowArena Service
 * Handles game arena and battle mechanics
 */
export type WorldlyPhase = 'Crazy' | 'Sexy' | 'Cool'
export type CombatLicense = 'none' | 'initiate' | 'teacher'

export interface BattleParticipant {
  soulId: string
  worldlyPhase: WorldlyPhase
  combatLicense: CombatLicense
  karma: number
}

export interface BattleState {
  arenaId: string
  phaseBalance: WorldlyPhase[]
  participants: BattleParticipant[]
  status: 'queued' | 'active'
}

export interface BattleActionInput {
  actorId: string
  targetId?: string
  worldlyPhase: WorldlyPhase
  combatLicense?: CombatLicense
}

export interface BattleActionResult {
  actorId: string
  targetId?: string
  allowed: boolean
  resolution: string
}

export interface BattleResolution {
  winningPhase: WorldlyPhase | 'Balanced'
  karmicImpact: string
}

export class ShadowArena {
  async initializeBattle(players: BattleParticipant[]): Promise<BattleState> {
    return {
      arenaId: 'shadow-arena',
      phaseBalance: players.map((player) => player.worldlyPhase),
      participants: players,
      status: players.length >= 2 ? 'active' : 'queued',
    }
  }

  async processBattleAction(action: BattleActionInput): Promise<BattleActionResult> {
    const allowed = (action.combatLicense ?? 'none') !== 'none'

    return {
      actorId: action.actorId,
      targetId: action.targetId,
      allowed,
      resolution: allowed
        ? `${action.actorId} channels ${action.worldlyPhase} force into the duel.`
        : 'Combat license required before entering the Shadow Arena.',
    }
  }

  async resolveBattle(players: BattleParticipant[]): Promise<BattleResolution> {
    if (players.length === 0) {
      return {
        winningPhase: 'Balanced',
        karmicImpact: 'No combatants entered the arena.',
      }
    }

    const highestKarma = players.reduce((current, player) => (player.karma > current.karma ? player : current))

    return {
      winningPhase: highestKarma.worldlyPhase,
      karmicImpact: `${highestKarma.soulId} leaves the arena carrying the lesson of consequence.`,
    }
  }
}

import { zones } from './data/zones.js'
import { EmotionOracle } from './services/EmotionOracle.js'
import { ShadowArena } from './services/ShadowArena.js'
import type {
  GameActionRequest,
  GameActionResult,
  GameDataResponse,
  KarmaProfile,
  PlayerSnapshot,
  SoulProfile,
  WorldSnapshot,
  Zone,
} from './types/game.js'

export interface GameEngine {
  getGameData: (wallet: string) => GameDataResponse
  applyAction: (action: GameActionRequest) => GameActionResult
}

export function createGameEngine(): GameEngine {
  const emotionOracle = new EmotionOracle()
  const shadowArena = new ShadowArena()
  const players = new Map<string, PlayerSnapshot>()
  const worldState: WorldSnapshot = {
    currentQuestion: null,
    collectiveAnswer: null,
    answerExpiresAt: null,
    zones: structuredClone(zones),
  }

  function normalizeWallet(wallet?: string) {
    return wallet?.trim().toLowerCase() || '0xguest'
  }

  function defaultKarma(): KarmaProfile {
    return { white: 0, black: 0, gray: 0, reputation: 0 }
  }

  function updateReputation(karma: KarmaProfile) {
    karma.reputation = karma.white * 2 + karma.gray - karma.black * 3
  }

  function unlockedSystems(player: PlayerSnapshot) {
    return [
      'wallet-identity',
      ...(player.soul ? ['soul-forge', 'karma-ledger', 'world-map'] : []),
      ...(player.soul?.combatLicensed ? ['licensed-combat'] : []),
      ...(player.soul?.transcended ? ['world-question'] : []),
    ]
  }

  function getZone(zoneId?: string): Zone {
    return worldState.zones.find((zone) => zone.id === zoneId) ?? worldState.zones[0]
  }

  function getOrCreatePlayer(wallet: string): PlayerSnapshot {
    const normalized = normalizeWallet(wallet)
    const existing = players.get(normalized)
    if (existing) {
      existing.unlockedSystems = unlockedSystems(existing)
      return existing
    }

    const created: PlayerSnapshot = {
      wallet: normalized,
      level: 1,
      coolBalance: 0,
      soul: null,
      karma: defaultKarma(),
      unlockedSystems: ['wallet-identity'],
      activeZoneId: worldState.zones[0].id,
      actionHistory: ['Wallet recognized. Soul forge standing by.'],
    }

    players.set(normalized, created)
    return created
  }

  function cloneGameData(player: PlayerSnapshot): GameDataResponse {
    return {
      player: {
        ...player,
        karma: { ...player.karma },
        soul: player.soul ? { ...player.soul } : null,
        unlockedSystems: [...player.unlockedSystems],
        actionHistory: [...player.actionHistory],
      },
      world: {
        ...worldState,
        zones: worldState.zones.map((zone) => ({
          ...zone,
          climate: { ...zone.climate },
          coordinates: [...zone.coordinates] as [number, number],
        })),
      },
    }
  }

  function requireSoul(player: PlayerSnapshot): SoulProfile {
    if (!player.soul) {
      throw new Error('Forge a soul before taking world actions.')
    }
    return player.soul
  }

  function setZoneClimate(zoneId: string, mood: string, hazardLevel: number) {
    const zone = worldState.zones.find((entry) => entry.id === zoneId)
    if (!zone) {
      return
    }
    zone.climate = {
      ...zone.climate,
      mood,
      hazardLevel,
    }
  }

  function appendHistory(player: PlayerSnapshot, message: string) {
    player.actionHistory = [message, ...player.actionHistory].slice(0, 8)
  }

  function result(player: PlayerSnapshot, message: string): GameActionResult {
    const soul = player.soul
    const insight = soul
      ? emotionOracle.processEmotionalData({
          focus: soul.focus,
          white: player.karma.white,
          black: player.karma.black,
          gray: player.karma.gray,
          volatility: soul.worldState === 'crazy' ? 4 : soul.worldState === 'sexy' ? 2 : 1,
        })
      : undefined

    return {
      success: true,
      message,
      ...cloneGameData(player),
      insight,
    }
  }

  return {
    getGameData(wallet) {
      return cloneGameData(getOrCreatePlayer(wallet))
    },
    applyAction(action) {
      const player = getOrCreatePlayer(action.wallet)

      try {
        let message = 'Action processed.'

        switch (action.type) {
          case 'forge-soul': {
            if (player.soul) {
              throw new Error('Soul already forged for this wallet.')
            }

            const birthMonth = action.payload?.birthMonth ?? 1
            if (birthMonth < 1 || birthMonth > 12) {
              throw new Error('Birth month must be between 1 and 12.')
            }
            player.soul = {
              displayName: action.payload?.displayName?.trim() || 'Unnamed Soul',
              temperament: action.payload?.temperament?.trim() || 'Adaptive',
              birthMonth,
              worldState: 'cool',
              focus: 0,
              combatLicensed: false,
              transcended: false,
              tokenBoundAccount:
                action.payload?.tokenBoundAccount?.trim() || `${player.wallet}-soul-vault`,
            }
            player.coolBalance += 100
            player.activeZoneId = 'soul-forge'
            appendHistory(player, `Soul forged for ${player.soul.displayName}.`)
            message = 'Soul forged and sovereign identity activated.'
            break
          }
          case 'meditate': {
            const soul = requireSoul(player)
            soul.worldState = 'cool'
            soul.focus += 10
            player.karma.white += 2
            updateReputation(player.karma)
            player.activeZoneId = 'oracle-district'
            appendHistory(player, 'Meditation converted turbulence into lucid focus.')
            message = 'Meditation raised focus and white karma.'
            break
          }
          case 'create-artifact': {
            const soul = requireSoul(player)
            const zoneId = action.zoneId ?? 'aeterna-gate'
            if (getZone(zoneId).primaryAction === 'engage-combat') {
              throw new Error('Artifacts cannot be created inside combat-only zones.')
            }
            soul.worldState = 'sexy'
            soul.focus += 15
            player.karma.white += 3
            player.karma.gray += 1
            player.coolBalance += 15
            updateReputation(player.karma)
            player.level += 1
            player.activeZoneId = zoneId
            setZoneClimate(zoneId, 'inspired', 20)
            appendHistory(player, `Created a new artifact in ${getZone(zoneId).name}.`)
            message = 'Artifact published into the metaverse economy.'
            break
          }
          case 'complete-bounty': {
            const soul = requireSoul(player)
            const masteryScore = Math.max(1, Math.min(100, action.payload?.masteryScore ?? 75))
            soul.worldState = 'cool'
            soul.focus += 5 + Math.floor(masteryScore / 10)
            player.karma.white += masteryScore >= 70 ? 1 : 0
            player.karma.gray += masteryScore >= 90 ? 3 : 2
            player.coolBalance += masteryScore
            updateReputation(player.karma)
            player.level += masteryScore >= 90 ? 2 : 1
            appendHistory(player, `Completed a bounty at mastery ${masteryScore}.`)
            message = 'Skilled work converted directly into COOL rewards.'
            break
          }
          case 'license-combat': {
            const soul = requireSoul(player)
            if (soul.focus < 25 || player.karma.reputation < 5) {
              throw new Error('Combat license requires at least 25 focus and 5 reputation.')
            }
            soul.combatLicensed = true
            player.activeZoneId = 'shadow-arena'
            appendHistory(player, 'Combat license granted after karmic review.')
            message = 'Combat license granted.'
            break
          }
          case 'engage-combat': {
            const soul = requireSoul(player)
            const zone = getZone(action.zoneId ?? 'shadow-arena')
            const access = shadowArena.initializeBattle(zone, soul.combatLicensed)
            if (!access.allowed) {
              throw new Error(access.message)
            }
            const outcome = shadowArena.resolveBattle(
              shadowArena.processBattleAction({
                honorable: Boolean(action.payload?.honorable ?? true),
                focus: soul.focus,
                hasLicense: soul.combatLicensed,
                zone,
              }),
            )
            soul.worldState = 'crazy'
            soul.focus += outcome.focusDelta
            player.karma.white += outcome.whiteDelta
            player.karma.black += outcome.blackDelta
            player.karma.gray += outcome.grayDelta
            player.coolBalance += outcome.coolReward
            updateReputation(player.karma)
            player.activeZoneId = zone.id
            setZoneClimate(zone.id, outcome.whiteDelta > 0 ? 'charged' : 'volatile', outcome.whiteDelta > 0 ? 35 : 65)
            appendHistory(player, outcome.message)
            message = outcome.message
            break
          }
          case 'transcend': {
            const soul = requireSoul(player)
            if (!soul.combatLicensed) {
              throw new Error('Combat license required before transcendence.')
            }
            if (soul.focus < 100 || player.karma.white < 20 || player.karma.black > 5 || player.karma.reputation < 25) {
              throw new Error('Transcendence thresholds not yet met.')
            }
            soul.transcended = true
            soul.worldState = 'cool'
            player.coolBalance += 250
            player.activeZoneId = action.zoneId ?? 'oracle-district'
            appendHistory(player, 'Transcendence achieved. You can now author the world question.')
            message = 'Transcendence unlocked world authorship.'
            break
          }
          case 'ask-world-question': {
            const soul = requireSoul(player)
            if (!soul.transcended) {
              throw new Error('Only transcended souls can ask the world question.')
            }
            if (worldState.answerExpiresAt && new Date(worldState.answerExpiresAt).getTime() > Date.now()) {
              throw new Error('A world question is already active.')
            }
            const question = action.payload?.question?.trim()
            const answer = action.payload?.answer?.trim()
            if (!question || !answer) {
              throw new Error('Question and answer are required.')
            }
            player.activeZoneId = action.zoneId ?? 'oracle-district'
            worldState.currentQuestion = question
            worldState.collectiveAnswer = answer
            worldState.answerExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
            appendHistory(player, `Authored the world question: ${question}`)
            message = 'The city now carries your question for the next 24 hours.'
            break
          }
          default:
            throw new Error('Unsupported action.')
        }

        player.unlockedSystems = unlockedSystems(player)
        return result(player, message)
      } catch (error) {
        return {
          success: false,
          message: error instanceof Error ? error.message : 'Action failed.',
          ...cloneGameData(player),
        }
      }
    },
  }
}

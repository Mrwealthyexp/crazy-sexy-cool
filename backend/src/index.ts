import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import {
  defaultPlayerState,
  defaultZones,
  type GameAction,
  type GameActionResult,
  type PlayerState,
  type GameState,
  type Zone,
} from '../../shared/game'
import { ShadowArena } from './services/ShadowArena'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
const shadowArena = new ShadowArena()

app.use(cors())
app.use(express.json())

let gameState: GameState = {
  player: { ...defaultPlayerState },
  zones: [...defaultZones],
  updatedAt: new Date().toISOString(),
}

const setGameState = (state: GameState): GameState => {
  gameState = { ...state, updatedAt: new Date().toISOString() }
  return gameState
}

const findZone = (zoneId: string): Zone | undefined => gameState.zones.find((zone) => zone.id === zoneId)

const respondWithAction = (res: express.Response, ok: boolean, message: string, status = 200): void => {
  const body: GameActionResult = {
    ok,
    message,
    state: gameState,
  }

  res.status(status).json(body)
}

// Routes
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.get('/game/data', (_req, res) => {
  res.json({ state: gameState })
})

app.post('/game/action', (req, res) => {
  const action = req.body as GameAction

  if (!action || typeof action.type !== 'string') {
    respondWithAction(res, false, 'Invalid action payload.', 400)
    return
  }

  if (action.type === 'TOGGLE_COMBAT_LICENSE') {
    const player: PlayerState = {
      ...gameState.player,
      hasCombatLicense: !gameState.player.hasCombatLicense,
    }

    setGameState({ ...gameState, player })
    respondWithAction(
      res,
      true,
      player.hasCombatLicense ? 'Combat license activated.' : 'Combat license deactivated.',
    )
    return
  }

  const targetZoneId = action.zoneId ?? gameState.player.currentZoneId
  const zone = findZone(targetZoneId)

  if (!zone) {
    respondWithAction(res, false, `Unknown zone: ${targetZoneId}.`, 404)
    return
  }

  if (action.type === 'ENTER_ZONE') {
    const player: PlayerState = {
      ...gameState.player,
      currentZoneId: zone.id,
    }

    setGameState({ ...gameState, player })
    respondWithAction(res, true, `Entered ${zone.name}.`)
    return
  }

  if (action.type === 'ATTEMPT_COMBAT') {
    const decision = shadowArena.canEngageCombat(zone, gameState.player)

    if (!decision.allowed) {
      respondWithAction(res, false, decision.reason, 403)
      return
    }

    const player: PlayerState = {
      ...gameState.player,
      karma: gameState.player.karma + 5,
      souls: gameState.player.souls + 1,
      level: Math.min(gameState.player.level + 1, 99),
      worldlyState: zone.combatMode === 'open' ? 'crazy' : 'cool',
    }

    setGameState({ ...gameState, player })
    respondWithAction(res, true, `${decision.reason} You gained +5 karma and +1 soul.`)
    return
  }

  respondWithAction(res, false, `Unsupported action type: ${action.type}.`, 400)
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

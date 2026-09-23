import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { lunarPhases, type MoonPhase } from './data/lunarPhases.js'
import { GameWorld } from './services/GameWorld.js'

dotenv.config()

const app = express()
const PORT = Number(process.env.PORT || 3001)
const gameWorld = new GameWorld()

app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.get('/game/phases', (_req, res) => {
  res.json(lunarPhases)
})

app.get('/game/state', (_req, res) => {
  res.json(gameWorld.getState())
})

app.post('/game/moon-phase', (req, res) => {
  const phase = req.body?.phase as MoonPhase | undefined
  if (!phase || !lunarPhases.some((entry) => entry.name === phase)) {
    res.status(400).json({ error: 'Invalid moon phase' })
    return
  }

  res.json(gameWorld.setMoonPhase(phase))
})

app.post('/game/quests/:questId/complete', (req, res) => {
  try {
    res.json(gameWorld.completeQuest(req.params.questId))
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Quest completion failed' })
  }
})

app.post('/game/powers/use', (req, res) => {
  const power = req.body?.power as 'fair-emotions' | undefined
  if (power !== 'fair-emotions') {
    res.status(400).json({ error: 'Unsupported power' })
    return
  }

  try {
    res.json(gameWorld.useGreatTeacherPower(power))
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Power invocation failed' })
  }
})

app.post('/game/pvp/resolve', (req, res) => {
  const zoneId = req.body?.zoneId as string | undefined
  if (!zoneId) {
    res.status(400).json({ error: 'zoneId is required' })
    return
  }

  try {
    res.json(gameWorld.resolveBattle(zoneId))
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Battle resolution failed' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

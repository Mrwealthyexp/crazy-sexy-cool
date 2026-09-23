import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

import { createGameEngine } from './gameEngine.js'

dotenv.config()

const app = express()
const PORT = Number(process.env.PORT || 3000)
const gameEngine = createGameEngine()

app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.get('/game/data', (req, res) => {
  res.json(gameEngine.getGameData(String(req.query.wallet ?? '0xguest')))
})

app.post('/game/action', (req, res) => {
  const result = gameEngine.applyAction(req.body)
  res.status(result.success ? 200 : 400).json(result)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

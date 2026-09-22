import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { ShadowArena } from './services/ShadowArena.js'

dotenv.config()

const app = express()
const shadowArena = new ShadowArena()
const port = Number(process.env.PORT || 3000)

app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.get('/platform/overview', (_req, res) => {
  res.json({
    chain: 'Base Sepolia',
    combatQueueOpen: true,
    marketplaceLive: false,
    governanceEnabled: false,
  })
})

app.get('/world/zones', (_req, res) => {
  res.json({
    zones: shadowArena.listVisibleZones(),
  })
})

app.get('/combat/queue', (_req, res) => {
  res.json(shadowArena.getQueueState())
})

app.post('/combat/intents', (req, res) => {
  const result = shadowArena.submitIntent(req.body)
  res.status(result.accepted ? 202 : 400).json(result)
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

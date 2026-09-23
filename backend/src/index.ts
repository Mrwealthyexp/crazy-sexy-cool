import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { ShadowArena } from './services/ShadowArena.js'

dotenv.config()

const app = express()
const PORT = Number(process.env.PORT || 3001)
const shadowArena = new ShadowArena()

app.use(cors())
app.use(express.json())

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.get('/combat/overview', (req, res) => {
  res.json(shadowArena.getCombatOverview())
})

app.post('/combat/mode', (req, res) => {
  const tierId = typeof req.body?.tierId === 'string' ? req.body.tierId : ''

  try {
    const overview = shadowArena.setCombatTier(tierId)
    res.json(overview)
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : 'Unable to update combat tier',
    })
  }
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

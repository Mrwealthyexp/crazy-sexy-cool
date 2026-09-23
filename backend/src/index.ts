import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { ShadowArena } from './services/ShadowArena.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
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
  const { equipped } = req.body

  if (typeof equipped !== 'boolean') {
    res.status(400).json({ error: 'equipped must be a boolean' })
    return
  }

  res.json(shadowArena.setCombatMode(equipped))
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// Routes
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.get('/game/data', (_req, res) => {
  res.json({
    world: 'Crazy Sexy Cool',
    moonPhase: 'Full',
    availableZones: ['red-district', 'velvet-lounge', 'glass-tower', 'nexus', 'shadow-realm', 'throne-room'],
    message: 'Prototype world state for the transcendence engine.',
  })
})

app.post('/game/action', (req, res) => {
  const action = req.body ?? {}

  res.json({
    accepted: true,
    action,
    outcome: 'Action recorded in prototype mode. Wire this endpoint to on-chain or attestation logic next.',
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

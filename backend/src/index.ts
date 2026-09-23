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
    message: 'Prototype world state for the transcendence engine.',
  })
})

app.post('/game/action', (req, res) => {
  const action = req.body

  if (
    !action ||
    typeof action !== 'object' ||
    typeof action.type !== 'string' ||
    (action.payload !== undefined && (typeof action.payload !== 'object' || Array.isArray(action.payload)))
  ) {
    return res.status(400).json({
      accepted: false,
      error: 'Invalid action payload. Expected { type: string, payload?: object }.',
    })
  }

  res.json({
    accepted: true,
    action: {
      type: action.type,
      payload: action.payload ?? {},
    },
    outcome: 'Action recorded in prototype mode. Wire this endpoint to on-chain or attestation logic next.',
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

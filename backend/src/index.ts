import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { EmotionOracle, type EmotionSignalInput } from './services/EmotionOracle.js'
import { ShadowArena, type BattleActionInput, type BattleParticipant } from './services/ShadowArena.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

const emotionOracle = new EmotionOracle()
const shadowArena = new ShadowArena()

const featuredCombatants: BattleParticipant[] = [
  { soulId: 'sun-001', worldlyPhase: 'Crazy', combatLicense: 'teacher', karma: 88 },
  { soulId: 'moon-108', worldlyPhase: 'Sexy', combatLicense: 'initiate', karma: 63 },
]

const worldPulse: EmotionSignalInput[] = [
  { subject: 'Aeterna Gate', dominantEmotion: 'clarity', intensity: 42 },
  { subject: 'Sunken California', dominantEmotion: 'rage', intensity: 79 },
  { subject: 'Coral Cathedral Florida', dominantEmotion: 'empathy', intensity: 66 },
]

app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.get('/game/data', async (_req, res) => {
  const emotionalWeather = await Promise.all(worldPulse.map((signal) => emotionOracle.detectEmotion(signal)))
  const combatPreview = await shadowArena.initializeBattle(featuredCombatants)

  res.json({
    overview: {
      world: 'Aeterna',
      activeZones: 6,
      greatTeacherFocus: 'Planetary interventions reshape the map through karmic cost.',
    },
    emotionalWeather,
    combatPreview,
  })
})

app.post('/game/action', async (req, res) => {
  const action = req.body as BattleActionInput & { type?: 'challenge' | 'invoke' | 'meditate' }

  if (!action.type || !action.actorId || !action.worldlyPhase) {
    res.status(400).json({
      error: 'Action requires type, actorId, and worldlyPhase.',
    })
    return
  }

  if (action.type === 'challenge') {
    const result = await shadowArena.processBattleAction(action)
    res.json({
      action: 'challenge',
      ...result,
    })
    return
  }

  if (action.type === 'invoke') {
    const reading = await emotionOracle.detectEmotion({
      subject: action.targetId ?? action.actorId,
      dominantEmotion: action.worldlyPhase === 'Crazy' ? 'rage' : action.worldlyPhase === 'Sexy' ? 'empathy' : 'clarity',
      intensity: 70,
    })

    res.json({
      action: 'invoke',
      reading,
      karmicCost: 'Teacher intervention echoes back through the emotional field.',
    })
    return
  }

  const resolution = await shadowArena.resolveBattle(featuredCombatants)
  res.json({
    action: 'meditate',
    resolution,
    karmaShift: 3,
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

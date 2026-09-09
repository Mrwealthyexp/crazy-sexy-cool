import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { emotionOracle } from './services/EmotionOracle'
import { shadowArenaGenerator } from './services/ShadowArena'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3001

app.get('/health', (_req, res) => {
  res.json({ status: 'The Oracle is watching.', timestamp: new Date().toISOString() })
})

app.post('/oracle/emotion', async (req, res) => {
  try {
    const { combatLog, playerHistory, relationshipWeb } = req.body
    const analysis = await emotionOracle.analyzeCombatEmotions(combatLog, playerHistory, relationshipWeb)
    res.json({ success: true, emotions: analysis })
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message })
  }
})

app.post('/shadow-arena/generate', (req, res) => {
  try {
    const { playerHistory, karmicDebt, currentStage } = req.body
    const arena = shadowArenaGenerator.generate(playerHistory, karmicDebt, currentStage)
    res.json({ success: true, arena })
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message })
  }
})

app.post('/oracle/world-question', async (req, res) => {
  try {
    const { answers } = req.body
    const dominantTheme = await emotionOracle.generateWorldQuestionImpact(answers)
    res.json({ success: true, dominantTheme })
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message })
  }
})

app.listen(PORT, () => {
  console.log(`🔮 Crazy Sexy Cool Oracle running on port ${PORT}`)
})

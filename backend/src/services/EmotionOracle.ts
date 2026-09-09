import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

interface CombatLog {
  attacker: string
  defender: string
  actions: string[]
  chatMessages: string[]
  duration: number
  winner: string | null
}

interface EmotionAnalysis {
  trueEmotion: string
  hiddenDesire: string
  karmicPattern: string
  shadowAspect: string
}

export class EmotionOracle {
  async analyzeCombatEmotions(
    combatLog: CombatLog,
    playerHistory: any[],
    relationshipWeb: any
  ): Promise<Record<string, EmotionAnalysis>> {
    const prompt = `
Analyze the true emotional state of each player in this combat scenario.
Not what they said. Not what they did. The hidden truth.

Combat Log:
${JSON.stringify(combatLog, null, 2)}

Player History:
${JSON.stringify(playerHistory, null, 2)}

Relationship Web:
${JSON.stringify(relationshipWeb, null, 2)}

For each player, provide:
1. trueEmotion: What they were REALLY feeling (one sentence, poetic)
2. hiddenDesire: What they actually wanted but couldn't admit
3. karmicPattern: The recurring pattern this reveals
4. shadowAspect: The part of themselves they were fighting

Format as JSON with player addresses as keys.
`

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are the Emotion Oracle of Crazy Sexy Cool. You see the truth behind all masks. You speak in poetic, mystical language that reveals without judging.'
        },
        { role: 'user', content: prompt }
      ],
      temperature: 0.9,
      max_tokens: 2000
    })

    const content = response.choices[0].message.content
    if (!content) throw new Error('No response from oracle')

    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('Invalid response format')

    return JSON.parse(jsonMatch[0])
  }

  async generateWorldQuestionImpact(answers: string[]): Promise<string> {
    const prompt = `
These are the answers to the World Question "What are you really fighting for?":

${answers.join('\n')}

Analyze the dominant emotional theme and determine what world rule change should occur.
Return ONLY one word: Freedom, Love, Power, Nothing, Justice, or Fun.
`

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: 10
    })

    return response.choices[0].message.content?.trim() || 'Nothing'
  }
}

export const emotionOracle = new EmotionOracle()

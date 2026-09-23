/**
 * EmotionOracle Service
 * Handles emotion detection and processing
 */
export type DominantEmotion = 'rage' | 'grief' | 'wonder' | 'clarity' | 'empathy'

export interface EmotionSignalInput {
  subject: string
  dominantEmotion: DominantEmotion
  intensity: number
}

export interface EmotionalReading {
  subject: string
  dominantEmotion: DominantEmotion
  intensity: number
  volatility: 'low' | 'medium' | 'high'
  guidance: string
}

export interface EmotionalForecast {
  averageIntensity: number
  dominantEmotion: DominantEmotion
  guidance: string
}

export class EmotionOracle {
  async detectEmotion(data: EmotionSignalInput): Promise<EmotionalReading> {
    const volatility = data.intensity >= 75 ? 'high' : data.intensity >= 45 ? 'medium' : 'low'
    const guidanceByEmotion: Record<DominantEmotion, string> = {
      rage: 'Redirect the fire before it hardens into violence.',
      grief: 'Let mourning name what still matters.',
      wonder: 'A doorway opens when awe is shared instead of hoarded.',
      clarity: 'Truth travels fastest when it is spoken without fear.',
      empathy: 'Connection deepens when pain is witnessed without judgment.',
    }

    return {
      ...data,
      volatility,
      guidance: guidanceByEmotion[data.dominantEmotion],
    }
  }

  async processEmotionalData(emotionData: EmotionalReading[]): Promise<EmotionalForecast> {
    if (emotionData.length === 0) {
      return {
        averageIntensity: 0,
        dominantEmotion: 'clarity',
        guidance: 'No emotional signals detected.',
      }
    }

    const averageIntensity =
      emotionData.reduce((total, reading) => total + reading.intensity, 0) / Math.max(emotionData.length, 1)

    const dominantEmotion = emotionData.reduce((current, reading) =>
      reading.intensity > current.intensity ? reading : current,
    ).dominantEmotion

    return {
      averageIntensity: Math.round(averageIntensity),
      dominantEmotion,
      guidance:
        averageIntensity >= 70
          ? 'The emotional field is volatile. Teachers should intervene carefully.'
          : 'The emotional field is stable enough for guided transformation.',
    }
  }
}

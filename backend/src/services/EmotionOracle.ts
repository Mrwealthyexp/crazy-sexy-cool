import type { WorldState } from '../types/game.js'

export interface EmotionSignal {
  focus: number
  white: number
  black: number
  gray: number
  volatility: number
}

export interface EmotionInsight {
  dominantState: WorldState
  emotion: string
  recommendation: string
}

/**
 * EmotionOracle Service
 * Maps player behavior into a dominant world-state lens.
 */
export class EmotionOracle {
  detectEmotion(signal: EmotionSignal): EmotionInsight {
    const crazyScore = signal.volatility + signal.black * 2
    const sexyScore = signal.gray + Math.floor(signal.focus / 12)
    const coolScore = signal.white * 2 + Math.floor(signal.focus / 10)

    if (crazyScore >= sexyScore && crazyScore >= coolScore) {
      return {
        dominantState: 'crazy',
        emotion: signal.black > 0 ? 'combustive' : 'electric',
        recommendation: 'Center the soul before escalating power into conflict.',
      }
    }

    if (sexyScore >= coolScore) {
      return {
        dominantState: 'sexy',
        emotion: 'magnetic',
        recommendation: 'Channel inspiration into artifacts, allies, and visible value.',
      }
    }

    return {
      dominantState: 'cool',
      emotion: 'lucid',
      recommendation: 'Use clarity to convert progress into governance and transcendence.',
    }
  }

  processEmotionalData(signal: EmotionSignal): EmotionInsight {
    return this.detectEmotion(signal)
  }
}

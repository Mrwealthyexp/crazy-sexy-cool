/**
 * EmotionOracle Service
 * Handles emotion detection and processing
 */
export interface EmotionalSignal {
  source: string
  value: number
  resonance: 'crazy' | 'sexy' | 'cool'
}

export interface EmotionReading {
  primaryEmotion: EmotionalSignal['resonance']
  averageValue: number
  signalCount: number
}

export interface EmotionalProfile extends EmotionReading {
  alignment: 'volatile' | 'magnetic' | 'detached'
}

export class EmotionOracle {
  async detectEmotion(signals: EmotionalSignal[]): Promise<EmotionReading> {
    if (signals.length === 0) {
      return {
        primaryEmotion: 'cool',
        averageValue: 0,
        signalCount: 0,
      }
    }

    const strongestSignal = signals.reduce((previous, current) =>
      current.value > previous.value ? current : previous,
    )

    const averageValue =
      signals.reduce((sum, signal) => sum + signal.value, 0) / signals.length

    return {
      primaryEmotion: strongestSignal.resonance,
      averageValue: Number(averageValue.toFixed(2)),
      signalCount: signals.length,
    }
  }

  async processEmotionalData(signals: EmotionalSignal[]): Promise<EmotionalProfile> {
    const reading = await this.detectEmotion(signals)

    return {
      ...reading,
      alignment:
        reading.primaryEmotion === 'crazy'
          ? 'volatile'
          : reading.primaryEmotion === 'sexy'
            ? 'magnetic'
            : 'detached',
    }
  }
}

import type { MoonPhase } from '../data/lunarPhases'

/**
 * EmotionOracle Service
 * Handles emotion detection and phase-based amplification.
 */
export class EmotionOracle {
  getEmotionMultiplier(phase: MoonPhase) {
    return phase === 'Full Moon' ? 3 : 1
  }

  getVisibilityMode(phase: MoonPhase, isGreatTeacher: boolean) {
    if (phase !== 'Dark Moon') {
      return 'clear'
    }

    return isGreatTeacher ? 'teacher-sight' : 'obscured'
  }

  describeEmotionalState(phase: MoonPhase) {
    if (phase === 'Full Moon') {
      return 'Emotions are amplified and Fair Emotions costs are reduced.'
    }

    if (phase === 'Dark Moon') {
      return 'Perception bends toward intuition and mystery.'
    }

    return 'Emotional field is stable.'
  }
}

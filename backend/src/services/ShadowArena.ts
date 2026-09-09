interface PlayerHistory {
  combats: any[]
  transactions: any[]
  relationships: any[]
  stage: number
  karma: any
}

interface ShadowArena {
  theme: string
  environment: string
  boss: {
    name: string
    form: string
    dialogue: string[]
    mechanic: string
  }
  evolutionChoice: {
    absorb: { power: string; risk: string }
    purify: { wisdom: string; path: string }
  }
  trials: string[]
}

export class ShadowArenaGenerator {
  generate(playerHistory: PlayerHistory, karmicDebt: number, currentStage: number): ShadowArena {
    const theme = this.determineTheme(playerHistory)
    const boss = this.generateBoss(playerHistory, karmicDebt)
    const environment = this.generateEnvironment(theme)
    const evolutionChoice = this.generateEvolutionChoice(currentStage)
    const trials = this.generateTrials(playerHistory, 3)

    return { theme, environment, boss, evolutionChoice, trials }
  }

  private determineTheme(history: PlayerHistory): string {
    if (history.karma?.blackKarma > history.karma?.whiteKarma) {
      return 'The Burning City of Regrets'
    }
    if (history.stage <= 1) return 'The Mirror Maze of Desire'
    if (history.stage === 2) return 'The Frozen Library of Lies'
    return 'The Labyrinth of Unbecoming'
  }

  private generateBoss(history: PlayerHistory, debt: number) {
    const bosses = [
      {
        name: 'Your First Victim',
        form: 'A shadow with your face but their eyes',
        dialogue: [
          'You killed me before you knew my name.',
          'I am the reason you learned to swing first.',
          'Will you let me live now, or kill me again?'
        ],
        mechanic: 'Boss mirrors your strongest attack. To win, use your weakest move.'
      },
      {
        name: 'The Hollow Icon',
        form: 'A beautiful statue with no heart',
        dialogue: [
          'You built me to be loved. Now I am empty.',
          'Every compliment you gave was a brick in my prison.',
          'Can you love without being seen?'
        ],
        mechanic: 'Boss gains power from attention. To win, look away.'
      },
      {
        name: 'The Frozen Architect',
        form: 'A perfect geometric structure that breathes ice',
        dialogue: [
          'I am every plan that worked and every heart that broke.',
          'You calculated me into existence. Now calculate me out.',
          'What is the formula for warmth?'
        ],
        mechanic: 'Boss has no weaknesses. To win, make a mistake on purpose.'
      }
    ]
    return bosses[debt % bosses.length]
  }

  private generateEnvironment(theme: string): string {
    const environments: Record<string, string> = {
      'The Burning City of Regrets': 'A city that burns but never turns to ash. The fire is memory.',
      'The Mirror Maze of Desire': 'Infinite reflections. Each mirror shows what you want. None show what you need.',
      'The Frozen Library of Lies': 'Every book contains a truth you told yourself that wasnt true.',
      'The Labyrinth of Unbecoming': 'A maze that removes one certainty at each turn. By the center, you are nobody.'
    }
    return environments[theme] || 'A void that asks questions.'
  }

  private generateEvolutionChoice(stage: number) {
    return {
      absorb: {
        power: `Gain ${stage * 100} mitochondrial points instantly.`,
        risk: 'Body may mutate. NPCs may fear you. Karma debt increases.'
      },
      purify: {
        wisdom: `Gain ${stage * 50} mitochondrial points over ${stage} days.`,
        path: 'Slower but safe. Great Teachers may assist. Karma remains clean.'
      }
    }
  }

  private generateTrials(history: PlayerHistory, count: number): string[] {
    const allTrials = [
      'Face a memory you have been running from.',
      'Admit a lie you told yourself.',
      'Forgive someone who never apologized.',
      'Accept a defeat you never acknowledged.',
      'Love something you have been hating.',
      'Hate something you have been loving blindly.',
      'Speak a truth that will cost you.',
      'Remain silent when speaking would save you.'
    ]
    return allTrials.sort(() => Math.random() - 0.5).slice(0, count)
  }
}

export const shadowArenaGenerator = new ShadowArenaGenerator()

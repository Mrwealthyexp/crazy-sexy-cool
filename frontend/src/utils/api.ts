const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export const api = {
  async analyzeEmotions(combatLog: any, playerHistory: any, relationshipWeb: any) {
    const res = await fetch(`${API_URL}/oracle/emotion`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ combatLog, playerHistory, relationshipWeb })
    })
    return res.json()
  },

  async generateShadowArena(playerHistory: any, karmicDebt: number, currentStage: number) {
    const res = await fetch(`${API_URL}/shadow-arena/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerHistory, karmicDebt, currentStage })
    })
    return res.json()
  },

  async analyzeWorldQuestion(answers: string[]) {
    const res = await fetch(`${API_URL}/oracle/world-question`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers })
    })
    return res.json()
  }
}

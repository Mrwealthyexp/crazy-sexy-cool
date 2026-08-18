const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export async function fetchGameData() {
  const response = await fetch(`${API_URL}/game/data`)
  return response.json()
}

export async function submitGameAction(action: any) {
  const response = await fetch(`${API_URL}/game/action`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(action),
  })
  return response.json()
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export async function fetchGameData() {
  const response = await fetch(`${API_URL}/game/data`)
  if (!response.ok) {
    throw new Error(`Failed to fetch game data: ${response.status}`)
  }
  return response.json()
}

export async function submitGameAction(action: unknown) {
  const response = await fetch(`${API_URL}/game/action`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(action),
  })
  if (!response.ok) {
    throw new Error(`Failed to submit game action: ${response.status}`)
  }
  return response.json()
}

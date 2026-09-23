const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export async function fetchCombatOverview() {
  const response = await fetch(`${API_URL}/combat/overview`)

  if (!response.ok) {
    throw new Error('Failed to load combat overview')
  }

  return response.json()
}

export async function setCombatMode(equipped: boolean) {
  const response = await fetch(`${API_URL}/combat/mode`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ equipped }),
  })

  if (!response.ok) {
    throw new Error('Failed to update combat mode')
  }

  return response.json()
}

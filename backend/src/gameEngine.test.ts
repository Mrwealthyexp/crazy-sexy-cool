import test from 'node:test'
import assert from 'node:assert/strict'

import { createGameEngine } from './gameEngine.js'

function forgeSoul(engine = createGameEngine()) {
  const wallet = '0xA11CE'
  engine.applyAction({
    wallet,
    type: 'forge-soul',
    payload: {
      displayName: 'Nova',
      temperament: 'Visionary',
      birthMonth: 7,
      tokenBoundAccount: '0xa11ce-soul-vault',
    },
  })
  return { engine, wallet }
}

test('transcendence failure does not author a world question', () => {
  const { engine, wallet } = forgeSoul()

  const result = engine.applyAction({ wallet, type: 'transcend', zoneId: 'oracle-district' })

  assert.equal(result.success, false)
  assert.equal(result.message, 'Combat license required before transcendence.')
  assert.equal(result.world.currentQuestion, null)
  assert.equal(result.world.collectiveAnswer, null)
})

test('transcendence unlocks authorship and ask-world-question mutates shared world state', () => {
  const { engine, wallet } = forgeSoul()

  engine.applyAction({ wallet, type: 'meditate' })
  engine.applyAction({ wallet, type: 'meditate' })
  engine.applyAction({ wallet, type: 'meditate' })
  engine.applyAction({ wallet, type: 'create-artifact', zoneId: 'soul-forge' })
  engine.applyAction({ wallet, type: 'create-artifact', zoneId: 'aeterna-gate' })
  engine.applyAction({ wallet, type: 'create-artifact', zoneId: 'shadow-arena' })
  engine.applyAction({ wallet, type: 'create-artifact', zoneId: 'oracle-district' })
  engine.applyAction({ wallet, type: 'complete-bounty', payload: { masteryScore: 90 } })
  engine.applyAction({ wallet, type: 'license-combat' })
  engine.applyAction({ wallet, type: 'engage-combat', zoneId: 'shadow-arena', payload: { honorable: true } })

  const transcend = engine.applyAction({ wallet, type: 'transcend', zoneId: 'oracle-district' })
  assert.equal(transcend.success, true)
  assert.equal(transcend.world.currentQuestion, null)

  const ask = engine.applyAction({
    wallet,
    type: 'ask-world-question',
    zoneId: 'oracle-district',
    payload: {
      question: 'What heals the city?',
      answer: 'Collective honesty.',
    },
  })

  assert.equal(ask.success, true)
  assert.equal(ask.world.currentQuestion, 'What heals the city?')
  assert.equal(ask.world.collectiveAnswer, 'Collective honesty.')
  assert.equal(ask.player.activeZoneId, 'oracle-district')
})

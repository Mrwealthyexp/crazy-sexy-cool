import { useGameStore } from '../stores/gameStore'

export default function WorldMap() {
  const world = useGameStore((state) => state.world)
  const player = useGameStore((state) => state.player)
  const runAction = useGameStore((state) => state.runAction)
  const loading = useGameStore((state) => state.loading)

  if (!world) {
    return (
      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">World System</p>
            <h2>World Map</h2>
          </div>
        </div>
        <p className="lead">World data will appear after the first sync.</p>
      </section>
    )
  }

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">World System</p>
          <h2>World Map</h2>
        </div>
        {world.currentQuestion ? <span className="badge">Reality altered for 24h</span> : null}
      </div>

      {world.currentQuestion ? (
        <div className="world-question">
          <strong>{world.currentQuestion}</strong>
          <p>{world.collectiveAnswer}</p>
          <span>Expires: {world.answerExpiresAt}</span>
        </div>
      ) : (
        <p className="lead">No collective question is active yet. Transcend to author one.</p>
      )}

      <div className="zone-grid">
        {world.zones.map((zone) => {
          const active = player?.activeZoneId === zone.id
          return (
            <article key={zone.id} className={`zone-card ${active ? 'zone-card-active' : ''}`}>
              <div className="zone-card-header">
                <h3>{zone.name}</h3>
                <span>{zone.coordinates.join(', ')}</span>
              </div>
              <p>{zone.description}</p>
              <p className="muted">{zone.lore}</p>
              <div className="zone-meta">
                <span>Mood: {zone.climate.mood}</span>
                <span>Hazard: {zone.climate.hazardLevel}</span>
                <span>Reward: {zone.climate.rewardMultiplier.toFixed(1)}x</span>
              </div>
              <div className="zone-actions">
                <button
                  className="secondary-button"
                  disabled={loading || !player?.soul || zone.primaryAction === 'forge-soul'}
                  onClick={() =>
                    runAction({
                      type: zone.primaryAction,
                      zoneId: zone.id,
                      payload:
                        zone.primaryAction === 'engage-combat'
                          ? { honorable: true }
                          : undefined,
                    })
                  }
                  type="button"
                >
                  {zone.primaryAction === 'engage-combat'
                    ? 'Enter combat loop'
                    : zone.primaryAction === 'meditate'
                      ? 'Meditate here'
                      : zone.primaryAction === 'forge-soul'
                        ? 'Soul already forged'
                        : 'Create here'}
                </button>
                {zone.id === 'oracle-district' ? (
                  <button
                    className="secondary-button"
                    disabled={loading || !player?.soul}
                    onClick={() =>
                      runAction(
                        player.soul?.transcended
                          ? {
                              type: 'ask-world-question',
                              zoneId: zone.id,
                              payload: {
                                question: 'What heals the city?',
                                answer: 'Collective honesty.',
                              },
                            }
                          : { type: 'transcend', zoneId: zone.id },
                      )
                    }
                    type="button"
                  >
                    {player.soul?.transcended ? 'Ask world question' : 'Attempt transcendence'}
                  </button>
                ) : null}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

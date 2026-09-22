import { zones } from '../data/zones'

export default function WorldMap() {
  return (
    <section className="panel">
      <p className="eyebrow">Gameplay presentation</p>
      <h2>World Map</h2>
      <p className="muted">
        Zone metadata is rendered here for cities, creator districts, land parcels, and
        combat-enabled regions.
      </p>

      <div className="zone-list">
        {zones.map((zone) => (
          <article key={zone.id} className="zone-card">
            <span>{zone.category}</span>
            <h3>{zone.name}</h3>
            <p className="muted">{zone.description}</p>
            <div className="zone-meta">
              <span className="zone-tag">{zone.safety}</span>
              <span className="zone-tag">{zone.combatAccess}</span>
              <span className="zone-tag">{zone.coordinates.join(', ')}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

import { FormEvent } from 'react'

import { useGameStore } from '../stores/gameStore'
import { mockTokenBoundAccount } from '../utils/wagmi'

export default function SoulForge() {
  const forgeDraft = useGameStore((state) => state.forgeDraft)
  const player = useGameStore((state) => state.player)
  const wallet = useGameStore((state) => state.wallet)
  const loading = useGameStore((state) => state.loading)
  const updateForgeDraft = useGameStore((state) => state.updateForgeDraft)
  const runAction = useGameStore((state) => state.runAction)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await runAction({
      type: 'forge-soul',
      payload: {
        ...forgeDraft,
        tokenBoundAccount: mockTokenBoundAccount(wallet),
      },
    })
  }

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Identity System</p>
          <h2>Soul Forge</h2>
        </div>
        <span className="badge">Wallet-native</span>
      </div>

      {player?.soul ? (
        <div className="stack-sm">
          <p className="lead">
            <strong>{player.soul.displayName}</strong> has been forged with the{' '}
            <span className="accent">{player.soul.temperament}</span> temperament.
          </p>
          <div className="stat-grid two-up">
            <div className="stat-card">
              <span>Birth Month</span>
              <strong>{player.soul.birthMonth}</strong>
            </div>
            <div className="stat-card">
              <span>Token-Bound Vault</span>
              <strong>{player.soul.tokenBoundAccount}</strong>
            </div>
          </div>
        </div>
      ) : (
        <form className="stack-sm" onSubmit={handleSubmit}>
          <label>
            Soul name
            <input
              value={forgeDraft.displayName}
              onChange={(event) => updateForgeDraft({ displayName: event.target.value })}
              placeholder="Nova"
            />
          </label>
          <label>
            Temperament
            <input
              value={forgeDraft.temperament}
              onChange={(event) => updateForgeDraft({ temperament: event.target.value })}
              placeholder="Visionary"
            />
          </label>
          <label>
            Birth month
            <input
              type="number"
              min={1}
              max={12}
              value={forgeDraft.birthMonth}
              onChange={(event) => updateForgeDraft({ birthMonth: Number(event.target.value) })}
            />
          </label>
          <button className="primary-button" disabled={loading || wallet.trim().length === 0} type="submit">
            Forge sovereign soul
          </button>
        </form>
      )}
    </section>
  )
}

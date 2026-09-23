import { useGameStore } from '../stores/gameStore'

export default function SoulForge() {
  const { connection, lastBattle } = useGameStore((state) => ({
    connection: state.connection,
    lastBattle: state.lastBattle,
  }))

  return (
    <div className="rounded-lg bg-gray-800 p-4">
      <h2 className="mb-4 text-2xl font-bold text-white">Soul Forge</h2>
      <div className="space-y-3 text-gray-300">
        <p>Forge a wallet-bound soul whose growth loop is now backed by shared lunar gameplay state.</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Moon phase changes sync through the frontend store and backend gameplay engine.</li>
          <li>Quests, world zones, PvP karma, and Great Teacher powers all resolve against the same rules.</li>
          <li>Contract status is mirrored through the karmic ledger until on-chain wiring is enabled.</li>
        </ul>
        <div className="rounded-md border border-gray-700 bg-gray-900 p-3 text-sm">
          <p className="font-semibold text-white">Connection mode: {connection}</p>
          <p className="mt-1 text-gray-400">
            {lastBattle ? `${lastBattle.summary} (+${lastBattle.karmaDelta} karma)` : 'No recent arena resolution yet.'}
          </p>
        </div>
      </div>
    </div>
  )
}

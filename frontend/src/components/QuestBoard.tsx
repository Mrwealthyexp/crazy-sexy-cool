import { useGameStore } from '../stores/gameStore'

export default function QuestBoard() {
  const { quests, currentMoonPhase, loading, completeQuest } = useGameStore((state) => ({
    quests: state.quests,
    currentMoonPhase: state.currentMoonPhase,
    loading: state.loading,
    completeQuest: state.completeQuest,
  }))

  return (
    <div className="rounded-lg bg-gray-800 p-4">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white">Quest Board</h2>
        <p className="mt-1 text-sm text-gray-400">
          Shadow work, growth, and letting-go loops all react to {currentMoonPhase}.
        </p>
      </div>

      <div className="grid gap-3">
        {quests.map((quest) => (
          <div key={quest.id} className="rounded-md border border-gray-700 bg-gray-900 p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold text-white">{quest.title}</h3>
                  <span className="rounded-full bg-indigo-500/20 px-2 py-1 text-xs uppercase tracking-wide text-indigo-200">
                    {quest.category}
                  </span>
                </div>
                <p className="mt-2 text-gray-300">{quest.description}</p>
                <p className="mt-3 text-sm text-gray-400">
                  Soul cost: {quest.soulCost} · Rewards: +{quest.reward.karma} karma / +{quest.reward.souls} souls / +{quest.reward.wisdom} wisdom
                </p>
              </div>
              <button
                type="button"
                onClick={() => void completeQuest(quest.id)}
                disabled={loading || quest.status === 'completed'}
                className="rounded-full bg-violet-500 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-700"
              >
                {quest.status === 'completed' ? 'Completed' : 'Complete quest'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

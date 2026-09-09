import { useState } from 'react'
import { useAccount, useWriteContract, useReadContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import { useGameStore } from '../stores/gameStore'
import { SOUL_FORGE_ABI, CONTRACTS } from '../utils/wagmi'

const MOON_PHASES = ['🌑 New', '🌒 Waxing', '🌕 Full', '🌘 Waning', '🌑 Dark']
const TEMPERAMENTS = ['🔥 Choleric (Crazy)', '💧 Melancholic (Cool)', '💨 Sanguine (Sexy)', '🌍 Phlegmatic (Crazy)']

export default function SoulForge() {
  const { address, chainId } = useAccount()
  const { setSoulId, setLoading, setError } = useGameStore()

  const [sex, setSex] = useState(0)
  const [birthMonth, setBirthMonth] = useState(1)
  const [moonPhase, setMoonPhase] = useState(0)
  const [temperament, setTemperament] = useState(0)

  const contracts = chainId === 84532 ? CONTRACTS.baseSepolia : CONTRACTS.base

  const { data: existingSoul } = useReadContract({
    address: contracts.soulForge as `0x${string}`,
    abi: SOUL_FORGE_ABI,
    functionName: 'getSoulByWallet',
    args: address ? [address] : undefined,
    query: { enabled: !!address }
  })

  const { data: hash, writeContract, isPending } = useWriteContract()
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash })

  const handleForge = async () => {
    if (!address) {
      setError('Please connect your wallet first')
      return
    }
    setLoading(true)
    setError(null)

    try {
      writeContract({
        address: contracts.soulForge as `0x${string}`,
        abi: SOUL_FORGE_ABI,
        functionName: 'forgeSoul',
        args: [sex, birthMonth, moonPhase, temperament],
        value: parseEther('0.01'),
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to forge soul')
      setLoading(false)
    }
  }

  const hasSoul = existingSoul !== undefined && existingSoul !== 0n

  if (hasSoul) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 transcended-glow max-w-md w-full text-center">
          <h2 className="text-3xl font-display text-soul-gold mb-4">Soul Already Forged</h2>
          <p className="text-gray-300 mb-2">Your soul ID: <span className="font-mono text-white">{existingSoul?.toString()}</span></p>
          <button
            className="mt-6 w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg hover:scale-105 transition-transform"
            onClick={() => setSoulId(existingSoul)}
          >
            ENTER THE WORLD
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <h1 className="text-5xl md:text-6xl font-display text-center mb-2 soul-pulse bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          THE SOUL FORGE
        </h1>
        <p className="text-center text-gray-400 mb-12 font-body">
          Your birth determines your destiny. Your choices determine your transcendence.
        </p>

        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
          <div className="mb-8">
            <label className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">Energy Polarity</label>
            <div className="grid grid-cols-3 gap-4">
              {['♂ Male', '♀ Female', '⚧ Transcended'].map((s, i) => (
                <button
                  key={s}
                  onClick={() => setSex(i)}
                  className={`py-4 rounded-xl border-2 transition-all ${sex === i ? 'border-soul-gold bg-soul-gold/20 text-soul-gold' : 'border-white/10 hover:border-white/30'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">Birth Month</label>
            <select
              value={birthMonth}
              onChange={(e) => setBirthMonth(Number(e.target.value))}
              className="w-full bg-black/50 border border-white/20 rounded-xl py-4 px-6 text-white focus:border-soul-gold outline-none"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(2024, i, 1).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">Birth Moon Phase</label>
            <div className="grid grid-cols-5 gap-2">
              {MOON_PHASES.map((phase, i) => (
                <button
                  key={phase}
                  onClick={() => setMoonPhase(i)}
                  className={`py-3 rounded-xl border-2 transition-all text-2xl ${moonPhase === i ? 'border-soul-gold bg-soul-gold/20' : 'border-white/10 hover:border-white/30'}`}
                >
                  {phase}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <label className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">Starting Temperament</label>
            <div className="grid grid-cols-2 gap-4">
              {TEMPERAMENTS.map((temp, i) => (
                <button
                  key={temp}
                  onClick={() => setTemperament(i)}
                  className={`py-4 rounded-xl border-2 transition-all text-left px-4 ${temperament === i ? 'border-soul-gold bg-soul-gold/20 text-soul-gold' : 'border-white/10 hover:border-white/30'}`}
                >
                  {temp}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8 p-6 bg-black/30 rounded-xl border border-white/5">
            <h3 className="text-lg font-bold text-gray-400 mb-4">Soul Preview</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-gray-500">Sex:</div>
              <div className="text-white">{['Male', 'Female', 'Transcended'][sex]}</div>
              <div className="text-gray-500">Element:</div>
              <div className="text-white">{['🔥 Fire', '🌍 Earth', '💨 Air', '💧 Water'][birthMonth % 4]}</div>
              <div className="text-gray-500">Starting State:</div>
              <div className="text-white">{temperament === 0 ? '🔥 CRAZY' : temperament === 2 ? '💧 SEXY' : '🌪️ COOL'}</div>
            </div>
          </div>

          <button
            onClick={handleForge}
            disabled={isPending || isConfirming}
            className={`w-full py-5 rounded-xl font-display text-2xl font-bold transition-all ${isPending || isConfirming ? 'bg-gray-700 cursor-not-allowed' : 'bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 hover:scale-105 hover:shadow-2xl'}`}
          >
            {isPending ? 'SIGNING...' : isConfirming ? 'FORGING SOUL...' : '🔥 FORGE YOUR SOUL (0.01 ETH)'}
          </button>

          <p className="text-center text-xs text-gray-600 mt-4">
            Your soul will be minted as an ERC-6551 Token-Bound Account. Your avatar IS your wallet. This is irreversible.
          </p>
        </div>
      </div>
    </div>
  )
}

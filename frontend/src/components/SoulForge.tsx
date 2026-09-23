import { useMemo, useState } from 'react'
import {
  getMoonDefinition,
  getPlanetDefinition,
  moonPhaseOptions,
  planetOptions,
  sexOptions,
  temperamentOptions,
  type SoulBlueprintInput,
} from '../data/transcendence'
import { useGameStore } from '../stores/gameStore'

const currentMonth = new Date().getMonth() + 1

export default function SoulForge() {
  const createSoul = useGameStore((state) => state.createSoul)
  const playerSoul = useGameStore((state) => state.playerSoul)
  const [form, setForm] = useState<SoulBlueprintInput>({
    name: 'Aeterna Pilgrim',
    walletAddress: '0xA11CE0000000000000000000000000000000001',
    signatureTimestamp: new Date().toISOString(),
    birthMonth: currentMonth,
    sex: 'Transcended',
    rulingPlanet: 'Saturn',
    moonPhase: 'Full',
    temperament: 'Sanguine',
  })

  const planetInsight = useMemo(() => getPlanetDefinition(form.rulingPlanet), [form.rulingPlanet])
  const moonInsight = useMemo(() => getMoonDefinition(form.moonPhase), [form.moonPhase])

  function updateField<K extends keyof SoulBlueprintInput>(field: K, value: SoulBlueprintInput[K]) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  return (
    <section className="rounded-3xl border border-fuchsia-500/20 bg-slate-900/80 p-6 shadow-2xl shadow-fuchsia-950/20">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.3em] text-fuchsia-300">1 · Soul Blueprint Generator</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">Forge a destiny from birth, wallet, and will</h2>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          This character creation flow turns your signature timestamp and self-declared cosmology into an immutable
          blueprint for the transcendence engine.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm text-slate-200">
          Chosen name
          <input
            className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
          />
        </label>
        <label className="text-sm text-slate-200">
          Wallet address
          <input
            className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
            value={form.walletAddress}
            onChange={(event) => updateField('walletAddress', event.target.value)}
          />
        </label>
        <label className="text-sm text-slate-200">
          Wallet signature timestamp
          <input
            className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
            value={form.signatureTimestamp}
            onChange={(event) => updateField('signatureTimestamp', event.target.value)}
          />
        </label>
        <label className="text-sm text-slate-200">
          Birth month
          <input
            min={1}
            max={12}
            type="number"
            className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
            value={form.birthMonth}
            onChange={(event) => updateField('birthMonth', Number(event.target.value))}
          />
        </label>
        <SelectField label="Sex" value={form.sex} options={sexOptions} onChange={(value) => updateField('sex', value)} />
        <SelectField
          label="Ruling planet"
          value={form.rulingPlanet}
          options={planetOptions}
          onChange={(value) => updateField('rulingPlanet', value)}
        />
        <SelectField
          label="Moon phase"
          value={form.moonPhase}
          options={moonPhaseOptions}
          onChange={(value) => updateField('moonPhase', value)}
        />
        <SelectField
          label="Temperament"
          value={form.temperament}
          options={temperamentOptions}
          onChange={(value) => updateField('temperament', value)}
        />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-cyan-500/20 bg-slate-950/80 p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Planetary influence</p>
          <h3 className="mt-2 text-xl font-semibold text-white">{form.rulingPlanet}</h3>
          <p className="mt-3 text-sm text-slate-300">{planetInsight.worldlyPhase}</p>
          <p className="mt-2 text-sm text-slate-200">{planetInsight.divinePower}</p>
          <p className="mt-2 text-sm text-amber-300">{planetInsight.karmicCost}</p>
        </div>
        <div className="rounded-2xl border border-violet-500/20 bg-slate-950/80 p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-violet-300">Moon cycle</p>
          <h3 className="mt-2 text-xl font-semibold text-white">{form.moonPhase} Moon</h3>
          <p className="mt-3 text-sm text-slate-300">{moonInsight.playerEffect}</p>
          <p className="mt-2 text-sm text-slate-200">{moonInsight.worldEffect}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          className="rounded-full bg-fuchsia-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-fuchsia-400"
          onClick={() => createSoul(form)}
          type="button"
        >
          Mint local soul preview
        </button>
        <button
          className="rounded-full border border-slate-600 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
          onClick={() => updateField('signatureTimestamp', new Date().toISOString())}
          type="button"
        >
          Use current signature time
        </button>
        <span className="text-sm text-slate-400">Prototype flow: deterministic preview before on-chain minting.</span>
      </div>

      {playerSoul && (
        <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-4 text-sm text-emerald-100">
          <p className="font-semibold">Forged soul hash: {playerSoul.blueprint.soulHash}</p>
          <p className="mt-2">Elemental affinity: {playerSoul.blueprint.elementalAffinity}</p>
          <p className="mt-1">Shadow work: {playerSoul.blueprint.shadowWork}</p>
        </div>
      )}
    </section>
  )
}

interface SelectFieldProps<T extends string> {
  label: string
  value: T
  options: T[]
  onChange: (value: T) => void
}

function SelectField<T extends string>({ label, value, options, onChange }: SelectFieldProps<T>) {
  return (
    <label className="text-sm text-slate-200">
      {label}
      <select
        className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

export default function SoulForge() {
  const steps = [
    {
      title: 'Set the drop economics',
      detail: 'Choose the mint price knowing 90% goes to the creator and 10% supports the platform.',
    },
    {
      title: 'Lock royalties in the contract',
      detail: 'Secondary sales execute creator royalties automatically without marketplace-by-marketplace negotiation.',
    },
    {
      title: 'Publish to the network',
      detail: 'Release content into CSC with programmable ownership, provenance, and revenue rules.',
    },
  ]

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-cyan-950/20">
      <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Creator launchpad</p>
      <h2 className="mt-2 text-2xl font-bold text-white">Program royalties once, earn forever</h2>
      <p className="mt-2 text-slate-300">
        Creator assets ship with enforceable royalty logic so every resale can pay the original
        artist automatically.
      </p>

      <div className="mt-6 space-y-4">
        {steps.map((step, index) => (
          <div key={step.title} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/10 font-semibold text-cyan-200">
                0{index + 1}
              </div>
              <h3 className="text-lg font-semibold text-white">{step.title}</h3>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{step.detail}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
        <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">Secondary sale path</p>
        <div className="mt-4 grid gap-3 text-sm text-slate-200 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
            <p className="font-semibold text-white">Collector resale</p>
            <p className="mt-2 text-slate-300">Ownership transfers to a new collector.</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
            <p className="font-semibold text-white">Contract enforcement</p>
            <p className="mt-2 text-slate-300">Royalty logic executes at settlement.</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
            <p className="font-semibold text-white">Creator payout</p>
            <p className="mt-2 text-slate-300">The original creator receives their royalty instantly.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

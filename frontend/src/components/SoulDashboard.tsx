export default function SoulDashboard() {
  const metrics = [
    {
      label: 'Creator payout',
      value: '90%',
      detail: 'The platform keeps 10% and the creator receives the rest on every primary sale.',
    },
    {
      label: 'Platform fee',
      value: '10%',
      detail: 'A lean fee supports moderation, hosting, and creator tooling without rent-seeking.',
    },
    {
      label: 'Royalty routing',
      value: 'On-chain',
      detail: 'Royalty payments are distributed automatically when content is resold.',
    },
  ]

  const payouts = [
    { price: '$25 sale', creator: '$22.50', platform: '$2.50' },
    { price: '$100 sale', creator: '$90.00', platform: '$10.00' },
    { price: '$250 sale', creator: '$225.00', platform: '$25.00' },
  ]

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-fuchsia-950/20">
      <div className="flex flex-col gap-2">
        <p className="text-sm uppercase tracking-[0.3em] text-fuchsia-300">Creator dashboard</p>
        <h2 className="text-2xl font-bold text-white">Keep the lion&apos;s share of every drop</h2>
        <p className="text-slate-300">
          Transparent economics for creators, collectors, and the network treasury.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <article key={metric.label} className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
            <p className="text-sm text-slate-400">{metric.label}</p>
            <p className="mt-3 text-3xl font-bold text-white">{metric.value}</p>
            <p className="mt-3 text-sm leading-6 text-slate-300">{metric.detail}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Primary sale split examples</h3>
            <p className="mt-1 text-sm text-slate-300">
              Every sale settles with creator-first math baked into the experience.
            </p>
          </div>
          <div className="rounded-full border border-cyan-400/30 px-3 py-1 text-sm font-medium text-cyan-200">
            90 / 10
          </div>
        </div>
        <div className="mt-4 space-y-3">
          {payouts.map((payout) => (
            <div
              key={payout.price}
              className="grid gap-2 rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-200 sm:grid-cols-3"
            >
              <span>{payout.price}</span>
              <span>Creator: {payout.creator}</span>
              <span>Platform: {payout.platform}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const maxClicks = (items) => Math.max(1, ...items.map((item) => item.clicks))

export function AnalyticsPanel({ analytics }) {
  const weeklyMax = maxClicks(analytics.weeklyClicks || [])
  const topLinks = analytics.topLinks || []

  return (
    <section className="grid gap-4">
      <div className="grid grid-cols-3 gap-3 max-sm:grid-cols-1">
        {[
          ['Links', analytics.totalLinks],
          ['Active', analytics.activeLinks],
          ['Clicks', analytics.totalClicks],
        ].map(([label, value]) => (
          <article className="rounded-[18px] bg-[#174b17] p-4 text-white shadow-lg shadow-emerald-950/10" key={label}>
            <span className="text-xs font-black uppercase tracking-widest text-[#d7f80f]">{label}</span>
            <strong className="mt-2 block text-4xl font-black">{value || 0}</strong>
          </article>
        ))}
      </div>

      <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-950/5">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-teal-700">Analytics</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">Clicks over 7 days</h2>
          </div>
          <strong className="rounded-lg bg-[#d7f80f] px-3 py-2 text-sm font-black text-[#10220f]">
            {analytics.totalClicks || 0} total
          </strong>
        </div>

        <div className="flex h-44 items-end gap-2 rounded-lg bg-slate-50 px-4 pb-4 pt-6">
          {(analytics.weeklyClicks || []).map((day) => (
            <div className="flex h-full flex-1 flex-col justify-end gap-2" key={day.key}>
              <div className="flex flex-1 items-end">
                <div
                  className="w-full rounded-t-lg bg-violet-600 transition-all"
                  style={{ height: `${Math.max(8, (day.clicks / weeklyMax) * 100)}%` }}
                  title={`${day.clicks} clicks`}
                />
              </div>
              <span className="text-center text-[10px] font-black uppercase text-slate-400">{day.label}</span>
            </div>
          ))}
        </div>
      </article>

      <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-950/5">
        <h2 className="mb-4 text-2xl font-black text-slate-950">Top links</h2>
        {topLinks.length ? (
          <div className="grid gap-3">
            {topLinks.map((link, index) => (
              <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-lg bg-slate-50 p-3" key={link.id}>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#d7f80f] text-xs font-black text-[#10220f]">
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <strong className="block truncate text-sm font-black text-slate-950">{link.title}</strong>
                  <span className="block truncate text-xs font-bold text-slate-400">{link.url}</span>
                </div>
                <strong className="text-lg font-black text-slate-950">{link.clicks}</strong>
              </div>
            ))}
          </div>
        ) : (
          <p className="font-bold text-slate-500">Clicks will appear here after people open your links.</p>
        )}
      </article>
    </section>
  )
}

const previewLinks = ['Portfolio', 'YouTube', 'Latest offer']

export function AuthVisual() {
  return (
    <section className="relative grid min-h-[460px] place-items-center max-lg:min-h-0" aria-label="LinkTree preview">
      <div className="grid w-full max-w-[270px] gap-3 rounded-lg border border-slate-200 bg-gradient-to-br from-blue-100 to-green-50 p-6 text-center shadow-2xl shadow-slate-900/10">
        <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-teal-500 via-blue-600 to-orange-500" />
        <strong className="text-slate-950">@creator</strong>
        <p className="text-sm text-slate-500">Everything important, one link away.</p>
        {previewLinks.map((link) => (
          <span
            className="block rounded-lg border border-slate-900/10 bg-white/80 px-4 py-3 text-center font-bold text-slate-950"
            key={link}
          >
            {link}
          </span>
        ))}
      </div>
      <div className="absolute bottom-10 right-0 rounded-lg border border-slate-200 bg-orange-50 px-5 py-4 shadow-xl shadow-slate-900/15 max-md:static max-md:mt-4 max-md:w-full max-md:max-w-[270px]">
        <span className="mb-2 block text-xs font-black uppercase text-slate-500">Clicks today</span>
        <strong className="text-3xl font-black text-slate-950">1,284</strong>
      </div>
    </section>
  )
}

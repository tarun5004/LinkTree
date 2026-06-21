export function LandingFeatureCard({ title, text, tone, children }) {
  return (
    <article className={`group flex min-h-[360px] flex-col justify-between overflow-hidden rounded-lg p-7 transition duration-500 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/20 ${tone}`}>
      <div className="grid min-h-48 place-items-center" aria-hidden="true">
        {children}
      </div>
      <div>
        <h3 className="mb-2 text-3xl font-black">{title}</h3>
        <p className="max-w-md text-sm font-bold">{text}</p>
      </div>
    </article>
  )
}

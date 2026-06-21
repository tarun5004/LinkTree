export function StatusBox({ title, message, actionLabel, onAction, loading = false }) {
  return (
    <main className="grid min-h-[calc(100svh-73px)] place-items-center bg-slate-50 p-6">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 text-center shadow-2xl shadow-slate-900/10">
        {loading ? (
          <span className="mx-auto mb-4 block h-8 w-8 animate-spin rounded-full border-[3px] border-slate-200 border-t-teal-600" aria-hidden="true" />
        ) : null}
        {title ? (
          <h1 className="mb-4 text-4xl font-black leading-none text-slate-950">{title}</h1>
        ) : null}
        <p className="text-slate-500">{message}</p>
        {actionLabel ? (
          <button
            className="mt-6 min-h-11 rounded-lg border border-slate-950 bg-slate-950 px-5 text-sm font-black text-white"
            type="button"
            onClick={onAction}
          >
            {actionLabel}
          </button>
        ) : null}
      </div>
    </main>
  )
}

import { motion } from 'framer-motion'

export function LinkList({ links, onDelete, onOpen, onToggle }) {
  if (!links.length) {
    return (
      <div className="rounded-[24px] border border-dashed border-slate-300 bg-white p-8 text-center">
        <h2 className="text-3xl font-black text-slate-950">No links yet.</h2>
        <p className="mx-auto mt-2 max-w-md font-bold text-slate-500">
          Create your first destination and it will appear in your public preview.
        </p>
      </div>
    )
  }

  return (
    <section className="grid gap-3" aria-label="Created links">
      {links.map((link) => (
        <motion.article
          className="rounded-[20px] border border-slate-200 bg-white p-4 shadow-lg shadow-slate-950/5"
          key={link.id}
          layout
          whileHover={{ y: -4 }}
        >
          <div className="flex items-start justify-between gap-4 max-md:flex-col">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="break-words text-xl font-black text-slate-950">{link.title}</h3>
                <span className={`rounded-full px-2 py-1 text-[10px] font-black uppercase ${link.isActive ? 'bg-lime-100 text-teal-800' : 'bg-slate-100 text-slate-500'}`}>
                  {link.isActive ? 'Active' : 'Hidden'}
                </span>
              </div>
              <p className="mt-1 break-all text-sm font-bold text-teal-700">{link.url}</p>
              {link.description ? <p className="mt-2 text-sm font-bold text-slate-500">{link.description}</p> : null}
            </div>

            <div className="flex shrink-0 flex-wrap gap-2">
              <button
                className="min-h-10 rounded-lg border border-slate-200 bg-white px-4 text-xs font-black text-slate-950 transition hover:border-teal-700"
                onClick={() => onToggle(link)}
                type="button"
              >
                {link.isActive ? 'Hide' : 'Show'}
              </button>
              <button
                className="min-h-10 rounded-lg border border-[#d7f80f] bg-[#d7f80f] px-4 text-xs font-black text-[#10220f] transition hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!link.isActive}
                onClick={() => onOpen(link)}
                type="button"
              >
                Open
              </button>
              <button
                className="min-h-10 rounded-lg border border-red-100 bg-red-50 px-4 text-xs font-black text-red-700 transition hover:border-red-200"
                onClick={() => onDelete(link.id)}
                type="button"
              >
                Delete
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
            <span className="text-xs font-black uppercase text-slate-400">Clicks</span>
            <strong className="text-2xl font-black text-slate-950">{link.clicks}</strong>
          </div>
        </motion.article>
      ))}
    </section>
  )
}

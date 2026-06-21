import { useState } from 'react'
import { motion } from 'framer-motion'

const initialForm = {
  title: '',
  url: '',
  description: '',
}

export function LinkForm({ onCreate, saving }) {
  const [form, setForm] = useState(initialForm)

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await onCreate(form)
    setForm(initialForm)
  }

  return (
    <motion.form
      className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-950/5"
      onSubmit={handleSubmit}
      whileHover={{ y: -3 }}
    >
      <div className="mb-5">
        <p className="text-xs font-black uppercase tracking-widest text-teal-700">Create link</p>
        <h2 className="mt-2 text-3xl font-black leading-none text-slate-950">Add a new destination.</h2>
      </div>

      <div className="grid gap-4">
        <label className="grid gap-2 text-sm font-black text-slate-950">
          Link title
          <input
            className="min-h-12 rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none transition focus:border-teal-700 focus:bg-white focus:ring-4 focus:ring-teal-700/10"
            maxLength={80}
            onChange={(event) => updateField('title', event.target.value)}
            placeholder="Portfolio"
            required
            value={form.title}
          />
        </label>

        <label className="grid gap-2 text-sm font-black text-slate-950">
          URL
          <input
            className="min-h-12 rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none transition focus:border-teal-700 focus:bg-white focus:ring-4 focus:ring-teal-700/10"
            onChange={(event) => updateField('url', event.target.value)}
            placeholder="https://your-site.com"
            required
            type="url"
            value={form.url}
          />
        </label>

        <label className="grid gap-2 text-sm font-black text-slate-950">
          Short note
          <textarea
            className="min-h-24 resize-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold outline-none transition focus:border-teal-700 focus:bg-white focus:ring-4 focus:ring-teal-700/10"
            maxLength={160}
            onChange={(event) => updateField('description', event.target.value)}
            placeholder="What should people expect when they click?"
            value={form.description}
          />
        </label>
      </div>

      <button
        className="mt-5 min-h-12 w-full rounded-lg border border-[#d7f80f] bg-[#d7f80f] px-5 text-sm font-black text-[#10220f] transition hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-lime-300/25 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={saving}
        type="submit"
      >
        {saving ? 'Creating...' : 'Create link'}
      </button>
    </motion.form>
  )
}

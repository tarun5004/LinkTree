import { useState } from 'react'
import { motion } from 'framer-motion'

export function PublicProfileCard({ profile, onSave, saving }) {
  const [username, setUsername] = useState(profile?.username || '')
  const [copyLabel, setCopyLabel] = useState('Copy')

  const handleSubmit = async (event) => {
    event.preventDefault()
    await onSave({ username })
  }

  const handleCopy = async () => {
    if (!profile?.publicUrl) return

    await navigator.clipboard.writeText(profile.publicUrl)
    setCopyLabel('Copied')
    window.setTimeout(() => setCopyLabel('Copy'), 1200)
  }

  return (
    <motion.form
      className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-950/5"
      onSubmit={handleSubmit}
      whileHover={{ y: -3 }}
    >
      <div className="mb-5">
        <p className="text-xs font-black uppercase tracking-widest text-teal-700">Bio link</p>
        <h2 className="mt-2 text-3xl font-black leading-none text-slate-950">Create your public page.</h2>
        <p className="mt-2 text-sm font-bold leading-6 text-slate-500">
          Put this one link in your bio. Visitors will see your active link stack only.
        </p>
      </div>

      <label className="grid gap-2 text-sm font-black text-slate-950">
        Public username
        <div className="flex min-h-12 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 focus-within:border-teal-700 focus-within:bg-white focus-within:ring-4 focus-within:ring-teal-700/10">
          <span className="grid place-items-center border-r border-slate-200 px-3 text-xs font-black text-slate-400">
            /u/
          </span>
          <input
            className="min-w-0 flex-1 bg-transparent px-4 text-sm font-bold outline-none"
            maxLength={30}
            minLength={3}
            onChange={(event) => setUsername(event.target.value.toLowerCase())}
            pattern="[a-z0-9](?:[a-z0-9_-]*[a-z0-9])?"
            placeholder="yourname"
            required
            value={username}
          />
        </div>
      </label>

      {profile?.publicUrl ? (
        <div className="mt-4 rounded-lg bg-[#f7f7f2] p-3 text-sm font-black text-slate-950">
          {profile.publicUrl}
        </div>
      ) : null}

      <div className="mt-5 grid grid-cols-[1fr_auto_auto] gap-2 max-sm:grid-cols-1">
        <button
          className="min-h-12 rounded-lg border border-[#d7f80f] bg-[#d7f80f] px-5 text-sm font-black text-[#10220f] transition hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-lime-300/25 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={saving}
          type="submit"
        >
          {saving ? 'Saving...' : 'Save bio link'}
        </button>
        <button
          className="min-h-12 rounded-lg border border-slate-200 bg-white px-4 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!profile?.publicUrl}
          onClick={handleCopy}
          type="button"
        >
          {copyLabel}
        </button>
        <a
          className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:shadow-lg aria-disabled:pointer-events-none aria-disabled:opacity-50"
          aria-disabled={!profile?.publicUrl}
          href={profile?.publicUrl || '#'}
          rel="noreferrer"
          target="_blank"
        >
          Open
        </a>
      </div>
    </motion.form>
  )
}

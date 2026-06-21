import { motion } from 'framer-motion'
import { AuthPanel } from './AuthPanel.jsx'

const pageContent = {
  login: {
    eyebrow: 'Login',
    title: 'Welcome back to your LinkTree.',
    copy: 'Open your dashboard, update your links, and understand which content is pulling attention today.',
    stats: [
      ['15 min', 'setup time'],
      ['1 link', 'everywhere'],
      ['Live', 'click insights'],
    ],
  },
  register: {
    eyebrow: 'Register',
    title: 'Launch your public link hub.',
    copy: 'Create one polished profile for your socials, products, videos, offers, and campaigns.',
    stats: [
      ['Free', 'to start'],
      ['Google', 'quick signup'],
      ['Share', 'one public URL'],
    ],
  },
}

export function AuthShell({ mode }) {
  const content = pageContent[mode]

  return (
    <main className="overflow-hidden bg-[#f7f7f2] px-5 py-10 md:px-14 md:py-14">
      <section className="mx-auto grid min-h-[calc(100svh-160px)] max-w-5xl place-items-center gap-8">
        <motion.section
          animate={{ opacity: 1, y: 0 }}
          aria-labelledby={`${mode}-title`}
          className="text-center"
          initial={{ opacity: 0, y: 18 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <p className="text-xs font-black uppercase tracking-widest text-teal-700">{content.eyebrow}</p>
          <h1
            id={`${mode}-title`}
            className="mx-auto my-4 max-w-4xl text-4xl font-black leading-none text-slate-950 md:text-7xl"
          >
            {content.title}
          </h1>
          <p className="mx-auto max-w-2xl text-base font-bold leading-7 text-slate-500 md:text-lg">{content.copy}</p>

          <div className="mx-auto mt-6 grid max-w-2xl grid-cols-3 gap-3 max-sm:grid-cols-1">
            {content.stats.map(([value, label]) => (
              <motion.div
                className="rounded-lg border border-slate-200 bg-white p-4 shadow-lg shadow-slate-950/5"
                key={label}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <strong className="block text-2xl font-black text-slate-950">{value}</strong>
                <span className="text-xs font-black uppercase tracking-wide text-slate-400">{label}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <section className="mx-auto w-full max-w-[480px]">
          <AuthPanel mode={mode} />
        </section>
      </section>
    </main>
  )
}

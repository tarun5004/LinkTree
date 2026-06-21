import { motion } from 'framer-motion'
import { routes } from '../../../app/routes.js'
import { getGoogleAuthUrl } from '../../../shared/api/authApi.js'
import { navigate } from '../../../shared/lib/router.js'

export function AuthPanel({ mode }) {
  const isRegister = mode === 'register'
  const googleAuthUrl = getGoogleAuthUrl()

  return (
    <motion.section
      className="relative z-10 flex flex-col gap-6 rounded-[26px] border border-slate-200 bg-white p-7 text-left shadow-2xl shadow-slate-900/12 md:p-8"
      aria-label={isRegister ? 'Register' : 'Login'}
      initial={{ opacity: 0, scale: 0.98, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.42, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
    >
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-teal-700">
          {isRegister ? 'Start free' : 'Welcome back'}
        </p>
        <h2 className="my-2 text-4xl font-black leading-tight text-slate-950">
          {isRegister ? 'Create your account' : 'Login to your account'}
        </h2>
        <p className="text-slate-500">
          {isRegister
            ? 'Use Google to create your creator workspace in one step.'
            : 'Continue with Google to manage your links and analytics.'}
        </p>
      </div>

      <a
        className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-lg border border-slate-950 bg-slate-950 px-5 text-sm font-black text-white transition hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-teal-500/20"
        href={googleAuthUrl}
      >
        <span className="grid h-7 w-7 place-items-center rounded-full bg-white font-black text-blue-600 shadow-inner" aria-hidden="true">
          G
        </span>
        {isRegister ? 'Sign up with Google' : 'Continue with Google'}
      </a>

      <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-slate-500">
        {isRegister ? 'Already have an account?' : "Don't have an account?"}
        <button
          className="min-h-0 border-0 bg-transparent p-0 font-black text-teal-700 underline decoration-teal-700/20 underline-offset-4"
          type="button"
          onClick={() => navigate(isRegister ? routes.login : routes.register)}
        >
          {isRegister ? 'Login' : 'Register'}
        </button>
      </div>
    </motion.section>
  )
}

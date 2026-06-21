import { routes } from '../../../app/routes.js'
import { navigate } from '../../../shared/lib/router.js'
import { useAuth } from '../useAuth.js'

export function AuthPanel({ mode }) {
  const { startGoogleAuth } = useAuth()
  const isRegister = mode === 'register'

  return (
    <section
      className="flex flex-col gap-6 rounded-lg border border-slate-200 bg-white p-7 text-left shadow-2xl shadow-slate-900/10"
      aria-label={isRegister ? 'Register' : 'Login'}
    >
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-teal-700">
          {isRegister ? 'Start free' : 'Welcome back'}
        </p>
        <h2 className="my-2 text-3xl font-black text-slate-950">
          {isRegister ? 'Create your account' : 'Login to your account'}
        </h2>
        <p className="text-slate-500">
          {isRegister
            ? 'Use Google to create your creator workspace in one step.'
            : 'Continue with Google to manage your links and analytics.'}
        </p>
      </div>

      <button
        className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-lg border border-slate-950 bg-slate-950 px-5 text-sm font-black text-white transition hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-teal-500/20"
        type="button"
        onClick={startGoogleAuth}
      >
        <span className="grid h-6 w-6 place-items-center rounded-full bg-white font-black text-blue-600" aria-hidden="true">
          G
        </span>
        {isRegister ? 'Sign up with Google' : 'Continue with Google'}
      </button>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-xs font-black uppercase text-slate-400">
        <span className="h-px bg-slate-200" />
        <strong>or</strong>
        <span className="h-px bg-slate-200" />
      </div>

      <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
        {isRegister ? 'Already have an account?' : "Don't have an account?"}
        <button
          className="min-h-0 border-0 bg-transparent p-0 font-bold text-teal-700"
          type="button"
          onClick={() => navigate(isRegister ? routes.login : routes.register)}
        >
          {isRegister ? 'Login' : 'Register'}
        </button>
      </div>
    </section>
  )
}

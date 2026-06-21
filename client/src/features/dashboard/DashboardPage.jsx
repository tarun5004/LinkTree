import { useEffect } from 'react'
import { routes } from '../../app/routes.js'
import { StatusBox } from '../../shared/components/StatusBox.jsx'
import { navigate } from '../../shared/lib/router.js'
import { useAuth } from '../auth/useAuth.js'

export function DashboardPage() {
  const { user, loading, error, loadCurrentUser, logout } = useAuth()

  useEffect(() => {
    // Why: dashboard depends on backend session/user data. Loading it here
    // keeps protected-page logic close to the feature that needs it.
    loadCurrentUser()
  }, [loadCurrentUser])

  if (loading) {
    return <StatusBox message="Loading dashboard..." loading />
  }

  if (error || !user) {
    return (
      <StatusBox
        title="Login required"
        message={error || 'Please login before opening dashboard.'}
        actionLabel="Go to login"
        onAction={() => navigate(routes.login)}
      />
    )
  }

  return (
    <main className="min-h-[calc(100svh-73px)] bg-slate-50 px-5 py-12 md:px-20">
      <section className="flex max-w-5xl items-center justify-between gap-6 max-md:flex-col max-md:items-start">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-teal-700">Dashboard</p>
          <h1 className="my-4 text-5xl font-black leading-none text-slate-950 md:text-7xl">
            Hi, {user.name || 'Creator'}
          </h1>
          <p className="max-w-2xl text-slate-500">
            Your Google account is connected. Next features can plug in links,
            dashboard stats, and analytics here.
          </p>
        </div>
        {user.avatar ? (
          <img className="h-24 w-24 rounded-full border border-slate-200 object-cover" src={user.avatar} alt="" />
        ) : null}
      </section>

      <section className="my-8 grid grid-cols-3 gap-4 max-md:grid-cols-1" aria-label="Account summary">
        <article className="min-h-32 rounded-lg border border-slate-200 bg-white p-5">
          <span className="mb-2 block text-xs font-black uppercase text-slate-500">Email</span>
          <strong className="break-words text-slate-950">{user.email}</strong>
        </article>
        <article className="min-h-32 rounded-lg border border-slate-200 bg-white p-5">
          <span className="mb-2 block text-xs font-black uppercase text-slate-500">Username</span>
          <strong className="break-words text-slate-950">{user.username || 'Not set'}</strong>
        </article>
        <article className="min-h-32 rounded-lg border border-slate-200 bg-white p-5">
          <span className="mb-2 block text-xs font-black uppercase text-slate-500">Provider</span>
          <strong className="break-words text-slate-950">{user.provider || 'google'}</strong>
        </article>
      </section>

      <button
        className="min-h-11 rounded-lg border border-slate-950 bg-slate-950 px-5 text-sm font-black text-white"
        type="button"
        onClick={logout}
      >
        Logout
      </button>
    </main>
  )
}

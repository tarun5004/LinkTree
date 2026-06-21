import { AuthPanel } from '../components/AuthPanel.jsx'
import { AuthVisual } from '../components/AuthVisual.jsx'

export function LoginPage() {
  return (
    <main className="grid min-h-[calc(100svh-73px)] grid-cols-[minmax(0,0.85fr)_minmax(340px,420px)_minmax(280px,0.8fr)] items-center gap-8 bg-slate-50 px-5 py-12 md:px-16 max-lg:grid-cols-1">
      <section className="max-w-2xl" aria-labelledby="login-title">
        <p className="text-xs font-black uppercase tracking-widest text-teal-700">Login</p>
        <h1 id="login-title" className="my-4 text-5xl font-black leading-none text-slate-950 md:text-7xl">
          Welcome back to your LinkTree.
        </h1>
        <p className="text-slate-500">
          Open your dashboard, update links, and see which content is getting
          attention.
        </p>
      </section>

      <AuthPanel mode="login" />
      <AuthVisual />
    </main>
  )
}

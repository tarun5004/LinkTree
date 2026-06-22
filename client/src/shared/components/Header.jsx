import { routes } from '../../app/routes.js'
import { useAuth } from '../../features/auth/useAuth.js'
import { navigate } from '../lib/router.js'

const navButton =
  'min-h-11 rounded-lg border border-white/30 bg-transparent px-5 text-sm font-black text-white transition hover:border-[#d7f80f] hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-lime-300/25'

export function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-20 flex min-h-[72px] items-center justify-between gap-4 border-b border-white/10 bg-[#174b17] px-5 py-3 backdrop-blur md:px-14">
      <button
        className="border-0 bg-transparent p-0 text-2xl font-black text-white"
        type="button"
        onClick={() => navigate(routes.home)}
      >
        LinkTree
      </button>

      <nav className="flex flex-wrap items-center justify-end gap-2" aria-label="Primary navigation">
        <button className={navButton} type="button" onClick={() => navigate(routes.home)}>
          Home
        </button>
        {user ? (
          <>
            <button className={navButton} type="button" onClick={() => navigate(routes.dashboard)}>
              Dashboard
            </button>
            <button className={navButton} type="button" onClick={() => navigate(routes.analytics)}>
              Analytics
            </button>
            <button className={navButton} type="button" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className={navButton} type="button" onClick={() => navigate(routes.login)}>
              Login
            </button>
            <button
              className="min-h-11 rounded-lg border border-[#d7f80f] bg-[#d7f80f] px-5 text-sm font-black text-[#10220f] transition hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-lime-300/25"
              type="button"
              onClick={() => navigate(routes.register)}
            >
              Register
            </button>
          </>
        )}
      </nav>
    </header>
  )
}

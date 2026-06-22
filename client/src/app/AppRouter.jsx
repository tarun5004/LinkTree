import { DashboardPage } from '../features/dashboard/DashboardPage.jsx'
import { AuthCallbackPage } from '../features/auth/pages/AuthCallbackPage.jsx'
import { AnalyticsPage } from '../features/analytics/pages/AnalyticsPage.jsx'
import { LoginPage } from '../features/auth/pages/LoginPage.jsx'
import { RegisterPage } from '../features/auth/pages/RegisterPage.jsx'
import { HomePage } from '../features/home/HomePage.jsx'
import { PublicProfilePage } from '../features/publicProfile/pages/PublicProfilePage.jsx'
import { Header } from '../shared/components/Header.jsx'
import { useCurrentPath } from '../shared/lib/router.js'
import { routes } from './routes.js'

export function AppRouter() {
  const path = useCurrentPath()

  const getPage = () => {
    // Why: keeping route-to-page mapping in one place makes it obvious where
    // new feature pages should be mounted later.
    if (path === routes.login) return <LoginPage />
    if (path === routes.register) return <RegisterPage />
    if (path === routes.callback) return <AuthCallbackPage />
    if (path === routes.dashboard) return <DashboardPage />
    if (path === routes.analytics) return <AnalyticsPage />
    if (path.startsWith(`${routes.publicProfile}/`)) {
      const username = decodeURIComponent(path.replace(`${routes.publicProfile}/`, '').split('/')[0])
      return <PublicProfilePage username={username} />
    }

    return <HomePage />
  }

  return (
    <>
      <Header />
      {getPage()}
    </>
  )
}

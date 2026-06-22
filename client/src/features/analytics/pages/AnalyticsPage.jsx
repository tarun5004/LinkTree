import { useEffect, useMemo, useState } from 'react'
import { routes } from '../../../app/routes.js'
import { fetchLinkAnalytics } from '../../../shared/api/linksApi.js'
import { StatusBox } from '../../../shared/components/StatusBox.jsx'
import { navigate } from '../../../shared/lib/router.js'
import { useAuth } from '../../auth/useAuth.js'
import { AnalyticsPanel } from '../../dashboard/components/AnalyticsPanel.jsx'
import { DashboardLayout } from '../../dashboard/components/DashboardLayout.jsx'

const emptyAnalytics = {
  totalLinks: 0,
  activeLinks: 0,
  totalClicks: 0,
  topLink: null,
  topLinks: [],
  weeklyClicks: [],
}

export function AnalyticsPage() {
  const { user, loading, error, loadCurrentUser } = useAuth()
  const [analytics, setAnalytics] = useState(emptyAnalytics)
  const [pageLoading, setPageLoading] = useState(true)
  const [pageError, setPageError] = useState('')

  useEffect(() => {
    let ignore = false

    const loadAnalytics = async () => {
      setPageLoading(true)
      setPageError('')

      try {
        const currentUser = await loadCurrentUser()

        if (!currentUser || ignore) return

        const nextAnalytics = await fetchLinkAnalytics()

        if (!ignore) {
          setAnalytics(nextAnalytics)
        }
      } catch (err) {
        if (!ignore) {
          setPageError(err.message)
        }
      } finally {
        if (!ignore) {
          setPageLoading(false)
        }
      }
    }

    loadAnalytics()

    return () => {
      ignore = true
    }
  }, [loadCurrentUser])

  const heading = useMemo(() => `${user?.name?.split(' ')[0] || 'Your'} analytics`, [user])

  if (loading || pageLoading) {
    return <StatusBox message="Loading analytics..." loading />
  }

  if (error || !user) {
    return (
      <StatusBox
        title="Login required"
        message={error || 'Please login before opening analytics.'}
        actionLabel="Go to login"
        onAction={() => navigate(routes.login)}
      />
    )
  }

  return (
    <DashboardLayout
      eyebrow="Private analytics"
      heading={heading}
      subheading="Review your own click performance, top links, and 7-day activity. Visitors never see this page."
      user={user}
    >
      {pageError ? (
        <div className="mb-5 rounded-lg border border-red-100 bg-red-50 p-4 text-sm font-bold text-red-700">
          {pageError}
        </div>
      ) : null}

      <div className="grid gap-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-teal-700">Analytics dashboard</p>
            <h2 className="mt-2 text-4xl font-black leading-none text-slate-950">Your link performance</h2>
          </div>
          <button
            className="min-h-11 rounded-lg border border-slate-950 bg-slate-950 px-5 text-sm font-black text-white transition hover:-translate-y-0.5 hover:shadow-xl"
            onClick={() => navigate(routes.dashboard)}
            type="button"
          >
            Back to dashboard
          </button>
        </div>

        <AnalyticsPanel analytics={analytics} />
      </div>
    </DashboardLayout>
  )
}

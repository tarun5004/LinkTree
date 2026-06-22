import { useCallback, useEffect, useMemo, useState } from 'react'
import { routes } from '../../../app/routes.js'
import {
  createLink,
  deleteLink,
  fetchDashboardProfile,
  fetchLinkAnalytics,
  fetchLinks,
  trackLinkClick,
  updateDashboardProfile,
  updateLink,
} from '../../../shared/api/linksApi.js'
import { StatusBox } from '../../../shared/components/StatusBox.jsx'
import { navigate } from '../../../shared/lib/router.js'
import { useAuth } from '../../auth/useAuth.js'
import { AnalyticsPanel } from '../components/AnalyticsPanel.jsx'
import { DashboardLayout } from '../components/DashboardLayout.jsx'
import { LinkForm } from '../components/LinkForm.jsx'
import { LinkList } from '../components/LinkList.jsx'
import { ProfilePreview } from '../components/ProfilePreview.jsx'
import { PublicProfileCard } from '../components/PublicProfileCard.jsx'

const emptyAnalytics = {
  totalLinks: 0,
  activeLinks: 0,
  totalClicks: 0,
  topLink: null,
  topLinks: [],
  weeklyClicks: [],
}

export function DashboardPage() {
  const { user, loading, error, loadCurrentUser } = useAuth()
  const [links, setLinks] = useState([])
  const [profile, setProfile] = useState(null)
  const [analytics, setAnalytics] = useState(emptyAnalytics)
  const [dashboardLoading, setDashboardLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profileSaving, setProfileSaving] = useState(false)
  const [dashboardError, setDashboardError] = useState('')

  const refreshDashboard = useCallback(async () => {
    setDashboardError('')
    const [nextLinks, nextAnalytics, nextProfile] = await Promise.all([
      fetchLinks(),
      fetchLinkAnalytics(),
      fetchDashboardProfile(),
    ])

    setLinks(nextLinks)
    setAnalytics(nextAnalytics)
    setProfile(nextProfile)
  }, [])

  useEffect(() => {
    let ignore = false

    const loadDashboard = async () => {
      setDashboardLoading(true)

      try {
        const currentUser = await loadCurrentUser()

        if (!currentUser || ignore) return

        await refreshDashboard()
      } catch (err) {
        if (!ignore) {
          setDashboardError(err.message)
        }
      } finally {
        if (!ignore) {
          setDashboardLoading(false)
        }
      }
    }

    loadDashboard()

    return () => {
      ignore = true
    }
  }, [loadCurrentUser, refreshDashboard])

  const handleCreate = async (payload) => {
    setSaving(true)
    setDashboardError('')

    try {
      await createLink(payload)
      await refreshDashboard()
    } catch (err) {
      setDashboardError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleProfileSave = async (payload) => {
    setProfileSaving(true)
    setDashboardError('')

    try {
      const nextProfile = await updateDashboardProfile(payload)
      setProfile(nextProfile)
    } catch (err) {
      setDashboardError(err.message)
    } finally {
      setProfileSaving(false)
    }
  }

  const handleDelete = async (linkId) => {
    setDashboardError('')

    try {
      await deleteLink(linkId)
      await refreshDashboard()
    } catch (err) {
      setDashboardError(err.message)
    }
  }

  const handleToggle = async (link) => {
    setDashboardError('')

    try {
      await updateLink(link.id, { isActive: !link.isActive })
      await refreshDashboard()
    } catch (err) {
      setDashboardError(err.message)
    }
  }

  const handleOpen = async (link) => {
    setDashboardError('')

    try {
      const trackedLink = await trackLinkClick(link.id)
      window.open(trackedLink.url, '_blank', 'noopener,noreferrer')
      await refreshDashboard()
    } catch (err) {
      setDashboardError(err.message)
    }
  }

  const heading = useMemo(() => `Hi, ${user?.name?.split(' ')[0] || 'Creator'}`, [user])

  if (loading || dashboardLoading) {
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
    <DashboardLayout
      heading={heading}
      subheading="Create links, preview your public page, and see which destinations are getting clicks."
      user={user}
    >
      {dashboardError ? (
        <div className="mb-5 rounded-lg border border-red-100 bg-red-50 p-4 text-sm font-bold text-red-700">
          {dashboardError}
        </div>
      ) : null}

      <div className="grid grid-cols-[minmax(320px,0.9fr)_minmax(0,1.35fr)_minmax(300px,0.95fr)] gap-5 max-2xl:grid-cols-[minmax(300px,0.85fr)_minmax(0,1.15fr)] max-lg:grid-cols-1">
        <div className="grid content-start gap-5">
          <PublicProfileCard
            key={profile?.username || 'public-profile'}
            profile={profile}
            onSave={handleProfileSave}
            saving={profileSaving}
          />
          <LinkForm onCreate={handleCreate} saving={saving} />
          <ProfilePreview links={links} profile={profile} user={user} onOpen={handleOpen} />
        </div>

        <section className="grid content-start gap-5">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-teal-700">Links</p>
            <h2 className="mt-2 text-4xl font-black leading-none text-slate-950">Your link stack</h2>
          </div>
          <LinkList links={links} onDelete={handleDelete} onOpen={handleOpen} onToggle={handleToggle} />
        </section>

        <div className="max-2xl:col-span-2 max-lg:col-span-1">
          <AnalyticsPanel analytics={analytics} />
        </div>
      </div>
    </DashboardLayout>
  )
}

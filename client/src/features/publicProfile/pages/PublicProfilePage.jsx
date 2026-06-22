import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { fetchPublicProfile, trackLinkClick } from '../../../shared/api/linksApi.js'
import { StatusBox } from '../../../shared/components/StatusBox.jsx'

export function PublicProfilePage({ username }) {
  const [profile, setProfile] = useState(null)
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    const loadProfile = async () => {
      setLoading(true)
      setError('')

      try {
        const data = await fetchPublicProfile(username)

        if (!ignore) {
          setProfile(data.profile)
          setLinks(data.links)
        }
      } catch (err) {
        if (!ignore) setError(err.message)
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    loadProfile()

    return () => {
      ignore = true
    }
  }, [username])

  const handleOpen = async (link) => {
    try {
      const trackedLink = await trackLinkClick(link.id)
      window.open(trackedLink.url, '_blank', 'noopener,noreferrer')
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) {
    return <StatusBox message="Loading public profile..." loading />
  }

  if (error || !profile) {
    return <StatusBox title="Profile not found" message={error || 'This public link is not available.'} />
  }

  return (
    <main className="min-h-[calc(100svh-73px)] bg-[#f7f7f2] px-5 py-10 md:px-14">
      <section className="mx-auto max-w-xl rounded-[34px] bg-[#174b17] p-4 text-white shadow-2xl shadow-emerald-950/25 md:p-6">
        <div className="rounded-[28px] bg-[#d7f80f] p-6 text-[#10220f] md:p-8">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
            initial={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <div className="mx-auto grid h-24 w-24 place-items-center overflow-hidden rounded-full bg-white shadow-xl">
              {profile.avatar ? (
                <img className="h-full w-full object-cover" src={profile.avatar} alt="" />
              ) : (
                <span className="text-4xl font-black">{profile.name.charAt(0)}</span>
              )}
            </div>
            <h1 className="mt-5 text-4xl font-black leading-none">{profile.name}</h1>
            <p className="mt-2 text-sm font-black text-[#10220f]/65">@{profile.username}</p>
            <p className="mx-auto mt-3 max-w-sm text-sm font-bold leading-6 text-[#10220f]/70">
              Everything important, one link away.
            </p>
          </motion.div>

          <div className="mt-8 grid gap-3">
            {links.length ? (
              links.map((link, index) => (
                <motion.button
                  animate={{ opacity: 1, y: 0 }}
                  className="min-h-14 rounded-xl bg-white px-5 text-left font-black text-slate-950 shadow-lg shadow-[#10220f]/10 transition hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#10220f]/15"
                  initial={{ opacity: 0, y: 14 }}
                  key={link.id}
                  onClick={() => handleOpen(link)}
                  transition={{ duration: 0.32, delay: index * 0.04 }}
                  type="button"
                >
                  <span className="block">{link.title}</span>
                  {link.description ? (
                    <span className="mt-1 block text-xs font-bold text-slate-500">{link.description}</span>
                  ) : null}
                </motion.button>
              ))
            ) : (
              <div className="rounded-xl bg-white/60 p-5 text-center text-sm font-black">
                No links are live yet.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

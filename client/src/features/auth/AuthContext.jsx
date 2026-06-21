import { useCallback, useMemo, useState } from 'react'
import {
  clearAccessToken,
  fetchCurrentUser,
  getGoogleAuthUrl,
  logoutUser,
  saveAccessToken,
} from '../../shared/api/authApi.js'
import { routes } from '../../app/routes.js'
import { navigate, replaceRoute } from '../../shared/lib/router.js'
import { AuthContext } from './auth-context.js'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const startGoogleAuth = useCallback(() => {
    // Why: Google OAuth is a full-page redirect, not an AJAX request. The
    // browser must leave our app and return to the backend callback URL.
    window.location.href = getGoogleAuthUrl()
  }, [])

  const completeGoogleCallback = useCallback(async (accessToken) => {
    if (!accessToken) {
      setError('Google login failed. Please try again.')
      return
    }

    saveAccessToken(accessToken)

    // Why: after saving the token we remove it from the URL, then route the
    // user into the app. Keeping tokens in URLs makes browser history noisy.
    replaceRoute(routes.dashboard)
  }, [])

  const loadCurrentUser = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const currentUser = await fetchCurrentUser()
      setUser(currentUser)
      return currentUser
    } catch (err) {
      setUser(null)
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    setLoading(true)

    try {
      await logoutUser()
    } finally {
      // Why: client and server sessions are separate. We clear local token even
      // if the network request fails, so the UI exits the logged-in state.
      clearAccessToken()
      setUser(null)
      setLoading(false)
      navigate(routes.login)
    }
  }, [])

  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      startGoogleAuth,
      completeGoogleCallback,
      loadCurrentUser,
      logout,
    }),
    [
      user,
      loading,
      error,
      startGoogleAuth,
      completeGoogleCallback,
      loadCurrentUser,
      logout,
    ]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

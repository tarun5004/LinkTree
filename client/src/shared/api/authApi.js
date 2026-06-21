import { API_URL } from './config.js'

export const ACCESS_TOKEN_KEY = 'accessToken'

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY)

export const saveAccessToken = (token) => {
  // Why: refresh token stays in an httpOnly backend cookie. The short-lived
  // access token is kept client-side so later API middleware can use it.
  localStorage.setItem(ACCESS_TOKEN_KEY, token)
}

export const clearAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}

export const getGoogleAuthUrl = () => {
  // Why: redirectTo tells the backend which frontend origin started login.
  // This keeps local dev working even if Vite moves from 5173 to 5174.
  const redirectTo = encodeURIComponent(window.location.origin)
  return `${API_URL}/api/auth/google?redirectTo=${redirectTo}`
}

export const fetchCurrentUser = async () => {
  const response = await fetch(`${API_URL}/api/auth/me`, {
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${getAccessToken() || ''}`,
    },
  })

  const data = await response.json()

  if (!response.ok || !data.user) {
    throw new Error(data.message || 'Session not found')
  }

  return data.user
}

export const logoutUser = async () => {
  await fetch(`${API_URL}/api/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  })
}

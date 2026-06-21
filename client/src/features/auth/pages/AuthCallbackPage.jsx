import { useEffect } from 'react'
import { StatusBox } from '../../../shared/components/StatusBox.jsx'
import { useAuth } from '../useAuth.js'

export function AuthCallbackPage() {
  const { completeGoogleCallback } = useAuth()
  const params = new URLSearchParams(window.location.search)
  const accessToken = params.get('accessToken')
  const message = accessToken
    ? 'Completing Google login...'
    : 'Google login failed. Please try again.'

  useEffect(() => {
    if (accessToken) {
      completeGoogleCallback(accessToken)
    }
  }, [accessToken, completeGoogleCallback])

  return <StatusBox message={message} loading />
}

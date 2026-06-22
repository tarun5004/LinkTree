import { getAccessToken } from './authApi.js'
import { API_URL } from './config.js'

const parseResponse = async (response) => {
  const data = await response.json()

  if (!response.ok || data.success === false) {
    throw new Error(data.message || 'Request failed')
  }

  return data
}

const linkRequest = async (path, options = {}) => {
  const hasBody = Boolean(options.body)

  const response = await fetch(`${API_URL}/api/links${path}`, {
    credentials: 'include',
    ...options,
    headers: {
      ...(hasBody ? { 'Content-Type': 'application/json' } : {}),
      Authorization: `Bearer ${getAccessToken() || ''}`,
      ...options.headers,
    },
  })

  return parseResponse(response)
}

export const fetchLinks = async () => {
  const data = await linkRequest('/')
  return data.links
}

export const fetchDashboardProfile = async () => {
  const data = await linkRequest('/profile')
  return data.profile
}

export const updateDashboardProfile = async (payload) => {
  const data = await linkRequest('/profile', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })

  return data.profile
}

export const fetchPublicProfile = async (username) => {
  const data = await linkRequest(`/public/${username}`)

  return {
    profile: data.profile,
    links: data.links,
  }
}

export const createLink = async (payload) => {
  const data = await linkRequest('/', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

  return data.link
}

export const updateLink = async (linkId, payload) => {
  const data = await linkRequest(`/${linkId}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })

  return data.link
}

export const deleteLink = async (linkId) => {
  const data = await linkRequest(`/${linkId}`, {
    method: 'DELETE',
  })

  return data.link
}

export const fetchLinkAnalytics = async () => {
  const data = await linkRequest('/analytics')
  return data.analytics
}

export const trackLinkClick = async (linkId) => {
  const data = await linkRequest(`/${linkId}/click`, {
    method: 'POST',
  })

  return data.link
}

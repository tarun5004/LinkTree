import { useEffect, useState } from 'react'

export const navigate = (path) => {
  // Why: Vite SPA pages do not reload from the server, so we push a browser
  // history entry and notify React to render the matching page.
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export const replaceRoute = (path) => {
  // Why: OAuth callback URLs contain a token. replaceState removes it from the
  // address bar without adding a sensitive callback URL to browser history.
  window.history.replaceState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export function useCurrentPath() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    // Why: back/forward buttons should update our tiny custom router too.
    const updatePath = () => setPath(window.location.pathname)

    window.addEventListener('popstate', updatePath)
    return () => window.removeEventListener('popstate', updatePath)
  }, [])

  return path
}

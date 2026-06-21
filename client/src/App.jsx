import { AppRouter } from './app/AppRouter.jsx'
import { AuthProvider } from './features/auth/AuthContext.jsx'

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}

export default App

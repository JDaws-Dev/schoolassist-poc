import { Navigate, useLocation } from 'react-router-dom'

const ADMIN_KEY = 'adminLoggedIn'

export function RequireAdminAuth({ children }: { children: JSX.Element }) {
  const location = useLocation()
  const isLoggedIn = sessionStorage.getItem(ADMIN_KEY) === 'true'

  if (!isLoggedIn) {
    return <Navigate to="/admin" state={{ from: location }} replace />
  }

  return children
}

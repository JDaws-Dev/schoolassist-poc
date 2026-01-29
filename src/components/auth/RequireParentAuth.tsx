import { Navigate, useLocation } from 'react-router-dom'

const PARENT_KEY = 'parentLoggedIn'

export function RequireParentAuth({ children }: { children: JSX.Element }) {
  const location = useLocation()
  const isLoggedIn = sessionStorage.getItem(PARENT_KEY) === 'true'

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

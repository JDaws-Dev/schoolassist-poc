import AdminDashboard from '@/pages/AdminDashboard'
import AdminLogin from '@/pages/AdminLogin'

const ADMIN_KEY = 'adminLoggedIn'

export default function Admin() {
  const isLoggedIn = sessionStorage.getItem(ADMIN_KEY) === 'true'
  return isLoggedIn ? <AdminDashboard /> : <AdminLogin />
}

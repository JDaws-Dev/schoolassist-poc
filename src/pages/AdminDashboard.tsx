import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { NotificationsPanel } from '@/components/admin/NotificationsPanel'

export default function AdminDashboard() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-soft-grid px-5 py-6">
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Admin</p>
            <h1 className="text-2xl font-semibold">Artios Connect</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() => {
                sessionStorage.removeItem('adminLoggedIn')
                navigate('/admin')
              }}
            >
              Sign out
            </Button>
            <Button variant="secondary" onClick={() => navigate('/')}>
              Back to App
            </Button>
          </div>
        </header>
        <NotificationsPanel />
      </div>
    </div>
  )
}

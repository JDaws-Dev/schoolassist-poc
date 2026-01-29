import { Outlet } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'

function getTimeGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export function ParentLayout() {
  return (
    <AppShell>
      <div className="flex min-h-0 flex-1 flex-col">
        <header className="flex shrink-0 items-center gap-3 pb-4">
          <img
            src="/Artios Logo(Black).svg"
            alt="Artios Academies"
            className="h-12 w-12 rounded-xl bg-white p-1.5 shadow-sm"
          />
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold tracking-tight">
              Artios Connect
            </h1>
            <p className="text-sm text-muted-foreground">
              {getTimeGreeting()}
            </p>
          </div>
        </header>
        <Outlet />
      </div>
    </AppShell>
  )
}

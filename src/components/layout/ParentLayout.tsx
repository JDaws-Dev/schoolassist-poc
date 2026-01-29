import { Outlet } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'

export function ParentLayout() {
  return (
    <AppShell>
      <header className="flex shrink-0 items-center gap-3 pb-5">
        <img
          src="/Artios Logo(Black).svg"
          alt="Artios Academies"
          className="h-11 w-11"
        />
        <div className="flex flex-col gap-0.5">
          <h1 className="text-[1.35rem] font-semibold leading-tight tracking-tight">
            Artios Connect
          </h1>
          <p className="text-xs font-medium tracking-wide text-muted-foreground">
            Parent Hub
          </p>
        </div>
      </header>
      <Outlet />
    </AppShell>
  )
}

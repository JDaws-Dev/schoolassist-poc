import { ReactNode } from 'react'
import { BottomNav } from '@/components/layout/BottomNav'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-dvh flex-col bg-soft-grid">
      <div className="mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col px-4 pb-20 pt-6 sm:px-6">
        {children}
      </div>
      <BottomNav />
    </div>
  )
}

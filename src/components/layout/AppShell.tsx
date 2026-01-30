import { ReactNode } from 'react'
import { BottomNav } from '@/components/layout/BottomNav'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-soft-grid pb-24">
      <div className="mx-auto w-full max-w-3xl px-4 pt-6 sm:px-6">
        {children}
      </div>
      <BottomNav />
    </div>
  )
}

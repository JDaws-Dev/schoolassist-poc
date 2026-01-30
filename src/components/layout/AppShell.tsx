import { ReactNode } from 'react'
import { BottomNav } from '@/components/layout/BottomNav'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    // Use fixed viewport layout for iOS Safari compatibility
    // The outer container fills the viewport and prevents overflow
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-soft-grid">
      {/* Scrollable content area - takes remaining space above bottom nav */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden overscroll-contain">
        <div className="mx-auto w-full max-w-3xl px-4 pt-6 pb-24 sm:px-6">
          {children}
        </div>
      </div>
      {/* Bottom nav is inside fixed container, always visible */}
      <BottomNav />
    </div>
  )
}

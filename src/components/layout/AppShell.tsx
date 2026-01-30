import { ReactNode, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { BottomNav } from '@/components/layout/BottomNav'

export function AppShell({ children }: { children: ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  // Scroll to top when route changes
  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-soft-grid">
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto overflow-x-hidden overscroll-contain"
      >
        <div className="mx-auto w-full max-w-3xl px-4 pt-6 pb-24 sm:px-6">
          {children}
        </div>
      </div>
      <BottomNav />
    </div>
  )
}

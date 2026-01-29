import { useMemo } from 'react'
import { AIHeroSection } from '@/components/home/AIHeroSection'
import { QuickActions } from '@/components/home/QuickActions'
import { TodayCard } from '@/components/home/TodayCard'
import { UpcomingEvents } from '@/components/home/UpcomingEvents'
import { NotificationBanner } from '@/components/NotificationBanner'
import { useActiveNotifications } from '@/hooks/useConvex'
import { useCalendarEvents } from '@/hooks/useCalendarEvents'
import type { CalendarEvent } from '@/types'

export default function Home() {
  const notifications = useActiveNotifications()
  const { events } = useCalendarEvents()

  const upcomingEvents = useMemo<CalendarEvent[]>(() => {
    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)
    return events
      .filter((event) => event.start && event.start >= todayStart)
      .sort((a, b) => (a.start?.getTime() ?? 0) - (b.start?.getTime() ?? 0))
      .slice(0, 3)
  }, [events])

  return (
    <div className="flex flex-col gap-6">
      <NotificationBanner notifications={notifications} />
      <TodayCard />
      <AIHeroSection />
      <QuickActions />
      <UpcomingEvents events={upcomingEvents} />
    </div>
  )
}

import NotificationBanner from '../components/NotificationBanner'
import AIHeroSection from '../components/home/AIHeroSection'
import TodayCard from '../components/home/TodayCard'
import QuickActions from '../components/home/QuickActions'
import UpcomingEvents from '../components/home/UpcomingEvents'
import RecentAnnouncements from '../components/home/RecentAnnouncements'
import { useFormattedCalendar } from '../hooks/useFormattedCalendar'

export default function Home() {
  const { upcomingEvents } = useFormattedCalendar()

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-8 animate-fade-in">
      {/* Notification Banner */}
      <NotificationBanner />

      {/* Hero Section with Chat */}
      <AIHeroSection />

      {/* Main Content */}
      <div className="px-4 md:px-6 -mt-5 max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto space-y-4 md:space-y-5 relative z-10">
        {/* Today Card */}
        <TodayCard />

        {/* Quick Actions */}
        <QuickActions />

        {/* Upcoming Events */}
        <UpcomingEvents events={upcomingEvents} />

        {/* Recent Announcements */}
        <RecentAnnouncements />
      </div>
    </div>
  )
}

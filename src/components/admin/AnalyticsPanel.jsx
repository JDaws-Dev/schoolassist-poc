import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import {
  MessageSquare,
  Users,
  Bell,
  Eye,
  XCircle,
  TrendingUp,
  Clock,
  Calendar
} from 'lucide-react'

function AnalyticsPanel() {
  const chatAnalytics = useQuery(api.chatSessions.getAnalytics)
  const notificationMetrics = useQuery(api.notificationMetrics.getAggregated)
  const notifications = useQuery(api.notifications.list) ?? []
  const announcements = useQuery(api.announcements.list) ?? []

  const isLoading = !chatAnalytics || !notificationMetrics

  if (isLoading) {
    return (
      <div className="max-w-4xl">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Analytics</h1>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-200 p-5 animate-pulse"
            >
              <div className="h-4 bg-slate-200 rounded w-24 mb-3" />
              <div className="h-8 bg-slate-200 rounded w-16" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  const stats = [
    {
      label: 'Total Chat Sessions',
      value: chatAnalytics.totalSessions,
      icon: Users,
      color: 'bg-blue-100 text-blue-700',
      description: 'All-time sessions',
    },
    {
      label: 'Total Messages',
      value: chatAnalytics.totalMessages,
      icon: MessageSquare,
      color: 'bg-purple-100 text-purple-700',
      description: 'All-time messages',
    },
    {
      label: 'Avg Messages/Session',
      value: chatAnalytics.averageMessagesPerSession,
      icon: TrendingUp,
      color: 'bg-green-100 text-green-700',
      description: 'Engagement rate',
    },
    {
      label: 'Sessions (24h)',
      value: chatAnalytics.sessionsLast24Hours,
      icon: Clock,
      color: 'bg-orange-100 text-orange-700',
      description: 'Last 24 hours',
    },
    {
      label: 'Sessions (7d)',
      value: chatAnalytics.sessionsLast7Days,
      icon: Calendar,
      color: 'bg-teal-100 text-teal-700',
      description: 'Last 7 days',
    },
    {
      label: 'Messages (7d)',
      value: chatAnalytics.messagesLast7Days,
      icon: MessageSquare,
      color: 'bg-indigo-100 text-indigo-700',
      description: 'Last 7 days',
    },
  ]

  const notificationStats = [
    {
      label: 'Notification Views',
      value: notificationMetrics.totalViews,
      icon: Eye,
      color: 'bg-cyan-100 text-cyan-700',
    },
    {
      label: 'Notification Dismisses',
      value: notificationMetrics.totalDismisses,
      icon: XCircle,
      color: 'bg-slate-100 text-slate-700',
    },
  ]

  return (
    <div className="max-w-4xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Analytics</h1>
        <p className="text-slate-600">Monitor usage and engagement</p>
      </div>

      {/* Chat Analytics */}
      <div>
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Chat Sessions
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-xl ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-slate-600">
                    {stat.label}
                  </span>
                </div>
                <div className="text-3xl font-bold text-slate-800">
                  {stat.value.toLocaleString()}
                </div>
                <p className="text-xs text-slate-500 mt-1">{stat.description}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Notification Metrics */}
      <div>
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Notification Engagement
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {notificationStats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-xl ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-slate-600">
                    {stat.label}
                  </span>
                </div>
                <div className="text-3xl font-bold text-slate-800">
                  {stat.value.toLocaleString()}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Content Overview */}
      <div>
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Content Overview
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-red-100 text-red-700">
                <Bell className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-slate-600">
                Active Notifications
              </span>
            </div>
            <div className="text-3xl font-bold text-slate-800">
              {notifications.filter((n) => n.isLive).length}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              of {notifications.length} total notifications
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-indigo-100 text-indigo-700">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-slate-600">
                Total Announcements
              </span>
            </div>
            <div className="text-3xl font-bold text-slate-800">
              {announcements.length}
            </div>
            <p className="text-xs text-slate-500 mt-1">Published announcements</p>
          </div>
        </div>
      </div>

      {/* Quick Stats Summary */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
        <h2 className="text-lg font-semibold mb-4">Quick Summary</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-blue-200 text-sm">This Week</p>
            <p className="text-2xl font-bold">
              {chatAnalytics.sessionsLast7Days} sessions
            </p>
          </div>
          <div>
            <p className="text-blue-200 text-sm">Messages Sent</p>
            <p className="text-2xl font-bold">
              {chatAnalytics.messagesLast7Days} messages
            </p>
          </div>
          <div>
            <p className="text-blue-200 text-sm">Engagement</p>
            <p className="text-2xl font-bold">
              {chatAnalytics.averageMessagesPerSession} msg/session
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPanel

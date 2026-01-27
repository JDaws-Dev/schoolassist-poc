import { useState, useEffect } from 'react'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import {
  AlertCircle,
  Info,
  AlertTriangle,
  CheckCircle,
  X
} from 'lucide-react'

const typeConfig = {
  alert: {
    icon: AlertCircle,
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
    iconColor: 'text-red-600',
  },
  info: {
    icon: Info,
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-800',
    iconColor: 'text-blue-600',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-800',
    iconColor: 'text-amber-600',
  },
  success: {
    icon: CheckCircle,
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-800',
    iconColor: 'text-green-600',
  },
}

// localStorage key prefix for dismissed notifications
const DISMISSED_KEY = 'artios-dismissed-'

/**
 * Check if a notification has been dismissed
 */
function isDismissed(notificationId) {
  try {
    return localStorage.getItem(DISMISSED_KEY + notificationId) === 'true'
  } catch {
    return false
  }
}

/**
 * Mark a notification as dismissed
 */
function setDismissed(notificationId) {
  try {
    localStorage.setItem(DISMISSED_KEY + notificationId, 'true')
  } catch {
    // Ignore localStorage errors
  }
}

/**
 * Notification banner component
 * Displays active notifications from Convex with real-time updates
 */
export default function NotificationBanner() {
  const notifications = useQuery(api.notifications.getActive) ?? []
  const recordView = useMutation(api.notificationMetrics.recordView)
  const recordDismiss = useMutation(api.notificationMetrics.recordDismiss)

  // Track which notifications have been dismissed in this session
  const [sessionDismissed, setSessionDismissed] = useState(new Set())

  // Track which notifications we've already recorded views for
  const [viewedNotifications, setViewedNotifications] = useState(new Set())

  // Filter out dismissed notifications
  const visibleNotifications = notifications.filter(
    (n) => !isDismissed(n._id) && !sessionDismissed.has(n._id)
  )

  // Record views for visible notifications
  useEffect(() => {
    visibleNotifications.forEach((notification) => {
      if (!viewedNotifications.has(notification._id)) {
        recordView({ notificationId: notification._id }).catch(() => {
          // Ignore errors
        })
        setViewedNotifications((prev) => new Set([...prev, notification._id]))
      }
    })
  }, [visibleNotifications, viewedNotifications, recordView])

  const handleDismiss = async (notificationId) => {
    // Mark as dismissed in localStorage and session
    setDismissed(notificationId)
    setSessionDismissed((prev) => new Set([...prev, notificationId]))

    // Record dismiss metric
    try {
      await recordDismiss({ notificationId })
    } catch {
      // Ignore errors
    }
  }

  if (visibleNotifications.length === 0) {
    return null
  }

  return (
    <div className="space-y-3">
      {visibleNotifications.map((notification) => {
        const config = typeConfig[notification.type] || typeConfig.info
        const Icon = config.icon

        return (
          <div
            key={notification._id}
            className={`
              relative p-4 rounded-xl border
              ${config.bg} ${config.border} ${config.text}
              animate-in fade-in slide-in-from-top-2 duration-300
            `}
            role="alert"
          >
            <div className="flex items-start gap-3">
              <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${config.iconColor}`} />

              <div className="flex-1 min-w-0">
                <p className="font-medium">{notification.title}</p>
                {notification.content && (
                  <p className="mt-1 text-sm opacity-90">{notification.content}</p>
                )}
              </div>

              <button
                onClick={() => handleDismiss(notification._id)}
                className={`
                  p-1.5 rounded-lg flex-shrink-0
                  hover:bg-black/5 transition-colors
                  focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-2
                `}
                aria-label="Dismiss notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

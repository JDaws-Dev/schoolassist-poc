import { AlertTriangle, CheckCircle2, Info, Megaphone, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import type { Notification } from '@/types'
import { useNotificationMetricsMutations } from '@/hooks/useConvex'

const ICONS = {
  alert: Megaphone,
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle2,
}

const VARIANTS = {
  alert: 'border-rose-200 bg-rose-50 text-rose-900',
  info: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  warning: 'border-amber-200 bg-amber-50 text-amber-900',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-900',
}

function getDismissKey(id?: string) {
  return id ? `artios-dismissed-${id}` : null
}

function getViewKey(id?: string) {
  return id ? `artios-viewed-${id}` : null
}

export function NotificationBanner({ notifications }: { notifications: Notification[] }) {
  const [dismissed, setDismissed] = useState<string[]>([])
  const { recordView, recordDismiss } = useNotificationMetricsMutations()

  useEffect(() => {
    const stored: string[] = []
    notifications.forEach((notification) => {
      const key = getDismissKey(notification._id)
      if (key && localStorage.getItem(key)) {
        stored.push(key)
      }
    })
    setDismissed(stored)
  }, [notifications])

  useEffect(() => {
    notifications.forEach((notification) => {
      if (!notification._id) return
      const viewKey = getViewKey(notification._id)
      if (!viewKey || localStorage.getItem(viewKey)) return
      localStorage.setItem(viewKey, 'true')
      recordView({ notificationId: notification._id })
    })
  }, [notifications, recordView])

  const activeNotifications = useMemo(
    () =>
      notifications.filter((notification) => {
        const key = getDismissKey(notification._id)
        if (!key) return true
        return !dismissed.includes(key)
      }),
    [dismissed, notifications]
  )

  if (activeNotifications.length === 0) {
    return null
  }

  return (
    <div className="space-y-3">
      {activeNotifications.map((notification) => {
        const Icon = ICONS[notification.type]
        const dismissKey = getDismissKey(notification._id)
        return (
          <div
            key={notification._id ?? notification.title}
            className={cn(
              'flex items-start justify-between gap-3 rounded-2xl border px-4 py-3 text-sm shadow-sm',
              VARIANTS[notification.type]
            )}
          >
            <div className="flex items-start gap-3">
              <Icon className="mt-0.5 h-5 w-5" />
              <div>
                <p className="font-semibold">{notification.title}</p>
                {notification.content ? <p className="text-xs opacity-80">{notification.content}</p> : null}
              </div>
            </div>
            {dismissKey ? (
              <button
                type="button"
                className="rounded-full p-1 text-xs opacity-70 transition hover:opacity-100"
                onClick={() => {
                  localStorage.setItem(dismissKey, 'true')
                  setDismissed((prev) => [...prev, dismissKey])
                  if (notification._id) {
                    recordDismiss({ notificationId: notification._id })
                  }
                }}
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

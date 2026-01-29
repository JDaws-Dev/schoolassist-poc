import { useMemo, useState } from 'react'
import { Bell, Pencil, Trash2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { useNotificationMutations, useNotifications } from '@/hooks/useConvex'
import type { Notification } from '@/types'

const TYPES = ['alert', 'info', 'warning', 'success'] as const

type FormState = {
  title: string
  content: string
  type: Notification['type']
  isLive: boolean
  scheduledFor: string
  expiresAt: string
}

const emptyForm: FormState = {
  title: '',
  content: '',
  type: 'info',
  isLive: true,
  scheduledFor: '',
  expiresAt: '',
}

export function NotificationsPanel() {
  const notifications = useNotifications()
  const { create, remove, update } = useNotificationMutations()
  const [form, setForm] = useState<FormState>(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)

  const sorted = useMemo(() => [...notifications].reverse(), [notifications])

  const formatDateTimeLocal = (value?: number) => {
    if (!value) return ''
    const date = new Date(value)
    const offset = date.getTimezoneOffset()
    const local = new Date(date.getTime() - offset * 60000)
    return local.toISOString().slice(0, 16)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (editingId) {
      await update({
        id: editingId,
        title: form.title,
        content: form.content || undefined,
        type: form.type,
        isLive: form.isLive,
        scheduledFor: form.scheduledFor ? Date.parse(form.scheduledFor) : undefined,
        expiresAt: form.expiresAt ? Date.parse(form.expiresAt) : undefined,
      })
      setEditingId(null)
      setForm(emptyForm)
      return
    }

    await create({
      title: form.title,
      content: form.content || undefined,
      type: form.type,
      isLive: form.isLive,
      scheduledFor: form.scheduledFor ? Date.parse(form.scheduledFor) : undefined,
      expiresAt: form.expiresAt ? Date.parse(form.expiresAt) : undefined,
    })
    setForm(emptyForm)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Urgent Alerts
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Time-sensitive alerts shown as a banner at the top of the Home page. Parents can dismiss
          these. Use for weather closures, schedule changes, or anything needing immediate
          attention.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="notification-title">Title</Label>
              <Input
                id="notification-title"
                value={form.title}
                onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
                placeholder="Weather closure update"
              />
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={form.type} onValueChange={(value) => setForm((prev) => ({ ...prev, type: value as Notification['type'] }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notification-content">Content</Label>
            <Textarea
              id="notification-content"
              value={form.content}
              onChange={(event) => setForm((prev) => ({ ...prev, content: event.target.value }))}
              placeholder="Optional short details"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="notification-scheduled">Scheduled for</Label>
              <Input
                id="notification-scheduled"
                type="datetime-local"
                value={form.scheduledFor}
                onChange={(event) => setForm((prev) => ({ ...prev, scheduledFor: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notification-expires">Expires at</Label>
              <Input
                id="notification-expires"
                type="datetime-local"
                value={form.expiresAt}
                onChange={(event) => setForm((prev) => ({ ...prev, expiresAt: event.target.value }))}
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Switch
                checked={form.isLive}
                onCheckedChange={(checked) => setForm((prev) => ({ ...prev, isLive: checked }))}
              />
              <span className="text-sm">Live immediately</span>
            </div>
            <div className="flex items-center gap-2">
              {editingId ? (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setEditingId(null)
                    setForm(emptyForm)
                  }}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              ) : null}
              <Button type="submit">{editingId ? 'Update' : 'Create'} Alert</Button>
            </div>
          </div>
        </form>

        <div className="space-y-3">
          {sorted.length === 0 ? (
            <p className="text-sm text-muted-foreground">No alerts yet.</p>
          ) : (
            sorted.map((notification) => (
              <div
                key={notification._id}
                className="flex flex-col gap-2 rounded-2xl border border-border/60 bg-background p-4 text-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">Type: {notification.type}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        setEditingId(notification._id)
                        setForm({
                          title: notification.title,
                          content: notification.content ?? '',
                          type: notification.type,
                          isLive: notification.isLive,
                          scheduledFor: formatDateTimeLocal(notification.scheduledFor),
                          expiresAt: formatDateTimeLocal(notification.expiresAt),
                        })
                      }}
                      aria-label="Edit notification"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => remove({ id: notification._id })}
                      aria-label="Delete notification"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {notification.content ? (
                  <p className="text-xs text-muted-foreground">{notification.content}</p>
                ) : null}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Live: {notification.isLive ? 'Yes' : 'No'}</span>
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() => update({ id: notification._id, isLive: !notification.isLive })}
                  >
                    Toggle Live
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

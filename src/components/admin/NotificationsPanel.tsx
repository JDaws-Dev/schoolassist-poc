import { useMemo, useState } from 'react'
import { Bell, Pencil, Trash2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useNotificationMutations, useNotifications } from '@/hooks/useConvex'

type FormState = {
  title: string
  scheduledFor: string
  expiresAt: string
}

const emptyForm: FormState = {
  title: '',
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

  const formatDisplay = (value?: number) => {
    if (!value) return '—'
    return new Date(value).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const data = {
      title: form.title,
      type: 'alert' as const,
      isLive: true,
      scheduledFor: form.scheduledFor ? Date.parse(form.scheduledFor) : undefined,
      expiresAt: form.expiresAt ? Date.parse(form.expiresAt) : undefined,
    }

    if (editingId) {
      await update({ id: editingId, ...data })
      setEditingId(null)
    } else {
      await create(data)
    }
    setForm(emptyForm)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Alerts
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Time-sensitive alerts shown at the top of the app. Use for weather closures, schedule
          changes, or anything needing immediate attention.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="alert-title">Alert Message</Label>
            <Input
              id="alert-title"
              value={form.title}
              onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
              placeholder="School closed due to weather"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="alert-starts">Starts</Label>
              <Input
                id="alert-starts"
                type="datetime-local"
                value={form.scheduledFor}
                onChange={(event) => setForm((prev) => ({ ...prev, scheduledFor: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="alert-ends">Ends</Label>
              <Input
                id="alert-ends"
                type="datetime-local"
                value={form.expiresAt}
                onChange={(event) => setForm((prev) => ({ ...prev, expiresAt: event.target.value }))}
              />
            </div>
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
        </form>

        <div className="space-y-3">
          {sorted.length === 0 ? (
            <p className="text-sm text-muted-foreground">No alerts yet.</p>
          ) : (
            sorted.map((notification) => (
              <div
                key={notification._id}
                className="flex items-center justify-between gap-3 rounded-2xl border border-border/60 bg-background p-4 text-sm"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{notification.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDisplay(notification.scheduledFor)} → {formatDisplay(notification.expiresAt)}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                      setEditingId(notification._id)
                      setForm({
                        title: notification.title,
                        scheduledFor: formatDateTimeLocal(notification.scheduledFor),
                        expiresAt: formatDateTimeLocal(notification.expiresAt),
                      })
                    }}
                    aria-label="Edit alert"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => remove({ id: notification._id })}
                    aria-label="Delete alert"
                  >
                    <Trash2 className="h-4 w-4" />
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

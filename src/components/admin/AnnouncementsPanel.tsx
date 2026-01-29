import { useMemo, useState } from 'react'
import { Megaphone, Pencil, Trash2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useAnnouncementMutations, useAnnouncements } from '@/hooks/useConvex'
import type { Announcement } from '@/types'

const emptyForm: Announcement = {
  title: '',
  content: '',
  date: '',
  priority: 'normal',
  type: 'info',
  url: '',
}

export function AnnouncementsPanel() {
  const announcements = useAnnouncements()
  const { create, remove, update } = useAnnouncementMutations()
  const [form, setForm] = useState<Announcement>(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const sorted = useMemo(() => [...announcements].reverse(), [announcements])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (editingId) {
      await update({
        id: editingId,
        title: form.title,
        content: form.content,
        date: form.date,
        priority: form.priority ?? 'normal',
        type: form.type ?? 'info',
        url: form.url || undefined,
      })
      setEditingId(null)
      setForm(emptyForm)
      return
    }

    await create({
      title: form.title,
      content: form.content,
      date: form.date,
      priority: form.priority ?? 'normal',
      type: form.type ?? 'info',
      url: form.url || undefined,
    })
    setForm(emptyForm)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Megaphone className="h-5 w-5" />
          Announcements
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Regular news and updates shown in the "Recent Announcements" section of the Home page.
          These stay visible and cannot be dismissed. Use for newsletters, spirit week info,
          upcoming events, or general school news.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="announcement-title">Title</Label>
              <Input
                id="announcement-title"
                value={form.title}
                onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
                placeholder="Spring Spirit Week"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="announcement-date">Date</Label>
              <Input
                id="announcement-date"
                type="date"
                value={form.date}
                onChange={(event) => setForm((prev) => ({ ...prev, date: event.target.value }))}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="announcement-content">Content</Label>
            <Textarea
              id="announcement-content"
              value={form.content}
              onChange={(event) => setForm((prev) => ({ ...prev, content: event.target.value }))}
              placeholder="Share the key details parents should know"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="announcement-priority">Priority</Label>
              <Input
                id="announcement-priority"
                value={form.priority ?? ''}
                onChange={(event) => setForm((prev) => ({ ...prev, priority: event.target.value }))}
                placeholder="normal"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="announcement-type">Type</Label>
              <Input
                id="announcement-type"
                value={form.type ?? ''}
                onChange={(event) => setForm((prev) => ({ ...prev, type: event.target.value }))}
                placeholder="info"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="announcement-url">Optional URL</Label>
            <Input
              id="announcement-url"
              value={form.url ?? ''}
              onChange={(event) => setForm((prev) => ({ ...prev, url: event.target.value }))}
              placeholder="https://"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
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
            <Button type="submit">{editingId ? 'Update' : 'Publish'} Announcement</Button>
          </div>
        </form>

        <div className="space-y-3">
          {sorted.length === 0 ? (
            <p className="text-sm text-muted-foreground">No announcements yet.</p>
          ) : (
            sorted.map((announcement) => (
              <div
                key={announcement._id}
                className="rounded-2xl border border-border/60 bg-background p-4 text-sm shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{announcement.title}</p>
                    <p className="text-xs text-muted-foreground">{announcement.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        setEditingId(announcement._id)
                        setForm({
                          title: announcement.title,
                          content: announcement.content,
                          date: announcement.date,
                          priority: announcement.priority ?? 'normal',
                          type: announcement.type ?? 'info',
                          url: announcement.url ?? '',
                        })
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => remove({ id: announcement._id })}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{announcement.content}</p>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

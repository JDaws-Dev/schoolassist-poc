import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Announcement } from '@/types'

export function RecentAnnouncements({ announcements }: { announcements: Announcement[] }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Recent Announcements</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {announcements.length === 0 ? (
          <p className="text-sm text-muted-foreground">No announcements yet.</p>
        ) : (
          announcements.map((announcement) => (
            <div key={announcement._id ?? announcement.title} className="space-y-1">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold">{announcement.title}</p>
                <span className="text-xs text-muted-foreground">{announcement.date}</span>
              </div>
              <p className="text-sm text-muted-foreground">{announcement.content}</p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}

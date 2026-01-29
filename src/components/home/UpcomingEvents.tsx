import { useState } from 'react'
import type { CalendarEvent } from '@/types'
import { formatDateRange } from '@/utils/calendarUtils'
import { CalendarDays } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { EventModal } from '@/components/calendar/EventModal'

export function UpcomingEvents({ events }: { events: CalendarEvent[] }) {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {events.length === 0 ? (
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
              <CalendarDays className="h-5 w-5" />
              No upcoming events yet.
            </div>
          ) : (
            events.map((event) => (
              <button
                key={`${event.id}-${event.start?.getTime()}`}
                type="button"
                onClick={() => setSelectedEvent(event)}
                className="w-full cursor-pointer space-y-1 rounded-2xl border border-border/60 bg-muted/50 p-4 text-left transition-colors hover:border-primary/30 hover:bg-primary/5 active:bg-primary/10"
              >
                <p className="text-sm font-semibold">{event.title}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDateRange(event.start, event.end, event.allDay)}
                </p>
                {event.location ? (
                  <p className="text-xs text-muted-foreground">{event.location}</p>
                ) : null}
              </button>
            ))
          )}
        </CardContent>
      </Card>
      <EventModal
        event={selectedEvent}
        open={selectedEvent !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedEvent(null)
        }}
      />
    </>
  )
}

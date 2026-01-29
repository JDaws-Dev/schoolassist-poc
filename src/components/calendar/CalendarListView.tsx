import type { CalendarEvent } from '@/types'
import { formatDate, formatDateRange, groupEventsByDate } from '@/utils/calendarUtils'
import { Calendar } from 'lucide-react'

export function CalendarListView({
  events,
  onSelectEvent,
}: {
  events: CalendarEvent[]
  onSelectEvent: (event: CalendarEvent) => void
}) {
  const grouped = groupEventsByDate(events)
  const dates = Object.keys(grouped).sort()

  if (dates.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground">
        <Calendar className="h-5 w-5" />
        No upcoming events found.
      </div>
    )
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      {dates.map((dateKey) => {
        const dayEvents = grouped[dateKey]
        const date = new Date(dateKey)
        return (
          <div key={dateKey} className="space-y-2 sm:space-y-3">
            <p className="text-sm font-semibold">
              {formatDate(date, { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
            <div className="space-y-2">
              {dayEvents.map((event) => (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => onSelectEvent(event)}
                  className="min-h-[48px] w-full rounded-xl border border-border/60 bg-background p-3 text-left shadow-sm transition hover:border-primary/40 hover:bg-primary/5 sm:rounded-2xl sm:p-4"
                >
                  <p className="font-semibold">{event.title}</p>
                  <p className="text-xs text-muted-foreground sm:text-sm">
                    {formatDateRange(event.start, event.end, event.allDay)}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

import { useMemo, useState } from 'react'
import type { CalendarEvent } from '@/types'
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  formatDate,
  formatDateRange,
  generateCalendarGrid,
  getEventsForDate,
  getEventsForMonth,
  getShortDayNames,
  isSameDay,
  isToday,
} from '@/utils/calendarUtils'

export function CalendarMonthView({
  events,
  activeDate,
  onSelectEvent,
}: {
  events: CalendarEvent[]
  activeDate: Date
  onSelectEvent: (event: CalendarEvent) => void
}) {
  const [selectedDay, setSelectedDay] = useState<{ date: Date; events: CalendarEvent[] } | null>(null)

  const monthEvents = useMemo(
    () => getEventsForMonth(events, activeDate.getFullYear(), activeDate.getMonth()),
    [events, activeDate]
  )

  const grid = generateCalendarGrid(activeDate.getFullYear(), activeDate.getMonth())
  const dayNames = getShortDayNames()

  // Handle mobile day tap - show day events dialog
  const handleDayTap = (date: Date, dayEvents: CalendarEvent[]) => {
    if (dayEvents.length === 0) return
    if (dayEvents.length === 1) {
      // Single event - go directly to event modal
      onSelectEvent(dayEvents[0])
    } else {
      // Multiple events - show day picker
      setSelectedDay({ date, events: dayEvents })
    }
  }

  return (
    <div className="space-y-2 sm:space-y-3">
      {/* Day names header */}
      <div className="grid grid-cols-7 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-xs">
        {dayNames.map((day) => (
          <div key={day} className="py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {grid.flat().map((cell) => {
          const dayEvents = getEventsForDate(monthEvents, cell.date)
          const hasEvents = dayEvents.length > 0

          return (
            <button
              key={`${cell.date.toISOString()}-${cell.day}`}
              type="button"
              onClick={() => handleDayTap(cell.date, dayEvents)}
              disabled={!hasEvents}
              className={cn(
                // Base styles - mobile first
                'flex min-h-[48px] flex-col items-center justify-start rounded-xl border border-border/40 p-1 text-xs transition-colors sm:min-h-[84px] sm:items-start sm:rounded-2xl sm:p-2',
                // Not current month - dimmed
                !cell.isCurrentMonth && 'bg-muted/30 text-muted-foreground',
                // Current month default
                cell.isCurrentMonth && 'bg-background',
                // Today highlight
                isToday(cell.date) && 'border-primary/50 bg-primary/5',
                // Has events - interactive
                hasEvents && 'cursor-pointer hover:border-primary/60 hover:bg-primary/5',
                // No events - not interactive
                !hasEvents && 'cursor-default'
              )}
            >
              {/* Day number */}
              <span
                className={cn(
                  'inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold sm:h-6 sm:w-6',
                  isSameDay(cell.date, new Date()) && 'bg-primary text-primary-foreground'
                )}
              >
                {cell.day}
              </span>

              {/* Mobile: Event dots */}
              {hasEvents && (
                <div className="mt-1 flex flex-wrap justify-center gap-0.5 sm:hidden">
                  {dayEvents.slice(0, 3).map((event, i) => (
                    <span
                      key={event.id}
                      className={cn(
                        'h-1.5 w-1.5 rounded-full',
                        i === 0 && 'bg-primary',
                        i === 1 && 'bg-primary/70',
                        i === 2 && 'bg-primary/50'
                      )}
                    />
                  ))}
                  {dayEvents.length > 3 && (
                    <span className="text-[8px] leading-none text-muted-foreground">+{dayEvents.length - 3}</span>
                  )}
                </div>
              )}

              {/* Desktop: Event previews */}
              <div className="mt-1.5 hidden w-full space-y-1 sm:block">
                {dayEvents.slice(0, 2).map((event) => (
                  <div
                    key={event.id}
                    onClick={(e) => {
                      e.stopPropagation()
                      onSelectEvent(event)
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.stopPropagation()
                        onSelectEvent(event)
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    className="w-full truncate rounded-md bg-primary/10 px-1.5 py-0.5 text-left text-[10px] font-medium text-primary hover:bg-primary/20"
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <p className="text-[10px] text-muted-foreground">+{dayEvents.length - 2} more</p>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Mobile legend */}
      <div className="flex items-center justify-center gap-4 pt-1 text-[10px] text-muted-foreground sm:hidden">
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Event
        </span>
        <span>Tap day to view</span>
      </div>

      {/* Day events dialog (for mobile multi-event days) */}
      <Dialog open={!!selectedDay} onOpenChange={(open) => !open && setSelectedDay(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedDay && formatDate(selectedDay.date, { weekday: 'long', month: 'long', day: 'numeric' })}
            </DialogTitle>
            <DialogDescription>
              {selectedDay?.events.length} event{selectedDay?.events.length === 1 ? '' : 's'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            {selectedDay?.events.map((event) => (
              <button
                key={event.id}
                type="button"
                onClick={() => {
                  setSelectedDay(null)
                  onSelectEvent(event)
                }}
                className="w-full rounded-xl border border-border/60 bg-background p-4 text-left transition hover:border-primary/40 hover:bg-primary/5"
              >
                <p className="font-semibold">{event.title}</p>
                <p className="text-sm text-muted-foreground">
                  {formatDateRange(event.start, event.end, event.allDay)}
                </p>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, RefreshCcw } from 'lucide-react'
import { CalendarListView } from '@/components/calendar/CalendarListView'
import { CalendarMonthView } from '@/components/calendar/CalendarMonthView'
import { EventModal } from '@/components/calendar/EventModal'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useCalendarEvents } from '@/hooks/useCalendarEvents'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import type { CalendarEvent } from '@/types'
import { getMonthName, sortEventsByDate } from '@/utils/calendarUtils'

const VIEW_KEY = 'artios-calendar-view'

type CalendarView = 'month' | 'list'

export default function Calendar() {
  const [view, setView] = useLocalStorage<CalendarView>(VIEW_KEY, 'month')
  const [activeDate, setActiveDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const { events, loading, error, refresh, lastUpdated, isDemoMode } = useCalendarEvents()

  const listEvents = useMemo(() => sortEventsByDate(events), [events])

  const handlePrevMonth = () => {
    setActiveDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setActiveDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      <Card>
        <CardContent className="flex flex-col gap-3 p-4 sm:gap-4 sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground sm:text-xs sm:tracking-[0.2em]">
                Calendar
              </p>
              <h2 className="truncate text-lg font-semibold sm:text-xl">
                {getMonthName(activeDate.getMonth())} {activeDate.getFullYear()}
              </h2>
              {isDemoMode ? (
                <p className="text-[10px] text-muted-foreground sm:text-xs">
                  Using sample events (set ICS URL to connect).
                </p>
              ) : null}
            </div>
            <div className="flex flex-shrink-0 items-center gap-1 sm:gap-2">
              <Button variant="secondary" size="icon" onClick={handlePrevMonth} aria-label="Previous month">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="icon" onClick={handleNextMonth} aria-label="Next month">
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => refresh()} aria-label="Refresh calendar">
                <RefreshCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Tabs value={view} onValueChange={(value) => setView(value as CalendarView)}>
            <TabsList>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
            </TabsList>
            <TabsContent value="month">
              {loading ? (
                <p className="text-sm text-muted-foreground">Loading calendar...</p>
              ) : error ? (
                <p className="text-sm text-destructive">{error}</p>
              ) : (
                <CalendarMonthView
                  events={events}
                  activeDate={activeDate}
                  onSelectEvent={(event) => setSelectedEvent(event)}
                />
              )}
            </TabsContent>
            <TabsContent value="list">
              {loading ? (
                <p className="text-sm text-muted-foreground">Loading calendar...</p>
              ) : error ? (
                <p className="text-sm text-destructive">{error}</p>
              ) : (
                <CalendarListView events={listEvents} onSelectEvent={(event) => setSelectedEvent(event)} />
              )}
            </TabsContent>
          </Tabs>
          {lastUpdated ? (
            <p className="text-xs text-muted-foreground">
              Updated {lastUpdated.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
            </p>
          ) : null}
        </CardContent>
      </Card>
      <EventModal
        event={selectedEvent}
        open={!!selectedEvent}
        onOpenChange={(open) => {
          if (!open) setSelectedEvent(null)
        }}
      />
    </div>
  )
}

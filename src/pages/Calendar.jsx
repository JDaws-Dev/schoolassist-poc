import { useState, useCallback } from 'react'
import { Calendar as CalendarIcon, AlertCircle } from 'lucide-react'
import { useCalendarEvents } from '../hooks/useCalendarEvents'
import { useCalendarView } from '../hooks/useCalendarView'
import CalendarHeader from '../components/CalendarHeader'
import CalendarMonthView from '../components/CalendarMonthView'
import CalendarListView from '../components/CalendarListView'
import EventModal from '../components/EventModal'

/**
 * Calendar page component
 * Full calendar of school events with month and list views
 */
export default function Calendar() {
  // Calendar events data
  const { events, loading, error, refresh } = useCalendarEvents()

  // Calendar view state
  const {
    view,
    setView,
    currentYear,
    currentMonth,
    isCurrentMonth,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
  } = useCalendarView()

  // Selected event for modal
  const [selectedEvent, setSelectedEvent] = useState(null)

  // Selected date for highlighting
  const [selectedDate, setSelectedDate] = useState(null)

  // Handle date click in month view
  const handleDateClick = useCallback((date, dayEvents) => {
    setSelectedDate(date)

    // If there's exactly one event, show it directly
    if (dayEvents.length === 1) {
      setSelectedEvent(dayEvents[0])
    } else if (dayEvents.length > 1) {
      // If multiple events, switch to list view for that date
      // For now, show the first event - could enhance to show a day detail view
      setSelectedEvent(dayEvents[0])
    }
  }, [])

  // Handle event click in list view
  const handleEventClick = useCallback((event) => {
    setSelectedEvent(event)
  }, [])

  // Close modal
  const handleCloseModal = useCallback(() => {
    setSelectedEvent(null)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Page header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">School Calendar</h1>
              <p className="text-sm text-slate-500">Artios Academies Events</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Calendar controls */}
        <CalendarHeader
          year={currentYear}
          month={currentMonth}
          view={view}
          isCurrentMonth={isCurrentMonth}
          onPreviousMonth={goToPreviousMonth}
          onNextMonth={goToNextMonth}
          onToday={goToToday}
          onViewChange={setView}
          onRefresh={refresh}
          loading={loading}
        />

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-amber-800">Unable to load calendar</p>
              <p className="text-sm text-amber-700 mt-1">{error}</p>
              <p className="text-sm text-amber-600 mt-2">Showing cached or sample events.</p>
            </div>
          </div>
        )}

        {/* Loading state */}
        {loading && events.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
            <p className="mt-4 text-slate-600">Loading calendar...</p>
          </div>
        )}

        {/* Calendar view */}
        {(!loading || events.length > 0) && (
          <>
            {view === 'month' ? (
              <CalendarMonthView
                year={currentYear}
                month={currentMonth}
                events={events}
                onDateClick={handleDateClick}
                selectedDate={selectedDate}
              />
            ) : (
              <CalendarListView
                year={currentYear}
                month={currentMonth}
                events={events}
                onEventClick={handleEventClick}
              />
            )}
          </>
        )}

        {/* Legend */}
        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-600 rounded-full" />
            <span>Today</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-500 rounded-full" />
            <span>Has events</span>
          </div>
        </div>
      </main>

      {/* Event detail modal */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}

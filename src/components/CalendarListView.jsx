import { useMemo } from 'react'
import { Calendar, MapPin, Clock } from 'lucide-react'
import {
  getEventsForMonth,
  groupEventsByDate,
  formatDate,
  formatTime,
  isToday,
  getMonthName,
} from '../utils/calendarUtils'

/**
 * List/Agenda view component
 * Displays events in a chronological list grouped by date
 */
export default function CalendarListView({
  year,
  month,
  events,
  onEventClick,
}) {
  // Filter events for the current month and group by date
  const groupedEvents = useMemo(() => {
    const monthEvents = getEventsForMonth(events, year, month)
    return groupEventsByDate(monthEvents)
  }, [events, year, month])

  // Sort date keys
  const sortedDates = useMemo(() => {
    return Object.keys(groupedEvents).sort()
  }, [groupedEvents])

  // Check if there are any events
  const hasEvents = sortedDates.length > 0

  if (!hasEvents) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
          <Calendar className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-700 mb-2">
          No Events This Month
        </h3>
        <p className="text-slate-500">
          There are no scheduled events for {getMonthName(month)} {year}.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {sortedDates.map((dateKey) => {
        const dateEvents = groupedEvents[dateKey]
        const date = new Date(dateKey)
        const isTodayDate = isToday(date)

        return (
          <div key={dateKey} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Date header */}
            <div
              className={`
                px-4 py-3 border-b border-slate-100
                ${isTodayDate ? 'bg-blue-50' : 'bg-slate-50'}
              `}
            >
              <div className="flex items-center gap-3">
                {/* Day number */}
                <div
                  className={`
                    w-12 h-12 rounded-xl flex flex-col items-center justify-center
                    ${isTodayDate ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 border border-slate-200'}
                  `}
                >
                  <span className="text-xs font-medium uppercase leading-none">
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </span>
                  <span className="text-lg font-bold leading-none mt-0.5">
                    {date.getDate()}
                  </span>
                </div>

                {/* Full date */}
                <div>
                  <p className={`font-semibold ${isTodayDate ? 'text-blue-800' : 'text-slate-700'}`}>
                    {formatDate(date, { weekday: 'long', month: 'long', day: 'numeric' })}
                  </p>
                  {isTodayDate && (
                    <span className="text-sm text-blue-600 font-medium">Today</span>
                  )}
                </div>
              </div>
            </div>

            {/* Events for this date */}
            <div className="divide-y divide-slate-100">
              {dateEvents.map((event) => (
                <button
                  key={event.id}
                  onClick={() => onEventClick(event)}
                  className="w-full p-4 text-left hover:bg-slate-50 transition-colors focus:outline-none focus:bg-slate-50"
                >
                  <div className="flex gap-4">
                    {/* Time indicator */}
                    <div className="w-16 flex-shrink-0 text-right">
                      {event.allDay ? (
                        <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                          All day
                        </span>
                      ) : (
                        <span className="text-sm text-slate-500">
                          {formatTime(event.start)}
                        </span>
                      )}
                    </div>

                    {/* Event details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-800 truncate">
                        {event.title}
                      </h4>

                      {/* Location */}
                      {event.location && (
                        <div className="flex items-center gap-1.5 mt-1 text-sm text-slate-500">
                          <MapPin className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      )}

                      {/* Duration for non-all-day events */}
                      {!event.allDay && event.end && (
                        <div className="flex items-center gap-1.5 mt-1 text-sm text-slate-500">
                          <Clock className="w-4 h-4 flex-shrink-0" />
                          <span>
                            {formatTime(event.start)} - {formatTime(event.end)}
                          </span>
                        </div>
                      )}

                      {/* Description preview */}
                      {event.description && (
                        <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                          {event.description}
                        </p>
                      )}
                    </div>

                    {/* Arrow indicator */}
                    <div className="flex-shrink-0 self-center">
                      <svg
                        className="w-5 h-5 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

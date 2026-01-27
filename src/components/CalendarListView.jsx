import { useMemo } from 'react'
import { Calendar, MapPin, Clock, ChevronRight } from 'lucide-react'
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
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-12 text-center">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center shadow-inner">
          <Calendar className="w-10 h-10 text-slate-400" />
        </div>
        <h3 className="text-xl font-bold text-slate-700 mb-2">
          No Events This Month
        </h3>
        <p className="text-slate-500 max-w-sm mx-auto">
          There are no scheduled events for {getMonthName(month)} {year}.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {sortedDates.map((dateKey) => {
        const dateEvents = groupedEvents[dateKey]
        const date = new Date(dateKey)
        const isTodayDate = isToday(date)

        return (
          <div
            key={dateKey}
            className={`
              bg-white rounded-2xl shadow-lg border overflow-hidden transition-all duration-200
              ${isTodayDate ? 'border-blue-300 ring-2 ring-blue-100' : 'border-slate-200'}
            `}
          >
            {/* Date header */}
            <div
              className={`
                px-5 py-4 border-b
                ${isTodayDate
                  ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
                  : 'bg-gradient-to-r from-slate-50 to-slate-100 border-slate-200'
                }
              `}
            >
              <div className="flex items-center gap-4">
                {/* Day number */}
                <div
                  className={`
                    w-14 h-14 rounded-xl flex flex-col items-center justify-center shadow-md
                    ${isTodayDate
                      ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white ring-2 ring-blue-400/50'
                      : 'bg-white text-slate-700 border border-slate-200'
                    }
                  `}
                >
                  <span className={`text-[10px] font-bold uppercase tracking-wider leading-none ${isTodayDate ? 'text-blue-100' : 'text-slate-500'}`}>
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </span>
                  <span className="text-xl font-extrabold leading-none mt-0.5">
                    {date.getDate()}
                  </span>
                </div>

                {/* Full date */}
                <div>
                  <p className={`font-bold text-lg ${isTodayDate ? 'text-blue-900' : 'text-slate-800'}`}>
                    {formatDate(date, { weekday: 'long', month: 'long', day: 'numeric' })}
                  </p>
                  {isTodayDate && (
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full mt-0.5">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                      Today
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Events for this date */}
            <div className="divide-y divide-slate-100">
              {dateEvents.map((event, idx) => (
                <button
                  key={event.id}
                  onClick={() => onEventClick(event)}
                  className="w-full p-5 text-left hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50/30 transition-all duration-200 focus:outline-none focus:bg-blue-50 group"
                >
                  <div className="flex gap-4">
                    {/* Time indicator */}
                    <div className="w-18 flex-shrink-0 text-right pt-0.5">
                      {event.allDay ? (
                        <span className="inline-flex items-center text-xs font-bold text-blue-700 bg-blue-100 px-2.5 py-1.5 rounded-lg border border-blue-200/50">
                          All day
                        </span>
                      ) : (
                        <span className="text-sm font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">
                          {formatTime(event.start)}
                        </span>
                      )}
                    </div>

                    {/* Color bar indicator */}
                    <div className={`w-1 rounded-full flex-shrink-0 ${idx % 3 === 0 ? 'bg-blue-500' : idx % 3 === 1 ? 'bg-emerald-500' : 'bg-amber-500'}`} />

                    {/* Event details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 truncate text-base group-hover:text-blue-700 transition-colors">
                        {event.title}
                      </h4>

                      {/* Location */}
                      {event.location && (
                        <div className="flex items-center gap-2 mt-1.5 text-sm text-slate-600">
                          <MapPin className="w-4 h-4 flex-shrink-0 text-slate-400" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      )}

                      {/* Duration for non-all-day events */}
                      {!event.allDay && event.end && (
                        <div className="flex items-center gap-2 mt-1 text-sm text-slate-600">
                          <Clock className="w-4 h-4 flex-shrink-0 text-slate-400" />
                          <span>
                            {formatTime(event.start)} - {formatTime(event.end)}
                          </span>
                        </div>
                      )}

                      {/* Description preview */}
                      {event.description && (
                        <p className="mt-2 text-sm text-slate-500 line-clamp-2 leading-relaxed">
                          {event.description}
                        </p>
                      )}
                    </div>

                    {/* Arrow indicator */}
                    <div className="flex-shrink-0 self-center">
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200" />
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

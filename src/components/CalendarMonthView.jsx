import { useMemo } from 'react'
import {
  generateCalendarGrid,
  getEventsForDate,
  getShortDayNames,
  isToday,
} from '../utils/calendarUtils'

/**
 * Month view calendar grid component
 * Displays a traditional calendar grid with event dots
 */
export default function CalendarMonthView({
  year,
  month,
  events,
  onDateClick,
  selectedDate,
}) {
  // Generate calendar grid for the month
  const calendarGrid = useMemo(() => {
    return generateCalendarGrid(year, month)
  }, [year, month])

  // Day names header
  const dayNames = getShortDayNames()

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Day names header */}
      <div className="grid grid-cols-7 bg-slate-50 border-b border-slate-200">
        {dayNames.map((day, index) => (
          <div
            key={day}
            className={`
              py-3 text-center text-xs font-semibold uppercase tracking-wide
              ${index === 0 || index === 6 ? 'text-slate-400' : 'text-slate-600'}
            `}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="divide-y divide-slate-100">
        {calendarGrid.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 divide-x divide-slate-100">
            {week.map((dayData, dayIndex) => {
              const dayEvents = getEventsForDate(events, dayData.date)
              const hasEvents = dayEvents.length > 0
              const isTodayDate = isToday(dayData.date)
              const isSelected =
                selectedDate &&
                dayData.date.toDateString() === selectedDate.toDateString()
              const isWeekend = dayIndex === 0 || dayIndex === 6

              return (
                <button
                  key={dayData.date.toISOString()}
                  onClick={() => onDateClick(dayData.date, dayEvents)}
                  className={`
                    relative min-h-[80px] sm:min-h-[100px] p-2 text-left
                    transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500
                    ${dayData.isCurrentMonth ? '' : 'bg-slate-50/50'}
                    ${isTodayDate ? 'bg-blue-50' : ''}
                    ${isSelected ? 'bg-blue-100' : ''}
                    hover:bg-slate-50
                  `}
                  aria-label={`${dayData.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}${hasEvents ? `, ${dayEvents.length} event${dayEvents.length > 1 ? 's' : ''}` : ''}`}
                >
                  {/* Day number */}
                  <span
                    className={`
                      inline-flex items-center justify-center w-7 h-7 text-sm font-medium rounded-full
                      ${dayData.isCurrentMonth ? '' : 'text-slate-400'}
                      ${isWeekend && dayData.isCurrentMonth ? 'text-slate-500' : ''}
                      ${isTodayDate
                        ? 'bg-blue-600 text-white'
                        : isSelected
                          ? 'bg-blue-200 text-blue-800'
                          : ''
                      }
                    `}
                  >
                    {dayData.day}
                  </span>

                  {/* Event dots / preview */}
                  {hasEvents && (
                    <div className="mt-1 space-y-1">
                      {/* Show up to 2 event previews on larger screens */}
                      <div className="hidden sm:block space-y-1">
                        {dayEvents.slice(0, 2).map((event) => (
                          <div
                            key={event.id}
                            className="text-xs truncate px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-medium"
                            title={event.title}
                          >
                            {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-slate-500 px-1.5">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>

                      {/* Show dots on mobile */}
                      <div className="sm:hidden flex items-center gap-1 flex-wrap">
                        {dayEvents.slice(0, 3).map((event) => (
                          <span
                            key={event.id}
                            className="w-2 h-2 rounded-full bg-blue-500"
                            aria-hidden="true"
                          />
                        ))}
                        {dayEvents.length > 3 && (
                          <span className="text-xs text-slate-400">
                            +{dayEvents.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

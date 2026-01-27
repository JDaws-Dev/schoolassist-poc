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
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
      {/* Day names header */}
      <div className="grid grid-cols-7 bg-gradient-to-b from-slate-50 to-slate-100 border-b border-slate-200">
        {dayNames.map((day, index) => (
          <div
            key={day}
            className={`
              py-3 md:py-4 text-center text-xs font-bold uppercase tracking-wider
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
                    relative min-h-[72px] sm:min-h-[100px] md:min-h-[110px] p-1.5 sm:p-2 text-left
                    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500
                    ${dayData.isCurrentMonth ? 'bg-white' : 'bg-slate-50/70'}
                    ${isTodayDate ? 'bg-gradient-to-br from-blue-50 to-indigo-50 ring-2 ring-inset ring-blue-400/30' : ''}
                    ${isSelected && !isTodayDate ? 'bg-blue-50' : ''}
                    ${hasEvents && !isTodayDate && !isSelected ? 'hover:bg-blue-50/50' : 'hover:bg-slate-50'}
                  `}
                  aria-label={`${dayData.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}${hasEvents ? `, ${dayEvents.length} event${dayEvents.length > 1 ? 's' : ''}` : ''}`}
                >
                  {/* Day number */}
                  <span
                    className={`
                      inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 text-xs sm:text-sm font-bold rounded-full transition-all duration-200
                      ${dayData.isCurrentMonth ? 'text-slate-700' : 'text-slate-400'}
                      ${isWeekend && dayData.isCurrentMonth ? 'text-slate-500' : ''}
                      ${isTodayDate
                        ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 ring-2 ring-blue-400/50'
                        : isSelected
                          ? 'bg-blue-200 text-blue-900'
                          : ''
                      }
                    `}
                  >
                    {dayData.day}
                  </span>

                  {/* Event dots / preview */}
                  {hasEvents && (
                    <div className="mt-1.5 space-y-1">
                      {/* Show up to 2 event previews on larger screens */}
                      <div className="hidden sm:block space-y-0.5">
                        {dayEvents.slice(0, 2).map((event, idx) => {
                          const colors = [
                            'bg-blue-100/80 text-blue-800 border-l-blue-500',
                            'bg-emerald-100/80 text-emerald-800 border-l-emerald-500',
                          ]
                          return (
                            <div
                              key={event.id}
                              className={`
                                text-[11px] truncate px-1.5 py-0.5 rounded font-medium border-l-2
                                ${colors[idx] || colors[1]}
                              `}
                              title={event.title}
                            >
                              {event.title}
                            </div>
                          )
                        })}
                        {dayEvents.length > 2 && (
                          <div className="text-xs font-semibold text-slate-500 px-2 py-0.5">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>

                      {/* Show dots on mobile */}
                      <div className="sm:hidden flex items-center gap-1.5 flex-wrap mt-1">
                        {dayEvents.slice(0, 3).map((event, idx) => (
                          <span
                            key={event.id}
                            className={`
                              w-2.5 h-2.5 rounded-full shadow-sm
                              ${idx === 0 ? 'bg-blue-500' : idx === 1 ? 'bg-emerald-500' : 'bg-amber-500'}
                            `}
                            aria-hidden="true"
                          />
                        ))}
                        {dayEvents.length > 3 && (
                          <span className="text-xs font-bold text-slate-500">
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

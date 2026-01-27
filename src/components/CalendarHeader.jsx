import { ChevronLeft, ChevronRight, CalendarDays, List, RefreshCw } from 'lucide-react'
import { getMonthName } from '../utils/calendarUtils'

/**
 * Calendar header component
 * Contains navigation controls and view toggle
 */
export default function CalendarHeader({
  year,
  month,
  view,
  isCurrentMonth,
  onPreviousMonth,
  onNextMonth,
  onToday,
  onViewChange,
  onRefresh,
  loading,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      {/* Month/Year and Navigation */}
      <div className="flex items-center gap-2">
        {/* Previous month */}
        <button
          onClick={onPreviousMonth}
          className="p-2 rounded-xl hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </button>

        {/* Current month/year */}
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 min-w-[180px] text-center">
          {getMonthName(month)} {year}
        </h2>

        {/* Next month */}
        <button
          onClick={onNextMonth}
          className="p-2 rounded-xl hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5 text-slate-600" />
        </button>

        {/* Today button */}
        {!isCurrentMonth && (
          <button
            onClick={onToday}
            className="ml-2 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Today
          </button>
        )}
      </div>

      {/* View controls */}
      <div className="flex items-center gap-2">
        {/* Refresh button */}
        <button
          onClick={onRefresh}
          disabled={loading}
          className={`
            p-2 rounded-xl hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500
            ${loading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          aria-label="Refresh calendar"
        >
          <RefreshCw className={`w-5 h-5 text-slate-600 ${loading ? 'animate-spin' : ''}`} />
        </button>

        {/* View toggle */}
        <div className="flex bg-slate-100 rounded-xl p-1">
          <button
            onClick={() => onViewChange('month')}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${view === 'month'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-800'
              }
            `}
            aria-pressed={view === 'month'}
            aria-label="Month view"
          >
            <CalendarDays className="w-4 h-4" />
            <span className="hidden sm:inline">Month</span>
          </button>

          <button
            onClick={() => onViewChange('list')}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${view === 'list'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-800'
              }
            `}
            aria-pressed={view === 'list'}
            aria-label="List view"
          >
            <List className="w-4 h-4" />
            <span className="hidden sm:inline">List</span>
          </button>
        </div>
      </div>
    </div>
  )
}

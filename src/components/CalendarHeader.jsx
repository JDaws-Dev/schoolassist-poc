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
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      {/* Month/Year and Navigation */}
      <div className="flex items-center gap-3">
        {/* Previous month */}
        <button
          onClick={onPreviousMonth}
          className="p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5 text-slate-700" />
        </button>

        {/* Current month/year */}
        <div className="min-w-[200px] text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            {getMonthName(month)}
          </h2>
          <p className="text-sm font-medium text-slate-500 -mt-0.5">{year}</p>
        </div>

        {/* Next month */}
        <button
          onClick={onNextMonth}
          className="p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5 text-slate-700" />
        </button>

        {/* Today button */}
        {!isCurrentMonth && (
          <button
            onClick={onToday}
            className="ml-2 px-4 py-2 text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Today
          </button>
        )}
      </div>

      {/* View controls */}
      <div className="flex items-center gap-3">
        {/* Refresh button */}
        <button
          onClick={onRefresh}
          disabled={loading}
          className={`
            p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm
            ${loading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          aria-label="Refresh calendar"
        >
          <RefreshCw className={`w-5 h-5 text-slate-600 ${loading ? 'animate-spin' : ''}`} />
        </button>

        {/* View toggle */}
        <div className="flex bg-slate-100/80 rounded-xl p-1.5 border border-slate-200/50 shadow-sm">
          <button
            onClick={() => onViewChange('month')}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
              ${view === 'month'
                ? 'bg-white text-blue-700 shadow-md border border-slate-200/50'
                : 'text-slate-600 hover:text-slate-800 hover:bg-white/50'
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
              flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
              ${view === 'list'
                ? 'bg-white text-blue-700 shadow-md border border-slate-200/50'
                : 'text-slate-600 hover:text-slate-800 hover:bg-white/50'
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

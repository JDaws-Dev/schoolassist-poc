import { Calendar, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

function formatEventDate(date) {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function formatEventTime(event) {
  if (event.allDay) return 'All day'
  if (!event.start) return ''
  const d = new Date(event.start)
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

export default function UpcomingEvents({ events = [] }) {
  if (events.length === 0) return null

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-gray-900">Upcoming Events</h2>
        <Link
          to="/calendar"
          className="text-sm text-blue-600 flex items-center gap-1 py-1 px-2 -mr-2 min-h-[44px] rounded-lg hover:bg-blue-50 transition-colors"
        >
          View all <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="space-y-2">
        {events.map((event) => (
          <div
            key={event.id || event.title}
            className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-150 cursor-default"
          >
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl flex flex-col items-center justify-center">
              <span className="text-[10px] font-bold text-blue-500 uppercase leading-none">
                {new Date(event.start).toLocaleDateString('en-US', { month: 'short' })}
              </span>
              <span className="text-lg font-extrabold text-blue-700 leading-none">
                {new Date(event.start).getDate()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate text-sm">{event.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{formatEventTime(event)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

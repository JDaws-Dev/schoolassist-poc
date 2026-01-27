import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import {
  Megaphone,
  Calendar,
  ExternalLink,
  ChevronRight
} from 'lucide-react'

const priorityColors = {
  low: 'text-slate-500',
  normal: 'text-blue-600',
  high: 'text-amber-600',
  urgent: 'text-red-600',
}

/**
 * Single announcement card component
 */
function AnnouncementItem({ announcement }) {
  const priorityColor = priorityColors[announcement.priority] || priorityColors.normal

  const formattedDate = new Date(announcement.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <article className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-indigo-50 rounded-lg flex-shrink-0">
          <Megaphone className="w-5 h-5 text-indigo-600" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-slate-800 truncate">
              {announcement.title}
            </h3>
            {announcement.priority === 'urgent' && (
              <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-700 rounded-full">
                Urgent
              </span>
            )}
          </div>

          <p className="text-sm text-slate-600 line-clamp-2 mb-2">
            {announcement.content}
          </p>

          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formattedDate}
            </span>

            {announcement.type && (
              <span className="capitalize">{announcement.type}</span>
            )}
          </div>
        </div>

        {announcement.url && (
          <a
            href={announcement.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex-shrink-0"
            aria-label="View link"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        )}
      </div>
    </article>
  )
}

/**
 * Recent announcements list component
 * Displays the latest announcements from Convex with real-time updates
 */
export default function AnnouncementCard({ limit = 2, showViewAll = true, onViewAll }) {
  const announcements = useQuery(api.announcements.getRecent, { limit }) ?? []

  if (announcements.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500">
        <Megaphone className="w-10 h-10 mx-auto mb-3 text-slate-300" />
        <p>No announcements yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {announcements.map((announcement) => (
        <AnnouncementItem key={announcement._id} announcement={announcement} />
      ))}

      {showViewAll && (
        <button
          onClick={onViewAll}
          className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-colors"
        >
          View All Announcements
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

import { useEffect, useRef } from 'react'
import { X, Calendar, Clock, MapPin, ExternalLink } from 'lucide-react'
import { formatDateRange, formatDate, formatTime, generateGoogleCalendarUrl } from '../utils/calendarUtils'

/**
 * Event detail modal component
 * Displays full event information with option to add to Google Calendar
 */
export default function EventModal({ event, onClose }) {
  const modalRef = useRef(null)
  const closeButtonRef = useRef(null)

  // Focus management for accessibility
  useEffect(() => {
    // Focus the close button when modal opens
    closeButtonRef.current?.focus()

    // Store the previously focused element
    const previouslyFocused = document.activeElement

    // Restore focus when modal closes
    return () => {
      previouslyFocused?.focus?.()
    }
  }, [])

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // Handle click outside modal to close
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // Prevent body scroll when modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [])

  if (!event) return null

  const googleCalendarUrl = generateGoogleCalendarUrl(event)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-title"
    >
      <div
        ref={modalRef}
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="document"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 id="event-title" className="text-xl font-semibold pr-12 leading-tight">
            {event.title}
          </h2>

          {/* Date and time */}
          <div className="mt-3 flex items-center gap-2 text-blue-100">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">
              {formatDateRange(event.start, event.end, event.allDay)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Location */}
          {event.location && (
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-500">Location</p>
                <p className="text-slate-700">{event.location}</p>
              </div>
            </div>
          )}

          {/* Time details for non-all-day events */}
          {!event.allDay && event.start && (
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-500">Time</p>
                <p className="text-slate-700">
                  {formatTime(event.start)}
                  {event.end && ` - ${formatTime(event.end)}`}
                </p>
              </div>
            </div>
          )}

          {/* Description */}
          {event.description && (
            <div className="pt-2 border-t border-slate-100">
              <p className="text-sm font-medium text-slate-500 mb-2">Description</p>
              <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                {event.description}
              </p>
            </div>
          )}

          {/* Event URL if present */}
          {event.url && (
            <div className="pt-2 border-t border-slate-100">
              <a
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>More Information</span>
              </a>
            </div>
          )}
        </div>

        {/* Footer with actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Calendar className="w-5 h-5" />
            <span>Add to Google Calendar</span>
          </a>

          <button
            onClick={onClose}
            className="sm:w-auto px-4 py-3 text-slate-600 font-medium rounded-xl hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

import { useEffect, useRef } from 'react'
import { X, Calendar, Clock, MapPin, ExternalLink, CalendarPlus } from 'lucide-react'
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-title"
    >
      <div
        ref={modalRef}
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300"
        role="document"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white p-7">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-xl bg-white/10 hover:bg-white/25 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative">
            <h2 id="event-title" className="text-2xl font-bold pr-12 leading-tight tracking-tight">
              {event.title}
            </h2>

            {/* Date and time */}
            <div className="mt-4 inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-3 py-2 rounded-xl">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm font-medium">
                {formatDateRange(event.start, event.end, event.allDay)}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-7 space-y-5">
          {/* Location */}
          {event.location && (
            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Location</p>
                <p className="text-slate-800 font-medium">{event.location}</p>
              </div>
            </div>
          )}

          {/* Time details for non-all-day events */}
          {!event.allDay && event.start && (
            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Time</p>
                <p className="text-slate-800 font-medium">
                  {formatTime(event.start)}
                  {event.end && ` - ${formatTime(event.end)}`}
                </p>
              </div>
            </div>
          )}

          {/* Description */}
          {event.description && (
            <div className="pt-4 border-t border-slate-200">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Description</p>
              <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                {event.description}
              </p>
            </div>
          )}

          {/* Event URL if present */}
          {event.url && (
            <div className="pt-4 border-t border-slate-200">
              <a
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors group"
              >
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                <span>More Information</span>
              </a>
            </div>
          )}
        </div>

        {/* Footer with actions */}
        <div className="px-7 py-5 bg-gradient-to-b from-slate-50 to-slate-100 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2.5 px-5 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <CalendarPlus className="w-5 h-5" />
            <span>Add to Google Calendar</span>
          </a>

          <button
            onClick={onClose}
            className="sm:w-auto px-5 py-3.5 text-slate-700 font-semibold bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

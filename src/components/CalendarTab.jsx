import { useState, useEffect, useCallback } from 'react';
import { Calendar, CalendarPlus, ExternalLink, MapPin, Clock, X } from 'lucide-react';

// Google Calendar ID for constructing URLs
const CALENDAR_ID = 'c_f1e327887d2f9739ac02c84e80fe02dceec209d06b4755d72eb5358c6ce9016b@group.calendar.google.com';

/**
 * EventDetailModal Component
 * Shows full event details when an event card is clicked
 */
const EventDetailModal = ({ event, onClose }) => {
  // Handle Escape key to close modal
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  // Handle click outside modal to close
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Format date for display
  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div
      className="event-modal-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-modal-title"
    >
      <div className="event-modal">
        <button
          className="event-modal-close"
          onClick={onClose}
          aria-label="Close event details"
        >
          <X size={24} />
        </button>

        <div className="event-modal-content">
          <h2 id="event-modal-title" className="event-modal-title">{event.title}</h2>

          <div className="event-modal-details">
            <div className="event-modal-row">
              <Calendar size={18} aria-hidden="true" />
              <span>{formatDate(event.date)}</span>
            </div>

            <div className="event-modal-row">
              <Clock size={18} aria-hidden="true" />
              <span>{event.time}</span>
            </div>

            {event.location && (
              <div className="event-modal-row">
                <MapPin size={18} aria-hidden="true" />
                <span>{event.location}</span>
              </div>
            )}
          </div>

          {event.description && (
            <div className="event-modal-description">
              <h3>Details</h3>
              <p>{event.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * CalendarTab Component
 * Full school calendar view - uses embedded Google Calendar for live updates
 * Also shows upcoming events from app data
 */
const CalendarTab = ({ data }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Get upcoming events and filter to only show future events
  const today = new Date().toISOString().split('T')[0];
  const upcomingEvents = (data?.upcomingEvents || [])
    .filter(event => event.date >= today)
    .slice(0, 5); // Show max 5 upcoming events

  // Format date parts for the date block
  const getDateParts = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    return {
      dayLabel: date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
      dayNumber: date.getDate()
    };
  };

  // Check if date is today or tomorrow
  const getDateClass = (dateStr) => {
    const eventDate = new Date(dateStr + 'T00:00:00');
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    const tomorrowDate = new Date(todayDate);
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);

    if (eventDate.getTime() === todayDate.getTime()) return 'today';
    if (eventDate.getTime() === tomorrowDate.getTime()) return 'tomorrow';
    return '';
  };

  return (
    <div className="tab-content calendar-tab">
      <header className="calendar-header">
        <h1>School Calendar</h1>
        <p>View the full Artios 2025-2026 school calendar. Tap any event for details.</p>
      </header>

      {/* Upcoming Events Section */}
      {upcomingEvents.length > 0 && (
        <section className="upcoming-events-section">
          <h2>Upcoming Events</h2>
          <div className="events-list">
            {upcomingEvents.map((event) => {
              const dateParts = getDateParts(event.date);
              const dateClass = getDateClass(event.date);
              return (
                <button
                  key={event.id}
                  className={`event-card ${dateClass}`}
                  onClick={() => setSelectedEvent(event)}
                  aria-label={`View details for ${event.title}`}
                >
                  <div className="event-left">
                    <div className="event-date-block">
                      <span className="day-label">{dateParts.dayLabel}</span>
                      <span className="day-number">{dateParts.dayNumber}</span>
                    </div>
                  </div>
                  <div className="event-content">
                    <h3>{event.title}</h3>
                    <div className="event-details">
                      <span><Clock size={14} aria-hidden="true" /> {event.time}</span>
                      {event.location && (
                        <span><MapPin size={14} aria-hidden="true" /> {event.location}</span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}

      <div className="calendar-actions">
        <a
          href={`https://calendar.google.com/calendar/embed?src=${encodeURIComponent(CALENDAR_ID)}&ctz=America%2FNew_York`}
          target="_blank"
          rel="noopener noreferrer"
          className="calendar-open-btn"
          aria-label="View full calendar on Google Calendar (opens in new tab)"
        >
          <Calendar size={20} aria-hidden="true" /> View Full Calendar <ExternalLink size={14} aria-hidden="true" />
        </a>
        <a
          href={`https://calendar.google.com/calendar/render?cid=${encodeURIComponent(CALENDAR_ID)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="calendar-subscribe-btn"
          aria-label="Add school calendar to your Google Calendar (opens in new tab)"
        >
          <CalendarPlus size={20} aria-hidden="true" /> Add to My Calendar
        </a>
      </div>

      <div className="calendar-embed-wrapper full">
        <iframe
          src="https://calendar.google.com/calendar/embed?src=c_f1e327887d2f9739ac02c84e80fe02dceec209d06b4755d72eb5358c6ce9016b%40group.calendar.google.com&ctz=America%2FNew_York&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&showTz=0&mode=MONTH"
          className="calendar-iframe full"
          frameBorder="0"
          scrolling="no"
          title="Artios School Calendar"
          loading="lazy"
        />
        <div className="calendar-fallback">
          <Calendar size={48} aria-hidden="true" />
          <p>Calendar preview not available. Click the button above to view the full calendar on Google.</p>
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default CalendarTab;

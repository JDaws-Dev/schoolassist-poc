import React from 'react';
import { Calendar, CalendarPlus, ExternalLink } from 'lucide-react';
import EventCard from './EventCard';

// Google Calendar ID for constructing URLs
const CALENDAR_ID = 'c_f1e327887d2f9739ac02c84e80fe02dceec209d06b4755d72eb5358c6ce9016b@group.calendar.google.com';

/**
 * CalendarTab Component
 * Full school calendar view for the tabbed navigation redesign
 */
const CalendarTab = ({ data }) => {
  // Filter out past events and sort by date ascending
  const today = new Date().toISOString().split('T')[0];
  const upcomingEvents = (data?.upcomingEvents || [])
    .filter(event => event.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="tab-content calendar-tab">
      <header className="calendar-header">
        <h1>School Calendar</h1>
        <p>View the full Artios 2025-2026 school calendar with all events, holidays, and important dates.</p>
      </header>

      <div className="calendar-actions">
        <a
          href={`https://calendar.google.com/calendar/embed?src=${encodeURIComponent(CALENDAR_ID)}&ctz=America%2FNew_York`}
          target="_blank"
          rel="noopener noreferrer"
          className="calendar-open-btn"
        >
          <Calendar size={20} /> View Full Calendar <ExternalLink size={14} />
        </a>
        <a
          href={`https://calendar.google.com/calendar/render?cid=${encodeURIComponent(CALENDAR_ID)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="calendar-subscribe-btn"
        >
          <CalendarPlus size={20} /> Add to My Calendar
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
          <Calendar size={48} />
          <p>Calendar preview not available. Click the button above to view the full calendar on Google.</p>
        </div>
      </div>

      <section className="upcoming-events-section">
        <h2>Upcoming Events</h2>
        {upcomingEvents.length > 0 ? (
          <div className="events-list">
            {upcomingEvents.slice(0, 10).map(event => (
              <EventCard
                key={event.id}
                event={event}
                variant="default"
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Calendar size={32} className="empty-state-icon" />
            <p className="empty-state-text">No upcoming events scheduled</p>
            <p className="empty-state-hint">Check back soon or view the full calendar above</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default CalendarTab;

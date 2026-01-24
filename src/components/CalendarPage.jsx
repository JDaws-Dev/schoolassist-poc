import React from 'react';
import { ChevronRight, Calendar, MessageCircle, CalendarPlus, ExternalLink } from 'lucide-react';
import EventCard from './EventCard';
import ChatWidget from './ChatWidget';

// Google Calendar ID for constructing URLs
const CALENDAR_ID = 'c_f1e327887d2f9739ac02c84e80fe02dceec209d06b4755d72eb5358c6ce9016b@group.calendar.google.com';

/**
 * CalendarPage Component
 * Full school calendar view with embedded Google Calendar and upcoming events
 */
const CalendarPage = ({ onBack, upcomingEvents = [], chatOpen, setChatOpen, systemPrompt }) => {
  return (
    <div className="page-view">
      <header className="page-header">
        <button onClick={onBack} className="back-btn">
          <ChevronRight size={20} className="back-arrow" /> Back to Home
        </button>
        <h1>School Calendar</h1>
      </header>
      <div className="calendar-page-content">
        <p className="calendar-note">View the full Artios 2025-2026 school calendar with all events, holidays, and important dates.</p>
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

        {/* Upcoming Events List */}
        <div className="upcoming-events-section">
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
        </div>
      </div>
      <ChatWidget isOpen={chatOpen} onClose={() => setChatOpen(false)} customPrompt={systemPrompt} />
      {!chatOpen && (
        <button className="chat-toggle" onClick={() => setChatOpen(true)} aria-label="Open chat assistant">
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
};

export default CalendarPage;

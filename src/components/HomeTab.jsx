import React from 'react';
import { MessageCircle, Calendar, WifiOff, ChevronRight } from 'lucide-react';
import QuickActions from './QuickActions';

/**
 * HomeTab Component
 * Dashboard/landing page for the tabbed navigation redesign
 */
const HomeTab = ({ data, onTabChange }) => {
  const [isOffline, setIsOffline] = React.useState(!navigator.onLine);

  // Offline detection
  React.useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Get today's events from upcomingEvents
  const getTodayEvents = () => {
    if (!data?.upcomingEvents) return [];
    const today = new Date().toISOString().split('T')[0];
    return data.upcomingEvents.filter(event => event.date === today);
  };

  // Get upcoming events (next 5 starting from today, sorted ascending)
  const getUpcomingEvents = () => {
    if (!data?.upcomingEvents) return [];
    const today = new Date().toISOString().split('T')[0];
    return data.upcomingEvents
      .filter(event => event.date >= today)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 5);
  };

  const todayEvents = getTodayEvents();
  const upcomingEvents = getUpcomingEvents();

  const formatEventDate = (dateStr) => {
    const date = new Date(dateStr + 'T12:00:00');
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (dateStr === today.toISOString().split('T')[0]) {
      return 'Today';
    }
    if (dateStr === tomorrow.toISOString().split('T')[0]) {
      return 'Tomorrow';
    }

    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="tab-content home-tab">
      {/* Offline indicator */}
      {isOffline && (
        <div className="offline-banner" role="alert">
          <WifiOff size={16} />
          <span>You're offline</span>
        </div>
      )}

      {/* Header with branding */}
      <header className="home-header">
        <img
          src="/artios-logo.png"
          alt="Artios Academies"
          className="home-logo"
          onError={(e) => e.target.style.display = 'none'}
        />
        <div className="home-header-text">
          <h1>Welcome to Artios</h1>
          <p>Your parent portal for schedules, events, and resources</p>
        </div>
      </header>

      {/* Quick Actions - The Big 3 */}
      <section className="home-section">
        <QuickActions onCalendarClick={() => onTabChange?.('calendar')} />
      </section>

      {/* Today's Events */}
      {todayEvents.length > 0 && (
        <section className="home-section">
          <h2 className="section-title">Today</h2>
          <div className="events-list">
            {todayEvents.map(event => (
              <div key={event.id} className="event-item today">
                <div className="event-time">{event.time}</div>
                <div className="event-details">
                  <strong>{event.title}</strong>
                  {event.location && <span>{event.location}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <section className="home-section">
          <div className="section-header">
            <h2 className="section-title">Upcoming Events</h2>
            <button
              className="see-all-btn"
              onClick={() => onTabChange?.('calendar')}
              aria-label="View all events in calendar"
            >
              See All <ChevronRight size={16} />
            </button>
          </div>
          <div className="events-list">
            {upcomingEvents.map(event => (
              <div key={event.id} className="event-item">
                <div className="event-date">{formatEventDate(event.date)}</div>
                <div className="event-details">
                  <strong>{event.title}</strong>
                  <span>{event.time}{event.location ? ` · ${event.location}` : ''}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Ask Our Assistant CTA */}
      <section className="home-section cta-section">
        <button
          className="ask-assistant-btn"
          onClick={() => onTabChange?.('chat')}
        >
          <div className="cta-icon">
            <MessageCircle size={24} />
          </div>
          <div className="cta-text">
            <strong>Ask Our Assistant</strong>
            <span>Get answers about schedules, dress code, policies & more</span>
          </div>
          <ChevronRight size={20} className="cta-arrow" />
        </button>
      </section>
    </div>
  );
};

export default HomeTab;

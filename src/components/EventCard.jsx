import React from 'react';
import { CalendarPlus, MapPin, Clock, ChevronRight, Music, GraduationCap, TreeDeciduous, Users, Trophy, Calendar } from 'lucide-react';
import { isToday, isTomorrow, getDaysUntil, formatDate } from '../utils/dateHelpers';
import { generateICSFile } from '../utils/icsGenerator';

/**
 * EventCard Component
 * Displays an event with date, time, and quick add-to-calendar
 */

// Event categories for color coding - icons for colorblind accessibility
const EVENT_CATEGORIES = {
  performance: { label: 'Performance', color: 'purple', Icon: Music },
  academic: { label: 'Academic', color: 'blue', Icon: GraduationCap },
  holiday: { label: 'Holiday', color: 'green', Icon: TreeDeciduous },
  meeting: { label: 'Meeting', color: 'orange', Icon: Users },
  sports: { label: 'Sports', color: 'red', Icon: Trophy },
  default: { label: 'Event', color: 'gray', Icon: Calendar },
};

// Detect category from event title
const detectCategory = (title) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('performance') || lowerTitle.includes('concert') || lowerTitle.includes('play') || lowerTitle.includes('musical') || lowerTitle.includes('dance') || lowerTitle.includes('recital')) {
    return 'performance';
  }
  if (lowerTitle.includes('closed') || lowerTitle.includes('holiday') || lowerTitle.includes('break') || lowerTitle.includes('day off')) {
    return 'holiday';
  }
  if (lowerTitle.includes('meeting') || lowerTitle.includes('conference') || lowerTitle.includes('orientation')) {
    return 'meeting';
  }
  if (lowerTitle.includes('game') || lowerTitle.includes('tournament') || lowerTitle.includes('match')) {
    return 'sports';
  }
  if (lowerTitle.includes('resume') || lowerTitle.includes('semester') || lowerTitle.includes('exam') || lowerTitle.includes('preview')) {
    return 'academic';
  }
  return 'default';
};

const EventCard = ({ event, variant = 'default', onClick }) => {
  // Defensive check - return null if event is missing or invalid
  if (!event || !event.date || !event.title) {
    return null;
  }

  const eventDate = new Date(event.date);
  // Check for invalid date
  if (isNaN(eventDate.getTime())) {
    return null;
  }

  const isTodayEvent = isToday(event.date);
  const isTomorrowEvent = isTomorrow(event.date);
  const daysUntil = getDaysUntil(event.date);
  const category = detectCategory(event.title);
  const categoryInfo = EVENT_CATEGORIES[category];

  // Date label
  let dayLabel = eventDate.toLocaleDateString('en-US', { weekday: 'short' });
  if (isTodayEvent) dayLabel = 'Today';
  else if (isTomorrowEvent) dayLabel = 'Tomorrow';

  const handleAddToCalendar = (e) => {
    e.stopPropagation();
    const url = generateICSFile(event);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${event.title.replace(/\s+/g, '-')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (variant === 'compact') {
    return (
      <div
        className={`event-card-compact ${isTodayEvent ? 'today' : ''} ${isTomorrowEvent ? 'tomorrow' : ''} ${onClick ? 'clickable' : ''}`}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyPress={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
      >
        <div className={`event-date-badge ${categoryInfo.color}`}>
          <span className="date-day">{eventDate.getDate()}</span>
          <span className="date-month">{eventDate.toLocaleDateString('en-US', { month: 'short' })}</span>
        </div>
        <div className="event-info">
          <span className={`event-category-tag ${categoryInfo.color}`}>
            <categoryInfo.Icon size={12} /> {categoryInfo.label}
          </span>
          <h4>{event.title}</h4>
          <div className="event-meta">
            {event.time && event.time !== 'All Day' && (
              <span className="event-time">
                <Clock size={12} /> {event.time}
              </span>
            )}
            {event.location && (
              <span className="event-location">
                <MapPin size={12} /> {event.location}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={handleAddToCalendar}
          className="add-to-cal-btn"
          title="Add to calendar"
        >
          <CalendarPlus size={18} />
        </button>
      </div>
    );
  }

  // Default variant
  return (
    <div
      className={`event-card ${isTodayEvent ? 'today' : ''} ${isTomorrowEvent ? 'tomorrow' : ''} ${categoryInfo.color}`}
      onClick={onClick}
    >
      <div className="event-left">
        <div className="event-date-block">
          <span className="day-label">{dayLabel}</span>
          <span className="day-number">{eventDate.getDate()}</span>
        </div>
      </div>
      <div className="event-content">
        <div className="event-header">
          <span className={`category-badge ${categoryInfo.color}`}>
            <categoryInfo.Icon size={12} /> {categoryInfo.label}
          </span>
          {daysUntil >= 0 && daysUntil <= 7 && (
            <span className="days-until">
              {isTodayEvent ? 'Today!' : isTomorrowEvent ? 'Tomorrow' : `In ${daysUntil} days`}
            </span>
          )}
        </div>
        <h3>{event.title}</h3>
        <div className="event-details">
          {event.time && event.time !== 'All Day' && (
            <span><Clock size={14} /> {event.time}</span>
          )}
          {event.location && (
            <span><MapPin size={14} /> {event.location}</span>
          )}
        </div>
      </div>
      <div className="event-actions">
        <button
          onClick={handleAddToCalendar}
          className="action-btn"
          title="Add to calendar"
        >
          <CalendarPlus size={18} />
        </button>
        {onClick && (
          <ChevronRight size={18} className="chevron" />
        )}
      </div>
    </div>
  );
};

export default EventCard;
export { EVENT_CATEGORIES, detectCategory };

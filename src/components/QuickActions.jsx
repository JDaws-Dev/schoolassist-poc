import React, { useState, useEffect } from 'react';
import { Users, Clock, Calendar, ExternalLink, AlertCircle } from 'lucide-react';

/**
 * Get lunch deadline status for display
 */
const getLunchStatus = () => {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const hour = now.getHours();
  const minutes = now.getMinutes();

  // Class days: Mon (1), Tue (2), Wed (3), Thu (4), Fri (5)
  const isWeekday = day >= 1 && day <= 5;

  if (!isWeekday) {
    return { text: 'Order by 10 AM', urgent: false, passed: false };
  }

  // Before 10 AM on a weekday
  if (hour < 10) {
    const minutesUntil = (10 - hour) * 60 - minutes;
    if (minutesUntil <= 60) {
      return { text: `${minutesUntil}m left!`, urgent: true, passed: false };
    }
    return { text: `Until 10 AM`, urgent: false, passed: false };
  }

  // After 10 AM on a weekday
  return { text: 'Deadline passed', urgent: false, passed: true };
};

/**
 * QuickActions Component
 * The "Big 3" daily actions parents need most
 */
const QuickActions = ({ onCalendarClick }) => {
  const [lunchStatus, setLunchStatus] = useState(getLunchStatus);

  // Update lunch status every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setLunchStatus(getLunchStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const mainActions = [
    {
      id: 'facts',
      title: 'FACTS',
      subtitle: 'Grades & Info',
      icon: Users,
      url: 'https://accounts.renweb.com/Account/Login',
      color: 'blue',
    },
    {
      id: 'lunch',
      title: 'Lunch',
      subtitle: lunchStatus.text,
      icon: lunchStatus.urgent ? AlertCircle : Clock,
      url: 'http://artioscafe.com',
      color: lunchStatus.passed ? 'gray' : (lunchStatus.urgent ? 'orange' : 'green'),
      urgent: lunchStatus.urgent,
    },
    {
      id: 'calendar',
      title: 'Calendar',
      subtitle: 'Events',
      icon: Calendar,
      onClick: onCalendarClick,
      color: 'purple',
    },
  ];

  return (
    <div className="quick-actions">
      <div className="main-actions three-col">
        {mainActions.map(action => {
          const Icon = action.icon;

          if (action.url) {
            return (
              <a
                key={action.id}
                href={action.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`action-card ${action.color}${action.urgent ? ' urgent' : ''}`}
                aria-label={`${action.title}: ${action.subtitle} (opens in new tab)`}
              >
                {action.urgent && (
                  <span className="action-badge">Action Needed</span>
                )}
                <div className="action-icon">
                  <Icon size={28} aria-hidden="true" />
                </div>
                <div className="action-text">
                  <strong>{action.title}</strong>
                  <span>{action.subtitle}</span>
                </div>
                <ExternalLink size={14} className="external-indicator" aria-hidden="true" />
              </a>
            );
          }

          return (
            <button
              key={action.id}
              onClick={action.onClick}
              className={`action-card ${action.color}`}
              aria-label={`${action.title}: ${action.subtitle}`}
            >
              <div className="action-icon">
                <Icon size={28} aria-hidden="true" />
              </div>
              <div className="action-text">
                <strong>{action.title}</strong>
                <span>{action.subtitle}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;

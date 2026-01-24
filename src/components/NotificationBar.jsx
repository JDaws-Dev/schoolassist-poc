import React, { useState } from 'react';
import { Bell, Info, Calendar, Megaphone, X, CheckCircle } from 'lucide-react';

/**
 * NotificationBar Component
 * Displays dismissible notification banners with priority sorting
 * Supports types: urgent (non-dismissible), weather, reminder, info
 * Shows helpful empty state when no notifications
 */
const NotificationBar = ({ notifications }) => {
  const [dismissedIds, setDismissedIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('dismissedNotifications') || '[]');
    } catch { return []; }
  });

  const handleDismiss = (id, type) => {
    // Urgent notifications cannot be dismissed
    if (type === 'urgent') return;
    const newDismissed = [...dismissedIds, id];
    setDismissedIds(newDismissed);
    localStorage.setItem('dismissedNotifications', JSON.stringify(newDismissed));
  };

  // Only show notifications that are live AND not dismissed
  const activeNotifications = (notifications || []).filter(n =>
    n.isLive && (n.type === 'urgent' || !dismissedIds.includes(n.id))
  );

  // Sort by priority: urgent first, then weather, then others
  const sortedNotifications = [...activeNotifications].sort((a, b) => {
    const priority = { urgent: 0, weather: 1, reminder: 2, info: 3 };
    return (priority[a.type] || 3) - (priority[b.type] || 3);
  });

  // Icon mapping by type
  const getIcon = (type) => {
    switch (type) {
      case 'urgent': return <Bell size={20} aria-hidden="true" />;
      case 'weather': return <Info size={20} aria-hidden="true" />;
      case 'reminder': return <Calendar size={20} aria-hidden="true" />;
      default: return <Megaphone size={20} aria-hidden="true" />;
    }
  };

  return (
    <div className="notification-bar">
      <div className="notification-header">
        <Bell size={16} aria-hidden="true" />
        <span>Announcements</span>
      </div>
      {sortedNotifications.length > 0 ? (
        sortedNotifications.map(notification => (
          <div key={notification.id} className={`notification-item ${notification.type || 'info'}`}>
            {getIcon(notification.type)}
            <div className="notification-content">
              {notification.type === 'urgent' && <span className="urgent-badge">URGENT</span>}
              <strong>{notification.title}</strong>
              {notification.content && <p>{notification.content}</p>}
            </div>
            {notification.type !== 'urgent' && (
              <button
                onClick={() => handleDismiss(notification.id, notification.type)}
                className="notification-dismiss"
                aria-label={`Dismiss notification: ${notification.title}`}
              >
                <X size={18} aria-hidden="true" />
              </button>
            )}
          </div>
        ))
      ) : (
        <div className="notification-empty">
          <CheckCircle size={18} aria-hidden="true" />
          <span>You're all caught up! School announcements will appear here.</span>
        </div>
      )}
    </div>
  );
};

export default NotificationBar;

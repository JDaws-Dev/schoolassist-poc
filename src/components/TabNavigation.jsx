import React from 'react';
import { Home, MessageCircle, Calendar, MoreHorizontal } from 'lucide-react';

/**
 * TabNavigation Component
 * Mobile-first bottom tab navigation (4 tabs: Home, Chat, Calendar, More)
 */
const TabNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'chat', label: 'Ask', icon: MessageCircle },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'more', label: 'More', icon: MoreHorizontal },
  ];

  const handleTabClick = (tab) => {
    onTabChange?.(tab.id);
  };

  return (
    <nav className="mobile-bottom-nav">
      <div className="mobile-bottom-nav-items">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              className={`mobile-nav-item ${isActive ? 'active' : ''}`}
              aria-label={tab.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon size={22} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default TabNavigation;

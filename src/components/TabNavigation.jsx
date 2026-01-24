import React from 'react';
import { Home, MessageCircle, Calendar, Info } from 'lucide-react';

/**
 * TabNavigation Component
 * Mobile-first bottom tab navigation (4 tabs: Home, Chat, Calendar, Info)
 */
const TabNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'chat', label: 'Ask', icon: MessageCircle },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'more', label: 'Info', icon: Info },
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
              <Icon size={22} aria-hidden="true" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default TabNavigation;

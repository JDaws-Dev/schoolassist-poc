import React from 'react';
import { Home, MessageCircle, Calendar, Info } from 'lucide-react';

/**
 * SidebarNavigation Component
 * Desktop sidebar navigation (visible at 768px+)
 * Always visible and docked on desktop
 */
const SidebarNavigation = ({ activeTab, onTabChange }) => {
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
    <nav
      className="desktop-sidebar-nav"
      aria-label="Main navigation"
    >
      <div className="sidebar-nav-items">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
              aria-label={tab.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon size={20} aria-hidden="true" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default SidebarNavigation;

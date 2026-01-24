import React from 'react';
import { Home, MessageCircle, Calendar, MoreHorizontal } from 'lucide-react';

/**
 * SidebarNavigation Component
 * Desktop sidebar navigation (visible at 768px+)
 * Replaces bottom nav on larger screens
 */
const SidebarNavigation = ({ activeTab, onTabChange }) => {
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
    <nav className="desktop-sidebar-nav" aria-label="Main navigation">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <span className="sidebar-logo-icon" aria-hidden="true">A</span>
          <span className="sidebar-logo-text">Artios Connect</span>
        </div>
      </div>
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
      <div className="sidebar-footer">
        <p className="sidebar-footer-text">Artios Academies of Sugar Hill</p>
      </div>
    </nav>
  );
};

export default SidebarNavigation;

import React, { useEffect, useRef } from 'react';
import { Home, MessageCircle, Calendar, Info, X, Menu } from 'lucide-react';

/**
 * SidebarNavigation Component
 * Desktop sidebar navigation (visible at 768px+)
 * Collapsible with close button and click-outside-to-close
 */
const SidebarNavigation = ({ activeTab, onTabChange, isOpen, onToggle }) => {
  const sidebarRef = useRef(null);

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'chat', label: 'Ask', icon: MessageCircle },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'more', label: 'Info', icon: Info },
  ];

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        // Check if clicking the toggle button (which has its own handler)
        if (event.target.closest('.sidebar-toggle-btn')) return;
        onToggle?.(false);
      }
    };

    // Handle escape key to close
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onToggle?.(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onToggle]);

  const handleTabClick = (tab) => {
    onTabChange?.(tab.id);
  };

  return (
    <>
      {/* Toggle button (visible when sidebar is closed) */}
      {!isOpen && (
        <button
          className="sidebar-toggle-btn sidebar-open-btn"
          onClick={() => onToggle?.(true)}
          aria-label="Open navigation menu"
        >
          <Menu size={24} aria-hidden="true" />
        </button>
      )}

      {/* Sidebar overlay backdrop (for click-outside) */}
      {isOpen && <div className="sidebar-backdrop" onClick={() => onToggle?.(false)} />}

      <nav
        ref={sidebarRef}
        className={`desktop-sidebar-nav ${isOpen ? 'open' : 'closed'}`}
        aria-label="Main navigation"
        aria-hidden={!isOpen}
      >
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <img
              src="/artios-logo.png"
              alt="Artios Academies logo"
              className="sidebar-logo-image"
            />
            <span className="sidebar-logo-text">Artios Connect</span>
          </div>
          <button
            className="sidebar-close-btn"
            onClick={() => onToggle?.(false)}
            aria-label="Close navigation menu"
          >
            <X size={20} aria-hidden="true" />
          </button>
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
                tabIndex={isOpen ? 0 : -1}
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
    </>
  );
};

export default SidebarNavigation;

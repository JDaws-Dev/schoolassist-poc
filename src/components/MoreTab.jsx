import { useState, useMemo } from 'react';
import {
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  Search,
  X,
  ChevronRight,
  Users,
  Calendar,
  FileText,
  Ticket,
  ShoppingBag,
  Heart,
  Mic,
  Video,
  BookOpen
} from 'lucide-react';

/**
 * MoreTab Component
 * Resources, quick links, schedule info, and contact for Sugar Hill campus ONLY
 * Shows ONLY data from initialData.js - no fake data
 *
 * Features: Search filtering, collapsible sections, category icons
 */
const MoreTab = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedSections, setCollapsedSections] = useState({});

  const schoolInfo = data?.schoolInfo || {
    name: 'Artios Academies of Sugar Hill',
    address: '415 Brogdon Road, Suwanee, GA 30024',
    email: 'jmlane@artiosacademies.com',
    director: 'John Lane'
  };

  const quickLinks = data?.quickLinks || [];
  const schedules = data?.schedules?.overview || [];
  const timing = data?.schedules?.timing || { start: '9:00 AM', doorsOpen: '8:50 AM' };

  // Map categories to icons
  const categoryIcons = {
    Essential: Users,
    Events: Ticket,
    Newsletters: FileText,
    'Parent Partnership Meetings': Calendar,
    Volunteer: Heart,
    Shopping: ShoppingBag,
    'Artios At Home Podcast': Mic,
    Media: Video,
    Other: BookOpen
  };

  // Get icon for a category
  const getCategoryIcon = (category) => {
    return categoryIcons[category] || BookOpen;
  };

  // Filter links based on search query
  const filteredLinks = useMemo(() => {
    if (!searchQuery.trim()) return quickLinks;
    const query = searchQuery.toLowerCase();
    return quickLinks.filter(link =>
      link.title.toLowerCase().includes(query) ||
      (link.description && link.description.toLowerCase().includes(query)) ||
      (link.category && link.category.toLowerCase().includes(query))
    );
  }, [quickLinks, searchQuery]);

  // Group filtered links by category
  const groupedLinks = useMemo(() => {
    return filteredLinks.reduce((acc, link) => {
      const category = link.category || 'Other';
      if (!acc[category]) acc[category] = [];
      acc[category].push(link);
      return acc;
    }, {});
  }, [filteredLinks]);

  // Toggle section collapse
  const toggleSection = (category) => {
    setCollapsedSections(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  return (
    <div className="tab-content more-tab">
      <header className="more-header">
        <h1>Info</h1>
        <p>Resources & Contact</p>
      </header>

      <div className="more-content">
        {/* Contact Information - Always visible */}
        <section className="more-info-card">
          <div className="info-card-header">
            <Mail size={20} aria-hidden="true" />
            <h2>Contact Us</h2>
          </div>
          <div className="contact-list">
            <a href="mailto:jmlane@artiosacademies.com" className="contact-item-link">
              <div className="contact-item-info">
                <span className="contact-name">John Lane</span>
                <span className="contact-role">Director</span>
              </div>
              <span className="contact-email">jmlane@artiosacademies.com</span>
            </a>
            <a href="mailto:jthompson@artiosacademies.com" className="contact-item-link">
              <div className="contact-item-info">
                <span className="contact-name">Jackie Thompson</span>
                <span className="contact-role">Assistant Director</span>
              </div>
              <span className="contact-email">jthompson@artiosacademies.com</span>
            </a>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(schoolInfo.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-item-link address-link"
              aria-label={`${schoolInfo.address} (opens in Google Maps)`}
            >
              <MapPin size={16} aria-hidden="true" />
              <span>{schoolInfo.address}</span>
              <ExternalLink size={12} aria-hidden="true" />
            </a>
          </div>
        </section>

        {/* School Hours - Always visible */}
        <section className="more-info-card">
          <div className="info-card-header">
            <Clock size={20} aria-hidden="true" />
            <h2>School Schedule</h2>
          </div>
          <p className="hours-note">
            Classes start at {timing.start} • Doors open at {timing.doorsOpen}
          </p>
          <div className="schedule-list">
            {schedules.map((schedule) => (
              <div key={schedule.id} className="schedule-row">
                <span className="schedule-day">{schedule.day}</span>
                <span className="schedule-grades">{schedule.grades}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Links - Search, collapsible sections, icons */}
        <section className="more-links-section">
          <h2 className="links-section-title">Quick Links</h2>

          {/* Search bar */}
          <div className="links-search">
            <Search size={18} className="links-search-icon" aria-hidden="true" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search links..."
              className="links-search-input"
              aria-label="Search quick links"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="links-search-clear"
                aria-label="Clear search"
              >
                <X size={16} aria-hidden="true" />
              </button>
            )}
          </div>

          {/* No results message */}
          {Object.keys(groupedLinks).length === 0 && searchQuery && (
            <div className="links-no-results">
              <p>No links match "{searchQuery}"</p>
              <button onClick={() => setSearchQuery('')} className="links-clear-search-btn">
                Clear search
              </button>
            </div>
          )}

          {/* Collapsible category sections */}
          {Object.entries(groupedLinks).map(([category, links]) => {
            const CategoryIcon = getCategoryIcon(category);
            const isCollapsed = collapsedSections[category];

            return (
              <div key={category} className={`links-category ${isCollapsed ? 'collapsed' : ''}`}>
                <button
                  className="links-category-header"
                  onClick={() => toggleSection(category)}
                  aria-expanded={!isCollapsed}
                  aria-controls={`links-${category.replace(/\s+/g, '-')}`}
                >
                  <CategoryIcon size={16} className="links-category-icon" aria-hidden="true" />
                  <h3 className="links-category-title">{category}</h3>
                  <span className="links-category-count">{links.length}</span>
                  <ChevronRight
                    size={18}
                    className={`links-category-chevron ${isCollapsed ? '' : 'expanded'}`}
                    aria-hidden="true"
                  />
                </button>
                {!isCollapsed && (
                  <div
                    id={`links-${category.replace(/\s+/g, '-')}`}
                    className="links-grid"
                  >
                    {links.map((link) => {
                      const LinkIcon = getCategoryIcon(category);
                      return (
                        <a
                          key={link.id}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-card"
                          aria-label={`${link.title}${link.description ? `: ${link.description}` : ''} (opens in new tab)`}
                        >
                          <LinkIcon size={16} className="link-card-type-icon" aria-hidden="true" />
                          <span className="link-card-title">{link.title}</span>
                          {link.description && (
                            <span className="link-card-desc">{link.description}</span>
                          )}
                          <ExternalLink size={14} className="link-card-icon" aria-hidden="true" />
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </section>
      </div>

      <footer className="more-footer">
        <p className="app-version">Artios Connect v2.0</p>
        <p className="copyright">© 2026 Artios Academies of Sugar Hill</p>
      </footer>
    </div>
  );
};

export default MoreTab;

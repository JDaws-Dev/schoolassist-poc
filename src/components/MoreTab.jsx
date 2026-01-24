import { Mail, MapPin, Clock, ExternalLink } from 'lucide-react';

/**
 * MoreTab Component
 * Resources, quick links, schedule info, and contact for Sugar Hill campus ONLY
 * Shows ONLY data from initialData.js - no fake data
 *
 * Redesigned: No accordions - all info visible upfront
 */
const MoreTab = ({ data }) => {
  const schoolInfo = data?.schoolInfo || {
    name: 'Artios Academies of Sugar Hill',
    address: '415 Brogdon Road, Suwanee, GA 30024',
    email: 'jmlane@artiosacademies.com',
    director: 'John Lane'
  };

  const quickLinks = data?.quickLinks || [];
  const schedules = data?.schedules?.overview || [];

  // Group quick links by category
  const groupedLinks = quickLinks.reduce((acc, link) => {
    const category = link.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(link);
    return acc;
  }, {});

  return (
    <div className="tab-content more-tab">
      <header className="more-header">
        <h1>More</h1>
        <p>Resources & Information</p>
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
            <h2>School Hours</h2>
          </div>
          <p className="hours-note">Doors open at 8:50 AM (10 minutes before first class)</p>
          <div className="schedule-list">
            {schedules.map((schedule) => (
              <div key={schedule.id} className="schedule-row">
                <span className="schedule-level">{schedule.level}</span>
                <div className="schedule-times">
                  <span className="schedule-days">{schedule.days}</span>
                  <span className="schedule-hours">{schedule.hours}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Links - As tiles/cards by category */}
        <section className="more-links-section">
          <h2 className="links-section-title">Quick Links</h2>
          {Object.entries(groupedLinks).map(([category, links]) => (
            <div key={category} className="links-category">
              <h3 className="links-category-title">{category}</h3>
              <div className="links-grid">
                {links.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-card"
                    aria-label={`${link.title}${link.description ? `: ${link.description}` : ''} (opens in new tab)`}
                  >
                    <span className="link-card-title">{link.title}</span>
                    {link.description && (
                      <span className="link-card-desc">{link.description}</span>
                    )}
                    <ExternalLink size={14} className="link-card-icon" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          ))}
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

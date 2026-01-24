import React from 'react';
import { Phone, Mail, MapPin, HelpCircle, FileText, ExternalLink, ChevronRight, Info, BookOpen } from 'lucide-react';

/**
 * MoreTab Component
 * Secondary menu with contact info, resources, and help links for the tabbed navigation redesign
 */
const MoreTab = () => {
  const contactInfo = {
    phone: '(615) 555-0123',
    email: 'info@artiosacademies.com',
    address: '123 Academy Way, Nashville, TN 37201'
  };

  const menuItems = [
    {
      id: 'contact',
      icon: Phone,
      title: 'Contact Us',
      description: 'Phone, email, and office hours',
      action: 'section'
    },
    {
      id: 'handbook',
      icon: BookOpen,
      title: 'Parent Handbook',
      description: 'Policies, procedures, and guidelines',
      href: '/handbook'
    },
    {
      id: 'resources',
      icon: FileText,
      title: 'Resources',
      description: 'Forms, documents, and downloads',
      href: '/resources'
    },
    {
      id: 'faq',
      icon: HelpCircle,
      title: 'FAQ',
      description: 'Frequently asked questions',
      href: '/faq'
    },
    {
      id: 'about',
      icon: Info,
      title: 'About Artios',
      description: 'Our mission and values',
      href: '/about'
    }
  ];

  const [expandedSection, setExpandedSection] = React.useState(null);

  const handleItemClick = (item) => {
    if (item.action === 'section') {
      setExpandedSection(expandedSection === item.id ? null : item.id);
    } else if (item.href) {
      // For now, these could be internal routes or external links
      // This will be connected to routing when App.jsx is updated
      console.log('Navigate to:', item.href);
    }
  };

  return (
    <div className="tab-content more-tab">
      <header className="more-header">
        <h1>More</h1>
        <p>Contact info, resources, and help</p>
      </header>

      <div className="more-menu">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isExpanded = expandedSection === item.id;

          return (
            <div key={item.id} className="more-menu-item-wrapper">
              <button
                className={`more-menu-item ${isExpanded ? 'expanded' : ''}`}
                onClick={() => handleItemClick(item)}
                aria-expanded={item.action === 'section' ? isExpanded : undefined}
              >
                <div className="menu-item-icon">
                  <Icon size={22} />
                </div>
                <div className="menu-item-content">
                  <span className="menu-item-title">{item.title}</span>
                  <span className="menu-item-description">{item.description}</span>
                </div>
                <div className="menu-item-arrow">
                  {item.href ? (
                    <ChevronRight size={18} />
                  ) : (
                    <ChevronRight size={18} className={isExpanded ? 'rotated' : ''} />
                  )}
                </div>
              </button>

              {/* Expandable Contact Section */}
              {item.id === 'contact' && isExpanded && (
                <div className="contact-details">
                  <a href={`tel:${contactInfo.phone.replace(/\D/g, '')}`} className="contact-row">
                    <Phone size={18} />
                    <span>{contactInfo.phone}</span>
                  </a>
                  <a href={`mailto:${contactInfo.email}`} className="contact-row">
                    <Mail size={18} />
                    <span>{contactInfo.email}</span>
                  </a>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(contactInfo.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-row"
                  >
                    <MapPin size={18} />
                    <span>{contactInfo.address}</span>
                    <ExternalLink size={14} className="external-icon" />
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <footer className="more-footer">
        <p className="app-version">SchoolAssist v1.0</p>
        <p className="copyright">© 2025 Artios Academies</p>
      </footer>
    </div>
  );
};

export default MoreTab;

import React, { useState } from 'react';
import {
  Calendar,
  Shirt,
  BookOpen,
  HelpCircle,
  Clock,
  FileText,
  ChevronRight,
  ExternalLink,
  Headphones,
  Sparkles
} from 'lucide-react';
import SlideUpPanel from './SlideUpPanel';

/**
 * ResourceDock Component
 * An "Essentials Library" that opens content in slide-up panels
 * instead of navigating away from the dashboard
 */
const ResourceDock = ({ faqItems = [], onOpenChat, onNavigate }) => {
  const [activePanel, setActivePanel] = useState(null);
  const [openFaqId, setOpenFaqId] = useState(null);

  const resources = [
    { id: 'dates', label: 'Dates', icon: Calendar },
    { id: 'uniforms', label: 'Uniforms', icon: Shirt },
    { id: 'handbook', label: 'Handbook', icon: BookOpen },
    { id: 'faq', label: 'FAQs', icon: HelpCircle },
    { id: 'schedule', label: 'Schedule', icon: Clock },
    { id: 'forms', label: 'Forms', icon: FileText },
    { id: 'podcast', label: 'Podcast', icon: Headphones },
    { id: 'welcome', label: 'New Here?', icon: Sparkles, isNav: true },
  ];

  const closePanel = () => setActivePanel(null);

  // Panel content components
  const renderPanelContent = () => {
    switch (activePanel) {
      case 'dates':
        return <DatesContent />;
      case 'uniforms':
        return <UniformsContent />;
      case 'handbook':
        return <HandbookContent />;
      case 'faq':
        return <FaqContent items={faqItems} openId={openFaqId} setOpenId={setOpenFaqId} />;
      case 'schedule':
        return <ScheduleContent />;
      case 'forms':
        return <FormsContent />;
      case 'podcast':
        return <PodcastContent />;
      default:
        return null;
    }
  };

  const getPanelTitle = () => {
    const titles = {
      dates: 'Important Dates',
      uniforms: 'Dress Code',
      handbook: 'Parent Handbook',
      faq: 'Frequently Asked Questions',
      schedule: 'Class Schedule',
      forms: 'Forms & Documents',
      podcast: 'Artios At Home Podcast',
    };
    return titles[activePanel] || '';
  };

  return (
    <>
      <section className="resource-dock">
        <h3 className="resource-dock-header">Essentials Library</h3>
        <div className="resource-dock-grid">
          {resources.map((resource) => {
            const Icon = resource.icon;
            return (
              <button
                key={resource.id}
                className="resource-icon-btn"
                onClick={() => resource.isNav ? onNavigate?.(resource.id) : setActivePanel(resource.id)}
                aria-label={`Open ${resource.label}`}
              >
                <div className="icon-circle">
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <span>{resource.label}</span>
              </button>
            );
          })}
          {/* AI Help button */}
          <button
            className="resource-icon-btn"
            onClick={onOpenChat}
            aria-label="Ask AI for help"
          >
            <div className="icon-circle" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
              <HelpCircle size={22} strokeWidth={1.5} />
            </div>
            <span>Ask AI</span>
          </button>
        </div>
      </section>

      <SlideUpPanel
        isOpen={!!activePanel}
        onClose={closePanel}
        title={getPanelTitle()}
      >
        {renderPanelContent()}
      </SlideUpPanel>
    </>
  );
};

// --- Panel Content Components ---

const DatesContent = () => (
  <div>
    <div className="panel-info-box">
      <strong>Next Break:</strong> Spring Break starts April 4th, 2026
    </div>
    <div className="panel-section">
      <h3>Upcoming</h3>
      <div className="panel-link-list">
        <a href="https://calendar.google.com/calendar/embed?src=c_f1e327887d2f9739ac02c84e80fe02dceec209d06b4755d72eb5358c6ce9016b%40group.calendar.google.com" target="_blank" rel="noopener noreferrer" className="panel-link-item">
          View Full Calendar <ExternalLink size={16} />
        </a>
      </div>
    </div>
    <div className="panel-section">
      <h3>Key Dates This Semester</h3>
      <div className="panel-link-list">
        <div className="panel-link-item">
          <span>Jan 15 - Dance Performance</span>
        </div>
        <div className="panel-link-item">
          <span>Jan 20 - MLK Day (Closed)</span>
        </div>
        <div className="panel-link-item">
          <span>Feb 14 - Valentine Party</span>
        </div>
        <div className="panel-link-item">
          <span>Mar 7 - Spring Musical</span>
        </div>
      </div>
    </div>
  </div>
);

const UniformsContent = () => (
  <div>
    <div className="panel-section">
      <h3>Daily Dress Code</h3>
      <div className="panel-link-list">
        <div className="panel-link-item">Artios t-shirt required daily</div>
        <div className="panel-link-item">Twill or denim pants/shorts</div>
        <div className="panel-link-item">Shorts within 3" of knee</div>
        <div className="panel-link-item">No holes, rips, or tears</div>
        <div className="panel-link-item">No hats indoors</div>
      </div>
    </div>
    <a
      href="https://artiosacademiessh.com/store"
      target="_blank"
      rel="noopener noreferrer"
      className="panel-cta-btn"
    >
      Shop School Store <ExternalLink size={16} style={{ marginLeft: '0.5rem', display: 'inline' }} />
    </a>
  </div>
);

const HandbookContent = () => (
  <div>
    <div className="panel-section">
      <h3>Popular Sections</h3>
      <div className="panel-link-list">
        <button className="panel-link-item">
          Attendance Policy <ChevronRight size={16} />
        </button>
        <button className="panel-link-item">
          Cell Phone Rules <ChevronRight size={16} />
        </button>
        <button className="panel-link-item">
          Grading Scale <ChevronRight size={16} />
        </button>
        <button className="panel-link-item">
          Drop-off & Pick-up <ChevronRight size={16} />
        </button>
      </div>
    </div>
    <a
      href="https://www.artiosacademiessh.com/handbook"
      target="_blank"
      rel="noopener noreferrer"
      className="panel-cta-btn"
    >
      View Full Handbook <ExternalLink size={16} style={{ marginLeft: '0.5rem', display: 'inline' }} />
    </a>
  </div>
);

const FaqContent = ({ items, openId, setOpenId }) => (
  <div>
    {items.slice(0, 8).map((item) => (
      <div key={item.id} className="panel-faq-item">
        <button
          className={`panel-faq-question ${openId === item.id ? 'open' : ''}`}
          onClick={() => setOpenId(openId === item.id ? null : item.id)}
        >
          {item.question}
          <ChevronRight size={16} />
        </button>
        {openId === item.id && (
          <div className="panel-faq-answer">{item.answer}</div>
        )}
      </div>
    ))}
  </div>
);

const ScheduleContent = () => (
  <div>
    <div className="panel-section">
      <h3>Elementary (K-6)</h3>
      <div className="panel-link-list">
        <div className="panel-link-item">Monday - Academics</div>
        <div className="panel-link-item">Thursday - Arts</div>
        <div className="panel-link-item">9:00 AM - 2:45 PM</div>
      </div>
    </div>
    <div className="panel-section">
      <h3>Junior High (7-8)</h3>
      <div className="panel-link-list">
        <div className="panel-link-item">Monday - Academics</div>
        <div className="panel-link-item">Wednesday - Arts</div>
        <div className="panel-link-item">9:00 AM - 2:45 PM</div>
      </div>
    </div>
    <div className="panel-section">
      <h3>High School (9-12)</h3>
      <div className="panel-link-list">
        <div className="panel-link-item">Tuesday - Academics</div>
        <div className="panel-link-item">Friday - Arts Conservatory</div>
        <div className="panel-link-item">9:00 AM - 4:30 PM (Fri)</div>
      </div>
    </div>
    <div className="panel-info-box">
      <strong>Doors open at 8:50 AM.</strong> Please arrive 10-15 minutes early for drop-off.
    </div>
  </div>
);

const FormsContent = () => (
  <div>
    <div className="panel-section">
      <h3>Enrollment</h3>
      <div className="panel-link-list">
        <a href="https://accounts.renweb.com/Account/Login" target="_blank" rel="noopener noreferrer" className="panel-link-item">
          FACTS Portal <ExternalLink size={16} />
        </a>
        <button className="panel-link-item">
          Re-enrollment Forms <ChevronRight size={16} />
        </button>
      </div>
    </div>
    <div className="panel-section">
      <h3>Academic</h3>
      <div className="panel-link-list">
        <button className="panel-link-item">
          Transcript Request <ChevronRight size={16} />
        </button>
        <button className="panel-link-item">
          Absence Report <ChevronRight size={16} />
        </button>
      </div>
    </div>
  </div>
);

const PodcastContent = () => (
  <div>
    <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: '1.5' }}>
      Your weekly companion to the Artios experience. Bridge the classroom and living room with insights from seasoned educators and Artios leaders.
    </p>
    <div className="panel-section">
      <h3>Listen Now</h3>
      <div className="panel-link-list">
        <a
          href="https://podcasts.apple.com/us/podcast/artios-at-home-artios-of-sugar-hill/id1840924354"
          target="_blank"
          rel="noopener noreferrer"
          className="panel-link-item"
          style={{ background: '#fef2f2', color: '#dc2626' }}
        >
          Apple Podcasts <ExternalLink size={16} />
        </a>
        <a
          href="https://open.spotify.com/show/2GBsiEESrmOgtUaY8r2TQW"
          target="_blank"
          rel="noopener noreferrer"
          className="panel-link-item"
          style={{ background: '#ecfdf5', color: '#059669' }}
        >
          Spotify <ExternalLink size={16} />
        </a>
      </div>
    </div>
  </div>
);

export default ResourceDock;

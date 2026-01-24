import React, { useState, useEffect } from 'react';
import {
  Clock,
  Shirt,
  HelpCircle,
  BookOpen,
  Heart,
  Headphones,
  ChevronRight,
  ExternalLink,
  ShoppingBag,
  Ticket,
  Calendar
} from 'lucide-react';
import SlideUpPanel from './SlideUpPanel';
import FAQSection from './FAQSection';

/**
 * EssentialsGrid Component
 * A clean 6-card grid that opens slide-up panels for detailed content
 * Replaces the confusing ResourceDock + MorePage tabs architecture
 */
const EssentialsGrid = ({ faqItems = [], onOpenChat, externalPanelId, onExternalPanelClose }) => {
  const [activePanel, setActivePanel] = useState(null);
  const [openFaqId, setOpenFaqId] = useState(null);

  // Handle external panel triggers (from QuickActions, banners, etc.)
  useEffect(() => {
    if (externalPanelId) {
      setActivePanel(externalPanelId);
    }
  }, [externalPanelId]);

  const essentials = [
    { id: 'schedule', label: 'Schedule', desc: 'Class times', icon: Clock, color: 'blue' },
    { id: 'dresscode', label: 'Dress Code', desc: 'Uniform rules', icon: Shirt, color: 'purple' },
    { id: 'faq', label: 'FAQ', desc: 'Quick answers', icon: HelpCircle, color: 'green' },
    { id: 'handbook', label: 'Handbook', desc: 'Policies', icon: BookOpen, color: 'orange' },
    { id: 'involved', label: 'Get Involved', desc: 'Volunteer & more', icon: Heart, color: 'pink' },
    { id: 'podcast', label: 'Podcast', desc: 'Listen now', icon: Headphones, color: 'red' },
  ];

  const closePanel = () => {
    setActivePanel(null);
    // Notify parent that panel was closed (in case it was opened externally)
    if (onExternalPanelClose) {
      onExternalPanelClose();
    }
  };

  const getPanelTitle = () => {
    const titles = {
      schedule: 'Class Schedule',
      dresscode: 'Dress Code',
      faq: 'Frequently Asked Questions',
      handbook: 'Parent Handbook',
      involved: 'Get Involved',
      podcast: 'Artios At Home Podcast',
      calendar: 'School Calendar',
      welcome: 'Welcome to Artios',
    };
    return titles[activePanel] || '';
  };

  const renderPanelContent = () => {
    switch (activePanel) {
      case 'schedule':
        return <ScheduleContent />;
      case 'dresscode':
        return <DressCodeContent />;
      case 'faq':
        return <FaqContent items={faqItems} openId={openFaqId} setOpenId={setOpenFaqId} />;
      case 'handbook':
        return <HandbookContent />;
      case 'involved':
        return <GetInvolvedContent />;
      case 'podcast':
        return <PodcastContent />;
      case 'calendar':
        return <CalendarContent />;
      case 'welcome':
        return <WelcomeContent />;
      default:
        return null;
    }
  };

  return (
    <>
      <section className="essentials-section">
        <h3 className="essentials-header">Quick Access</h3>
        <div className="essentials-grid">
          {essentials.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`essential-card ${item.color}`}
                onClick={() => setActivePanel(item.id)}
              >
                <div className="essential-icon">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <div className="essential-text">
                  <strong>{item.label}</strong>
                  <span>{item.desc}</span>
                </div>
                <ChevronRight size={16} className="essential-arrow" />
              </button>
            );
          })}
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

const ScheduleContent = () => (
  <div className="panel-content">
    <div className="schedule-grid">
      <div className="schedule-card">
        <div className="schedule-card-header blue">
          <span className="schedule-grades">Elementary K-6</span>
        </div>
        <div className="schedule-card-body">
          <div className="schedule-row">
            <span className="day">Monday</span>
            <span className="focus">Academics</span>
          </div>
          <div className="schedule-row">
            <span className="day">Thursday</span>
            <span className="focus">Arts</span>
          </div>
          <div className="schedule-time">9:00 AM - 2:45 PM</div>
        </div>
      </div>

      <div className="schedule-card">
        <div className="schedule-card-header purple">
          <span className="schedule-grades">Junior High 7-8</span>
        </div>
        <div className="schedule-card-body">
          <div className="schedule-row">
            <span className="day">Monday</span>
            <span className="focus">Academics</span>
          </div>
          <div className="schedule-row">
            <span className="day">Wednesday</span>
            <span className="focus">Arts</span>
          </div>
          <div className="schedule-time">9:00 AM - 2:45 PM</div>
        </div>
      </div>

      <div className="schedule-card">
        <div className="schedule-card-header green">
          <span className="schedule-grades">High School 9-12</span>
        </div>
        <div className="schedule-card-body">
          <div className="schedule-row">
            <span className="day">Tuesday</span>
            <span className="focus">Academics</span>
          </div>
          <div className="schedule-row">
            <span className="day">Friday</span>
            <span className="focus">Arts Conservatory</span>
          </div>
          <div className="schedule-time">9:00 AM - 4:30 PM (Fri)</div>
        </div>
      </div>
    </div>

    <div className="panel-info-box">
      <strong>Doors open at 8:50 AM</strong>
      <p>Please arrive 10-15 minutes early for drop-off.</p>
    </div>

  </div>
);

const DressCodeContent = () => (
  <div className="panel-content">
    <div className="dresscode-rules">
      <div className="rule-item required">
        <div className="rule-icon">
          <Shirt size={20} />
        </div>
        <div className="rule-text">
          <strong>Artios T-Shirt Required</strong>
          <span>Must be worn every class day</span>
        </div>
      </div>
      <div className="rule-item">
        <div className="rule-text">
          <strong>Pants & Shorts</strong>
          <span>Twill or denim only. Shorts must be within 3" of the knee.</span>
        </div>
      </div>
      <div className="rule-item">
        <div className="rule-text">
          <strong>No Holes or Rips</strong>
          <span>Clothing must be neat and intact.</span>
        </div>
      </div>
      <div className="rule-item">
        <div className="rule-text">
          <strong>No Hats Indoors</strong>
          <span>Hats may be worn outside only.</span>
        </div>
      </div>
    </div>

    <a
      href="https://duesouthdesigns.net/school-orders"
      target="_blank"
      rel="noopener noreferrer"
      className="panel-cta-btn"
    >
      <ShoppingBag size={16} /> Shop School Store
    </a>
  </div>
);

const FaqContent = ({ items, openId, setOpenId }) => (
  <div className="panel-content">
    <FAQSection faqItems={items} />
  </div>
);

const HandbookContent = () => (
  <div className="panel-content">
    <p className="panel-desc">
      Our Parent Handbook contains all the policies, procedures, and expectations for Artios families.
    </p>

    <div className="handbook-sections">
      <div className="handbook-item">
        <strong>Attendance Policy</strong>
        <span>Absence reporting and tardiness</span>
      </div>
      <div className="handbook-item">
        <strong>Cell Phone Rules</strong>
        <span>Device usage guidelines</span>
      </div>
      <div className="handbook-item">
        <strong>Grading Scale</strong>
        <span>How grades are calculated</span>
      </div>
      <div className="handbook-item">
        <strong>Drop-off & Pick-up</strong>
        <span>Arrival and dismissal procedures</span>
      </div>
    </div>

    <a
      href="/Updated Open House 25_26.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="panel-cta-btn"
    >
      <BookOpen size={16} /> View Full Handbook
    </a>
  </div>
);

const GetInvolvedContent = () => (
  <div className="panel-content">
    <div className="involved-grid">
      <a
        href="https://www.signupgenius.com/go/10C0549AAA82CA4F49-58166214-parent#"
        target="_blank"
        rel="noopener noreferrer"
        className="involved-card"
      >
        <Heart size={24} />
        <div>
          <strong>Volunteer as TA Sub</strong>
          <span>Help in the classroom</span>
        </div>
        <ExternalLink size={14} />
      </a>

      <a
        href="https://duesouthdesigns.net/school-orders"
        target="_blank"
        rel="noopener noreferrer"
        className="involved-card"
      >
        <ShoppingBag size={24} />
        <div>
          <strong>School Store</strong>
          <span>Spirit wear & gear</span>
        </div>
        <ExternalLink size={14} />
      </a>

      <a
        href="https://www.eventbrite.com/o/artios-academies-of-sugar-hill-8358455471"
        target="_blank"
        rel="noopener noreferrer"
        className="involved-card"
      >
        <Ticket size={24} />
        <div>
          <strong>Event Tickets</strong>
          <span>Performances & shows</span>
        </div>
        <ExternalLink size={14} />
      </a>
    </div>

    <div className="newsletter-section">
      <h4>Newsletters</h4>
      <a
        href="https://www.canva.com/design/DAG7VDbHm7U/YhxiSMtoI-4m4CoxQR9ljA/view"
        target="_blank"
        rel="noopener noreferrer"
        className="newsletter-link"
      >
        Elementary Connection <ExternalLink size={14} />
      </a>
      <a
        href="https://drive.google.com/file/d/1eC5Dd2ZQRRUX-nX1P6CXcNDxtZePUlCh/view"
        target="_blank"
        rel="noopener noreferrer"
        className="newsletter-link"
      >
        The Choir Wire <ExternalLink size={14} />
      </a>
    </div>
  </div>
);

const PodcastContent = () => (
  <div className="panel-content">
    <div className="podcast-hero">
      <Headphones size={48} />
      <h3>Artios At Home</h3>
      <p>Your weekly companion to the Artios experience. Bridge the classroom and living room with insights from seasoned educators.</p>
    </div>

    <div className="podcast-buttons">
      <a
        href="https://podcasts.apple.com/us/podcast/artios-at-home-artios-of-sugar-hill/id1840924354"
        target="_blank"
        rel="noopener noreferrer"
        className="podcast-btn apple"
      >
        Apple Podcasts
      </a>
      <a
        href="https://open.spotify.com/show/2GBsiEESrmOgtUaY8r2TQW"
        target="_blank"
        rel="noopener noreferrer"
        className="podcast-btn spotify"
      >
        Spotify
      </a>
    </div>
  </div>
);

const CalendarContent = () => (
  <div className="panel-content">
    <div className="calendar-embed">
      <iframe
        src="https://calendar.google.com/calendar/embed?src=c_f1e327887d2f9739ac02c84e80fe02dceec209d06b4755d72eb5358c6ce9016b%40group.calendar.google.com&ctz=America%2FNew_York"
        style={{ border: 0, width: '100%', height: '500px' }}
        frameBorder="0"
        scrolling="no"
        title="School Calendar"
      />
    </div>
    <a
      href="https://calendar.google.com/calendar/embed?src=c_f1e327887d2f9739ac02c84e80fe02dceec209d06b4755d72eb5358c6ce9016b%40group.calendar.google.com"
      target="_blank"
      rel="noopener noreferrer"
      className="panel-cta-btn"
    >
      <Calendar size={16} /> Open Full Calendar
    </a>
  </div>
);

const WelcomeContent = () => (
  <div className="panel-content">
    <div className="welcome-intro">
      <h3>Welcome to Artios!</h3>
      <p>We're so glad you're here. Artios is a Christian homeschool hybrid program providing academic excellence with a biblical worldview.</p>
    </div>

    <div className="welcome-checklist">
      <h4>Getting Started Checklist</h4>
      <div className="checklist-item">
        <span className="step">1</span>
        <span>Complete FACTS enrollment forms</span>
      </div>
      <div className="checklist-item">
        <span className="step">2</span>
        <span>Set up ArtiosCafe.com lunch account</span>
      </div>
      <div className="checklist-item">
        <span className="step">3</span>
        <span>Order Artios T-shirts from school store</span>
      </div>
      <div className="checklist-item">
        <span className="step">4</span>
        <span>Review the dress code and handbook</span>
      </div>
      <div className="checklist-item">
        <span className="step">5</span>
        <span>Subscribe to the school calendar</span>
      </div>
    </div>

    <div className="welcome-contact">
      <h4>Questions?</h4>
      <p>Contact our directors:</p>
      <a href="mailto:jmlane@artiosacademies.com" className="contact-link">
        John Lane - jmlane@artiosacademies.com
      </a>
      <a href="mailto:jthompson@artiosacademies.com" className="contact-link">
        Jackie Thompson - jthompson@artiosacademies.com
      </a>
    </div>
  </div>
);

export default EssentialsGrid;

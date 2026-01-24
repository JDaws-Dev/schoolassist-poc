import React, { useState } from 'react';
import {
  ChevronRight,
  Sparkles,
  ExternalLink,
  Users,
  MessageCircle,
  CheckCircle,
  Circle,
  Clock,
  Shirt,
  BookOpen,
  Coffee,
  Phone,
  Mail,
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';

/**
 * WelcomePage Component
 * Comprehensive getting-started guide for new Artios families
 */
const WelcomePage = ({ onBack, onOpenChat }) => {
  // Track checklist completion in localStorage
  const [completedSteps, setCompletedSteps] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('artios_onboarding_progress') || '{}');
    } catch { return {}; }
  });

  // Track which item was copied (for feedback)
  const [copiedItem, setCopiedItem] = useState(null);

  // Copy to clipboard with feedback
  const copyToClipboard = (text, itemKey) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedItem(itemKey);
      setTimeout(() => setCopiedItem(null), 2000);
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  };

  const toggleStep = (stepId) => {
    const newSteps = { ...completedSteps, [stepId]: !completedSteps[stepId] };
    setCompletedSteps(newSteps);
    localStorage.setItem('artios_onboarding_progress', JSON.stringify(newSteps));
  };

  // Checklist items
  const checklistItems = [
    { id: 'facts', label: 'Complete FACTS enrollment forms', link: 'https://accounts.renweb.com/Account/Login' },
    { id: 'handbook', label: 'Read the Student Handbook' },
    { id: 'shirts', label: 'Get Artios t-shirts (daily uniform)' },
    { id: 'lunch', label: 'Set up ArtiosCafe.com account', link: 'http://artioscafe.com' },
    { id: 'calendar', label: 'Add school calendar to your phone', link: 'https://calendar.google.com/calendar/embed?src=c_f1e327887d2f9739ac02c84e80fe02dceec209d06b4755d72eb5358c6ce9016b%40group.calendar.google.com' },
  ];

  const completedCount = checklistItems.filter(item => completedSteps[item.id]).length;
  const progressPercent = Math.round((completedCount / checklistItems.length) * 100);

  return (
    <div className="welcome-page">
      <header className="welcome-page-header">
        <button onClick={onBack} className="back-btn">
          <ChevronRight size={20} className="back-arrow" /> Back to Home
        </button>
      </header>

      <div className="welcome-hero">
        <Sparkles size={40} />
        <h1>Welcome to Artios!</h1>
        <p>Your guide to getting started at Artios Academies</p>
      </div>

      <div className="welcome-content">
        {/* Start Here Checklist */}
        <section className="welcome-section priority">
          <div className="section-header-row">
            <h2>Start Here Checklist</h2>
            <span className="progress-badge">{completedCount}/{checklistItems.length} complete</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
          <div className="checklist-items">
            {checklistItems.map(item => (
              <div
                key={item.id}
                className={`checklist-item ${completedSteps[item.id] ? 'completed' : ''}`}
                onClick={() => toggleStep(item.id)}
              >
                {completedSteps[item.id] ? (
                  <CheckCircle size={22} className="check-icon completed" />
                ) : (
                  <Circle size={22} className="check-icon" />
                )}
                <span className="checklist-label">{item.label}</span>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="checklist-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Schedule Overview */}
        <section className="welcome-section">
          <h2><Clock size={20} /> Weekly Schedule</h2>
          <div className="schedule-cards">
            <div className="schedule-card elementary">
              <strong>Monday</strong>
              <span className="focus">Elementary & Junior High</span>
              <span className="days">Academics</span>
            </div>
            <div className="schedule-card junior">
              <strong>Tuesday</strong>
              <span className="focus">High School</span>
              <span className="days">Academics</span>
            </div>
            <div className="schedule-card elementary">
              <strong>Wednesday</strong>
              <span className="focus">Junior High</span>
              <span className="days">Arts</span>
            </div>
            <div className="schedule-card elementary">
              <strong>Thursday</strong>
              <span className="focus">Elementary</span>
              <span className="days">Arts</span>
            </div>
            <div className="schedule-card high">
              <strong>Friday</strong>
              <span className="focus">High School</span>
              <span className="days">Arts</span>
            </div>
          </div>
          <p className="schedule-note">
            <strong>Start: 9:00 AM</strong> • Doors open at 8:50 AM • Dismissal varies by grade — check FACTS
          </p>
        </section>

        {/* Artios Lingo */}
        <section className="welcome-section">
          <h2><BookOpen size={20} /> Artios Lingo Guide</h2>
          <p className="section-hint">Common terms you'll hear at Artios</p>
          <div className="lingo-grid">
            <div className="lingo-item">
              <strong>University-Model</strong>
              <span>Students attend campus 2 days/week, complete assignments at home the other days</span>
            </div>
            <div className="lingo-item">
              <strong>FACTS</strong>
              <span>Our online portal for grades, attendance, enrollment forms, and communication</span>
            </div>
            <div className="lingo-item">
              <strong>Parent Partnership</strong>
              <span>Meeting with staff to discuss academic progress and family involvement</span>
            </div>
            <div className="lingo-item">
              <strong>Arts Conservatory</strong>
              <span>High School Friday = Arts Conservatory day. Extended arts training 9 AM - 4:30 PM including drama, music, and visual arts</span>
            </div>
            <div className="lingo-item">
              <strong>TA Sub</strong>
              <span>Teacher Assistant Substitute — a volunteer parent who helps in the classroom</span>
            </div>
          </div>
        </section>

        {/* Quick Reference Cards */}
        <div className="welcome-grid">
          <div className="welcome-card">
            <Shirt size={24} />
            <h3>Dress Code</h3>
            <ul>
              <li>Artios t-shirt required daily</li>
              <li>Twill or denim pants/shorts</li>
              <li>Shorts within 3" of knee</li>
              <li>No holes, rips, or tears</li>
              <li>No hats indoors</li>
            </ul>
          </div>

          <div className="welcome-card">
            <Coffee size={24} />
            <h3>Lunch</h3>
            <p>Order through <strong>ArtiosCafe.com</strong> by <span className="highlight">10 AM on class days</span>.</p>
            <p>Or bring lunch from home.</p>
            <a href="http://artioscafe.com" target="_blank" rel="noopener noreferrer" className="welcome-link-btn">
              Order Lunch <ExternalLink size={14} />
            </a>
          </div>

          <div className="welcome-card">
            <HelpCircle size={24} />
            <h3>Weather Closings</h3>
            <p>If <strong>Gwinnett</strong> or <strong>Forsyth County</strong> schools close, Artios closes.</p>
            <p>Check email, texts, and social media for announcements.</p>
          </div>
        </div>

        {/* Contact Section */}
        <section className="welcome-section contact-section">
          <h2>Questions? We're Here to Help</h2>
          <div className="contact-grid">
            <div className="contact-card">
              <Mail size={20} />
              <div className="contact-info">
                <strong>Front Office</strong>
                <a href="mailto:office@artiosacademies.com">office@artiosacademies.com</a>
              </div>
              <button
                onClick={() => copyToClipboard('office@artiosacademies.com', 'email')}
                className={`copy-btn ${copiedItem === 'email' ? 'copied' : ''}`}
                title="Copy email"
              >
                {copiedItem === 'email' ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
            <div className="contact-card">
              <Phone size={20} />
              <div className="contact-info">
                <strong>Phone</strong>
                <a href="tel:+14702024042">(470) 202-4042</a>
              </div>
              <button
                onClick={() => copyToClipboard('(470) 202-4042', 'phone')}
                className={`copy-btn ${copiedItem === 'phone' ? 'copied' : ''}`}
                title="Copy phone"
              >
                {copiedItem === 'phone' ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
            <div className="contact-card">
              <Users size={20} />
              <div className="contact-info">
                <strong>Director</strong>
                <span>John Lane</span>
              </div>
            </div>
          </div>
          <button onClick={onOpenChat} className="welcome-chat-btn">
            <MessageCircle size={20} />
            <span>Or ask our AI assistant for quick answers</span>
          </button>
        </section>
      </div>
    </div>
  );
};

export default WelcomePage;

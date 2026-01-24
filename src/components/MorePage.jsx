import React, { useState } from 'react';
import {
  ChevronRight,
  Star,
  X,
  Users,
  Clock,
  FileText,
  Calendar,
  ExternalLink,
  Heart,
  ArrowRight,
  Ticket,
  ShoppingBag,
  GraduationCap,
  MessageCircle,
  BookOpen,
  Building2,
  Palette,
  Mic,
  HelpCircle
} from 'lucide-react';
import FAQSection from './FAQSection';
import ChatWidget from './ChatWidget';

/**
 * MorePage Component
 * Resources page with tabbed sections: Academics, Campus Life, Arts & Community
 */
const MorePage = ({
  onBack,
  onNavigate,
  favorites = [],
  onAddFavorite,
  onRemoveFavorite,
  faq = [],
  chatOpen,
  setChatOpen,
  systemPrompt
}) => {
  const [activeTab, setActiveTab] = useState('academics');

  const tabs = [
    { id: 'academics', label: 'Academics', icon: BookOpen },
    { id: 'campus', label: 'Campus Life', icon: Building2 },
    { id: 'arts', label: 'Arts & Community', icon: Palette },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
  ];

  // Helper for rendering resource cards with favorites
  const ResourceCard = ({ title, desc, url, onClick, icon: Icon, color }) => {
    const isFavorite = url && favorites.some(f => f.url === url);
    const CardContent = (
      <>
        <div className={`resource-icon-wrap ${color}`}>
          <Icon size={22} />
        </div>
        <div className="resource-text">
          <strong>{title}</strong>
          <span>{desc}</span>
        </div>
        {url && <ExternalLink size={14} className="resource-external" />}
      </>
    );

    if (onClick) {
      return (
        <button onClick={onClick} className="resource-card visual">
          {CardContent}
        </button>
      );
    }

    return (
      <div className="resource-card-wrapper">
        <a href={url} target="_blank" rel="noopener noreferrer" className="resource-card visual">
          {CardContent}
        </a>
        <button
          onClick={() => isFavorite
            ? onRemoveFavorite(url)
            : onAddFavorite({ title, url })
          }
          className={`favorite-star-btn ${isFavorite ? 'active' : ''}`}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Star size={14} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>
    );
  };

  return (
    <div className="page-view">
      <header className="page-header">
        <button onClick={onBack} className="back-btn">
          <ChevronRight size={20} className="back-arrow" /> Back to Home
        </button>
        <h1>Resources</h1>
      </header>

      <div className="more-page-content">
        {/* Your Favorites Section - Always visible at top */}
        {favorites.length > 0 && (
          <section className="more-section favorites-section">
            <h2><Star size={20} /> Your Favorites</h2>
            <div className="favorites-grid">
              {favorites.map((fav, i) => (
                <a key={i} href={fav.url} target="_blank" rel="noopener noreferrer" className="favorite-link-card">
                  <span>{fav.title}</span>
                  <button
                    onClick={(e) => { e.preventDefault(); onRemoveFavorite(fav.url); }}
                    className="remove-favorite-btn"
                    title="Remove from favorites"
                  >
                    <X size={14} />
                  </button>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Tab Navigation */}
        <div className="resource-tabs">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`resource-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="resource-tab-content">
          {/* Academics Tab */}
          {activeTab === 'academics' && (
            <>
              <section className="more-section">
                <h2>Quick Access</h2>
                <div className="resource-grid visual">
                  <ResourceCard
                    title="FACTS Portal"
                    desc="Grades, attendance, enrollment"
                    url="https://accounts.renweb.com/Account/Login"
                    icon={Users}
                    color="blue"
                  />
                  <ResourceCard
                    title="School Calendar"
                    desc="Events, deadlines, holidays"
                    url="https://calendar.google.com/calendar/embed?src=c_f1e327887d2f9739ac02c84e80fe02dceec209d06b4755d72eb5358c6ce9016b%40group.calendar.google.com"
                    icon={Calendar}
                    color="purple"
                  />
                </div>
              </section>

              <section className="more-section">
                <h2>Forms & Records</h2>
                <p className="section-hint">Documents for enrollment and academics</p>
                <div className="documents-grid">
                  <a href="https://accounts.renweb.com/Account/Login" target="_blank" rel="noopener noreferrer" className="document-card">
                    <FileText size={20} />
                    <div>
                      <strong>Enrollment Forms</strong>
                      <span>Via FACTS Portal</span>
                    </div>
                  </a>
                  <a href="https://accounts.renweb.com/Account/Login" target="_blank" rel="noopener noreferrer" className="document-card">
                    <Users size={20} />
                    <div>
                      <strong>Transcript Requests</strong>
                      <span>Academic records</span>
                    </div>
                  </a>
                </div>
              </section>

              <section className="more-section">
                <h2>Newsletters</h2>
                <div className="newsletters-list">
                  <a href="https://www.canva.com/design/DAG7VDbHm7U/YhxiSMtoI-4m4CoxQR9ljA/view" target="_blank" rel="noopener noreferrer" className="newsletter-item">
                    <FileText size={18} />
                    <div>
                      <strong>Elementary Connection</strong>
                      <span>K-6 academic updates</span>
                    </div>
                    <ExternalLink size={16} />
                  </a>
                </div>
              </section>
            </>
          )}

          {/* Campus Life Tab */}
          {activeTab === 'campus' && (
            <>
              <section className="more-section">
                <h2>Daily Logistics</h2>
                <div className="resource-grid visual">
                  <ResourceCard
                    title="Order Lunch"
                    desc="ArtiosCafe.com"
                    url="http://artioscafe.com"
                    icon={Clock}
                    color="green"
                  />
                  <ResourceCard
                    title="Full Schedule"
                    desc="Class times & days"
                    onClick={() => onNavigate('schedule')}
                    icon={Calendar}
                    color="orange"
                  />
                </div>
              </section>

              <section className="more-section">
                <h2>Policies & Handbook</h2>
                <p className="section-hint">Campus rules and procedures</p>
                <div className="documents-grid">
                  <a href="/Updated Open House 25_26.pdf" target="_blank" rel="noopener noreferrer" className="document-card">
                    <FileText size={20} />
                    <div>
                      <strong>Parent Handbook</strong>
                      <span>Policies & expectations</span>
                    </div>
                  </a>
                  <button onClick={() => onNavigate('schedule')} className="document-card">
                    <Clock size={20} />
                    <div>
                      <strong>Drop-off & Pick-up</strong>
                      <span>Arrival & dismissal times</span>
                    </div>
                  </button>
                </div>
              </section>

              <section className="more-section">
                <h2>New Families</h2>
                <button onClick={() => onNavigate('welcome')} className="new-families-btn">
                  <GraduationCap size={20} />
                  <span>New to Artios? Complete Welcome Guide</span>
                  <ArrowRight size={16} />
                </button>
              </section>
            </>
          )}

          {/* Arts & Community Tab */}
          {activeTab === 'arts' && (
            <>
              <section className="more-section">
                <h2>Artios At Home Podcast</h2>
                <p className="section-hint">Insights and updates from our school family</p>
                <div className="podcast-links">
                  <a href="https://podcasts.apple.com/us/podcast/artios-at-home-artios-of-sugar-hill/id1840924354" target="_blank" rel="noopener noreferrer" className="podcast-btn apple">
                    Apple Podcasts
                  </a>
                  <a href="https://open.spotify.com/show/2GBsiEESrmOgtUaY8r2TQW" target="_blank" rel="noopener noreferrer" className="podcast-btn spotify">
                    Spotify
                  </a>
                </div>
              </section>

              <section className="more-section">
                <h2>The Arts</h2>
                <div className="newsletters-list">
                  <a href="https://drive.google.com/file/d/1eC5Dd2ZQRRUX-nX1P6CXcNDxtZePUlCh/view" target="_blank" rel="noopener noreferrer" className="newsletter-item">
                    <Mic size={18} />
                    <div>
                      <strong>The Choir Wire</strong>
                      <span>Music & choir updates</span>
                    </div>
                    <ExternalLink size={16} />
                  </a>
                  <a href="https://www.eventbrite.com/o/artios-academies-of-sugar-hill-8358455471" target="_blank" rel="noopener noreferrer" className="newsletter-item">
                    <Ticket size={18} />
                    <div>
                      <strong>Event Tickets</strong>
                      <span>Performances & productions</span>
                    </div>
                    <ExternalLink size={16} />
                  </a>
                </div>
              </section>

              <section className="more-section">
                <h2>Get Involved</h2>
                <div className="involved-list">
                  <a href="https://www.signupgenius.com/go/10C0549AAA82CA4F49-58166214-parent#" target="_blank" rel="noopener noreferrer" className="involved-item">
                    <Heart size={20} />
                    <div>
                      <strong>Volunteer as TA Sub</strong>
                      <span>Help in the classroom</span>
                    </div>
                    <ArrowRight size={16} />
                  </a>
                  <a href="https://duesouthdesigns.net/school-orders" target="_blank" rel="noopener noreferrer" className="involved-item">
                    <ShoppingBag size={20} />
                    <div>
                      <strong>School Store</strong>
                      <span>Spirit wear & gear</span>
                    </div>
                    <ArrowRight size={16} />
                  </a>
                </div>
              </section>
            </>
          )}

          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <section className="more-section faq-tab">
              <FAQSection faqItems={faq} />
            </section>
          )}
        </div>
      </div>

      <ChatWidget isOpen={chatOpen} onClose={() => setChatOpen(false)} customPrompt={systemPrompt} />
      {!chatOpen && (
        <button className="chat-toggle" onClick={() => setChatOpen(true)} aria-label="Open chat assistant">
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
};

export default MorePage;

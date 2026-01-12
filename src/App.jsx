import React, { useState, useRef, useEffect } from 'react';
import {
  Calendar,
  MessageCircle,
  ExternalLink,
  ChevronRight,
  Send,
  Menu,
  X,
  Settings,
  Bell,
  FileText,
  Clock,
  MapPin,
  Plus,
  Trash2,
  Edit3,
  Save,
  LogOut,
  Home,
  BookOpen,
  Users,
  Info
} from 'lucide-react';

// Auto-detect API URL
const API_URL = import.meta.env.DEV ? 'http://localhost:3001' : '';
const generateSessionId = () => 'session-' + Math.random().toString(36).substr(2, 9);

// Initial data - this would come from a database in production
const initialData = {
  quickLinks: [
    { id: 1, title: 'Parent Portal (FACTS)', url: 'https://logins2.renweb.com/logins/ParentsWeb-Login.aspx', icon: 'users' },
    { id: 2, title: 'School Calendar', url: 'https://calendar.google.com/calendar/embed?src=c_f1e327887d2f9739ac02c84e80fe02dceec209d06b4755d72eb5358c6ce9016b%40group.calendar.google.com', icon: 'calendar' },
    { id: 3, title: 'Order Lunch', url: 'https://artioscafe.com', icon: 'external' },
    { id: 4, title: 'School Website', url: 'https://artiosacademies.com/sugarhill/', icon: 'home' },
    { id: 5, title: 'Handbook & Policies', url: 'https://artiosacademies.com/sugarhill/handbook/', icon: 'book' },
    { id: 6, title: 'Contact Us', url: 'mailto:jmlane@artiosacademies.com', icon: 'info' },
  ],
  announcements: [
    { id: 1, title: 'Welcome Back!', content: 'We hope everyone had a wonderful Christmas break. Classes resume January 5th for Elementary & JH, January 6th for HS.', date: '2026-01-05', priority: 'high' },
    { id: 2, title: 'Open House - January 12th', content: 'Join us for our Open House at 6:00 PM. Great opportunity for prospective families!', date: '2026-01-12', priority: 'normal' },
  ],
  upcomingEvents: [
    { id: 1, title: 'Elem & JH Academics Resume', date: '2026-01-05', time: 'All Day', location: 'Main Campus' },
    { id: 2, title: 'HS Academics Resume', date: '2026-01-06', time: 'All Day', location: 'Main Campus' },
    { id: 3, title: 'Artios Open House', date: '2026-01-12', time: '6:00 PM', location: 'Main Campus' },
    { id: 4, title: "Pilgrim's Progress - Dance Performance", date: '2026-01-16', time: '7:00 PM', location: 'Main Auditorium' },
    { id: 5, title: 'MLK Day - Artios Closed', date: '2026-01-19', time: 'All Day', location: '' },
    { id: 6, title: 'Senior Meeting (Parents & Students)', date: '2026-01-20', time: '4:00 PM', location: 'Room 101' },
    { id: 7, title: '9th Grade Preview Day', date: '2026-01-23', time: '9:00 AM', location: 'Main Campus' },
  ],
  documents: [
    { id: 1, title: 'Student Handbook 2025-2026', url: '#', category: 'Policies' },
    { id: 2, title: 'Dress Code Guidelines', url: '#', category: 'Policies' },
    { id: 3, title: 'Academic Calendar', url: '#', category: 'Calendar' },
    { id: 4, title: 'Lunch Menu', url: 'https://artioscafe.com', category: 'Resources' },
  ],
  schoolInfo: {
    name: 'Artios Academies of Sugar Hill',
    tagline: 'Art. Heart. Smart.',
    address: 'Sugar Hill, Georgia',
    phone: '',
    email: 'jmlane@artiosacademies.com',
    director: 'John Lane'
  }
};

// Icon mapping component
const IconComponent = ({ name, size = 20, className = '' }) => {
  const icons = {
    calendar: Calendar,
    external: ExternalLink,
    users: Users,
    home: Home,
    book: BookOpen,
    info: Info,
    file: FileText,
  };
  const Icon = icons[name] || ExternalLink;
  return <Icon size={size} className={className} />;
};

// Format date helper
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

const isUpcoming = (dateStr) => {
  const eventDate = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return eventDate >= today;
};

// Chat Component
const ChatWidget = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m the Artios Connect assistant. I can help answer questions about school policies, schedules, events, and more. What would you like to know?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(generateSessionId);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, role: 'parent', sessionId })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.message || 'Sorry, I couldn\'t process that request.' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I\'m having trouble connecting. Please try again.' }]);
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="chat-widget">
      <div className="chat-header">
        <MessageCircle size={20} />
        <span>Ask Artios Connect</span>
        <button onClick={onClose} className="chat-close"><X size={20} /></button>
      </div>
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
        {loading && <div className="chat-message assistant loading">Thinking...</div>}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask a question..."
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading || !input.trim()}>
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

// Admin Panel Component
const AdminPanel = ({ data, setData, onLogout }) => {
  const [activeTab, setActiveTab] = useState('announcements');
  const [editingItem, setEditingItem] = useState(null);

  const addItem = (type) => {
    const newItem = type === 'announcements'
      ? { id: Date.now(), title: 'New Announcement', content: '', date: new Date().toISOString().split('T')[0], priority: 'normal' }
      : type === 'upcomingEvents'
      ? { id: Date.now(), title: 'New Event', date: new Date().toISOString().split('T')[0], time: '', location: '' }
      : type === 'quickLinks'
      ? { id: Date.now(), title: 'New Link', url: 'https://', icon: 'external' }
      : { id: Date.now(), title: 'New Document', url: '#', category: 'Resources' };

    setData(prev => ({ ...prev, [type]: [...prev[type], newItem] }));
    setEditingItem({ type, id: newItem.id });
  };

  const updateItem = (type, id, updates) => {
    setData(prev => ({
      ...prev,
      [type]: prev[type].map(item => item.id === id ? { ...item, ...updates } : item)
    }));
  };

  const deleteItem = (type, id) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setData(prev => ({ ...prev, [type]: prev[type].filter(item => item.id !== id) }));
    }
  };

  const renderEditor = (type, item) => {
    const isEditing = editingItem?.type === type && editingItem?.id === item.id;

    if (type === 'announcements') {
      return (
        <div className="admin-item">
          <div className="admin-item-header">
            {isEditing ? (
              <input value={item.title} onChange={(e) => updateItem(type, item.id, { title: e.target.value })} className="admin-input" />
            ) : (
              <span className="admin-item-title">{item.title}</span>
            )}
            <div className="admin-item-actions">
              {isEditing ? (
                <button onClick={() => setEditingItem(null)} className="btn-icon"><Save size={16} /></button>
              ) : (
                <button onClick={() => setEditingItem({ type, id: item.id })} className="btn-icon"><Edit3 size={16} /></button>
              )}
              <button onClick={() => deleteItem(type, item.id)} className="btn-icon delete"><Trash2 size={16} /></button>
            </div>
          </div>
          {isEditing && (
            <div className="admin-item-edit">
              <textarea
                value={item.content}
                onChange={(e) => updateItem(type, item.id, { content: e.target.value })}
                placeholder="Announcement content..."
                rows={3}
              />
              <div className="admin-row">
                <input type="date" value={item.date} onChange={(e) => updateItem(type, item.id, { date: e.target.value })} />
                <select value={item.priority} onChange={(e) => updateItem(type, item.id, { priority: e.target.value })}>
                  <option value="normal">Normal</option>
                  <option value="high">High Priority</option>
                </select>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (type === 'upcomingEvents') {
      return (
        <div className="admin-item">
          <div className="admin-item-header">
            {isEditing ? (
              <input value={item.title} onChange={(e) => updateItem(type, item.id, { title: e.target.value })} className="admin-input" />
            ) : (
              <span className="admin-item-title">{item.title}</span>
            )}
            <div className="admin-item-actions">
              {isEditing ? (
                <button onClick={() => setEditingItem(null)} className="btn-icon"><Save size={16} /></button>
              ) : (
                <button onClick={() => setEditingItem({ type, id: item.id })} className="btn-icon"><Edit3 size={16} /></button>
              )}
              <button onClick={() => deleteItem(type, item.id)} className="btn-icon delete"><Trash2 size={16} /></button>
            </div>
          </div>
          {isEditing && (
            <div className="admin-item-edit">
              <div className="admin-row">
                <input type="date" value={item.date} onChange={(e) => updateItem(type, item.id, { date: e.target.value })} />
                <input type="text" value={item.time} onChange={(e) => updateItem(type, item.id, { time: e.target.value })} placeholder="Time (e.g., 6:00 PM)" />
              </div>
              <input type="text" value={item.location} onChange={(e) => updateItem(type, item.id, { location: e.target.value })} placeholder="Location" />
            </div>
          )}
        </div>
      );
    }

    if (type === 'quickLinks') {
      return (
        <div className="admin-item">
          <div className="admin-item-header">
            {isEditing ? (
              <input value={item.title} onChange={(e) => updateItem(type, item.id, { title: e.target.value })} className="admin-input" />
            ) : (
              <span className="admin-item-title">{item.title}</span>
            )}
            <div className="admin-item-actions">
              {isEditing ? (
                <button onClick={() => setEditingItem(null)} className="btn-icon"><Save size={16} /></button>
              ) : (
                <button onClick={() => setEditingItem({ type, id: item.id })} className="btn-icon"><Edit3 size={16} /></button>
              )}
              <button onClick={() => deleteItem(type, item.id)} className="btn-icon delete"><Trash2 size={16} /></button>
            </div>
          </div>
          {isEditing && (
            <div className="admin-item-edit">
              <input type="url" value={item.url} onChange={(e) => updateItem(type, item.id, { url: e.target.value })} placeholder="URL" />
              <select value={item.icon} onChange={(e) => updateItem(type, item.id, { icon: e.target.value })}>
                <option value="external">Link</option>
                <option value="calendar">Calendar</option>
                <option value="users">Users</option>
                <option value="home">Home</option>
                <option value="book">Book</option>
                <option value="info">Info</option>
              </select>
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={onLogout} className="btn-logout"><LogOut size={18} /> Logout</button>
      </div>

      <div className="admin-tabs">
        <button className={activeTab === 'announcements' ? 'active' : ''} onClick={() => setActiveTab('announcements')}>
          <Bell size={16} /> Announcements
        </button>
        <button className={activeTab === 'upcomingEvents' ? 'active' : ''} onClick={() => setActiveTab('upcomingEvents')}>
          <Calendar size={16} /> Events
        </button>
        <button className={activeTab === 'quickLinks' ? 'active' : ''} onClick={() => setActiveTab('quickLinks')}>
          <ExternalLink size={16} /> Quick Links
        </button>
      </div>

      <div className="admin-content">
        <div className="admin-section-header">
          <h2>{activeTab === 'announcements' ? 'Announcements' : activeTab === 'upcomingEvents' ? 'Upcoming Events' : 'Quick Links'}</h2>
          <button onClick={() => addItem(activeTab)} className="btn-add"><Plus size={16} /> Add New</button>
        </div>

        <div className="admin-list">
          {data[activeTab]?.map(item => (
            <React.Fragment key={item.id}>
              {renderEditor(activeTab, item)}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function App() {
  const [data, setData] = useState(initialData);
  const [chatOpen, setChatOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Simple admin auth (in production, use proper auth)
  const handleAdminLogin = () => {
    if (adminPassword === 'artios2026') {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setAdminPassword('');
    } else {
      alert('Incorrect password');
    }
  };

  if (isAdmin) {
    return <AdminPanel data={data} setData={setData} onLogout={() => setIsAdmin(false)} />;
  }

  const upcomingEvents = data.upcomingEvents.filter(e => isUpcoming(e.date)).slice(0, 7);
  const activeAnnouncements = data.announcements.filter(a => isUpcoming(a.date));

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <img src="/artios-logo.png" alt="Artios Academies" className="logo" />
            <div className="logo-text">
              <h1>Artios Connect</h1>
              <span className="tagline">{data.schoolInfo.tagline}</span>
            </div>
          </div>

          <nav className="nav-desktop">
            <a href="#events">Events</a>
            <a href="#links">Quick Links</a>
            <a href="#documents">Documents</a>
            <button onClick={() => setChatOpen(true)} className="nav-chat-btn">
              <MessageCircle size={18} /> Ask a Question
            </button>
          </nav>

          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="nav-mobile">
            <a href="#events" onClick={() => setMobileMenuOpen(false)}>Events</a>
            <a href="#links" onClick={() => setMobileMenuOpen(false)}>Quick Links</a>
            <a href="#documents" onClick={() => setMobileMenuOpen(false)}>Documents</a>
            <button onClick={() => { setChatOpen(true); setMobileMenuOpen(false); }} className="nav-chat-btn">
              <MessageCircle size={18} /> Ask a Question
            </button>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2>Welcome to {data.schoolInfo.name}</h2>
          <p>Your central hub for school information, events, and resources.</p>
          <div className="hero-actions">
            <a href="#events" className="btn-primary">View Upcoming Events</a>
            <button onClick={() => setChatOpen(true)} className="btn-secondary">
              <MessageCircle size={18} /> Ask a Question
            </button>
          </div>
        </div>
      </section>

      {/* Announcements Banner */}
      {activeAnnouncements.length > 0 && (
        <section className="announcements">
          {activeAnnouncements.map(announcement => (
            <div key={announcement.id} className={`announcement ${announcement.priority}`}>
              <Bell size={18} />
              <div>
                <strong>{announcement.title}</strong>
                <p>{announcement.content}</p>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Quick Links */}
      <section id="links" className="quick-links-section">
        <h2>Quick Links</h2>
        <div className="quick-links-grid">
          {data.quickLinks.map(link => (
            <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="quick-link-card">
              <IconComponent name={link.icon} size={24} />
              <span>{link.title}</span>
              <ChevronRight size={16} className="arrow" />
            </a>
          ))}
        </div>
      </section>

      {/* Upcoming Events */}
      <section id="events" className="events-section">
        <h2>Upcoming Events</h2>
        <div className="events-list">
          {upcomingEvents.map(event => (
            <div key={event.id} className="event-card">
              <div className="event-date">
                <span className="event-day">{new Date(event.date).getDate()}</span>
                <span className="event-month">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</span>
              </div>
              <div className="event-details">
                <h3>{event.title}</h3>
                <div className="event-meta">
                  {event.time && <span><Clock size={14} /> {event.time}</span>}
                  {event.location && <span><MapPin size={14} /> {event.location}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
        <a href={data.quickLinks.find(l => l.title.includes('Calendar'))?.url} target="_blank" rel="noopener noreferrer" className="view-all-link">
          View Full Calendar <ChevronRight size={16} />
        </a>
      </section>

      {/* Documents */}
      <section id="documents" className="documents-section">
        <h2>Important Documents</h2>
        <div className="documents-grid">
          {data.documents.map(doc => (
            <a key={doc.id} href={doc.url} target="_blank" rel="noopener noreferrer" className="document-card">
              <FileText size={20} />
              <div>
                <span className="doc-title">{doc.title}</span>
                <span className="doc-category">{doc.category}</span>
              </div>
              <ExternalLink size={14} className="arrow" />
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-info">
            <img src="/artios-logo.png" alt="Artios Academies" className="footer-logo" />
            <p>{data.schoolInfo.name}</p>
            <p>{data.schoolInfo.address}</p>
            <p>Contact: {data.schoolInfo.email}</p>
          </div>
          <div className="footer-links">
            <a href={data.quickLinks.find(l => l.title.includes('Website'))?.url} target="_blank" rel="noopener noreferrer">School Website</a>
            <a href={data.quickLinks.find(l => l.title.includes('Portal'))?.url} target="_blank" rel="noopener noreferrer">Parent Portal</a>
            <button onClick={() => setShowAdminLogin(true)} className="admin-link">Admin Login</button>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Artios Academies of Sugar Hill. All rights reserved.</p>
        </div>
      </footer>

      {/* Chat Widget */}
      <ChatWidget isOpen={chatOpen} onClose={() => setChatOpen(false)} />

      {/* Chat Toggle Button (when chat is closed) */}
      {!chatOpen && (
        <button className="chat-toggle" onClick={() => setChatOpen(true)}>
          <MessageCircle size={24} />
        </button>
      )}

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div className="modal-overlay" onClick={() => setShowAdminLogin(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Admin Login</h3>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
              placeholder="Enter password"
              autoFocus
            />
            <div className="modal-actions">
              <button onClick={() => setShowAdminLogin(false)} className="btn-cancel">Cancel</button>
              <button onClick={handleAdminLogin} className="btn-primary">Login</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

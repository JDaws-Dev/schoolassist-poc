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
  Info,
  Lock,
  Bot,
  Eye,
  EyeOff,
  GraduationCap,
  HelpCircle,
  Heart,
  CalendarPlus,
  Phone,
  Mail,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Facebook,
  Download
} from 'lucide-react';

// Auto-detect API URL
const API_URL = import.meta.env.DEV ? 'http://localhost:3001' : '';
const generateSessionId = () => 'session-' + Math.random().toString(36).substr(2, 9);

// Initial data - this would come from a database in production
const initialData = {
  quickLinks: [
    // Essential - Daily Use
    { id: 1, title: 'FACTS Family Portal', url: 'https://accounts.renweb.com/Account/Login', icon: 'users', category: 'Essential' },
    { id: 2, title: 'Artios 2025-2026 Calendar', url: 'https://calendar.google.com/calendar/embed?src=c_f1e327887d2f9739ac02c84e80fe02dceec209d06b4755d72eb5358c6ce9016b%40group.calendar.google.com&ctz=America%2FNew_York', icon: 'calendar', category: 'Essential' },
    { id: 3, title: 'Artios Cafe Lunch Order', url: 'http://artioscafe.com', icon: 'external', category: 'Essential' },
    // Events - Eventbrite (Open House, Plot Twist, Pilgrim's Progress)
    { id: 4, title: 'Artios Events (Eventbrite)', url: 'https://www.eventbrite.com/o/artios-academies-of-sugar-hill-8358455471', icon: 'calendar', category: 'Events', description: 'Open House, Plot Twist, Pilgrims Progress' },
    // Newsletters
    { id: 5, title: 'The Elementary Connection - December', url: 'https://www.canva.com/design/DAG7VDbHm7U/YhxiSMtoI-4m4CoxQR9ljA/view?utm_content=DAG7VDbHm7U&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h88f5d4bf16', icon: 'book', category: 'Newsletters' },
    { id: 6, title: 'The Choir Wire - November', url: 'https://drive.google.com/file/d/1eC5Dd2ZQRRUX-nX1P6CXcNDxtZePUlCh/view?usp=drive_link', icon: 'book', category: 'Newsletters' },
    // Parent Partnership Meeting Signup
    { id: 7, title: 'John Lane', url: 'https://calendar.app.google/1xHHZDQVMThZCspaA', icon: 'calendar', category: 'Parent Partnership Meetings' },
    { id: 8, title: 'Jackie Thompson', url: 'https://calendly.com/artiosacademies/parent-partnership-meetings-2025', icon: 'calendar', category: 'Parent Partnership Meetings' },
    { id: 9, title: 'Becky Buckwalter', url: 'https://calendar.app.google/WdVubvYxeKdJihpXA', icon: 'calendar', category: 'Parent Partnership Meetings' },
    // Volunteer
    { id: 10, title: 'Parent TA Sub Signup', url: 'https://www.signupgenius.com/go/10C0549AAA82CA4F49-58166214-parent#', icon: 'users', category: 'Volunteer' },
    // Shopping
    { id: 11, title: 'Winter Wear', url: 'https://duesouthdesigns.net/school-orders', icon: 'external', category: 'Shopping' },
    // Artios At Home Podcast
    { id: 12, title: 'Artios At Home - Apple Podcasts', url: 'https://podcasts.apple.com/us/podcast/artios-at-home-artios-of-sugar-hill/id1840924354', icon: 'external', category: 'Artios At Home Podcast' },
    { id: 13, title: 'Artios At Home - Spotify', url: 'https://open.spotify.com/show/2GBsiEESrmOgtUaY8r2TQW', icon: 'external', category: 'Artios At Home Podcast' },
  ],
  // FAQ for common parent questions
  faq: [
    { id: 1, question: 'What time does school start?', answer: 'Elementary: 8:30 AM - 2:30 PM. Secondary (JH/HS): 8:30 AM - 3:00 PM. Students should arrive 10-15 minutes early.' },
    { id: 2, question: 'What is a University-Model school?', answer: 'Artios is a homeschool hybrid where students attend on-campus classes certain days and complete assignments at home on other days. Parents partner with teachers but do not need to teach academic content.' },
    { id: 3, question: 'What is the dress code?', answer: 'Modest, neat attire appropriate for a Christian academic environment. No offensive graphics, appropriate length shorts/skirts, closed-toe shoes recommended. See the Student Handbook for full details.' },
    { id: 4, question: 'How do I order lunch?', answer: 'Order through ArtiosCafe.com by 10 AM on class days. Orders cannot be placed same-day after the deadline. Students may also bring lunch from home.' },
    { id: 5, question: 'What is the weather/closure policy?', answer: 'If Gwinnett County or Forsyth County public schools close due to weather, Artios closes. Check email/text alerts and social media for announcements.' },
    { id: 6, question: 'Do parents have to stay on campus?', answer: 'No, parents do not need to stay on campus during the school day. However, parent volunteers are always welcome to help with various activities.' },
    { id: 7, question: 'How do I contact my child\'s teacher?', answer: 'Use the FACTS Family Portal to message teachers directly, or email them using their @artiosacademies.com address. Response time is typically within 24-48 hours.' },
    { id: 8, question: 'What grades does Artios serve?', answer: 'Artios serves K-12 students with Elementary (K-5), Junior High (6-8), and High School (9-12) divisions.' },
  ],
  // Staff directory
  staffDirectory: [
    { id: 1, name: 'John Lane', title: 'Director', email: 'jmlane@artiosacademies.com', department: 'Administration' },
    { id: 2, name: 'Office Staff', title: 'Front Office', email: 'office@artiosacademies.com', department: 'Administration' },
  ],
  // New family onboarding checklist
  onboardingSteps: [
    { id: 1, title: 'Complete FACTS Enrollment', description: 'Finish all enrollment forms in the FACTS Family Portal', icon: 'file', link: 'https://accounts.renweb.com/Account/Login' },
    { id: 2, title: 'Read the Student Handbook', description: 'Review policies, dress code, and expectations', icon: 'book', link: '#' },
    { id: 3, title: 'Set Up Lunch Ordering', description: 'Create your ArtiosCafe.com account for meal orders', icon: 'external', link: 'https://artioscafe.com' },
    { id: 4, title: 'Join Class Communication', description: 'Check FACTS for teacher contacts and class info', icon: 'users', link: 'https://accounts.renweb.com/Account/Login' },
    { id: 5, title: 'Mark Your Calendar', description: 'Add school events and important dates', icon: 'calendar', link: 'https://calendar.google.com/calendar/embed?src=c_f1e327887d2f9739ac02c84e80fe02dceec209d06b4755d72eb5358c6ce9016b%40group.calendar.google.com' },
    { id: 6, title: 'Learn About Artios', description: 'Understand our university-model approach', icon: 'info', link: '#' },
  ],
  // Community resources
  communityResources: [
    { id: 1, title: 'Artios Facebook Group', url: 'https://facebook.com/artiosacademies', icon: 'users', description: 'Join our parent community' },
    { id: 2, title: 'Volunteer Opportunities', url: 'https://www.signupgenius.com/go/10C0549AAA82CA4F49-58166214-parent', icon: 'heart', description: 'Sign up to help at school' },
    { id: 3, title: 'Prayer Requests', url: '#', icon: 'heart', description: 'Submit prayer requests for our community' },
  ],
  // Class Schedules - 2025-2026
  schedules: {
    overview: [
      { id: 1, level: 'Elementary (K-5)', days: 'Tue/Thu', hours: '8:30 AM - 2:30 PM' },
      { id: 2, level: 'Junior High (6-8)', days: 'Tue/Thu', hours: '8:30 AM - 3:00 PM' },
      { id: 3, level: 'High School (9-12)', days: 'Tue/Thu', hours: '8:30 AM - 3:00 PM' },
      { id: 4, level: 'HS Arts Conservatory', days: 'Friday', hours: '9:00 AM - 3:30 PM' },
    ],
    // Friday HS Arts Conservatory classes
    fridayArts: [
      { id: 1, time: '9:00-9:30 AM', classes: ['HS Choreo Club I', 'Photography', 'Music Theory I', 'Engineering 1', 'Fundamentals of Visual Arts', 'Directing', 'Acting I', 'Elements of Production'] },
      { id: 2, time: '10:00-10:30 AM', classes: ['DM Ballet', 'Yearbook Club', 'Fundamentals of Film History', 'Fundamentals of Music', 'Worship Arts', 'Drawing/Painting I', 'Studio M I/II', 'Acting II', 'Worldview 10'] },
      { id: 3, time: '11:00-11:30 AM', classes: ['Conditioning', 'Graphic Design', 'Intro to CT & EC', 'Creative Writing I/II', 'Worldview 9-12', 'Drawing/Painting II', 'Fundamentals of Theatre History', 'Acting III'] },
      { id: 4, time: '12:00-12:30 PM', classes: ['Lunch'] },
      { id: 5, time: '12:30-1:00 PM', classes: ['Makeup', '3D Design 1', 'Illustrations', 'Worldview 9-12'] },
      { id: 6, time: '1:30-2:00 PM', classes: ['JH Contemporary', 'Editing I', 'Choir'] },
      { id: 7, time: '2:30-2:45 PM', classes: ['JH Hip Hop', 'Drama Club'] },
      { id: 8, time: '3:30-4:30 PM', classes: ['UE/JH Select Ballet (audition only)'] },
    ],
    // Monday Dance Classes (tentative)
    mondayDance: [
      { id: 1, time: '9:30-10:30 AM', name: 'Jazz IV' },
      { id: 2, time: '10:30-11:30 AM', name: 'Hip Hop I / Contemporary III/IV / Jazz III' },
      { id: 3, time: '11:30-12:30 PM', name: 'Advanced Hip Hop' },
      { id: 4, time: '1:00-2:30 PM', name: 'Ballet' },
      { id: 5, time: '1:30-2:30 PM', name: 'Contemporary I/II (HS)' },
      { id: 6, time: '2:40-3:30 PM', name: 'Elementary Jazz A & B' },
      { id: 7, time: '3:30-4:15 PM', name: 'Elementary Hip Hop (Grades 4-6)' },
    ],
    artClub: {
      name: 'Lower Elementary Art Club',
      grades: 'K-3rd',
      time: '2:00-2:30 PM',
    },
  },
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
    { id: 5, title: 'Absence/Early Dismissal Form', url: '#', category: 'Forms' },
    { id: 6, title: 'Field Trip Permission Form', url: '#', category: 'Forms' },
    { id: 7, title: 'Medical Authorization Form', url: '#', category: 'Forms' },
    { id: 8, title: 'Carpool Authorization Form', url: '#', category: 'Forms' },
  ],
  schoolInfo: {
    name: 'Artios Academies of Sugar Hill',
    tagline: 'Art. Heart. Smart.',
    address: 'Sugar Hill, Georgia',
    phone: '',
    email: 'jmlane@artiosacademies.com',
    director: 'John Lane'
  },
  aiSettings: {
    systemPrompt: `You are ArtiosConnect, the friendly AI assistant for Artios Academies of Sugar Hill, Georgia.

SCHOOL INFO:
- Name: Artios Academies of Sugar Hill
- Type: Homeschool Hybrid / University-Model
- Tagline: Art. Heart. Smart.
- Director: John Lane (jmlane@artiosacademies.com)

SCHEDULE:
- Elementary: 8:30 AM - 2:30 PM
- Secondary: 8:30 AM - 3:00 PM
- Artios is a university-model program - students attend on campus certain days, complete work at home other days

COMMON QUESTIONS:
- Dress code: Modest, neat attire appropriate for a Christian academic environment
- Parents don't have to teach or stay on campus
- Lunch ordering: ArtiosCafe.com by 10 AM on class days
- Weather policy: If Gwinnett/Forsyth County schools close, Artios closes

INSTRUCTIONS:
1. Be concise and friendly
2. No markdown formatting (no **, ##, etc)
3. For student-specific info, direct to Parent Portal
4. For sensitive topics, recommend contacting Mr. Lane directly`,
    customInstructions: [],
    sensitiveTopics: 'For sensitive topics (gender identity, bullying, mental health, family situations, faith questions, discipline), always recommend contacting Mr. Lane directly for a personal conversation.'
  },
  parentCredentials: {
    // In production, this would be proper authentication
    password: 'artios2026'
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
    heart: Heart,
    phone: Phone,
    mail: Mail,
    graduation: GraduationCap,
    help: HelpCircle,
    check: CheckCircle,
    download: Download,
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

// AI Settings Panel for Admin
const AISettingsPanel = ({ data, setData }) => {
  const [testMessages, setTestMessages] = useState([]);
  const [testInput, setTestInput] = useState('');
  const [testLoading, setTestLoading] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  const sendTestMessage = async () => {
    if (!testInput.trim() || testLoading) return;
    const userMessage = testInput.trim();
    setTestInput('');
    setTestMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setTestLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          sessionId: 'admin-test-' + Date.now(),
          customPrompt: data.aiSettings?.systemPrompt
        })
      });
      const result = await response.json();
      setTestMessages(prev => [...prev, { role: 'assistant', content: result.message || 'No response' }]);
    } catch (error) {
      setTestMessages(prev => [...prev, { role: 'assistant', content: 'Error: ' + error.message }]);
    }
    setTestLoading(false);
  };

  const updateAISettings = (field, value) => {
    setData(prev => ({
      ...prev,
      aiSettings: { ...prev.aiSettings, [field]: value }
    }));
  };

  return (
    <div className="ai-settings-panel">
      <div className="ai-settings-section">
        <div className="ai-settings-header">
          <h3><Bot size={18} /> System Prompt (AI Directives)</h3>
          <button onClick={() => setShowPrompt(!showPrompt)} className="btn-toggle">
            {showPrompt ? <EyeOff size={16} /> : <Eye size={16} />}
            {showPrompt ? 'Hide' : 'Show'}
          </button>
        </div>
        <p className="ai-settings-desc">This is what the AI assistant knows and how it behaves. Edit carefully.</p>
        {showPrompt && (
          <textarea
            value={data.aiSettings?.systemPrompt || ''}
            onChange={(e) => updateAISettings('systemPrompt', e.target.value)}
            className="ai-prompt-editor"
            rows={15}
          />
        )}
      </div>

      <div className="ai-settings-section">
        <h3><Settings size={18} /> Sensitive Topics Guidance</h3>
        <textarea
          value={data.aiSettings?.sensitiveTopics || ''}
          onChange={(e) => updateAISettings('sensitiveTopics', e.target.value)}
          className="ai-prompt-editor"
          rows={4}
          placeholder="Instructions for handling sensitive topics..."
        />
      </div>

      <div className="ai-settings-section">
        <h3><MessageCircle size={18} /> Test AI Responses</h3>
        <p className="ai-settings-desc">Test how the AI responds to questions before parents see it.</p>
        <div className="ai-test-chat">
          <div className="ai-test-messages">
            {testMessages.length === 0 && (
              <p className="ai-test-placeholder">Send a test message to see how the AI responds...</p>
            )}
            {testMessages.map((msg, i) => (
              <div key={i} className={`ai-test-message ${msg.role}`}>
                <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.content}
              </div>
            ))}
            {testLoading && <div className="ai-test-message assistant">Thinking...</div>}
          </div>
          <div className="ai-test-input">
            <input
              type="text"
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendTestMessage()}
              placeholder="Test a question..."
            />
            <button onClick={sendTestMessage} disabled={testLoading}><Send size={16} /></button>
          </div>
        </div>
        <button onClick={() => setTestMessages([])} className="btn-clear-chat">Clear Test Chat</button>
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

    if (type === 'documents') {
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
              <input type="url" value={item.url} onChange={(e) => updateItem(type, item.id, { url: e.target.value })} placeholder="Document URL" />
              <select value={item.category} onChange={(e) => updateItem(type, item.id, { category: e.target.value })}>
                <option value="Policies">Policies</option>
                <option value="Calendar">Calendar</option>
                <option value="Resources">Resources</option>
                <option value="Forms">Forms</option>
              </select>
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  const resetToDefaults = () => {
    if (confirm('Reset all content to defaults? This cannot be undone.')) {
      setData(initialData);
      localStorage.removeItem('artiosConnectData');
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-header-actions">
          <button onClick={resetToDefaults} className="btn-reset">Reset to Defaults</button>
          <button onClick={onLogout} className="btn-logout"><LogOut size={18} /> Logout</button>
        </div>
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
        <button className={activeTab === 'documents' ? 'active' : ''} onClick={() => setActiveTab('documents')}>
          <FileText size={16} /> Documents
        </button>
        <button className={activeTab === 'aiSettings' ? 'active' : ''} onClick={() => setActiveTab('aiSettings')}>
          <Bot size={16} /> AI Settings
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'aiSettings' ? (
          <AISettingsPanel data={data} setData={setData} />
        ) : (
          <>
            <div className="admin-section-header">
              <h2>{activeTab === 'announcements' ? 'Announcements' : activeTab === 'upcomingEvents' ? 'Upcoming Events' : activeTab === 'quickLinks' ? 'Quick Links' : 'Documents'}</h2>
              <button onClick={() => addItem(activeTab)} className="btn-add"><Plus size={16} /> Add New</button>
            </div>

            <div className="admin-list">
              {data[activeTab]?.map(item => (
                <React.Fragment key={item.id}>
                  {renderEditor(activeTab, item)}
                </React.Fragment>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Suggested questions for parents
const suggestedQuestions = [
  "When is spring break?",
  "What's the dress code?",
  "What time does school start?",
  "How do I order lunch?",
  "When is the next performance?",
  "What's the weather policy?"
];

// FAQ Accordion Component
const FAQSection = ({ faqItems }) => {
  const [openItem, setOpenItem] = useState(null);

  return (
    <section id="faq" className="faq-section">
      <h2><HelpCircle size={24} /> Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqItems.map(item => (
          <div key={item.id} className={`faq-item ${openItem === item.id ? 'open' : ''}`}>
            <button className="faq-question" onClick={() => setOpenItem(openItem === item.id ? null : item.id)}>
              <span>{item.question}</span>
              <ChevronRight size={18} className={`faq-arrow ${openItem === item.id ? 'rotated' : ''}`} />
            </button>
            {openItem === item.id && (
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

// New Family Onboarding Banner
const OnboardingBanner = ({ steps, onDismiss }) => {
  const [dismissed, setDismissed] = useState(() => {
    return sessionStorage.getItem('onboardingDismissed') === 'true';
  });
  const [completedSteps, setCompletedSteps] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('onboardingCompleted') || '[]');
    } catch { return []; }
  });

  const toggleStep = (stepId) => {
    const newCompleted = completedSteps.includes(stepId)
      ? completedSteps.filter(id => id !== stepId)
      : [...completedSteps, stepId];
    setCompletedSteps(newCompleted);
    localStorage.setItem('onboardingCompleted', JSON.stringify(newCompleted));
  };

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem('onboardingDismissed', 'true');
  };

  if (dismissed) return null;

  const progress = Math.round((completedSteps.length / steps.length) * 100);

  return (
    <section className="onboarding-banner">
      <div className="onboarding-header">
        <div className="onboarding-title">
          <Sparkles size={24} />
          <div>
            <h2>New to Artios?</h2>
            <p>Complete these steps to get started at Artios Academies</p>
          </div>
        </div>
        <button onClick={handleDismiss} className="onboarding-dismiss"><X size={18} /></button>
      </div>
      <div className="onboarding-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <span>{completedSteps.length} of {steps.length} completed</span>
      </div>
      <div className="onboarding-steps">
        {steps.map(step => (
          <div key={step.id} className={`onboarding-step ${completedSteps.includes(step.id) ? 'completed' : ''}`}>
            <button className="step-checkbox" onClick={() => toggleStep(step.id)}>
              {completedSteps.includes(step.id) ? <CheckCircle size={20} /> : <div className="checkbox-empty" />}
            </button>
            <div className="step-content">
              <h4>{step.title}</h4>
              <p>{step.description}</p>
            </div>
            {step.link && step.link !== '#' && (
              <a href={step.link} target="_blank" rel="noopener noreferrer" className="step-link">
                <ArrowRight size={16} />
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

// Staff Directory Component
const StaffDirectory = ({ staff }) => {
  return (
    <section id="staff" className="staff-section">
      <h2><Users size={24} /> Staff Directory</h2>
      <div className="staff-grid">
        {staff.map(person => (
          <div key={person.id} className="staff-card">
            <div className="staff-avatar">
              <Users size={24} />
            </div>
            <div className="staff-info">
              <h3>{person.name}</h3>
              <p className="staff-title">{person.title}</p>
              <p className="staff-dept">{person.department}</p>
            </div>
            <a href={`mailto:${person.email}`} className="staff-email">
              <Mail size={16} /> Email
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

// Community Resources Component
const CommunitySection = ({ resources }) => {
  return (
    <section id="community" className="community-section">
      <h2><Heart size={24} /> Community & Parent Resources</h2>
      <div className="community-grid">
        {resources.map(resource => (
          <a key={resource.id} href={resource.url} target="_blank" rel="noopener noreferrer" className="community-card">
            <IconComponent name={resource.icon} size={24} />
            <div>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
            </div>
            <ChevronRight size={16} className="arrow" />
          </a>
        ))}
      </div>
    </section>
  );
};

// Schedule Section Component
const ScheduleSection = ({ schedules }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!schedules) return null;

  return (
    <section id="schedule" className="schedule-section">
      <h2><GraduationCap size={24} /> Class Schedules 2025-2026</h2>
      <div className="schedule-tabs">
        <button className={`schedule-tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
          School Hours
        </button>
        <button className={`schedule-tab ${activeTab === 'friday' ? 'active' : ''}`} onClick={() => setActiveTab('friday')}>
          Friday Arts
        </button>
        <button className={`schedule-tab ${activeTab === 'dance' ? 'active' : ''}`} onClick={() => setActiveTab('dance')}>
          Monday Dance
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="schedule-grid">
          {schedules.overview?.map(item => (
            <div key={item.id} className="schedule-item overview-item">
              <span className="schedule-level">{item.level}</span>
              <span className="schedule-days">{item.days}</span>
              <span className="schedule-hours">{item.hours}</span>
            </div>
          ))}
          {schedules.artClub && (
            <div className="schedule-item overview-item art-club">
              <span className="schedule-level">{schedules.artClub.name}</span>
              <span className="schedule-days">Grades {schedules.artClub.grades}</span>
              <span className="schedule-hours">{schedules.artClub.time}</span>
            </div>
          )}
        </div>
      )}

      {activeTab === 'friday' && (
        <div className="schedule-grid friday-grid">
          <p className="schedule-note">HS Arts Conservatory - Friday Schedule</p>
          {schedules.fridayArts?.map(item => (
            <div key={item.id} className="schedule-item friday-item">
              <span className="schedule-time">{item.time}</span>
              <span className="schedule-classes">{item.classes.join(' | ')}</span>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'dance' && (
        <div className="schedule-grid">
          <p className="schedule-note">Tentative Monday Dance Schedule</p>
          {schedules.mondayDance?.map(item => (
            <div key={item.id} className="schedule-item">
              <span className="schedule-time">{item.time}</span>
              <span className="schedule-class">{item.name}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

// Generate ICS download link for an event
const generateICSFile = (event) => {
  const startDate = new Date(event.date);
  if (event.time && event.time !== 'All Day') {
    const [time, period] = event.time.split(' ');
    const [hours, minutes] = time.split(':');
    let hour = parseInt(hours);
    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;
    startDate.setHours(hour, parseInt(minutes) || 0, 0);
  }
  const endDate = new Date(startDate);
  endDate.setHours(endDate.getHours() + 2);

  const formatDate = (date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Artios Connect//EN
BEGIN:VEVENT
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:${event.title}
LOCATION:${event.location || 'Artios Academies'}
DESCRIPTION:Artios Academies Event
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([icsContent], { type: 'text/calendar' });
  return URL.createObjectURL(blob);
};

// Welcome Page Component
const WelcomePage = ({ onBack, onOpenChat }) => {
  return (
    <div className="welcome-page">
      <header className="welcome-page-header">
        <button onClick={onBack} className="back-btn">
          <ChevronRight size={20} className="back-arrow" /> Back to Home
        </button>
      </header>

      <div className="welcome-hero">
        <Sparkles size={48} />
        <h1>Welcome to Artios!</h1>
        <p>Everything you need to know as a new Artios family</p>
      </div>

      <div className="welcome-content">
        <div className="welcome-grid">
          <div className="welcome-card highlight">
            <h3>What is Artios?</h3>
            <p>Artios Academies is a University-Model homeschool hybrid where students attend on-campus classes certain days and complete assignments at home on other days.</p>
            <p><strong>Tagline:</strong> Art. Heart. Smart.</p>
            <p>Parents partner with teachers but do not need to teach academic content. We believe in educating the whole child - mind, body, and spirit.</p>
          </div>

          <div className="welcome-card">
            <h3>School Hours</h3>
            <ul>
              <li><strong>Elementary (K-6):</strong> 8:30 AM - 2:30 PM</li>
              <li><strong>Junior High (7-8):</strong> 8:30 AM - 3:00 PM</li>
              <li><strong>High School (9-12):</strong> 8:30 AM - 3:00 PM</li>
            </ul>
            <p>Please arrive 10-15 minutes early for drop-off.</p>
          </div>

          <div className="welcome-card">
            <h3>Getting Started Checklist</h3>
            <ul className="welcome-checklist">
              <li>Complete all FACTS enrollment forms</li>
              <li>Read the Student Handbook thoroughly</li>
              <li>Set up your ArtiosCafe.com account for lunch orders</li>
              <li>Add the school calendar to your phone</li>
              <li>Join your grade-level communication groups</li>
              <li>Review the dress code policy</li>
              <li>Set up carpool arrangements if needed</li>
            </ul>
          </div>

          <div className="welcome-card">
            <h3>Lunch Ordering</h3>
            <p>Order lunch through <a href="http://artioscafe.com" target="_blank" rel="noopener noreferrer">ArtiosCafe.com</a> by <strong>10 AM on class days</strong>.</p>
            <p>Orders cannot be placed same-day after the deadline. Students may also bring lunch from home.</p>
            <a href="http://artioscafe.com" target="_blank" rel="noopener noreferrer" className="welcome-link">
              Visit Artios Cafe <ExternalLink size={14} />
            </a>
          </div>

          <div className="welcome-card">
            <h3>Weather Policy</h3>
            <p>If <strong>Gwinnett County</strong> or <strong>Forsyth County</strong> public schools close due to weather, Artios closes.</p>
            <p>Check email/text alerts and social media for announcements. When in doubt, check FACTS or contact the office.</p>
          </div>

          <div className="welcome-card">
            <h3>Dress Code Basics</h3>
            <p>Modest, neat attire appropriate for a Christian academic environment:</p>
            <ul>
              <li>No offensive graphics or slogans</li>
              <li>Appropriate length shorts and skirts</li>
              <li>Closed-toe shoes recommended</li>
              <li>See the Student Handbook for full details</li>
            </ul>
          </div>

          <div className="welcome-card">
            <h3>Important Links</h3>
            <div className="welcome-links">
              <a href="https://accounts.renweb.com/Account/Login" target="_blank" rel="noopener noreferrer" className="welcome-link">
                <Users size={16} /> FACTS Family Portal
              </a>
              <a href="https://calendar.google.com/calendar/embed?src=c_f1e327887d2f9739ac02c84e80fe02dceec209d06b4755d72eb5358c6ce9016b%40group.calendar.google.com&ctz=America%2FNew_York" target="_blank" rel="noopener noreferrer" className="welcome-link">
                <Calendar size={16} /> School Calendar
              </a>
              <a href="http://artioscafe.com" target="_blank" rel="noopener noreferrer" className="welcome-link">
                <ExternalLink size={16} /> Lunch Ordering
              </a>
            </div>
          </div>

          <div className="welcome-card">
            <h3>Questions?</h3>
            <p>Contact Director <strong>John Lane</strong> at:</p>
            <p><a href="mailto:jmlane@artiosacademies.com">jmlane@artiosacademies.com</a></p>
            <p>Or use our AI assistant to get quick answers about policies, schedules, and more!</p>
            <button onClick={onOpenChat} className="btn-welcome-chat">
              <MessageCircle size={18} /> Ask a Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function App() {
  // Load data from localStorage or use defaults
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('artiosConnectData');
      return saved ? { ...initialData, ...JSON.parse(saved) } : initialData;
    } catch {
      return initialData;
    }
  });
  const [chatOpen, setChatOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isParentLoggedIn, setIsParentLoggedIn] = useState(() => {
    return sessionStorage.getItem('parentLoggedIn') === 'true';
  });
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showParentLogin, setShowParentLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [parentPassword, setParentPassword] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home'); // 'home' or 'welcome'

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('artiosConnectData', JSON.stringify({
      quickLinks: data.quickLinks,
      announcements: data.announcements,
      upcomingEvents: data.upcomingEvents,
      documents: data.documents,
      aiSettings: data.aiSettings
    }));
  }, [data]);

  // Parent login
  const handleParentLogin = () => {
    if (parentPassword === 'artios2026') {
      setIsParentLoggedIn(true);
      sessionStorage.setItem('parentLoggedIn', 'true');
      setShowParentLogin(false);
      setParentPassword('');
    } else {
      alert('Incorrect password');
    }
  };

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

  // Welcome page view
  if (currentView === 'welcome') {
    return (
      <>
        <WelcomePage onBack={() => setCurrentView('home')} onOpenChat={() => setChatOpen(true)} />
        <ChatWidget isOpen={chatOpen} onClose={() => setChatOpen(false)} />
        {!chatOpen && (
          <button className="chat-toggle" onClick={() => setChatOpen(true)}>
            <MessageCircle size={24} />
          </button>
        )}
      </>
    );
  }

  // Parent login screen
  if (!isParentLoggedIn) {
    return (
      <div className="login-screen">
        <div className="login-card">
          <img src="/artios-logo.png" alt="Artios Academies" className="login-logo" />
          <h1>Artios Connect</h1>
          <p>Parent Information Portal</p>
          <div className="login-form">
            <div className="login-input-group">
              <Lock size={18} />
              <input
                type="password"
                value={parentPassword}
                onChange={(e) => setParentPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleParentLogin()}
                placeholder="Enter parent password"
                autoFocus
              />
            </div>
            <button onClick={handleParentLogin} className="btn-login">
              Sign In
            </button>
          </div>
          <p className="login-help">Contact the school office if you need the password.</p>
        </div>
      </div>
    );
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
            <a href="#schedule">Schedule</a>
            <a href="#faq">FAQ</a>
            <button onClick={() => setCurrentView('welcome')} className="nav-link-btn">New Families</button>
            <button onClick={() => setChatOpen(true)} className="nav-chat-btn">
              <MessageCircle size={18} /> Ask AI
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
            <a href="#schedule" onClick={() => setMobileMenuOpen(false)}>Schedule</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
            <button onClick={() => { setCurrentView('welcome'); setMobileMenuOpen(false); }} className="nav-link-btn">New Families</button>
            <button onClick={() => { setChatOpen(true); setMobileMenuOpen(false); }} className="nav-chat-btn">
              <MessageCircle size={18} /> Ask AI
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

      {/* New Families Welcome Banner */}
      <section className="new-families-banner">
        <div className="new-families-content">
          <Sparkles size={24} />
          <div>
            <h3>New to Artios?</h3>
            <p>Learn everything you need to know to get started!</p>
          </div>
          <a href="#welcome" className="btn-welcome">
            Welcome Guide <ArrowRight size={16} />
          </a>
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


      {/* Ask AI Section - Prominent */}
      <section id="ask" className="ask-ai-section">
        <div className="ask-ai-content">
          <div className="ask-ai-icon">
            <Bot size={48} />
          </div>
          <h2>Have a Question?</h2>
          <p>Ask our AI assistant about schedules, policies, events, and more!</p>
          <button onClick={() => setChatOpen(true)} className="ask-ai-button">
            <MessageCircle size={20} /> Ask a Question
          </button>
          <div className="suggested-questions">
            <p className="suggested-label">Try asking:</p>
            <div className="suggested-chips">
              {suggestedQuestions.map((q, i) => (
                <button key={i} onClick={() => { setChatOpen(true); }} className="suggested-chip">
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links - Organized by Category */}
      <section id="links" className="quick-links-section">
        <h2>Quick Links</h2>
        {(() => {
          const categories = [...new Set(data.quickLinks.map(l => l.category || 'Other'))];
          return categories.map(category => (
            <div key={category} className="quick-links-category">
              <h3 className="category-title">{category}</h3>
              <div className="quick-links-grid">
                {data.quickLinks.filter(l => (l.category || 'Other') === category).map(link => (
                  <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="quick-link-card">
                    <IconComponent name={link.icon} size={24} />
                    <span>{link.title}</span>
                    <ChevronRight size={16} className="arrow" />
                  </a>
                ))}
              </div>
            </div>
          ));
        })()}
      </section>

      {/* Upcoming Events */}
      <section id="events" className="events-section">
        <h2>Upcoming Events</h2>
        <div className="events-list">
          {upcomingEvents.map(event => {
            const eventDate = new Date(event.date);
            const calendarUrl = `https://calendar.google.com/calendar/embed?src=c_f1e327887d2f9739ac02c84e80fe02dceec209d06b4755d72eb5358c6ce9016b%40group.calendar.google.com&mode=DAY&dates=${event.date.replace(/-/g, '')}`;
            return (
              <div key={event.id} className="event-card-wrapper">
                <a href={calendarUrl} target="_blank" rel="noopener noreferrer" className="event-card clickable">
                  <div className="event-date">
                    <span className="event-day">{eventDate.getDate()}</span>
                    <span className="event-month">{eventDate.toLocaleDateString('en-US', { month: 'short' })}</span>
                  </div>
                  <div className="event-details">
                    <h3>{event.title}</h3>
                    <div className="event-meta">
                      {event.time && <span><Clock size={14} /> {event.time}</span>}
                      {event.location && <span><MapPin size={14} /> {event.location}</span>}
                    </div>
                  </div>
                  <ChevronRight size={16} className="event-arrow" />
                </a>
                <a
                  href={generateICSFile(event)}
                  download={`${event.title.replace(/\s+/g, '-')}.ics`}
                  className="add-to-calendar-btn"
                  title="Add to Calendar"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Download size={16} />
                </a>
              </div>
            );
          })}
        </div>
        <a href={data.quickLinks.find(l => l.title.includes('Calendar'))?.url} target="_blank" rel="noopener noreferrer" className="view-all-link">
          View Full Calendar <ChevronRight size={16} />
        </a>
      </section>

      {/* Documents - Organized by Category */}
      <section id="documents" className="documents-section">
        <h2>Important Documents</h2>
        {(() => {
          const categories = [...new Set(data.documents.map(d => d.category))];
          return categories.map(category => (
            <div key={category} className="documents-category">
              <h3 className="category-title">{category}</h3>
              <div className="documents-grid">
                {data.documents.filter(d => d.category === category).map(doc => (
                  <a key={doc.id} href={doc.url} target="_blank" rel="noopener noreferrer" className="document-card">
                    <FileText size={20} />
                    <div>
                      <span className="doc-title">{doc.title}</span>
                    </div>
                    <ExternalLink size={14} className="arrow" />
                  </a>
                ))}
              </div>
            </div>
          ));
        })()}
      </section>

      {/* Schedule Section */}
      <ScheduleSection schedules={data.schedules || initialData.schedules} />

      {/* FAQ Section */}
      <FAQSection faqItems={data.faq || initialData.faq} />

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

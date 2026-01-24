import React, { useState, useEffect } from 'react';
import { Lock, Settings } from 'lucide-react';

// Import UI components - 4-tab navigation architecture
import {
  AdminPanel,
  HomeTab,
  ChatTab,
  CalendarTab,
} from './components';
import TabNavigation from './components/TabNavigation';
import MoreTab from './components/MoreTab';

// Import data
import initialData from './data/initialData';

// Check if we're on the admin page
const isAdminPage = window.location.pathname === '/admin' || window.location.pathname === '/admin/';

// Main App Component
export default function App() {
  // Load data from localStorage or use defaults
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('artiosConnectData');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...initialData,
          ...parsed,
          quickLinks: initialData.quickLinks,
          faq: initialData.faq,
          schedules: initialData.schedules,
          schoolInfo: initialData.schoolInfo,
          upcomingEvents: initialData.upcomingEvents,
        };
      }
      return initialData;
    } catch {
      return initialData;
    }
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return sessionStorage.getItem('adminLoggedIn') === 'true';
  });
  const [isParentLoggedIn, setIsParentLoggedIn] = useState(() => {
    return sessionStorage.getItem('parentLoggedIn') === 'true';
  });
  const [activeTab, setActiveTab] = useState('home');
  const [pendingQuestion, setPendingQuestion] = useState(null);
  const [adminPassword, setAdminPassword] = useState('');
  const [parentPassword, setParentPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('artiosConnectData', JSON.stringify({
      quickLinks: data.quickLinks,
      announcements: data.announcements,
      upcomingEvents: data.upcomingEvents,
      documents: data.documents,
      aiSettings: data.aiSettings,
      notifications: data.notifications,
      aiKnowledge: data.aiKnowledge
    }));
  }, [data]);

  // Parent login
  const handleParentLogin = () => {
    if (parentPassword === 'artios2026') {
      setLoginError('');
      setIsParentLoggedIn(true);
      sessionStorage.setItem('parentLoggedIn', 'true');
      setParentPassword('');
    } else {
      setLoginError('Incorrect password. Please try again.');
      setParentPassword('');
    }
  };

  // Admin login (separate password from parent portal)
  const handleAdminLogin = () => {
    if (adminPassword === 'artiosadmin2026') {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem('adminLoggedIn', 'true');
      setAdminPassword('');
    } else {
      alert('Incorrect password');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('adminLoggedIn');
    window.location.href = '/';
  };

  // Admin page - completely separate from parent portal
  if (isAdminPage) {
    if (!isAdminLoggedIn) {
      return (
        <div className="login-screen admin-login-screen">
          <div className="login-card">
            <Settings size={48} className="admin-login-icon" />
            <h1>Admin Dashboard</h1>
            <p>Artios Connect Administration</p>
            <div className="login-form">
              <div className="login-input-group">
                <Lock size={18} />
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                  placeholder="Enter admin password"
                  autoFocus
                />
              </div>
              <button onClick={handleAdminLogin} className="btn-login">
                Sign In
              </button>
            </div>
            <a href="/" className="login-back-link">Back to Parent Portal</a>
          </div>
        </div>
      );
    }
    return <AdminPanel data={data} setData={setData} onLogout={handleAdminLogout} initialData={initialData} />;
  }

  // System prompt for AI chat
  const systemPrompt = data.aiSettings?.systemPrompt;

  // Parent login screen
  if (!isParentLoggedIn) {
    return (
      <div className="login-screen">
        <div className="login-card">
          <img
            src="/artios-logo.png"
            alt="Artios Academies logo"
            className="login-logo"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <h1>Artios Connect</h1>
          <p>Parent Information Portal</p>
          <div className="login-form">
            <div className={`login-input-group ${loginError ? 'error' : ''}`}>
              <Lock size={18} />
              <input
                type="password"
                value={parentPassword}
                onChange={(e) => { setParentPassword(e.target.value); setLoginError(''); }}
                onKeyPress={(e) => e.key === 'Enter' && handleParentLogin()}
                placeholder="Enter parent password"
                autoFocus
                aria-invalid={!!loginError}
                aria-describedby={loginError ? 'login-error' : undefined}
              />
            </div>
            {loginError && (
              <p id="login-error" className="login-error" role="alert">
                {loginError}
              </p>
            )}
            <button onClick={handleParentLogin} className="btn-login" disabled={!parentPassword.trim()}>
              Sign In
            </button>
          </div>
          <p className="login-help">Contact the school office if you need the password.</p>
        </div>
      </div>
    );
  }

  const handleTabChange = (tabId, question = null) => {
    if (question) {
      setPendingQuestion(question);
    }
    setActiveTab(tabId);
  };

  const handleQuestionSent = () => {
    setPendingQuestion(null);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab data={data} onTabChange={handleTabChange} />;
      case 'chat':
        return (
          <ChatTab
            systemPrompt={systemPrompt}
            initialQuestion={pendingQuestion}
            onQuestionSent={handleQuestionSent}
          />
        );
      case 'calendar':
        return <CalendarTab data={data} />;
      case 'more':
        return <MoreTab data={data} />;
      default:
        return <HomeTab data={data} onTabChange={handleTabChange} />;
    }
  };

  return (
    <div className="app-container tabbed-layout">
      <main className="tab-content-area">
        {renderActiveTab()}
      </main>
      <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}

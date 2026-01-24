import React, { useState, useEffect } from 'react';
import {
  ExternalLink,
  WifiOff,
  ChevronUp,
  Grid3X3
} from 'lucide-react';
import { ChatWidget } from './index';

/**
 * HomePage Component
 * Chat-dominant design with minimal links footer
 */
const HomePage = ({ data, systemPrompt }) => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [linksOpen, setLinksOpen] = useState(false);

  // Offline detection
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // All links flattened for the drawer
  const allLinks = data?.quickLinks || [];

  return (
    <div className="app-container">
      {/* Offline indicator */}
      {isOffline && (
        <div className="offline-banner" role="alert">
          <WifiOff size={16} />
          <span>You're offline</span>
        </div>
      )}

      {/* Header with branding */}
      <header className="app-header">
        <img
          src="/artios-logo.png"
          alt="Artios Academies"
          className="app-logo"
          onError={(e) => e.target.style.display = 'none'}
        />
        <div className="app-header-text">
          <h1>Artios Connect</h1>
          <p>Ask questions about school hours, events, dress code, and more</p>
        </div>
      </header>

      {/* Centered Chat */}
      <main className="chat-fullscreen">
        <ChatWidget
          isEmbedded={true}
          customPrompt={systemPrompt}
        />
      </main>

      {/* Minimal Footer with Links Toggle */}
      <footer className="links-footer">
        <button
          className="links-footer-toggle"
          onClick={() => setLinksOpen(!linksOpen)}
          aria-expanded={linksOpen}
        >
          {linksOpen ? (
            <>
              <ChevronUp size={18} />
              <span>Close</span>
            </>
          ) : (
            <>
              <Grid3X3 size={18} />
              <span>Quick Links</span>
            </>
          )}
        </button>
      </footer>

      {/* Links Drawer - slides up from bottom */}
      {linksOpen && (
        <div className="links-drawer" onClick={() => setLinksOpen(false)}>
          <div className="links-drawer-content" onClick={e => e.stopPropagation()}>
            <div className="links-drawer-header">
              <h2>Quick Links</h2>
              <button onClick={() => setLinksOpen(false)} className="drawer-close">
                <ChevronUp size={20} />
              </button>
            </div>
            <div className="links-grid">
              {allLinks.map(link => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-tile"
                >
                  <span className="link-tile-title">{link.title}</span>
                  {link.category && <span className="link-tile-category">{link.category}</span>}
                  <ExternalLink size={12} className="link-tile-icon" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;

import React from 'react';
import { ChevronRight, Headphones, ExternalLink } from 'lucide-react';

/**
 * PodcastPage Component
 * Simple page to choose between Apple Podcasts and Spotify for the Artios At Home podcast
 */
const PodcastPage = ({ onBack }) => {
  const platforms = [
    {
      id: 'apple',
      name: 'Apple Podcasts',
      url: 'https://podcasts.apple.com/us/podcast/artios-at-home-artios-of-sugar-hill/id1840924354',
      color: '#FC3C44',
      description: 'Best for iPhone & iPad users',
    },
    {
      id: 'spotify',
      name: 'Spotify',
      url: 'https://open.spotify.com/show/2GBsiEESrmOgtUaY8r2TQW',
      color: '#1DB954',
      description: 'Available on any device',
    },
  ];

  return (
    <div className="podcast-page">
      <header className="podcast-page-header">
        <button onClick={onBack} className="back-btn">
          <ChevronRight size={20} className="back-arrow" /> Back to Home
        </button>
      </header>

      <div className="podcast-hero">
        <Headphones size={48} />
        <h1>Artios At Home</h1>
        <p className="podcast-tagline">Equipping Parents. Enriching Learning. Strengthening the Family.</p>
        <p className="podcast-description">Your weekly companion to the Artios experience. Bridge the classroom and living room with insights from what's being taught.</p>
      </div>

      <div className="podcast-platforms">
        <h2>Choose your platform</h2>
        {platforms.map(platform => (
          <a
            key={platform.id}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`podcast-platform-btn ${platform.id}`}
            style={{ '--platform-color': platform.color }}
          >
            <div className="platform-info">
              <strong>{platform.name}</strong>
              <span>{platform.description}</span>
            </div>
            <ExternalLink size={18} />
          </a>
        ))}
      </div>

      <div className="podcast-note">
        <p>New episodes released regularly. Subscribe to get notified!</p>
      </div>
    </div>
  );
};

export default PodcastPage;

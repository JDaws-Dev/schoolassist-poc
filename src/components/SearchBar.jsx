import React, { useState, useRef, useEffect } from 'react';
import { Search, X, ExternalLink, Calendar, FileText, HelpCircle, Users, Clock } from 'lucide-react';

/**
 * SearchBar Component
 * Quick search across links, FAQ, and events
 */
const SearchBar = ({ quickLinks, faq, events, onResultClick, onAskAssistant }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Search through all content
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchQuery = query.toLowerCase();
    const searchResults = [];

    // Search quick links
    quickLinks?.forEach(link => {
      if (
        link.title.toLowerCase().includes(searchQuery) ||
        link.category?.toLowerCase().includes(searchQuery)
      ) {
        searchResults.push({
          type: 'link',
          icon: ExternalLink,
          title: link.title,
          subtitle: link.category,
          url: link.url,
          data: link,
        });
      }
    });

    // Search FAQ
    faq?.forEach(item => {
      if (
        item.question.toLowerCase().includes(searchQuery) ||
        item.answer.toLowerCase().includes(searchQuery)
      ) {
        searchResults.push({
          type: 'faq',
          icon: HelpCircle,
          title: item.question,
          subtitle: item.answer.substring(0, 80) + '...',
          data: item,
        });
      }
    });

    // Search events
    events?.forEach(event => {
      if (event.title.toLowerCase().includes(searchQuery)) {
        searchResults.push({
          type: 'event',
          icon: Calendar,
          title: event.title,
          subtitle: `${event.date} ${event.time || ''}`,
          data: event,
        });
      }
    });

    setResults(searchResults.slice(0, 8));
  }, [query, quickLinks, faq, events]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResultClick = (result) => {
    if (result.type === 'link' && result.url) {
      window.open(result.url, '_blank', 'noopener,noreferrer');
    } else if (onResultClick) {
      onResultClick(result);
    }
    setQuery('');
    setIsOpen(false);
  };

  const handleAskAssistant = () => {
    if (onAskAssistant && query.trim()) {
      onAskAssistant(query);
      setQuery('');
      setIsOpen(false);
    }
  };

  return (
    <div className="search-bar-container" ref={containerRef}>
      <div className={`search-bar ${isOpen ? 'focused' : ''}`}>
        <Search size={18} className="search-icon" aria-hidden="true" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Search links, FAQ, events..."
          className="search-input"
          aria-label="Search links, FAQ, and events"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="search-clear"
            aria-label="Clear search"
          >
            <X size={16} aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && query.trim() && (
        <div className="search-results">
          {results.length > 0 ? (
            <>
              {results.map((result, index) => {
                const Icon = result.icon;
                return (
                  <button
                    key={`${result.type}-${index}`}
                    onClick={() => handleResultClick(result)}
                    className="search-result-item"
                    aria-label={`${result.title} - ${result.type}`}
                  >
                    <Icon size={18} className="result-icon" aria-hidden="true" />
                    <div className="result-content">
                      <span className="result-title">{result.title}</span>
                      <span className="result-subtitle">{result.subtitle}</span>
                    </div>
                    <span className={`result-type ${result.type}`} aria-hidden="true">
                      {result.type}
                    </span>
                  </button>
                );
              })}
              <div className="search-divider" />
            </>
          ) : (
            <div className="no-results">
              <span>No results found</span>
            </div>
          )}

          {/* Always show option to ask assistant */}
          <button onClick={handleAskAssistant} className="search-ask-assistant" aria-label={`Ask assistant about: ${query}`}>
            <HelpCircle size={18} aria-hidden="true" />
            <span>Ask assistant: "{query}"</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

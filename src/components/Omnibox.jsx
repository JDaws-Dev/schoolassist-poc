import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Search, ArrowRight, Sparkles } from 'lucide-react';

/**
 * Omnibox Component
 * A unified search/AI chat input that serves as the "brain" of the site
 * Merges search functionality with AI assistant access
 */
const Omnibox = ({
  onSubmit,
  suggestedQuestions = [],
  userName = null,
  greeting = null
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  // Get time-based greeting
  const getGreeting = () => {
    if (greeting) return greeting;
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query.trim());
      setQuery('');
    }
  };

  const handleSuggestionClick = (question) => {
    onSubmit(question);
  };

  return (
    <div className="omnibox-container">
      <div className="omnibox-hero">
        <h1 className="omnibox-greeting">
          {getGreeting()}{userName && `, ${userName}`}! <Sparkles className="omnibox-sparkle" size={24} />
        </h1>
        <p className="omnibox-subtext">What do you need help with today?</p>
      </div>

      <form onSubmit={handleSubmit} className={`omnibox-form ${isFocused ? 'focused' : ''}`}>
        <div className="omnibox-input-wrapper">
          <MessageCircle className="omnibox-icon" size={22} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Ask anything... 'School hours?' or 'What's for lunch?'"
            className="omnibox-input"
            aria-label="Ask a question or search"
          />
          <button
            type="submit"
            className="omnibox-submit"
            disabled={!query.trim()}
            aria-label="Ask"
          >
            <span className="omnibox-submit-text">Ask</span>
            <ArrowRight size={18} className="omnibox-submit-icon" />
          </button>
        </div>
      </form>

      {/* Suggested question chips */}
      {suggestedQuestions.length > 0 && (
        <div className="omnibox-suggestions">
          {suggestedQuestions.slice(0, 4).map((question, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(question)}
              className="omnibox-chip"
            >
              {question}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Omnibox;

import React, { useState, useMemo } from 'react';
import { ChevronRight, HelpCircle, Search, X } from 'lucide-react';

/**
 * FAQ Accordion Component
 * Displays a list of frequently asked questions in an expandable format
 * with search functionality
 *
 * @param {Object} props
 * @param {Array} props.faqItems - Array of FAQ items with id, question, and answer
 * @param {boolean} props.compact - If true, renders without section wrapper
 */
const FAQSection = ({ faqItems = [], compact = false }) => {
  const [openItem, setOpenItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Guard against empty or undefined faqItems
  if (!faqItems || faqItems.length === 0) {
    return null;
  }

  // Filter FAQ items based on search query
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return faqItems;
    const query = searchQuery.toLowerCase();
    return faqItems.filter(item =>
      item.question.toLowerCase().includes(query) ||
      item.answer.toLowerCase().includes(query)
    );
  }, [faqItems, searchQuery]);

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  // Helper to truncate answer for preview
  const getPreview = (answer, maxLength = 60) => {
    if (answer.length <= maxLength) return answer;
    return answer.substring(0, maxLength).trim() + '...';
  };

  // Highlight matching text in search results
  const highlightMatch = (text, query) => {
    if (!query.trim()) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? <mark key={i} className="faq-highlight">{part}</mark> : part
    );
  };

  const FAQList = () => (
    <div className={`faq-list ${compact ? 'compact' : ''}`}>
      {filteredItems.length === 0 ? (
        <div className="faq-no-results">
          <p>No questions match "{searchQuery}"</p>
          <button onClick={() => setSearchQuery('')} className="faq-clear-search">
            Clear search
          </button>
        </div>
      ) : filteredItems.map(item => (
        <div
          key={item.id}
          className={`faq-item ${openItem === item.id ? 'open' : ''}`}
        >
          <button
            className="faq-question"
            onClick={() => toggleItem(item.id)}
            aria-expanded={openItem === item.id}
          >
            <div className="faq-question-content">
              <span className="faq-question-text">{highlightMatch(item.question, searchQuery)}</span>
              {openItem !== item.id && (
                <span className="faq-preview">{getPreview(item.answer)}</span>
              )}
            </div>
            <ChevronRight
              size={18}
              className={`faq-arrow ${openItem === item.id ? 'rotated' : ''}`}
              aria-hidden="true"
            />
          </button>
          {openItem === item.id && (
            <div className="faq-answer">
              <p>{highlightMatch(item.answer, searchQuery)}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  // Search input component
  const SearchInput = () => (
    <div className="faq-search">
      <Search size={18} className="faq-search-icon" aria-hidden="true" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search questions..."
        className="faq-search-input"
        aria-label="Search frequently asked questions"
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className="faq-search-clear"
          aria-label="Clear search"
        >
          <X size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  );

  // When compact, don't wrap in a section with its own heading
  if (compact) {
    return (
      <>
        <SearchInput />
        <FAQList />
      </>
    );
  }

  return (
    <section id="faq" className="faq-section">
      <h2>
        <HelpCircle size={24} aria-hidden="true" /> Frequently Asked Questions
      </h2>
      <SearchInput />
      <FAQList />
    </section>
  );
};

export default FAQSection;

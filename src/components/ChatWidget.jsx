import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, RefreshCw, Clock, Shirt, Calendar, CloudRain, BookOpen, HelpCircle } from 'lucide-react';

// Auto-detect API URL based on environment
const API_URL = import.meta.env.DEV ? 'http://localhost:3001' : '';

// Generate unique session ID
const generateSessionId = () => 'session-' + Math.random().toString(36).slice(2, 11);

// Quick question suggestions with icons
const SUGGESTIONS = [
  { text: 'What are the school hours?', icon: Clock },
  { text: 'What is the dress code?', icon: Shirt },
  { text: "What's happening this week?", icon: Calendar },
  { text: 'Weather/closure policy?', icon: CloudRain },
  { text: 'How do I order lunch?', icon: BookOpen },
  { text: 'Contact information', icon: HelpCircle },
];

/**
 * ChatWidget Component
 * A reusable chat interface for the AI assistant
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the chat is open (for modal mode)
 * @param {Function} props.onClose - Callback to close the chat (for modal mode)
 * @param {boolean} props.isEmbedded - Whether the chat is embedded in a page
 * @param {string} props.apiUrl - Override API URL
 * @param {string} props.sessionId - Override session ID
 * @param {string} props.customPrompt - Custom system prompt
 * @param {string} props.initialQuestion - Initial question to send
 * @param {Function} props.onQuestionSent - Callback when initial question is sent
 */
const ChatWidget = ({
  isOpen,
  onClose,
  isEmbedded = false,
  apiUrl = API_URL,
  sessionId: propSessionId,
  customPrompt,
  initialQuestion,
  onQuestionSent
}) => {
  const chatStorageKey = isEmbedded ? 'artios-chat-embedded' : 'artios-chat-modal';
  const modalRef = useRef(null);
  const inputRef = useRef(null);
  const previousActiveElement = useRef(null);

  // Persist messages in sessionStorage
  const [messages, setMessages] = useState(() => {
    try {
      const saved = sessionStorage.getItem(chatStorageKey);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading chat history:', e);
    }
    return [{
      role: 'assistant',
      content: "Hi! I'm your Artios assistant. Ask me anything about school hours, dress code, events, lunch ordering, and more."
    }];
  });

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Persist session ID so conversation continues on server
  const [sessionId, setSessionId] = useState(() => {
    const stored = sessionStorage.getItem('artios-session-id');
    if (stored) return stored;
    const newId = propSessionId || generateSessionId();
    sessionStorage.setItem('artios-session-id', newId);
    return newId;
  });

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const processedQuestionRef = useRef(null);

  // Save messages to sessionStorage when they change
  useEffect(() => {
    sessionStorage.setItem(chatStorageKey, JSON.stringify(messages));
  }, [messages, chatStorageKey]);

  // Scroll chat container (not page) when new messages arrive
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle initial question (from clickable suggestions or quick questions)
  // When a quick question comes from Home tab, start a fresh conversation
  useEffect(() => {
    if (initialQuestion && initialQuestion !== processedQuestionRef.current && !loading) {
      processedQuestionRef.current = initialQuestion;

      // Clear existing chat and start fresh session
      // This ensures quick questions from Home don't append to old conversations
      const welcomeMessage = {
        role: 'assistant',
        content: "Hi! I'm your Artios assistant. Ask me anything about school hours, dress code, events, lunch ordering, and more."
      };
      setMessages([welcomeMessage]);
      sessionStorage.removeItem(chatStorageKey);

      // Generate a new session ID for fresh server-side context
      const newSessionId = generateSessionId();
      setSessionId(newSessionId);
      sessionStorage.setItem('artios-session-id', newSessionId);

      // Send the question after state updates are flushed
      setTimeout(() => {
        sendMessageDirect(initialQuestion);
      }, 0);

      if (onQuestionSent) onQuestionSent();
    }
  }, [initialQuestion, loading]);

  // Focus trap for modal mode
  useEffect(() => {
    if (isEmbedded || !isOpen) return;

    // Store the previously focused element to restore on close
    previousActiveElement.current = document.activeElement;

    // Auto-focus the input when modal opens
    const focusTimer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);

    // Focus trap handler
    const handleKeyDown = (e) => {
      if (e.key !== 'Tab') return;

      const modal = modalRef.current;
      if (!modal) return;

      const focusableElements = modal.querySelectorAll(
        'button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        // Shift+Tab: if on first element, go to last
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab: if on last element, go to first
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);
      // Restore focus to previous element when modal closes
      if (previousActiveElement.current && previousActiveElement.current.focus) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, isEmbedded]);

  // Send message directly (used by initial question and normal send)
  const sendMessageDirect = async (messageText) => {
    if (!messageText.trim() || loading) return;

    const userMessage = messageText.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          role: 'parent',
          sessionId,
          customPrompt
        })
      });

      // Check if response is OK before trying to parse JSON
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid response format');
      }

      const data = await response.json();
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.message || "Sorry, I couldn't process that request."
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting right now. The assistant may be temporarily unavailable. Please try again in a moment."
      }]);
    }
    setLoading(false);
  };

  // Send message from input
  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage = input.trim();
    setInput('');
    sendMessageDirect(userMessage);
  };

  // Clear chat history
  const clearChat = () => {
    setMessages([{
      role: 'assistant',
      content: "Hi there! 👋 I'm here to help with any Artios questions - school hours, dress code, lunch ordering, upcoming events, and more. What can I help you with?"
    }]);
    sessionStorage.removeItem(chatStorageKey);
    sessionStorage.removeItem('artios-session-id');
  };

  // For modal mode, don't render if not open
  if (!isEmbedded && !isOpen) return null;

  return (
    <div
      className={`chat-widget ${isEmbedded ? 'embedded' : ''}`}
      ref={modalRef}
      role={isEmbedded ? undefined : 'dialog'}
      aria-modal={isEmbedded ? undefined : 'true'}
      aria-label={isEmbedded ? undefined : 'Chat assistant'}
    >
      {/* Header - only show in modal mode or when there's chat history to clear */}
      {(!isEmbedded || messages.length > 1) && (
        <div className="chat-header">
          {!isEmbedded && (
            <>
              <Bot size={20} />
              <span>Artios Assistant</span>
            </>
          )}
          {isEmbedded && messages.length > 1 && (
            <button onClick={clearChat} className="chat-clear" title="Start new conversation">
              <RefreshCw size={16} />
              <span>New chat</span>
            </button>
          )}
          {!isEmbedded && (
            <button onClick={onClose} className="chat-close">
              <X size={20} />
            </button>
          )}
        </div>
      )}

      {/* Messages */}
      <div className="chat-messages" ref={messagesContainerRef}>
        {messages.map((msg, i) => (
          <div key={i} className={`chat-message ${msg.role}`}>
            {msg.content}
          </div>
        ))}

        {/* Quick suggestions - show when only welcome message exists */}
        {messages.length === 1 && !loading && (
          <div className="chat-suggestions-grid">
            {SUGGESTIONS.map((suggestion, i) => {
              const Icon = suggestion.icon;
              return (
                <button
                  key={i}
                  className="chat-suggestion-card"
                  onClick={() => sendMessageDirect(suggestion.text)}
                >
                  <Icon size={18} />
                  <span>{suggestion.text}</span>
                </button>
              );
            })}
          </div>
        )}

        {loading && (
          <div className="chat-message assistant loading">
            <span className="typing-indicator">
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
            </span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="chat-input-area">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask a question..."
          disabled={loading}
          aria-label="Type your question"
        />
        <button onClick={sendMessage} disabled={loading || !input.trim()} aria-label="Send message">
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatWidget;

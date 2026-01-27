import { useState, useRef, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Send, Bot, User, MessageCircle, Sparkles } from 'lucide-react';

// Typing indicator component with animated bouncing dots
function TypingIndicator() {
  return (
    <div className="flex gap-3 animate-fade-in">
      <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
        <Bot className="w-5 h-5 text-white" />
      </div>
      <div className="bg-white border border-primary-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-soft">
        <div className="flex items-center gap-1.5">
          <span
            className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"
            style={{ animationDelay: '0ms', animationDuration: '600ms' }}
          />
          <span
            className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"
            style={{ animationDelay: '150ms', animationDuration: '600ms' }}
          />
          <span
            className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"
            style={{ animationDelay: '300ms', animationDuration: '600ms' }}
          />
        </div>
      </div>
    </div>
  );
}

// Empty state component with engaging visuals
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 animate-fade-in">
      {/* Animated icon container */}
      <div className="relative mb-6">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-accent-400 rounded-3xl blur-xl opacity-20 animate-pulse" />

        {/* Main icon container */}
        <div className="relative w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl flex items-center justify-center shadow-primary animate-bounce-in">
          <MessageCircle className="w-10 h-10 text-white" />
        </div>

        {/* Sparkle decorations */}
        <div className="absolute -top-2 -right-2 text-accent-500 animate-pulse">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="absolute -bottom-1 -left-1 text-primary-400 animate-pulse" style={{ animationDelay: '500ms' }}>
          <Sparkles className="w-4 h-4" />
        </div>
      </div>

      {/* Text content */}
      <h2 className="text-xl md:text-2xl font-bold text-primary-900 mb-2 text-center">
        Welcome to Artios Assistant
      </h2>
      <p className="text-primary-500 text-center max-w-xs mb-8 leading-relaxed">
        I'm here to help with questions about schedules, lunch ordering, events, and more.
      </p>

      {/* Suggestion chips */}
      <div className="flex flex-wrap gap-2 justify-center max-w-sm">
        {[
          'What's the schedule?',
          'How do I order lunch?',
          'Contact info',
          'Dress code'
        ].map((suggestion) => (
          <span
            key={suggestion}
            className="px-3 py-1.5 bg-primary-50 border border-primary-200 rounded-full text-sm text-primary-600 cursor-default"
          >
            {suggestion}
          </span>
        ))}
      </div>
    </div>
  );
}

const SAMPLE_RESPONSES = {
  schedule: "Artios follows a hybrid schedule:\n\n**Monday & Wednesday:** Elementary students on campus (9:00 AM - Dismissal per FACTS)\n\n**Tuesday & Thursday:** Jr High & High School on campus (9:00 AM - Dismissal per FACTS)\n\n**Friday:** Home learning day with optional enrichment activities\n\nDoors open at 8:45 AM. All students should be picked up according to their dismissal time in FACTS.",
  lunch: "Lunch can be ordered through **artioscafe.com**. Orders must be placed by 9:00 AM on school days.\n\nIf you miss the deadline, please send a packed lunch with your student.",
  contact: "**Artios Academies of Sugar Hill**\n\n📍 Address: Sugar Hill, GA\n📧 Email: info@artiosacademies.com\n📱 Phone: Check FACTS for direct office numbers\n\nFor urgent matters, contact the front office directly through FACTS.",
  dress: "**Dress Code Guidelines:**\n\n- Modest, neat, and clean attire\n- No clothing with inappropriate graphics or messages\n- Closed-toe shoes recommended for safety\n- PE days: Athletic wear is acceptable\n\nFor specific dress code policies, refer to the Parent Handbook in FACTS.",
  default: "I'm here to help with questions about Artios Academies! I can help with:\n\n- School schedule and calendar\n- Lunch ordering\n- Contact information\n- Dress code\n- Events and activities\n\nWhat would you like to know?"
};

function getResponse(message) {
  const lower = message.toLowerCase();
  if (lower.includes('schedule') || lower.includes('time') || lower.includes('when') || lower.includes('campus')) {
    return SAMPLE_RESPONSES.schedule;
  }
  if (lower.includes('lunch') || lower.includes('food') || lower.includes('cafe') || lower.includes('eat')) {
    return SAMPLE_RESPONSES.lunch;
  }
  if (lower.includes('contact') || lower.includes('phone') || lower.includes('email') || lower.includes('office')) {
    return SAMPLE_RESPONSES.contact;
  }
  if (lower.includes('dress') || lower.includes('clothes') || lower.includes('wear') || lower.includes('uniform')) {
    return SAMPLE_RESPONSES.dress;
  }
  return SAMPLE_RESPONSES.default;
}

export default function Chat() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle initial query from URL
  useEffect(() => {
    if (initialQuery && messages.length === 0) {
      handleSend(initialQuery);
    }
  }, []);

  const handleSend = async (messageText = input) => {
    const text = messageText.trim();
    if (!text || isLoading) return;

    const userMessage = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));

    const response = getResponse(text);
    const assistantMessage = { role: 'assistant', content: response };
    setMessages(prev => [...prev, assistantMessage]);
    setIsLoading(false);
    inputRef.current?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSend();
  };

  return (
    <div className="min-h-screen bg-primary-50 flex flex-col lg:max-w-4xl lg:mx-auto">
      {/* Header */}
      <header className="bg-white border-b border-primary-100 px-4 md:px-6 py-3 md:py-4 flex items-center gap-3 sticky top-0 z-10 shadow-sm safe-top">
        <Link
          to="/"
          className="p-2.5 -ml-2 hover:bg-primary-100 active:bg-primary-200 rounded-xl transition-all duration-150 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          aria-label="Go back to home"
        >
          <ArrowLeft className="w-5 h-5 text-primary-600" />
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-md">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-primary-900">Artios Assistant</h1>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
              <p className="text-xs text-primary-500">Online - Ready to help</p>
            </div>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6 md:py-8 space-y-4 md:space-y-6">
        {messages.length === 0 && !isLoading && <EmptyState />}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex gap-3 animate-slide-up ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {message.role === 'assistant' && (
              <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                <Bot className="w-5 h-5 text-white" />
              </div>
            )}
            <div
              className={`max-w-[80%] md:max-w-[70%] lg:max-w-[60%] px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-2xl rounded-br-md shadow-primary'
                  : 'bg-white border border-primary-100 text-primary-900 rounded-2xl rounded-bl-md shadow-soft'
              }`}
            >
              <div className="whitespace-pre-wrap text-sm leading-relaxed">
                {message.content}
              </div>
            </div>
            {message.role === 'user' && (
              <div className="w-9 h-9 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-primary-600" />
              </div>
            )}
          </div>
        ))}

        {isLoading && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-primary-100 px-4 md:px-6 py-3 md:py-4 shadow-[0_-4px_16px_-4px_rgb(0_0_0_/_0.06)] safe-bottom lg:pb-4">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="w-full px-4 py-3.5 bg-primary-50 border border-primary-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-400 focus:bg-white transition-all duration-150 text-primary-900 placeholder:text-primary-400"
              disabled={isLoading}
              aria-label="Type your message"
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-3.5 bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-2xl hover:from-primary-500 hover:to-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 shadow-md hover:shadow-primary active:scale-95 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}

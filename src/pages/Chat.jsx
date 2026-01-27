import { useState, useRef, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Send, Bot, User, Loader2 } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <Link
          to="/"
          className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-gray-900">Artios Assistant</h1>
            <p className="text-xs text-gray-500">Ask me anything</p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Bot className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Welcome to Artios Assistant</h2>
            <p className="text-gray-500 max-w-xs mx-auto">
              I can help answer your questions about Artios Academies.
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'assistant' && (
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 text-white" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-900'
              }`}
            >
              <div className="whitespace-pre-wrap text-sm leading-relaxed">
                {message.content}
              </div>
            </div>
            {message.role === 'user' && (
              <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-gray-600" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
              <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 px-4 py-3 pb-safe">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}

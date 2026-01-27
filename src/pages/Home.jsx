import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageCircle, Calendar, ExternalLink, BookOpen, Clock, ChevronRight, Sparkles, UtensilsCrossed, GraduationCap } from 'lucide-react';
import NotificationBanner from '../components/NotificationBanner';
import AnnouncementCard from '../components/AnnouncementCard';
import { useRecentAnnouncements } from '../hooks/useConvex';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function getContextualSuggestions() {
  const hour = new Date().getHours();
  const day = new Date().getDay();
  const isWeekend = day === 0 || day === 6;

  if (isWeekend) {
    return [
      "When's the next school day?",
      "What events are coming up?",
      "What's the weekly schedule?"
    ];
  }
  if (hour >= 6 && hour < 12) {
    return [
      "What time does school end today?",
      "Is the lunch deadline passed?",
      "What's happening today?"
    ];
  }
  if (hour >= 12 && hour < 17) {
    return [
      "What's for lunch tomorrow?",
      "Any upcoming events?",
      "What time is pickup?"
    ];
  }
  return [
    "What time do doors open?",
    "What's the dress code?",
    "How do I contact the office?"
  ];
}

function getTodayInfo() {
  const day = new Date().getDay();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const scheduleInfo = {
    0: { type: 'home', label: 'Weekend - No School' },
    1: { type: 'school', label: 'Elementary on Campus', time: '9:00 AM - Dismissal per FACTS' },
    2: { type: 'school', label: 'Jr High & High School on Campus', time: '9:00 AM - Dismissal per FACTS' },
    3: { type: 'school', label: 'Elementary on Campus', time: '9:00 AM - Dismissal per FACTS' },
    4: { type: 'school', label: 'Jr High & High School on Campus', time: '9:00 AM - Dismissal per FACTS' },
    5: { type: 'home', label: 'Home Learning Day', time: 'Optional enrichment activities' },
    6: { type: 'home', label: 'Weekend - No School' }
  };

  return {
    dayName: dayNames[day],
    ...scheduleInfo[day]
  };
}

export default function Home() {
  const [chatInput, setChatInput] = useState('');
  const navigate = useNavigate();
  const suggestions = getContextualSuggestions();
  const todayInfo = getTodayInfo();
  const announcements = useRecentAnnouncements(2);

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (chatInput.trim()) {
      navigate(`/chat?q=${encodeURIComponent(chatInput)}`);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    navigate(`/chat?q=${encodeURIComponent(suggestion)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-8">
      {/* Notification Banner */}
      <NotificationBanner />

      {/* Hero Section with Chat */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 text-white px-4 pt-6 pb-14 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto relative">
          {/* Logo and greeting */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center">
              <img
                src="/Artios Logo.png"
                alt="Artios"
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <GraduationCap className="w-6 h-6 text-blue-600 hidden" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{getGreeting()}!</h1>
              <p className="text-blue-200 text-sm">Artios Connect</p>
            </div>
          </div>

          {/* AI Chat Input */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span className="text-sm font-medium text-blue-100">Ask the AI Assistant</span>
            </div>
            <form onSubmit={handleChatSubmit} className="relative">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask me anything about Artios..."
                className="w-full px-4 py-3.5 pr-14 min-h-[48px] rounded-xl text-gray-900 placeholder-gray-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400 transition-shadow"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
            </form>

            {/* Suggestion Chips */}
            <div className="flex flex-wrap gap-2 mt-3">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-3 py-2 min-h-[36px] bg-white/20 hover:bg-white/30 rounded-full text-sm transition-all hover:scale-105 active:scale-95"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 md:px-6 -mt-6 max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto space-y-4 md:space-y-6 relative z-10">
        {/* Today Card */}
        <div className={`rounded-2xl p-4 shadow-lg border ${
          todayInfo.type === 'school'
            ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200'
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${
              todayInfo.type === 'school'
                ? 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-200'
                : 'bg-gray-100'
            }`}>
              <Clock className={`w-6 h-6 ${
                todayInfo.type === 'school' ? 'text-white' : 'text-gray-500'
              }`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-bold text-gray-900">{todayInfo.dayName}</p>
                {todayInfo.type === 'school' && (
                  <span className="px-2 py-0.5 bg-emerald-500 text-white text-xs font-medium rounded-full">
                    School Day
                  </span>
                )}
              </div>
              <p className={`text-sm font-medium ${
                todayInfo.type === 'school' ? 'text-emerald-700' : 'text-gray-600'
              }`}>
                {todayInfo.label}
              </p>
              {todayInfo.time && (
                <p className="text-xs text-gray-500 mt-1">{todayInfo.time}</p>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          <a
            href="https://factsmgt.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 p-4 min-h-[88px] bg-white rounded-2xl shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 border border-gray-100"
          >
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md shadow-blue-200">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-700">FACTS</span>
          </a>
          <a
            href="https://artioscafe.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 p-4 min-h-[88px] bg-white rounded-2xl shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 border border-gray-100"
          >
            <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow-md shadow-amber-200">
              <UtensilsCrossed className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-700">Lunch</span>
          </a>
          <Link
            to="/calendar"
            className="flex flex-col items-center gap-2 p-4 min-h-[88px] bg-white rounded-2xl shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 border border-gray-100"
          >
            <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-md shadow-purple-200">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-700">Calendar</span>
          </Link>
        </div>

        {/* Recent Announcements */}
        {announcements && announcements.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-gray-900">Announcements</h2>
              <Link to="/resources" className="text-sm text-blue-600 flex items-center gap-1 py-1 px-2 -mr-2 min-h-[44px] rounded-lg hover:bg-blue-50 transition-colors">
                View all <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {announcements.map((announcement) => (
                <AnnouncementCard key={announcement._id} announcement={announcement} />
              ))}
            </div>
          </div>
        )}

        {/* Resources Link */}
        <Link
          to="/resources"
          className="flex items-center justify-between p-4 min-h-[72px] bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <BookOpen className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Resources & Info</p>
              <p className="text-sm text-gray-500">Links, FAQ, contacts</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </Link>
      </div>
    </div>
  );
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageCircle, Sparkles, GraduationCap } from 'lucide-react'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

function getContextualSuggestions() {
  const hour = new Date().getHours()
  const day = new Date().getDay()
  const isWeekend = day === 0 || day === 6

  if (isWeekend) {
    return [
      "When's the next school day?",
      "What events are coming up?",
      "What's the weekly schedule?"
    ]
  }
  if (hour >= 6 && hour < 12) {
    return [
      "What time does school end today?",
      "Is the lunch deadline passed?",
      "What's happening today?"
    ]
  }
  if (hour >= 12 && hour < 17) {
    return [
      "What's for lunch tomorrow?",
      "Any upcoming events?",
      "What time is pickup?"
    ]
  }
  return [
    "What time do doors open?",
    "What's the dress code?",
    "How do I contact the office?"
  ]
}

export default function AIHeroSection() {
  const [chatInput, setChatInput] = useState('')
  const navigate = useNavigate()
  const suggestions = getContextualSuggestions()

  const handleChatSubmit = (e) => {
    e.preventDefault()
    if (chatInput.trim()) {
      navigate(`/chat?q=${encodeURIComponent(chatInput)}`)
    }
  }

  const handleSuggestionClick = (suggestion) => {
    navigate(`/chat?q=${encodeURIComponent(suggestion)}`)
  }

  return (
    <div className="bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 text-white px-4 pt-5 pb-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto relative">
        {/* Logo and greeting */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 bg-white rounded-xl shadow-lg flex items-center justify-center">
            <img
              src="/Artios Logo.png"
              alt="Artios"
              className="w-7 h-7 object-contain"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
            <GraduationCap className="w-6 h-6 text-blue-600 hidden" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold leading-tight">{getGreeting()}!</h1>
            <p className="text-blue-200 text-xs">Artios Connect</p>
          </div>
        </div>

        {/* AI Chat Input */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3.5 border border-white/20">
          <div className="flex items-center gap-2 mb-2.5">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="text-sm font-medium text-blue-100">Ask the AI Assistant</span>
          </div>
          <form onSubmit={handleChatSubmit} className="relative">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask me anything about Artios..."
              className="w-full px-4 py-3 pr-14 min-h-[48px] rounded-xl text-gray-900 placeholder-gray-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400 transition-shadow"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md"
            >
              <MessageCircle className="w-5 h-5" />
            </button>
          </form>

          {/* Suggestion Chips */}
          <div className="flex flex-wrap gap-2 mt-2.5">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-3 py-1.5 min-h-[36px] bg-white/20 hover:bg-white/30 rounded-full text-sm transition-all hover:scale-105 active:scale-95"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

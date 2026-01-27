import { MessageCircle, Sparkles, Clock, UtensilsCrossed, Phone, Shirt } from 'lucide-react'

const SUGGESTIONS = [
  { text: "What's the schedule?", icon: Clock },
  { text: "How do I order lunch?", icon: UtensilsCrossed },
  { text: "Contact info", icon: Phone },
  { text: "Dress code", icon: Shirt }
]

export default function WelcomeState({ onSuggestionClick }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 animate-fade-in">
      {/* Animated icon container */}
      <div className="relative mb-5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-accent-400 rounded-2xl blur-xl opacity-20 animate-pulse" />
        <div className="relative w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-primary animate-bounce-in">
          <MessageCircle className="w-8 h-8 text-white" />
        </div>
        <div className="absolute -top-1.5 -right-1.5 text-accent-500 animate-pulse">
          <Sparkles className="w-4 h-4" />
        </div>
      </div>

      <h2 className="text-lg font-bold text-primary-900 mb-1 text-center">
        How can I help?
      </h2>
      <p className="text-primary-400 text-sm text-center max-w-xs mb-6">
        Ask about schedules, events, lunch, dress code, and more.
      </p>

      <div className="grid grid-cols-2 gap-2 w-full max-w-xs">
        {SUGGESTIONS.map(({ text, icon: Icon }) => (
          <button
            key={text}
            onClick={() => onSuggestionClick?.(text)}
            className="flex items-center gap-2 px-3 py-2.5 bg-white border border-primary-100 rounded-xl text-sm text-primary-700 hover:bg-primary-50 hover:border-primary-200 transition-all active:scale-95 cursor-pointer text-left"
          >
            <Icon className="w-4 h-4 text-primary-400 flex-shrink-0" />
            <span className="truncate">{text}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

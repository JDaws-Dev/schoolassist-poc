import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Bot } from 'lucide-react'
import { useChat } from '../hooks/useChat'
import MessageBubble from '../components/chat/MessageBubble'
import TypingIndicator from '../components/chat/TypingIndicator'
import ChatInput from '../components/chat/ChatInput'
import WelcomeState from '../components/chat/WelcomeState'
import BottomNav from '../components/BottomNav'

export default function Chat() {
  const { messages, isLoading, sendMessage } = useChat()
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="min-h-screen bg-primary-50 flex flex-col lg:max-w-4xl lg:mx-auto animate-fade-in">
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
            <p className="text-xs text-primary-400">Ask about schedules, events & more</p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6 md:py-8 space-y-4 md:space-y-6 pb-24">
        {messages.length === 0 && !isLoading && (
          <WelcomeState onSuggestionClick={sendMessage} />
        )}

        {messages.map((message, index) => (
          <MessageBubble key={index} message={message} index={index} />
        ))}

        {isLoading && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="fixed bottom-16 left-0 right-0 lg:bottom-0 lg:max-w-4xl lg:mx-auto z-20">
        <ChatInput onSend={sendMessage} disabled={isLoading} />
      </div>

      {/* Bottom Nav */}
      <BottomNav />
    </div>
  )
}

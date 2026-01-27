import { Bot, User } from 'lucide-react'

function parseMarkdown(text) {
  const lines = text.split('\n')
  const elements = []
  let listItems = []

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="list-disc pl-5 space-y-1 my-1">
          {listItems.map((item, i) => (
            <li key={i}>{formatInline(item)}</li>
          ))}
        </ul>
      )
      listItems = []
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const listMatch = line.match(/^[-•*]\s+(.+)/)

    if (listMatch) {
      listItems.push(listMatch[1])
    } else {
      flushList()
      if (line.trim() === '') {
        elements.push(<br key={`br-${i}`} />)
      } else {
        elements.push(
          <p key={`p-${i}`} className="my-0.5">
            {formatInline(line)}
          </p>
        )
      }
    }
  }
  flushList()
  return elements
}

function formatInline(text) {
  const parts = []
  let remaining = text
  let key = 0

  while (remaining.length > 0) {
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/)
    if (boldMatch) {
      const idx = remaining.indexOf(boldMatch[0])
      if (idx > 0) {
        parts.push(remaining.slice(0, idx))
      }
      parts.push(<strong key={key++}>{boldMatch[1]}</strong>)
      remaining = remaining.slice(idx + boldMatch[0].length)
    } else {
      parts.push(remaining)
      break
    }
  }
  return parts
}

export default function MessageBubble({ message, index }) {
  const isUser = message.role === 'user'

  return (
    <div
      className={`flex gap-3 animate-slide-up ${isUser ? 'justify-end' : 'justify-start'}`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {!isUser && (
        <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
          <Bot className="w-5 h-5 text-white" />
        </div>
      )}
      <div
        className={`max-w-[80%] md:max-w-[70%] lg:max-w-[60%] px-4 py-3 ${
          isUser
            ? 'bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-2xl rounded-br-md shadow-primary'
            : 'bg-white border border-primary-100 text-primary-900 rounded-2xl rounded-bl-md shadow-soft'
        }`}
      >
        <div className="text-sm leading-relaxed">
          {isUser ? message.content : parseMarkdown(message.content)}
        </div>
      </div>
      {isUser && (
        <div className="w-9 h-9 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <User className="w-5 h-5 text-primary-600" />
        </div>
      )}
    </div>
  )
}

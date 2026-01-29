import { Bot, User } from 'lucide-react'
import type { ChatMessage } from '@/types'
import { cn } from '@/lib/utils'

// Parse markdown-style links and plain URLs into clickable links
function parseContent(content: string, isUser: boolean): React.ReactNode {
  // Match markdown links [text](url) and plain URLs
  const parts: React.ReactNode[] = []
  let lastIndex = 0

  // Combined regex for markdown links and plain URLs
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s)<]+)/g
  let match

  while ((match = linkRegex.exec(content)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(content.slice(lastIndex, match.index))
    }

    if (match[1] && match[2]) {
      // Markdown link [text](url)
      parts.push(
        <a
          key={match.index}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'underline hover:opacity-80',
            isUser ? 'text-primary-foreground' : 'text-primary'
          )}
        >
          {match[1]}
        </a>
      )
    } else if (match[3]) {
      // Plain URL
      parts.push(
        <a
          key={match.index}
          href={match[3]}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'underline hover:opacity-80',
            isUser ? 'text-primary-foreground' : 'text-primary'
          )}
        >
          {match[3]}
        </a>
      )
    }

    lastIndex = match.index + match[0].length
  }

  // Add remaining text
  if (lastIndex < content.length) {
    parts.push(content.slice(lastIndex))
  }

  return parts.length > 0 ? parts : content
}

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user'
  return (
    <div className={cn('flex items-start gap-3', isUser ? 'flex-row-reverse' : 'flex-row')}>
      <div
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-full',
          isUser ? 'bg-muted text-foreground' : 'bg-primary/15 text-primary'
        )}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      <div
        className={cn(
        'max-w-[75%] whitespace-pre-wrap rounded-3xl px-4 py-3 text-sm leading-relaxed shadow-sm',
          isUser ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground'
        )}
      >
        {parseContent(message.content, isUser)}
      </div>
    </div>
  )
}

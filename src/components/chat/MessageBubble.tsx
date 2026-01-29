import { Bot, User } from 'lucide-react'
import type { ChatMessage } from '@/types'
import { cn } from '@/lib/utils'

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
        {message.content}
      </div>
    </div>
  )
}

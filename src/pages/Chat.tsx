import { useEffect, useRef } from 'react'
import { Trash2 } from 'lucide-react'
import { ChatInput } from '@/components/chat/ChatInput'
import { MessageBubble } from '@/components/chat/MessageBubble'
import { TypingIndicator } from '@/components/chat/TypingIndicator'
import { WelcomeState } from '@/components/chat/WelcomeState'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useChat } from '@/hooks/useChat'

export default function Chat() {
  const { messages, isLoading, sendMessage, clearChat } = useChat()
  const endRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Arti</h2>
          <p className="text-sm text-muted-foreground">Your Artios assistant</p>
        </div>
        <Button variant="ghost" size="icon" onClick={clearChat} aria-label="Clear chat">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <Card className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {messages.length === 0 ? (
            <WelcomeState onSelect={sendMessage} />
          ) : (
            messages.map((message) => <MessageBubble key={message.id} message={message} />)
          )}
          {isLoading ? <TypingIndicator /> : null}
          <div ref={endRef} />
        </div>
        <div className="border-t border-border/70 p-4">
          <ChatInput onSend={sendMessage} disabled={isLoading} />
        </div>
      </Card>
    </div>
  )
}

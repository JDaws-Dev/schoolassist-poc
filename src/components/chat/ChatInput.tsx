import { useState } from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function ChatInput({ onSend, disabled }: { onSend: (value: string) => void; disabled?: boolean }) {
  const [value, setValue] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!value.trim()) return
    onSend(value)
    setValue('')
  }

  return (
    <form className="flex items-center gap-3" onSubmit={handleSubmit}>
      <Input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Ask Arti anything..."
        disabled={disabled}
        className="flex-1"
      />
      <Button type="submit" size="icon" disabled={disabled}>
        <Send className="h-4 w-4" />
      </Button>
    </form>
  )
}

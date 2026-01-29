import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export function AIHeroSection() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!query.trim()) return
    navigate(`/chat?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <Card className="border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-background">
      <CardContent className="space-y-4 p-6">
        <div className="flex items-center gap-2 text-primary">
          <Sparkles className="h-5 w-5" />
          <p className="text-sm font-semibold">Ask Arti, your Artios assistant</p>
        </div>
        <form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ask about schedules, policies, or events..."
            className="flex-1"
          />
          <Button type="submit" className="sm:w-auto">Ask Arti</Button>
        </form>
      </CardContent>
    </Card>
  )
}

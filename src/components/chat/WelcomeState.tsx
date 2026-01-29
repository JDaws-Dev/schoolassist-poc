import { Button } from '@/components/ui/button'

const SUGGESTIONS = [
  'What time does school start?',
  'Is today a school day?',
  'How do I order lunch?',
  'What is the dress code?',
]

export function WelcomeState({ onSelect }: { onSelect: (value: string) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-semibold">Hi, I'm Arti</p>
        <p className="text-sm text-muted-foreground">
          Ask me anything about schedules, policies, or school updates.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {SUGGESTIONS.map((suggestion) => (
          <Button
            key={suggestion}
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => onSelect(suggestion)}
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  )
}

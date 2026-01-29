export function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <span className="flex h-2 w-2 animate-pulse rounded-full bg-primary" />
      Arti is typing...
    </div>
  )
}

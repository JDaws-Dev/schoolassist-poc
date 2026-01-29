import { MapPin, CalendarPlus } from 'lucide-react'
import type { CalendarEvent } from '@/types'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { formatDateRange, generateGoogleCalendarUrl } from '@/utils/calendarUtils'

export function EventModal({
  event,
  open,
  onOpenChange,
}: {
  event: CalendarEvent | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  if (!event) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
          <DialogDescription>{formatDateRange(event.start, event.end, event.allDay)}</DialogDescription>
        </DialogHeader>
        <div className="space-y-3 text-sm">
          {event.location ? (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{event.location}</span>
            </div>
          ) : null}
          {event.description ? <p className="text-muted-foreground">{event.description}</p> : null}
        </div>
        <DialogFooter>
          <Button asChild variant="secondary">
            <a href={generateGoogleCalendarUrl(event)} target="_blank" rel="noreferrer">
              <CalendarPlus className="mr-2 h-4 w-4" />
              Add to Google Calendar
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

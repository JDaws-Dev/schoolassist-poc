import { CalendarCheck, Clock, MapPin } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SCHEDULE, SCHOOL_INFO } from '@/data/initialData'

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function getTodayStatus(date: Date) {
  const day = DAYS[date.getDay()]
  if (day === 'Monday') {
    return {
      label: 'On Campus',
      detail: 'Elementary (K-6) & Junior High (7-8) — Academics',
      badge: 'Academics',
      variant: 'success' as const,
    }
  }
  if (day === 'Tuesday') {
    return {
      label: 'On Campus',
      detail: 'High School (9-12) — Academics',
      badge: 'Academics',
      variant: 'success' as const,
    }
  }
  if (day === 'Wednesday') {
    return {
      label: 'On Campus',
      detail: 'Junior High (7-8) — Arts',
      badge: 'Arts',
      variant: 'success' as const,
    }
  }
  if (day === 'Thursday') {
    return {
      label: 'On Campus',
      detail: 'Elementary (K-6) — Arts',
      badge: 'Arts',
      variant: 'success' as const,
    }
  }
  if (day === 'Friday') {
    return {
      label: 'On Campus',
      detail: 'High School (9-12) — Arts',
      badge: 'Arts',
      variant: 'success' as const,
    }
  }
  return {
    label: 'Weekend',
    detail: 'No classes today. Enjoy your weekend!',
    badge: 'Weekend',
    variant: 'secondary' as const,
  }
}

export function TodayCard() {
  const today = new Date()
  const status = getTodayStatus(today)

  return (
    <Card className="border-0 bg-gradient-to-br from-primary/90 to-primary shadow-lg text-primary-foreground">
      <CardContent className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary-foreground/70">Today</p>
            <h2 className="text-2xl font-semibold">{status.label}</h2>
          </div>
          <Badge variant={status.variant} className="bg-white/15 text-white">
            {status.badge}
          </Badge>
        </div>
        <p className="text-sm text-primary-foreground/90">{status.detail}</p>
        <div className="grid gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Doors open {SCHEDULE.timing.doorsOpen} - School starts {SCHEDULE.timing.schoolStarts}
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {SCHOOL_INFO.address}
          </div>
          <div className="flex items-center gap-2">
            <CalendarCheck className="h-4 w-4" />
            Check FACTS for dismissal times.
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

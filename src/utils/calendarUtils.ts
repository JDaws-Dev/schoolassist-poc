import type { CalendarEvent } from '@/types'

export function parseICS(icsContent: string): CalendarEvent[] {
  const events: CalendarEvent[] = []
  const lines = icsContent.split(/\r\n|\n|\r/)
  let currentEvent: CalendarEvent | null = null
  let currentKey: string | null = null
  let currentValue = ''

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i]

    if (line.startsWith(' ') || line.startsWith('\t')) {
      currentValue += line.slice(1)
      continue
    }

    if (currentKey && currentEvent) {
      setEventProperty(currentEvent, currentKey, currentValue)
    }

    const colonIndex = line.indexOf(':')
    if (colonIndex === -1) {
      currentKey = null
      currentValue = ''
      continue
    }

    const keyPart = line.slice(0, colonIndex)
    const valuePart = line.slice(colonIndex + 1)
    const key = keyPart.split(';')[0]
    currentKey = key
    currentValue = valuePart

    if (key === 'BEGIN' && valuePart === 'VEVENT') {
      currentEvent = {
        id: '',
        title: '',
        description: '',
        location: '',
        start: null,
        end: null,
        allDay: false,
        url: '',
      }
    } else if (key === 'END' && valuePart === 'VEVENT' && currentEvent) {
      if (currentKey && currentKey !== 'END') {
        setEventProperty(currentEvent, currentKey, currentValue)
      }

      if (!currentEvent.id) {
        currentEvent.id = `event-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
      }

      if (currentEvent.start) {
        events.push(currentEvent)
      }
      currentEvent = null
      currentKey = null
      currentValue = ''
    }
  }

  return events
}

function setEventProperty(event: CalendarEvent, key: string, value: string) {
  switch (key) {
    case 'UID':
      event.id = value
      break
    case 'SUMMARY':
      event.title = unescapeICS(value)
      break
    case 'DESCRIPTION':
      event.description = unescapeICS(value)
      break
    case 'LOCATION':
      event.location = unescapeICS(value)
      break
    case 'URL':
      event.url = value
      break
    case 'DTSTART':
    case 'DTSTART;VALUE=DATE':
      event.start = parseICSDate(value)
      if (value.length === 8) {
        event.allDay = true
      }
      break
    case 'DTEND':
    case 'DTEND;VALUE=DATE':
      event.end = parseICSDate(value)
      break
  }
}

function parseICSDate(dateStr: string) {
  if (!dateStr) return null

  const cleanDate = dateStr.replace(/Z$/, '')

  if (cleanDate.length === 8) {
    const year = Number.parseInt(cleanDate.slice(0, 4), 10)
    const month = Number.parseInt(cleanDate.slice(4, 6), 10) - 1
    const day = Number.parseInt(cleanDate.slice(6, 8), 10)
    return new Date(year, month, day)
  }

  if (cleanDate.length >= 15) {
    const year = Number.parseInt(cleanDate.slice(0, 4), 10)
    const month = Number.parseInt(cleanDate.slice(4, 6), 10) - 1
    const day = Number.parseInt(cleanDate.slice(6, 8), 10)
    const hour = Number.parseInt(cleanDate.slice(9, 11), 10)
    const minute = Number.parseInt(cleanDate.slice(11, 13), 10)
    const second = Number.parseInt(cleanDate.slice(13, 15), 10)

    if (dateStr.endsWith('Z')) {
      return new Date(Date.UTC(year, month, day, hour, minute, second))
    }
    return new Date(year, month, day, hour, minute, second)
  }

  return null
}

function unescapeICS(str: string) {
  if (!str) return ''
  return str
    .replace(/\\n/g, '\n')
    .replace(/\\,/g, ',')
    .replace(/\\;/g, ';')
    .replace(/\\\\/g, '\\')
}

export function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

export function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

export function generateCalendarGrid(year: number, month: number) {
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)
  const daysInPrevMonth = getDaysInMonth(year, month - 1)

  const grid: Array<
    Array<{
      date: Date
      day: number
      isCurrentMonth: boolean
      isPreviousMonth?: boolean
      isNextMonth?: boolean
    }>
  > = []
  let currentDate = 1
  let nextMonthDate = 1

  for (let week = 0; week < 6; week += 1) {
    const weekDays = [] as Array<{
      date: Date
      day: number
      isCurrentMonth: boolean
      isPreviousMonth?: boolean
      isNextMonth?: boolean
    }>

    for (let day = 0; day < 7; day += 1) {
      const cellIndex = week * 7 + day

      if (cellIndex < firstDay) {
        const prevMonthDay = daysInPrevMonth - firstDay + cellIndex + 1
        weekDays.push({
          date: new Date(year, month - 1, prevMonthDay),
          day: prevMonthDay,
          isCurrentMonth: false,
          isPreviousMonth: true,
        })
      } else if (currentDate > daysInMonth) {
        weekDays.push({
          date: new Date(year, month + 1, nextMonthDate),
          day: nextMonthDate,
          isCurrentMonth: false,
          isNextMonth: true,
        })
        nextMonthDate += 1
      } else {
        weekDays.push({
          date: new Date(year, month, currentDate),
          day: currentDate,
          isCurrentMonth: true,
        })
        currentDate += 1
      }
    }

    grid.push(weekDays)

    if (currentDate > daysInMonth && week >= 4) {
      break
    }
  }

  return grid
}

export function isSameDay(date1: Date | null, date2: Date | null) {
  if (!date1 || !date2) return false
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

export function isToday(date: Date) {
  return isSameDay(date, new Date())
}

export function formatDate(date: Date, options: Intl.DateTimeFormatOptions = {}) {
  if (!date) return ''

  const defaultOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  return date.toLocaleDateString('en-US', { ...defaultOptions, ...options })
}

export function formatTime(date: Date) {
  if (!date) return ''
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

export function formatDateRange(start: Date | null, end: Date | null, allDay?: boolean) {
  if (!start) return ''

  if (allDay) {
    if (!end || isSameDay(start, end) || isSameDay(start, new Date(end.getTime() - 86400000))) {
      return formatDate(start, { weekday: 'short', month: 'short', day: 'numeric' })
    }
    const endDisplay = new Date(end.getTime() - 86400000)
    return `${formatDate(start, { month: 'short', day: 'numeric' })} - ${formatDate(endDisplay, {
      month: 'short',
      day: 'numeric',
    })}`
  }

  const startDateStr = formatDate(start, { weekday: 'short', month: 'short', day: 'numeric' })
  const startTimeStr = formatTime(start)

  if (!end) {
    return `${startDateStr} at ${startTimeStr}`
  }

  if (isSameDay(start, end)) {
    return `${startDateStr}, ${startTimeStr} - ${formatTime(end)}`
  }

  return `${startDateStr} ${startTimeStr} - ${formatDate(end, {
    month: 'short',
    day: 'numeric',
  })} ${formatTime(end)}`
}

export function generateGoogleCalendarUrl(event: CalendarEvent) {
  const baseUrl = 'https://www.google.com/calendar/render'
  const params = new URLSearchParams()

  params.set('action', 'TEMPLATE')
  params.set('text', event.title || 'Event')

  if (event.description) {
    params.set('details', event.description)
  }

  if (event.location) {
    params.set('location', event.location)
  }

  if (event.start) {
    const formatForGoogle = (date: Date, isAllDay?: boolean) => {
      if (isAllDay) {
        return date.toISOString().slice(0, 10).replace(/-/g, '')
      }
      return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
    }

    const startStr = formatForGoogle(event.start, event.allDay)
    const endStr = event.end
      ? formatForGoogle(event.end, event.allDay)
      : formatForGoogle(new Date(event.start.getTime() + 3600000), event.allDay)

    params.set('dates', `${startStr}/${endStr}`)
  }

  return `${baseUrl}?${params.toString()}`
}

export function getEventsForDate(events: CalendarEvent[], date: Date) {
  return events.filter((event) => {
    if (!event.start) return false

    if (event.end) {
      const eventStart = new Date(event.start)
      eventStart.setHours(0, 0, 0, 0)

      const eventEnd = new Date(event.end)
      eventEnd.setHours(23, 59, 59, 999)

      const checkDate = new Date(date)
      checkDate.setHours(12, 0, 0, 0)

      return checkDate >= eventStart && checkDate <= eventEnd
    }

    return isSameDay(event.start, date)
  })
}

export function sortEventsByDate(events: CalendarEvent[]) {
  return [...events].sort((a, b) => {
    if (!a.start) return 1
    if (!b.start) return -1
    return a.start.getTime() - b.start.getTime()
  })
}

export function getEventsForMonth(events: CalendarEvent[], year: number, month: number) {
  const startOfMonth = new Date(year, month, 1)
  const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59)

  return events.filter((event) => {
    if (!event.start) return false

    if (event.start >= startOfMonth && event.start <= endOfMonth) {
      return true
    }

    if (event.end && event.start < startOfMonth && event.end >= startOfMonth) {
      return true
    }

    return false
  })
}

export function groupEventsByDate(events: CalendarEvent[]) {
  const grouped: Record<string, CalendarEvent[]> = {}

  for (const event of events) {
    if (!event.start) continue

    const dateKey = event.start.toISOString().slice(0, 10)
    if (!grouped[dateKey]) {
      grouped[dateKey] = []
    }
    grouped[dateKey].push(event)
  }

  for (const dateKey of Object.keys(grouped)) {
    grouped[dateKey] = sortEventsByDate(grouped[dateKey])
  }

  return grouped
}

export function getMonthName(month: number) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  return months[month]
}

export function getShortDayNames() {
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
}

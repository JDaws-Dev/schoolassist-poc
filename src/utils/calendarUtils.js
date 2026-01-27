/**
 * Calendar utility functions for parsing ICS feeds and date manipulation
 */

// Parse an ICS file content into structured event objects
export function parseICS(icsContent) {
  const events = []
  const lines = icsContent.split(/\r\n|\n|\r/)
  let currentEvent = null
  let currentKey = null
  let currentValue = ''

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]

    // Handle line folding (lines starting with space or tab are continuations)
    if (line.startsWith(' ') || line.startsWith('\t')) {
      currentValue += line.slice(1)
      continue
    }

    // Process the previous key-value pair
    if (currentKey && currentEvent) {
      setEventProperty(currentEvent, currentKey, currentValue)
    }

    // Parse new key-value pair
    const colonIndex = line.indexOf(':')
    if (colonIndex === -1) {
      currentKey = null
      currentValue = ''
      continue
    }

    const keyPart = line.slice(0, colonIndex)
    const valuePart = line.slice(colonIndex + 1)

    // Handle parameters in key (e.g., DTSTART;VALUE=DATE:20260126)
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
      // Process any remaining key-value
      if (currentKey && currentKey !== 'END') {
        setEventProperty(currentEvent, currentKey, currentValue)
      }

      // Generate ID if not present
      if (!currentEvent.id) {
        currentEvent.id = `event-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
      }

      // Only add events with valid dates
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

function setEventProperty(event, key, value) {
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

// Parse ICS date format (YYYYMMDD or YYYYMMDDTHHmmssZ)
function parseICSDate(dateStr) {
  if (!dateStr) return null

  // Remove any timezone suffix for parsing
  const cleanDate = dateStr.replace(/Z$/, '')

  // All-day event format: YYYYMMDD
  if (cleanDate.length === 8) {
    const year = parseInt(cleanDate.slice(0, 4))
    const month = parseInt(cleanDate.slice(4, 6)) - 1
    const day = parseInt(cleanDate.slice(6, 8))
    return new Date(year, month, day)
  }

  // DateTime format: YYYYMMDDTHHmmss
  if (cleanDate.length >= 15) {
    const year = parseInt(cleanDate.slice(0, 4))
    const month = parseInt(cleanDate.slice(4, 6)) - 1
    const day = parseInt(cleanDate.slice(6, 8))
    const hour = parseInt(cleanDate.slice(9, 11))
    const minute = parseInt(cleanDate.slice(11, 13))
    const second = parseInt(cleanDate.slice(13, 15))

    // If original had Z suffix, treat as UTC
    if (dateStr.endsWith('Z')) {
      return new Date(Date.UTC(year, month, day, hour, minute, second))
    }
    return new Date(year, month, day, hour, minute, second)
  }

  return null
}

// Unescape ICS special characters
function unescapeICS(str) {
  if (!str) return ''
  return str
    .replace(/\\n/g, '\n')
    .replace(/\\,/g, ',')
    .replace(/\\;/g, ';')
    .replace(/\\\\/g, '\\')
}

// Get days in a month
export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

// Get the day of week the month starts on (0 = Sunday)
export function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay()
}

// Generate calendar grid for a month (6 weeks x 7 days)
export function generateCalendarGrid(year, month) {
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)
  const daysInPrevMonth = getDaysInMonth(year, month - 1)

  const grid = []
  let currentDate = 1
  let nextMonthDate = 1

  for (let week = 0; week < 6; week++) {
    const weekDays = []

    for (let day = 0; day < 7; day++) {
      const cellIndex = week * 7 + day

      if (cellIndex < firstDay) {
        // Previous month days
        const prevMonthDay = daysInPrevMonth - firstDay + cellIndex + 1
        weekDays.push({
          date: new Date(year, month - 1, prevMonthDay),
          day: prevMonthDay,
          isCurrentMonth: false,
          isPreviousMonth: true,
        })
      } else if (currentDate > daysInMonth) {
        // Next month days
        weekDays.push({
          date: new Date(year, month + 1, nextMonthDate),
          day: nextMonthDate,
          isCurrentMonth: false,
          isNextMonth: true,
        })
        nextMonthDate++
      } else {
        // Current month days
        weekDays.push({
          date: new Date(year, month, currentDate),
          day: currentDate,
          isCurrentMonth: true,
        })
        currentDate++
      }
    }

    grid.push(weekDays)

    // Stop if we've covered all current month days and filled a complete week
    if (currentDate > daysInMonth && week >= 4) {
      break
    }
  }

  return grid
}

// Check if two dates are the same day
export function isSameDay(date1, date2) {
  if (!date1 || !date2) return false
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

// Check if a date is today
export function isToday(date) {
  return isSameDay(date, new Date())
}

// Format date for display
export function formatDate(date, options = {}) {
  if (!date) return ''

  const defaultOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  return date.toLocaleDateString('en-US', { ...defaultOptions, ...options })
}

// Format time for display
export function formatTime(date) {
  if (!date) return ''
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

// Format date range for display
export function formatDateRange(start, end, allDay) {
  if (!start) return ''

  if (allDay) {
    if (!end || isSameDay(start, end) || isSameDay(start, new Date(end.getTime() - 86400000))) {
      return formatDate(start, { weekday: 'short', month: 'short', day: 'numeric' })
    }
    // Multi-day all-day event
    const endDisplay = new Date(end.getTime() - 86400000) // End date is exclusive in ICS
    return `${formatDate(start, { month: 'short', day: 'numeric' })} - ${formatDate(endDisplay, { month: 'short', day: 'numeric' })}`
  }

  const startDateStr = formatDate(start, { weekday: 'short', month: 'short', day: 'numeric' })
  const startTimeStr = formatTime(start)

  if (!end) {
    return `${startDateStr} at ${startTimeStr}`
  }

  if (isSameDay(start, end)) {
    return `${startDateStr}, ${startTimeStr} - ${formatTime(end)}`
  }

  return `${startDateStr} ${startTimeStr} - ${formatDate(end, { month: 'short', day: 'numeric' })} ${formatTime(end)}`
}

// Generate Google Calendar URL for adding an event
export function generateGoogleCalendarUrl(event) {
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
    const formatForGoogle = (date, allDay) => {
      if (allDay) {
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

// Get events for a specific date
export function getEventsForDate(events, date) {
  return events.filter(event => {
    if (!event.start) return false

    // For all-day events or events that span multiple days
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

// Sort events by start date
export function sortEventsByDate(events) {
  return [...events].sort((a, b) => {
    if (!a.start) return 1
    if (!b.start) return -1
    return a.start.getTime() - b.start.getTime()
  })
}

// Get events for a month
export function getEventsForMonth(events, year, month) {
  const startOfMonth = new Date(year, month, 1)
  const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59)

  return events.filter(event => {
    if (!event.start) return false

    // Event starts in this month
    if (event.start >= startOfMonth && event.start <= endOfMonth) {
      return true
    }

    // Event spans into this month
    if (event.end && event.start < startOfMonth && event.end >= startOfMonth) {
      return true
    }

    return false
  })
}

// Group events by date for agenda view
export function groupEventsByDate(events) {
  const grouped = {}

  for (const event of events) {
    if (!event.start) continue

    const dateKey = event.start.toISOString().slice(0, 10)
    if (!grouped[dateKey]) {
      grouped[dateKey] = []
    }
    grouped[dateKey].push(event)
  }

  // Sort events within each day
  for (const dateKey of Object.keys(grouped)) {
    grouped[dateKey] = sortEventsByDate(grouped[dateKey])
  }

  return grouped
}

// Get month name
export function getMonthName(month) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  return months[month]
}

// Get short day names
export function getShortDayNames() {
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
}

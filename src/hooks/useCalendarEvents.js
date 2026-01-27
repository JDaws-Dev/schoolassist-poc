import { useState, useEffect, useCallback } from 'react'
import { parseICS, sortEventsByDate } from '../utils/calendarUtils'

// Sample ICS data for development/demo purposes
// In production, this would be fetched from Google Calendar ICS feed
const SAMPLE_ICS = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Artios Academies//School Calendar//EN
BEGIN:VEVENT
UID:event-1@artios.edu
DTSTART:20260126
DTEND:20260127
SUMMARY:Elementary On Campus
DESCRIPTION:Elementary students (K-6) attend campus today.
LOCATION:Artios Academies, 415 Brogdon Road, Suwanee, GA 30024
END:VEVENT
BEGIN:VEVENT
UID:event-2@artios.edu
DTSTART:20260127T140000
DTEND:20260127T160000
SUMMARY:Parent Information Night
DESCRIPTION:Join us for an evening of information about the upcoming semester. Light refreshments will be served.
LOCATION:Main Hall
END:VEVENT
BEGIN:VEVENT
UID:event-3@artios.edu
DTSTART:20260128
DTEND:20260129
SUMMARY:Jr High & High School On Campus
DESCRIPTION:Jr High (7-8) and High School (9-12) students attend campus today.
LOCATION:Artios Academies, 415 Brogdon Road, Suwanee, GA 30024
END:VEVENT
BEGIN:VEVENT
UID:event-4@artios.edu
DTSTART:20260128
DTEND:20260129
SUMMARY:Elementary On Campus
DESCRIPTION:Elementary students (K-6) attend campus today.
LOCATION:Artios Academies, 415 Brogdon Road, Suwanee, GA 30024
END:VEVENT
BEGIN:VEVENT
UID:event-5@artios.edu
DTSTART:20260130T180000
DTEND:20260130T200000
SUMMARY:Science Fair
DESCRIPTION:Annual science fair featuring student projects from all grade levels. Families welcome!
LOCATION:Gymnasium
END:VEVENT
BEGIN:VEVENT
UID:event-6@artios.edu
DTSTART:20260202
DTEND:20260203
SUMMARY:Professional Development Day - No School
DESCRIPTION:Teachers will be attending professional development. No classes for students.
END:VEVENT
BEGIN:VEVENT
UID:event-7@artios.edu
DTSTART:20260205T100000
DTEND:20260205T110000
SUMMARY:Chapel Service
DESCRIPTION:Weekly chapel service for all students.
LOCATION:Main Hall
END:VEVENT
BEGIN:VEVENT
UID:event-8@artios.edu
DTSTART:20260210
DTEND:20260211
SUMMARY:Valentine's Day Celebration
DESCRIPTION:Students may exchange valentines. Class parties during last period.
LOCATION:Individual Classrooms
END:VEVENT
BEGIN:VEVENT
UID:event-9@artios.edu
DTSTART:20260214
DTEND:20260215
SUMMARY:Mid-Winter Break
DESCRIPTION:No school - Mid-Winter Break
END:VEVENT
BEGIN:VEVENT
UID:event-10@artios.edu
DTSTART:20260220T190000
DTEND:20260220T210000
SUMMARY:Spring Musical Auditions
DESCRIPTION:Auditions for the spring musical. Open to students in grades 5-12.
LOCATION:Auditorium
END:VEVENT
BEGIN:VEVENT
UID:event-11@artios.edu
DTSTART:20260303T083000
DTEND:20260303T150000
SUMMARY:Spring Pictures
DESCRIPTION:Individual and class photos. Dress code: Sunday best.
LOCATION:Main Hall
END:VEVENT
BEGIN:VEVENT
UID:event-12@artios.edu
DTSTART:20260315
DTEND:20260322
SUMMARY:Spring Break
DESCRIPTION:No school - Spring Break
END:VEVENT
END:VCALENDAR`

// Default calendar URL - can be configured via environment variable
const DEFAULT_CALENDAR_URL = import.meta.env.VITE_GOOGLE_CALENDAR_ICS_URL || null

// Cache duration in milliseconds (15 minutes)
const CACHE_DURATION = 15 * 60 * 1000

// localStorage key for caching
const CACHE_KEY = 'artios-calendar-cache'

export function useCalendarEvents(calendarUrl = DEFAULT_CALENDAR_URL) {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)

  // Load cached data
  const loadFromCache = useCallback(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        const { events: cachedEvents, timestamp, url } = JSON.parse(cached)

        // Check if cache is still valid and for the same URL
        const isValid = Date.now() - timestamp < CACHE_DURATION
        const isSameUrl = url === calendarUrl

        if (isValid && isSameUrl && cachedEvents) {
          // Rehydrate dates from ISO strings
          const rehydrated = cachedEvents.map(event => ({
            ...event,
            start: event.start ? new Date(event.start) : null,
            end: event.end ? new Date(event.end) : null,
          }))
          return { events: rehydrated, timestamp }
        }
      }
    } catch {
      // Ignore cache errors
    }
    return null
  }, [calendarUrl])

  // Save to cache
  const saveToCache = useCallback((eventsData) => {
    try {
      const cacheData = {
        events: eventsData,
        timestamp: Date.now(),
        url: calendarUrl,
      }
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))
    } catch {
      // Ignore cache errors (e.g., quota exceeded)
    }
  }, [calendarUrl])

  // Fetch events from ICS feed
  const fetchEvents = useCallback(async (useCache = true) => {
    setLoading(true)
    setError(null)

    try {
      // Try to load from cache first
      if (useCache) {
        const cached = loadFromCache()
        if (cached) {
          setEvents(cached.events)
          setLastUpdated(new Date(cached.timestamp))
          setLoading(false)
          return
        }
      }

      let icsContent

      // If no URL provided, use sample data
      if (!calendarUrl) {
        icsContent = SAMPLE_ICS
      } else {
        // Fetch from the ICS URL
        // Note: May need a CORS proxy in production
        const response = await fetch(calendarUrl)
        if (!response.ok) {
          throw new Error(`Failed to fetch calendar: ${response.status}`)
        }
        icsContent = await response.text()
      }

      // Parse the ICS content
      const parsedEvents = parseICS(icsContent)
      const sortedEvents = sortEventsByDate(parsedEvents)

      // Update state
      setEvents(sortedEvents)
      setLastUpdated(new Date())
      saveToCache(sortedEvents)
    } catch (err) {
      console.error('Error fetching calendar events:', err)
      setError(err.message || 'Failed to load calendar events')

      // Try to use cached data as fallback
      const cached = loadFromCache()
      if (cached) {
        setEvents(cached.events)
        setLastUpdated(new Date(cached.timestamp))
      } else {
        // Use sample data as last resort
        const sampleEvents = parseICS(SAMPLE_ICS)
        setEvents(sortEventsByDate(sampleEvents))
        setLastUpdated(new Date())
      }
    } finally {
      setLoading(false)
    }
  }, [calendarUrl, loadFromCache, saveToCache])

  // Initial fetch
  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  // Refresh function (bypass cache)
  const refresh = useCallback(() => {
    return fetchEvents(false)
  }, [fetchEvents])

  return {
    events,
    loading,
    error,
    lastUpdated,
    refresh,
  }
}

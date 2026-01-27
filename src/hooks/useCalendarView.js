import { useState, useCallback, useEffect } from 'react'

// localStorage key for view preference
const VIEW_PREFERENCE_KEY = 'artios-calendar-view'

/**
 * Hook for managing calendar view state and preferences
 */
export function useCalendarView() {
  // Load initial view preference from localStorage
  const getInitialView = () => {
    try {
      const saved = localStorage.getItem(VIEW_PREFERENCE_KEY)
      if (saved === 'month' || saved === 'list') {
        return saved
      }
    } catch {
      // Ignore localStorage errors
    }
    return 'month' // Default to month view
  }

  const [view, setViewState] = useState(getInitialView)
  const [currentDate, setCurrentDate] = useState(new Date())

  // Persist view preference to localStorage
  const setView = useCallback((newView) => {
    setViewState(newView)
    try {
      localStorage.setItem(VIEW_PREFERENCE_KEY, newView)
    } catch {
      // Ignore localStorage errors
    }
  }, [])

  // Navigate to previous month
  const goToPreviousMonth = useCallback(() => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(newDate.getMonth() - 1)
      return newDate
    })
  }, [])

  // Navigate to next month
  const goToNextMonth = useCallback(() => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(newDate.getMonth() + 1)
      return newDate
    })
  }, [])

  // Navigate to today
  const goToToday = useCallback(() => {
    setCurrentDate(new Date())
  }, [])

  // Navigate to a specific date
  const goToDate = useCallback((date) => {
    setCurrentDate(new Date(date))
  }, [])

  // Navigate to a specific month/year
  const goToMonth = useCallback((year, month) => {
    setCurrentDate(new Date(year, month, 1))
  }, [])

  // Toggle between month and list view
  const toggleView = useCallback(() => {
    setView(view === 'month' ? 'list' : 'month')
  }, [view, setView])

  // Current year and month
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()

  // Check if viewing current month
  const isCurrentMonth = (() => {
    const today = new Date()
    return today.getFullYear() === currentYear && today.getMonth() === currentMonth
  })()

  return {
    view,
    setView,
    toggleView,
    currentDate,
    currentYear,
    currentMonth,
    isCurrentMonth,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    goToDate,
    goToMonth,
  }
}

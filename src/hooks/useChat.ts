import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { ChatMessage } from '@/types'

const HISTORY_KEY = 'artios-chat-history'
const SESSION_KEY = 'artios-session-id'

const SUGGESTED_RESPONSES: Record<string, string> = {
  schedule:
    "Artios follows a hybrid schedule:\n\nMonday: Elementary & Junior High (Academics)\nTuesday: High School (Academics)\nWednesday: Junior High (Arts)\nThursday: Elementary (Arts)\nFriday: High School (Arts)\n\nDoors open at 8:50 AM and school starts at 9:00 AM.",
  lunch:
    'Lunch is ordered through ArtiosCafe.com by 10 AM on class days, or bring lunch from home. Note: No heating or refrigeration available. Please avoid nut products due to student allergies.',
  contact:
    'Artios Academies of Sugar Hill is located at 415 Brogdon Road, Suwanee, GA 30024. For general questions, contact Director John Lane at jmlane@artiosacademies.com. For technical issues: support@artiosacademies.com. For billing: billing@artiosacademies.com.',
  dress:
    'Artios t-shirt required with twill or denim pants/shorts. Shorts must be within 3 inches of the knee. No holes, rips, sweatpants, leggings, or jeggings. Hats not permitted indoors.',
  default:
    "I'm here to help with schedule details, lunch ordering, policies, contacts, and events. What would you like to know?",
}

function getFallbackResponse(message: string) {
  const lower = message.toLowerCase()
  if (lower.includes('schedule') || lower.includes('time') || lower.includes('campus')) {
    return SUGGESTED_RESPONSES.schedule
  }
  if (lower.includes('lunch') || lower.includes('food') || lower.includes('cafe')) {
    return SUGGESTED_RESPONSES.lunch
  }
  if (lower.includes('contact') || lower.includes('email') || lower.includes('office')) {
    return SUGGESTED_RESPONSES.contact
  }
  if (lower.includes('dress') || lower.includes('uniform') || lower.includes('wear')) {
    return SUGGESTED_RESPONSES.dress
  }
  return SUGGESTED_RESPONSES.default
}

function loadHistory(): ChatMessage[] {
  try {
    const stored = localStorage.getItem(HISTORY_KEY)
    return stored ? (JSON.parse(stored) as ChatMessage[]) : []
  } catch {
    return []
  }
}

function persistHistory(messages: ChatMessage[]) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(messages))
  } catch {
    return null
  }
  return null
}

function getSessionId() {
  const stored = localStorage.getItem(SESSION_KEY)
  if (stored) return stored
  const id = crypto.randomUUID()
  localStorage.setItem(SESSION_KEY, id)
  return id
}

export function useChat() {
  const [searchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const initialSent = useRef(false)

  const [messages, setMessages] = useState<ChatMessage[]>(() => loadHistory())
  const [isLoading, setIsLoading] = useState(false)

  const sessionId = useMemo(() => getSessionId(), [])

  useEffect(() => {
    persistHistory(messages)
  }, [messages])

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || isLoading) return

      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'user',
        content: trimmed,
        createdAt: Date.now(),
      }

      const history = [...messages, userMessage]
      setMessages(history)
      setIsLoading(true)

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: trimmed, history, sessionId }),
        })

        if (!response.ok) throw new Error('API request failed')

        const data = (await response.json()) as { response: string }

        const assistantMessage: ChatMessage = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: data.response,
          createdAt: Date.now(),
        }

        setMessages((prev) => [...prev, assistantMessage])
      } catch {
        const fallback = getFallbackResponse(trimmed)
        const assistantMessage: ChatMessage = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: fallback,
          createdAt: Date.now(),
        }
        setMessages((prev) => [...prev, assistantMessage])
      }

      setIsLoading(false)
    },
    [isLoading, messages, sessionId]
  )

  useEffect(() => {
    if (initialQuery && !initialSent.current) {
      initialSent.current = true
      sendMessage(initialQuery)
    }
  }, [initialQuery, sendMessage])

  const clearChat = useCallback(() => {
    setMessages([])
    localStorage.removeItem(HISTORY_KEY)
  }, [])

  return {
    messages,
    isLoading,
    sessionId,
    sendMessage,
    clearChat,
  }
}

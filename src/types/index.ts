export type CalendarEvent = {
  id: string
  title: string
  description?: string
  location?: string
  start: Date | null
  end: Date | null
  allDay?: boolean
  url?: string
}

export type Announcement = {
  _id?: string
  title: string
  content: string
  date: string
  url?: string
}

export type Notification = {
  _id?: string
  title: string
  content?: string
  type: 'alert' | 'info' | 'warning' | 'success'
  isLive: boolean
  postedAt?: number
  expiresAt?: number
  scheduledFor?: number
}

export type ChatRole = 'user' | 'assistant'

export type ChatMessage = {
  id: string
  role: ChatRole
  content: string
  createdAt: number
}

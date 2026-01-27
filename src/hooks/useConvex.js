/**
 * Convex hooks for accessing real-time data
 *
 * These hooks wrap Convex queries and mutations for use in React components.
 * They provide real-time updates and optimistic UI handling.
 */

import { useQuery, useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'

// ============================================
// ANNOUNCEMENTS
// ============================================

/**
 * Get all announcements (sorted by date, newest first)
 */
export function useAnnouncements() {
  return useQuery(api.announcements.list) ?? []
}

/**
 * Get recent announcements (for home page)
 * @param {number} limit - Maximum number of announcements to return
 */
export function useRecentAnnouncements(limit = 2) {
  return useQuery(api.announcements.getRecent, { limit }) ?? []
}

/**
 * Get a single announcement by ID
 * @param {string} id - The announcement ID
 */
export function useAnnouncement(id) {
  return useQuery(api.announcements.get, id ? { id } : 'skip')
}

/**
 * Announcement mutations
 */
export function useAnnouncementMutations() {
  return {
    create: useMutation(api.announcements.create),
    update: useMutation(api.announcements.update),
    remove: useMutation(api.announcements.remove),
  }
}

// ============================================
// NOTIFICATIONS
// ============================================

/**
 * Get all notifications (for admin)
 */
export function useNotifications() {
  return useQuery(api.notifications.list) ?? []
}

/**
 * Get active notifications (for display to users)
 * Filters by isLive, scheduledFor, and expiresAt
 */
export function useActiveNotifications() {
  return useQuery(api.notifications.getActive) ?? []
}

/**
 * Get a single notification by ID
 * @param {string} id - The notification ID
 */
export function useNotification(id) {
  return useQuery(api.notifications.get, id ? { id } : 'skip')
}

/**
 * Notification mutations
 */
export function useNotificationMutations() {
  return {
    create: useMutation(api.notifications.create),
    update: useMutation(api.notifications.update),
    remove: useMutation(api.notifications.remove),
    toggleLive: useMutation(api.notifications.toggleLive),
  }
}

// ============================================
// NOTIFICATION METRICS
// ============================================

/**
 * Get metrics for a specific notification
 * @param {string} notificationId - The notification ID
 */
export function useNotificationMetrics(notificationId) {
  return useQuery(
    api.notificationMetrics.getByNotification,
    notificationId ? { notificationId } : 'skip'
  )
}

/**
 * Get aggregated metrics (total views and dismisses)
 */
export function useAggregatedMetrics() {
  return useQuery(api.notificationMetrics.getAggregated)
}

/**
 * Notification metrics mutations
 */
export function useNotificationMetricsMutations() {
  return {
    recordView: useMutation(api.notificationMetrics.recordView),
    recordDismiss: useMutation(api.notificationMetrics.recordDismiss),
  }
}

// ============================================
// AI SETTINGS
// ============================================

/**
 * Get AI settings (system prompt, temperature, knowledge base)
 */
export function useAISettings() {
  return useQuery(api.aiSettings.get)
}

/**
 * AI settings mutations
 */
export function useAISettingsMutations() {
  return {
    upsert: useMutation(api.aiSettings.upsert),
    updateSystemPrompt: useMutation(api.aiSettings.updateSystemPrompt),
    updateTemperature: useMutation(api.aiSettings.updateTemperature),
    addKnowledge: useMutation(api.aiSettings.addKnowledge),
    updateKnowledge: useMutation(api.aiSettings.updateKnowledge),
    removeKnowledge: useMutation(api.aiSettings.removeKnowledge),
  }
}

// ============================================
// CHAT SESSIONS
// ============================================

/**
 * Get chat analytics
 */
export function useChatAnalytics() {
  return useQuery(api.chatSessions.getAnalytics)
}

/**
 * Get a session by sessionId
 * @param {string} sessionId - The session ID
 */
export function useChatSession(sessionId) {
  return useQuery(
    api.chatSessions.getBySessionId,
    sessionId ? { sessionId } : 'skip'
  )
}

/**
 * Chat session mutations
 */
export function useChatSessionMutations() {
  return {
    upsert: useMutation(api.chatSessions.upsert),
    recordMessage: useMutation(api.chatSessions.recordMessage),
    startSession: useMutation(api.chatSessions.startSession),
  }
}

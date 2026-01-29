import { useMutation, useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'

export function useAnnouncements() {
  return useQuery(api.announcements.list) ?? []
}

export function useRecentAnnouncements(limit = 2) {
  return useQuery(api.announcements.getRecent, { limit }) ?? []
}

export function useAnnouncement(id?: string) {
  return useQuery(api.announcements.get, id ? { id } : 'skip')
}

export function useAnnouncementMutations() {
  return {
    create: useMutation(api.announcements.create),
    update: useMutation(api.announcements.update),
    remove: useMutation(api.announcements.remove),
  }
}

export function useNotifications() {
  return useQuery(api.notifications.list) ?? []
}

export function useActiveNotifications() {
  return useQuery(api.notifications.getActive) ?? []
}

export function useNotification(id?: string) {
  return useQuery(api.notifications.get, id ? { id } : 'skip')
}

export function useNotificationMutations() {
  return {
    create: useMutation(api.notifications.create),
    update: useMutation(api.notifications.update),
    remove: useMutation(api.notifications.remove),
    toggleLive: useMutation(api.notifications.toggleLive),
  }
}

export function useNotificationMetrics(notificationId?: string) {
  return useQuery(
    api.notificationMetrics.getByNotification,
    notificationId ? { notificationId } : 'skip'
  )
}

export function useAggregatedMetrics() {
  return useQuery(api.notificationMetrics.getAggregated)
}

export function useNotificationMetricsMutations() {
  return {
    recordView: useMutation(api.notificationMetrics.recordView),
    recordDismiss: useMutation(api.notificationMetrics.recordDismiss),
  }
}

export function useAISettings() {
  return useQuery(api.aiSettings.get)
}

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

export function useChatAnalytics() {
  return useQuery(api.chatSessions.getAnalytics)
}

export function useChatSession(sessionId?: string) {
  return useQuery(api.chatSessions.getBySessionId, sessionId ? { sessionId } : 'skip')
}

export function useChatSessionMutations() {
  return {
    upsert: useMutation(api.chatSessions.upsert),
    recordMessage: useMutation(api.chatSessions.recordMessage),
    startSession: useMutation(api.chatSessions.startSession),
  }
}

export function useLinktreeLinks() {
  return useQuery(api.linktree.list) ?? []
}

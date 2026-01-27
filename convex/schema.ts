import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Announcements from admin to display on home page
  announcements: defineTable({
    title: v.string(),
    content: v.string(),
    date: v.string(),
    priority: v.string(),
    type: v.optional(v.string()),
    url: v.optional(v.string()),
  }),

  // Notifications/alerts that can be scheduled and expired
  notifications: defineTable({
    title: v.string(),
    content: v.optional(v.string()),
    type: v.string(), // 'alert' | 'info' | 'warning' | 'success'
    isLive: v.boolean(),
    postedAt: v.optional(v.number()), // timestamp
    expiresAt: v.optional(v.number()), // timestamp
    scheduledFor: v.optional(v.number()), // timestamp
  }),

  // AI assistant settings managed by admin
  aiSettings: defineTable({
    systemPrompt: v.optional(v.string()),
    temperature: v.optional(v.number()),
    knowledge: v.optional(
      v.array(
        v.object({
          id: v.string(),
          topic: v.string(),
          info: v.string(),
          createdAt: v.number(),
        })
      )
    ),
  }),

  // Metrics for notification engagement
  notificationMetrics: defineTable({
    notificationId: v.id("notifications"),
    viewCount: v.number(),
    dismissCount: v.number(),
  }).index("by_notification", ["notificationId"]),

  // Chat session analytics
  chatSessions: defineTable({
    sessionId: v.string(),
    startedAt: v.number(),
    messageCount: v.number(),
    lastMessageAt: v.number(),
  }).index("by_session", ["sessionId"]),
});

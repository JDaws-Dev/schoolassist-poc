import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get all chat sessions (for admin analytics)
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("chatSessions").collect();
  },
});

// Get a session by sessionId
export const getBySessionId = query({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("chatSessions")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .first();
  },
});

// Get analytics summary
export const getAnalytics = query({
  args: {},
  handler: async (ctx) => {
    const sessions = await ctx.db.query("chatSessions").collect();

    const totalSessions = sessions.length;
    const totalMessages = sessions.reduce((acc, s) => acc + s.messageCount, 0);
    const averageMessages =
      totalSessions > 0 ? totalMessages / totalSessions : 0;

    // Get sessions from last 24 hours
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    const recentSessions = sessions.filter((s) => s.startedAt > oneDayAgo);

    // Get sessions from last 7 days
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const weekSessions = sessions.filter((s) => s.startedAt > oneWeekAgo);

    return {
      totalSessions,
      totalMessages,
      averageMessagesPerSession: Math.round(averageMessages * 10) / 10,
      sessionsLast24Hours: recentSessions.length,
      sessionsLast7Days: weekSessions.length,
      messagesLast24Hours: recentSessions.reduce(
        (acc, s) => acc + s.messageCount,
        0
      ),
      messagesLast7Days: weekSessions.reduce(
        (acc, s) => acc + s.messageCount,
        0
      ),
    };
  },
});

// Create or update a session (upsert by sessionId)
export const upsert = mutation({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("chatSessions")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .first();

    const now = Date.now();

    if (existing) {
      await ctx.db.patch(existing._id, {
        messageCount: existing.messageCount + 1,
        lastMessageAt: now,
      });
      return await ctx.db.get(existing._id);
    } else {
      return await ctx.db.insert("chatSessions", {
        sessionId: args.sessionId,
        startedAt: now,
        messageCount: 1,
        lastMessageAt: now,
      });
    }
  },
});

// Record a message in a session
export const recordMessage = mutation({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("chatSessions")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .first();

    const now = Date.now();

    if (existing) {
      await ctx.db.patch(existing._id, {
        messageCount: existing.messageCount + 1,
        lastMessageAt: now,
      });
      return await ctx.db.get(existing._id);
    } else {
      return await ctx.db.insert("chatSessions", {
        sessionId: args.sessionId,
        startedAt: now,
        messageCount: 1,
        lastMessageAt: now,
      });
    }
  },
});

// Start a new session
export const startSession = mutation({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("chatSessions")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .first();

    if (existing) {
      return existing;
    }

    const now = Date.now();
    return await ctx.db.insert("chatSessions", {
      sessionId: args.sessionId,
      startedAt: now,
      messageCount: 0,
      lastMessageAt: now,
    });
  },
});

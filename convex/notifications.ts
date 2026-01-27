import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get all notifications
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("notifications").collect();
  },
});

// Get active/live notifications (for display to users)
export const getActive = query({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const notifications = await ctx.db.query("notifications").collect();

    return notifications.filter((notification) => {
      // Must be live
      if (!notification.isLive) return false;

      // Check if scheduled (should be in the past or not scheduled)
      if (notification.scheduledFor && notification.scheduledFor > now) {
        return false;
      }

      // Check if expired
      if (notification.expiresAt && notification.expiresAt < now) {
        return false;
      }

      return true;
    });
  },
});

// Get a single notification by ID
export const get = query({
  args: { id: v.id("notifications") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Create a new notification
export const create = mutation({
  args: {
    title: v.string(),
    content: v.optional(v.string()),
    type: v.string(),
    isLive: v.boolean(),
    postedAt: v.optional(v.number()),
    expiresAt: v.optional(v.number()),
    scheduledFor: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const notification = {
      ...args,
      postedAt: args.postedAt ?? Date.now(),
    };
    return await ctx.db.insert("notifications", notification);
  },
});

// Update an existing notification
export const update = mutation({
  args: {
    id: v.id("notifications"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    type: v.optional(v.string()),
    isLive: v.optional(v.boolean()),
    postedAt: v.optional(v.number()),
    expiresAt: v.optional(v.number()),
    scheduledFor: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([, v]) => v !== undefined)
    );
    await ctx.db.patch(id, filteredUpdates);
    return await ctx.db.get(id);
  },
});

// Delete a notification
export const remove = mutation({
  args: { id: v.id("notifications") },
  handler: async (ctx, args) => {
    // Also delete associated metrics
    const metrics = await ctx.db
      .query("notificationMetrics")
      .withIndex("by_notification", (q) => q.eq("notificationId", args.id))
      .collect();

    for (const metric of metrics) {
      await ctx.db.delete(metric._id);
    }

    await ctx.db.delete(args.id);
  },
});

// Toggle notification live status
export const toggleLive = mutation({
  args: { id: v.id("notifications") },
  handler: async (ctx, args) => {
    const notification = await ctx.db.get(args.id);
    if (!notification) throw new Error("Notification not found");

    await ctx.db.patch(args.id, { isLive: !notification.isLive });
    return await ctx.db.get(args.id);
  },
});

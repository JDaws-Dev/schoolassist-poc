import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get metrics for a specific notification
export const getByNotification = query({
  args: { notificationId: v.id("notifications") },
  handler: async (ctx, args) => {
    const metrics = await ctx.db
      .query("notificationMetrics")
      .withIndex("by_notification", (q) =>
        q.eq("notificationId", args.notificationId)
      )
      .first();

    return metrics ?? { viewCount: 0, dismissCount: 0 };
  },
});

// Get all metrics (for admin analytics)
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("notificationMetrics").collect();
  },
});

// Get aggregated metrics (total views and dismisses)
export const getAggregated = query({
  args: {},
  handler: async (ctx) => {
    const allMetrics = await ctx.db.query("notificationMetrics").collect();

    return allMetrics.reduce(
      (acc, metric) => ({
        totalViews: acc.totalViews + metric.viewCount,
        totalDismisses: acc.totalDismisses + metric.dismissCount,
      }),
      { totalViews: 0, totalDismisses: 0 }
    );
  },
});

// Record a view for a notification
export const recordView = mutation({
  args: { notificationId: v.id("notifications") },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("notificationMetrics")
      .withIndex("by_notification", (q) =>
        q.eq("notificationId", args.notificationId)
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        viewCount: existing.viewCount + 1,
      });
      return await ctx.db.get(existing._id);
    } else {
      return await ctx.db.insert("notificationMetrics", {
        notificationId: args.notificationId,
        viewCount: 1,
        dismissCount: 0,
      });
    }
  },
});

// Record a dismiss for a notification
export const recordDismiss = mutation({
  args: { notificationId: v.id("notifications") },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("notificationMetrics")
      .withIndex("by_notification", (q) =>
        q.eq("notificationId", args.notificationId)
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        dismissCount: existing.dismissCount + 1,
      });
      return await ctx.db.get(existing._id);
    } else {
      return await ctx.db.insert("notificationMetrics", {
        notificationId: args.notificationId,
        viewCount: 0,
        dismissCount: 1,
      });
    }
  },
});

// Reset metrics for a notification
export const reset = mutation({
  args: { notificationId: v.id("notifications") },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("notificationMetrics")
      .withIndex("by_notification", (q) =>
        q.eq("notificationId", args.notificationId)
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        viewCount: 0,
        dismissCount: 0,
      });
    }
  },
});

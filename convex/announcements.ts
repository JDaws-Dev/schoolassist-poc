import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get all announcements sorted by date (newest first)
export const list = query({
  args: {},
  handler: async (ctx) => {
    const announcements = await ctx.db.query("announcements").collect();
    return announcements.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  },
});

// Get recent announcements (for home page)
export const getRecent = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 2;
    const announcements = await ctx.db.query("announcements").collect();
    return announcements
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  },
});

// Get a single announcement by ID
export const get = query({
  args: { id: v.id("announcements") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Create a new announcement
export const create = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    date: v.string(),
    priority: v.string(),
    type: v.optional(v.string()),
    url: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("announcements", args);
  },
});

// Update an existing announcement
export const update = mutation({
  args: {
    id: v.id("announcements"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    date: v.optional(v.string()),
    priority: v.optional(v.string()),
    type: v.optional(v.string()),
    url: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    // Filter out undefined values
    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([, v]) => v !== undefined)
    );
    await ctx.db.patch(id, filteredUpdates);
    return await ctx.db.get(id);
  },
});

// Delete an announcement
export const remove = mutation({
  args: { id: v.id("announcements") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

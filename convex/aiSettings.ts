import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get AI settings (there should only be one record)
export const get = query({
  args: {},
  handler: async (ctx) => {
    const settings = await ctx.db.query("aiSettings").first();
    return (
      settings ?? {
        systemPrompt: null,
        temperature: 0.2,
        knowledge: [],
      }
    );
  },
});

// Initialize or update AI settings
export const upsert = mutation({
  args: {
    systemPrompt: v.optional(v.string()),
    temperature: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("aiSettings").first();

    if (existing) {
      const updates: Record<string, unknown> = {};
      if (args.systemPrompt !== undefined) {
        updates.systemPrompt = args.systemPrompt;
      }
      if (args.temperature !== undefined) {
        updates.temperature = args.temperature;
      }
      await ctx.db.patch(existing._id, updates);
      return await ctx.db.get(existing._id);
    } else {
      return await ctx.db.insert("aiSettings", {
        systemPrompt: args.systemPrompt,
        temperature: args.temperature ?? 0.2,
        knowledge: [],
      });
    }
  },
});

// Update system prompt
export const updateSystemPrompt = mutation({
  args: { systemPrompt: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("aiSettings").first();

    if (existing) {
      await ctx.db.patch(existing._id, { systemPrompt: args.systemPrompt });
      return await ctx.db.get(existing._id);
    } else {
      return await ctx.db.insert("aiSettings", {
        systemPrompt: args.systemPrompt,
        temperature: 0.2,
        knowledge: [],
      });
    }
  },
});

// Update temperature
export const updateTemperature = mutation({
  args: { temperature: v.number() },
  handler: async (ctx, args) => {
    if (args.temperature < 0 || args.temperature > 1) {
      throw new Error("Temperature must be between 0 and 1");
    }

    const existing = await ctx.db.query("aiSettings").first();

    if (existing) {
      await ctx.db.patch(existing._id, { temperature: args.temperature });
      return await ctx.db.get(existing._id);
    } else {
      return await ctx.db.insert("aiSettings", {
        temperature: args.temperature,
        knowledge: [],
      });
    }
  },
});

// Add knowledge item
export const addKnowledge = mutation({
  args: {
    topic: v.string(),
    info: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("aiSettings").first();

    const newItem = {
      id: crypto.randomUUID(),
      topic: args.topic,
      info: args.info,
      createdAt: Date.now(),
    };

    if (existing) {
      const knowledge = existing.knowledge ?? [];
      await ctx.db.patch(existing._id, {
        knowledge: [...knowledge, newItem],
      });
      return await ctx.db.get(existing._id);
    } else {
      return await ctx.db.insert("aiSettings", {
        temperature: 0.2,
        knowledge: [newItem],
      });
    }
  },
});

// Update knowledge item
export const updateKnowledge = mutation({
  args: {
    id: v.string(),
    topic: v.string(),
    info: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("aiSettings").first();
    if (!existing) throw new Error("AI settings not found");

    const knowledge = existing.knowledge ?? [];
    const updatedKnowledge = knowledge.map((item) =>
      item.id === args.id
        ? { ...item, topic: args.topic, info: args.info }
        : item
    );

    await ctx.db.patch(existing._id, { knowledge: updatedKnowledge });
    return await ctx.db.get(existing._id);
  },
});

// Remove knowledge item
export const removeKnowledge = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("aiSettings").first();
    if (!existing) throw new Error("AI settings not found");

    const knowledge = existing.knowledge ?? [];
    const filteredKnowledge = knowledge.filter((item) => item.id !== args.id);

    await ctx.db.patch(existing._id, { knowledge: filteredKnowledge });
    return await ctx.db.get(existing._id);
  },
});

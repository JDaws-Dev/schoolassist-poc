import { v } from "convex/values";
import { query, action, internalMutation, internalAction } from "./_generated/server";
import { internal } from "./_generated/api";

const LINKTREE_URL = "https://linktr.ee/ARTIOSSH";

// Get all active linktree links
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("linktreeLinks")
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
  },
});

// Get sync history
export const getSyncLog = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const logs = await ctx.db.query("linktreeSyncLog").order("desc").take(args.limit ?? 10);
    return logs;
  },
});

// Internal mutation to save synced links
export const saveLinks = internalMutation({
  args: {
    links: v.array(v.object({ title: v.string(), url: v.string() })),
  },
  handler: async (ctx, args): Promise<{ linksFound: number; newLinksAdded: number }> => {
    const now = Date.now();
    let newLinksAdded = 0;

    for (const link of args.links) {
      const existing = await ctx.db
        .query("linktreeLinks")
        .withIndex("by_url", (q) => q.eq("url", link.url))
        .first();

      if (existing) {
        await ctx.db.patch(existing._id, { lastSeenAt: now, isActive: true });
      } else {
        await ctx.db.insert("linktreeLinks", {
          title: link.title,
          url: link.url,
          addedAt: now,
          lastSeenAt: now,
          isActive: true,
        });
        newLinksAdded++;
      }
    }

    await ctx.db.insert("linktreeSyncLog", {
      syncedAt: now,
      linksFound: args.links.length,
      newLinksAdded,
      status: "success",
    });

    return { linksFound: args.links.length, newLinksAdded };
  },
});

// Internal mutation to log errors
export const logSyncError = internalMutation({
  args: { error: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("linktreeSyncLog", {
      syncedAt: Date.now(),
      linksFound: 0,
      newLinksAdded: 0,
      status: "error",
      error: args.error,
    });
  },
});

// Internal action to fetch and parse Linktree (used by cron)
export const syncFromLinktree = internalAction({
  args: {},
  handler: async (ctx): Promise<{ linksFound: number; newLinksAdded: number }> => {
    try {
      const response = await fetch(LINKTREE_URL, {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; ArtiosConnect/1.0)",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch Linktree: ${response.status}`);
      }

      const html = await response.text();
      const links: { title: string; url: string }[] = [];

      // Try JSON data first (most reliable)
      const scriptMatch = html.match(/<script[^>]*id="__NEXT_DATA__"[^>]*>([^<]+)<\/script>/);
      if (scriptMatch) {
        try {
          const data = JSON.parse(scriptMatch[1]);
          const pageProps = data?.props?.pageProps;
          if (pageProps?.links) {
            for (const link of pageProps.links) {
              if (link.url && link.title) {
                links.push({ title: link.title, url: link.url });
              }
            }
          }
        } catch {
          // Continue to regex fallback
        }
      }

      // Regex fallback
      if (links.length === 0) {
        const linkRegex = /<a[^>]*href="(https?:\/\/[^"]+)"[^>]*>([^<]*(?:<[^>]+>[^<]*)*)<\/a>/gi;
        let match;
        while ((match = linkRegex.exec(html)) !== null) {
          const url = match[1];
          const title = match[2].replace(/<[^>]+>/g, "").trim();
          if (
            title &&
            !url.includes("linktr.ee") &&
            !url.includes("linktree.com") &&
            !url.startsWith("mailto:") &&
            !url.startsWith("tel:")
          ) {
            links.push({ title, url });
          }
        }
      }

      const uniqueLinks = Array.from(new Map(links.map((l) => [l.url, l])).values());

      return await ctx.runMutation(internal.linktree.saveLinks, { links: uniqueLinks });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      await ctx.runMutation(internal.linktree.logSyncError, { error: errorMessage });
      throw error;
    }
  },
});

// Public action to manually trigger sync
export const triggerSync = action({
  args: {},
  handler: async (ctx): Promise<{ linksFound: number; newLinksAdded: number }> => {
    return await ctx.runAction(internal.linktree.syncFromLinktree);
  },
});

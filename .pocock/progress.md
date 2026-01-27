# Progress & Learnings

This file maintains context between autonomous iterations.
**READ THIS FIRST** to understand recent decisions and roadblocks.

---

## Recent Context (Last 3 Iterations)

<!-- This section is a rolling window - keep only the last 3 entries -->
<!-- Move older entries to the Archive section below -->

<!-- No iterations yet - this is a fresh project -->

---

## Active Roadblocks

<!-- No current roadblocks -->

---

## Project Learnings

Patterns, gotchas, and decisions that affect future work:

### Stack

- React 19 + Vite 7
- TailwindCSS for styling
- Lucide React for icons
- Express.js API for chat backend
- OpenAI GPT-4o-mini for AI
- Convex for real-time database
- Google Calendar ICS feed for calendar integration

### Key Design Decisions

- **No grade filtering** - Simple app for all parents regardless of child's grade
- **Simple password auth** - Parent: artios2026, Admin: artiosadmin2026
- **AI-first design** - Chat is the primary way to find info
- **Mobile-first** - Primary use case is parents on phones

### Preserved Backend Files

Keep these intact:
- `convex/` - Database schema and functions
- `server.js` - Express chat API
- `api/chat.js` - Vercel serverless function
- `src/data/initialData.js` - Static school data

---

## Archive (Older Iterations)

<!-- Move entries here when they roll out of "Recent Context" -->

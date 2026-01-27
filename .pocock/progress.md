# Progress & Learnings

This file maintains context between autonomous iterations.
**READ THIS FIRST** to understand recent decisions and roadblocks.

---

## Recent Context (Last 3 Iterations)

<!-- This section is a rolling window - keep only the last 3 entries -->
<!-- Move older entries to the Archive section below -->

### Iteration 2: Admin Dashboard (ArtiosConnect-ztz)
**Date**: 2026-01-26
**Status**: Completed

**What was done**:
- Built complete Admin Dashboard at `/admin` route
- Protected by admin authentication (password: artiosadmin2026)
- Created Notifications Management panel with full CRUD
  - Support for types: alert, info, warning, success
  - Live/draft toggle, scheduling, expiration
- Created Announcements Management panel with full CRUD
  - Priority levels: low, normal, high, urgent
  - Announcement types: general, event, reminder, update
  - Optional URL linking
- Created AI Settings panel
  - System prompt editor with default template
  - Temperature slider (0.0-1.0) with visual feedback
  - Knowledge base management (add/edit/delete topics)
- Created Analytics Dashboard
  - Chat session metrics (total, 24h, 7d)
  - Message counts and averages
  - Notification view/dismiss metrics
  - Content overview (active notifications, announcements)

**Key files created**:
- `src/pages/AdminLogin.jsx` - Admin authentication page
- `src/pages/AdminDashboard.jsx` - Main dashboard with sidebar navigation
- `src/components/admin/NotificationsPanel.jsx` - Notifications CRUD
- `src/components/admin/AnnouncementsPanel.jsx` - Announcements CRUD
- `src/components/admin/AISettingsPanel.jsx` - AI configuration
- `src/components/admin/AnalyticsPanel.jsx` - Usage statistics

**Learnings**:
- Convex queries return `undefined` initially, need `?? []` for arrays
- Admin auth uses sessionStorage for browser-session-only persistence
- ConvexProvider should only wrap components that need Convex access
- Modal forms need proper z-index (z-50) to appear above sidebar
- Temperature slider auto-saves on change with visual feedback

---

### Iteration 1: Calendar View (ArtiosConnect-yru)
**Date**: 2026-01-26
**Status**: Completed

**What was done**:
- Built complete Calendar View feature with month grid and list/agenda views
- Implemented Google Calendar ICS feed parser in `src/utils/calendarUtils.js`
- Created reusable calendar hooks: `useCalendarEvents`, `useCalendarView`
- Built responsive calendar components: CalendarMonthView, CalendarListView, CalendarHeader, EventModal
- View preference persists to localStorage (`artios-calendar-view`)
- Event detail modal with "Add to Google Calendar" button
- Mobile-first responsive design with event dots on mobile, previews on desktop

**Key files created**:
- `src/pages/Calendar.jsx` - Main calendar page
- `src/components/CalendarMonthView.jsx` - Month grid view
- `src/components/CalendarListView.jsx` - Agenda/list view
- `src/components/CalendarHeader.jsx` - Navigation controls
- `src/components/EventModal.jsx` - Event detail modal
- `src/hooks/useCalendarEvents.js` - Events fetching and ICS parsing
- `src/hooks/useCalendarView.js` - View state management
- `src/utils/calendarUtils.js` - ICS parser and date utilities

**Learnings**:
- Tailwind CSS v4 uses `@import "tailwindcss"` instead of directives
- ICS format uses line folding (continuation lines start with space/tab)
- ICS dates can be YYYYMMDD (all-day) or YYYYMMDDTHHmmssZ (datetime)
- Google Calendar "Add" URL uses `dates=START/END` format with no dashes/colons
- Sample events provided for development when no ICS URL configured

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

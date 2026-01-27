# Progress & Learnings

This file maintains context between autonomous iterations.
**READ THIS FIRST** to understand recent decisions and roadblocks.

---

## Recent Context (Last 3 Iterations)

<!-- This section is a rolling window - keep only the last 3 entries -->
<!-- Move older entries to the Archive section below -->

### Iteration 4: Convex Database Integration (ArtiosConnect-9xo)
**Date**: 2026-01-26
**Status**: Completed

**What was done**:
- Created complete Convex schema with all 5 tables:
  - `announcements` - title, content, date, priority, type?, url?
  - `notifications` - title, content?, type, isLive, postedAt?, expiresAt?, scheduledFor?
  - `aiSettings` - systemPrompt?, temperature?, knowledge[]
  - `notificationMetrics` - notificationId, viewCount, dismissCount (indexed)
  - `chatSessions` - sessionId, startedAt, messageCount, lastMessageAt (indexed)
- Created Convex functions for each table:
  - `convex/announcements.ts` - list, getRecent, get, create, update, remove
  - `convex/notifications.ts` - list, getActive, get, create, update, remove, toggleLive
  - `convex/aiSettings.ts` - get, upsert, updateSystemPrompt, updateTemperature, addKnowledge, updateKnowledge, removeKnowledge
  - `convex/notificationMetrics.ts` - getByNotification, list, getAggregated, recordView, recordDismiss, reset
  - `convex/chatSessions.ts` - list, getBySessionId, getAnalytics, upsert, recordMessage, startSession
- Configured ConvexProvider in main.jsx entry point
- Created reusable Convex hooks in `src/hooks/useConvex.js`
- Built real-time components:
  - `NotificationBanner.jsx` - Real-time notifications with view/dismiss tracking
  - `AnnouncementCard.jsx` - Recent announcements with real-time updates
- Created `.env.example` with environment variable documentation

**Key files created/modified**:
- `convex/schema.ts` - Complete database schema
- `convex/announcements.ts` - Announcements queries/mutations
- `convex/notifications.ts` - Notifications queries/mutations with filtering
- `convex/aiSettings.ts` - AI settings management
- `convex/notificationMetrics.ts` - Engagement tracking
- `convex/chatSessions.ts` - Session analytics
- `convex/tsconfig.json` - TypeScript configuration for Convex
- `src/main.jsx` - Added ConvexProvider wrapper
- `src/hooks/useConvex.js` - Reusable Convex hooks
- `src/components/NotificationBanner.jsx` - Real-time notification display
- `src/components/AnnouncementCard.jsx` - Recent announcements component
- `.env.example` - Environment variables documentation

**Learnings**:
- Convex schema uses `v` validators for type definitions
- Indexes are defined with `.index("name", ["field"])` syntax
- `useQuery` returns `undefined` initially while loading, use `?? []` for defaults
- `useMutation` returns a function that can be awaited
- The `_generated/api` module must be imported from convex directory
- Notifications need filtering by isLive, scheduledFor, and expiresAt for active display
- Real-time updates work automatically when mutations modify data
- LocalStorage used for dismissal tracking, metrics stored in Convex

---

### Iteration 3: Design System & Styling (ArtiosConnect-rj0)
**Date**: 2026-01-26
**Status**: Completed

**What was done**:
- Created comprehensive design system in `src/index.css` using TailwindCSS v4's `@theme` directive
- Defined color palette with semantic meaning:
  - **Primary (Deep Blue)**: Trust, education, professionalism - navigation, buttons, active states
  - **Accent (Warm Amber)**: Energy, optimism - AI chat prominence, special CTAs
  - **Success (Teal Green)**, **Warning (Soft Orange)**, **Error (Rose Red)**: Semantic states
- Typography using Inter font family with clear hierarchy
- Touch-friendly minimum tap targets: 44px default, 48px comfortable, 56px primary actions
- Component styles: buttons, inputs, cards, banners, navigation, chat UI, modals
- Mobile-first responsive breakpoints with bottom sheet modals on small screens
- Accessibility features: focus-visible states, skip links, screen reader utilities
- Loading states: spinner animation, skeleton pulse
- Custom scrollbar styling
- Utility animations: fade-in, slide-up, bounce-in

**Design tokens defined**:
- Colors: primary-50 to 950, accent-50 to 950, success/warning/error variants
- Shadows: soft, medium, strong, primary (colored), accent (colored)
- Animations: ease-smooth, ease-bounce, ease-out-back
- Spacing: tap-target (44px), tap-target-lg (48px), tap-target-xl (56px)

**Component classes created**:
- `.btn`, `.btn-primary`, `.btn-accent`, `.btn-secondary`, `.btn-ghost`, `.btn-icon`, `.btn-sm`, `.btn-lg`
- `.input`, `.input-lg`, `.input-error`, `.label`, `.helper-text`
- `.card`, `.card-elevated`, `.card-interactive`, `.card-header`, `.card-body`, `.card-footer`
- `.banner`, `.banner-info`, `.banner-success`, `.banner-warning`, `.banner-alert`
- `.nav-bottom`, `.nav-item`, `.nav-item-active`, `.nav-item-chat`
- `.chat-container`, `.chat-messages`, `.chat-message`, `.chat-bubble`, `.suggestion-chip`
- `.quick-actions`, `.quick-action`
- `.today-card`, `.today-card-home`
- `.event-item`, `.event-date-badge`
- `.modal`, `.modal-sheet`, `.modal-header`, `.modal-body`, `.modal-footer`
- `.container`, `.main-content`

**Learnings**:
- TailwindCSS v4 uses `@theme` directive for design tokens (not tailwind.config.js)
- OKLCH color space provides better perceptual uniformity than HSL
- Mobile touch targets need 44px minimum (WCAG recommendation)
- Bottom sheet pattern works better on mobile than centered modals
- Safe area insets (env()) needed for notched devices

---

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

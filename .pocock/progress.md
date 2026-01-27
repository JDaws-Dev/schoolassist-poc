# Progress & Learnings

This file maintains context between autonomous iterations.
**READ THIS FIRST** to understand recent decisions and roadblocks.

---

## Recent Context (Last 3 Iterations)

<!-- This section is a rolling window - keep only the last 3 entries -->
<!-- Move older entries to the Archive section below -->

### Iteration 6: UI/Design Polish (ArtiosConnect-7x0, s9u, r5m, eps, alr, 56h, 6xp, 7ef, g6l)
**Date**: 2026-01-27
**Status**: Completed

**What was done**:
- Fixed chat markdown rendering - AI responses now render bold and bullet lists properly (lightweight parser, no new deps)
- Corrected Resources page data to match initialData.js knowledge base:
  - Doors open: 8:45→8:50 AM, lunch deadline: 9AM→11:59PM, dress code: generic→specific
  - Contact email: info@artiosacademies.com→office@artiossugarhill.org
  - Office hours: fabricated→"School days during operating hours"
  - Address: incomplete→full address
- Tightened Home hero spacing (smaller heading, compact padding, better rhythm)
- Made Chat tab visually prominent in bottom nav (AI-first design)
- Polished event cards with gradient date badges and hover states
- Simplified chat welcome state (2x2 grid with icons, concise copy)
- Added fade-in animation on all page mounts (CSS only, 200ms)
- Improved calendar event pill sizing and simplified legend
- Converted document links from list to responsive card grid

**Key decisions**:
- Used lightweight inline markdown parser instead of react-markdown dependency
- Kept all changes CSS/component-level only - no structural changes
- Data corrections sourced exclusively from initialData.js

**Files modified**:
- src/components/chat/MessageBubble.jsx (markdown rendering)
- src/pages/Resources.jsx (data corrections + document cards)
- src/components/home/AIHeroSection.jsx (spacing)
- src/components/home/QuickActions.jsx (spacing)
- src/pages/Home.jsx (spacing + fade-in)
- src/components/BottomNav.jsx (chat prominence)
- src/components/home/UpcomingEvents.jsx (card polish)
- src/components/chat/WelcomeState.jsx (redesign)
- src/pages/Chat.jsx (header + fade-in)
- src/pages/Calendar.jsx (legend + fade-in)
- src/components/CalendarMonthView.jsx (event pills)

**Learnings**:
- Resources page had hardcoded data that diverged from initialData.js - always source from there
- TailwindCSS v4 animate-fade-in already exists in index.css - reuse design system utilities
- grid-rows-[1fr]/grid-rows-[0fr] pattern works great for accordion animation in CSS

---

### Iteration 5: AI Chat Assistant - Backend (ArtiosConnect-zn0)
**Date**: 2026-01-26
**Status**: Completed

**What was done**:
- Created `server.js` - Express.js chat API server for local development
  - POST /api/chat endpoint with OpenAI GPT-4o-mini integration
  - GET /api/health endpoint for health checks
  - CORS middleware for cross-origin requests
  - Temperature set to 0.2 (low to reduce hallucination)
  - Max tokens: 1000, presence/frequency penalty: 0.1
- Created `api/chat.js` - Vercel serverless function for production deployment
  - Same API contract as server.js
  - Inline knowledge base (no file system access in serverless)
  - Proper CORS headers and OPTIONS handling
- Created `src/data/initialData.js` - Comprehensive school knowledge base
  - SCHOOL_INFO: name, address, type, description, philosophy
  - SCHEDULE: weekly schedule by division, daily timing
  - CONTACTS: directors, office
  - QUICK_LINKS: categorized external links
  - FAQ: 10 common questions with answers
  - POLICIES: tardiness, early pickup, visitors, medications, emergencies
  - `buildKnowledgeBaseContent()` function for AI context
- Updated `package.json` with new dependencies:
  - express: ^4.21.2
  - cors: ^2.8.5
  - openai: ^4.77.0
  - concurrently: ^9.1.2 (dev)
  - New scripts: `npm run server`, `npm run dev:all`

**AI Safety Rules implemented in system prompt**:
1. ONLY provide information from knowledge base or calendar events
2. NEVER make up, invent, guess, or assume information
3. If unknown: "I don't have that specific information. Please contact the school office..."
4. For sensitive topics: redirect to Director John Lane
5. Be helpful, friendly, and concise
6. Clarify which division (Elementary K-6 or Jr High/High School 7-12) applies
7. Do not provide legal, medical, or financial advice
8. Acknowledge limitations honestly

**API Contract**:
```
POST /api/chat
Request: { message: string, history: Message[], sessionId: string, calendarEvents?: Event[] }
Response: { response: string }

Message: { role: 'user' | 'assistant', content: string }
Event: { title: string, date: string, time?: string, location?: string }
```

**Key files created**:
- `server.js` - Express.js chat API server (local dev)
- `api/chat.js` - Vercel serverless function (production)
- `src/data/initialData.js` - School knowledge base

**Learnings**:
- OpenAI client initialized with `new OpenAI({ apiKey: process.env.OPENAI_API_KEY })`
- Vercel serverless functions have no file system access - data must be inline
- CORS headers required for Vercel serverless: Access-Control-Allow-Origin, Methods, Headers
- History limited to last 20 messages to stay within context window
- Error handling for rate_limit_exceeded, insufficient_quota OpenAI errors
- Temperature 0.2 significantly reduces hallucination while maintaining natural responses
- System prompt should be comprehensive but not overwhelming - focus on boundaries

---

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

### Iteration 2: Admin Dashboard (ArtiosConnect-ztz)
**Date**: 2026-01-26
**Status**: Completed

**What was done**:
- Built complete Admin Dashboard at `/admin` route
- Protected by admin authentication (password: artiosadmin2026)
- Created Notifications Management panel with full CRUD
- Created Announcements Management panel with full CRUD
- Created AI Settings panel with system prompt, temperature, knowledge base
- Created Analytics Dashboard with chat and notification metrics

**Key files created**:
- `src/pages/AdminLogin.jsx`, `src/pages/AdminDashboard.jsx`
- `src/components/admin/` - NotificationsPanel, AnnouncementsPanel, AISettingsPanel, AnalyticsPanel

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

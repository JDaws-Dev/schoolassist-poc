# Progress & Learnings

This file maintains context between autonomous iterations.
**READ THIS FIRST** to understand recent decisions and roadblocks.

---

## Recent Context (Last 3 Iterations)

<!-- This section is a rolling window - keep only the last 3 entries -->
<!-- Move older entries to the Archive section below -->

### Iteration 34: Expandable FAQ Items (ArtiosConnect-5fq)
**Date**: 2026-01-29
**Status**: Completed

**What was done**:
- Made FAQ items on Resources page expandable/collapsible
- Questions are always visible, tap to reveal answer
- First item opens by default for discoverability
- Smooth expand/collapse animation with chevron rotation

**Files created**:
- `src/components/ui/collapsible.tsx` - Radix Collapsible wrapper component

**Files modified**:
- `src/pages/Resources.tsx` - Added FAQItem component using Collapsible
- `src/index.css` - Added collapsible-up/down animation keyframes
- `package.json` - Added @radix-ui/react-collapsible dependency

**Key decisions**:
- Used Radix Collapsible primitive (consistent with other UI components using Radix)
- First FAQ item opens by default so users see how it works
- Chevron rotates 180° on open for visual feedback
- Animation uses `--radix-collapsible-content-height` CSS variable for smooth height transitions

**Learnings**:
- Radix Collapsible provides `data-[state=open/closed]` attributes for animation targeting
- CSS keyframe animation from height 0 to var(--radix-collapsible-content-height) works smoothly

---

### Iteration 33: Make Event Cards Tappable (ArtiosConnect-9pk)
**Date**: 2026-01-29
**Status**: Completed

**What was done**:
- Made event cards in UpcomingEvents tappable with hover/active states
- Tapping an event opens the existing EventModal with full details
- Modal includes "Add to Google Calendar" button

**Files modified**:
- `src/components/home/UpcomingEvents.tsx` - Changed div to button, added state for selected event, integrated EventModal

**Key decisions**:
- Reused existing EventModal from calendar - no new components needed
- Used `button` element (not div with onClick) for accessibility
- Added visual feedback: hover state (primary/5 bg, primary/30 border), active state (primary/10 bg)
- Used composite key `${event.id}-${event.start?.getTime()}` to handle recurring events

**Learnings**:
- EventModal already had "Add to Google Calendar" functionality - just needed to wire it up
- Consistent with CalendarMonthView pattern for handling event selection

---

### Iteration 32: Fix Lunch Ordering Link (ArtiosConnect-9yg)
**Date**: 2026-01-29
**Status**: Completed

**What was done**:
- Fixed Lunch Ordering quick action linking to wrong URL (factsmgt.com → artioscafe.com)
- Fixed deadline text from incorrect "11:59 PM" to correct "10 AM on class days"

**Files modified**:
- `src/components/home/QuickActions.tsx` - Fixed URL and deadline text

**Key decisions**:
- Removed unnecessary date logic - static text "Order by 10 AM on class days" is clearer
- Kept deadline label simple rather than calculating dynamic countdown

**Learnings**:
- QuickActions had copy/paste error from FACTS Portal
- Knowledge base says 10 AM deadline, not 11:59 PM - always verify against authoritative source

---

### Iteration 29: Simplify Announcements Form (ArtiosConnect-0hl)
**Date**: 2026-01-29
**Status**: Completed

**What was done**:
- Removed unused priority and type text fields from Announcements admin form
- Form now has 4 fields: Title, Date, Content, Optional URL
- Made priority/type optional in Convex schema (for backwards compatibility)
- Removed from TypeScript type definition

**Files modified**:
- src/components/admin/AnnouncementsPanel.tsx (removed 2 form fields)
- src/types/index.ts (removed priority/type from Announcement type)
- convex/schema.ts (made priority/type optional, marked as legacy)
- convex/announcements.ts (removed priority/type from create/update args)

**Key decisions**:
- **Remove from UI, keep optional in schema** - existing data may have these fields
- Priority and type were never displayed to parents - only stored in DB
- Cleaner admin UX with fewer confusing fields

**Learnings**:
- Unused form fields create cognitive overhead for admins
- Schema changes should consider backwards compatibility with existing data

---

### Iteration 28: Evaluate Admin Dashboard - Notifications vs Announcements (ArtiosConnect-1v7)
**Date**: 2026-01-29
**Status**: Completed

**What was done**:
- Evaluated whether notifications and announcements should be merged
- Determined they serve legitimately different purposes - keeping both
- Added descriptions to admin panels explaining when to use each
- Renamed "Notifications" → "Urgent Alerts" in admin panel for clarity

**Files modified**:
- src/components/admin/NotificationsPanel.tsx (title → "Urgent Alerts", added description)
- src/components/admin/AnnouncementsPanel.tsx (added description)

**Key decisions**:
- **Keep both systems separate** - they have distinct use cases:
  - Notifications = urgent, dismissable, time-bound (weather closures, schedule changes)
  - Announcements = persistent, informational, date-stamped (newsletters, spirit week)
- Renamed to "Urgent Alerts" to make purpose clearer
- Added explanatory text so admins know which to use

**Analysis summary**:
| Feature | Notifications (Alerts) | Announcements |
|---------|------------------------|---------------|
| Position | Top banner (urgent) | Bottom card (info) |
| Dismissable | Yes | No |
| Scheduling | Yes | No |
| Styling | Color-coded by type | Neutral card |
| Metrics | Tracked | Not tracked |

**Learnings**:
- Systems that LOOK similar may serve different UX purposes
- Adding context/descriptions in admin UI reduces confusion
- "Notification" is overloaded term - "Alert" is more specific

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
- `convex/` - Database schema, functions, and cron jobs
- `server.js` - Express chat API (local dev)
- `api/chat.js` - Vercel serverless function (chat)
- `api/calendar.js` - Vercel serverless function (calendar proxy)
- `src/data/initialData.js` - Static school data

---

## Archive (Older Iterations)

<!-- Move entries here when they roll out of "Recent Context" -->

### Iteration 31: Simplify Admin + Linktree Sync + Calendar Fix
**Date**: 2026-01-29
**Status**: Completed

**What was done**:
1. **Simplified Admin Dashboard** - Removed AI settings, announcements, and analytics panels. Now just shows alerts with 3 fields: title, start time, end time.
2. **Linktree Auto-Sync** - Added Convex cron jobs to fetch links from Linktree twice a week (Mon/Thu 9am UTC). New links appear in "More Links" section on Resources page with deduplication.
3. **Fixed Calendar in Production** - Calendar was showing sample data because `/proxy/calendar` didn't exist in production. Added `/api/calendar` serverless function to proxy Google Calendar ICS feed.

**Files created**:
- `api/calendar.js` - Vercel serverless function to proxy Google Calendar
- `convex/linktree.ts` - Linktree sync functions (list, saveLinks, syncFromLinktree, triggerSync)
- `convex/crons.ts` - Scheduled cron jobs for Linktree sync

**Files modified**:
- `src/pages/AdminDashboard.tsx` - Simplified to just NotificationsPanel
- `src/components/admin/NotificationsPanel.tsx` - Reduced to 3 fields (title, starts, ends)
- `src/pages/Resources.tsx` - Added "More Links" section with Linktree deduplication
- `src/hooks/useConvex.ts` - Added useLinktreeLinks hook
- `src/hooks/useCalendarEvents.ts` - Changed to use `/api/calendar` proxy
- `convex/schema.ts` - Added linktreeLinks and linktreeSyncLog tables

**Environment variables added to Vercel**:
- `VITE_GOOGLE_CALENDAR_ICS_URL` - Client-side calendar URL (build-time)
- `GOOGLE_CALENDAR_URL` - Server-side calendar URL (runtime for API)

**Key decisions**:
- `VITE_` prefixed env vars only available at build time, not runtime in serverless functions
- Calendar proxy uses `/api/calendar` instead of Vite's dev proxy `/proxy/calendar`
- Linktree deduplication compares URLs case-insensitively
- "More Links" section only shows if there are genuinely new links not in QUICK_LINKS

**Learnings**:
- Vite dev server proxy doesn't translate to production - need serverless function
- Vercel serverless functions need non-VITE prefixed env vars for runtime access
- Convex cron jobs use standard cron syntax, run server-side
- Browser localStorage caching can cause confusion when env changes in production

---

### Iteration 30: Add Preview to Admin Panels (ArtiosConnect-u7e)
**Date**: 2026-01-29
**Status**: Completed

**What was done**:
- Added live preview section to NotificationsPanel showing how alerts appear to parents
- Added live preview section to AnnouncementsPanel showing how announcements appear to parents
- Preview updates in real-time as admin types in form fields
- Preview uses exact same styling as parent-facing components (NotificationBanner, RecentAnnouncements)

**Files modified**:
- src/components/admin/NotificationsPanel.tsx (added preview with type-specific styling)
- src/components/admin/AnnouncementsPanel.tsx (added preview card)

**Key decisions**:
- **Live preview vs "View as parent" link** - live preview is better UX, no context switching
- Preview appears below form when title is filled in
- Uses same color variants and icon mappings as NotificationBanner for accuracy
- Disabled dismiss button in preview (visual only, not functional)

**Learnings**:
- Duplicating styling constants (PREVIEW_ICONS, PREVIEW_VARIANTS) is acceptable for admin panel isolation
- Eye icon + "Preview (as parents will see it)" label makes purpose clear
- Conditionally showing preview when title exists prevents empty preview clutter

---

### Iteration 27: Add Vimeo Page for K-8 Performances (ArtiosConnect-rzd)
**Date**: 2026-01-29
**Status**: Completed

**What was done**:
- Added Vimeo link for Elementary & Jr High performances
- Clarified Artios+ is for High School only
- Updated Resources page Student Performances section to show both options
- Artios+ (purple) for HS, Vimeo (sky blue) for K-8

**Files modified**:
- src/data/initialData.js (added Vimeo link, clarified Artios+ description)
- CLAUDE.md (added Vimeo, clarified grade levels)
- src/data/KNOWLEDGE_BASE.md (updated Student Work table)
- src/pages/Resources.tsx (two links with grade-level labels)

**Key decisions**:
- Two separate links instead of one - clear grade-level separation
- Vimeo uses sky blue color to differentiate from Artios+ purple
- Each link shows platform name + grade range for clarity
- Kept "Student Performances" as section title - applies to all grades

**Learnings**:
- Artios+ (artiosplus.com) is a Squarespace portfolio for HIGH SCHOOL only
- Vimeo (vimeo.com/user81677362) hosts K-8 performances
- Parents need clear grade labels to know which link to use

---

### Iteration 26: Add Artios+ Section to Resources (ArtiosConnect-9c0)
**Date**: 2026-01-29
**Status**: Completed

**What was done**:
- Added dedicated Artios+ section at top of Resources page
- Describes student performances (Theater, Dance, Film, Choir, Art)
- Uses purple gradient for visual distinction from other sections
- Play icon indicates media/performance content
- Prominent link button to artiosplus.com

**Files modified**:
- src/pages/Resources.tsx (added Artios+ card section)

**Key decisions**:
- Placed at top of page - parents want to see their kids' work
- Title is "Student Performances" (clearer than brand name "Artios+")
- Purple color scheme differentiates from school branding colors
- Link styled as full-width card with hover effect for easy tapping

**Learnings**:
- Purple (#9333ea / purple-500) provides good contrast for a "media" section
- Card with gradient background draws attention without being garish

---

### Iteration 25: Fix Content Cut Off by Bottom Nav (ArtiosConnect-7yn)
**Date**: 2026-01-29
**Status**: Completed

**What was done**:
- Fixed content being cut off at bottom by fixed navigation bar
- Increased bottom padding in AppShell from pb-4 (16px) to pb-20 (80px)
- Affects all pages wrapped by AppShell, not just Community

**Files modified**:
- src/components/layout/AppShell.tsx (pb-4 → pb-20)

**Key decisions**:
- Fix applied at AppShell level - affects all pages uniformly
- Used pb-20 (80px) to account for: nav height (~66px) + safe area + some breathing room
- Fixed nav is ~66px: pt-2 (8px) + icon h-10 (40px) + gap-1 (4px) + label (~14px)

**Learnings**:
- Fixed bottom navigation requires content area to have matching bottom padding
- AppShell is the right place for this fix since all parent routes use it
- pb-20 gives comfortable clearance for the bottom nav bar

---

### Iteration 24: Redesign Header (ArtiosConnect-tgy)
**Date**: 2026-01-29
**Status**: Completed

**What was done**:
- Removed time-based greeting - was filler that didn't help users
- Removed white box/shadow wrapper around logo - cleaner on warm background
- Added "Parent Hub" subtitle - clarifies what the app is
- Streamlined to: logo + "Artios Connect" + "Parent Hub"

**Files modified**:
- src/components/layout/ParentLayout.tsx (header simplification)

**Key decisions**:
- Logo at 44x44 without wrapper (was 48x48 inside white bg/padding/shadow box)
- "Parent Hub" subtitle replaces time greeting - more useful context
- Minimal header: branding only, bottom nav handles navigation
- Removed getTimeGreeting() function entirely

**Learnings**:
- Less is more in mobile headers - every element must earn its space
- "Parent Hub" is more informative than time-based greeting
- Logo without white box looks cleaner on warm cream background

---

### Iteration 23: Improve Community Page UX (ArtiosConnect-mf0)
**Date**: 2026-01-29
**Status**: Completed

**What was done**:
- Added descriptions for each group explaining what it's used for
- Added "Why Join?" section with 6 common use cases as chips
- Added onboarding tip for new parents directing them to grade-level GroupMe
- Added brand colors: Facebook blue (#1877F2), GroupMe teal (#00AFF0)
- Changed icons: MessageCircle for GroupMe, Users for Facebook

**Files modified**:
- src/pages/Community.tsx (major UX improvements)

**Key decisions**:
- Descriptions embedded in each link card (not separate text)
- "Why Join?" uses chip/tag layout for scannability
- Onboarding tip uses primary tint to draw attention
- Brand colors applied to card gradient backgrounds and icons
- Kept existing disclaimer at top untouched

**Learnings**:
- TailwindCSS supports arbitrary colors like `text-[#1877F2]` for brand colors
- Chip/tag layout is effective for list items that don't need action

---

### Iteration 22: Add Community Disclaimer (ArtiosConnect-n78)
**Date**: 2026-01-29
**Status**: Completed

**What was done**:
- Added friendly disclaimer at top of Community page
- States groups are parent-created/run, not official school channels
- Describes them as welcoming spaces for sharing, coordinating, and support

**Files modified**:
- src/pages/Community.tsx (added disclaimer div before cards)

**Key decisions**:
- Single disclaimer at top applies to both Facebook and GroupMe sections
- Used muted styling (bg-muted/50) - informative but not alarming
- Warm tone: "welcoming spaces where moms and dads..." - encouraging, not discouraging

**Learnings**:
- Disclaimer placement matters - top of page ensures visibility before any clicks

---

### Iteration 21: Add Chat Link on Calendar Page (ArtiosConnect-5p9)
**Date**: 2026-01-29
**Status**: Completed

**What was done**:
- Added link to Chat page below the calendar card
- Uses Sparkles icon for AI branding consistency
- Copy: "Looking for something specific? Ask Arti"
- Styled as subtle primary-tinted banner that's visible but not distracting

**Files modified**:
- src/pages/Calendar.tsx (added Link with Sparkles icon)

**Key decisions**:
- Placed below calendar card (not inside) - doesn't clutter calendar UI
- Used bg-primary/10 + hover:bg-primary/20 - matches AIHeroSection styling pattern
- Simple Link component, not a full form like home page hero - calendar context is clear

**Learnings**:
- Sparkles icon is used throughout app for Arti/AI features
- Consistent with AIHeroSection, QuickActions patterns

---

### Iteration 20: Fix Deprecated Meta Tag (ArtiosConnect-rmc)
**Date**: 2026-01-29
**Status**: Completed

**What was done**:
- Fixed deprecated `apple-mobile-web-app-capable` console warning
- Added standard `mobile-web-app-capable` meta tag
- Kept Apple-specific tag for backwards compatibility with older iOS

**Files modified**:
- index.html (added mobile-web-app-capable meta tag)

**Key decisions**:
- Include BOTH meta tags: standard `mobile-web-app-capable` + Apple's `apple-mobile-web-app-capable`
- Standard tag first, Apple-specific second
- Backwards compatibility approach rather than replacement

**Learnings**:
- `apple-mobile-web-app-capable` is Apple's proprietary PWA meta tag, now deprecated
- `mobile-web-app-capable` is the standards-based replacement
- Including both ensures PWA functionality on both modern and older iOS devices

---

### Iteration 19: Rename Chatbot from Ollie to Arti (ArtiosConnect-287)
**Date**: 2026-01-29
**Status**: Completed

**What was done**:
- Renamed AI chatbot from "Ollie" to "Arti" (short for Artios)
- Updated all UI references: Chat page header, welcome state, input placeholder, typing indicator
- Updated home page: AIHeroSection, QuickActions button
- Updated admin panel placeholder text
- Updated server.js system prompt
- Updated CLAUDE.md and REBUILD_SPEC.md documentation

**Files modified**:
- src/pages/Chat.tsx (header name)
- src/components/chat/WelcomeState.tsx ("Hi, I'm Arti")
- src/components/chat/ChatInput.tsx (placeholder)
- src/components/chat/TypingIndicator.tsx ("Arti is typing...")
- src/components/home/AIHeroSection.tsx ("Ask Arti" button and prompt)
- src/components/home/QuickActions.tsx ("Ask Arti a question")
- src/components/admin/AISettingsPanel.tsx (placeholder)
- server.js (system prompt identity)
- CLAUDE.md (documentation)
- REBUILD_SPEC.md (spec documentation)

**Key decisions**:
- Chose "Arti" because: direct connection to "Artios", short/memorable, friendly/approachable
- api/chat.js already used "ArtiosConnect" as identity - changed server.js to match new "Arti" name
- Kept all functionality identical, only changed name references

**Learnings**:
- "Artios" comes from Greek meaning "complete" or "equipped"
- Production serverless function (api/chat.js) had different identity than dev server (server.js)
- Name changes are straightforward but touch many files - grep is essential

---

### Iteration 18: Investigate Community Page Integration (ArtiosConnect-m99)
**Date**: 2026-01-29
**Status**: Completed

**What was done**:
- Researched GroupMe API - requires OAuth authentication for ALL requests, no public endpoints
- Researched Facebook Graph API - Groups API shut down in Feb 2024, private groups cannot be embedded
- Documented why API integration is NOT viable for this use case
- Recommended enhanced UX approach instead (descriptions, onboarding guidance)

**Files modified**:
- None (research-only task)

**Key decisions**:
- **Do NOT pursue API integrations** - both require authentication that would need stored credentials
- Privacy concern: parents likely don't want their group posts visible outside the group
- Enhanced UX is the viable path: add descriptions, "Why Join?" section, onboarding tips

**Learnings**:
- GroupMe API uses OAuth Implicit Authentication - every request needs a user access token
- Meta shut down Facebook Groups API in early 2024 - major breaking change for social tools
- Facebook Page Plugin only works for Pages and PUBLIC groups (parent groups are almost always private)
- Third-party embed tools (SociableKIT, Smash Balloon) exist but require admin credentials
- Current Community.tsx design is already solid - just needs better copy/context

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

### Iteration 17: Fix Calendar Duplicate Key React Warnings (ArtiosConnect-lq5)
**Date**: 2026-01-29
**Status**: Completed

**What was done**:
- Fixed React duplicate key warnings in CalendarMonthView and CalendarListView
- Recurring events from Google Calendar share the same UID, causing key collisions
- Changed keys from `event.id` to `${event.id}-${event.start?.getTime()}` in 4 locations

**Files modified**:
- src/components/calendar/CalendarMonthView.tsx (3 key fixes: mobile dots, desktop previews, dialog)
- src/components/calendar/CalendarListView.tsx (1 key fix: event list)

**Key decisions**:
- Combined event ID + start timestamp for unique keys per occurrence
- Used optional chaining `event.start?.getTime()` since start can be null
- Fallback to index in mobile dots where start might be null: `event.start?.getTime() ?? i`

**Learnings**:
- Google Calendar recurring events share the same UID across all occurrences
- Each occurrence has a different start date, making id+timestamp a reliable unique key
- React key warnings don't break functionality but indicate potential list rendering issues

---

### Iteration 16: Calendar List View Shows Only Upcoming Events (ArtiosConnect-2e1)
**Date**: 2026-01-29
**Status**: Completed

**What was done**:
- Fixed list view showing past events from 2024
- Added filter in Calendar.tsx to show only events from today onwards
- Month view still shows all events (needs them for full month grid)

**Files modified**:
- src/pages/Calendar.tsx (filtered listEvents useMemo)

**Key decisions**:
- Filter at the page level, not the component level - keeps CalendarListView reusable
- Month view needs all events to display the grid, so filtering is only for list view
- Compare dates at midnight (setHours 0,0,0,0) to include all-day events for today

**Learnings**:
- Calendar.tsx had `listEvents` as just sorted events, not filtered
- Filtering should happen where the data is passed, not in the display component

---

### Iteration 15: Consolidate Community Links (ArtiosConnect-nnc)
**Date**: 2026-01-29
**Status**: Completed

**What was done**:
- Evaluated duplication: Community links were in BOTH Resources page AND Community page
- Decision: Community page is the SINGLE source for parent community links
- Removed `community` section from QUICK_LINKS in initialData.js
- Removed unused `community` from SECTION_TITLES in Resources.tsx
- Community links remain in KNOWLEDGE_BASE.md (for AI) and Community.tsx (for users)

**Files modified**:
- src/data/initialData.js (removed community array from QUICK_LINKS)
- src/pages/Resources.tsx (removed community from SECTION_TITLES)

**Key decisions**:
- Community page is dedicated to social/parent groups - it has better UX (icons, explanatory text)
- Resources page now focuses on practical links (FACTS, lunch, calendar, newsletters)
- Community links are CRITICAL and deserve their own dedicated nav item (Users icon)
- No sync issues since Community.tsx owns its own data
- AI knowledge base still has community links via KNOWLEDGE_BASE.md

**User flow for GroupMe**:
- Any page → Tap "Community" in bottom nav (1 tap) → See all GroupMe chats by grade level

**Learnings**:
- buildKnowledgeBaseContent() in initialData.js does NOT include QUICK_LINKS - safe to remove sections
- Having dedicated pages for focused content > duplicating links across pages
- Bottom nav items are always 1 tap away - no need for duplication "for discoverability"

---

### Iteration 14: Calendar Mobile View Fix (ArtiosConnect-q41)
**Date**: 2026-01-29
**Status**: Completed

**What was done**:
- Redesigned CalendarMonthView for mobile-first experience
- Mobile (< sm): Compact cells with event dots, tap day to see events
- Desktop (sm+): Full event previews inline in cells
- Added day events dialog for mobile - shows all events when tapping a day with multiple events
- Single event tap goes directly to event modal
- Added mobile legend explaining dot = event and tap to view
- Improved Calendar page header with tighter mobile spacing
- Improved CalendarListView with min-h-[48px] tap targets

**Files modified**:
- src/components/calendar/CalendarMonthView.tsx (complete redesign for responsive layout)
- src/components/calendar/CalendarListView.tsx (mobile tap target improvements)
- src/pages/Calendar.tsx (mobile header spacing, aria-labels)

**Key decisions**:
- Dots-only on mobile vs full previews on desktop - keeps cells usable at 375px width
- Day cells are 48px min height on mobile (44px+ WCAG compliant tap target)
- Single-event days go directly to event modal, multi-event days show picker dialog
- Used sm: breakpoint (640px) as cutoff between mobile/desktop layouts

**Learnings**:
- 7-column calendar grid at 375px = ~53px per cell - not enough for text previews
- Event dots with count indicator work well for scanability on mobile
- Making entire day cell tappable (vs individual event buttons) is better UX on mobile
- Dialog component can be composed within a component for local state management

---

### Iteration 13: Audit Linktree and Sync Knowledge Base (ArtiosConnect-4de)
**Date**: 2026-01-29
**Status**: Completed

**What was done**:
- Audited all 14 links from Artios Linktree (https://linktr.ee/ARTIOSSH)
- Compared against initialData.js and KNOWLEDGE_BASE.md
- Found initialData.js was already complete (had all Linktree links)
- Added missing items to KNOWLEDGE_BASE.md:
  - Artios+ (artiosplus.com) - student performances portal
  - Linktree URL
  - Newsletters & Handbooks section (Elementary Connection, Choir Wire, Choir Digital Handbook)
- Removed duplicate/outdated "Current Newsletters" section from KNOWLEDGE_BASE.md

**Files modified**:
- src/data/KNOWLEDGE_BASE.md (added Student Work & Media section, Newsletters & Handbooks section)
- src/pages/Resources.tsx (added 'community' to SECTION_TITLES for proper display)

**Learnings**:
- initialData.js was well-maintained - already had all Linktree links
- KNOWLEDGE_BASE.md had newsletter info in an outdated separate section at bottom
- Consolidated newsletter links into Important Links section for consistency
- Artios+ is a Squarespace portfolio site showcasing student arts work (Theater, Dance, Film, Choir, Art)

---

### Iteration 12: Fix Queen Mothers Facebook URL (ArtiosConnect-516)
**Date**: 2026-01-29
**Status**: Completed

**What was done**:
- Fixed incorrect Queen Mothers Facebook group URL in 5 files
- Wrong: `https://www.facebook.com/groups/thequeenmothersofartios`
- Correct: `https://www.facebook.com/groups/179521002691613/`

**Files modified**:
- CLAUDE.md
- src/data/initialData.js
- src/data/KNOWLEDGE_BASE.md
- src/pages/Community.tsx
- REBUILD_SPEC.md

**Learnings**:
- Facebook group URLs can have vanity names OR numeric IDs - the numeric ID is the permanent one
- The vanity name `thequeenmothersofartios` apparently doesn't exist or was changed
- Community links should be verified by clicking them

---

### Iteration 10: Warmer Design System (ArtiosConnect-925)
**Date**: 2026-01-29
**Status**: Completed

**What was done**:
- Updated color palette to feel warmer and more mom-friendly:
  - Shifted primary from cool teal (hue 155) to warm forest green (hue 145)
  - Background now cream-white with subtle sage undertone (hue 90)
  - Added peachy-coral accent color (hue 55) for warmth instead of yellow-green
  - Borders and muted colors now warmer gray-sage (hue 100)
- Updated body background gradients to be warmer (sage + peach touches)
- Increased default radius from 1rem to 1.125rem for softer corners

**Key decisions**:
- Used OKLCH color space for perceptually uniform color changes
- Kept primary green recognizable but warmer (forest vs teal)
- Added subtle peachy warmth without changing brand identity
- All components use design tokens, so changes apply site-wide automatically

**Files modified**:
- src/index.css (@theme design tokens, body gradient)

**Learnings**:
- OKLCH hue 140-145 is warm sage/forest, hue 155+ is cooler teal
- Peachy accent (hue 55-65) adds warmth without clashing with green
- Background subtle warmth (hue 90) makes cream feel inviting vs sterile

---

### Iteration 9: Fix Remaining Schedule References (ArtiosConnect-yei)
**Date**: 2026-01-29
**Status**: Completed

**What was done**:
- Fixed schedule in REBUILD_SPEC.md - had old incorrect schedule in two places:
  - Section "B. Schedule Information" - updated to correct Academics/Arts days
  - Section "Schedule Reference (for Today display)" - updated to match KNOWLEDGE_BASE.md
- Fixed useChat.ts fallback responses - had 4 errors:
  - Schedule: Old "M/W Elementary, T/Th Jr+HS" → Correct Academics/Arts by day
  - Lunch deadline: "11:59 PM the day before" → "10 AM on class days"
  - Contact email: "office@artiossugarhill.org" → "office@artiosacademies.com"
  - Dress code: "solid colors" → "Artios t-shirt required"

**Key decisions**:
- KNOWLEDGE_BASE.md remains authoritative source
- Fallback responses now match initialData.js exactly

**Files modified**:
- REBUILD_SPEC.md (2 schedule sections)
- src/hooks/useChat.ts (SUGGESTED_RESPONSES)

**Learnings**:
- useChat.ts had hardcoded fallback responses that bypassed the knowledge base - these must stay in sync
- REBUILD_SPEC.md is a spec doc that also had outdated schedule info

---

### Iteration 8: Content Accuracy Audit (ArtiosConnect-5gm)
**Date**: 2026-01-29
**Status**: Completed

**What was done**:
- Audited ALL site content against KNOWLEDGE_BASE.md (authoritative source from 2025-2026 handbook)
- **MAJOR FIX**: Corrected weekly schedule - it was completely wrong
- Updated FAQ answers, contact emails, and all placeholder quick links with real URLs
- Updated TodayCard.tsx, Resources.tsx, CLAUDE.md, and eslint.config.js

**Key decisions**:
- KNOWLEDGE_BASE.md is the authoritative source
- Schedule now shows both division AND type (Academics vs Arts)

**Files modified**:
- src/data/initialData.js, src/components/home/TodayCard.tsx, src/pages/Resources.tsx, CLAUDE.md, eslint.config.js

---

### Iteration 7: Bottom Nav Active State Fix (ArtiosConnect-ql7)
**Date**: 2026-01-29
**Status**: Completed

**What was done**:
- Fixed bottom nav to clearly indicate active tab
- Active tabs now have filled primary background on icon (bg-primary text-primary-foreground shadow-md)
- Inactive tabs have muted text (text-muted-foreground)
- Chat tab (highlight) gets subtle primary tint when inactive (bg-primary/15 text-primary)
- Used NavLink render prop pattern to access isActive state for both className and children

**Key decisions**:
- Used render prop children for NavLink (not just className) to conditionally style icon container
- Chat highlight styling only applies when inactive - active state overrides it
- Kept styling minimal - bg + shadow is enough visual distinction

**Files modified**:
- src/components/layout/BottomNav.tsx (active state logic)

**Learnings**:
- React Router v6 NavLink supports render prop children: `{({ isActive }) => <content />}`
- Both className and children can receive the isActive state
- Previous code only used isActive for className, not for icon styling

---

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

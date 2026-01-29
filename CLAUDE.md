# Artios Connect

A parent information hub and AI-powered assistant for Artios Academies of Sugar Hill - a Christian homeschool hybrid academy in Georgia.

## What This App Does

Artios Connect helps parents quickly find school information, stay updated on events, and communicate with the school community. The AI chat assistant "Ollie" answers questions about schedules, policies, and school life.

## Stack

- **Frontend**: React 19, Vite 7, TailwindCSS 4, Lucide React
- **Backend**: Express.js (chat API), Convex (database)
- **AI**: OpenAI GPT-4o-mini
- **Deployment**: Vercel (frontend + serverless functions)

## Commands

```bash
npm run dev          # Vite dev server (http://localhost:5173)
npm run build        # Production build
npm run test         # Vitest tests
npm run lint         # ESLint
npm run server       # Express chat server (port 3001)
npm run dev:all      # Both dev & server concurrently
npx convex dev       # Convex dev server (run in separate terminal)
```

## Environment Variables

```env
VITE_CONVEX_URL=https://[deployment].convex.cloud
VITE_GOOGLE_CALENDAR_ICS_URL=https://calendar.google.com/calendar/ical/[id]/public/basic.ics
OPENAI_API_KEY=sk-...
```

## Quality Gates

- ESLint must pass
- Build must succeed
- Convex typecheck: `npx convex typecheck`

## Key Design Decisions

- **No grade filtering** - Content is for all parents regardless of child's grade
- **Simple password auth** - Parent: `artios2026`, Admin: `artiosadmin2026`
- **AI-first** - Chat assistant is the primary way to find information
- **Mobile-first** - Primary users are parents on phones
- **Safety-focused AI** - Ollie only provides verified info, redirects sensitive topics to director

## App Structure

### Pages (in `/src/pages/`)
- `Home.jsx` - Dashboard with today's schedule, events, announcements, quick actions
- `Chat.jsx` - AI assistant "Ollie" interface
- `Calendar.jsx` - School events (month/list view, fetches from Google Calendar ICS)
- `Resources.jsx` - FAQ, contacts, documents, quick links
- `Community.jsx` - Parent community connections (Facebook, GroupMe)
- `AdminDashboard.jsx` - Notifications, announcements, AI settings, analytics

### Key Components (in `/src/components/`)
- `layout/` - ParentLayout, BottomNav, AppShell
- `home/` - TodayCard, AIHeroSection, QuickActions, UpcomingEvents
- `chat/` - MessageBubble, ChatInput, TypingIndicator, WelcomeState
- `auth/` - RequireParentAuth, RequireAdminAuth

### Data & State
- `src/data/initialData.js` - School info, schedules, FAQ, policies
- `src/data/KNOWLEDGE_BASE.md` - Comprehensive AI knowledge base
- `src/contexts/GradeContext.jsx` - Track selected grade level (K-6, 7-8, 9-12)
- `convex/` - Database schema (announcements, notifications, aiSettings, analytics)

### Hooks (in `/src/hooks/`)
- `useChat.js` - Chat message management, API calls
- `useCalendarEvents.js` - Fetch & cache calendar ICS feed
- `useAnnouncements.js` - Fetch announcements from Convex
- `useGradeLevel.js` - Access grade context
- `useFormattedCalendar.js` - Format events for display

## Parent Community Links

These are CRITICAL for parent communication - moms and teachers use these daily for:
- Lost & found, selling/giving away books and uniforms
- Volunteer requests, field trip coordination
- Quick reminders and school updates
- General community support

### Facebook Group
- **The Queen Mothers of Artios**: https://www.facebook.com/groups/179521002691613/

### GroupMe Chats
- **Elementary Parents (K-6)**: https://groupme.com/join_group/103000376/K14Mdomu
- **Junior High Parents (7-8)**: https://groupme.com/join_group/103000520/kNrkPm3r
- **High School Parents (9-12)**: https://groupme.com/join_group/61225305/sekxr3mG

## Schedule Reference

- **Monday**: Elementary (K-6) & Junior High (7-8) — Academics
- **Tuesday**: High School (9-12) — Academics
- **Wednesday**: Junior High (7-8) — Arts
- **Thursday**: Elementary (K-6) — Arts
- **Friday**: High School (9-12) — Arts

## Preserved Files (Don't Modify Without Good Reason)

- `convex/` - Database schema and functions
- `server.js` - Express chat API
- `api/chat.js` - Vercel serverless function
- `src/data/initialData.js` - Static school data
- `src/data/KNOWLEDGE_BASE.md` - AI knowledge base

## Philosophy

This codebase will outlive you. Fight entropy. Leave it better than you found it.

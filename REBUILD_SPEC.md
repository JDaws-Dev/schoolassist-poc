# Artios Connect - Complete Rebuild Specification

> **Purpose**: This document captures all functionality, features, and design goals for rebuilding Artios Connect from scratch.

---

## Overview

**App Name**: Artios Connect

**What It Is**: A parent information hub and AI-powered assistant for Artios Academies of Sugar Hill, a Christian homeschool hybrid (University-Model) school in Suwanee, Georgia.

**Target Users**: Parents of students in the Artios hybrid program

**Core Philosophy**: AI-first design. The AI assistant "Ollie" should be the primary way parents find information, with traditional navigation as a backup.

---

## Tech Stack

- **Frontend**: React 19, Vite 7, **TypeScript**
- **Styling**: TailwindCSS 4
- **UI Components**: **shadcn/ui** (warm/friendly customization)
- **Icons**: Lucide React
- **Backend**: Express.js API for chat
- **AI**: OpenAI GPT-4o-mini
- **Database**: Convex (real-time serverless)
- **Calendar**: Google Calendar ICS feed integration
- **Deployment**: Vercel (frontend + serverless functions)

---

## Design Direction

### Visual Style
- **Warm & friendly** - soft colors, rounded corners, approachable
- **Consumer-app polish** - Airbnb/Spotify level quality
- **Green color palette** - forest/sage/emerald tones (school brand)
- **Mobile-first** - primary users are parents on phones

### Design Problems to Solve (from v1)
| Problem | Solution |
|---------|----------|
| Looked amateurish/cheap | Make it professional and polished |
| Too cluttered/busy | Clean layouts, intentional whitespace |
| Poor mobile experience | Design mobile-first, test on phones |
| Inconsistent styling | Use shadcn/ui for consistency |

### Design Principles
- Keep it simple - don't over-engineer
- Subtle, not flashy (no gradient overload, heavy animations)
- Fast and lightweight

---

## User Experience Goals

### What Parents Should Feel
1. **Effortless** - Finding information should feel instant and natural
2. **Trustworthy** - AI answers should be accurate, never made up
3. **Connected** - Parents should feel informed about what's happening at school
4. **Modern** - The app should feel as polished as apps they use daily

### Primary User Journey
```
Parent opens app → Sees something relevant to TODAY →
Either asks AI a question OR browses to find info →
Gets accurate answer → Feels informed
```

### Key Insight
Parents don't want to hunt through menus. They want to:
1. Ask a question and get an answer
2. See what's happening today/this week
3. Access quick links (FACTS, lunch ordering) fast

---

## Authentication

### Parent Login
- Simple password gate: `artios2026`
- Store in sessionStorage (logs out when browser closes)
- This is intentionally simple - meant for school to distribute

### Admin Login
- Route: `/admin`
- Password: `artiosadmin2026`
- Separate sessionStorage key
- Full dashboard access

---

## Navigation

- **Bottom tab bar** (mobile-app style, 4-5 tabs)
- Thumb-friendly, persistent across pages
- Tabs: Home, Chat, Calendar, Resources, (optional: Community)

---

## Core Features

### 1. Home Page (Default)

**Focus**: Today's info + quick actions

**Required Elements**:

#### A. Today Card
- Is today a school day or home learning day?
- What time does school start/end?
- Pickup info if applicable
- Lunch deadline reminder if morning

#### B. Quick Actions (Must Keep)
| Action | Destination | Note |
|--------|-------------|------|
| FACTS Portal | External link | Grades, enrollment, student info |
| Lunch Ordering | External link | Show deadline countdown if applicable |
| Calendar | In-app navigation | Jump to calendar view |

#### C. Upcoming Events
- Next 3 events
- Clickable to see details

#### D. Recent Announcements
- Latest 2 announcements from admin
- Title, date, brief content

#### E. AI Entry Point
- Prominent text input for asking questions
- Can be secondary to Today info, but easily accessible

---

### 2. AI Chat Assistant - "Ollie" (CRITICAL)

**Purpose**: Let parents ask questions in natural language and get accurate answers.

**Requirements**:
- Simple chat interface
- Knowledge base-powered responses
- Safety guardrails (redirects sensitive topics to director)
- Keep current approach - no changes to AI behavior
- Welcome message with mascot ("Ollie" the owl)
- Quick suggestion chips
- Session persistence in sessionStorage

**AI Safety Rules** (implement in system prompt):
```
- ONLY provide information from knowledge base or school calendar
- NEVER make up, invent, or guess information
- If unknown: "I don't have that specific information. Please contact the school office."
- For sensitive topics: redirect to Director John Lane
- Temperature: 0.2 (low, to reduce hallucination)
```

**Backend Endpoint**:
```
POST /api/chat
Body: { message: string, history: Message[], sessionId: string }
Response: { response: string }
```

---

### 3. Calendar View

**Requirements**:
- **Month view + list view toggle**
- Month/year navigation
- Clean event display
- Event detail modal on click:
  - Title, date, time, location
  - Full description
  - "Add to Google Calendar" button

**Data Source**: Google Calendar ICS feed

---

### 4. Resources/Info View

**Sections**:

#### A. Quick Links (Categorized)
| Category | Links |
|----------|-------|
| Essential | FACTS Portal, School Calendar, Lunch Ordering |
| Events | Eventbrite |
| Newsletters | The Elementary Connection, Choir Wire |
| Parent Meetings | Director scheduling (Calendly) |
| Volunteer | TA sub signup (SignUpGenius) |
| Shopping | Spirit wear |
| Podcasts | Artios At Home (Apple Podcasts, Spotify) |
| Media | Artios+ Productions |

#### B. Schedule Information
```
Weekly Schedule:
- Monday: Elementary & Junior High (Academics)
- Tuesday: High School (Academics)
- Wednesday: Junior High (Arts)
- Thursday: Elementary (Arts)
- Friday: High School (Arts)

Timing:
- Doors open: 8:50 AM
- School starts: 9:00 AM
```

#### C. FAQ Section
| Question | Brief Answer |
|----------|--------------|
| What time does school start? | 9:00 AM, doors open at 8:50 AM |
| What is a University-Model school? | Students attend campus 2 days, learn at home 3 days |
| What's the dress code? | Navy, black, white, gray tops; khaki/navy bottoms |
| How do I order lunch? | Artios Cafe, order by deadline |
| What about weather closures? | Follow Gwinnett County Schools + check email |
| Cell phone policy? | Phones off and away during school hours |
| How do I report an absence? | Email office, FACTS absence form |
| When to keep child home? | Fever-free 24hrs without meds, no vomiting 24hrs |

#### D. Contact Information
```
Artios Academies of Sugar Hill
415 Brogdon Road
Suwanee, GA 30024

Directors:
- John Lane (jmlane@artiosacademies.com) - Primary contact
- Jackie Thompson (jthompson@artiosacademies.com)

Other Contacts:
- Technical Support: support@artiosacademies.com
- Billing: billing@artiosacademies.com
```

---

### 5. Community Page (CRITICAL)

**Purpose**: Parents use these links daily for communication.

#### Facebook Group
- **The Queen Mothers of Artios**: https://www.facebook.com/groups/thequeenmothersofartios

#### GroupMe Chats
- **Elementary Parents (K-6)**: https://groupme.com/join_group/103000376/K14Mdomu
- **Junior High Parents (7-8)**: https://groupme.com/join_group/103000520/kNrkPm3r
- **High School Parents (9-12)**: https://groupme.com/join_group/61225305/sekxr3mG

**Use Cases**:
- Lost & found
- Selling/giving away books and uniforms
- Volunteer requests
- Field trip coordination
- Quick reminders and school updates

---

### 6. Admin Dashboard (`/admin`)

**Full build required** - Manage content and monitor usage.

**Sections**:

#### A. Notifications Management
- Create/edit/delete notifications
- Fields: title, content (optional), type, isLive, scheduledFor, expiresAt
- Types: alert, info, warning, success

#### B. Announcements Management
- CRUD for announcements
- Fields: title, content, date, priority, type, url (optional)

#### C. AI Settings
- Edit system prompt
- Adjust temperature (0.0-1.0 slider)
- Manage knowledge base items (add/edit/delete topics)

#### D. Analytics Dashboard
- Total chat sessions
- Total messages sent
- Notification view/dismiss counts
- Simple metrics display

---

## Schedule Reference (for Today display)

- **Monday**: Elementary (K-6) & Junior High (7-8) — Academics
- **Tuesday**: High School (9-12) — Academics
- **Wednesday**: Junior High (7-8) — Arts
- **Thursday**: Elementary (K-6) — Arts
- **Friday**: High School (9-12) — Arts

---

## Code Approach

- **Fresh start** - new files, can reference old code for patterns
- **TypeScript** throughout
- Reference existing:
  - `src/data/initialData.js` - school data
  - `src/data/KNOWLEDGE_BASE.md` - AI knowledge base
  - `convex/` - database schema patterns
  - Community links in CLAUDE.md

---

## File Structure

```
src/
  components/
    ui/           # shadcn components
    layout/       # Shell, BottomNav
    home/         # TodayCard, QuickActions
    chat/         # MessageBubble, ChatInput
    calendar/     # MonthView, ListView
    admin/        # Dashboard components
  pages/
  hooks/
  contexts/
  lib/            # utilities, cn()
  types/          # TypeScript types
  data/
convex/
api/              # Vercel serverless
```

---

## Data Models

### Convex Schema

```typescript
// announcements
{
  title: string,
  content: string,
  date: string,
  priority: string,
  type?: string,
  url?: string
}

// notifications
{
  title: string,
  content?: string,
  type: string,        // 'alert' | 'info' | 'warning' | 'success'
  isLive: boolean,
  postedAt?: number,
  expiresAt?: number,
  scheduledFor?: number
}

// aiSettings
{
  systemPrompt?: string,
  temperature?: number,
  knowledge?: Array<{
    id: string,
    topic: string,
    info: string,
    createdAt: number
  }>
}

// notificationMetrics
{
  notificationId: Id<"notifications">,
  viewCount: number,
  dismissCount: number
}

// chatSessions
{
  sessionId: string,
  startedAt: number,
  messageCount: number,
  lastMessageAt: number
}
```

### Storage Keys

**localStorage**:
| Key | Purpose |
|-----|---------|
| `artios-chat-history` | Chat history |
| `artios-session-id` | Current chat session ID |
| `artios-calendar-view` | Calendar view preference |
| `artios-dismissed-[id]` | Track dismissed notifications |

**sessionStorage**:
| Key | Purpose |
|-----|---------|
| `parentLoggedIn` | Parent authentication state |
| `adminLoggedIn` | Admin authentication state |

---

## Environment Variables

```env
VITE_CONVEX_URL=https://[deployment].convex.cloud
VITE_GOOGLE_CALENDAR_ICS_URL=https://calendar.google.com/calendar/ical/[id]/public/basic.ics
OPENAI_API_KEY=sk-...
```

---

## Quality Gates

- ESLint must pass
- TypeScript strict mode
- Build must succeed
- Mobile-responsive (test at 375px width)
- Convex typecheck passes: `npx convex typecheck`

---

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

---

## Checklist - What MUST Work

- [ ] Parent can log in with password
- [ ] Parent can ask AI a question and get accurate response
- [ ] Parent can see today's schedule status
- [ ] Parent can see upcoming events
- [ ] Parent can view full calendar (month + list views)
- [ ] Parent can access FACTS, lunch ordering, other quick links
- [ ] Parent can see admin notifications
- [ ] Parent can browse FAQ and find answers
- [ ] Parent can find contact information
- [ ] Parent can access community links (Facebook, GroupMe)
- [ ] Chat history persists during session
- [ ] Admin can create/edit notifications
- [ ] Admin can manage announcements
- [ ] Admin can manage AI settings
- [ ] Admin can view basic analytics

---

## Summary

Build a beautiful, modern parent portal that:

1. **Shows what matters TODAY** when parents open it
2. **Makes AI easy to access** - Ollie should be 1 tap away
3. **Makes common tasks fast** - FACTS, lunch, calendar in 1-2 taps
4. **Connects parents** - Community links are critical
5. **Looks and feels premium** - Airbnb/Spotify level polish with warm, friendly green aesthetic

---

*Document updated: January 29, 2026*
*For: Complete rebuild with TypeScript + shadcn/ui*

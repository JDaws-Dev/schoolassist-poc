# Artios Connect - Complete Rebuild Specification

> **Purpose**: This document captures all functionality, features, and user experience goals for Artios Connect. Use this to rebuild the design from scratch while preserving every feature.

---

## Overview

**App Name**: Artios Connect (formerly SchoolAssistAI)

**What It Is**: A parent information hub and AI-powered assistant for Artios Academies of Sugar Hill, a Christian homeschool hybrid (University-Model) school in Suwanee, Georgia.

**Target Users**: Parents of students in the Artios hybrid program

**Core Philosophy**: AI-first design with grade-level personalization. The AI assistant should be the primary way parents find information, with traditional navigation as a backup.

---

## Tech Stack (Keep These)

- **Frontend**: React 19 + Vite 7
- **Styling**: TailwindCSS (preferred) or CSS
- **Icons**: Lucide React
- **Backend**: Express.js API for chat
- **AI**: OpenAI GPT-4o-mini
- **Database**: Convex (real-time serverless)
- **Calendar**: Google Calendar ICS feed integration

---

## User Experience Goals

### What Parents Should Feel
1. **Effortless** - Finding information should feel instant and natural
2. **Personal** - Content should feel tailored to their child's grade/division
3. **Trustworthy** - AI answers should be accurate, never made up
4. **Connected** - Parents should feel informed about what's happening at school
5. **Modern** - The app should feel as polished as apps they use daily

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

## Core Features to Implement

### 1. AI Chat Assistant (CRITICAL - Primary Feature)

**Purpose**: Let parents ask questions in natural language and get accurate answers.

**Requirements**:
- Text input prominently displayed (this is the main interaction)
- Send messages to OpenAI GPT-4o-mini via Express backend
- Display conversation history (session-based)
- Contextual suggestion chips that change based on time of day
- Message feedback (like/dislike buttons)
- Copy response to clipboard
- Session persistence in sessionStorage

**AI Safety Rules** (implement in system prompt):
```
- ONLY provide information from knowledge base or school calendar
- NEVER make up, invent, or guess information
- If unknown: "I don't have that specific information. Please contact the school office."
- For sensitive topics: redirect to Director John Lane
- Temperature: 0.2 (low, to reduce hallucination)
```

**Contextual Suggestions by Time**:
| Time | Example Suggestions |
|------|---------------------|
| Morning (6am-12pm) | "What time does school end today?", "Is the lunch deadline passed?" |
| Afternoon (12pm-5pm) | "What's for lunch tomorrow?", "Any upcoming events?" |
| Evening (5pm-9pm) | "What time do doors open?", "What's the dress code?" |
| Weekend | "When's the next school day?", "What events are coming up?" |

**Backend Endpoint**:
```
POST /api/chat
Body: { message: string, history: Message[], sessionId: string }
Response: { response: string }
```

**Knowledge Sources for AI**:
1. School handbook/policies (from KNOWLEDGE_BASE.md)
2. Live Google Calendar events (fetched and cached)
3. School info (address, hours, contacts)

---

### 2. Grade-Level Personalization

**Purpose**: Filter all content to be relevant to the parent's child.

**Grade Structure**:
```javascript
grades: ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

divisions: {
  elementary: {
    label: 'Elementary (K-6)',
    grades: ['K', '1', '2', '3', '4', '5', '6'],
    classDays: ['Monday', 'Wednesday']
  },
  jrhigh: {
    label: 'Jr High (7-8)',
    grades: ['7', '8'],
    classDays: ['Tuesday', 'Thursday']
  },
  highschool: {
    label: 'High School (9-12)',
    grades: ['9', '10', '11', '12'],
    classDays: ['Tuesday', 'Thursday']
  }
}
```

**Features**:
- Grade selector component (allow multiple selections for families with multiple kids)
- Store selection in localStorage (`artios-grade-levels`)
- Filter calendar events by grade keywords
- Show personalized "Today" status (school day vs home day)
- Filter suggestions based on division

**Event Filtering Keywords**:
- Elementary: "elem", "elementary", "k-6", "k6"
- Jr High: "jh", "jr high", "junior high", "7-8"
- High School: "hs", "high school", "9-12"

---

### 3. Home/Dashboard View

**Purpose**: Give parents immediate value when they open the app.

**Required Elements**:

#### A. AI Entry Point (Hero Position)
- Prominent text input for asking questions
- Greeting that changes by time of day
- Suggestion chips (3-4 contextual questions)
- Grade selector (compact)

#### B. Notification Banner
- Dismissable alerts from admin
- Support for different types: alert, info, warning, success
- Track dismissals in localStorage

#### C. Quick Actions (3 Primary)
| Action | Destination | Note |
|--------|-------------|------|
| FACTS Portal | External link | Grades, enrollment, student info |
| Lunch Ordering | External link | Show deadline countdown if applicable |
| Calendar | In-app navigation | Jump to calendar view |

#### D. Today Card
- Is today a school day or home learning day?
- What time does school start/end?
- Pickup info if applicable
- Lunch deadline reminder if morning

#### E. Upcoming Events
- Next 3 events (filtered by grade)
- Clickable to see details
- "Add to Calendar" option

#### F. Recent Announcements
- Latest 2 announcements from admin
- Title, date, brief content

---

### 4. Calendar View

**Purpose**: Full calendar of school events with grade filtering.

**Requirements**:
- Month view (calendar grid with event dots)
- List/Agenda view (chronological list)
- Toggle between views (persist preference)
- Grade filter (show only relevant events)
- Month/year navigation
- Event detail modal on click:
  - Title, date, time, location
  - Full description
  - "Add to Google Calendar" button

**Data Source**: Google Calendar ICS feed
```
https://calendar.google.com/calendar/ical/[calendar-id]/basic.ics
```

---

### 5. Full Chat View

**Purpose**: Dedicated space for longer AI conversations.

**Requirements**:
- Full-screen chat interface
- Welcome message with mascot ("Ollie" the owl)
- Quick suggestion chips at top
- Full message history for session
- Can receive initial question from other views (deep link)
- Clear visual distinction between user/assistant messages

---

### 6. Resources/Info View

**Purpose**: Traditional navigation for browsing information.

**Sections to Include**:

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
- Monday: Elementary on campus
- Tuesday: Jr High & High School on campus
- Wednesday: Elementary on campus
- Thursday: Jr High & High School on campus
- Friday: Home learning (optional enrichment)

Timing:
- Doors open: 8:50 AM
- School starts: 9:00 AM
- Dismissal: Check FACTS for exact times
```

#### C. FAQ Section (Searchable)
| Question | Brief Answer |
|----------|--------------|
| What time does school start? | 9:00 AM, doors open at 8:50 AM |
| What is a University-Model school? | Students attend campus 2 days, learn at home 3 days |
| What's the dress code? | Navy, black, white, gray tops; khaki/navy bottoms |
| How do I order lunch? | Artios Cafe, order by deadline (usually 11:59 PM day before) |
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
- John Lane (john@artiossugarhill.org)
- Jackie Thompson

Office Hours: [school days]
Schedule Meeting: [Calendly links]
```

#### E. Social Media
- Instagram: @artios_sugarhill
- Facebook: Artios Academies of Sugar Hill

---

### 7. Admin Dashboard (`/admin`)

**Purpose**: Let administrators manage content and monitor usage.

**Tabs/Sections**:

#### A. Notifications Management
- Create new notification
- Edit existing
- Delete
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

## Data Models

### Convex Schema (Keep This)

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
  postedAt?: number,   // timestamp
  expiresAt?: number,  // timestamp
  scheduledFor?: number // timestamp
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

### localStorage Keys
| Key | Purpose |
|-----|---------|
| `artios-grade-levels` | Selected grade levels array |
| `artios-chat-[context]` | Chat history by context |
| `artios-session-id` | Current chat session ID |
| `artios-calendar-view` | Calendar view preference ('month' or 'list') |
| `artios-dismissed-[id]` | Track dismissed notifications |
| `artiosConnectData` | Cached app data |

### sessionStorage Keys
| Key | Purpose |
|-----|---------|
| `parentLoggedIn` | Parent authentication state |
| `adminLoggedIn` | Admin authentication state |

---

## External Links (Reference)

| Service | URL Pattern | Purpose |
|---------|-------------|---------|
| FACTS | https://factsmgt.com/... | Grades, enrollment |
| Artios Cafe | Lunch ordering site | Lunch orders |
| Eventbrite | Event tickets | School events |
| SignUpGenius | Volunteer signups | TA/volunteer coordination |
| Calendly | Director scheduling | Parent meetings |
| Apple Podcasts | Artios At Home podcast | |
| Spotify | Artios At Home podcast | |

---

## Navigation Structure

The app needs 4 main areas (however you want to present them):

1. **Home/Dashboard** - Landing page with AI, quick actions, today's info
2. **Chat/Ask** - Full AI conversation interface
3. **Calendar** - School events calendar
4. **Info/Resources** - Links, FAQ, contacts, schedules

Previous design used:
- Bottom tab bar on mobile
- Sidebar on desktop
- **Feel free to completely reimagine this**

---

## Responsive Requirements

- Must work well on mobile (primary use case - parents on phones)
- Should work on tablet and desktop
- Touch-friendly tap targets
- Readable text sizes

---

## Things That MUST Work

1. [ ] Parent can log in with password
2. [ ] Parent can ask AI a question and get accurate response
3. [ ] Parent can select their child's grade level(s)
4. [ ] Content filters based on grade selection
5. [ ] Parent can see upcoming events
6. [ ] Parent can view full calendar
7. [ ] Parent can access FACTS, lunch ordering, other quick links
8. [ ] Parent can see admin notifications
9. [ ] Parent can browse FAQ and find answers
10. [ ] Parent can find contact information
11. [ ] Chat history persists during session
12. [ ] Admin can create/edit notifications
13. [ ] Admin can manage AI settings
14. [ ] Admin can view basic analytics

---

## Things to Preserve (Backend)

Keep these files/functionality intact:
- `convex/` directory (all Convex functions and schema)
- `server.js` (Express API for chat)
- `src/data/initialData.js` (static data)
- `api/chat.js` (Vercel serverless function)

---

## Design Freedom

You have **complete freedom** to redesign:

- Color scheme
- Typography
- Layout and spacing
- Component design
- Navigation pattern
- Animation and transitions
- Visual hierarchy
- Icon usage
- Card designs
- Button styles
- Form inputs
- Everything visual

### Design Constraints (Only These)
1. Must be accessible (good contrast, readable text)
2. Must work on mobile
3. Must feel modern and polished
4. AI chat should be prominent/easy to access
5. School branding colors available: (use or don't use as you see fit)
   - Current uses blues and whites
   - School colors can be researched or ignored

---

## Sample User Flows to Support

### Flow 1: Quick Question
```
Open app → Type question in prominent input → Get AI answer → Done
```

### Flow 2: Check Today's Schedule
```
Open app → See "Today" card → Know if school day → See relevant times
```

### Flow 3: Order Lunch
```
Open app → Tap lunch quick action → Opens external lunch site
```

### Flow 4: Find Upcoming Event
```
Open app → See upcoming events → Tap for details → Add to calendar
```

### Flow 5: Look Up Policy
```
Open app → Navigate to info/resources → Find FAQ → Read answer
(OR: Ask AI "what's the dress code?")
```

### Flow 6: Check Calendar
```
Open app → Navigate to calendar → Browse month → Filter by grade → Tap event for details
```

---

## What NOT to Include

- User accounts/registration (simple password is intentional)
- Push notifications (not implemented)
- Offline mode (nice-to-have but not required)
- Multi-language support
- Dark mode (unless you want to add it)

---

## Summary

Build a beautiful, modern parent portal that:

1. **Puts AI front and center** - Parents should naturally reach for the chat
2. **Personalizes by grade** - Everything should feel relevant to their child
3. **Provides instant value** - Show what matters TODAY when they open it
4. **Makes common tasks fast** - FACTS, lunch, calendar in 1-2 taps
5. **Looks and feels premium** - Should feel as nice as apps they use daily

The current functionality is solid. The current design needs a complete refresh. Build something you'd be proud to show.

---

## Files for Reference

To understand current implementation:
- `src/components/` - All current React components
- `src/hooks/useGradeLevel.js` - Grade filtering logic
- `src/utils/contextualSuggestions.js` - Time-based AI suggestions
- `src/data/initialData.js` - All static school data
- `convex/` - Database schema and functions
- `server.js` - Chat API implementation

---

*Document created: January 26, 2026*
*For: Complete UI/UX redesign while preserving functionality*

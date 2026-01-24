# Artios Connect Data Index

This document indexes all data sources and their locations for the Artios Connect parent portal.

---

## Primary Data Sources

### 1. Knowledge Base (Primary Source of Truth)
**File**: `src/data/KNOWLEDGE_BASE.md`

Contains all factual information about the school:
- School overview & mission
- Schedule & hours (all grade levels)
- Dress code requirements
- Lunch & food policies
- All school policies (phone, absence, illness, weather, etc.)
- Contact information
- Important links
- New family onboarding checklist
- FAQ content
- Special programs (Friday Arts, Dance, Art Club)
- Current newsletters

**Used by**: AI Assistant, FAQ component, WelcomePage

---

### 2. Application Data
**File**: `src/data/initialData.js`

Contains structured data for the application:

| Section | Description | Location in File |
|---------|-------------|------------------|
| `quickLinks` | External resource links (FACTS, Calendar, Cafe, etc.) | Lines 5-26 |
| `faq` | FAQ Q&A pairs | Lines 28-37 |
| `staffDirectory` | Staff contact info | Lines 39-42 |
| `onboardingSteps` | New family checklist | Lines 44-51 |
| `communityResources` | Community links | Lines 53-57 |
| `schedules` | Detailed schedules (overview, Friday arts, dance) | Lines 59-90 |
| `announcements` | Current announcements | Lines 92-95 |
| `upcomingEvents` | Calendar events | Lines 97-105 |
| `documents` | Important documents | Lines 107-112 |
| `schoolInfo` | Basic school info | Lines 114-120 |
| `aiSettings` | AI assistant configuration | Lines 122-196 |
| `notifications` | Push notifications (admin-managed) | Line 202 |

---

## Data Categories

### Quick Links (by Category)

| Category | Items |
|----------|-------|
| Essential | FACTS Portal, School Calendar, Artios Cafe |
| Events | Eventbrite page |
| Newsletters | Elementary Connection, Choir Wire |
| Parent Partnership Meetings | John Lane, Jackie Thompson, Becky Buckwalter |
| Volunteer | Parent TA Sub Signup |
| Shopping | Winter Wear |
| Podcast | Apple Podcasts, Spotify |

### FAQ Topics

1. School start times
2. University-model explanation
3. Dress code
4. Lunch ordering
5. Weather/closure policy
6. Cell phone policy
7. Missed class policy
8. When to keep child home

### Schedule Types

1. **Overview** - Basic schedule by grade level
2. **Friday Arts** - HS Arts Conservatory time blocks
3. **Monday Dance** - Dance program schedule
4. **Art Club** - Lower Elementary Art Club info

---

## AI Assistant Configuration

**Location**: `initialData.js` > `aiSettings`

### System Prompt Sections
The AI prompt includes:
- School basic info
- Full schedule information
- Dress code details
- Cell phone policy
- Absence policy
- Illness guidelines
- Weather policy
- Lunch information
- Late work policy
- Grading scale
- Conflict resolution process
- Response instructions

### Sensitive Topics
Topics requiring human contact:
- Gender identity
- Bullying
- Mental health
- Family situations
- Faith questions
- Discipline issues

---

## Data Update Locations

When updating information, change these files:

| Information Type | Update Location |
|------------------|-----------------|
| School policies | `KNOWLEDGE_BASE.md` + `aiSettings.systemPrompt` |
| FAQ questions | `KNOWLEDGE_BASE.md` + `initialData.faq` |
| Quick links | `initialData.quickLinks` |
| Events | `initialData.upcomingEvents` |
| Announcements | `initialData.announcements` |
| Contact info | `KNOWLEDGE_BASE.md` + `initialData.staffDirectory` |
| Schedules | `KNOWLEDGE_BASE.md` + `initialData.schedules` |

---

## Component Data Dependencies

| Component | Data Source(s) |
|-----------|---------------|
| HomePage | `upcomingEvents`, `quickLinks`, `schoolInfo` |
| CalendarPage | `upcomingEvents` |
| MorePage | `faq`, `quickLinks`, `schedules` |
| WelcomePage | `onboardingSteps`, `schedules` |
| ChatWidget | `aiSettings.systemPrompt` |
| QuickActions | `quickLinks`, favorites (localStorage) |
| NotificationBar | `notifications` |
| AdminPanel | All data (full CRUD access) |

---

## localStorage Keys

| Key | Purpose |
|-----|---------|
| `artiosConnectData` | Persisted app data |
| `artios-favorites` | User's favorite quick links |
| `artios-returning-visitor` | First-visit tracking |

---

## Future Improvements

1. **Centralize AI prompt** - Move to KNOWLEDGE_BASE.md and parse at runtime
2. **Add versioning** - Track data updates with timestamps
3. **Create admin editor** - Web interface for updating KNOWLEDGE_BASE.md
4. **Sync mechanism** - Auto-update FAQ from knowledge base

---

*Last Updated: January 2026*

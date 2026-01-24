# Artios Connect (Lite Version)

A streamlined parent information hub for Artios Academies of Sugar Hill.

## Quick Start

```bash
# Terminal 1: Start the API server
npm run server

# Terminal 2: Start the frontend
npm run dev
```

Then open http://localhost:5173 in your browser.

## Current Status

### ✅ Completed Features

#### Parent-Facing
- **Notification Bar**: Dismissable admin announcements at top of page
- **Hero Section**: Welcome message with 4 quick action buttons (FACTS Portal, Order Lunch, Calendar, Newsletter)
- **Featured AI Chat**: Prominent "Have a Question?" section with suggested topics
- **What's Happening**: Date-aware events section (filters past events, shows "TODAY" badge)
- **Full Calendar View**: Embedded Google Calendar showing entire 2025-2026 school year
- **Resources Section**: Documents, Newsletters, Podcast links (consolidated)
- **Get Involved Section**: Volunteer, Events & Tickets, School Store
- **FAQ Section**: 8 common questions with answers
- **School Hours**: Correct schedule by grade level with doors-open time
- **Welcome Page**: Complete guide for new families including:
  - Program overview and mission
  - Detailed schedule for all grade levels (with correct hours)
  - Tuition pricing (K-8th)
  - Enrollment requirements
  - Getting started checklist
  - Contact information for both directors
- **Contact Section**: Directors' emails, meeting scheduling links, correct address
- **Footer**: Links to Instagram, Facebook, and key resources

#### Admin Backend
- Login via footer link (password: `artios2026`)
- Manage notifications (push alerts to all parents)
- Manage announcements
- Manage upcoming events
- Manage quick links
- Manage AI settings (system prompt, temperature)
- Manage documents
- Manage FAQ

#### Technical Improvements
- localStorage refreshes quickLinks, faq, schedules, and schoolInfo from initialData
- Date-aware filtering with TODAY constant and isUpcoming()/isToday() helpers
- View-based routing using `currentView` state ('home' or 'welcome')
- Mobile-responsive design
- Events are clickable with labeled "Add to Cal" buttons
- AI assistant has comprehensive school knowledge including programs, pricing, and enrollment info
- Notification dismissal persists via localStorage

### 📋 Future Enhancements
- Add social media feed integration
- More document uploads as school provides them
- Parent feedback/suggestion form

## Tech Stack

- **Frontend**: React 19 + Vite 7
- **Backend**: Express.js (local) / Vercel Serverless (production)
- **AI**: OpenAI API (gpt-4o-mini)
- **Icons**: Lucide React
- **Styling**: Plain CSS

## Project Structure

```
poc/
├── api/
│   └── chat.js          # Vercel serverless function
├── public/
│   ├── artios-logo.png
│   └── favicon.svg
├── src/
│   ├── App.jsx          # Main React app
│   ├── index.css        # Styles
│   └── main.jsx         # Entry point
├── server.js            # Local dev API server
├── index.html
├── package.json
├── vercel.json
└── .env                 # OPENAI_API_KEY
```

## Environment Variables

Create a `.env` file with:
```
OPENAI_API_KEY=your-key-here
```

## Development Commands

```bash
npm run dev      # Start Vite dev server (frontend only)
npm run server   # Start Express API server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Deployment

Deployed to Vercel. The `api/chat.js` file is automatically deployed as a serverless function.

## Branch Info

- **main**: Original full-featured POC with FACTS/RenWeb integration
- **artios-connect-lite**: This stripped-down parent-focused version

## What Was Removed (vs main branch)

- Multi-role system (admin, teacher, parent, student views)
- FACTS/RenWeb API integration
- Mock student/grades/assignment data
- Complex dashboard layouts
- Staff directory section
- Community/parent resources section
- New to Artios onboarding checklist (replaced with separate Welcome page)

## Recent Changes

### Latest Session (January 12, 2026) - Major UI/UX Overhaul
Based on comprehensive parent feedback, implemented a complete redesign:

#### New Features
- **Notification System**: Admin can push messages to all parents
  - Dismissable alerts that persist via localStorage
  - Empty state when no notifications ("No new notifications")
  - Admin panel tab for managing notifications
- **Date-Aware Events**: Site filters past events automatically using TODAY constant
  - "TODAY" badge on current day events
- **Featured AI Chat**: Prominent chat section on landing page
  - Suggested question chips for quick access
  - "Ask Now" call-to-action button

#### Layout Changes
- **New Hero Section**: 4 quick action buttons (FACTS Portal, Order Lunch, School Calendar, Newsletter)
- **Consolidated Sections**:
  - "Resources" section: Documents, Newsletters, Podcast (Apple/Spotify)
  - "Get Involved" section: Volunteer, Events & Tickets, School Store
- **Simplified Navigation**: Home, Calendar, FAQ, Contact only
- **Simplified Contact Section**: Email and address only (no phone number)
- **Instagram Link**: Added to footer (https://www.instagram.com/artios_sugarhill/)

#### Data Corrections
- **Fixed Address**: 415 Brogdon Road, Suwanee, GA 30024
- **Fixed School Hours**:
  - Elementary (K-6): Mon/Wed, 9:00 AM - 2:45 PM
  - Junior High (7-8): Tue/Thu, 9:00 AM - 2:45 PM
  - High School (9-12): Tue/Thu, 9:00 AM - 2:45 PM
  - Doors open at 8:50 AM (10 minutes before first class)
- **Labeled Buttons**: Event download icons now show "Add to Cal" text

#### Technical Updates
- localStorage now refreshes schoolInfo from initialData (ensures address updates)
- Added Lucide icons: Megaphone, ShoppingBag, Mic, Ticket, CalendarCheck
- isToday() and isUpcoming() helper functions for date filtering
- ~600 lines of new CSS for all components

### Previous Session (January 2026)
- **Complete UI/UX Redesign**: Modern, cleaner design with better visual hierarchy
  - CSS variables design system for consistent theming
  - Refined color palette (softer green accent #7cb342)
  - Better typography with Inter font and improved spacing
  - Modern card designs with subtle shadows and hover animations
  - Smooth scroll and entrance animations
  - Accessibility support (prefers-reduced-motion)
- **Section Reorganization**: Events moved to top (most requested), AI chat moved to bottom
- **Simplified Hero**: Clean greeting style instead of landing page CTA
- **Compact "Need Help?" Section**: Replaced large AI section with subtle prompt
- **Full Calendar View**: Added embedded Google Calendar showing entire school year
- **Contact Section**: New section with directors' contact info and meeting links
- **Open House PDF**: Added to documents and linked from Welcome page
- **Enhanced Welcome Page**: Added tuition pricing, enrollment requirements, mission statement
- **Navigation Updates**: Added Calendar and Contact links, streamlined menu
- **AI Enhancement**: Updated system prompt with comprehensive program and pricing info

### Earlier Changes
- **Welcome Page**: Moved from onboarding steps on landing page to separate dedicated page
- **Renamed "Ask AI" → "Get Answers"**: More parent-friendly, less intimidating
- **Simplified Schedule**: Changed from detailed class listings to high-level hours by grade
- **Announcements on Landing**: Now prominently displayed on home page
- **Removed Scary Elements**: No staff directory or confusing community sections

### Technical Updates
- localStorage merge logic ensures latest quickLinks, faq, and schedules always load from code
- View routing system for multi-page navigation
- Clickable events with Google Calendar integration
- Full Artios Linktree data integrated (13 quick links)

## Key Data Sources

- **Google Calendar**: `https://calendar.google.com/calendar/ical/artiossugarhill%40gmail.com/public/basic.ics`
- **Linktree**: `https://linktr.ee/ARTIOSSH` (all links manually integrated)
- **Open House PDF**: `public/Updated Open House 25_26.pdf` (contains all program details, pricing, enrollment info)

## School Contact Information

- **John Lane**: jmlane@artiosacademies.com
- **Jackie Thompson**: jthompson@artiosacademies.com
- **Address**: 415 Brogdon Road, Suwanee, GA 30024

## Program Overview (from Open House PDF)

**Doors open at 8:50 AM** (10 minutes before first class)

### Elementary (K-6)
- **Schedule**: Monday/Wednesday, 9:00 AM - 2:45 PM
- **Pricing**: $2,390 (K-2nd), $2,590 (3rd-4th), $2,690 (5th-6th)

### Jr. High (7-8)
- **Schedule**: Tuesday/Thursday, 9:00 AM - 2:45 PM
- **Pricing**: $3,030 (7th), $3,230 (8th)

### High School (9-12)
- **Schedule**: Tuesday/Thursday, 9:00 AM - 2:45 PM
- **HS Arts Conservatory**: Fridays, 9:00 AM - 4:30 PM

### Mission
A Christian homeschool hybrid program providing academic excellence with a biblical worldview.

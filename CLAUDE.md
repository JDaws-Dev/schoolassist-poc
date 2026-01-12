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
- **Landing Page**: Hero section, announcements, upcoming events
- **Events Section**: Upcoming school events with "Add to Calendar" download buttons
- **Full Calendar View**: Embedded Google Calendar showing entire 2025-2026 school year
- **Quick Links**: Full Artios Linktree integration (13 links including Parent Portal, lunch ordering, newsletters, etc.)
- **Documents Section**: Open House brochure, school calendar, FACTS portal link
- **Get Answers**: AI chat assistant with complete school knowledge (renamed from "Ask AI" to be parent-friendly)
- **FAQ Section**: 8 common questions with answers
- **School Hours**: Simplified schedule showing hours by grade level with link to full spreadsheet
- **Welcome Page**: Complete guide for new families including:
  - Program overview and mission
  - Detailed schedule for all grade levels
  - Tuition pricing (K-8th)
  - Enrollment requirements
  - Getting started checklist
  - Contact information for both directors
- **Contact Section**: School phone, directors' emails, meeting scheduling links

#### Admin Backend
- Login via footer link (password: `artios2026`)
- Manage announcements
- Manage upcoming events
- Manage quick links
- Manage AI settings (system prompt, temperature)
- Manage documents
- Manage FAQ

#### Technical Improvements
- localStorage always uses latest quickLinks, faq, and schedules from initialData
- View-based routing using `currentView` state ('home' or 'welcome')
- Mobile-responsive design
- Events are clickable with "Add to Calendar" functionality
- AI assistant has comprehensive school knowledge including programs, pricing, and enrollment info

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

### Latest Session (January 2026)
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
- **Contact Section**: New section with school phone, directors' contact info and meeting links
- **Open House PDF**: Added to documents and linked from Welcome page
- **Enhanced Welcome Page**: Added tuition pricing, enrollment requirements, mission statement
- **Navigation Updates**: Added Calendar and Contact links, streamlined menu
- **AI Enhancement**: Updated system prompt with comprehensive program and pricing info

### Earlier Changes
- **Welcome Page**: Moved from onboarding steps on landing page to separate dedicated page
- **Renamed "Ask AI" → "Get Answers"**: More parent-friendly, less intimidating
- **Simplified Schedule**: Changed from detailed class listings to high-level hours by grade
- **Added Link to Full Schedule**: Parents can view complete spreadsheet if needed
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
- **Full Schedule**: `https://docs.google.com/spreadsheets/d/1Q_B04WaG9qUXTpLE02a6237nMJCq_y1LAQXf041uBEQ/edit?gid=2013129902#gid=2013129902`
- **Open House PDF**: `public/Updated Open House 25_26.pdf` (contains all program details, pricing, enrollment info)

## School Contact Information

- **Phone**: (470) 202-4042
- **John Lane**: jmlane@artiosacademies.com
- **Jackie Thompson**: jthompson@artiosacademies.com
- **Address**: 6220 W Price Rd, Sugar Hill, GA 30518

## Program Overview (from Open House PDF)

### Elementary (K-6th)
- **Schedule**: Monday/Wednesday, 9:00 AM - 2:45 PM
- **Pricing**: $2,390 (K-2nd), $2,590 (3rd-4th), $2,690 (5th-6th)

### Jr. High (7th-8th)
- **Schedule**: Tuesday/Thursday, 9:00 AM - 2:45 PM
- **Pricing**: $3,030 (7th), $3,230 (8th)

### High School (9th-12th)
- **Schedule**: Tuesday/Thursday, 9:00 AM - 2:45 PM
- **Dance Classes**: Fridays (various levels)

### Mission
A Christian homeschool hybrid program providing academic excellence with a biblical worldview.

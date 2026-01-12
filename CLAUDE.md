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

## Features

### Parent-Facing
- **Landing Page**: Welcome hero, quick links, upcoming events
- **Events Calendar**: Upcoming school events pulled from Google Calendar
- **Quick Links**: Parent Portal, lunch ordering, handbook, etc.
- **Documents Section**: Important school documents
- **AI Chat Assistant**: Ask questions about schedules, policies, events

### Admin Backend
- Login via footer link (password: `artios2026`)
- Manage announcements
- Manage upcoming events
- Manage quick links

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

## What's Included

- Parent-focused landing page
- Simple admin content management
- Live Google Calendar integration
- AI chat with school knowledge
- Quick links (linktree-style)
- Announcements system
- Mobile-responsive design

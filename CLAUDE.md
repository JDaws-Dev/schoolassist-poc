# Artios Connect

A parent information hub and AI-powered assistant for Artios Academies of Sugar Hill.

## Stack

React 19, Vite 7, TailwindCSS, Lucide React, Express.js, OpenAI GPT-4o-mini, Convex

## Commands

```bash
npm run dev          # Dev server (http://localhost:5173)
npm run build        # Production build
npm run test         # Run tests
npm run lint         # ESLint
npx convex dev       # Convex dev server (run separately)
```

## Quality Gates

- TypeScript strict mode
- ESLint must pass
- Build must succeed
- Convex typecheck: `npx convex typecheck`

## Key Design Decisions

- **No grade filtering** - Content is for all parents regardless of child's grade
- **Simple password auth** - Parent: `artios2026`, Admin: `artiosadmin2026`
- **AI-first** - Chat assistant is the primary way to find information
- **Mobile-first** - Primary users are parents on phones

## Preserved Files (Don't Modify)

- `convex/` - Database schema and functions
- `server.js` - Express chat API
- `api/chat.js` - Vercel serverless function
- `src/data/initialData.js` - Static school data

## Philosophy

This codebase will outlive you. Fight entropy. Leave it better than you found it.

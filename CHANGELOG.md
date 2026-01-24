# Artios Connect Changelog

## January 13, 2026 - Major UX Overhaul

### Big 4 Quick Actions
- Reorganized from 3-column layout to 2x2 grid
- Actions: FACTS, Lunch, Calendar, Podcast
- Lunch shows real-time deadline status (urgent when <60min left)
- Podcast links to both Apple Podcasts and Spotify

### Today Banner Redesign
- Shows day name and full date prominently
- Day type badge: "Academic Day" (blue) or "Arts Day" (purple)
- Displays which grade levels have class (e.g., "High School 9-12")
- Color-coded for quick visual recognition

### Events Section
- Changed "Next 72 Hours" to "Next 7 Days"
- Better weekly overview for parent planning

### Podcast Page
- New dedicated page for podcast platform choice
- Apple Podcasts and Spotify options with branded buttons
- Tagline: "Equipping Parents. Enriching Learning. Strengthening the Family."
- Dark themed design matching podcast branding

### Mobile Navigation Enhancement
- "Ask" button now uses prominent gradient styling
- Stands out as primary AI chat entry point
- Box shadow and hover effects for better UX

### Resource Dock ("Essentials Library")
**Major UX Pattern Change:** Replaced navigation to separate Resources page with slide-up bottom sheets. Users stay on the dashboard - content slides up over it (like Maps/Instagram).

Resources available via slide-up panels:
- **Dates** - Calendar info and key dates
- **Uniforms** - Dress code requirements with store link
- **Handbook** - Popular sections with full handbook link
- **FAQs** - Accordion-style Q&A
- **Schedule** - Class times for all grade levels
- **Forms** - FACTS portal and document links
- **Podcast** - Apple and Spotify platform links
- **New Here?** - Navigates to Welcome Guide
- **Ask AI** - Opens chat assistant

### Technical Details
- Created `SlideUpPanel.jsx` - Reusable bottom sheet component
- Created `ResourceDock.jsx` - Essentials library with 8 resource types
- Created `PodcastPage.jsx` - Platform choice page
- Added ~300 lines of CSS for slide-up panels and resource dock
- Bundle size: 175KB CSS, 295KB JS

### Files Modified
- `src/components/HomePage.jsx` - Today banner, Resource Dock integration
- `src/components/QuickActions.jsx` - Big 4 grid, podcast action
- `src/components/TabNavigation.jsx` - Enhanced Ask button styling
- `src/App.jsx` - Podcast page routing
- `src/index.css` - Slide-up panel styles, resource dock styles
- `src/components/index.js` - New component exports

### Files Created
- `src/components/SlideUpPanel.jsx`
- `src/components/ResourceDock.jsx`
- `src/components/PodcastPage.jsx`

---

## Previous Updates

### Chat & Search Enhancements
- Added quick suggestion chips to ChatWidget
- Omnibox AI search as hero element
- Keyboard shortcuts (/ to open chat, Esc to close)

### FAQ Improvements
- Added real-time search filtering
- Highlight matching text in results
- "No results" state with clear button

### Contact & Copy Features
- Quick-copy buttons for phone and email
- Visual feedback on copy (checkmark icon)

### Notifications
- Urgent announcement pulse animations
- Priority-sorted notification list
- Dismissible non-urgent notifications

### Admin Dashboard
- Separate admin page at `/admin`
- Knowledge Base management
- Notification management
- AI settings configuration

### Passwords
- Parent portal: `artios2026`
- Admin dashboard: `artiosadmin2026`

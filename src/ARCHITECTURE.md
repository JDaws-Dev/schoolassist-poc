# Artios Connect - Architecture

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── index.js         # Component exports
│   ├── ChatWidget.jsx   # AI chat interface
│   ├── ErrorBoundary.jsx # Error handling wrapper
│   ├── FAQSection.jsx   # FAQ accordion
│   ├── NotificationBar.jsx # Notification banners
│   ├── OnboardingBanner.jsx # New family checklist
│   ├── StaffDirectory.jsx # Staff listing
│   ├── CommunitySection.jsx # Community links
│   ├── ScheduleSection.jsx # School hours
│   ├── IconComponent.jsx # Dynamic icon renderer
│   └── LoadingStates.jsx # Spinners, skeletons, loaders
│
├── data/
│   └── initialData.js   # Static configuration data
│
├── utils/
│   ├── dateHelpers.js   # Date formatting utilities
│   └── icsGenerator.js  # Calendar file generation
│
├── hooks/               # Custom React hooks (future)
│
├── App.jsx             # Main application component
├── main.jsx            # Entry point with ErrorBoundary
├── tailwind.css        # Tailwind CSS theme
└── index.css           # Custom app styles
```

## Key Design Decisions

### Component Organization
- Each component is self-contained with its own imports
- Components are exported via `index.js` for clean imports
- CSS classes reference custom CSS variables for theming

### Data Management
- Static data is centralized in `data/initialData.js`
- localStorage is used for user preferences and state persistence
- sessionStorage is used for session-specific data (chat history)

### Styling
- Tailwind CSS v4 with custom theme variables
- Existing CSS preserved in `index.css`
- CSS variables used for consistent theming

### Error Handling
- ErrorBoundary wraps the entire app
- Graceful fallback UI for component errors
- Development mode shows error details

## Importing Components

```javascript
// Import multiple components
import { ChatWidget, FAQSection, ErrorBoundary } from './components';

// Import specific component
import ChatWidget from './components/ChatWidget';
```

## Environment Variables

- `VITE_DEV` - Development mode detection
- API URL automatically switches between dev/prod

## Build

```bash
npm run dev    # Start development server
npm run build  # Production build
npm run preview # Preview production build
```

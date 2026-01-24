// Component exports - Chatbot-first architecture
// Usage: import { ChatWidget, AdminPanel } from './components';

// Core
export { default as ChatWidget } from './ChatWidget';
export { default as ErrorBoundary } from './ErrorBoundary';

// Pages
export { default as HomePage } from './HomePage';
export { default as HomeTab } from './HomeTab';
export { default as ChatTab } from './ChatTab';
export { default as CalendarTab } from './CalendarTab';
export { default as AdminPanel } from './AdminPanel';

// Admin components (used by AdminPanel)
export { default as FAQSection } from './FAQSection';
export { default as AISettingsPanel } from './AISettingsPanel';
export { default as EventCard, EVENT_CATEGORIES, detectCategory } from './EventCard';
export { default as NotificationBar } from './NotificationBar';
export { default as GradeLevelSelector, GRADE_LEVELS, DIVISIONS } from './GradeLevelSelector';

// Loading States
export {
  Spinner,
  Skeleton,
  CardSkeleton,
  ChatSkeleton,
  PageLoader,
  InlineLoader,
} from './LoadingStates';

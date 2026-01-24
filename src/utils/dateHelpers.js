// Date utility functions for Artios Connect

// Get today's date at midnight for comparisons
export const getToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

// Format date for display
export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
};

// Format date with year
export const formatDateFull = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Check if date is upcoming (today or future)
export const isUpcoming = (dateStr) => {
  const eventDate = new Date(dateStr);
  eventDate.setHours(0, 0, 0, 0);
  return eventDate >= getToday();
};

// Check if date is today
export const isToday = (dateStr) => {
  const eventDate = new Date(dateStr);
  eventDate.setHours(0, 0, 0, 0);
  return eventDate.getTime() === getToday().getTime();
};

// Check if date is tomorrow
export const isTomorrow = (dateStr) => {
  const eventDate = new Date(dateStr);
  eventDate.setHours(0, 0, 0, 0);
  const tomorrow = new Date(getToday());
  tomorrow.setDate(tomorrow.getDate() + 1);
  return eventDate.getTime() === tomorrow.getTime();
};

// Get days until a date
export const getDaysUntil = (dateStr) => {
  const eventDate = new Date(dateStr);
  eventDate.setHours(0, 0, 0, 0);
  const diffTime = eventDate.getTime() - getToday().getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Get relative date label (Today, Tomorrow, X days)
export const getRelativeDateLabel = (dateStr) => {
  if (isToday(dateStr)) return 'Today';
  if (isTomorrow(dateStr)) return 'Tomorrow';

  const days = getDaysUntil(dateStr);
  if (days < 0) return 'Past';
  if (days <= 7) return `In ${days} days`;
  return formatDate(dateStr);
};

// Format time from 24h to 12h format
export const formatTime = (time24) => {
  if (!time24) return '';
  const [hours, minutes] = time24.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
};

export default {
  getToday,
  formatDate,
  formatDateFull,
  isUpcoming,
  isToday,
  isTomorrow,
  getDaysUntil,
  getRelativeDateLabel,
  formatTime,
};

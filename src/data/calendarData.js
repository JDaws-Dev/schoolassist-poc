// Artios Academies Google Calendar Data
// Parsed from: https://calendar.google.com/calendar/embed?src=c_f1e327887d2f9739ac02c84e80fe02dceec209d06b4755d72eb5358c6ce9016b%40group.calendar.google.com

// Key events extracted from the live Artios SH 2024-2026 calendar
export const calendarEvents = [
  // 2024-2025 School Year
  { date: '2024-08-06', endDate: '2024-08-08', title: 'Staff Training', type: 'staff' },
  { date: '2024-08-08', title: 'K4-2nd Parent Meeting', type: 'meeting' },
  { date: '2024-08-13', title: 'JH Parent Meeting', type: 'meeting' },
  { date: '2024-08-14', title: 'HS Parent Orientation', type: 'meeting' },
  { date: '2024-08-15', title: 'JH Kickoff', type: 'event' },
  { date: '2024-08-16', title: 'HS Kickoff', type: 'event' },
  { date: '2024-10-14', endDate: '2024-10-19', title: 'Fall Break', type: 'break' },
  { date: '2024-11-07', title: 'Elem & JH Arts', type: 'class' },
  { date: '2024-11-11', endDate: '2024-11-17', title: 'HS Show 2', type: 'performance' },
  { date: '2024-11-12', title: 'HS Academics', type: 'class' },
  { date: '2024-12-05', title: 'Winter Concert', type: 'performance' },
  { date: '2024-12-19', endDate: '2025-01-03', title: 'Christmas Break', type: 'break' },

  // Spring 2025
  { date: '2025-02-06', endDate: '2025-02-09', title: 'HS Show 2 Performances', type: 'performance' },
  { date: '2025-02-13', title: 'Elem & JH Arts', type: 'class' },
  { date: '2025-03-06', title: 'Elem & JH Arts', type: 'class' },
  { date: '2025-04-07', endDate: '2025-04-12', title: 'Spring Break', type: 'break' },
  { date: '2025-05-05', title: 'Elem & JH Academics', type: 'class' },
  { date: '2025-05-18', title: 'Graduation', type: 'event' },

  // 2025-2026 School Year
  { date: '2025-08-18', title: 'First Day Of Dance Classes', type: 'class' },
  { date: '2025-12-16', title: 'HS Midterms', type: 'academic' },
  { date: '2025-12-18', endDate: '2026-01-04', title: 'Christmas Break', type: 'break' },
  { date: '2026-01-06', title: 'HS Academics', type: 'class' },
  { date: '2026-01-12', title: 'Artios Open House', type: 'event' },
  { date: '2026-01-13', title: 'HS Academics', type: 'class' },
  { date: '2026-02-06', endDate: '2026-02-08', title: 'HS One Acts Production', type: 'performance' },
  { date: '2026-02-23', title: 'Artios Open House', type: 'event' },
  { date: '2026-05-17', title: 'Graduation', type: 'event' },
];

// Recurring class schedules
export const recurringClasses = [
  { day: 'Wednesday', title: 'Dance', startDate: '2024-10-23', endDate: '2024-11-20' },
  { day: 'Thursday', title: 'Elem Arts Classes', startDate: '2025-08-28', endDate: '2025-12-04', exceptions: ['2025-10-16', '2025-11-27'] },
];

// Helper functions
export function getUpcomingEvents(daysAhead = 30) {
  const today = new Date();
  const futureDate = new Date(today.getTime() + daysAhead * 24 * 60 * 60 * 1000);

  return calendarEvents.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= today && eventDate <= futureDate;
  }).sort((a, b) => new Date(a.date) - new Date(b.date));
}

export function getEventsByType(type) {
  return calendarEvents.filter(event => event.type === type);
}

export function getBreaks() {
  return calendarEvents.filter(event => event.type === 'break');
}

export function getPerformances() {
  return calendarEvents.filter(event => event.type === 'performance');
}

export function searchCalendar(query) {
  const lowerQuery = query.toLowerCase();
  return calendarEvents.filter(event =>
    event.title.toLowerCase().includes(lowerQuery)
  );
}

export function formatEventDate(event) {
  const start = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  });
  if (event.endDate) {
    const end = new Date(event.endDate).toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
    });
    return `${start} - ${end}`;
  }
  return start;
}

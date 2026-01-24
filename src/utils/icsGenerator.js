// ICS Calendar file generator for downloadable events

/**
 * Generate an ICS file download URL for a calendar event
 * @param {Object} event - Event object with title, date, time, location
 * @returns {string} - Blob URL for ICS file download
 */
export const generateICSFile = (event) => {
  const startDate = new Date(event.date);

  // Parse time if provided
  if (event.time && event.time !== 'All Day') {
    const [time, period] = event.time.split(' ');
    const [hours, minutes] = time.split(':');
    let hour = parseInt(hours);
    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;
    startDate.setHours(hour, parseInt(minutes) || 0, 0);
  }

  // End date is 2 hours after start by default
  const endDate = new Date(startDate);
  endDate.setHours(endDate.getHours() + 2);

  // Format date for ICS format (YYYYMMDDTHHMMSSZ)
  const formatICSDate = (date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  // Generate ICS content
  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Artios Connect//EN
BEGIN:VEVENT
DTSTART:${formatICSDate(startDate)}
DTEND:${formatICSDate(endDate)}
SUMMARY:${event.title}
LOCATION:${event.location || 'Artios Academies'}
DESCRIPTION:Artios Academies Event
END:VEVENT
END:VCALENDAR`;

  // Create blob and return URL
  const blob = new Blob([icsContent], { type: 'text/calendar' });
  return URL.createObjectURL(blob);
};

/**
 * Generate ICS content string (without creating blob)
 * @param {Object} event - Event object
 * @returns {string} - ICS content string
 */
export const generateICSContent = (event) => {
  const startDate = new Date(event.date);

  if (event.time && event.time !== 'All Day') {
    const [time, period] = event.time.split(' ');
    const [hours, minutes] = time.split(':');
    let hour = parseInt(hours);
    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;
    startDate.setHours(hour, parseInt(minutes) || 0, 0);
  }

  const endDate = new Date(startDate);
  endDate.setHours(endDate.getHours() + 2);

  const formatICSDate = (date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Artios Connect//EN
BEGIN:VEVENT
DTSTART:${formatICSDate(startDate)}
DTEND:${formatICSDate(endDate)}
SUMMARY:${event.title}
LOCATION:${event.location || 'Artios Academies'}
DESCRIPTION:Artios Academies Event
END:VEVENT
END:VCALENDAR`;
};

/**
 * Trigger download of ICS file
 * @param {Object} event - Event object
 */
export const downloadICSFile = (event) => {
  const url = generateICSFile(event);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${event.title.replace(/[^a-z0-9]/gi, '-')}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export default {
  generateICSFile,
  generateICSContent,
  downloadICSFile,
};

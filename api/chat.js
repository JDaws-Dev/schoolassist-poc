import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Google Calendar ICS URL (public calendar)
const CALENDAR_URL = 'https://calendar.google.com/calendar/ical/c_f1e327887d2f9739ac02c84e80fe02dceec209d06b4755d72eb5358c6ce9016b%40group.calendar.google.com/public/basic.ics';

// Cache for calendar data
let calendarCache = { events: [], lastFetch: 0 };
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function parseICSDate(dateStr) {
  if (!dateStr) return null;
  dateStr = dateStr.replace('VALUE=DATE:', '');
  if (dateStr.length === 8) {
    return new Date(dateStr.slice(0, 4), parseInt(dateStr.slice(4, 6)) - 1, dateStr.slice(6, 8));
  } else if (dateStr.includes('T')) {
    const d = dateStr.replace(/[TZ]/g, '');
    return new Date(Date.UTC(
      d.slice(0, 4), parseInt(d.slice(4, 6)) - 1, d.slice(6, 8),
      d.slice(8, 10) || 0, d.slice(10, 12) || 0, d.slice(12, 14) || 0
    ));
  }
  return new Date(dateStr);
}

async function fetchCalendarEvents() {
  const now = Date.now();
  if (calendarCache.events.length > 0 && (now - calendarCache.lastFetch) < CACHE_TTL) {
    return calendarCache.events;
  }

  try {
    const response = await fetch(CALENDAR_URL);
    const icsText = await response.text();
    const events = [];
    const eventBlocks = icsText.split('BEGIN:VEVENT');

    for (let i = 1; i < eventBlocks.length; i++) {
      const block = eventBlocks[i].split('END:VEVENT')[0];
      const lines = block.split('\n');
      const event = {};

      for (const line of lines) {
        if (line.startsWith('DTSTART')) {
          event.startDate = parseICSDate(line.split(':').slice(1).join(':').trim());
        } else if (line.startsWith('DTEND')) {
          event.endDate = parseICSDate(line.split(':').slice(1).join(':').trim());
        } else if (line.startsWith('SUMMARY:')) {
          event.title = line.replace('SUMMARY:', '').trim();
        }
      }

      if (event.title && event.startDate) events.push(event);
    }

    events.sort((a, b) => a.startDate - b.startDate);
    calendarCache = { events, lastFetch: now };
    return events;
  } catch (error) {
    console.error('Failed to fetch calendar:', error);
    return calendarCache.events;
  }
}

function formatCalendarForAI(events) {
  const now = new Date();
  const upcoming = events.filter(e => e.startDate >= now).slice(0, 50);
  const format = (e) => {
    const start = e.startDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    return `- ${start}: ${e.title}`;
  };
  return `UPCOMING EVENTS:\n${upcoming.map(format).join('\n')}`;
}

// School information data
const schoolData = {
  schoolInfo: {
    name: "Artios Academies of Sugar Hill",
    location: "Sugar Hill, Georgia",
    type: "Homeschool Hybrid / University-Model",
    tagline: "Art. Heart. Smart.",
    director: "John Lane",
    email: "jmlane@artiosacademies.com"
  },
  divisions: [
    { name: "Lower Elementary", grades: "1-3", program: "Smart Start" },
    { name: "Upper Elementary", grades: "4-6", program: "Academy of Arts & History + Preparatory" },
    { name: "Junior High", grades: "7-8", program: "Academy of Arts & History + Preparatory" },
    { name: "High School", grades: "9-12", program: "Conservatory" }
  ],
  schedule: {
    note: "Artios is a university-model/hybrid program. Students attend classes on campus certain days and complete work at home other days.",
    elementary: { arrival: "8:30 AM", dismissal: "2:30 PM" },
    secondary: { arrival: "8:30 AM", dismissal: "3:00 PM" }
  },
  faqs: [
    { q: "What is the dress code?", a: "Modest, neat attire appropriate for a Christian academic environment. Performance classes may have specific attire requirements (concert black for choir, dance attire for dance, etc.)." },
    { q: "Do parents have to teach classes?", a: "No. Artios does not require parents to teach any classes." },
    { q: "Do parents have to stay on campus?", a: "No. Although we have an open door policy for parents, you are not required to stay on campus during your child's classes." },
    { q: "How do I order lunch?", a: "Order through ArtiosCafe.com by 10 AM on class days." },
    { q: "What is the weather policy?", a: "If Gwinnett/Forsyth County schools close, Artios closes." },
    { q: "What time do classes start?", a: "Elementary: 8:30 AM - 2:30 PM. Secondary: 8:30 AM - 3:00 PM." },
    { q: "Is Artios accredited?", a: "Artios operates as a homeschool support program. Parents maintain homeschool status and are responsible for their student's transcript and records." }
  ],
  quickLinks: {
    parentPortal: "https://logins2.renweb.com/logins/ParentsWeb-Login.aspx",
    lunchOrdering: "https://artioscafe.com",
    schoolWebsite: "https://artiosacademies.com/sugarhill/",
    calendar: "https://calendar.google.com/calendar/embed?src=c_f1e327887d2f9739ac02c84e80fe02dceec209d06b4755d72eb5358c6ce9016b%40group.calendar.google.com"
  }
};

async function buildSystemPrompt() {
  const calendarEvents = await fetchCalendarEvents();
  const calendarData = formatCalendarForAI(calendarEvents);

  return `You are ArtiosConnect, the friendly AI assistant for Artios Academies of Sugar Hill, Georgia.

TODAY'S DATE: ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}

SCHOOL INFORMATION:
${JSON.stringify(schoolData.schoolInfo, null, 2)}

DIVISIONS:
${JSON.stringify(schoolData.divisions, null, 2)}

SCHEDULE:
${JSON.stringify(schoolData.schedule, null, 2)}

FREQUENTLY ASKED QUESTIONS:
${schoolData.faqs.map(f => `Q: ${f.q}\nA: ${f.a}`).join('\n\n')}

QUICK LINKS:
- Parent Portal (FACTS): ${schoolData.quickLinks.parentPortal}
- Order Lunch: ${schoolData.quickLinks.lunchOrdering}
- School Website: ${schoolData.quickLinks.schoolWebsite}
- School Calendar: ${schoolData.quickLinks.calendar}

LIVE SCHOOL CALENDAR:
${calendarData}

INSTRUCTIONS:
1. Answer questions about school schedules, events, policies, and general information
2. Use the calendar data to answer questions about upcoming events and dates
3. Be concise and friendly. No markdown formatting (no **, ##, etc). Plain text only.
4. If asked about specific student grades, assignments, or confidential information, direct them to the Parent Portal
5. For sensitive topics (behavioral concerns, family situations, faith questions), recommend contacting Mr. Lane directly

SENSITIVE TOPICS:
For sensitive, personal, or complex topics such as:
- Gender identity, LGBTQ+ questions, or transgender students
- Bullying, harassment, or conflict between students
- Mental health concerns, anxiety, or emotional wellbeing
- Family situations (divorce, custody, etc.)
- Religious or faith-related concerns
- Discipline issues or behavioral concerns
- Any topic requiring personal judgment or pastoral care

Always recommend contacting Mr. Lane (Administrator) directly for a personal conversation. He is available to discuss these matters confidentially and provide appropriate guidance.`;
}

// In-memory conversation history
const conversationHistory = new Map();

export default async function handler(req, res) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, sessionId } = req.body;

    if (!message || !sessionId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const historyKey = sessionId;
    if (!conversationHistory.has(historyKey)) {
      conversationHistory.set(historyKey, []);
    }
    const history = conversationHistory.get(historyKey);
    history.push({ role: 'user', content: message });

    const recentHistory = history.slice(-10);
    const systemPrompt = await buildSystemPrompt();

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...recentHistory
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const assistantMessage = completion.choices[0].message.content;
    history.push({ role: 'assistant', content: assistantMessage });
    conversationHistory.set(historyKey, history);

    res.json({ message: assistantMessage });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
}

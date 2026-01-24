import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Google Calendar ICS URL
const CALENDAR_URL = 'https://calendar.google.com/calendar/ical/c_f1e327887d2f9739ac02c84e80fe02dceec209d06b4755d72eb5358c6ce9016b%40group.calendar.google.com/public/basic.ics';

// Cache for calendar data
let calendarCache = { events: [], lastFetch: 0 };
const CACHE_TTL = 5 * 60 * 1000;

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

// Load knowledge base from file
function loadKnowledgeBase() {
  try {
    const knowledgeBasePath = path.join(__dirname, 'src/data/KNOWLEDGE_BASE.md');
    return fs.readFileSync(knowledgeBasePath, 'utf-8');
  } catch (error) {
    console.error('Failed to load knowledge base:', error);
    return `# Artios Academies of Sugar Hill
Address: 415 Brogdon Road, Suwanee, GA 30024
Director: John Lane (jmlane@artiosacademies.com)
For detailed information, please contact the office at office@artiosacademies.com`;
  }
}

async function buildSystemPrompt() {
  const calendarEvents = await fetchCalendarEvents();
  const calendarData = formatCalendarForAI(calendarEvents);
  const knowledgeBase = loadKnowledgeBase();

  return `You are ArtiosConnect, the friendly AI assistant for Artios Academies of Sugar Hill, Georgia.

TODAY'S DATE: ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}

CRITICAL RULES - YOU MUST FOLLOW THESE WITHOUT EXCEPTION:
1. ONLY provide information that is EXPLICITLY stated in the knowledge base below or the calendar data
2. NEVER make up, invent, guess, or assume ANY information not explicitly provided
3. If information is not in the knowledge base, say: "I don't have that specific information. Please contact the office at office@artiosacademies.com or check the Student Handbook."
4. DO NOT use your general training knowledge - ONLY use the knowledge base and calendar below
5. DO NOT fabricate staff names, phone numbers, email addresses, dates, times, policies, or any other details
6. If asked about something outside your knowledge, DO NOT GUESS - direct them to the appropriate contact
7. Be concise and friendly. No markdown formatting (no **, ##, etc). Plain text only.
8. Accuracy is MORE important than appearing helpful - it's better to say you don't know than to give wrong information

KNOWLEDGE BASE (OFFICIAL STUDENT/PARENT HANDBOOK 2025-2026):

${knowledgeBase}

LIVE SCHOOL CALENDAR:
${calendarData}

INSTRUCTIONS:
1. Answer questions ONLY using the information provided in the knowledge base and calendar above - NO EXCEPTIONS
2. Use the calendar data to answer questions about upcoming events and dates
3. If asked about specific student grades, assignments, or confidential information, direct them to the FACTS Parent Portal
4. For sensitive topics (gender identity, bullying, mental health, family situations, faith questions, discipline), recommend contacting Director John Lane directly for a personal conversation
5. If you're unsure or the information isn't provided in the knowledge base, ALWAYS say "I don't have that information. Please contact the office or check the Student Handbook." NEVER guess or make up an answer.
6. Always be helpful, kind, and refer parents to the appropriate contact if you can't answer
7. Before answering, verify the information exists in the knowledge base above. If it's not there, don't answer - redirect to the office

IMPORTANT CONTACTS:
- Director: John Lane (jmlane@artiosacademies.com)
- Assistant Director: Jackie Thompson (jthompson@artiosacademies.com)
- Office: office@artiosacademies.com`;
}

// Conversation history
const conversationHistory = new Map();

// Chat endpoint
app.post('/api/chat', async (req, res) => {
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
      temperature: 0.2,  // Low temperature to reduce hallucination
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
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`
  ==========================================
  Artios Connect API Server
  ==========================================

  Server running at: http://localhost:${PORT}

  Endpoints:
  - POST /api/chat - Chat with AI assistant
  - GET  /api/health - Health check

  To run the frontend:
  npm run dev

  ==========================================
  `);
});

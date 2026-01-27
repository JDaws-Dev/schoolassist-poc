/**
 * Vercel Serverless Function for Chat API
 * Handles POST /api/chat requests in production
 */

import OpenAI from "openai";

// Knowledge base content (inline for serverless - no file system access)
const SCHOOL_INFO = {
  name: "Artios Academies of Sugar Hill",
  address: "415 Brogdon Road, Suwanee, GA 30024",
  description:
    "A University-Model school where students attend campus 2 days per week and learn at home 3 days per week with parent oversight.",
};

const SCHEDULE = {
  weekly: {
    monday: "Elementary (K-6) on campus",
    tuesday: "Jr High & High School (7-12) on campus",
    wednesday: "Elementary (K-6) on campus",
    thursday: "Jr High & High School (7-12) on campus",
    friday: "Home learning for all grades",
  },
  timing: {
    doorsOpen: "8:50 AM",
    schoolStarts: "9:00 AM",
    dismissal: "Check FACTS for grade-specific times",
  },
};

const FAQ = [
  {
    q: "What time does school start?",
    a: "School starts at 9:00 AM. Doors open at 8:50 AM.",
  },
  {
    q: "What is a University-Model school?",
    a: "Students attend campus 2 days/week and learn at home 3 days/week. Elementary (K-6) attends Monday/Wednesday, Jr High and High School (7-12) attend Tuesday/Thursday.",
  },
  {
    q: "What is the dress code?",
    a: "Solid navy, black, white, or gray tops. Khaki or navy bottoms. No jeans, athletic wear, or large logos. Closed-toe shoes required.",
  },
  {
    q: "How do I order lunch?",
    a: "Through Artios Cafe. Order by the deadline (usually 11:59 PM the day before). Students may bring lunch from home.",
  },
  {
    q: "Weather closures?",
    a: "Generally follows Gwinnett County Schools. Check email and school communications for official announcements.",
  },
  {
    q: "Cell phone policy?",
    a: "Phones must be off and away during school hours. No phone use on campus except emergencies with staff permission.",
  },
  {
    q: "How to report an absence?",
    a: "Email the office and complete the absence form in FACTS. Notify as early as possible.",
  },
  {
    q: "When to keep child home?",
    a: "Fever (24hr fever-free without meds), vomiting in past 24hrs, contagious illness, or too ill to participate.",
  },
];

const CONTACTS = {
  office: "office@artiossugarhill.org",
  director: "John Lane - john@artiossugarhill.org",
};

/**
 * Build knowledge base content string
 */
function buildKnowledgeBase() {
  return `## About ${SCHOOL_INFO.name}
${SCHOOL_INFO.description}
Address: ${SCHOOL_INFO.address}

## Weekly Schedule
- Monday: ${SCHEDULE.weekly.monday}
- Tuesday: ${SCHEDULE.weekly.tuesday}
- Wednesday: ${SCHEDULE.weekly.wednesday}
- Thursday: ${SCHEDULE.weekly.thursday}
- Friday: ${SCHEDULE.weekly.friday}

## Daily Timing
- Doors open: ${SCHEDULE.timing.doorsOpen}
- School starts: ${SCHEDULE.timing.schoolStarts}
- Dismissal: ${SCHEDULE.timing.dismissal}

## Frequently Asked Questions
${FAQ.map((item) => `Q: ${item.q}\nA: ${item.a}`).join("\n\n")}

## Contacts
- Office: ${CONTACTS.office}
- Director: ${CONTACTS.director}`;
}

/**
 * AI Safety Rules
 */
const SAFETY_RULES = `
CRITICAL SAFETY RULES - YOU MUST FOLLOW THESE:

1. ONLY provide information that exists in the knowledge base below or calendar events provided.
2. NEVER make up, invent, guess, or assume any information.
3. If you don't have the specific information requested, respond with:
   "I don't have that specific information. Please contact the school office at office@artiossugarhill.org or check the FACTS portal for details."
4. For sensitive topics (disciplinary issues, financial matters, student records, medical concerns), redirect to:
   "For this type of question, please contact Director John Lane directly at john@artiossugarhill.org."
5. Be helpful, friendly, and concise in your responses.
6. When discussing schedules or events, always clarify which division (Elementary K-6 or Jr High/High School 7-12) it applies to.
7. Do not provide legal, medical, or financial advice.
8. If asked about something outside your knowledge base, acknowledge the limitation honestly.
`;

/**
 * Build system prompt with optional calendar events
 */
function buildSystemPrompt(calendarEvents = []) {
  const knowledgeBase = buildKnowledgeBase();

  let calendarSection = "";
  if (calendarEvents && calendarEvents.length > 0) {
    calendarSection = `\n\n## Upcoming Calendar Events\n${calendarEvents
      .map(
        (e) =>
          `- ${e.title} on ${e.date}${e.time ? ` at ${e.time}` : ""}${e.location ? ` (${e.location})` : ""}`
      )
      .join("\n")}`;
  }

  return `You are Ollie, the friendly AI assistant for Artios Academies of Sugar Hill, a Christian homeschool hybrid school in Suwanee, Georgia. You help parents find information about the school.

${SAFETY_RULES}

## KNOWLEDGE BASE
${knowledgeBase}${calendarSection}

Remember: Only answer based on the information above. If something isn't covered, direct parents to contact the school office.`;
}

/**
 * Vercel serverless handler
 */
export default async function handler(req, res) {
  // Handle CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message, history = [], sessionId, calendarEvents = [] } = req.body;

    // Validate request
    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Message is required and must be a string",
      });
    }

    // Check for API key
    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY not configured");
      return res.status(500).json({
        error: "Server configuration error",
      });
    }

    // Log for analytics
    if (sessionId) {
      console.log(`[Chat] Session: ${sessionId}`);
    }

    // Initialize OpenAI
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Build messages
    const systemPrompt = buildSystemPrompt(calendarEvents);
    const messages = [
      { role: "system", content: systemPrompt },
      ...history.slice(-20).map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: "user", content: message },
    ];

    // Call OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.2,
      max_tokens: 1000,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    });

    const aiResponse = completion.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error("No response from AI");
    }

    return res.status(200).json({ response: aiResponse });
  } catch (error) {
    console.error("[Chat Error]", error);

    if (error.code === "insufficient_quota") {
      return res.status(503).json({
        error: "Service temporarily unavailable",
      });
    }

    if (error.code === "rate_limit_exceeded") {
      return res.status(429).json({
        error: "Too many requests. Please wait and try again.",
      });
    }

    return res.status(500).json({
      error: "Unable to process request. Please try again or contact the school office.",
    });
  }
}

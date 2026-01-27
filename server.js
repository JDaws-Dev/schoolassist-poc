/**
 * Express.js Chat API Server
 * Local development server for the AI chat assistant
 *
 * Run with: node server.js
 * Or use: npm run server (after adding script to package.json)
 */

import express from "express";
import cors from "cors";
import OpenAI from "openai";
import { buildKnowledgeBaseContent } from "./src/data/initialData.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * AI Safety Rules - Core system prompt
 * These rules ensure the AI only provides accurate, verified information.
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
 * Build the complete system prompt with knowledge base content
 */
function buildSystemPrompt(calendarEvents = []) {
  const knowledgeBase = buildKnowledgeBaseContent();

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
 * POST /api/chat
 * Main chat endpoint for AI conversations
 *
 * Request body:
 * - message: string (required) - The user's message
 * - history: Message[] (optional) - Previous conversation messages
 * - sessionId: string (optional) - Session ID for analytics tracking
 * - calendarEvents: Event[] (optional) - Upcoming calendar events for context
 *
 * Response:
 * - response: string - The AI's response
 */
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history = [], sessionId, calendarEvents = [] } = req.body;

    // Validate request
    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Message is required and must be a string",
      });
    }

    // Check for OpenAI API key
    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY environment variable is not set");
      return res.status(500).json({
        error: "Server configuration error. Please contact the administrator.",
      });
    }

    // Log session for analytics (in production, this would go to a database)
    if (sessionId) {
      console.log(`[Chat] Session: ${sessionId}, Message length: ${message.length}`);
    }

    // Build conversation messages
    const systemPrompt = buildSystemPrompt(calendarEvents);
    const messages = [
      { role: "system", content: systemPrompt },
      // Include conversation history (limited to last 10 exchanges for context window)
      ...history.slice(-20).map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: "user", content: message },
    ];

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.2, // Low temperature to reduce hallucination
      max_tokens: 1000,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    });

    const aiResponse = completion.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error("No response received from AI model");
    }

    res.json({ response: aiResponse });
  } catch (error) {
    console.error("[Chat Error]", error);

    // Handle specific OpenAI errors
    if (error.code === "insufficient_quota") {
      return res.status(503).json({
        error: "Service temporarily unavailable. Please try again later.",
      });
    }

    if (error.code === "rate_limit_exceeded") {
      return res.status(429).json({
        error: "Too many requests. Please wait a moment and try again.",
      });
    }

    // Generic error response
    res.status(500).json({
      error: "I'm having trouble responding right now. Please try again or contact the school office directly.",
    });
  }
});

/**
 * Health check endpoint
 */
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    hasApiKey: !!process.env.OPENAI_API_KEY,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Chat API server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);

  if (!process.env.OPENAI_API_KEY) {
    console.warn("\nWARNING: OPENAI_API_KEY environment variable is not set!");
    console.warn("Set it with: export OPENAI_API_KEY=your-api-key\n");
  }
});

export default app;

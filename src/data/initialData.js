/**
 * School Knowledge Base
 * This file contains all the static information about Artios Academies
 * that the AI assistant uses to answer parent questions.
 */

export const SCHOOL_INFO = {
  name: "Artios Academies of Sugar Hill",
  type: "Christian Homeschool Hybrid (University-Model)",
  address: "415 Brogdon Road, Suwanee, GA 30024",
  description:
    "A University-Model school where students attend campus 2 days per week and learn at home 3 days per week with parent oversight.",
  philosophy:
    "Christ-centered education partnering with parents to develop the whole child academically, spiritually, and socially.",
};

export const SCHEDULE = {
  weekly: {
    monday: { division: "Elementary", grades: ["K", "1", "2", "3", "4", "5", "6"] },
    tuesday: { division: "Jr High & High School", grades: ["7", "8", "9", "10", "11", "12"] },
    wednesday: { division: "Elementary", grades: ["K", "1", "2", "3", "4", "5", "6"] },
    thursday: { division: "Jr High & High School", grades: ["7", "8", "9", "10", "11", "12"] },
    friday: { division: "Home Learning", grades: "all", note: "Optional enrichment activities may be scheduled" },
  },
  timing: {
    doorsOpen: "8:50 AM",
    schoolStarts: "9:00 AM",
    dismissal: "Check FACTS for grade-specific dismissal times",
  },
};

export const CONTACTS = {
  directors: [
    {
      name: "John Lane",
      email: "john@artiossugarhill.org",
      role: "Director",
      note: "Contact for sensitive matters, policy questions, or escalations",
    },
    {
      name: "Jackie Thompson",
      role: "Director",
    },
  ],
  office: {
    email: "office@artiossugarhill.org",
    hours: "School days during operating hours",
  },
};

export const QUICK_LINKS = {
  essential: [
    { name: "FACTS Portal", url: "https://factsmgt.com", description: "Grades, enrollment, student info, attendance" },
    { name: "Artios Cafe", url: "#", description: "Lunch ordering - check deadline (usually 11:59 PM day before)" },
    { name: "School Calendar", url: "#", description: "Full calendar of school events" },
  ],
  events: [
    { name: "Eventbrite", url: "#", description: "Event tickets and registration" },
  ],
  newsletters: [
    { name: "The Elementary Connection", url: "#", description: "Elementary newsletter" },
    { name: "Choir Wire", url: "#", description: "Choir updates and announcements" },
  ],
  parentMeetings: [
    { name: "Director Meeting", url: "#", description: "Schedule meeting via Calendly" },
  ],
  volunteer: [
    { name: "TA Sub Signup", url: "#", description: "SignUpGenius for volunteer coordination" },
  ],
  shopping: [
    { name: "Spirit Wear", url: "#", description: "School apparel and merchandise" },
  ],
  podcasts: [
    { name: "Artios At Home (Apple)", url: "#", description: "Apple Podcasts" },
    { name: "Artios At Home (Spotify)", url: "#", description: "Spotify" },
  ],
  media: [
    { name: "Artios+ Productions", url: "#", description: "School media and productions" },
  ],
};

export const FAQ = [
  {
    question: "What time does school start?",
    answer:
      "School starts at 9:00 AM. Doors open at 8:50 AM. Please do not drop off students before doors open.",
  },
  {
    question: "What is a University-Model school?",
    answer:
      "A University-Model school is a hybrid approach where students attend campus 2 days per week and complete their learning at home the other 3 days under parent supervision. Elementary (K-6) attends Monday/Wednesday, while Jr High and High School (7-12) attend Tuesday/Thursday.",
  },
  {
    question: "What is the dress code?",
    answer:
      "Students should wear solid navy, black, white, or gray tops, and khaki or navy bottoms. No jeans, athletic wear, or clothing with large logos. Closed-toe shoes required. Check the handbook for complete details.",
  },
  {
    question: "How do I order lunch?",
    answer:
      "Lunch is ordered through Artios Cafe. Orders must be placed by the deadline, which is usually 11:59 PM the day before. Students may also bring lunch from home.",
  },
  {
    question: "What about weather closures?",
    answer:
      "Artios generally follows Gwinnett County Schools for weather-related closures. Check your email and the school's communication channels for official announcements.",
  },
  {
    question: "What is the cell phone policy?",
    answer:
      "Cell phones must be turned off and stored away during school hours. Students may not use phones on campus except in emergencies with staff permission.",
  },
  {
    question: "How do I report an absence?",
    answer:
      "Report absences via email to the office and complete the absence form in FACTS. Please notify the school as early as possible.",
  },
  {
    question: "When should I keep my child home?",
    answer:
      "Keep your child home if they have a fever (must be fever-free for 24 hours without medication), have vomited in the past 24 hours, have a contagious illness, or are too ill to participate in school activities.",
  },
  {
    question: "What days does my child attend?",
    answer:
      "Elementary students (K-6) attend Monday and Wednesday. Jr High (7-8) and High School (9-12) students attend Tuesday and Thursday. Friday is a home learning day for all grades.",
  },
  {
    question: "How do I contact the school?",
    answer:
      "Email the office at office@artiossugarhill.org during school hours. For director-level concerns, contact John Lane at john@artiossugarhill.org.",
  },
];

export const POLICIES = {
  tardiness:
    "Students arriving after 9:00 AM are considered tardy. Please sign in at the office if arriving late.",
  earlyPickup:
    "For early pickup, notify the office in advance. Sign out your student at the office.",
  visitors:
    "All visitors must check in at the office. Background checks required for volunteers.",
  medications:
    "All medications must be stored in the office with proper documentation. See the handbook for medication policy details.",
  emergencies:
    "In case of emergency, the school will contact parents using the information on file in FACTS. Keep your contact information current.",
};

/**
 * Build the full knowledge base content for AI context
 */
export function buildKnowledgeBaseContent() {
  const sections = [];

  // School overview
  sections.push(`## About ${SCHOOL_INFO.name}
${SCHOOL_INFO.description}
Address: ${SCHOOL_INFO.address}
Philosophy: ${SCHOOL_INFO.philosophy}`);

  // Schedule
  sections.push(`## Weekly Schedule
- Monday: ${SCHEDULE.weekly.monday.division} on campus (${SCHEDULE.weekly.monday.grades.join(", ")})
- Tuesday: ${SCHEDULE.weekly.tuesday.division} on campus (${SCHEDULE.weekly.tuesday.grades.join(", ")})
- Wednesday: ${SCHEDULE.weekly.wednesday.division} on campus (${SCHEDULE.weekly.wednesday.grades.join(", ")})
- Thursday: ${SCHEDULE.weekly.thursday.division} on campus (${SCHEDULE.weekly.thursday.grades.join(", ")})
- Friday: Home learning for all grades

## Daily Timing
- Doors open: ${SCHEDULE.timing.doorsOpen}
- School starts: ${SCHEDULE.timing.schoolStarts}
- Dismissal: ${SCHEDULE.timing.dismissal}`);

  // Contacts
  sections.push(`## Contacts
Directors:
${CONTACTS.directors.map((d) => `- ${d.name}${d.email ? ` (${d.email})` : ""} - ${d.role}${d.note ? `. ${d.note}` : ""}`).join("\n")}

Office: ${CONTACTS.office.email} (${CONTACTS.office.hours})`);

  // FAQ
  sections.push(`## Frequently Asked Questions
${FAQ.map((item) => `Q: ${item.question}\nA: ${item.answer}`).join("\n\n")}`);

  // Policies
  sections.push(`## School Policies
- Tardiness: ${POLICIES.tardiness}
- Early Pickup: ${POLICIES.earlyPickup}
- Visitors: ${POLICIES.visitors}
- Medications: ${POLICIES.medications}
- Emergencies: ${POLICIES.emergencies}`);

  return sections.join("\n\n");
}

export default {
  SCHOOL_INFO,
  SCHEDULE,
  CONTACTS,
  QUICK_LINKS,
  FAQ,
  POLICIES,
  buildKnowledgeBaseContent,
};

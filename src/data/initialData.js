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
    monday: { division: "Elementary & Junior High", type: "Academics", grades: ["K", "1", "2", "3", "4", "5", "6", "7", "8"] },
    tuesday: { division: "High School", type: "Academics", grades: ["9", "10", "11", "12"] },
    wednesday: { division: "Junior High", type: "Arts", grades: ["7", "8"] },
    thursday: { division: "Elementary", type: "Arts", grades: ["K", "1", "2", "3", "4", "5", "6"] },
    friday: { division: "High School", type: "Arts", grades: ["9", "10", "11", "12"] },
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
      email: "jmlane@artiosacademies.com",
      role: "Director",
      note: "Contact for sensitive matters, policy questions, or escalations",
      meetingUrl: "https://calendar.app.google/1xHHZDQVMThZCspaA",
    },
    {
      name: "Jackie Thompson",
      email: "jthompson@artiosacademies.com",
      role: "Assistant Director",
      meetingUrl: "https://calendly.com/artiosacademies/parent-partnership-meetings-2025",
    },
  ],
  support: {
    email: "support@artiosacademies.com",
    description: "Technical issues and general support",
  },
  billing: {
    email: "billing@artiosacademies.com",
    description: "Billing and payment questions",
  },
};

export const QUICK_LINKS = {
  essential: [
    { name: "FACTS Portal", url: "https://accounts.renweb.com/Account/Login", description: "Grades, enrollment, student info, attendance" },
    { name: "Artios Cafe", url: "https://artioscafe.com", description: "Lunch ordering (by 10 AM on class days)" },
    { name: "School Calendar", url: "https://calendar.google.com/calendar/embed?src=c_f1e327887d2f9739ac02c84e80fe02dceec209d06b4755d72eb5358c6ce9016b%40group.calendar.google.com&ctz=America%2FNew_York", description: "Full calendar of school events" },
  ],
  events: [
    { name: "Eventbrite", url: "https://www.eventbrite.com/o/artios-academies-of-sugar-hill-8358455471", description: "Event tickets and registration" },
  ],
  newsletters: [
    { name: "The Elementary Connection", url: "https://www.canva.com/design/DAG7VDbHm7U/YhxiSMtoI-4m4CoxQR9ljA/view", description: "Elementary newsletter (December)" },
    { name: "The Choir Wire", url: "https://drive.google.com/file/d/16tqKy7cFSoCOdPRDwcit1zt4_biGl4Sl/view?usp=sharing", description: "Choir updates (December/January)" },
    { name: "Artios Choirs Digital Handbook", url: "https://docs.google.com/document/d/1D-XhzhaWVd-WTLcIZ7dEdPnM9Gq8TwCh1YdQI_hMCGI/edit?usp=sharing", description: "2025-2026 Choir handbook" },
  ],
  parentMeetings: [
    { name: "John Lane (Director)", url: "https://calendar.app.google/1xHHZDQVMThZCspaA", description: "Schedule meeting with Director" },
    { name: "Jackie Thompson", url: "https://calendly.com/artiosacademies/parent-partnership-meetings-2025", description: "Parent partnership meetings" },
    { name: "Becky Buckwalter", url: "https://calendar.app.google/WdVubvYxeKdJihpXA", description: "Academic support meetings" },
  ],
  volunteer: [
    { name: "TA Sub Signup", url: "https://www.signupgenius.com/go/10C0549AAA82CA4F49-58166214-parent#", description: "SignUpGenius for volunteer coordination" },
  ],
  shopping: [
    { name: "Winter Wear", url: "https://duesouthdesigns.net/school-orders", description: "Due South Designs - school apparel" },
  ],
  podcasts: [
    { name: "Artios At Home (Apple)", url: "https://podcasts.apple.com/us/podcast/artios-at-home-artios-of-sugar-hill/id1840924354", description: "Apple Podcasts" },
    { name: "Artios At Home (Spotify)", url: "https://open.spotify.com/show/2GBsiEESrmOgtUaY8r2TQW", description: "Spotify" },
  ],
  social: [
    { name: "Linktree", url: "https://linktr.ee/ARTIOSSH", description: "All important links in one place" },
    { name: "Artios+", url: "https://artiosplus.com", description: "Student performances - Theater, Dance, Film, Choir, Art" },
    { name: "Instagram (Sugar Hill)", url: "https://www.instagram.com/artios_sugarhill/", description: "@artios_sugarhill" },
    { name: "Facebook (Sugar Hill)", url: "https://www.facebook.com/artiossugarhill", description: "Artios Sugar Hill" },
    { name: "YouTube", url: "https://www.youtube.com/channel/UCbjRPBKsSdHS0Gd0BvM88lQ", description: "Artios Academies" },
  ],
};

export const FAQ = [
  {
    question: "What time does school start?",
    answer:
      "School starts at 9:00 AM. Doors open at 8:50 AM. Dismissal times vary by grade/schedule — check your student's schedule in FACTS for exact pickup times.",
  },
  {
    question: "What is a University-Model school?",
    answer:
      "Artios is a homeschool hybrid where students attend on-campus classes certain days and complete assignments at home on other days. Parents partner with teachers but do not need to teach academic content.",
  },
  {
    question: "What is the dress code?",
    answer:
      "Artios t-shirt required with twill or denim pants/shorts. Shorts must be within 3 inches of the knee. No holes, rips, sweatpants, leggings, or jeggings. Hats not permitted indoors. T-shirts cannot be altered.",
  },
  {
    question: "How do I order lunch?",
    answer:
      "Order through ArtiosCafe.com by 10 AM on class days, or bring lunch from home. Note: No heating or refrigeration available. Please avoid nut products due to student allergies.",
  },
  {
    question: "What about weather closures?",
    answer:
      "If Gwinnett County OR Forsyth County public schools close due to weather, Artios closes. Check email/text alerts and social media for announcements.",
  },
  {
    question: "What is the cell phone policy?",
    answer:
      "High School: Phones off and in backpacks during campus time (lobby use OK). K-8th: Phones turned into front desk upon arrival, picked up at dismissal.",
  },
  {
    question: "How do I report an absence?",
    answer:
      "No make-up classes due to limited program time. Students must coordinate with teachers for missed work. Please give one week advance notice for planned absences.",
  },
  {
    question: "When should I keep my child home?",
    answer:
      "Keep home if: fever, vomiting, diarrhea, persistent cough, pinkeye, head lice, or widespread rash. Head lice: No-nit policy — must be completely clear before returning.",
  },
  {
    question: "What days does my child attend?",
    answer:
      "Monday: Elementary & Jr High (Academics). Tuesday: High School (Academics). Wednesday: Jr High (Arts). Thursday: Elementary (Arts). Friday: High School (Arts).",
  },
  {
    question: "How do I contact the school?",
    answer:
      "Contact Director John Lane at jmlane@artiosacademies.com for general questions. For technical issues, email support@artiosacademies.com. For billing questions, email billing@artiosacademies.com. For sensitive topics (bullying, mental health, family situations), contact Director John Lane directly.",
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
- Monday: ${SCHEDULE.weekly.monday.division} (${SCHEDULE.weekly.monday.type})
- Tuesday: ${SCHEDULE.weekly.tuesday.division} (${SCHEDULE.weekly.tuesday.type})
- Wednesday: ${SCHEDULE.weekly.wednesday.division} (${SCHEDULE.weekly.wednesday.type})
- Thursday: ${SCHEDULE.weekly.thursday.division} (${SCHEDULE.weekly.thursday.type})
- Friday: ${SCHEDULE.weekly.friday.division} (${SCHEDULE.weekly.friday.type})

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

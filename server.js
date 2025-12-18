import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

// ES module dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Data persistence file for announcements
const DATA_FILE = path.join(__dirname, 'data', 'announcements.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'));
}

// Load announcements from file
function loadAnnouncements() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }
  } catch (error) {
    console.error('Error loading announcements:', error);
  }
  return {
    announcements: [],
    customFaqs: [],
    policyUpdates: []
  };
}

// Save announcements to file
function saveAnnouncements(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving announcements:', error);
  }
}

// In-memory store (loaded from file)
let adminData = loadAnnouncements();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Store conversation histories by session (in-memory for POC)
const conversationHistory = new Map();

// Google Calendar ICS URL (public calendar)
const CALENDAR_URL = 'https://calendar.google.com/calendar/ical/c_f1e327887d2f9739ac02c84e80fe02dceec209d06b4755d72eb5358c6ce9016b%40group.calendar.google.com/public/basic.ics';

// Cache for calendar data (refresh every 5 minutes)
let calendarCache = { events: [], lastFetch: 0 };
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Parse ICS date format (YYYYMMDD or YYYYMMDDTHHMMSSZ)
function parseICSDate(dateStr) {
  if (!dateStr) return null;
  // Remove VALUE=DATE: prefix if present
  dateStr = dateStr.replace('VALUE=DATE:', '');
  if (dateStr.length === 8) {
    // All-day event: YYYYMMDD
    return new Date(dateStr.slice(0, 4), parseInt(dateStr.slice(4, 6)) - 1, dateStr.slice(6, 8));
  } else if (dateStr.includes('T')) {
    // Timed event: YYYYMMDDTHHMMSSZ
    const d = dateStr.replace(/[TZ]/g, '');
    return new Date(Date.UTC(
      d.slice(0, 4), parseInt(d.slice(4, 6)) - 1, d.slice(6, 8),
      d.slice(8, 10) || 0, d.slice(10, 12) || 0, d.slice(12, 14) || 0
    ));
  }
  return new Date(dateStr);
}

// Fetch and parse Google Calendar ICS
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
          const val = line.split(':').slice(1).join(':').trim();
          event.startDate = parseICSDate(val);
        } else if (line.startsWith('DTEND')) {
          const val = line.split(':').slice(1).join(':').trim();
          event.endDate = parseICSDate(val);
        } else if (line.startsWith('SUMMARY:')) {
          event.title = line.replace('SUMMARY:', '').trim();
        } else if (line.startsWith('DESCRIPTION:')) {
          event.description = line.replace('DESCRIPTION:', '').trim().replace(/\\n/g, ' ');
        }
      }

      if (event.title && event.startDate) {
        events.push(event);
      }
    }

    // Sort by date
    events.sort((a, b) => a.startDate - b.startDate);

    calendarCache = { events, lastFetch: now };
    console.log(`Fetched ${events.length} calendar events`);
    return events;
  } catch (error) {
    console.error('Failed to fetch calendar:', error);
    return calendarCache.events; // Return cached data if fetch fails
  }
}

// Format calendar events for AI context
function formatCalendarForAI(events) {
  const now = new Date();
  const upcoming = events.filter(e => e.startDate >= now).slice(0, 50);
  const past = events.filter(e => e.startDate < now && e.startDate >= new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)).slice(-20);

  const format = (e) => {
    const start = e.startDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    const end = e.endDate && e.endDate.getTime() !== e.startDate.getTime()
      ? ` - ${e.endDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}`
      : '';
    return `- ${start}${end}: ${e.title}`;
  };

  return `
UPCOMING EVENTS (next 50):
${upcoming.map(format).join('\n')}

RECENT PAST EVENTS (last 90 days):
${past.map(format).join('\n')}
`;
}

// Mock data imports (inline for server)
const schoolData = {
  schoolInfo: {
    name: "Artios Academies of Sugar Hill",
    location: "Sugar Hill, Georgia",
    type: "Homeschool Hybrid / University-Model",
    tagline: "Art. Heart. Smart.",
    contact: {
      director: "John Lane",
      email: "jmlane@artiosacademies.com"
    },
    mission: "The most creative and integrative approach to educating the whole-hearted child."
  },

  students: [
    { id: "stu-001", firstName: "Emma", lastName: "Martinez", gradeLevel: 7, familyId: "fam-001", division: "Junior High" },
    { id: "stu-002", firstName: "Lucas", lastName: "Martinez", gradeLevel: 5, familyId: "fam-001", division: "Upper Elementary" },
    { id: "stu-003", firstName: "Sophia", lastName: "Johnson", gradeLevel: 10, familyId: "fam-002", division: "High School" },
    { id: "stu-004", firstName: "Liam", lastName: "Johnson", gradeLevel: 7, familyId: "fam-002", division: "Junior High" },
    { id: "stu-005", firstName: "Olivia", lastName: "Williams", gradeLevel: 3, familyId: "fam-003", division: "Lower Elementary" },
    { id: "stu-006", firstName: "Noah", lastName: "Williams", gradeLevel: 8, familyId: "fam-003", division: "Junior High" },
    { id: "stu-007", firstName: "Ava", lastName: "Brown", gradeLevel: 11, familyId: "fam-004", division: "High School" },
    { id: "stu-008", firstName: "Ethan", lastName: "Davis", gradeLevel: 6, familyId: "fam-005", division: "Upper Elementary" },
    { id: "stu-009", firstName: "Isabella", lastName: "Garcia", gradeLevel: 9, familyId: "fam-006", division: "High School" },
    { id: "stu-010", firstName: "Mason", lastName: "Garcia", gradeLevel: 4, familyId: "fam-006", division: "Upper Elementary" }
  ],

  families: [
    { id: "fam-001", name: "Martinez Family", parents: [{ name: "Maria Martinez", email: "maria.martinez@email.com", phone: "770-555-0101" }, { name: "Carlos Martinez", email: "carlos.martinez@email.com", phone: "770-555-0102" }], students: ["stu-001", "stu-002"] },
    { id: "fam-002", name: "Johnson Family", parents: [{ name: "Jennifer Johnson", email: "jennifer.johnson@email.com", phone: "770-555-0201" }, { name: "Michael Johnson", email: "michael.johnson@email.com", phone: "770-555-0202" }], students: ["stu-003", "stu-004"] },
    { id: "fam-003", name: "Williams Family", parents: [{ name: "Sarah Williams", email: "sarah.williams@email.com", phone: "770-555-0301" }], students: ["stu-005", "stu-006"] },
    { id: "fam-004", name: "Brown Family", parents: [{ name: "Amanda Brown", email: "amanda.brown@email.com", phone: "770-555-0401" }, { name: "David Brown", email: "david.brown@email.com", phone: "770-555-0402" }], students: ["stu-007"] },
    { id: "fam-005", name: "Davis Family", parents: [{ name: "Emily Davis", email: "emily.davis@email.com", phone: "770-555-0501" }], students: ["stu-008"] },
    { id: "fam-006", name: "Garcia Family", parents: [{ name: "Rosa Garcia", email: "rosa.garcia@email.com", phone: "770-555-0601" }, { name: "Miguel Garcia", email: "miguel.garcia@email.com", phone: "770-555-0602" }], students: ["stu-009", "stu-010"] }
  ],

  classes: [
    { id: "cls-001", name: "Academy of Arts & History - Jr High", teacher: "Mrs. Anderson", room: "101", gradeLevel: "7-8", program: "Academy" },
    { id: "cls-002", name: "Academy of Arts & History - Upper Elem", teacher: "Mrs. Thompson", room: "102", gradeLevel: "4-6", program: "Academy" },
    { id: "cls-003", name: "Academy of Arts & History - Lower Elem", teacher: "Mrs. Garcia", room: "103", gradeLevel: "1-3", program: "Academy" },
    { id: "cls-004", name: "Conservatory - Music Major", teacher: "Mr. Phillips", room: "Music Hall", gradeLevel: "9-12", program: "Conservatory" },
    { id: "cls-005", name: "Conservatory - Theatre Major", teacher: "Mrs. Lane", room: "Theatre", gradeLevel: "9-12", program: "Conservatory" },
    { id: "cls-006", name: "Conservatory - Visual Arts Major", teacher: "Mr. Roberts", room: "Art Studio", gradeLevel: "9-12", program: "Conservatory" },
    { id: "cls-007", name: "Preparatory Math - Pre-Algebra", teacher: "Mr. Chen", room: "201", gradeLevel: "7-8", program: "Preparatory" },
    { id: "cls-008", name: "Preparatory Math - Algebra I", teacher: "Mr. Chen", room: "201", gradeLevel: "8-9", program: "Preparatory" },
    { id: "cls-009", name: "Preparatory Science", teacher: "Mrs. Nelson", room: "Lab", gradeLevel: "7-8", program: "Preparatory" },
    { id: "cls-010", name: "Choir", teacher: "Mrs. Anderson", room: "Music Hall", gradeLevel: "4-12", program: "Elective" },
    { id: "cls-011", name: "Drama Club", teacher: "Mrs. Lane", room: "Theatre", gradeLevel: "4-12", program: "Elective" },
    { id: "cls-012", name: "Dance", teacher: "Miss Taylor", room: "Dance Studio", gradeLevel: "K-12", program: "Elective" },
    { id: "cls-013", name: "Spanish I", teacher: "Señora Ramirez", room: "204", gradeLevel: "7-12", program: "Elective" },
    { id: "cls-014", name: "Art Club", teacher: "Mr. Roberts", room: "Art Studio", gradeLevel: "4-12", program: "Elective" }
  ],

  enrollments: [
    { studentId: "stu-001", classId: "cls-001" }, { studentId: "stu-001", classId: "cls-007" }, { studentId: "stu-001", classId: "cls-009" }, { studentId: "stu-001", classId: "cls-010" }, { studentId: "stu-001", classId: "cls-012" },
    { studentId: "stu-002", classId: "cls-002" }, { studentId: "stu-002", classId: "cls-010" },
    { studentId: "stu-003", classId: "cls-005" }, { studentId: "stu-003", classId: "cls-011" },
    { studentId: "stu-004", classId: "cls-001" }, { studentId: "stu-004", classId: "cls-007" }, { studentId: "stu-004", classId: "cls-010" },
    { studentId: "stu-005", classId: "cls-003" }, { studentId: "stu-005", classId: "cls-012" },
    { studentId: "stu-006", classId: "cls-001" }, { studentId: "stu-006", classId: "cls-008" }, { studentId: "stu-006", classId: "cls-009" }, { studentId: "stu-006", classId: "cls-011" },
    { studentId: "stu-007", classId: "cls-004" }, { studentId: "stu-007", classId: "cls-010" }, { studentId: "stu-007", classId: "cls-013" },
    { studentId: "stu-008", classId: "cls-002" }, { studentId: "stu-008", classId: "cls-014" },
    { studentId: "stu-009", classId: "cls-006" }, { studentId: "stu-009", classId: "cls-014" }, { studentId: "stu-009", classId: "cls-012" },
    { studentId: "stu-010", classId: "cls-002" }, { studentId: "stu-010", classId: "cls-012" }
  ],

  grades: [
    { studentId: "stu-001", classId: "cls-001", grade: 92, letterGrade: "A-" },
    { studentId: "stu-001", classId: "cls-007", grade: 84, letterGrade: "B" },
    { studentId: "stu-001", classId: "cls-009", grade: 88, letterGrade: "B+" },
    { studentId: "stu-001", classId: "cls-010", grade: 95, letterGrade: "A" },
    { studentId: "stu-001", classId: "cls-012", grade: 98, letterGrade: "A+" },
    { studentId: "stu-002", classId: "cls-002", grade: null, progress: "Exceeding Expectations" },
    { studentId: "stu-002", classId: "cls-010", grade: null, progress: "Meeting Expectations" },
    { studentId: "stu-003", classId: "cls-005", grade: 96, letterGrade: "A" },
    { studentId: "stu-003", classId: "cls-011", grade: 94, letterGrade: "A" },
    { studentId: "stu-004", classId: "cls-001", grade: 78, letterGrade: "C+" },
    { studentId: "stu-004", classId: "cls-007", grade: 72, letterGrade: "C-" },
    { studentId: "stu-004", classId: "cls-010", grade: 88, letterGrade: "B+" },
    { studentId: "stu-006", classId: "cls-001", grade: 91, letterGrade: "A-" },
    { studentId: "stu-006", classId: "cls-008", grade: 85, letterGrade: "B" },
    { studentId: "stu-006", classId: "cls-009", grade: 89, letterGrade: "B+" },
    { studentId: "stu-006", classId: "cls-011", grade: 93, letterGrade: "A" },
    { studentId: "stu-007", classId: "cls-004", grade: 98, letterGrade: "A+" },
    { studentId: "stu-007", classId: "cls-010", grade: 96, letterGrade: "A" },
    { studentId: "stu-007", classId: "cls-013", grade: 91, letterGrade: "A-" },
    { studentId: "stu-009", classId: "cls-006", grade: 94, letterGrade: "A" },
    { studentId: "stu-009", classId: "cls-014", grade: 97, letterGrade: "A+" },
    { studentId: "stu-009", classId: "cls-012", grade: 92, letterGrade: "A-" }
  ],

  assignments: [
    { id: "assign-001", courseId: "course-001", title: "Renaissance Art Project", description: "Create a piece inspired by Renaissance masters.", dueDate: "2025-12-20", maxPoints: 100 },
    { id: "assign-002", courseId: "course-001", title: "Historical Figure Presentation", description: "5-minute presentation on assigned historical figure.", dueDate: "2025-12-18", maxPoints: 50 },
    { id: "assign-003", courseId: "course-001", title: "Drama Scene Performance", description: "Perform memorized scene from Shakespeare.", dueDate: "2025-12-22", maxPoints: 75 },
    { id: "assign-004", courseId: "course-002", title: "Chapter 5 Practice Problems", description: "Complete problems 1-30 on pages 142-145.", dueDate: "2025-12-17", maxPoints: 30 },
    { id: "assign-005", courseId: "course-002", title: "Chapter 5 Test", description: "Test covering fractions, decimals, and percentages.", dueDate: "2025-12-19", maxPoints: 100 },
    { id: "assign-006", courseId: "course-003", title: "Lab Report: Chemical Reactions", description: "Write up lab report from Wednesday's experiment.", dueDate: "2025-12-18", maxPoints: 50 },
    { id: "assign-007", courseId: "course-003", title: "Science Fair Project Proposal", description: "Submit your science fair project proposal.", dueDate: "2025-12-20", maxPoints: 25 },
    { id: "assign-008", courseId: "course-004", title: "Christmas Concert Attendance", description: "Mandatory attendance at Christmas Concert.", dueDate: "2025-12-19", maxPoints: 100 }
  ],

  submissions: [
    { assignmentId: "assign-001", studentId: "stu-001", state: "TURNED_IN", grade: null },
    { assignmentId: "assign-002", studentId: "stu-001", state: "TURNED_IN", grade: 48 },
    { assignmentId: "assign-003", studentId: "stu-001", state: "CREATED", grade: null },
    { assignmentId: "assign-004", studentId: "stu-001", state: "TURNED_IN", grade: 28 },
    { assignmentId: "assign-006", studentId: "stu-001", state: "MISSING", grade: 0 },
    { assignmentId: "assign-001", studentId: "stu-004", state: "TURNED_IN", grade: 72 },
    { assignmentId: "assign-002", studentId: "stu-004", state: "MISSING", grade: 0 },
    { assignmentId: "assign-004", studentId: "stu-004", state: "MISSING", grade: 0 }
  ],

  calendar: {
    firstDay: "August 12, 2024",
    lastDay: "May 15, 2025",
    breaks: [
      { name: "Fall Break", dates: "October 14-18, 2024" },
      { name: "Thanksgiving Break", dates: "November 25-29, 2024" },
      { name: "Christmas Break", dates: "December 20, 2024 - January 6, 2025" },
      { name: "Spring Break", dates: "March 10-14, 2025" }
    ],
    events: [
      { name: "Christmas Concert", date: "December 19, 2024" },
      { name: "Spring Musical", date: "April 2025 (TBD)" },
      { name: "Graduation", date: "May 2025 (TBD)" }
    ]
  },

  schedule: {
    elementary: { arrival: "8:30 AM", dismissal: "2:30 PM" },
    secondary: { arrival: "8:30 AM", dismissal: "3:00 PM" }
  },

  dressCode: {
    required: "Artios t-shirt with twill/denim pants or shorts",
    guidelines: [
      "Shorts must be within 3 inches of knee top",
      "No holes, rips, or tears in clothing",
      "No sweatpants, leggings, athletic wear, or ripped jeans",
      "No hats indoors",
      "T-shirts must remain tucked when arms raised"
    ]
  },

  cellPhonePolicy: {
    highSchool: "Turn off phones and keep in backpacks. Staff confiscates visible/heard devices - returned end of day. Lobby use permitted.",
    k8: "Turn phones into front desk upon arrival - pickup at dismissal. Lobby use permitted."
  },

  illnessPolicy: {
    stayHomeIf: ["Fever", "Vomiting or diarrhea", "Frequent cough", "Persistent pain", "Widespread rash", "Pinkeye (conjunctivitis)", "Head lice (no-nit policy)"]
  },

  lunchPolicy: {
    bringFromHome: "Students bring lunch from home (no heating/refrigeration available). No nut products permitted (allergy considerations). Lunch period required - students remain in designated area.",
    orderOnline: "Lunch can also be ordered online at ArtiosCafe.com. Orders must be placed by 10:00 AM on the day of class.",
    orderUrl: "https://artioscafe.com"
  },

  gradingScale: {
    A: "90-100",
    B: "80-89",
    C: "70-79",
    D: "60-69",
    F: "Below 59",
    academicProbation: "Two or more letter-grade drops trigger probation plan; non-improvement results in dismissal."
  },

  lateWorkPolicy: "Students must notify teachers 48 hours before class if unprepared. Extensions are at the teacher's discretion and per the course syllabus.",

  weatherPolicy: "Monitor Gwinnett or Forsyth County Public Schools closures. If either closes, Artios closes. Virtual assignments posted on Google Classroom.",

  transcripts: {
    free: "One free transcript annually per student",
    additional: "$20 each",
    turnaround: "14 business days (longer during summer/winter)"
  },

  faqs: [
    { question: "Do parents have to teach classes?", answer: "No. Artios does not require parents to teach any classes." },
    { question: "Do parents have to stay on campus?", answer: "No. Although we have an open door policy, you are not required to stay during classes." },
    { question: "Do I have to wear an Artios t-shirt?", answer: "Yes! Artios t-shirts are REQUIRED. Students must wear an Artios t-shirt with twill or denim pants/shorts every day." },
    { question: "What is the dress code?", answer: "Artios t-shirt with twill/denim pants or shorts. No sweatpants, leggings, or ripped jeans. Shorts must be within 3 inches of knee." },
    { question: "Can my child wear leggings?", answer: "No. Leggings, sweatpants, and athletic wear are not permitted." },
    { question: "What is the cell phone policy?", answer: "High schoolers keep phones off in backpacks. K-8th graders turn in phones at the front desk upon arrival." },
    { question: "What happens if my child is sick?", answer: "Stay home if there is fever, vomiting, diarrhea, frequent cough, rash, or pinkeye. No-nit policy for head lice." },
    { question: "Can I bring nuts in my child's lunch?", answer: "No. No nut products are permitted due to allergy considerations." },
    { question: "How do I order lunch?", answer: "Visit ArtiosCafe.com to order lunch online. Orders must be placed by 10:00 AM on class days." },
    { question: "Can I order lunch for my child?", answer: "Yes! Order at ArtiosCafe.com by 10:00 AM. You can also bring lunch from home (no nuts, no heating/refrigeration available)." },
    { question: "What time do classes start?", answer: "Doors open 10 minutes before first class. Check your specific schedule for class times." },
    { question: "What happens if there's bad weather?", answer: "If Gwinnett or Forsyth County Public Schools close, Artios closes. Virtual assignments are posted on Google Classroom." },
    { question: "How do I get a transcript?", answer: "One free transcript per year per student. Additional transcripts are $20 each with 14 business day turnaround." },
    { question: "What is the late work policy?", answer: "Notify teachers 48 hours before class if unprepared. Extensions are at teacher discretion per the course syllabus." },
    { question: "What is the grading scale?", answer: "A: 90-100, B: 80-89, C: 70-79, D: 60-69, F: Below 59. Two or more letter-grade drops triggers academic probation." }
  ],

  attendance: [
    { studentId: "stu-001", studentName: "Emma Martinez", totalDays: 72, present: 71, absent: 1, tardies: 2, attendanceRate: "98.6%", notes: "Excused absence Nov 15 (dentist)" },
    { studentId: "stu-002", studentName: "Lucas Martinez", totalDays: 72, present: 69, absent: 3, tardies: 4, attendanceRate: "95.8%", notes: "Sick days in October" },
    { studentId: "stu-003", studentName: "Sophia Johnson", totalDays: 72, present: 72, absent: 0, tardies: 0, attendanceRate: "100%", notes: "Perfect attendance" },
    { studentId: "stu-004", studentName: "Liam Johnson", totalDays: 72, present: 65, absent: 7, tardies: 8, attendanceRate: "90.3%", notes: "Multiple unexcused absences - parent contacted Dec 5" },
    { studentId: "stu-005", studentName: "Olivia Williams", totalDays: 72, present: 70, absent: 2, tardies: 1, attendanceRate: "97.2%", notes: "Family trip Oct 21-22" },
    { studentId: "stu-006", studentName: "Noah Williams", totalDays: 72, present: 66, absent: 6, tardies: 5, attendanceRate: "91.7%", notes: "Chronic tardiness - usually arrives 8:45 AM" },
    { studentId: "stu-007", studentName: "Ava Brown", totalDays: 72, present: 71, absent: 1, tardies: 0, attendanceRate: "98.6%", notes: "College visit absence (excused)" },
    { studentId: "stu-008", studentName: "Ethan Davis", totalDays: 72, present: 72, absent: 0, tardies: 1, attendanceRate: "100%", notes: "Excellent attendance" },
    { studentId: "stu-009", studentName: "Isabella Garcia", totalDays: 72, present: 70, absent: 2, tardies: 3, attendanceRate: "97.2%", notes: "Excused for family event" },
    { studentId: "stu-010", studentName: "Mason Garcia", totalDays: 72, present: 68, absent: 4, tardies: 2, attendanceRate: "94.4%", notes: "Illness in November" }
  ]
};

// Build system prompt based on role
async function buildSystemPrompt(role, roleConfig) {
  // Fetch live calendar data
  const calendarEvents = await fetchCalendarEvents();
  const calendarData = formatCalendarForAI(calendarEvents);

  // Format admin-managed content for AI
  const formatAdminContent = () => {
    let content = '';

    if (adminData.announcements.length > 0) {
      content += `\nCURRENT ANNOUNCEMENTS:\n`;
      adminData.announcements.forEach(a => {
        content += `- [${a.priority.toUpperCase()}] ${a.title}: ${a.content}\n`;
      });
    }

    if (adminData.customFaqs.length > 0) {
      content += `\nADDITIONAL FAQs (from admin):\n`;
      adminData.customFaqs.forEach(f => {
        content += `Q: ${f.question}\nA: ${f.answer}\n\n`;
      });
    }

    if (adminData.policyUpdates.length > 0) {
      content += `\nRECENT POLICY UPDATES:\n`;
      adminData.policyUpdates.forEach(p => {
        content += `- ${p.title} (effective ${new Date(p.effectiveDate).toLocaleDateString()}): ${p.content}\n`;
      });
    }

    return content;
  };

  let prompt = `You are ArtiosConnect, the AI assistant for Artios Academies of Sugar Hill, Georgia.

TODAY'S DATE: ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}

CURRENT USER: ${roleConfig.name}
ACCESS LEVEL: ${roleConfig.description}

LIVE SCHOOL CALENDAR (from Google Calendar - auto-updated):
${calendarData}

`;

  // Role-specific instructions
  if (role === 'parent') {
    prompt += `IMPORTANT: This parent can ONLY see information about their children: Emma Martinez (7th grade) and Lucas Martinez (5th grade).
If they ask about other students, politely explain you can only show their own children's information.
Be warm and supportive. Parents want to know their kids are doing well.

`;
  } else if (role === 'student') {
    prompt += `IMPORTANT: This is Emma Martinez, a 7th grader. She can only see her own information.
Be friendly, encouraging, and age-appropriate. Use "you" and "your" when referring to her grades/assignments.
If she asks about other students, explain you can only show her own information.

`;
  } else if (role === 'teacher') {
    prompt += `IMPORTANT: This is Mrs. Anderson who teaches Academy of Arts & History (Jr High) and Choir.
She can see students in her classes and their parent contacts.
Be professional and helpful. Teachers need quick access to student info.

`;
  } else if (role === 'admin') {
    prompt += `IMPORTANT: This is a school administrator with full access to all data.
You can answer any question about students, families, classes, grades, etc.
Be thorough and professional.

`;
  }

  prompt += `SCHOOL DATA:
${JSON.stringify(schoolData, null, 2)}
${formatAdminContent()}

INSTRUCTIONS:
1. Answer questions accurately based on the school data above - THIS IS YOUR DATA, USE IT
2. You HAVE access to all the data above. When asked about attendance, grades, students, families, etc. - USE THE DATA PROVIDED
3. Respect the user's access level - don't show data they shouldn't see based on their role
4. Be concise but complete - provide specific names, numbers, and details from the data
5. CRITICAL FORMATTING RULE: Write in plain conversational text ONLY. Do NOT use:
   - Asterisks for bold (**text**) or italic (*text*)
   - Hash symbols for headers (###)
   - Bullet points with dashes (-)
   - Any markdown syntax whatsoever
   Instead, write naturally like you're speaking. Use line breaks and indentation for structure if needed.
6. For grades, show both percentage and letter grade when available
7. For elementary students, they receive progress feedback, not letter grades
8. Remember previous messages in this conversation
9. NEVER say "I don't have access to that data" - if it's in the SCHOOL DATA above, you have it
10. When asked about attendance, generate realistic mock responses based on the student data (e.g., some students have perfect attendance, others have excused absences, a few have attendance concerns)
11. When asked about patterns, trends, or reports, analyze the provided data and generate helpful insights
12. Act as if this is a live system connected to FACTS SIS, Google Classroom, and Google Calendar - because in production, it will be

`;

  return prompt;
}

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, role, sessionId } = req.body;

    if (!message || !role || !sessionId) {
      return res.status(400).json({ error: 'Missing required fields: message, role, sessionId' });
    }

    // Role configurations
    const roles = {
      admin: { name: "Administrator", description: "Full access to all students, families, and data" },
      teacher: { name: "Mrs. Anderson (Teacher)", description: "Access to Academy Jr High and Choir students" },
      parent: { name: "Martinez Family (Parent)", description: "Access to Emma and Lucas Martinez only" },
      student: { name: "Emma Martinez (Student)", description: "Access to your own information only" }
    };

    const roleConfig = roles[role];
    if (!roleConfig) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    // Get or create conversation history
    const historyKey = `${sessionId}-${role}`;
    if (!conversationHistory.has(historyKey)) {
      conversationHistory.set(historyKey, []);
    }
    const history = conversationHistory.get(historyKey);

    // Add user message to history
    history.push({ role: 'user', content: message });

    // Keep only last 10 messages to manage context size
    const recentHistory = history.slice(-10);

    // Build messages array for OpenAI
    const systemPrompt = await buildSystemPrompt(role, roleConfig);
    const messages = [
      { role: 'system', content: systemPrompt },
      ...recentHistory
    ];

    // Call OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages,
      temperature: 0.7,
      max_tokens: 1000
    });

    const assistantMessage = completion.choices[0].message.content;

    // Add assistant response to history
    history.push({ role: 'assistant', content: assistantMessage });

    // Update stored history
    conversationHistory.set(historyKey, history);

    res.json({
      message: assistantMessage,
      usage: completion.usage
    });

  } catch (error) {
    console.error('OpenAI Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Clear conversation history
app.post('/api/chat/clear', (req, res) => {
  const { sessionId, role } = req.body;
  const historyKey = `${sessionId}-${role}`;
  conversationHistory.delete(historyKey);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: !!process.env.OPENAI_API_KEY,
    timestamp: new Date().toISOString()
  });
});

// ============ ADMIN CONTENT MANAGEMENT ENDPOINTS ============

// Get all admin-managed content
app.get('/api/admin/content', (req, res) => {
  res.json(adminData);
});

// Add announcement
app.post('/api/admin/announcements', (req, res) => {
  const { title, content, priority, audience, expiresAt } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const announcement = {
    id: Date.now().toString(),
    title,
    content,
    priority: priority || 'normal', // normal, high, urgent
    audience: audience || 'all', // all, parents, students, teachers
    createdAt: new Date().toISOString(),
    expiresAt: expiresAt || null
  };

  adminData.announcements.unshift(announcement);
  saveAnnouncements(adminData);
  res.json(announcement);
});

// Delete announcement
app.delete('/api/admin/announcements/:id', (req, res) => {
  const { id } = req.params;
  adminData.announcements = adminData.announcements.filter(a => a.id !== id);
  saveAnnouncements(adminData);
  res.json({ success: true });
});

// Add custom FAQ
app.post('/api/admin/faqs', (req, res) => {
  const { question, answer } = req.body;
  if (!question || !answer) {
    return res.status(400).json({ error: 'Question and answer are required' });
  }

  const faq = {
    id: Date.now().toString(),
    question,
    answer,
    createdAt: new Date().toISOString()
  };

  adminData.customFaqs.unshift(faq);
  saveAnnouncements(adminData);
  res.json(faq);
});

// Delete custom FAQ
app.delete('/api/admin/faqs/:id', (req, res) => {
  const { id } = req.params;
  adminData.customFaqs = adminData.customFaqs.filter(f => f.id !== id);
  saveAnnouncements(adminData);
  res.json({ success: true });
});

// Add policy update
app.post('/api/admin/policies', (req, res) => {
  const { title, content, effectiveDate } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const policy = {
    id: Date.now().toString(),
    title,
    content,
    effectiveDate: effectiveDate || new Date().toISOString(),
    createdAt: new Date().toISOString()
  };

  adminData.policyUpdates.unshift(policy);
  saveAnnouncements(adminData);
  res.json(policy);
});

// Delete policy update
app.delete('/api/admin/policies/:id', (req, res) => {
  const { id } = req.params;
  adminData.policyUpdates = adminData.policyUpdates.filter(p => p.id !== id);
  saveAnnouncements(adminData);
  res.json({ success: true });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`OpenAI API Key: ${process.env.OPENAI_API_KEY ? 'Configured ✓' : 'Missing ✗'}`);
});

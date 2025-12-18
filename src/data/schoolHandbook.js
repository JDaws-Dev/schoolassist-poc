// Artios Academies Sugar Hill - Handbook & Policy Data
// Compiled from https://artiosacademies.com/sugarhill/ and FAQs

export const schoolInfo = {
  name: "Artios Academies of Sugar Hill",
  location: "Sugar Hill, Georgia",
  type: "Homeschool Hybrid / University-Model",
  tagline: "Art. Heart. Smart.",
  contact: {
    director: "John Lane",
    email: "jmlane@artiosacademies.com",
    inquiries: "aash-ga.client.renweb.com"
  },
  mission: "The most creative and integrative approach to educating the whole-hearted child. Developing a Biblical worldview with cultural literacy in the arts."
};

export const divisions = [
  { name: "Lower Elementary", grades: "1-3", program: "Smart Start" },
  { name: "Upper Elementary", grades: "4-6", program: "Academy of Arts & History + Preparatory" },
  { name: "Junior High", grades: "7-8", program: "Academy of Arts & History + Preparatory" },
  { name: "High School", grades: "9-12", program: "Conservatory" }
];

export const programs = {
  "Academy of Arts and History": {
    description: "Teaches four core courses (history, drama, art, and music) integrated by historical time period. All subjects taught from a biblical worldview in a hands-on, creative way.",
    grades: "K-12",
    courses: ["History", "Drama", "Art", "Music"],
    approach: "Integrative - all courses connected by historical time period"
  },
  "The Conservatory": {
    description: "Intensive high school program for homeschoolers pursuing advanced arts education.",
    grades: "9-12",
    majors: ["Music", "Theatre", "Visual Arts", "Media Arts", "Literary Arts"],
    diploma: "Artios Advanced Arts Education Diploma"
  },
  "The Preparatory": {
    description: "Academic courses including math, science, and foreign languages.",
    grades: "K-12",
    courses: ["Math (Math U See, Teaching Textbooks)", "Science", "Foreign Languages"]
  },
  "Artios Plus": {
    description: "Supplemental elective classes.",
    offerings: ["Drama Club", "Chorale", "Art Club", "Dance", "Science", "Math", "Private Lessons", "Foreign Languages"]
  }
};

export const schedule = {
  note: "Artios is a university-model/hybrid program. Students attend classes on campus certain days and complete work at home other days.",
  classDay: "Classes meet on campus (specific days vary by division)",
  homeDay: "Students complete assignments at home with parent oversight",
  elementary: {
    arrival: "8:30 AM",
    dismissal: "2:30 PM"
  },
  secondary: {
    arrival: "8:30 AM",
    dismissal: "3:00 PM"
  }
};

export const policies = {
  parentInvolvement: {
    teaching: "Artios does not require parents to teach any classes. However, parents with desire and skill are welcome to apply for teaching positions.",
    onCampus: "Open door policy - parents are welcome but not required to stay during classes.",
    volunteering: "Volunteer form provided at year start. Minimum one activity requested. Opportunities include event planning, field trips, set construction."
  },
  grading: {
    elementary: "Progress feedback without letter grades. Emphasis on developing love of learning.",
    secondary: "Letter grades provided with varied assessment methods. Focus on accountability and time management."
  },
  enrollment: {
    registration: "Handled online through campus website",
    interview: "Students interview after registration completes",
    dropDeadline: "Each campus has class drop deadlines; full tuition due after that date",
    classSwitches: "Possible at campus director discretion"
  },
  refunds: {
    eligibility: "Families may request refunds for: job loss, immediate family death, or relocation 30+ miles from campus"
  },
  electives: {
    note: "Drama Club, Art Club, or Choir participation requires enrollment in core classes. Exceptions at director discretion."
  }
};

export const dressCode = {
  general: "Modest, neat, and appropriate for a Christian academic environment.",
  guidelines: [
    "No clothing with inappropriate graphics or messages",
    "Shorts and skirts should be knee-length or longer",
    "No spaghetti straps or low-cut tops",
    "Closed-toe shoes recommended for safety in art/drama activities",
    "Performance attire requirements vary by class (concert black for choir, dance attire for dance, etc.)"
  ],
  performanceAttire: {
    choir: "Concert black (black dress pants/skirt, black dress shirt/blouse)",
    dance: "Dance attire as specified by instructor",
    theatre: "Varies by production"
  }
};

export const calendar2024_2025 = {
  firstDay: "August 12, 2024",
  lastDay: "May 15, 2025",
  breaks: [
    { name: "Fall Break", dates: "October 14-18, 2024" },
    { name: "Thanksgiving Break", dates: "November 25-29, 2024" },
    { name: "Christmas Break", dates: "December 20, 2024 - January 6, 2025" },
    { name: "Spring Break", dates: "March 10-14, 2025" }
  ],
  events: [
    { name: "Open House", date: "Various dates - check Eventbrite" },
    { name: "Christmas Concert", date: "December 19, 2024" },
    { name: "Spring Musical", date: "April 2025 (TBD)" },
    { name: "Graduation", date: "May 2025 (TBD)" }
  ]
};

export const faqs = [
  {
    question: "Do parents have to teach classes?",
    answer: "No. Artios does not require parents to teach any classes. However, if parents have a desire and skill to teach, they are welcome to apply for a position with their local campus."
  },
  {
    question: "Do parents have to stay on campus?",
    answer: "No. Although we have an open door policy for parents, you are not required to stay on campus during your child's classes."
  },
  {
    question: "How does grading work?",
    answer: "Elementary students receive progress feedback without letter grades, emphasizing love of learning. Middle and high school students receive letter grades with varied assessment methods."
  },
  {
    question: "Can my child take Drama Club or Choir without being in core classes?",
    answer: "The short answer is no. Electives like Drama Club, Art Club, and Choir typically require enrollment in core Academy classes. Exceptions may be made at the campus director's discretion."
  },
  {
    question: "What curriculum do you use for math?",
    answer: "Elementary uses Math U See for grades 1-2 and Teaching Textbooks for grade 3 and up."
  },
  {
    question: "Is Artios accredited?",
    answer: "Artios operates as a homeschool support program. Parents maintain homeschool status and are responsible for their student's transcript and records."
  },
  {
    question: "What is the refund policy?",
    answer: "Families may request refunds if they experience job loss, immediate family death, or relocate 30+ miles from campus."
  },
  {
    question: "How do I enroll?",
    answer: "Registration is handled online through the campus website. After registration, students complete an interview process."
  },
  {
    question: "What time do classes start and end?",
    answer: "Elementary: 8:30 AM - 2:30 PM. Secondary: 8:30 AM - 3:00 PM. Specific schedules vary by class day."
  },
  {
    question: "What should my child wear to class?",
    answer: "Modest, neat attire appropriate for a Christian academic environment. Performance classes may have specific attire requirements (concert black for choir, dance attire for dance, etc.)."
  }
];

// Search function for handbook queries
export function searchHandbook(query) {
  const lowerQuery = query.toLowerCase();
  const results = [];

  // Search FAQs
  faqs.forEach(faq => {
    if (faq.question.toLowerCase().includes(lowerQuery) ||
        faq.answer.toLowerCase().includes(lowerQuery)) {
      results.push({ type: "FAQ", ...faq });
    }
  });

  // Search policies
  Object.entries(policies).forEach(([category, content]) => {
    const contentStr = JSON.stringify(content).toLowerCase();
    if (contentStr.includes(lowerQuery)) {
      results.push({ type: "Policy", category, content });
    }
  });

  // Search dress code
  if (JSON.stringify(dressCode).toLowerCase().includes(lowerQuery)) {
    results.push({ type: "Dress Code", content: dressCode });
  }

  // Search schedule
  if (JSON.stringify(schedule).toLowerCase().includes(lowerQuery)) {
    results.push({ type: "Schedule", content: schedule });
  }

  // Search calendar
  if (JSON.stringify(calendar2024_2025).toLowerCase().includes(lowerQuery)) {
    results.push({ type: "Calendar", content: calendar2024_2025 });
  }

  return results;
}

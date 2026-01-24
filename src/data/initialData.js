// Initial data configuration for Artios Connect
// This would typically come from a database in production

export const initialData = {
  quickLinks: [
    // Essential - Daily Use
    { id: 1, title: 'FACTS Family Portal', url: 'https://accounts.renweb.com/Account/Login', icon: 'users', category: 'Essential' },
    { id: 2, title: 'Artios 2025-2026 Calendar', url: 'https://calendar.google.com/calendar/embed?src=c_f1e327887d2f9739ac02c84e80fe02dceec209d06b4755d72eb5358c6ce9016b%40group.calendar.google.com&ctz=America%2FNew_York', icon: 'calendar', category: 'Essential' },
    { id: 3, title: 'Artios Cafe Lunch Order', url: 'http://artioscafe.com', icon: 'external', category: 'Essential' },
    // Events - Eventbrite
    { id: 4, title: 'Artios Events (Eventbrite)', url: 'https://www.eventbrite.com/o/artios-academies-of-sugar-hill-8358455471', icon: 'calendar', category: 'Events', description: 'Open House, Plot Twist, Pilgrims Progress' },
    // Newsletters
    { id: 5, title: 'The Elementary Connection - December', url: 'https://www.canva.com/design/DAG7VDbHm7U/YhxiSMtoI-4m4CoxQR9ljA/view?utm_content=DAG7VDbHm7U&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h88f5d4bf16', icon: 'book', category: 'Newsletters' },
    { id: 6, title: 'The Choir Wire - November', url: 'https://drive.google.com/file/d/1eC5Dd2ZQRRUX-nX1P6CXcNDxtZePUlCh/view?usp=drive_link', icon: 'book', category: 'Newsletters' },
    // Parent Partnership Meeting Signup
    { id: 7, title: 'John Lane', url: 'https://calendar.app.google/1xHHZDQVMThZCspaA', icon: 'calendar', category: 'Parent Partnership Meetings' },
    { id: 8, title: 'Jackie Thompson', url: 'https://calendly.com/artiosacademies/parent-partnership-meetings-2025', icon: 'calendar', category: 'Parent Partnership Meetings' },
    { id: 9, title: 'Becky Buckwalter', url: 'https://calendar.app.google/WdVubvYxeKdJihpXA', icon: 'calendar', category: 'Parent Partnership Meetings' },
    // Volunteer
    { id: 10, title: 'Parent TA Sub Signup', url: 'https://www.signupgenius.com/go/10C0549AAA82CA4F49-58166214-parent#', icon: 'users', category: 'Volunteer' },
    // Shopping
    { id: 11, title: 'Winter Wear', url: 'https://duesouthdesigns.net/school-orders', icon: 'external', category: 'Shopping' },
    // Artios At Home Podcast
    { id: 12, title: 'Artios At Home - Apple Podcasts', url: 'https://podcasts.apple.com/us/podcast/artios-at-home-artios-of-sugar-hill/id1840924354', icon: 'external', category: 'Artios At Home Podcast' },
    { id: 13, title: 'Artios At Home - Spotify', url: 'https://open.spotify.com/show/2GBsiEESrmOgtUaY8r2TQW', icon: 'external', category: 'Artios At Home Podcast' },
  ],

  faq: [
    { id: 1, question: 'What time does school start?', answer: 'Elementary (K-6): Mon (Academics) & Thu (Arts), 9:00 AM - 2:45 PM. Junior High (7-8): Mon (Academics) & Wed (Arts), 9:00 AM - 2:45 PM. High School (9-12): Tue (Academics) & Fri (Arts Conservatory), 9:00 AM - 2:45 PM / 4:30 PM on Fridays. Doors open at 8:50 AM.' },
    { id: 2, question: 'What is a University-Model school?', answer: 'Artios is a homeschool hybrid where students attend on-campus classes certain days and complete assignments at home on other days. Parents partner with teachers but do not need to teach academic content.' },
    { id: 3, question: 'What is the dress code?', answer: 'Artios t-shirt required with twill or denim pants/shorts. Shorts must be within 3 inches of the knee. No holes, rips, sweatpants, leggings, or jeggings. Hats not permitted indoors. T-shirts must fit properly (stay tucked when arms raised).' },
    { id: 4, question: 'How do I order lunch?', answer: 'Order through ArtiosCafe.com by 10 AM on class days, or bring lunch from home. Note: No heating or refrigeration available. Please avoid nut products due to student allergies.' },
    { id: 5, question: 'What is the weather/closure policy?', answer: 'If Gwinnett County OR Forsyth County public schools close due to weather, Artios closes. Check email/text alerts and social media for announcements.' },
    { id: 6, question: 'What is the cell phone policy?', answer: 'High School: Phones off and in backpacks during campus time (lobby use OK). K-8th: Phones turned into front desk upon arrival, picked up at dismissal.' },
    { id: 7, question: 'What if my child misses class?', answer: 'No make-up classes due to limited program time. Students must coordinate with teachers for missed work. Please give one week advance notice for planned absences.' },
    { id: 8, question: 'When should I keep my child home?', answer: 'Keep home if: fever, vomiting, diarrhea, persistent cough, pinkeye, head lice, or widespread rash. Head lice: No-nit policy - must be completely clear before returning.' },
  ],

  staffDirectory: [
    { id: 1, name: 'John Lane', title: 'Director', email: 'jmlane@artiosacademies.com', department: 'Administration' },
    { id: 2, name: 'Office Staff', title: 'Front Office', email: 'office@artiosacademies.com', department: 'Administration' },
  ],

  onboardingSteps: [
    { id: 1, title: 'Complete FACTS Enrollment', description: 'Finish all enrollment forms in the FACTS Family Portal', icon: 'file', link: 'https://accounts.renweb.com/Account/Login' },
    { id: 2, title: 'Read the Student Handbook', description: 'Review policies, dress code, and expectations', icon: 'book', link: '#' },
    { id: 3, title: 'Set Up Lunch Ordering', description: 'Create your ArtiosCafe.com account for meal orders', icon: 'external', link: 'https://artioscafe.com' },
    { id: 4, title: 'Join Class Communication', description: 'Check FACTS for teacher contacts and class info', icon: 'users', link: 'https://accounts.renweb.com/Account/Login' },
    { id: 5, title: 'Mark Your Calendar', description: 'Add school events and important dates', icon: 'calendar', link: 'https://calendar.google.com/calendar/embed?src=c_f1e327887d2f9739ac02c84e80fe02dceec209d06b4755d72eb5358c6ce9016b%40group.calendar.google.com' },
    { id: 6, title: 'Learn About Artios', description: 'Understand our university-model approach', icon: 'info', link: '#' },
  ],

  communityResources: [
    { id: 1, title: 'Artios Facebook Group', url: 'https://www.facebook.com/artiossugarhill', icon: 'users', description: 'Join our parent community' },
    { id: 2, title: 'Volunteer Opportunities', url: 'https://www.signupgenius.com/go/10C0549AAA82CA4F49-58166214-parent', icon: 'heart', description: 'Sign up to help at school' },
    { id: 3, title: 'Prayer Requests', url: '#', icon: 'heart', description: 'Submit prayer requests for our community' },
  ],

  schedules: {
    overview: [
      { id: 1, level: 'Elementary (K-6)', days: 'Mon (Academics) / Thu (Arts)', hours: '9:00 AM - 2:45 PM' },
      { id: 2, level: 'Junior High (7-8)', days: 'Mon (Academics) / Wed (Arts)', hours: '9:00 AM - 2:45 PM' },
      { id: 3, level: 'High School (9-12)', days: 'Tue (Academics) / Fri (Arts Conservatory)', hours: '9:00 AM - 2:45 PM / 4:30 PM' },
    ],
    fridayArts: [
      { id: 1, time: '9:00-9:30 AM', classes: ['HS Choreo Club I', 'Photography', 'Music Theory I', 'Engineering 1', 'Fundamentals of Visual Arts', 'Directing', 'Acting I', 'Elements of Production'] },
      { id: 2, time: '10:00-10:30 AM', classes: ['DM Ballet', 'Yearbook Club', 'Fundamentals of Film History', 'Fundamentals of Music', 'Worship Arts', 'Drawing/Painting I', 'Studio M I/II', 'Acting II', 'Worldview 10'] },
      { id: 3, time: '11:00-11:30 AM', classes: ['Conditioning', 'Graphic Design', 'Intro to CT & EC', 'Creative Writing I/II', 'Worldview 9-12', 'Drawing/Painting II', 'Fundamentals of Theatre History', 'Acting III'] },
      { id: 4, time: '12:00-12:30 PM', classes: ['Lunch'] },
      { id: 5, time: '12:30-1:00 PM', classes: ['Makeup', '3D Design 1', 'Illustrations', 'Worldview 9-12'] },
      { id: 6, time: '1:30-2:00 PM', classes: ['JH Contemporary', 'Editing I', 'Choir'] },
      { id: 7, time: '2:30-2:45 PM', classes: ['JH Hip Hop', 'Drama Club'] },
      { id: 8, time: '3:30-4:30 PM', classes: ['UE/JH Select Ballet (audition only)'] },
    ],
    mondayDance: [
      { id: 1, time: '9:30-10:30 AM', name: 'Jazz IV' },
      { id: 2, time: '10:30-11:30 AM', name: 'Hip Hop I / Contemporary III/IV / Jazz III' },
      { id: 3, time: '11:30-12:30 PM', name: 'Advanced Hip Hop' },
      { id: 4, time: '1:00-2:30 PM', name: 'Ballet' },
      { id: 5, time: '1:30-2:30 PM', name: 'Contemporary I/II (HS)' },
      { id: 6, time: '2:40-3:30 PM', name: 'Elementary Jazz A & B' },
      { id: 7, time: '3:30-4:15 PM', name: 'Elementary Hip Hop (Grades 4-6)' },
    ],
    artClub: {
      name: 'Lower Elementary Art Club',
      grades: 'K-3rd',
      time: '2:00-2:30 PM',
    },
  },

  announcements: [
    { id: 1, title: 'Welcome Back!', content: 'We hope everyone had a wonderful Christmas break. Classes resume January 5th for Elementary & JH, January 6th for HS.', date: '2026-01-05', priority: 'high' },
    { id: 2, title: 'Open House - January 12th', content: 'Join us for our Open House at 6:00 PM. Great opportunity for prospective families!', date: '2026-01-12', priority: 'normal' },
  ],

  upcomingEvents: [
    { id: 1, title: 'Elem & JH Academics Resume', date: '2026-01-05', time: 'All Day', location: 'Main Campus' },
    { id: 2, title: 'HS Academics Resume', date: '2026-01-06', time: 'All Day', location: 'Main Campus' },
    { id: 3, title: 'Artios Open House', date: '2026-01-12', time: '6:00 PM', location: 'Main Campus' },
    { id: 4, title: "Pilgrim's Progress - Dance Performance", date: '2026-01-16', time: '7:00 PM', location: 'Main Auditorium' },
    { id: 5, title: 'MLK Day - Artios Closed', date: '2026-01-19', time: 'All Day', location: '' },
    { id: 6, title: 'Senior Meeting (Parents & Students)', date: '2026-01-20', time: '4:00 PM', location: 'Room 101' },
    { id: 7, title: '9th Grade Preview Day', date: '2026-01-23', time: '9:00 AM', location: 'Main Campus' },
  ],

  documents: [
    { id: 1, title: '2025-2026 Open House Brochure', url: '/Updated Open House 25_26.pdf', category: 'About Artios' },
    { id: 2, title: '2025-2026 School Calendar', url: 'https://calendar.google.com/calendar/embed?src=c_f1e327887d2f9739ac02c84e80fe02dceec209d06b4755d72eb5358c6ce9016b%40group.calendar.google.com&ctz=America%2FNew_York', category: 'Calendar' },
    { id: 3, title: 'Order Lunch - Artios Cafe', url: 'https://artioscafe.com', category: 'Resources' },
    { id: 4, title: 'FACTS Family Portal', url: 'https://accounts.renweb.com/Account/Login', category: 'Resources' },
  ],

  schoolInfo: {
    name: 'Artios Academies of Sugar Hill',
    tagline: 'Art. Heart. Smart.',
    address: '415 Brogdon Road, Suwanee, GA 30024',
    email: 'jmlane@artiosacademies.com',
    director: 'John Lane'
  },

  aiSettings: {
    systemPrompt: `You are the Artios Connect assistant, here to help parents with questions about Artios Academies of Sugar Hill, Georgia. Never refer to yourself as "AI" or "artificial intelligence" - simply say you're "the assistant" or "Artios Connect" if asked.

IMPORTANT: You must ONLY provide information that is explicitly contained in this system prompt or the knowledge base. NEVER make up, fabricate, invent, or guess any information. If you don't know something or it's not in your knowledge, say so honestly and direct the parent to contact the school. Accuracy is more important than appearing helpful.

SCHOOL INFO:
- Name: Artios Academies of Sugar Hill
- Type: Christian Homeschool Hybrid / University-Model
- Tagline: Art. Heart. Smart.
- Address: 415 Brogdon Road, Suwanee, GA 30024
- Director: John Lane (jmlane@artiosacademies.com)
- Assistant Director: Jackie Thompson (jthompson@artiosacademies.com)
- Mission: Partners with parents to raise children who love God, know His Word, and are equipped to serve and reflect Christ

SCHEDULE (2025-2026):
- Elementary K-6th: Mon (Academics) & Thu (Arts) 9:00 AM-2:45 PM
- Junior High 7-8th: Mon (Academics) & Wed (Arts) 9:00 AM-2:45 PM
- High School 9-12th: Tue (Academics) & Fri (Arts Conservatory) 9:00 AM-2:45 PM / 4:30 PM on Fridays
- Fridays are the HS Arts Conservatory day - extended arts training until 4:30 PM
- Doors open 10 minutes before first class (8:50 AM)
- University-model: students attend campus certain days, complete assignments at home other days
- Parents partner with teachers but do not need to teach academic content

DRESS CODE (REQUIRED):
- Artios t-shirt must be worn with twill or denim pants/shorts
- Shorts must be within 3 inches of the top of the knee
- No holes, rips, or tears in clothing
- No sweatpants, leggings, jeggings, or tight/ripped jeans
- T-shirt must stay tucked when arms raised (proper size)
- Hats not permitted indoors
- Artios t-shirts cannot be altered

CELL PHONE POLICY:
- High School: Phones off and in backpacks during campus time. Confiscated if visible/audible. Lobby use permitted.
- K-8th Grade: Phones turned into front desk upon arrival, picked up at dismissal. Lobby use permitted.

ABSENCE POLICY:
- No make-up classes due to limited program time
- Students must coordinate with teachers for missed work
- Request one week advance notice for scheduled absences (except illness)

ILLNESS - KEEP CHILD HOME IF:
- Fever, vomiting, or diarrhea
- Persistent cough, chronic pain, widespread rash
- Pinkeye/conjunctivitis or head lice
- Head lice: No-nit policy - must be free of lice AND nits before returning

WEATHER POLICY:
- If Gwinnett County OR Forsyth County schools close, Artios closes
- Check email/text alerts and social media for announcements

LUNCH:
- Students bring lunch from home (no heating/refrigeration available)
- Or order through ArtiosCafe.com by 10 AM on class days
- Please avoid nut products due to student allergies

LATE WORK:
- Students expected fully prepared with assignments
- Notify teachers 48 hours before class if unable to complete work
- Extensions at teacher discretion per syllabus

GRADING SCALE:
- A = 100-90, B = 89-80, C = 79-70, D = 69-60, F = 59 and below
- Parents notified of C grades or below with improvement strategies

CONFLICT RESOLUTION:
- Student addresses issue with teacher first
- If unresolved, parents schedule conference
- Follows Matthew 18:15-22 biblical guidance

IMPORTANT LINKS & RESOURCES:
- FACTS Family Portal (grades, enrollment, student info): accounts.renweb.com
- Lunch Ordering: artioscafe.com (order by 10 AM on class days)
- School Calendar: Available on this app and Google Calendar
- Event Tickets: eventbrite.com/o/artios-academies-of-sugar-hill
- Volunteer Sign-Up (TA Sub): signupgenius.com
- Spirit Wear: duesouthdesigns.net/school-orders

ARTIOS AT HOME PODCAST:
- Weekly updates and insights from our school community
- Apple Podcasts: Search "Artios At Home" or visit podcasts.apple.com
- Spotify: Search "Artios At Home" or visit open.spotify.com
- Great resource for staying connected with school news and updates

SOCIAL MEDIA:
- Instagram: @artios_sugarhill
- Facebook: Artios Academies of Sugar Hill

CRITICAL INSTRUCTIONS:
1. ONLY provide information that is explicitly stated above or in the knowledge base
2. NEVER make up, invent, or guess information - if you don't have the answer, say "I don't have that specific information. Please contact the school office at office@artiosacademies.com or check the Student Handbook."
3. Be concise, friendly, and helpful
4. No markdown formatting (no **, ##, etc)
5. For student-specific grades/info, direct to FACTS Parent Portal
6. For sensitive topics, recommend contacting Mr. Lane directly
7. If asked about something not covered in your knowledge, DO NOT FABRICATE - instead direct them to the appropriate contact
8. When uncertain, err on the side of saying you don't have that information rather than guessing`,
    customInstructions: [],
    sensitiveTopics: 'For sensitive topics (gender identity, bullying, mental health, family situations, faith questions, discipline), always recommend contacting Mr. Lane directly for a personal conversation.'
  },

  parentCredentials: {
    password: 'artios2026'
  },

  notifications: []
};

// Suggested questions for the chat interface (full sentences for better UX)
export const suggestedQuestions = [
  'What do I need to pack for lunch?',
  'Is school open tomorrow?',
  'What time should I pick up?',
  'What can my kid wear?',
  'When is the next performance?',
  'How do I sign up to volunteer?'
];

export default initialData;

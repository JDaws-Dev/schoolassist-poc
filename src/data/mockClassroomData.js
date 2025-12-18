// Mock Google Classroom API Data for Artios Academies Sugar Hill
// This simulates what we'd get from the Classroom API with domain-wide delegation

export const courses = [
  {
    id: "course-001",
    name: "Academy of Arts & History - Jr High",
    section: "Period 1-2",
    descriptionHeading: "Integrated History, Drama, Art, and Music",
    room: "101",
    ownerId: "teacher-001",
    courseState: "ACTIVE"
  },
  {
    id: "course-002",
    name: "Pre-Algebra",
    section: "Period 3",
    descriptionHeading: "Math U See / Teaching Textbooks",
    room: "201",
    ownerId: "teacher-002",
    courseState: "ACTIVE"
  },
  {
    id: "course-003",
    name: "Preparatory Science",
    section: "Period 4",
    descriptionHeading: "Hands-on Science Labs",
    room: "Lab",
    ownerId: "teacher-003",
    courseState: "ACTIVE"
  },
  {
    id: "course-004",
    name: "Choir",
    section: "Period 5",
    descriptionHeading: "Vocal Music Performance",
    room: "Music Hall",
    ownerId: "teacher-001",
    courseState: "ACTIVE"
  },
  {
    id: "course-005",
    name: "Conservatory - Theatre Major",
    section: "Full Day",
    descriptionHeading: "Advanced Theatre Studies",
    room: "Theatre",
    ownerId: "teacher-004",
    courseState: "ACTIVE"
  }
];

export const assignments = [
  // Academy of Arts & History
  {
    id: "assign-001",
    courseId: "course-001",
    title: "Renaissance Art Project",
    description: "Create a piece inspired by Renaissance masters. Include written reflection on techniques used.",
    dueDate: "2025-12-20",
    dueTime: "23:59:00",
    maxPoints: 100,
    state: "PUBLISHED"
  },
  {
    id: "assign-002",
    courseId: "course-001",
    title: "Historical Figure Presentation",
    description: "5-minute presentation on assigned historical figure from the Renaissance period.",
    dueDate: "2025-12-18",
    dueTime: "14:00:00",
    maxPoints: 50,
    state: "PUBLISHED"
  },
  {
    id: "assign-003",
    courseId: "course-001",
    title: "Drama Scene Performance",
    description: "Perform memorized scene from Shakespeare. Partner work allowed.",
    dueDate: "2025-12-22",
    dueTime: "14:00:00",
    maxPoints: 75,
    state: "PUBLISHED"
  },

  // Pre-Algebra
  {
    id: "assign-004",
    courseId: "course-002",
    title: "Chapter 5 Practice Problems",
    description: "Complete problems 1-30 on pages 142-145. Show all work.",
    dueDate: "2025-12-17",
    dueTime: "23:59:00",
    maxPoints: 30,
    state: "PUBLISHED"
  },
  {
    id: "assign-005",
    courseId: "course-002",
    title: "Chapter 5 Test",
    description: "Test covering fractions, decimals, and percentages.",
    dueDate: "2025-12-19",
    dueTime: "14:00:00",
    maxPoints: 100,
    state: "PUBLISHED"
  },

  // Science
  {
    id: "assign-006",
    courseId: "course-003",
    title: "Lab Report: Chemical Reactions",
    description: "Write up lab report from Wednesday's experiment. Include hypothesis, procedure, results, and conclusion.",
    dueDate: "2025-12-18",
    dueTime: "23:59:00",
    maxPoints: 50,
    state: "PUBLISHED"
  },
  {
    id: "assign-007",
    courseId: "course-003",
    title: "Science Fair Project Proposal",
    description: "Submit your science fair project proposal. Include research question, hypothesis, and materials list.",
    dueDate: "2025-12-20",
    dueTime: "23:59:00",
    maxPoints: 25,
    state: "PUBLISHED"
  },

  // Choir
  {
    id: "assign-008",
    courseId: "course-004",
    title: "Christmas Concert Attendance",
    description: "Mandatory attendance at Christmas Concert. Arrive by 6:00 PM in concert attire.",
    dueDate: "2025-12-19",
    dueTime: "19:00:00",
    maxPoints: 100,
    state: "PUBLISHED"
  },

  // Conservatory Theatre
  {
    id: "assign-009",
    courseId: "course-005",
    title: "Monologue Performance",
    description: "Perform your prepared 2-minute dramatic monologue.",
    dueDate: "2025-12-17",
    dueTime: "10:00:00",
    maxPoints: 100,
    state: "PUBLISHED"
  },
  {
    id: "assign-010",
    courseId: "course-005",
    title: "Character Analysis Essay",
    description: "2-page analysis of your monologue character's motivations and background.",
    dueDate: "2025-12-18",
    dueTime: "23:59:00",
    maxPoints: 50,
    state: "PUBLISHED"
  }
];

export const submissions = [
  // Emma Martinez submissions
  { id: "sub-001", assignmentId: "assign-001", studentId: "stu-001", state: "TURNED_IN", grade: null },
  { id: "sub-002", assignmentId: "assign-002", studentId: "stu-001", state: "TURNED_IN", grade: 48 },
  { id: "sub-003", assignmentId: "assign-003", studentId: "stu-001", state: "CREATED", grade: null }, // Not submitted
  { id: "sub-004", assignmentId: "assign-004", studentId: "stu-001", state: "TURNED_IN", grade: 28 },
  { id: "sub-005", assignmentId: "assign-005", studentId: "stu-001", state: "CREATED", grade: null }, // Upcoming
  { id: "sub-006", assignmentId: "assign-006", studentId: "stu-001", state: "MISSING", grade: 0 }, // MISSING
  { id: "sub-007", assignmentId: "assign-007", studentId: "stu-001", state: "CREATED", grade: null },
  { id: "sub-008", assignmentId: "assign-008", studentId: "stu-001", state: "CREATED", grade: null },

  // Liam Johnson submissions
  { id: "sub-009", assignmentId: "assign-001", studentId: "stu-004", state: "TURNED_IN", grade: 72 },
  { id: "sub-010", assignmentId: "assign-002", studentId: "stu-004", state: "MISSING", grade: 0 },
  { id: "sub-011", assignmentId: "assign-003", studentId: "stu-004", state: "CREATED", grade: null },
  { id: "sub-012", assignmentId: "assign-004", studentId: "stu-004", state: "MISSING", grade: 0 },
  { id: "sub-013", assignmentId: "assign-005", studentId: "stu-004", state: "CREATED", grade: null },

  // Sophia Johnson submissions (Theatre)
  { id: "sub-014", assignmentId: "assign-009", studentId: "stu-003", state: "TURNED_IN", grade: 95 },
  { id: "sub-015", assignmentId: "assign-010", studentId: "stu-003", state: "TURNED_IN", grade: 92 },

  // Noah Williams submissions
  { id: "sub-016", assignmentId: "assign-001", studentId: "stu-006", state: "TURNED_IN", grade: 88 },
  { id: "sub-017", assignmentId: "assign-002", studentId: "stu-006", state: "TURNED_IN", grade: 45 },
  { id: "sub-018", assignmentId: "assign-003", studentId: "stu-006", state: "CREATED", grade: null },
  { id: "sub-019", assignmentId: "assign-006", studentId: "stu-006", state: "TURNED_IN", grade: 47 },
  { id: "sub-020", assignmentId: "assign-007", studentId: "stu-006", state: "TURNED_IN", grade: null }
];

// Helper functions
export function getAssignmentsByCourse(courseId) {
  return assignments.filter(a => a.courseId === courseId);
}

export function getStudentSubmissions(studentId) {
  return submissions.filter(s => s.studentId === studentId).map(sub => {
    const assignment = assignments.find(a => a.id === sub.assignmentId);
    const course = courses.find(c => c.id === assignment?.courseId);
    return {
      ...sub,
      assignment,
      course
    };
  });
}

export function getMissingAssignments(studentId) {
  const studentSubs = getStudentSubmissions(studentId);
  return studentSubs.filter(s =>
    s.state === "MISSING" ||
    (s.state === "CREATED" && new Date(s.assignment?.dueDate) < new Date())
  );
}

export function getUpcomingAssignments(studentId) {
  const studentSubs = getStudentSubmissions(studentId);
  const now = new Date();
  return studentSubs.filter(s => {
    const dueDate = new Date(s.assignment?.dueDate);
    return dueDate >= now && s.state !== "TURNED_IN";
  }).sort((a, b) => new Date(a.assignment.dueDate) - new Date(b.assignment.dueDate));
}

export function getAssignmentsDueThisWeek() {
  const now = new Date();
  const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  return assignments.filter(a => {
    const dueDate = new Date(a.dueDate);
    return dueDate >= now && dueDate <= weekFromNow;
  }).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
}

export function getStudentsWithMissingWork() {
  const studentsWithMissing = [];
  const studentIds = [...new Set(submissions.map(s => s.studentId))];

  studentIds.forEach(studentId => {
    const missing = getMissingAssignments(studentId);
    if (missing.length > 0) {
      studentsWithMissing.push({
        studentId,
        missingCount: missing.length,
        assignments: missing
      });
    }
  });

  return studentsWithMissing.sort((a, b) => b.missingCount - a.missingCount);
}

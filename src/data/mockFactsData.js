// Mock FACTS/RenWeb API Data for Artios Academies Sugar Hill
// This simulates what we'd get from the OneRoster API

export const students = [
  {
    id: "stu-001",
    firstName: "Emma",
    lastName: "Martinez",
    gradeLevel: 7,
    email: "emma.martinez@student.artios.edu",
    enrollmentStatus: "active",
    familyId: "fam-001",
    division: "Junior High"
  },
  {
    id: "stu-002",
    firstName: "Lucas",
    lastName: "Martinez",
    gradeLevel: 5,
    email: "lucas.martinez@student.artios.edu",
    enrollmentStatus: "active",
    familyId: "fam-001",
    division: "Upper Elementary"
  },
  {
    id: "stu-003",
    firstName: "Sophia",
    lastName: "Johnson",
    gradeLevel: 10,
    email: "sophia.johnson@student.artios.edu",
    enrollmentStatus: "active",
    familyId: "fam-002",
    division: "High School"
  },
  {
    id: "stu-004",
    firstName: "Liam",
    lastName: "Johnson",
    gradeLevel: 7,
    email: "liam.johnson@student.artios.edu",
    enrollmentStatus: "active",
    familyId: "fam-002",
    division: "Junior High"
  },
  {
    id: "stu-005",
    firstName: "Olivia",
    lastName: "Williams",
    gradeLevel: 3,
    email: "olivia.williams@student.artios.edu",
    enrollmentStatus: "active",
    familyId: "fam-003",
    division: "Lower Elementary"
  },
  {
    id: "stu-006",
    firstName: "Noah",
    lastName: "Williams",
    gradeLevel: 8,
    email: "noah.williams@student.artios.edu",
    enrollmentStatus: "active",
    familyId: "fam-003",
    division: "Junior High"
  },
  {
    id: "stu-007",
    firstName: "Ava",
    lastName: "Brown",
    gradeLevel: 11,
    email: "ava.brown@student.artios.edu",
    enrollmentStatus: "active",
    familyId: "fam-004",
    division: "High School"
  },
  {
    id: "stu-008",
    firstName: "Ethan",
    lastName: "Davis",
    gradeLevel: 6,
    email: "ethan.davis@student.artios.edu",
    enrollmentStatus: "active",
    familyId: "fam-005",
    division: "Upper Elementary"
  },
  {
    id: "stu-009",
    firstName: "Isabella",
    lastName: "Garcia",
    gradeLevel: 9,
    email: "isabella.garcia@student.artios.edu",
    enrollmentStatus: "active",
    familyId: "fam-006",
    division: "High School"
  },
  {
    id: "stu-010",
    firstName: "Mason",
    lastName: "Garcia",
    gradeLevel: 4,
    email: "mason.garcia@student.artios.edu",
    enrollmentStatus: "active",
    familyId: "fam-006",
    division: "Upper Elementary"
  }
];

export const families = [
  {
    id: "fam-001",
    name: "Martinez Family",
    parents: [
      { name: "Maria Martinez", email: "maria.martinez@email.com", phone: "770-555-0101" },
      { name: "Carlos Martinez", email: "carlos.martinez@email.com", phone: "770-555-0102" }
    ],
    students: ["stu-001", "stu-002"]
  },
  {
    id: "fam-002",
    name: "Johnson Family",
    parents: [
      { name: "Jennifer Johnson", email: "jennifer.johnson@email.com", phone: "770-555-0201" },
      { name: "Michael Johnson", email: "michael.johnson@email.com", phone: "770-555-0202" }
    ],
    students: ["stu-003", "stu-004"]
  },
  {
    id: "fam-003",
    name: "Williams Family",
    parents: [
      { name: "Sarah Williams", email: "sarah.williams@email.com", phone: "770-555-0301" }
    ],
    students: ["stu-005", "stu-006"]
  },
  {
    id: "fam-004",
    name: "Brown Family",
    parents: [
      { name: "Amanda Brown", email: "amanda.brown@email.com", phone: "770-555-0401" },
      { name: "David Brown", email: "david.brown@email.com", phone: "770-555-0402" }
    ],
    students: ["stu-007"]
  },
  {
    id: "fam-005",
    name: "Davis Family",
    parents: [
      { name: "Emily Davis", email: "emily.davis@email.com", phone: "770-555-0501" }
    ],
    students: ["stu-008"]
  },
  {
    id: "fam-006",
    name: "Garcia Family",
    parents: [
      { name: "Rosa Garcia", email: "rosa.garcia@email.com", phone: "770-555-0601" },
      { name: "Miguel Garcia", email: "miguel.garcia@email.com", phone: "770-555-0602" }
    ],
    students: ["stu-009", "stu-010"]
  }
];

export const classes = [
  // Academy of Arts and History
  { id: "cls-001", name: "Academy of Arts & History - Jr High", teacher: "Mrs. Anderson", room: "101", gradeLevel: "7-8", program: "Academy" },
  { id: "cls-002", name: "Academy of Arts & History - Upper Elem", teacher: "Mrs. Thompson", room: "102", gradeLevel: "4-6", program: "Academy" },
  { id: "cls-003", name: "Academy of Arts & History - Lower Elem", teacher: "Mrs. Garcia", room: "103", gradeLevel: "1-3", program: "Academy" },

  // Conservatory (High School)
  { id: "cls-004", name: "Conservatory - Music Major", teacher: "Mr. Phillips", room: "Music Hall", gradeLevel: "9-12", program: "Conservatory" },
  { id: "cls-005", name: "Conservatory - Theatre Major", teacher: "Mrs. Lane", room: "Theatre", gradeLevel: "9-12", program: "Conservatory" },
  { id: "cls-006", name: "Conservatory - Visual Arts Major", teacher: "Mr. Roberts", room: "Art Studio", gradeLevel: "9-12", program: "Conservatory" },

  // Preparatory
  { id: "cls-007", name: "Preparatory Math - Pre-Algebra", teacher: "Mr. Chen", room: "201", gradeLevel: "7-8", program: "Preparatory" },
  { id: "cls-008", name: "Preparatory Math - Algebra I", teacher: "Mr. Chen", room: "201", gradeLevel: "8-9", program: "Preparatory" },
  { id: "cls-009", name: "Preparatory Science", teacher: "Mrs. Nelson", room: "Lab", gradeLevel: "7-8", program: "Preparatory" },

  // Electives
  { id: "cls-010", name: "Choir", teacher: "Mrs. Anderson", room: "Music Hall", gradeLevel: "4-12", program: "Elective" },
  { id: "cls-011", name: "Drama Club", teacher: "Mrs. Lane", room: "Theatre", gradeLevel: "4-12", program: "Elective" },
  { id: "cls-012", name: "Dance", teacher: "Miss Taylor", room: "Dance Studio", gradeLevel: "K-12", program: "Elective" },
  { id: "cls-013", name: "Spanish I", teacher: "Señora Ramirez", room: "204", gradeLevel: "7-12", program: "Elective" },
  { id: "cls-014", name: "Art Club", teacher: "Mr. Roberts", room: "Art Studio", gradeLevel: "4-12", program: "Elective" }
];

export const enrollments = [
  // Emma Martinez (7th grade)
  { studentId: "stu-001", classId: "cls-001" }, // Academy Jr High
  { studentId: "stu-001", classId: "cls-007" }, // Pre-Algebra
  { studentId: "stu-001", classId: "cls-009" }, // Science
  { studentId: "stu-001", classId: "cls-010" }, // Choir
  { studentId: "stu-001", classId: "cls-012" }, // Dance

  // Lucas Martinez (5th grade)
  { studentId: "stu-002", classId: "cls-002" }, // Academy Upper Elem
  { studentId: "stu-002", classId: "cls-010" }, // Choir

  // Sophia Johnson (10th grade)
  { studentId: "stu-003", classId: "cls-005" }, // Conservatory Theatre
  { studentId: "stu-003", classId: "cls-011" }, // Drama Club

  // Liam Johnson (7th grade)
  { studentId: "stu-004", classId: "cls-001" }, // Academy Jr High
  { studentId: "stu-004", classId: "cls-007" }, // Pre-Algebra
  { studentId: "stu-004", classId: "cls-010" }, // Choir

  // Olivia Williams (3rd grade)
  { studentId: "stu-005", classId: "cls-003" }, // Academy Lower Elem
  { studentId: "stu-005", classId: "cls-012" }, // Dance

  // Noah Williams (8th grade)
  { studentId: "stu-006", classId: "cls-001" }, // Academy Jr High
  { studentId: "stu-006", classId: "cls-008" }, // Algebra I
  { studentId: "stu-006", classId: "cls-009" }, // Science
  { studentId: "stu-006", classId: "cls-011" }, // Drama Club

  // Ava Brown (11th grade)
  { studentId: "stu-007", classId: "cls-004" }, // Conservatory Music
  { studentId: "stu-007", classId: "cls-010" }, // Choir
  { studentId: "stu-007", classId: "cls-013" }, // Spanish I

  // Ethan Davis (6th grade)
  { studentId: "stu-008", classId: "cls-002" }, // Academy Upper Elem
  { studentId: "stu-008", classId: "cls-014" }, // Art Club

  // Isabella Garcia (9th grade)
  { studentId: "stu-009", classId: "cls-006" }, // Conservatory Visual Arts
  { studentId: "stu-009", classId: "cls-014" }, // Art Club
  { studentId: "stu-009", classId: "cls-012" }, // Dance

  // Mason Garcia (4th grade)
  { studentId: "stu-010", classId: "cls-002" }, // Academy Upper Elem
  { studentId: "stu-010", classId: "cls-012" }  // Dance
];

export const grades = [
  // Emma Martinez grades
  { studentId: "stu-001", classId: "cls-001", grade: 92, letterGrade: "A-" },
  { studentId: "stu-001", classId: "cls-007", grade: 84, letterGrade: "B" },
  { studentId: "stu-001", classId: "cls-009", grade: 88, letterGrade: "B+" },
  { studentId: "stu-001", classId: "cls-010", grade: 95, letterGrade: "A" },
  { studentId: "stu-001", classId: "cls-012", grade: 98, letterGrade: "A+" },

  // Lucas Martinez grades (elementary - progress feedback)
  { studentId: "stu-002", classId: "cls-002", grade: null, progress: "Exceeding Expectations" },
  { studentId: "stu-002", classId: "cls-010", grade: null, progress: "Meeting Expectations" },

  // Sophia Johnson grades
  { studentId: "stu-003", classId: "cls-005", grade: 96, letterGrade: "A" },
  { studentId: "stu-003", classId: "cls-011", grade: 94, letterGrade: "A" },

  // Liam Johnson grades
  { studentId: "stu-004", classId: "cls-001", grade: 78, letterGrade: "C+" },
  { studentId: "stu-004", classId: "cls-007", grade: 72, letterGrade: "C-" },
  { studentId: "stu-004", classId: "cls-010", grade: 88, letterGrade: "B+" },

  // Noah Williams grades
  { studentId: "stu-006", classId: "cls-001", grade: 91, letterGrade: "A-" },
  { studentId: "stu-006", classId: "cls-008", grade: 85, letterGrade: "B" },
  { studentId: "stu-006", classId: "cls-009", grade: 89, letterGrade: "B+" },
  { studentId: "stu-006", classId: "cls-011", grade: 93, letterGrade: "A" },

  // Ava Brown grades
  { studentId: "stu-007", classId: "cls-004", grade: 98, letterGrade: "A+" },
  { studentId: "stu-007", classId: "cls-010", grade: 96, letterGrade: "A" },
  { studentId: "stu-007", classId: "cls-013", grade: 91, letterGrade: "A-" },

  // Isabella Garcia grades
  { studentId: "stu-009", classId: "cls-006", grade: 94, letterGrade: "A" },
  { studentId: "stu-009", classId: "cls-014", grade: 97, letterGrade: "A+" },
  { studentId: "stu-009", classId: "cls-012", grade: 92, letterGrade: "A-" }
];

// Helper functions to query the mock data
export function getStudentById(id) {
  return students.find(s => s.id === id);
}

export function getStudentsByFamily(familyId) {
  return students.filter(s => s.familyId === familyId);
}

export function getSiblings(studentId) {
  const student = getStudentById(studentId);
  if (!student) return [];
  return students.filter(s => s.familyId === student.familyId && s.id !== studentId);
}

export function getStudentsInClass(classId) {
  const studentIds = enrollments.filter(e => e.classId === classId).map(e => e.studentId);
  return students.filter(s => studentIds.includes(s.id));
}

export function getStudentClasses(studentId) {
  const classIds = enrollments.filter(e => e.studentId === studentId).map(e => e.classId);
  return classes.filter(c => classIds.includes(c.id));
}

export function getStudentGrades(studentId) {
  return grades.filter(g => g.studentId === studentId).map(g => {
    const cls = classes.find(c => c.id === g.classId);
    return { ...g, className: cls?.name, teacher: cls?.teacher };
  });
}

export function getStudentsInMultiplePrograms(program1, program2) {
  // Find students enrolled in classes from both programs
  const studentsInProgram1 = new Set();
  const studentsInProgram2 = new Set();

  enrollments.forEach(e => {
    const cls = classes.find(c => c.id === e.classId);
    if (cls?.program === program1 || cls?.name.toLowerCase().includes(program1.toLowerCase())) {
      studentsInProgram1.add(e.studentId);
    }
    if (cls?.program === program2 || cls?.name.toLowerCase().includes(program2.toLowerCase())) {
      studentsInProgram2.add(e.studentId);
    }
  });

  // Find intersection
  const bothPrograms = [...studentsInProgram1].filter(id => studentsInProgram2.has(id));
  return bothPrograms.map(id => getStudentById(id));
}

export function getStudentsInActivity(activityName) {
  const matchingClasses = classes.filter(c =>
    c.name.toLowerCase().includes(activityName.toLowerCase())
  );
  const classIds = matchingClasses.map(c => c.id);
  const studentIds = [...new Set(enrollments.filter(e => classIds.includes(e.classId)).map(e => e.studentId))];
  return studentIds.map(id => getStudentById(id));
}

export function getFamilyByStudentId(studentId) {
  const student = getStudentById(studentId);
  if (!student) return null;
  return families.find(f => f.id === student.familyId);
}

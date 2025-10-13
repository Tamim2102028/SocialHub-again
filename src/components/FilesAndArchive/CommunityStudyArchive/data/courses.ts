// Types
export interface Folder {
  id: string;
  name: string;
  type: "lectures" | "questions" | "solutions" | "videos" | "notes";
  fileCount: number;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  type: "theory" | "sessional";
  fileCount: number;
  level: string;
  term: string;
  folders: Folder[];
}

// Types
export interface Folder {
  id: string;
  name: string;
  type: "lectures" | "questions" | "solutions" | "videos" | "notes";
  fileCount: number;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  type: "theory" | "sessional";
  fileCount: number;
  level: string;
  term: string;
  folders: Folder[];
}

// Helper function to generate folders for each course
const generateCourseFolders = (courseId: string): Folder[] => [
  {
    id: `${courseId}-lectures`,
    name: "Lecture Slides",
    type: "lectures",
    fileCount: Math.floor(Math.random() * 15) + 5 // 5-20 files
  },
  {
    id: `${courseId}-questions`,
    name: "Previous Year Questions",
    type: "questions",
    fileCount: Math.floor(Math.random() * 10) + 3 // 3-13 files
  },
  {
    id: `${courseId}-solutions`,
    name: "Question Solutions",
    type: "solutions",
    fileCount: Math.floor(Math.random() * 8) + 2 // 2-10 files
  },
  {
    id: `${courseId}-videos`,
    name: "Recorded Videos",
    type: "videos",
    fileCount: Math.floor(Math.random() * 12) + 2 // 2-14 files
  },
  {
    id: `${courseId}-notes`,
    name: "Hand Notes",
    type: "notes",
    fileCount: Math.floor(Math.random() * 20) + 5 // 5-25 files
  }
];

// Complete list of all courses by level and term
export const coursesData: Course[] = [
  // Level 1, Term 1 - Theory Courses
  {
    id: "l1t1-theory-1",
    name: "Programming Fundamentals",
    code: "CSE 101",
    type: "theory",
    fileCount: 28,
    level: "Level 1",
    term: "Term 1",
    folders: generateCourseFolders("l1t1-theory-1")
  },
  {
    id: "l1t1-theory-2",
    name: "Chemistry",
    code: "Chem 101",
    type: "theory",
    fileCount: 16,
    level: "Level 1",
    term: "Term 1",
    folders: generateCourseFolders("l1t1-theory-2")
  },
  {
    id: "l1t1-theory-3",
    name: "Calculus I",
    code: "Math 101",
    type: "theory",
    fileCount: 22,
    level: "Level 1",
    term: "Term 1",
    folders: generateCourseFolders("l1t1-theory-3")
  },
  {
    id: "l1t1-theory-4",
    name: "English",
    code: "ENG 101",
    type: "theory",
    fileCount: 12,
    level: "Level 1",
    term: "Term 1",
    folders: generateCourseFolders("l1t1-theory-4")
  },
  {
    id: "l1t1-theory-5",
    name: "Physics I",
    code: "PHY 101",
    type: "theory",
    fileCount: 18,
    level: "Level 1",
    term: "Term 1",
    folders: generateCourseFolders("l1t1-theory-5")
  },

  // Level 1, Term 1 - Sessional Courses
  {
    id: "l1t1-sessional-1",
    name: "Programming Sessional",
    code: "CSE 102",
    type: "sessional",
    fileCount: 15,
    level: "Level 1",
    term: "Term 1",
    folders: generateCourseFolders("l1t1-sessional-1")
  },
  {
    id: "l1t1-sessional-2",
    name: "Chemistry Sessional",
    code: "Chem 102",
    type: "sessional",
    fileCount: 8,
    level: "Level 1",
    term: "Term 1",
    folders: generateCourseFolders("l1t1-sessional-2")
  },
  {
    id: "l1t1-sessional-3",
    name: "Physics Sessional",
    code: "PHY 102",
    type: "sessional",
    fileCount: 10,
    level: "Level 1",
    term: "Term 1",
    folders: generateCourseFolders("l1t1-sessional-3")
  },

  // Level 1, Term 2 - Theory Courses
  {
    id: "l1t2-theory-1",
    name: "Data Structures",
    code: "CSE 103",
    type: "theory",
    fileCount: 25,
    level: "Level 1",
    term: "Term 2",
    folders: generateCourseFolders("l1t2-theory-1")
  },
  {
    id: "l1t2-theory-2",
    name: "Mechanics",
    code: "PHY 103",
    type: "theory",
    fileCount: 20,
    level: "Level 1",
    term: "Term 2",
    folders: generateCourseFolders("l1t2-theory-2")
  },
  {
    id: "l1t2-theory-3",
    name: "Calculus II",
    code: "Math 103",
    type: "theory",
    fileCount: 19,
    level: "Level 1",
    term: "Term 2",
    folders: generateCourseFolders("l1t2-theory-3")
  },
  {
    id: "l1t2-theory-4",
    name: "Electrical Circuits",
    code: "EEE 101",
    type: "theory",
    fileCount: 23,
    level: "Level 1",
    term: "Term 2",
    folders: generateCourseFolders("l1t2-theory-4")
  },
  {
    id: "l1t2-theory-5",
    name: "Engineering Drawing",
    code: "ME 101",
    type: "theory",
    fileCount: 14,
    level: "Level 1",
    term: "Term 2",
    folders: generateCourseFolders("l1t2-theory-5")
  },

  // Level 1, Term 2 - Sessional Courses
  {
    id: "l1t2-sessional-1",
    name: "Data Structures Sessional",
    code: "CSE 104",
    type: "sessional",
    fileCount: 12,
    level: "Level 1",
    term: "Term 2",
    folders: generateCourseFolders("l1t2-sessional-1")
  },
  {
    id: "l1t2-sessional-2",
    name: "Mechanics Sessional",
    code: "PHY 104",
    type: "sessional",
    fileCount: 9,
    level: "Level 1",
    term: "Term 2",
    folders: generateCourseFolders("l1t2-sessional-2")
  },
  {
    id: "l1t2-sessional-3",
    name: "Electrical Circuits Sessional",
    code: "EEE 102",
    type: "sessional",
    fileCount: 11,
    level: "Level 1",
    term: "Term 2",
    folders: generateCourseFolders("l1t2-sessional-3")
  },

  // Level 2, Term 1 - Theory Courses
  {
    id: "l2t1-theory-1",
    name: "Thermodynamics",
    code: "ChE 201",
    type: "theory",
    fileCount: 24,
    level: "Level 2",
    term: "Term 1",
    folders: generateCourseFolders("l2t1-theory-1")
  },
  {
    id: "l2t1-theory-2",
    name: "Advanced Data Structures",
    code: "CSE 205",
    type: "theory",
    fileCount: 21,
    level: "Level 2",
    term: "Term 1",
    folders: generateCourseFolders("l2t1-theory-2")
  },
  {
    id: "l2t1-theory-3",
    name: "Electronics",
    code: "EEE 207",
    type: "theory",
    fileCount: 15,
    level: "Level 2",
    term: "Term 1",
    folders: generateCourseFolders("l2t1-theory-3")
  },
  {
    id: "l2t1-theory-4",
    name: "Differential Equations",
    code: "Math 201",
    type: "theory",
    fileCount: 17,
    level: "Level 2",
    term: "Term 1",
    folders: generateCourseFolders("l2t1-theory-4")
  },
  {
    id: "l2t1-theory-5",
    name: "Fluid Mechanics",
    code: "ME 201",
    type: "theory",
    fileCount: 19,
    level: "Level 2",
    term: "Term 1",
    folders: generateCourseFolders("l2t1-theory-5")
  },

  // Level 2, Term 1 - Sessional Courses
  {
    id: "l2t1-sessional-1",
    name: "Thermodynamics Sessional",
    code: "ChE 202",
    type: "sessional",
    fileCount: 6,
    level: "Level 2",
    term: "Term 1",
    folders: generateCourseFolders("l2t1-sessional-1")
  },
  {
    id: "l2t1-sessional-2",
    name: "Data Structures Sessional",
    code: "CSE 206",
    type: "sessional",
    fileCount: 9,
    level: "Level 2",
    term: "Term 1",
    folders: generateCourseFolders("l2t1-sessional-2")
  },
  {
    id: "l2t1-sessional-3",
    name: "Electronics Sessional",
    code: "EEE 208",
    type: "sessional",
    fileCount: 11,
    level: "Level 2",
    term: "Term 1",
    folders: generateCourseFolders("l2t1-sessional-3")
  },

  // Level 2, Term 2 - Theory Courses
  {
    id: "l2t2-theory-1",
    name: "Heat Transfer",
    code: "ChE 203",
    type: "theory",
    fileCount: 22,
    level: "Level 2",
    term: "Term 2",
    folders: generateCourseFolders("l2t2-theory-1")
  },
  {
    id: "l2t2-theory-2",
    name: "Algorithms",
    code: "CSE 207",
    type: "theory",
    fileCount: 26,
    level: "Level 2",
    term: "Term 2",
    folders: generateCourseFolders("l2t2-theory-2")
  },
  {
    id: "l2t2-theory-3",
    name: "Digital Logic Design",
    code: "EEE 209",
    type: "theory",
    fileCount: 19,
    level: "Level 2",
    term: "Term 2",
    folders: generateCourseFolders("l2t2-theory-3")
  },
  {
    id: "l2t2-theory-4",
    name: "Statistics",
    code: "Math 203",
    type: "theory",
    fileCount: 16,
    level: "Level 2",
    term: "Term 2",
    folders: generateCourseFolders("l2t2-theory-4")
  },
  {
    id: "l2t2-theory-5",
    name: "Materials Science",
    code: "ME 203",
    type: "theory",
    fileCount: 14,
    level: "Level 2",
    term: "Term 2",
    folders: generateCourseFolders("l2t2-theory-5")
  },

  // Level 2, Term 2 - Sessional Courses
  {
    id: "l2t2-sessional-1",
    name: "Heat Transfer Sessional",
    code: "ChE 204",
    type: "sessional",
    fileCount: 8,
    level: "Level 2",
    term: "Term 2",
    folders: generateCourseFolders("l2t2-sessional-1")
  },
  {
    id: "l2t2-sessional-2",
    name: "Algorithms Sessional",
    code: "CSE 208",
    type: "sessional",
    fileCount: 10,
    level: "Level 2",
    term: "Term 2",
    folders: generateCourseFolders("l2t2-sessional-2")
  },
  {
    id: "l2t2-sessional-3",
    name: "Digital Logic Sessional",
    code: "EEE 210",
    type: "sessional",
    fileCount: 7,
    level: "Level 2",
    term: "Term 2",
    folders: generateCourseFolders("l2t2-sessional-3")
  },

  // Level 3, Term 1 - Theory Courses
  {
    id: "l3t1-theory-1",
    name: "Mass Transfer",
    code: "ChE 301",
    type: "theory",
    fileCount: 20,
    level: "Level 3",
    term: "Term 1",
    folders: generateCourseFolders("l3t1-theory-1")
  },
  {
    id: "l3t1-theory-2",
    name: "Database Systems",
    code: "CSE 305",
    type: "theory",
    fileCount: 24,
    level: "Level 3",
    term: "Term 1",
    folders: generateCourseFolders("l3t1-theory-2")
  },
  {
    id: "l3t1-theory-3",
    name: "Microprocessors",
    code: "EEE 307",
    type: "theory",
    fileCount: 18,
    level: "Level 3",
    term: "Term 1",
    folders: generateCourseFolders("l3t1-theory-3")
  },
  {
    id: "l3t1-theory-4",
    name: "Numerical Methods",
    code: "Math 301",
    type: "theory",
    fileCount: 15,
    level: "Level 3",
    term: "Term 1",
    folders: generateCourseFolders("l3t1-theory-4")
  },
  {
    id: "l3t1-theory-5",
    name: "Machine Design",
    code: "ME 301",
    type: "theory",
    fileCount: 17,
    level: "Level 3",
    term: "Term 1",
    folders: generateCourseFolders("l3t1-theory-5")
  },

  // Level 3, Term 1 - Sessional Courses
  {
    id: "l3t1-sessional-1",
    name: "Mass Transfer Sessional",
    code: "ChE 302",
    type: "sessional",
    fileCount: 9,
    level: "Level 3",
    term: "Term 1",
    folders: generateCourseFolders("l3t1-sessional-1")
  },
  {
    id: "l3t1-sessional-2",
    name: "Database Sessional",
    code: "CSE 306",
    type: "sessional",
    fileCount: 12,
    level: "Level 3",
    term: "Term 1",
    folders: generateCourseFolders("l3t1-sessional-2")
  },
  {
    id: "l3t1-sessional-3",
    name: "Microprocessors Sessional",
    code: "EEE 308",
    type: "sessional",
    fileCount: 8,
    level: "Level 3",
    term: "Term 1",
    folders: generateCourseFolders("l3t1-sessional-3")
  },

  // Level 3, Term 2 - Theory Courses
  {
    id: "l3t2-theory-1",
    name: "Process Control",
    code: "ChE 303",
    type: "theory",
    fileCount: 21,
    level: "Level 3",
    term: "Term 2",
    folders: generateCourseFolders("l3t2-theory-1")
  },
  {
    id: "l3t2-theory-2",
    name: "Software Engineering",
    code: "CSE 307",
    type: "theory",
    fileCount: 28,
    level: "Level 3",
    term: "Term 2",
    folders: generateCourseFolders("l3t2-theory-2")
  },
  {
    id: "l3t2-theory-3",
    name: "Communication Systems",
    code: "EEE 309",
    type: "theory",
    fileCount: 19,
    level: "Level 3",
    term: "Term 2",
    folders: generateCourseFolders("l3t2-theory-3")
  },
  {
    id: "l3t2-theory-4",
    name: "Operations Research",
    code: "Math 303",
    type: "theory",
    fileCount: 16,
    level: "Level 3",
    term: "Term 2",
    folders: generateCourseFolders("l3t2-theory-4")
  },
  {
    id: "l3t2-theory-5",
    name: "Thermal Engineering",
    code: "ME 303",
    type: "theory",
    fileCount: 18,
    level: "Level 3",
    term: "Term 2",
    folders: generateCourseFolders("l3t2-theory-5")
  },

  // Level 3, Term 2 - Sessional Courses
  {
    id: "l3t2-sessional-1",
    name: "Process Control Sessional",
    code: "ChE 304",
    type: "sessional",
    fileCount: 10,
    level: "Level 3",
    term: "Term 2",
    folders: generateCourseFolders("l3t2-sessional-1")
  },
  {
    id: "l3t2-sessional-2",
    name: "Software Engineering Sessional",
    code: "CSE 308",
    type: "sessional",
    fileCount: 14,
    level: "Level 3",
    term: "Term 2",
    folders: generateCourseFolders("l3t2-sessional-2")
  },
  {
    id: "l3t2-sessional-3",
    name: "Communication Sessional",
    code: "EEE 310",
    type: "sessional",
    fileCount: 9,
    level: "Level 3",
    term: "Term 2",
    folders: generateCourseFolders("l3t2-sessional-3")
  },

  // Level 4, Term 1 - Theory Courses
  {
    id: "l4t1-theory-1",
    name: "Plant Design",
    code: "ChE 401",
    type: "theory",
    fileCount: 25,
    level: "Level 4",
    term: "Term 1",
    folders: generateCourseFolders("l4t1-theory-1")
  },
  {
    id: "l4t1-theory-2",
    name: "Artificial Intelligence",
    code: "CSE 405",
    type: "theory",
    fileCount: 30,
    level: "Level 4",
    term: "Term 1",
    folders: generateCourseFolders("l4t1-theory-2")
  },
  {
    id: "l4t1-theory-3",
    name: "Power Systems",
    code: "EEE 407",
    type: "theory",
    fileCount: 22,
    level: "Level 4",
    term: "Term 1",
    folders: generateCourseFolders("l4t1-theory-3")
  },
  {
    id: "l4t1-theory-4",
    name: "Advanced Mathematics",
    code: "Math 401",
    type: "theory",
    fileCount: 18,
    level: "Level 4",
    term: "Term 1",
    folders: generateCourseFolders("l4t1-theory-4")
  },
  {
    id: "l4t1-theory-5",
    name: "Manufacturing Processes",
    code: "ME 401",
    type: "theory",
    fileCount: 20,
    level: "Level 4",
    term: "Term 1",
    folders: generateCourseFolders("l4t1-theory-5")
  },

  // Level 4, Term 1 - Sessional Courses
  {
    id: "l4t1-sessional-1",
    name: "Plant Design Sessional",
    code: "ChE 402",
    type: "sessional",
    fileCount: 12,
    level: "Level 4",
    term: "Term 1",
    folders: generateCourseFolders("l4t1-sessional-1")
  },
  {
    id: "l4t1-sessional-2",
    name: "AI Sessional",
    code: "CSE 406",
    type: "sessional",
    fileCount: 15,
    level: "Level 4",
    term: "Term 1",
    folders: generateCourseFolders("l4t1-sessional-2")
  },
  {
    id: "l4t1-sessional-3",
    name: "Power Systems Sessional",
    code: "EEE 408",
    type: "sessional",
    fileCount: 11,
    level: "Level 4",
    term: "Term 1",
    folders: generateCourseFolders("l4t1-sessional-3")
  },

  // Level 4, Term 2 - Theory Courses
  {
    id: "l4t2-theory-1",
    name: "Project Management",
    code: "ChE 403",
    type: "theory",
    fileCount: 23,
    level: "Level 4",
    term: "Term 2",
    folders: generateCourseFolders("l4t2-theory-1")
  },
  {
    id: "l4t2-theory-2",
    name: "Machine Learning",
    code: "CSE 407",
    type: "theory",
    fileCount: 32,
    level: "Level 4",
    term: "Term 2",
    folders: generateCourseFolders("l4t2-theory-2")
  },
  {
    id: "l4t2-theory-3",
    name: "Control Systems",
    code: "EEE 409",
    type: "theory",
    fileCount: 24,
    level: "Level 4",
    term: "Term 2",
    folders: generateCourseFolders("l4t2-theory-3")
  },
  {
    id: "l4t2-theory-4",
    name: "Optimization",
    code: "Math 403",
    type: "theory",
    fileCount: 19,
    level: "Level 4",
    term: "Term 2",
    folders: generateCourseFolders("l4t2-theory-4")
  },
  {
    id: "l4t2-theory-5",
    name: "Robotics",
    code: "ME 403",
    type: "theory",
    fileCount: 21,
    level: "Level 4",
    term: "Term 2",
    folders: generateCourseFolders("l4t2-theory-5")
  },

  // Level 4, Term 2 - Sessional Courses
  {
    id: "l4t2-sessional-1",
    name: "Project Management Sessional",
    code: "ChE 404",
    type: "sessional",
    fileCount: 13,
    level: "Level 4",
    term: "Term 2",
    folders: generateCourseFolders("l4t2-sessional-1")
  },
  {
    id: "l4t2-sessional-2",
    name: "Machine Learning Sessional",
    code: "CSE 408",
    type: "sessional",
    fileCount: 16,
    level: "Level 4",
    term: "Term 2",
    folders: generateCourseFolders("l4t2-sessional-2")
  },
  {
    id: "l4t2-sessional-3",
    name: "Control Systems Sessional",
    code: "EEE 410",
    type: "sessional",
    fileCount: 12,
    level: "Level 4",
    term: "Term 2",
    folders: generateCourseFolders("l4t2-sessional-3")
  }
];

export interface OfficeHoursSlot {
  id: string;
  start: string; // ISO
  end: string; // ISO
  location?: string;
}

export interface Teacher {
  id: string;
  name: string;
  title?: string;
  department?: string;
  avatar?: string;
  bio?: string;
  email?: string;
  phone?: string;
  university?: string;
  subjects?: string[];
  officeHours?: OfficeHoursSlot[];
  allowMessaging?: boolean;
}

export const mockTeachers: Teacher[] = [
  {
    id: "t1",
    name: "Dr. Ayesha Rahman",
    title: "Associate Professor",
    department: "Computer Science",
    university: "National University",
    avatar:
      "https://ui-avatars.com/api/?name=Ayesha+Rahman&background=10b981&color=fff",
    bio: "Researcher in distributed systems and databases. Office hours for consultation and project guidance.",
    email: "ayesha.rahman@university.edu",
    subjects: ["Distributed Systems", "Databases"],
    allowMessaging: true,
    officeHours: [
      {
        id: "s1",
        start: "2025-10-22T14:00:00.000Z",
        end: "2025-10-22T15:00:00.000Z",
        location: "Room 210",
      },
      {
        id: "s2",
        start: "2025-10-24T09:00:00.000Z",
        end: "2025-10-24T10:00:00.000Z",
        location: "Zoom",
      },
    ],
  },
  {
    id: "t2",
    name: "Prof. Imran Hossain",
    title: "Professor",
    department: "Electrical Engineering",
    university: "Dhaka University",
    avatar:
      "https://ui-avatars.com/api/?name=Imran+Hossain&background=3b82f6&color=fff",
    bio: "TEACHING: Signals and Systems, Circuit Analysis. Available for project consultation and lab help.",
    email: "imran.hossain@university.edu",
    subjects: ["Signals", "Circuit Analysis"],
    allowMessaging: false,
    officeHours: [
      {
        id: "s3",
        start: "2025-10-21T16:00:00.000Z",
        end: "2025-10-21T17:00:00.000Z",
        location: "Room 110",
      },
    ],
  },
  {
    id: "t3",
    name: "Ms. Farzana Khan",
    title: "Lecturer",
    department: "Mathematics",
    university: "BUET",
    avatar:
      "https://ui-avatars.com/api/?name=Farzana+Khan&background=f59e0b&color=fff",
    bio: "Lecturer for Calculus and Linear Algebra. Happy to help with tutorial problems.",
    email: "farzana.khan@university.edu",
    subjects: ["Calculus", "Linear Algebra"],
    allowMessaging: true,
    officeHours: [],
  },
];

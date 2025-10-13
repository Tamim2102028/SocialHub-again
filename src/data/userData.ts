export const getCurrentUserId = (): string => {
  // In real life, we would get current user by authentication
  return "1";
};

export interface UserData {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  role: "student" | "teacher";
  university: {
    name: string;
    dept: string;
    section?: string;
    subsection?: string;
    roll?: string;
  };
  gender?: "male" | "female";
  friends: string[];
  pendingRequests?: string[];
  saved?: string[];
}

export const usersData: UserData[] = [
  {
    id: "1",
    name: "Tamim Ikbal (1/20)",
    username: "tamim_ikbal",
    avatar:
      "https://ui-avatars.com/api/?name=Tamim+Ikbal&background=3498db&color=fff&size=150&bold=true&rounded=true",
    bio: "Computer Science student at BUET, passionate about web development",
    role: "student",
    university: {
      name: "BUET",
      dept: "Computer Science and Engineering",
      section: "A",
      subsection: "1",
      roll: "1905001"
    },
    gender: "male",
    friends: ["2", "3", "5", "6", "12", "14", "15"],
    pendingRequests: ["4", "7", "8", "9"],
    saved: ["p1", "p3"],
  },
  {
    id: "2",
    name: "Sarah Wilson (2/20)",
    username: "sarahw",
    avatar:
      "https://ui-avatars.com/api/?name=Sarah+Wilson&background=e74c3c&color=fff&size=150&bold=true&rounded=true",
    bio: "Assistant Professor in Electrical Engineering, research in renewable energy",
    role: "teacher",
    university: {
      name: "RUET",
      dept: "Electrical and Electronic Engineering"
    },
    gender: "female",
    friends: ["1", "3"],
    pendingRequests: ["5"],
    saved: ["p2"],
  },
  {
    id: "3",
    name: "Alex Chen (3/20)",
    username: "alexc",
    avatar:
      "https://ui-avatars.com/api/?name=Alex+Chen&background=f39c12&color=fff&size=150&bold=true&rounded=true",
    bio: "Mechanical Engineering student, loves robotics and automation",
    role: "student",
    university: {
      name: "KUET",
      dept: "Mechanical Engineering",
      section: "B",
      subsection: "2",
      roll: "1803045"
    },
    gender: "male",
    friends: ["1", "2", "6", "11"],
    pendingRequests: ["7", "13"],
    saved: ["p1", "p4"],
  },
  {
    id: "4",
    name: "Mike Johnson (4/20)",
    username: "mikej",
    avatar:
      "https://ui-avatars.com/api/?name=Mike+Johnson&background=9b59b6&color=fff&size=150&bold=true&rounded=true",
    bio: "Civil Engineering student, interested in structural design",
    role: "student",
    university: {
      name: "CUET",
      dept: "Civil Engineering",
      section: "A",
      subsection: "1",
      roll: "1704023"
    },
    gender: "male",
    friends: ["5", "8", "12"],
    pendingRequests: ["10", "16"],
    saved: ["p2", "p5"],
  },
  {
    id: "5",
    name: "Emma Davis (5/20)",
    username: "emmad",
    avatar:
      "https://ui-avatars.com/api/?name=Emma+Davis&background=e67e22&color=fff&size=150&bold=true&rounded=true",
    bio: "Software Engineering student, passionate about AI and machine learning",
    role: "student",
    university: {
      name: "BUET",
      dept: "Computer Science and Engineering",
      section: "B",
      subsection: "1",
      roll: "1905067"
    },
    gender: "female",
    friends: ["4", "9", "14"],
    pendingRequests: ["11", "17"],
    saved: ["p3", "p6"],
  },
  {
    id: "6",
    name: "Alex Johnson (6/20)",
    username: "alexj",
    avatar:
      "https://ui-avatars.com/api/?name=Alex+Johnson&background=27ae60&color=fff&size=150&bold=true&rounded=true",
    bio: "Professor of Industrial Engineering, expert in operations research",
    role: "teacher",
    university: {
      name: "RUET",
      dept: "Industrial and Production Engineering"
    },
    gender: "male",
    friends: ["1", "3", "10"],
    pendingRequests: ["12", "18"],
    saved: ["p1", "p7"],
  },
  {
    id: "7",
    name: "Emma Wilson (7/20)",
    username: "emmaw",
    avatar:
      "https://ui-avatars.com/api/?name=Emma+Wilson&background=2980b9&color=fff&size=150&bold=true&rounded=true",
    bio: "Chemical Engineering student, interested in environmental sustainability",
    role: "student",
    university: {
      name: "KUET",
      dept: "Chemical Engineering",
      section: "A",
      subsection: "1",
      roll: "1802012"
    },
    gender: "female",
    friends: ["11", "15", "19"],
    pendingRequests: ["13", "20"],
    saved: ["p2", "p8"],
  },
  {
    id: "8",
    name: "James Kim (8/20)",
    username: "jamesk",
    avatar:
      "https://ui-avatars.com/api/?name=James+Kim&background=16a085&color=fff&size=150&bold=true&rounded=true",
    bio: "Electronics and Telecommunication student, loves IoT projects",
    role: "student",
    university: {
      name: "CUET",
      dept: "Electronics and Telecommunication Engineering",
      section: "B",
      subsection: "1",
      roll: "1701089"
    },
    gender: "male",
    friends: ["1", "4", "12", "16"],
    pendingRequests: ["14"],
    saved: ["p3", "p9"],
  },
  {
    id: "9",
    name: "Sarah Kim (9/20)",
    username: "sarahk",
    avatar:
      "https://ui-avatars.com/api/?name=Sarah+Kim&background=8e44ad&color=fff&size=150&bold=true&rounded=true",
    bio: "Lecturer in Mathematics, specializes in applied mathematics",
    role: "teacher",
    university: {
      name: "BUET",
      dept: "Mathematics"
    },
    gender: "female",
    friends: ["1", "5", "13", "17"],
    pendingRequests: ["15"],
    saved: ["p4", "p10"],
  },
  {
    id: "10",
    name: "Rachel Kim (10/20)",
    username: "rachelk",
    avatar:
      "https://ui-avatars.com/api/?name=Rachel+Kim&background=d35400&color=fff&size=150&bold=true&rounded=true",
    bio: "Textile Engineering student, passionate about sustainable fashion",
    role: "student",
    university: {
      name: "RUET",
      dept: "Textile Engineering",
      section: "A",
      subsection: "2",
      roll: "1806034"
    },
    gender: "female",
    friends: ["2", "6", "14", "18"],
    pendingRequests: ["16"],
    saved: ["p5", "p11"],
  },
  {
    id: "11",
    name: "John Smith (11/20)",
    username: "johns",
    avatar:
      "https://ui-avatars.com/api/?name=John+Smith&background=1abc9c&color=fff&size=150&bold=true&rounded=true",
    bio: "Architecture student, passionate about sustainable building design",
    role: "student",
    university: {
      name: "KUET",
      dept: "Architecture",
      section: "A",
      subsection: "1",
      roll: "1801025"
    },
    gender: "male",
    friends: ["1", "3", "7", "15"],
    pendingRequests: ["19"],
    saved: ["p6", "p12"],
  },
  {
    id: "12",
    name: "Linda Lee (12/20)",
    username: "lindal",
    avatar:
      "https://ui-avatars.com/api/?name=Linda+Lee&background=2ecc71&color=fff&size=150&bold=true&rounded=true",
    bio: "Associate Professor in Environmental Engineering, climate change researcher",
    role: "teacher",
    university: {
      name: "CUET",
      dept: "Civil Engineering"
    },
    gender: "female",
    friends: ["1", "4", "8", "16"],
    pendingRequests: ["20"],
    saved: ["p7", "p13"],
  },
  {
    id: "13",
    name: "David Brown (13/20)",
    username: "davidb",
    avatar:
      "https://ui-avatars.com/api/?name=David+Brown&background=c0392b&color=fff&size=150&bold=true&rounded=true",
    bio: "Biomedical Engineering student, interested in medical device innovation",
    role: "student",
    university: {
      name: "BUET",
      dept: "Biomedical Engineering",
      section: "A",
      subsection: "1",
      roll: "1907015"
    },
    gender: "male",
    friends: ["1", "9", "17"],
    pendingRequests: ["3", "7"],
    saved: ["p8", "p14"],
  },
  {
    id: "14",
    name: "Sophia Miller (14/20)",
    username: "sophiam",
    avatar:
      "https://ui-avatars.com/api/?name=Sophia+Miller&background=8e44ad&color=fff&size=150&bold=true&rounded=true",
    bio: "Food Engineering student, focuses on food safety and nutrition",
    role: "student",
    university: {
      name: "RUET",
      dept: "Food Engineering and Tea Technology",
      section: "B",
      subsection: "1",
      roll: "1805042"
    },
    gender: "female",
    friends: ["1", "5", "10", "18"],
    pendingRequests: ["8"],
    saved: ["p9", "p15"],
  },
  {
    id: "15",
    name: "William Garcia (15/20)",
    username: "williamg",
    avatar:
      "https://ui-avatars.com/api/?name=William+Garcia&background=d68910&color=fff&size=150&bold=true&rounded=true",
    bio: "Senior Lecturer in Computer Science, AI and machine learning expert",
    role: "teacher",
    university: {
      name: "KUET",
      dept: "Computer Science and Engineering"
    },
    gender: "male",
    friends: ["1", "7", "11", "19"],
    pendingRequests: ["9"],
    saved: ["p10", "p16"],
  },
  {
    id: "16",
    name: "Olivia Martinez (16/20)",
    username: "oliviam",
    avatar:
      "https://ui-avatars.com/api/?name=Olivia+Martinez&background=e91e63&color=fff&size=150&bold=true&rounded=true",
    bio: "Materials Science student, researching advanced composite materials",
    role: "student",
    university: {
      name: "CUET",
      dept: "Materials and Metallurgical Engineering",
      section: "A",
      subsection: "2",
      roll: "1703056"
    },
    gender: "female",
    friends: ["8", "12", "20"],
    pendingRequests: ["4", "10"],
    saved: ["p11", "p17"],
  },
  {
    id: "17",
    name: "Benjamin Lee (17/20)",
    username: "benjaminl",
    avatar:
      "https://ui-avatars.com/api/?name=Benjamin+Lee&background=34495e&color=fff&size=150&bold=true&rounded=true",
    bio: "Professor of Physics, quantum mechanics and nanotechnology researcher",
    role: "teacher",
    university: {
      name: "BUET",
      dept: "Physics"
    },
    gender: "male",
    friends: ["9", "13"],
    pendingRequests: ["5"],
    saved: ["p12", "p18"],
  },
  {
    id: "18",
    name: "Mia Clark (18/20)",
    username: "miac",
    avatar:
      "https://ui-avatars.com/api/?name=Mia+Clark&background=17a2b8&color=fff&size=150&bold=true&rounded=true",
    bio: "Petroleum Engineering student, interested in renewable energy transition",
    role: "student",
    university: {
      name: "RUET",
      dept: "Petroleum and Mining Engineering",
      section: "A",
      subsection: "1",
      roll: "1804018"
    },
    gender: "female",
    friends: ["10", "14"],
    pendingRequests: ["6"],
    saved: ["p13", "p19"],
  },
  {
    id: "19",
    name: "Elijah Walker (19/20)",
    username: "elijahw",
    avatar:
      "https://ui-avatars.com/api/?name=Elijah+Walker&background=28a745&color=fff&size=150&bold=true&rounded=true",
    bio: "Urban Planning student, passionate about smart city development",
    role: "student",
    university: {
      name: "KUET",
      dept: "Urban and Regional Planning",
      section: "A",
      subsection: "1",
      roll: "1808007"
    },
    gender: "male",
    friends: ["7", "15"],
    pendingRequests: ["11"],
    saved: ["p14", "p20"],
  },
  {
    id: "20",
    name: "Ava Hall (20/20)",
    username: "avah",
    avatar:
      "https://ui-avatars.com/api/?name=Ava+Hall&background=6f42c1&color=fff&size=150&bold=true&rounded=true",
    bio: "Assistant Professor in Chemistry, organic synthesis specialist",
    role: "teacher",
    university: {
      name: "CUET",
      dept: "Applied Chemistry and Chemical Engineering"
    },
    gender: "female",
    friends: ["16"],
    pendingRequests: ["7", "12"],
    saved: ["p15", "p1"],
  },
];

// Helper function to get user data by ID
export const getUserById = (userId: string): UserData | null => {
  return usersData.find((user) => user.id === userId) || null;
};

// Helper function to update user data by ID
export const updateUserById = (
  userId: string,
  updatedData: Partial<UserData>
): boolean => {
  const userIndex = usersData.findIndex((user) => user.id === userId);
  if (userIndex !== -1) {
    usersData[userIndex] = { ...usersData[userIndex], ...updatedData };
    return true;
  }
  return false;
};

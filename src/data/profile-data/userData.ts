export const getCurrentUserId = (): string => {
  // In real life, we would get current user by authentication
  return "1";
};

export interface UserData {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
  bio?: string;

  category: "university" | "hsc"; // university level or HSC level
  role: ("student" | "teacher" | "system")[]; // array to allow multiple roles; added 'system' for system accounts
  university?: {
    name: string;
    dept: string;
    section?: string;
    subsection?: string;
    roll?: string;
  };
  college?: {
    name: string;
    dept: "science" | "arts" | "commerce"; // HSC department
    section?: string; // optional for teachers
    subsection?: string;
    roll?: string; // optional for teachers
    sscBatch: string;
    level?: "1st year" | "2nd year" | "admission"; // optional for teachers
  };
  gender?: "male" | "female";
  religion?: "Islam" | "Hindu" | "Christian" | "Other";

  friends: string[];
  pendingRequests?: string[];
  sentRequests?: string[];

  saved?: string[];
  joinedGroup?: string[];
  sentRequestGroup?: string[];
}

export const usersData: UserData[] = [
  // (system role allowed; seeded system user removed as requested)
  {
    id: "1",
    name: "Tamim Ikbal (1/40)",
    username: "tamim_ikbal",
    email: "tamim.ikbal@buet.ac.bd",
    password: "password123",
    phone: "+8801712345678",
    avatar:
      "https://ui-avatars.com/api/?name=Tamim+Ikbal&background=3498db&color=fff&size=150&bold=true&rounded=true",
    bio: "Computer Science student at BUET, passionate about web development",
    role: ["student"],
    category: "university",
    university: {
      name: "BUET",
      dept: "Computer Science & Engineering bro hard",
      section: "A",
      subsection: "1",
      roll: "1905001",
    },
    gender: "male",
    religion: "Islam",
    friends: ["2", "3", "5", "6", "12", "14", "15", "16"],
    pendingRequests: ["4", "7", "8", "9"], // এরা user 1 এর কাছে request পাঠিয়েছে
    sentRequests: [], // user 1 কারো কাছে request পাঠায়নি

    saved: ["p1", "p3"],
    joinedGroup: ["g1", "g8", "g15", "g19"],
    sentRequestGroup: ["g4", "g9", "g12", "g20", "g22"],
  },
  {
    id: "2",
    name: "Sarah Wilson (2/40)",
    username: "sarahw",
    email: "sarah.wilson@ruet.ac.bd",
    password: "password123",
    phone: "+8801823456789",
    avatar:
      "https://ui-avatars.com/api/?name=Sarah+Wilson&background=e74c3c&color=fff&size=150&bold=true&rounded=true",
    bio: "Assistant Professor in Electrical Engineering, research in renewable energy",
    role: ["teacher"],
    category: "university",
    university: {
      name: "RUET",
      dept: "Electrical and Electronic Engineering",
    },
    gender: "female",
    religion: "Islam",
    friends: ["1", "3"],
    pendingRequests: ["5"], // user 5 এর কাছ থেকে request এসেছে
    sentRequests: [], // user 2 কারো কাছে request পাঠায়নি
    saved: ["p2"],
    joinedGroup: ["g1", "g20"],
    sentRequestGroup: [],
  },
  {
    id: "3",
    name: "Alex Chen (3/40)",
    username: "alexc",
    email: "alex.chen@dhakacollege.edu.bd",
    password: "password123",
    phone: "+8801934567890",
    avatar:
      "https://ui-avatars.com/api/?name=Alex+Chen&background=f39c12&color=fff&size=150&bold=true&rounded=true",
    bio: "HSC 2nd year Science student at Dhaka College, loves physics and mathematics",
    role: ["student"],
    category: "hsc",
    college: {
      name: "Dhaka College",
      dept: "science",
      section: "A",
      subsection: "1",
      roll: "101234",
      sscBatch: "2022",
      level: "2nd year",
    },
    gender: "male",
    religion: "Hindu",
    friends: ["1", "2", "6", "11"],
    pendingRequests: ["7", "13"], // user 7, 13 এর কাছ থেকে request এসেছে
    sentRequests: [], // user 3 কারো কাছে request পাঠায়নি
    saved: ["p1", "p4"],
    joinedGroup: ["g1", "g20"],
    sentRequestGroup: [],
  },
  {
    id: "4",
    name: "Mike Johnson (4/40)",
    username: "mikej",
    email: "mike.johnson@cuet.ac.bd",
    password: "password123",
    phone: "+8801745678901",
    avatar:
      "https://ui-avatars.com/api/?name=Mike+Johnson&background=9b59b6&color=fff&size=150&bold=true&rounded=true",
    bio: "Civil Engineering student, interested in structural design",
    role: ["student"],
    category: "university",
    university: {
      name: "CUET",
      dept: "Civil Engineering",
      section: "A",
      subsection: "1",
      roll: "1704023",
    },
    gender: "male",
    religion: "Christian",
    friends: ["5", "8", "12"],
    pendingRequests: ["10", "16"], // user 10, 16 এর কাছ থেকে request এসেছে
    sentRequests: ["1"], // user 4 user 1 এর কাছে request পাঠিয়েছে
    saved: ["p2", "p5"],
    joinedGroup: ["g2", "g21"],
    sentRequestGroup: [],
  },
  {
    id: "5",
    name: "Emma Davis (5/40)",
    username: "emmad",
    email: "emma.davis@rajukcollege.edu.bd",
    password: "password123",
    phone: "+8801856789012",
    avatar:
      "https://ui-avatars.com/api/?name=Emma+Davis&background=e67e22&color=fff&size=150&bold=true&rounded=true",
    bio: "HSC 1st year Commerce student at Rajuk College, interested in business studies",
    role: ["student"],
    category: "hsc",
    college: {
      name: "Rajuk College",
      dept: "commerce",
      section: "B",
      subsection: "2",
      roll: "201567",
      sscBatch: "2023",
      level: "1st year",
    },
    gender: "female",
    religion: "Islam",
    friends: ["4", "9", "14"],
    pendingRequests: ["11", "17"], // user 11, 17 এর কাছ থেকে request এসেছে
    sentRequests: ["2"], // user 5 user 2 এর কাছে request পাঠিয়েছে
    saved: ["p3", "p6"],
    joinedGroup: ["g2", "g21"],
    sentRequestGroup: [],
  },
  {
    id: "6",
    name: "Alex Johnson (6/40)",
    username: "alexj",
    email: "alex.johnson@ruet.ac.bd",
    password: "password123",
    phone: "+8801967890123",
    avatar:
      "https://ui-avatars.com/api/?name=Alex+Johnson&background=27ae60&color=fff&size=150&bold=true&rounded=true",
    bio: "Professor of Industrial Engineering, expert in operations research",
    role: ["teacher"],
    category: "university",
    university: {
      name: "RUET",
      dept: "Industrial and Production Engineering",
    },
    gender: "male",
    religion: "Hindu",
    friends: ["1", "3", "10"],
    pendingRequests: ["12", "18"], // user 12, 18 এর কাছ থেকে request এসেছে
    sentRequests: [], // user 6 কারো কাছে request পাঠায়নি
    saved: ["p1", "p7"],
    joinedGroup: ["g22"],
    sentRequestGroup: ["g2"],
  },
  {
    id: "7",
    name: "Emma Wilson (7/40)",
    username: "emmaw",
    email: "emma.wilson@holycross.edu.bd",
    password: "password123",
    phone: "+8801778901234",
    avatar:
      "https://ui-avatars.com/api/?name=Emma+Wilson&background=2980b9&color=fff&size=150&bold=true&rounded=true",
    bio: "HSC 2nd year Arts student at Holy Cross College, passionate about literature",
    role: ["student"],
    category: "hsc",
    college: {
      name: "Holy Cross College",
      dept: "arts",
      section: "A",
      subsection: "1",
      roll: "301789",
      sscBatch: "2022",
      level: "2nd year",
    },
    gender: "female",
    religion: "Christian",
    friends: ["11", "15", "19"],
    pendingRequests: ["13", "20"], // user 13, 20 এর কাছ থেকে request এসেছে
    sentRequests: ["1", "3"], // user 7 user 1, 3 এর কাছে request পাঠিয়েছে
    saved: ["p2", "p8"],
    joinedGroup: ["g3", "g22"],
    sentRequestGroup: [],
  },
  {
    id: "8",
    name: "James Kim (8/40)",
    username: "jamesk",
    email: "james.kim@cuet.ac.bd",
    password: "password123",
    phone: "+8801889012345",
    avatar:
      "https://ui-avatars.com/api/?name=James+Kim&background=16a085&color=fff&size=150&bold=true&rounded=true",
    bio: "Electronics and Telecommunication student, loves IoT projects",
    role: ["student"],
    category: "university",
    university: {
      name: "CUET",
      dept: "Electronics and Telecommunication Engineering",
      section: "B",
      subsection: "1",
      roll: "1701089",
    },
    gender: "male",
    religion: "Hindu",
    friends: ["1", "4", "12", "16"],
    pendingRequests: ["14"], // user 14 এর কাছ থেকে request এসেছে
    sentRequests: ["1"], // user 8 user 1 এর কাছে request পাঠিয়েছে
    saved: ["p3", "p9"],
    joinedGroup: ["g3", "g23"],
    sentRequestGroup: [],
  },
  {
    id: "9",
    name: "Sarah Kim (9/40)",
    username: "sarahk",
    email: "sarah.kim@buet.ac.bd",
    password: "password123",
    phone: "+8801990123456",
    avatar:
      "https://ui-avatars.com/api/?name=Sarah+Kim&background=8e44ad&color=fff&size=150&bold=true&rounded=true",
    bio: "Lecturer in Mathematics, specializes in applied mathematics",
    role: ["teacher"],
    category: "university",
    university: {
      name: "BUET",
      dept: "Mathematics",
    },
    gender: "female",
    religion: "Christian",
    friends: ["1", "5", "13", "17"],
    pendingRequests: ["15"], // user 15 এর কাছ থেকে request এসেছে
    sentRequests: ["1"], // user 9 user 1 এর কাছে request পাঠিয়েছে
    saved: ["p4", "p10"],
    joinedGroup: ["g3", "g23"],
    sentRequestGroup: [],
  },
  {
    id: "10",
    name: "Rachel Kim (10/40)",
    username: "rachelk",
    email: "rachel.kim@notredame.edu.bd",
    password: "password123",
    phone: "+8801601234567",
    avatar:
      "https://ui-avatars.com/api/?name=Rachel+Kim&background=d35400&color=fff&size=150&bold=true&rounded=true",
    bio: "HSC admission candidate preparing for Science group, dreams of studying engineering",
    role: ["student"],
    category: "hsc",
    college: {
      name: "Notre Dame College",
      dept: "science",
      section: "C",
      subsection: "1",
      roll: "102456",
      sscBatch: "2024",
      level: "admission",
    },
    gender: "female",
    religion: "Islam",
    friends: ["2", "6", "14", "18"],
    pendingRequests: ["16"], // user 16 এর কাছ থেকে request এসেছে
    sentRequests: ["4"], // user 10 user 4 এর কাছে request পাঠিয়েছে
    saved: ["p5", "p11"],
    joinedGroup: ["g4", "g24"],
    sentRequestGroup: [],
  },
  {
    id: "11",
    name: "John Smith (11/40)",
    username: "johns",
    email: "john.smith@kuet.ac.bd",
    password: "password123",
    phone: "+8801712345679",
    avatar:
      "https://ui-avatars.com/api/?name=John+Smith&background=1abc9c&color=fff&size=150&bold=true&rounded=true",
    bio: "Architecture student, passionate about sustainable building design",
    role: ["student"],
    category: "university",
    university: {
      name: "KUET",
      dept: "Architecture",
      section: "A",
      subsection: "1",
      roll: "1801025",
    },
    gender: "male",
    religion: "Islam",
    friends: ["1", "3", "7", "15"],
    pendingRequests: ["19"], // user 19 এর কাছ থেকে request এসেছে
    sentRequests: ["5"], // user 11 user 5 এর কাছে request পাঠিয়েছে
    saved: ["p6", "p12"],
    joinedGroup: ["g4", "g24"],
    sentRequestGroup: [],
  },
  {
    id: "12",
    name: "Linda Lee (12/40)",
    username: "lindal",
    email: "linda.lee@cuet.ac.bd",
    password: "password123",
    phone: "+8801823456780",
    avatar:
      "https://ui-avatars.com/api/?name=Linda+Lee&background=2ecc71&color=fff&size=150&bold=true&rounded=true",
    bio: "Associate Professor in Environmental Engineering, climate change researcher",
    role: ["teacher"],
    category: "university",
    university: {
      name: "CUET",
      dept: "Civil Engineering",
    },
    gender: "female",
    religion: "Islam",
    friends: ["1", "4", "8", "16"],
    pendingRequests: ["20"], // user 20 এর কাছ থেকে request এসেছে
    sentRequests: ["6"], // user 12 user 6 এর কাছে request পাঠিয়েছে
    saved: ["p7", "p13"],
    joinedGroup: ["g5", "g25"],
    sentRequestGroup: [],
  },
  {
    id: "13",
    name: "David Brown (13/40)",
    username: "davidb",
    email: "david.brown@adamjee.edu.bd",
    password: "password123",
    phone: "+8801934567891",
    avatar:
      "https://ui-avatars.com/api/?name=David+Brown&background=c0392b&color=fff&size=150&bold=true&rounded=true",
    bio: "HSC 1st year Science student at Adamjee Cantonment College, interested in medical science",
    role: ["student"],
    category: "hsc",
    college: {
      name: "Adamjee Cantonment College",
      dept: "science",
      section: "A",
      subsection: "2",
      roll: "103789",
      sscBatch: "2023",
      level: "1st year",
    },
    gender: "male",
    religion: "Islam",
    friends: ["1", "9", "17"],
    pendingRequests: [], // কেউ user 13 এর কাছে request পাঠায়নি
    sentRequests: ["3", "7"], // user 13 user 3, 7 এর কাছে request পাঠিয়েছে
    saved: ["p8", "p14"],
    joinedGroup: ["g5", "g25"],
    sentRequestGroup: [],
  },
  {
    id: "14",
    name: "Sophia Miller (14/40)",
    username: "sophiam",
    email: "sophia.miller@ruet.ac.bd",
    password: "password123",
    phone: "+8801745678902",
    avatar:
      "https://ui-avatars.com/api/?name=Sophia+Miller&background=8e44ad&color=fff&size=150&bold=true&rounded=true",
    bio: "Food Engineering student, focuses on food safety and nutrition",
    role: ["student"],
    category: "university",
    university: {
      name: "RUET",
      dept: "Food Engineering and Tea Technology",
      section: "B",
      subsection: "1",
      roll: "1805042",
    },
    gender: "female",
    religion: "Hindu",
    friends: ["1", "5", "10", "18"],
    pendingRequests: [], // কেউ user 14 এর কাছে request পাঠায়নি
    sentRequests: ["8"], // user 14 user 8 এর কাছে request পাঠিয়েছে
    saved: ["p9", "p15"],
    joinedGroup: ["g6"],
    sentRequestGroup: [],
  },
  {
    id: "15",
    name: "William Garcia (15/40)",
    username: "williamg",
    email: "william.garcia@kuet.ac.bd",
    password: "password123",
    phone: "+8801856789013",
    avatar:
      "https://ui-avatars.com/api/?name=William+Garcia&background=d68910&color=fff&size=150&bold=true&rounded=true",
    bio: "Senior Lecturer in Computer Science, AI and machine learning expert",
    role: ["teacher"],
    category: "university",
    university: {
      name: "KUET",
      dept: "Computer Science and Engineering",
    },
    gender: "male",
    religion: "Christian",
    friends: ["1", "7", "11", "19"],
    pendingRequests: [], // কেউ user 15 এর কাছে request পাঠায়নি
    sentRequests: ["9"], // user 15 user 9 এর কাছে request পাঠিয়েছে
    saved: ["p10", "p16"],
    joinedGroup: ["g6"],
    sentRequestGroup: [],
  },
  {
    id: "16",
    name: "Olivia Martinez (16/40)",
    username: "oliviam",
    email: "olivia.martinez@viqarunnisa.edu.bd",
    password: "password123",
    phone: "+8801967890124",
    avatar:
      "https://ui-avatars.com/api/?name=Olivia+Martinez&background=e91e63&color=fff&size=150&bold=true&rounded=true",
    bio: "HSC 2nd year Commerce student at Viqarunnisa Noon College, interested in accounting",
    role: ["student"],
    category: "hsc",
    college: {
      name: "Viqarunnisa Noon College",
      dept: "commerce",
      section: "A",
      subsection: "1",
      roll: "202345",
      sscBatch: "2022",
      level: "2nd year",
    },
    gender: "female",
    religion: "Hindu",
    friends: ["8", "12", "20"],
    pendingRequests: [], // কেউ user 16 এর কাছে request পাঠায়নি
    sentRequests: ["4", "10"], // user 16 user 4, 10 এর কাছে request পাঠিয়েছে
    saved: ["p11", "p17"],
    joinedGroup: ["g7"],
    sentRequestGroup: [],
  },
  {
    id: "17",
    name: "Benjamin Lee (17/40)",
    username: "benjaminl",
    email: "benjamin.lee@buet.ac.bd",
    password: "password123",
    phone: "+8801778901235",
    avatar:
      "https://ui-avatars.com/api/?name=Benjamin+Lee&background=34495e&color=fff&size=150&bold=true&rounded=true",
    bio: "Professor of Physics, quantum mechanics and nanotechnology researcher",
    role: ["teacher"],
    category: "university",
    university: {
      name: "BUET",
      dept: "Physics",
    },
    gender: "male",
    religion: "Christian",
    friends: ["9", "13"],
    pendingRequests: [], // কেউ user 17 এর কাছে request পাঠায়নি
    sentRequests: ["5"], // user 17 user 5 এর কাছে request পাঠিয়েছে
    saved: ["p12", "p18"],
    joinedGroup: ["g7"],
    sentRequestGroup: [],
  },
  {
    id: "18",
    name: "Mia Clark (18/40)",
    username: "miac",
    email: "mia.clark@ruet.ac.bd",
    password: "password123",
    phone: "+8801889012346",
    avatar:
      "https://ui-avatars.com/api/?name=Mia+Clark&background=17a2b8&color=fff&size=150&bold=true&rounded=true",
    bio: "Petroleum Engineering student, interested in renewable energy transition",
    role: ["student"],
    category: "university",
    university: {
      name: "RUET",
      dept: "Petroleum and Mining Engineering",
      section: "A",
      subsection: "1",
      roll: "1804018",
    },
    gender: "female",
    religion: "Islam",
    friends: ["10", "14"],
    pendingRequests: [], // কেউ user 18 এর কাছে request পাঠায়নি
    sentRequests: ["6"], // user 18 user 6 এর কাছে request পাঠিয়েছে
    saved: ["p13", "p19"],
    joinedGroup: ["g8"],
    sentRequestGroup: [],
  },
  {
    id: "19",
    name: "Elijah Walker (19/40)",
    username: "elijahw",
    email: "elijah.walker@saintjoseph.edu.bd",
    password: "password123",
    phone: "+8801990123457",
    avatar:
      "https://ui-avatars.com/api/?name=Elijah+Walker&background=28a745&color=fff&size=150&bold=true&rounded=true",
    bio: "HSC 1st year Arts student at Saint Joseph Higher Secondary School, loves history",
    role: ["student"],
    category: "hsc",
    college: {
      name: "Saint Joseph Higher Secondary School",
      dept: "arts",
      section: "B",
      subsection: "1",
      roll: "302456",
      sscBatch: "2023",
      level: "1st year",
    },
    gender: "male",
    religion: "Christian",
    friends: ["7", "15"],
    pendingRequests: [], // কেউ user 19 এর কাছে request পাঠায়নি
    sentRequests: ["11"], // user 19 user 11 এর কাছে request পাঠিয়েছে
    saved: ["p14", "p20"],
    joinedGroup: ["g8"],
    sentRequestGroup: [],
  },
  {
    id: "20",
    name: "Ava Hall (20/40)",
    username: "avah",
    email: "ava.hall@cuet.ac.bd",
    password: "password123",
    phone: "+8801601234568",
    avatar:
      "https://ui-avatars.com/api/?name=Ava+Hall&background=6f42c1&color=fff&size=150&bold=true&rounded=true",
    bio: "Assistant Professor in Chemistry, organic synthesis specialist",
    role: ["teacher"],
    category: "university",
    university: {
      name: "CUET",
      dept: "Applied Chemistry and Chemical Engineering",
    },
    gender: "female",
    religion: "Hindu",
    friends: ["16"],
    pendingRequests: [], // কেউ user 20 এর কাছে request পাঠায়নি
    sentRequests: ["7", "12"], // user 20 user 7, 12 এর কাছে request পাঠিয়েছে
    saved: ["p15", "p1"],
    joinedGroup: ["g9"],
    sentRequestGroup: [],
  },
  // Additional 20 users for better field distribution
  {
    id: "21",
    name: "Fahim Rahman (21/40)",
    username: "fahimr",
    email: "fahim.rahman@du.ac.bd",
    password: "password123",
    phone: "+8801712345680",
    avatar:
      "https://ui-avatars.com/api/?name=Fahim+Rahman&background=ff6b6b&color=fff&size=150&bold=true&rounded=true",
    bio: "Economics student at Dhaka University, interested in development economics",
    role: ["student"],
    category: "university",
    university: {
      name: "University of Dhaka",
      dept: "Economics",
      section: "A",
      subsection: "1",
      roll: "2001045",
    },
    gender: "male",
    religion: "Islam",
    friends: ["1", "3", "22", "25"],
    pendingRequests: ["23", "26"], // user 23, 26 এর কাছ থেকে request এসেছে
    sentRequests: [], // user 21 কারো কাছে request পাঠায়নি
    saved: ["p1", "p16"],
    joinedGroup: ["g9"],
    sentRequestGroup: [],
  },
  {
    id: "22",
    name: "Nusrat Jahan (22/40)",
    username: "nusratj",
    email: "nusrat.jahan@ju.ac.bd",
    password: "password123",
    phone: "+8801823456791",
    avatar:
      "https://ui-avatars.com/api/?name=Nusrat+Jahan&background=4ecdc4&color=fff&size=150&bold=true&rounded=true",
    bio: "Professor of English Literature at Jahangirnagar University, Shakespeare specialist",
    role: ["teacher"],
    category: "university",
    university: {
      name: "Jahangirnagar University",
      dept: "English",
    },
    gender: "female",
    religion: "Hindu",
    friends: ["21", "24", "27"],
    pendingRequests: ["28"], // user 28 এর কাছ থেকে request এসেছে
    sentRequests: [], // user 22 কারো কাছে request পাঠায়নি
    saved: ["p2", "p17"],
    joinedGroup: ["g10"],
    sentRequestGroup: [],
  },
  {
    id: "23",
    name: "Karim Uddin (23/40)",
    username: "karimu",
    email: "karim.uddin@iu.ac.bd",
    password: "password123",
    phone: "+8801934567892",
    avatar:
      "https://ui-avatars.com/api/?name=Karim+Uddin&background=45b7d1&color=fff&size=150&bold=true&rounded=true",
    bio: "Business Administration student at Islamic University, entrepreneurship enthusiast",
    role: ["student"],
    category: "university",
    university: {
      name: "Islamic University",
      dept: "Business Administration",
      section: "B",
      subsection: "2",
      roll: "1902078",
    },
    gender: "male",
    religion: "Islam",
    friends: ["21", "29", "30"],
    pendingRequests: ["24"], // user 24 এর কাছ থেকে request এসেছে
    sentRequests: ["21"], // user 23 user 21 এর কাছে request পাঠিয়েছে
    saved: ["p3", "p18"],
    joinedGroup: ["g10"],
    sentRequestGroup: [],
  },
  {
    id: "24",
    name: "Rashida Begum (24/40)",
    username: "rashidab",
    email: "rashida.begum@sust.edu",
    password: "password123",
    phone: "+8801745678903",
    avatar:
      "https://ui-avatars.com/api/?name=Rashida+Begum&background=96ceb4&color=fff&size=150&bold=true&rounded=true",
    bio: "Associate Professor in Statistics, data science researcher",
    role: ["teacher"],
    category: "university",
    university: {
      name: "Shahjalal University of Science and Technology",
      dept: "Statistics",
    },
    gender: "female",
    religion: "Islam",
    friends: ["22", "31"],
    pendingRequests: ["23", "32"], // user 23, 32 এর কাছ থেকে request এসেছে
    sentRequests: ["23"], // user 24 user 23 এর কাছে request পাঠিয়েছে
    saved: ["p4", "p19"],
    joinedGroup: ["g11"],
    sentRequestGroup: [],
  },
  {
    id: "25",
    name: "Arif Hossain (25/40)",
    username: "arifh",
    email: "arif.hossain@cu.ac.bd",
    password: "password123",
    phone: "+8801856789014",
    avatar:
      "https://ui-avatars.com/api/?name=Arif+Hossain&background=feca57&color=fff&size=150&bold=true&rounded=true",
    bio: "Pharmacy student at University of Chittagong, pharmaceutical research interest",
    role: ["student"],
    category: "university",
    university: {
      name: "University of Chittagong",
      dept: "Pharmacy",
      section: "A",
      subsection: "1",
      roll: "1803056",
    },
    gender: "male",
    religion: "Islam",
    friends: ["21", "33", "34"],
    pendingRequests: ["35"], // user 35 এর কাছ থেকে request এসেছে
    sentRequests: [], // user 25 কারো কাছে request পাঠায়নি
    saved: ["p5", "p20"],
    joinedGroup: ["g11"],
    sentRequestGroup: [],
  },
  {
    id: "26",
    name: "Fatema Khatun (26/40)",
    username: "fatemak",
    email: "fatema.khatun@ru.ac.bd",
    password: "password123",
    phone: "+8801967890125",
    avatar:
      "https://ui-avatars.com/api/?name=Fatema+Khatun&background=ff9ff3&color=fff&size=150&bold=true&rounded=true",
    bio: "Senior Lecturer in Psychology, cognitive psychology specialist",
    role: ["teacher"],
    category: "university",
    university: {
      name: "University of Rajshahi",
      dept: "Psychology",
    },
    gender: "female",
    religion: "Islam",
    friends: ["36", "37"],
    pendingRequests: ["21", "38"], // user 21, 38 এর কাছ থেকে request এসেছে
    sentRequests: ["21"], // user 26 user 21 এর কাছে request পাঠিয়েছে
    saved: ["p6", "p1"],
    joinedGroup: ["g12"],
    sentRequestGroup: [],
  },
  {
    id: "27",
    name: "Sabbir Ahmed (27/40)",
    username: "sabbira",
    email: "sabbir.ahmed@nstu.edu.bd",
    password: "password123",
    phone: "+8801778901236",
    avatar:
      "https://ui-avatars.com/api/?name=Sabbir+Ahmed&background=54a0ff&color=fff&size=150&bold=true&rounded=true",
    bio: "Marine Science student at NSTU, oceanography and marine biology enthusiast",
    role: ["student"],
    category: "university",
    university: {
      name: "Noakhali Science and Technology University",
      dept: "Marine Science",
      section: "A",
      subsection: "1",
      roll: "1701023",
    },
    gender: "male",
    religion: "Islam",
    friends: ["22", "39", "40"],
    pendingRequests: ["26"], // user 26 এর কাছ থেকে request এসেছে
    sentRequests: ["26"], // user 27 user 26 এর কাছে request পাঠিয়েছে
    saved: ["p7", "p2"],
    joinedGroup: ["g12"],
    sentRequestGroup: [],
  },
  {
    id: "28",
    name: "Salma Akter (28/40)",
    username: "salmaa",
    email: "salma.akter@bau.edu.bd",
    password: "password123",
    phone: "+8801889012347",
    avatar:
      "https://ui-avatars.com/api/?name=Salma+Akter&background=5f27cd&color=fff&size=150&bold=true&rounded=true",
    bio: "Professor of Agriculture, sustainable farming and crop science expert",
    role: ["teacher"],
    category: "university",
    university: {
      name: "Bangladesh Agricultural University",
      dept: "Agriculture",
    },
    gender: "female",
    religion: "Islam",
    friends: ["22", "24"],
    pendingRequests: ["27", "29"], // user 27, 29 এর কাছ থেকে request এসেছে
    sentRequests: ["22"], // user 28 user 22 এর কাছে request পাঠিয়েছে
    saved: ["p8", "p3"],
    joinedGroup: ["g13"],
    sentRequestGroup: [],
  },
  {
    id: "29",
    name: "Tanvir Islam (29/40)",
    username: "tanviri",
    email: "tanvir.islam@pstu.ac.bd",
    password: "password123",
    phone: "+8801990123458",
    avatar:
      "https://ui-avatars.com/api/?name=Tanvir+Islam&background=00d2d3&color=fff&size=150&bold=true&rounded=true",
    bio: "Veterinary Medicine student at PSTU, animal health and welfare advocate",
    role: ["student"],
    category: "university",
    university: {
      name: "Patuakhali Science and Technology University",
      dept: "Veterinary Medicine",
      section: "B",
      subsection: "1",
      roll: "1605089",
    },
    gender: "male",
    religion: "Islam",
    friends: ["23", "28", "30"],
    pendingRequests: ["31"], // user 31 এর কাছ থেকে request এসেছে
    sentRequests: ["28"], // user 29 user 28 এর কাছে request পাঠিয়েছে
    saved: ["p9", "p4"],
    joinedGroup: ["g13"],
    sentRequestGroup: [],
  },
  {
    id: "30",
    name: "Ruma Parvin (30/40)",
    username: "rumap",
    email: "ruma.parvin@hstu.ac.bd",
    password: "password123",
    phone: "+8801601234569",
    avatar:
      "https://ui-avatars.com/api/?name=Ruma+Parvin&background=ff6348&color=fff&size=150&bold=true&rounded=true",
    bio: "Assistant Professor in Sociology, social research and gender studies specialist",
    role: ["teacher"],
    category: "university",
    university: {
      name: "Hajee Mohammad Danesh Science and Technology University",
      dept: "Sociology",
    },
    gender: "female",
    religion: "Islam",
    friends: ["23", "29"],
    pendingRequests: ["32", "33"], // user 32, 33 এর কাছ থেকে request এসেছে
    sentRequests: [], // user 30 কারো কাছে request পাঠায়নি
    saved: ["p10", "p5"],
    joinedGroup: ["g14"],
    sentRequestGroup: [],
  },
  {
    id: "31",
    name: "Marium Sultana (31/40)",
    username: "mariums",
    email: "marium.sultana@gmail.com",
    password: "password123",
    phone: "+8801712345681",
    avatar:
      "https://ui-avatars.com/api/?name=Marium+Sultana&background=ff7675&color=fff&size=150&bold=true&rounded=true",
    bio: "HSC Science student at Dhaka College, aspiring to study medicine",
    role: ["student"],
    category: "hsc",
    college: {
      name: "Dhaka College",
      dept: "science",
      section: "A",
      roll: "101234",
      sscBatch: "2020",
      level: "1st year",
    },
    gender: "female",
    religion: "Islam",
    friends: ["24", "32", "35"],
    pendingRequests: ["36"], // user 36 এর কাছ থেকে request এসেছে
    sentRequests: ["29"], // user 31 user 29 এর কাছে request পাঠিয়েছে
    saved: ["p11", "p6"],
    joinedGroup: ["g14"],
    sentRequestGroup: [],
  },
  {
    id: "32",
    name: "Rafiq Hasan (32/40)",
    username: "rafiqs",
    email: "rafiq.hasan@teacher.edu.bd",
    password: "password123",
    phone: "+8801823456792",
    avatar:
      "https://ui-avatars.com/api/?name=Rafiq+Hasan&background=74b9ff&color=fff&size=150&bold=true&rounded=true",
    bio: "Physics teacher at Notre Dame College, passionate about experimental physics",
    role: ["teacher"],
    category: "hsc",
    college: {
      name: "Notre Dame College",
      dept: "science",
      sscBatch: "1995",
    },
    gender: "male",
    religion: "Islam",
    friends: ["24", "30", "31"],
    pendingRequests: ["33"], // user 33 এর কাছ থেকে request এসেছে
    sentRequests: ["24", "30"], // user 32 user 24, 30 এর কাছে request পাঠিয়েছে
    saved: ["p12", "p7"],
    joinedGroup: ["g15"],
    sentRequestGroup: [],
  },
  {
    id: "33",
    name: "Nasreen Akhter (33/40)",
    username: "nasreena",
    email: "nasreen.akhter@gmail.com",
    password: "password123",
    phone: "+8801934567893",
    avatar:
      "https://ui-avatars.com/api/?name=Nasreen+Akhter&background=a29bfe&color=fff&size=150&bold=true&rounded=true",
    bio: "HSC Business Studies student at Viqarunnisa Noon College, future entrepreneur",
    role: ["student"],
    category: "hsc",
    college: {
      name: "Viqarunnisa Noon College",
      dept: "commerce",
      section: "B",
      roll: "205678",
      sscBatch: "2021",
      level: "2nd year",
    },
    gender: "female",
    religion: "Islam",
    friends: ["25", "30", "34"],
    pendingRequests: ["32", "37"], // user 32, 37 এর কাছ থেকে request এসেছে
    sentRequests: ["30", "32"], // user 33 user 30, 32 এর কাছে request পাঠিয়েছে
    saved: ["p13", "p8"],
    joinedGroup: ["g15"],
    sentRequestGroup: [],
  },
  {
    id: "34",
    name: "Aminul Islam (34/40)",
    username: "aminuli",
    email: "aminul.islam@gmail.com",
    password: "password123",
    phone: "+8801745678904",
    avatar:
      "https://ui-avatars.com/api/?name=Aminul+Islam&background=6c5ce7&color=fff&size=150&bold=true&rounded=true",
    bio: "HSC Humanities student at Rajshahi College, interested in history and literature",
    role: ["student"],
    category: "hsc",
    college: {
      name: "Rajshahi College",
      dept: "arts",
      section: "C",
      roll: "301456",
      sscBatch: "2020",
      level: "1st year",
    },
    gender: "male",
    religion: "Islam",
    friends: ["25", "33", "38"],
    pendingRequests: ["39"], // user 39 এর কাছ থেকে request এসেছে
    sentRequests: [], // user 34 কারো কাছে request পাঠায়নি
    saved: ["p14", "p9"],
    joinedGroup: ["g16"],
    sentRequestGroup: [],
  },
  {
    id: "35",
    name: "Shireen Begum (35/40)",
    username: "shireens",
    email: "shireen.begum@teacher.edu.bd",
    password: "password123",
    phone: "+8801856789015",
    avatar:
      "https://ui-avatars.com/api/?name=Shireen+Begum&background=fd79a8&color=fff&size=150&bold=true&rounded=true",
    bio: "Mathematics teacher at Holy Cross College, loves solving complex problems",
    role: ["teacher"],
    category: "hsc",
    college: {
      name: "Holy Cross College",
      dept: "science",
      sscBatch: "1992",
    },
    gender: "female",
    religion: "Islam",
    friends: ["25", "31", "36"],
    pendingRequests: ["40"], // user 40 এর কাছ থেকে request এসেছে
    sentRequests: ["25"], // user 35 user 25 এর কাছে request পাঠিয়েছে
    saved: ["p15", "p10"],
    joinedGroup: ["g16"],
    sentRequestGroup: [],
  },
  {
    id: "36",
    name: "Habibur Rahman (36/40)",
    username: "habiburs",
    email: "habibur.rahman@gmail.com",
    password: "password123",
    phone: "+8801967890126",
    avatar:
      "https://ui-avatars.com/api/?name=Habibur+Rahman&background=00b894&color=fff&size=150&bold=true&rounded=true",
    bio: "HSC Science student at Chittagong College, chemistry enthusiast",
    role: ["student"],
    category: "hsc",
    college: {
      name: "Chittagong College",
      dept: "science",
      section: "A",
      roll: "102789",
      sscBatch: "2021",
      level: "2nd year",
    },
    gender: "male",
    religion: "Hindu",
    friends: ["26", "31", "35"],
    pendingRequests: [], // কেউ user 36 এর কাছে request পাঠায়নি
    sentRequests: ["31"], // user 36 user 31 এর কাছে request পাঠিয়েছে
    saved: ["p16", "p11"],
    joinedGroup: ["g17"],
    sentRequestGroup: [],
  },
  {
    id: "37",
    name: "Farida Yasmin (37/40)",
    username: "faridas",
    email: "farida.yasmin@gmail.com",
    password: "password123",
    phone: "+8801778901237",
    avatar:
      "https://ui-avatars.com/api/?name=Farida+Yasmin&background=e17055&color=fff&size=150&bold=true&rounded=true",
    bio: "HSC Business Studies student at Eden Mohila College, accounting specialist",
    role: ["student"],
    category: "hsc",
    college: {
      name: "Eden Mohila College",
      dept: "commerce",
      section: "A",
      roll: "203456",
      sscBatch: "2020",
      level: "1st year",
    },
    gender: "female",
    religion: "Other",
    friends: ["26", "33", "39"],
    pendingRequests: ["33"], // user 33 এর কাছ থেকে request এসেছে
    sentRequests: [], // user 37 কারো কাছে request পাঠায়নি
    saved: ["p17", "p12"],
    joinedGroup: ["g17"],
    sentRequestGroup: [],
  },
  {
    id: "38",
    name: "Golam Mostafa (38/40)",
    username: "golams",
    email: "golam.mostafa@teacher.edu.bd",
    password: "password123",
    phone: "+8801889012348",
    avatar:
      "https://ui-avatars.com/api/?name=Golam+Mostafa&background=0984e3&color=fff&size=150&bold=true&rounded=true",
    bio: "English teacher at Sylhet Government College, literature and language expert",
    role: ["teacher"],
    category: "hsc",
    college: {
      name: "Sylhet Government College",
      dept: "arts",
      sscBatch: "1988",
    },
    gender: "male",
    religion: "Islam",
    friends: ["26", "34", "40"],
    pendingRequests: ["26"], // user 26 এর কাছ থেকে request এসেছে
    sentRequests: [], // user 38 কারো কাছে request পাঠায়নি
    saved: ["p18", "p13"],
    joinedGroup: ["g18"],
    sentRequestGroup: [],
  },
  {
    id: "39",
    name: "Rehana Khatun (39/40)",
    username: "rehanas",
    email: "rehana.khatun@gmail.com",
    password: "password123",
    phone: "+8801990123459",
    avatar:
      "https://ui-avatars.com/api/?name=Rehana+Khatun&background=fdcb6e&color=fff&size=150&bold=true&rounded=true",
    bio: "HSC Humanities student at Comilla Victoria College, passionate about social work",
    role: ["student"],
    category: "hsc",
    college: {
      name: "Comilla Victoria College",
      dept: "arts",
      section: "B",
      roll: "302567",
      sscBatch: "2021",
      level: "2nd year",
    },
    gender: "female",
    religion: "Islam",
    friends: ["27", "34", "37"],
    pendingRequests: ["34"], // user 34 এর কাছ থেকে request এসেছে
    sentRequests: [], // user 39 কারো কাছে request পাঠায়নি
    saved: ["p19", "p14"],
    joinedGroup: ["g18"],
    sentRequestGroup: [],
  },
  {
    id: "40",
    name: "Zakir Hossain (40/40)",
    username: "zakirs",
    email: "zakir.hossain@gmail.com",
    password: "password123",
    phone: "+8801601234570",
    avatar:
      "https://ui-avatars.com/api/?name=Zakir+Hossain&background=2d3436&color=fff&size=150&bold=true&rounded=true",
    bio: "HSC Science student at Barisal Government College, future engineer",
    role: ["student"],
    category: "hsc",
    college: {
      name: "Barisal Government College",
      dept: "science",
      section: "C",
      roll: "103890",
      sscBatch: "2020",
      level: "1st year",
    },
    gender: "male",
    religion: "Hindu",
    friends: ["27", "38"],
    pendingRequests: ["35"], // user 35 এর কাছ থেকে request এসেছে
    sentRequests: [], // user 40 কারো কাছে request পাঠায়নি
    saved: ["p20", "p15"],
    joinedGroup: ["g19"],
    sentRequestGroup: [],
  },
];

export const getUserById = (userId: string): UserData | null => {
  return usersData.find((user) => user.id === userId) || null;
};

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

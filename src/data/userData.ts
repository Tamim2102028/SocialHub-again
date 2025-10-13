export const getCurrentUserId = (): string => {
  // For demo, treat id '1' as the current user
  return "1";
};

// Generate dynamic avatar URL using RandomUser.me API
export const generateAvatarUrl = (
  userId: string,
  gender: "male" | "female"
): string => {
  // Convert userId to number for consistent avatar selection
  const numericId = parseInt(userId) || 1;
  // Use modulo to get a number between 1-100 for RandomUser API
  const avatarNumber = ((numericId - 1) % 100) + 1;

  return `https://randomuser.me/api/portraits/${gender}/${avatarNumber}.jpg`;
};

// Helper function to assign gender based on name patterns
export const assignGender = (name: string): "male" | "female" => {
  const femaleNames = [
    "Sarah",
    "Emma",
    "Linda",
    "Sophia",
    "Olivia",
    "Mia",
    "Ava",
    "Rachel",
  ];
  const firstName = name.split(" ")[0];
  return femaleNames.includes(firstName) ? "female" : "male";
};

export interface UserData {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  university: string;
  gender?: "male" | "female"; // Make gender optional for now
  friends: string[];
  pendingRequests?: string[];
  saved?: string[]; // Bookmarked post IDs
}

export const usersData: UserData[] = [
  {
    id: "1",
    name: "Tamim Ikbal (1/20)",
    username: "tamim_ikbal",
    avatar: generateAvatarUrl("1", "male"),
    bio: "User 1 bio",
    university: "University 1",
    gender: "male",
    friends: ["2", "3", "5", "6", "12", "14", "15"],
    pendingRequests: ["4", "7", "8", "9"],
    saved: ["p1", "p3"],
  },
  {
    id: "2",
    name: "Sarah Wilson (2/20)",
    username: "sarahw",
    avatar: generateAvatarUrl("2", "female"),
    bio: "User 2 bio",
    university: "University 2",
    gender: "female",
    friends: ["1", "3"],
    pendingRequests: ["5"],
    saved: ["p2"],
  },
  {
    id: "3",
    name: "Alex Chen (3/20)",
    username: "alexc",
    avatar: generateAvatarUrl("3", "male"),
    bio: "User 3 bio",
    university: "University 3",
    gender: "male",
    friends: ["1", "2"],
    pendingRequests: [],
    saved: [],
  },
  {
    id: "4",
    name: "Mike Johnson (4/20)",
    username: "mikej",
    avatar: generateAvatarUrl("4", "male"),
    bio: "User 4 bio",
    university: "University 4",
    gender: "male",
    friends: ["5"],
    pendingRequests: [],
    saved: [],
  },
  {
    id: "5",
    name: "Emma Davis (5/20)",
    username: "emmad",
    avatar: generateAvatarUrl("5", "female"),
    bio: "User 5 bio",
    university: "University 5",
    gender: "female",
    friends: ["4"],
    pendingRequests: [],
    saved: [],
  },
  {
    id: "6",
    name: "Alex Johnson (6/20)",
    username: "alexj",
    avatar: generateAvatarUrl("6", "male"),
    bio: "User 6 bio",
    university: "University 6",
    gender: "male",
    friends: [],
    pendingRequests: [],
    saved: [],
  },
  {
    id: "7",
    name: "Emma Wilson (7/20)",
    username: "emmaw",
    avatar: generateAvatarUrl("7", "female"),
    bio: "User 7 bio",
    university: "University 7",
    gender: "female",
    friends: [],
    pendingRequests: [],
    saved: [],
  },
  {
    id: "8",
    name: "James Kim (8/20)",
    username: "jamesk",
    avatar: generateAvatarUrl("8", "male"),
    bio: "User 8 bio",
    university: "University 8",
    gender: "male",
    friends: [],
    pendingRequests: [],
    saved: [],
  },
  {
    id: "9",
    name: "Sarah Kim (9/20)",
    username: "sarahk",
    avatar: generateAvatarUrl("9", "female"),
    bio: "User 9 bio",
    university: "University 9",
    gender: "female",
    friends: [],
    pendingRequests: [],
    saved: [],
  },
  {
    id: "10",
    name: "Rachel Kim (10/20)",
    username: "rachelk",
    avatar: generateAvatarUrl("10", "female"),
    bio: "User 10 bio",
    university: "University 10",
    gender: "female",
    friends: [],
    pendingRequests: [],
    saved: [],
  },
  {
    id: "11",
    name: "John Smith (11/20)",
    username: "johns",
    avatar:
      "https://ui-avatars.com/api/?name=John+Smith&background=1abc9c&color=fff&size=150",
    bio: "User 11 bio",
    university: "University 11",
    friends: [],
    pendingRequests: [],
    saved: [],
  },
  {
    id: "12",
    name: "Linda Lee (12/20)",
    username: "lindal",
    avatar:
      "https://ui-avatars.com/api/?name=Linda+Lee&background=2ecc71&color=fff&size=150",
    bio: "User 12 bio",
    university: "University 12",
    friends: [],
    pendingRequests: [],
    saved: [],
  },
  {
    id: "13",
    name: "David Brown (13/20)",
    username: "davidb",
    avatar:
      "https://ui-avatars.com/api/?name=David+Brown&background=3498db&color=fff&size=150",
    bio: "User 13 bio",
    university: "University 13",
    friends: [],
    pendingRequests: [],
    saved: [],
  },
  {
    id: "14",
    name: "Sophia Miller (14/20)",
    username: "sophiam",
    avatar:
      "https://ui-avatars.com/api/?name=Sophia+Miller&background=9b59b6&color=fff&size=150",
    bio: "User 14 bio",
    university: "University 14",
    friends: [],
    pendingRequests: [],
    saved: [],
  },
  {
    id: "15",
    name: "William Garcia (15/20)",
    username: "williamg",
    avatar:
      "https://ui-avatars.com/api/?name=William+Garcia&background=e67e22&color=fff&size=150",
    bio: "User 15 bio",
    university: "University 15",
    friends: [],
    pendingRequests: [],
    saved: [],
  },
  {
    id: "16",
    name: "Olivia Martinez (16/20)",
    username: "oliviam",
    avatar:
      "https://ui-avatars.com/api/?name=Olivia+Martinez&background=e74c3c&color=fff&size=150",
    bio: "User 16 bio",
    university: "University 16",
    friends: [],
    pendingRequests: [],
    saved: [],
  },
  {
    id: "17",
    name: "Benjamin Lee (17/20)",
    username: "benjaminl",
    avatar:
      "https://ui-avatars.com/api/?name=Benjamin+Lee&background=34495e&color=fff&size=150",
    bio: "User 17 bio",
    university: "University 17",
    friends: [],
    pendingRequests: [],
  },
  {
    id: "18",
    name: "Mia Clark (18/20)",
    username: "miac",
    avatar:
      "https://ui-avatars.com/api/?name=Mia+Clark&background=16a085&color=fff&size=150",
    bio: "User 18 bio",
    university: "University 18",
    friends: [],
    pendingRequests: [],
  },
  {
    id: "19",
    name: "Elijah Walker (19/20)",
    username: "elijahw",
    avatar:
      "https://ui-avatars.com/api/?name=Elijah+Walker&background=27ae60&color=fff&size=150",
    bio: "User 19 bio",
    university: "University 19",
    friends: [],
    pendingRequests: [],
  },
  {
    id: "20",
    name: "Ava Hall (20/20)",
    username: "avah",
    avatar:
      "https://ui-avatars.com/api/?name=Ava+Hall&background=2980b9&color=fff&size=150",
    bio: "User 20 bio",
    university: "University 20",
    friends: [],
    pendingRequests: [],
  },
];

// Helper function to get user data by ID
export const getUserById = (userId: string): UserData | null => {
  return usersData.find((user) => user.id === userId) || null;
};

export interface Group {
  groupId: string;
  name: string;
  description: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  members: string[];
  admins: string[];
  privacy: "public" | "private" | "closed";
  category: string;
  tags: string[];
  memberCount: number;
  postCount: number;
  coverImage?: string;
  profileImage?: string;
  rules?: string[];
  isActive: boolean;
}

// Mock groups data
export const groupsData: Group[] = [
  {
    groupId: "g1",
    name: "Tech Enthusiasts",
    description: "A community for technology lovers and developers",
    createdBy: "1",
    createdAt: "2024-05-01T10:00:00Z",
    updatedAt: "2024-06-01T12:00:00Z",
    members: ["1", "2", "3", "4", "5"],
    admins: ["1", "2"],
    privacy: "public",
    category: "Technology",
    tags: ["tech", "programming", "coding"],
    memberCount: 5,
    postCount: 12,
    coverImage: "/images/tech-group-cover.jpg",
    profileImage: "/images/tech-group-profile.jpg",
    rules: [
      "Be respectful to all members",
      "Stay on topic related to technology",
      "No spam or promotional content",
    ],
    isActive: true,
  },
  {
    groupId: "g2",
    name: "Study Buddies",
    description:
      "Connect with fellow students for study sessions and academic support",
    createdBy: "6",
    createdAt: "2024-05-15T14:30:00Z",
    updatedAt: "2024-06-15T16:00:00Z",
    members: ["6", "7", "8", "9", "10", "11"],
    admins: ["6", "7"],
    privacy: "public",
    category: "Education",
    tags: ["study", "education", "academic"],
    memberCount: 6,
    postCount: 8,
    coverImage: "/images/study-group-cover.jpg",
    profileImage: "/images/study-group-profile.jpg",
    rules: [
      "Share study materials and resources",
      "Help each other with academic questions",
      "Maintain a supportive learning environment",
    ],
    isActive: true,
  },
  {
    groupId: "g3",
    name: "Fitness Freaks",
    description: "Motivate each other to stay fit and healthy",
    createdBy: "12",
    createdAt: "2024-05-20T08:00:00Z",
    updatedAt: "2024-06-20T10:30:00Z",
    members: ["12", "13", "14", "15", "16"],
    admins: ["12", "13"],
    privacy: "public",
    category: "Health & Fitness",
    tags: ["fitness", "workout", "health"],
    memberCount: 5,
    postCount: 15,
    coverImage: "/images/fitness-group-cover.jpg",
    profileImage: "/images/fitness-group-profile.jpg",
    rules: [
      "Share workout routines and tips",
      "Encourage healthy lifestyle choices",
      "Post progress updates and achievements",
    ],
    isActive: true,
  },
  {
    groupId: "g4",
    name: "Book Lovers",
    description: "Discuss your favorite books and discover new reads",
    createdBy: "17",
    createdAt: "2024-05-25T19:00:00Z",
    updatedAt: "2024-06-25T21:00:00Z",
    members: ["17", "18", "19", "20"],
    admins: ["17"],
    privacy: "public",
    category: "Literature",
    tags: ["books", "reading", "literature"],
    memberCount: 4,
    postCount: 6,
    coverImage: "/images/books-group-cover.jpg",
    profileImage: "/images/books-group-profile.jpg",
    rules: [
      "Share book recommendations",
      "Discuss plot points and themes",
      "Respect different reading preferences",
    ],
    isActive: true,
  },
  {
    groupId: "g5",
    name: "Cooking Masters",
    description: "Share recipes, cooking tips, and food adventures",
    createdBy: "8",
    createdAt: "2024-06-01T12:00:00Z",
    updatedAt: "2024-07-01T14:00:00Z",
    members: ["8", "9", "10", "11", "12", "13"],
    admins: ["8", "9"],
    privacy: "public",
    category: "Food & Cooking",
    tags: ["cooking", "recipes", "food"],
    memberCount: 6,
    postCount: 20,
    coverImage: "/images/cooking-group-cover.jpg",
    profileImage: "/images/cooking-group-profile.jpg",
    rules: [
      "Share original recipes and cooking tips",
      "Post photos of your culinary creations",
      "Be helpful with cooking questions",
    ],
    isActive: true,
  },
  {
    groupId: "g6",
    name: "Photography Club",
    description: "Showcase your photography skills and learn from others",
    createdBy: "14",
    createdAt: "2024-06-05T16:00:00Z",
    updatedAt: "2024-07-05T18:00:00Z",
    members: ["14", "15", "16", "17", "18"],
    admins: ["14", "15"],
    privacy: "public",
    category: "Arts & Photography",
    tags: ["photography", "art", "creativity"],
    memberCount: 5,
    postCount: 18,
    coverImage: "/images/photography-group-cover.jpg",
    profileImage: "/images/photography-group-profile.jpg",
    rules: [
      "Share your best photographs",
      "Provide constructive feedback",
      "Credit photographers when sharing others' work",
    ],
    isActive: true,
  },
  {
    groupId: "g7",
    name: "Gaming Squad",
    description: "Connect with fellow gamers and discuss your favorite games",
    createdBy: "19",
    createdAt: "2024-06-10T20:00:00Z",
    updatedAt: "2024-07-10T22:00:00Z",
    members: ["19", "20", "1", "2", "3"],
    admins: ["19", "20"],
    privacy: "public",
    category: "Gaming",
    tags: ["gaming", "esports", "games"],
    memberCount: 5,
    postCount: 25,
    coverImage: "/images/gaming-group-cover.jpg",
    profileImage: "/images/gaming-group-profile.jpg",
    rules: [
      "Share gaming achievements and screenshots",
      "Organize gaming sessions",
      "Discuss game strategies and tips",
    ],
    isActive: true,
  },
  {
    groupId: "g8",
    name: "Music Lovers",
    description: "Discover new music and share your favorite tracks",
    createdBy: "5",
    createdAt: "2024-06-15T11:00:00Z",
    updatedAt: "2024-07-15T13:00:00Z",
    members: ["5", "6", "7", "8", "9", "10"],
    admins: ["5", "6"],
    privacy: "public",
    category: "Music",
    tags: ["music", "songs", "artists"],
    memberCount: 6,
    postCount: 14,
    coverImage: "/images/music-group-cover.jpg",
    profileImage: "/images/music-group-profile.jpg",
    rules: [
      "Share music recommendations",
      "Discuss different genres and artists",
      "Be respectful of diverse musical tastes",
    ],
    isActive: true,
  },
];

export const getGroupById = (groupId: string): Group | undefined => {
  return groupsData.find((group) => group.groupId === groupId);
};

export const getGroupsByUserId = (userId: string): Group[] => {
  return groupsData.filter((group) => group.members.includes(userId));
};

export const getGroupsByAdmin = (userId: string): Group[] => {
  return groupsData.filter((group) => group.admins.includes(userId));
};

export const getPublicGroups = (): Group[] => {
  return groupsData.filter(
    (group) => group.privacy === "public" && group.isActive
  );
};

export const searchGroups = (query: string): Group[] => {
  const lowercaseQuery = query.toLowerCase();
  return groupsData.filter(
    (group) =>
      group.name.toLowerCase().includes(lowercaseQuery) ||
      group.description.toLowerCase().includes(lowercaseQuery) ||
      group.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
  );
};

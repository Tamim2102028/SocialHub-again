export interface GroupPost {
  postId: string;
  groupId: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  comments: number;
  likedBy: string[];
  sharesBy: string[];
  images?: string[];
  status?: "active" | "deleted";
  tags?: string[];
  isPinned?: boolean;
  isAnnouncement?: boolean;
}

// Mock group posts data
export const groupPostsData: GroupPost[] = [
  // Tech Enthusiasts Group (g1)
  {
    postId: "gp1",
    groupId: "g1",
    userId: "1",
    content:
      "Just learned React hooks! The useEffect hook is amazing for side effects. Anyone else working on React projects?",
    createdAt: "2024-06-01T10:30:00Z",
    updatedAt: "2024-06-01T11:00:00Z",
    comments: 5,
    likedBy: ["2", "3", "4"],
    sharesBy: ["2"],
    images: ["/images/react-hooks.jpg"],
    status: "active",
    tags: ["react", "javascript", "webdev"],
    isPinned: false,
    isAnnouncement: false,
  },
  {
    postId: "gp2",
    groupId: "g1",
    userId: "2",
    content:
      "TypeScript vs JavaScript - which one do you prefer for large projects? I'm finding TypeScript really helpful for catching errors early.",
    createdAt: "2024-06-02T14:20:00Z",
    updatedAt: "2024-06-02T15:00:00Z",
    comments: 8,
    likedBy: ["1", "3", "5"],
    sharesBy: [],
    images: [],
    status: "active",
    tags: ["typescript", "javascript", "programming"],
    isPinned: false,
    isAnnouncement: false,
  },
  {
    postId: "gp3",
    groupId: "g1",
    userId: "3",
    content:
      "🚀 Just deployed my first full-stack app! Used MERN stack - MongoDB, Express, React, and Node.js. The learning curve was steep but totally worth it!",
    createdAt: "2024-06-03T09:15:00Z",
    updatedAt: "2024-06-03T09:30:00Z",
    comments: 12,
    likedBy: ["1", "2", "4", "5"],
    sharesBy: ["1", "4"],
    images: ["/images/mern-app.jpg"],
    status: "active",
    tags: ["mern", "fullstack", "deployment"],
    isPinned: true,
    isAnnouncement: false,
  },

  // Study Buddies Group (g2)
  {
    postId: "gp4",
    groupId: "g2",
    userId: "6",
    content:
      "📚 Study session this Saturday at the library! Anyone interested in joining? We'll be covering calculus and physics.",
    createdAt: "2024-06-04T16:00:00Z",
    updatedAt: "2024-06-04T16:15:00Z",
    comments: 6,
    likedBy: ["7", "8", "9"],
    sharesBy: [],
    images: [],
    status: "active",
    tags: ["study", "calculus", "physics"],
    isPinned: true,
    isAnnouncement: true,
  },
  {
    postId: "gp5",
    groupId: "g2",
    userId: "7",
    content:
      "Does anyone have good resources for learning machine learning? Looking for beginner-friendly materials.",
    createdAt: "2024-06-05T11:30:00Z",
    updatedAt: "2024-06-05T12:00:00Z",
    comments: 4,
    likedBy: ["6", "8"],
    sharesBy: [],
    images: [],
    status: "active",
    tags: ["machinelearning", "resources", "beginner"],
    isPinned: false,
    isAnnouncement: false,
  },
  {
    postId: "gp6",
    groupId: "g2",
    userId: "8",
    content:
      "Group study for the upcoming exam was super helpful! Thanks everyone who joined. Let's do this again next week.",
    createdAt: "2024-06-06T18:45:00Z",
    updatedAt: "2024-06-06T19:00:00Z",
    comments: 3,
    likedBy: ["6", "7", "9", "10"],
    sharesBy: [],
    images: [],
    status: "active",
    tags: ["study", "exam", "group"],
    isPinned: false,
    isAnnouncement: false,
  },

  // Fitness Freaks Group (g3)
  {
    postId: "gp7",
    groupId: "g3",
    userId: "12",
    content:
      "💪 Completed my first 5K run today! It took me 28 minutes but I'm proud of myself. Consistency is key!",
    createdAt: "2024-06-07T07:30:00Z",
    updatedAt: "2024-06-07T08:00:00Z",
    comments: 7,
    likedBy: ["13", "14", "15", "16"],
    sharesBy: ["13"],
    images: ["/images/5k-finish.jpg"],
    status: "active",
    tags: ["running", "5k", "achievement"],
    isPinned: false,
    isAnnouncement: false,
  },
  {
    postId: "gp8",
    groupId: "g3",
    userId: "13",
    content:
      "Morning workout routine: 30 min cardio + 20 min strength training. Feeling energized for the day! What's your go-to morning routine?",
    createdAt: "2024-06-08T06:00:00Z",
    updatedAt: "2024-06-08T06:15:00Z",
    comments: 5,
    likedBy: ["12", "14", "15"],
    sharesBy: [],
    images: ["/images/morning-workout.jpg"],
    status: "active",
    tags: ["workout", "morning", "routine"],
    isPinned: false,
    isAnnouncement: false,
  },
  {
    postId: "gp9",
    groupId: "g3",
    userId: "14",
    content:
      "🏋️‍♀️ New personal record in deadlifts today! 150 lbs for 5 reps. The journey from 100 lbs has been incredible. Keep pushing everyone!",
    createdAt: "2024-06-09T17:00:00Z",
    updatedAt: "2024-06-09T17:30:00Z",
    comments: 9,
    likedBy: ["12", "13", "15", "16"],
    sharesBy: ["15"],
    images: ["/images/deadlift-pr.jpg"],
    status: "active",
    tags: ["deadlift", "pr", "strength"],
    isPinned: true,
    isAnnouncement: false,
  },

  // Book Lovers Group (g4)
  {
    postId: "gp10",
    groupId: "g4",
    userId: "17",
    content:
      "📖 Just finished 'The Seven Husbands of Evelyn Hugo' - what a rollercoaster! The character development was incredible. Highly recommend!",
    createdAt: "2024-06-10T20:00:00Z",
    updatedAt: "2024-06-10T20:30:00Z",
    comments: 4,
    likedBy: ["18", "19", "20"],
    sharesBy: ["18"],
    images: ["/images/evelyn-hugo-book.jpg"],
    status: "active",
    tags: ["bookreview", "fiction", "recommendation"],
    isPinned: false,
    isAnnouncement: false,
  },
  {
    postId: "gp11",
    groupId: "g4",
    userId: "18",
    content:
      "Book club meeting this Sunday! We're discussing 'Atomic Habits' by James Clear. Looking forward to hearing everyone's thoughts on building good habits.",
    createdAt: "2024-06-11T15:00:00Z",
    updatedAt: "2024-06-11T15:15:00Z",
    comments: 6,
    likedBy: ["17", "19", "20"],
    sharesBy: [],
    images: [],
    status: "active",
    tags: ["bookclub", "atomichabits", "meeting"],
    isPinned: true,
    isAnnouncement: true,
  },

  // Cooking Masters Group (g5)
  {
    postId: "gp12",
    groupId: "g5",
    userId: "8",
    content:
      "🍝 Made homemade pasta from scratch today! The recipe took 3 hours but the taste was absolutely worth it. Fresh pasta is a game changer!",
    createdAt: "2024-06-12T19:30:00Z",
    updatedAt: "2024-06-12T20:00:00Z",
    comments: 8,
    likedBy: ["9", "10", "11", "12"],
    sharesBy: ["9"],
    images: ["/images/homemade-pasta.jpg"],
    status: "active",
    tags: ["pasta", "homemade", "italian"],
    isPinned: false,
    isAnnouncement: false,
  },
  {
    postId: "gp13",
    groupId: "g5",
    userId: "9",
    content:
      "Recipe request: Does anyone have a good recipe for Korean fried chicken? I tried making it but it didn't come out crispy enough.",
    createdAt: "2024-06-13T12:00:00Z",
    updatedAt: "2024-06-13T12:15:00Z",
    comments: 5,
    likedBy: ["8", "10"],
    sharesBy: [],
    images: [],
    status: "active",
    tags: ["korean", "friedchicken", "recipe"],
    isPinned: false,
    isAnnouncement: false,
  },

  // Photography Club Group (g6)
  {
    postId: "gp14",
    groupId: "g6",
    userId: "14",
    content:
      "📸 Golden hour photography from yesterday's sunset. Nature never fails to amaze me with its colors. Photography tip: Always shoot during golden hour for the best natural lighting!",
    createdAt: "2024-06-14T06:30:00Z",
    updatedAt: "2024-06-14T07:00:00Z",
    comments: 7,
    likedBy: ["15", "16", "17", "18"],
    sharesBy: ["15", "16"],
    images: ["/images/golden-hour-sunset.jpg"],
    status: "active",
    tags: ["photography", "sunset", "goldenhour"],
    isPinned: true,
    isAnnouncement: false,
  },
  {
    postId: "gp15",
    groupId: "g6",
    userId: "15",
    content:
      "Portrait photography session with natural lighting. The key is finding the right angle and using soft, diffused light. Any tips from fellow photographers?",
    createdAt: "2024-06-15T14:00:00Z",
    updatedAt: "2024-06-15T14:30:00Z",
    comments: 6,
    likedBy: ["14", "16", "17"],
    sharesBy: [],
    images: ["/images/portrait-session.jpg"],
    status: "active",
    tags: ["portrait", "lighting", "photography"],
    isPinned: false,
    isAnnouncement: false,
  },

  // Gaming Squad Group (g7)
  {
    postId: "gp16",
    groupId: "g7",
    userId: "19",
    content:
      "🎮 Just reached Diamond rank in League of Legends! 2 years of grinding finally paid off. Anyone else playing LoL? Let's team up sometime!",
    createdAt: "2024-06-16T21:00:00Z",
    updatedAt: "2024-06-16T21:30:00Z",
    comments: 10,
    likedBy: ["20", "1", "2", "3"],
    sharesBy: ["20"],
    images: ["/images/lol-diamond-rank.jpg"],
    status: "active",
    tags: ["leagueoflegends", "gaming", "achievement"],
    isPinned: true,
    isAnnouncement: false,
  },
  {
    postId: "gp17",
    groupId: "g7",
    userId: "20",
    content:
      "Gaming tournament this weekend! First place gets $500. Who's in? We need 8 players total.",
    createdAt: "2024-06-17T18:00:00Z",
    updatedAt: "2024-06-17T18:15:00Z",
    comments: 8,
    likedBy: ["19", "1", "2"],
    sharesBy: ["1", "2"],
    images: [],
    status: "active",
    tags: ["tournament", "gaming", "competition"],
    isPinned: true,
    isAnnouncement: true,
  },

  // Music Lovers Group (g8)
  {
    postId: "gp18",
    groupId: "g8",
    userId: "5",
    content:
      "🎵 Discovered this amazing indie band today - 'Arctic Monkeys'. Their new album is pure gold! Anyone else into indie rock?",
    createdAt: "2024-06-18T16:30:00Z",
    updatedAt: "2024-06-18T17:00:00Z",
    comments: 5,
    likedBy: ["6", "7", "8", "9"],
    sharesBy: ["6"],
    images: [],
    status: "active",
    tags: ["indierock", "arctimonkeys", "music"],
    isPinned: false,
    isAnnouncement: false,
  },
  {
    postId: "gp19",
    groupId: "g8",
    userId: "6",
    content:
      "🎸 Started learning guitar 3 months ago. Finally can play 'Wonderwall' without mistakes! Small wins matter. What song should I learn next?",
    createdAt: "2024-06-19T19:00:00Z",
    updatedAt: "2024-06-19T19:30:00Z",
    comments: 7,
    likedBy: ["5", "7", "8", "9", "10"],
    sharesBy: ["7"],
    images: ["/images/guitar-practice.jpg"],
    status: "active",
    tags: ["guitar", "learning", "wonderwall"],
    isPinned: false,
    isAnnouncement: false,
  },
];

export const getGroupPostsByGroupId = (groupId: string): GroupPost[] => {
  return groupPostsData.filter((post) => post.groupId === groupId);
};

export const getGroupPostsByUserId = (userId: string): GroupPost[] => {
  return groupPostsData.filter((post) => post.userId === userId);
};

export const getPinnedGroupPosts = (groupId: string): GroupPost[] => {
  return groupPostsData.filter(
    (post) => post.groupId === groupId && post.isPinned
  );
};

export const getAnnouncementGroupPosts = (groupId: string): GroupPost[] => {
  return groupPostsData.filter(
    (post) => post.groupId === groupId && post.isAnnouncement
  );
};

export const getActiveGroupPosts = (groupId: string): GroupPost[] => {
  return groupPostsData.filter(
    (post) => post.groupId === groupId && post.status === "active"
  );
};

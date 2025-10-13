export interface Group {
  id: number;
  name: string;
  members: number;
  isPrivate: boolean;
  coverImage: string;
  category?: string;
  description?: string;
  rules?: string[];
  tags?: string[];
  createdBy?: string;
  createdAt?: string;
  posts?: number;
  admin?: {
    id: number;
    name: string;
    avatar: string;
  };
  recentPosts?: GroupPost[];
}

export interface GroupPost {
  id: number;
  content: string;
  author: {
    id: number;
    name: string;
    avatar: string;
    role?: "admin" | "moderator" | "member";
  };
  createdAt: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
  images?: string[];
  isPinned?: boolean;
}

export const mockMyGroups: Group[] = [
  {
    id: 1,
    name: "React Developers",
    members: 1250,
    isPrivate: false,
    coverImage:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop",
    category: "University",
    description:
      "A community for React developers to share knowledge, discuss best practices, and collaborate on projects. Whether you're a beginner or an expert, everyone is welcome!",
    rules: [
      "Be respectful to all members",
      "No spam or self-promotion without permission",
      "Share helpful resources and tips",
      "Use appropriate channels for discussions",
      "Help newcomers learn React",
    ],
    tags: ["React", "JavaScript", "Frontend", "Web Development"],
    createdBy: "John Doe",
    createdAt: "2023-01-15",
    posts: 245,
    admin: {
      id: 1,
      name: "John Doe",
      avatar:
        "https://ui-avatars.com/api/?name=John+Doe&background=0084ff&color=fff",
    },
    recentPosts: [
      {
        id: 1,
        content:
          "🚀 Just discovered React Query and it's a game changer! The way it handles server state management is incredible. Anyone else using it in production? Would love to hear your experiences!",
        author: {
          id: 1,
          name: "John Doe",
          avatar:
            "https://ui-avatars.com/api/?name=John+Doe&background=0084ff&color=fff",
          role: "admin",
        },
        createdAt: "2025-09-21T10:30:00Z",
        likes: 45,
        comments: 12,
        isLiked: false,
        isPinned: true,
      },
      {
        id: 2,
        content:
          "Need help with React 18's Concurrent Features. Has anyone implemented Suspense for data fetching in a large application? Running into some edge cases with error boundaries.",
        author: {
          id: 15,
          name: "Sarah Chen",
          avatar:
            "https://ui-avatars.com/api/?name=Sarah+Chen&background=ff6b6b&color=fff",
          role: "member",
        },
        createdAt: "2025-09-21T08:15:00Z",
        likes: 23,
        comments: 8,
        isLiked: true,
      },
      {
        id: 3,
        content:
          "Weekly Challenge: Build a custom hook for form validation! 💪 Share your solutions below. Here's mine:\n\nconst useFormValidation = (rules) => {\n  // Your implementation here\n};\n\nLet's see who can make it the most elegant!",
        author: {
          id: 7,
          name: "Mike Rodriguez",
          avatar:
            "https://ui-avatars.com/api/?name=Mike+Rodriguez&background=4ecdc4&color=fff",
          role: "moderator",
        },
        createdAt: "2025-09-20T16:45:00Z",
        likes: 67,
        comments: 24,
        isLiked: false,
      },
      {
        id: 4,
        content:
          "PSA: Remember to use React.memo() wisely! Just because a component can be memoized doesn't mean it should be. Profile first, optimize second. Here's a great article about it: [link]",
        author: {
          id: 32,
          name: "Emma Wilson",
          avatar:
            "https://ui-avatars.com/api/?name=Emma+Wilson&background=9b59b6&color=fff",
          role: "member",
        },
        createdAt: "2025-09-20T14:20:00Z",
        likes: 89,
        comments: 15,
        isLiked: true,
      },
      {
        id: 5,
        content:
          "Sharing my latest side project: A React component library built with TypeScript and Storybook! 🎨 It includes 50+ accessible components. Check it out and let me know what you think!",
        author: {
          id: 28,
          name: "Alex Johnson",
          avatar:
            "https://ui-avatars.com/api/?name=Alex+Johnson&background=f39c12&color=fff",
          role: "member",
        },
        createdAt: "2025-09-20T11:30:00Z",
        likes: 156,
        comments: 34,
        isLiked: false,
        images: [
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
        ],
      },
    ],
  },
  {
    id: 2,
    name: "UI/UX Designers",
    members: 980,
    isPrivate: true,
    coverImage:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=200&fit=crop",
    category: "University",
    description:
      "An exclusive community for UI/UX designers to showcase work, get feedback, and discuss design trends. Private group for serious designers only.",
    rules: [
      "Portfolio review required for entry",
      "Constructive feedback only",
      "No plagiarism or stolen work",
      "Weekly design challenges participation encouraged",
    ],
    tags: ["UI", "UX", "Design", "Figma", "Adobe"],
    createdBy: "Sarah Wilson",
    createdAt: "2023-03-22",
    posts: 189,
    admin: {
      id: 2,
      name: "Sarah Wilson",
      avatar:
        "https://ui-avatars.com/api/?name=Sarah+Wilson&background=ff6b6b&color=fff",
    },
    recentPosts: [
      {
        id: 6,
        content:
          "📱 iOS 17 Design Guidelines are out! The new typography system and color schemes are beautiful. Who's already updating their app designs? Share your before/after shots!",
        author: {
          id: 2,
          name: "Sarah Wilson",
          avatar:
            "https://ui-avatars.com/api/?name=Sarah+Wilson&background=ff6b6b&color=fff",
          role: "admin",
        },
        createdAt: "2025-09-21T09:45:00Z",
        likes: 78,
        comments: 19,
        isLiked: true,
        isPinned: true,
      },
      {
        id: 7,
        content:
          "Prototyping vs. Wireframing debate: Which comes first in your design process? I've been experimenting with going straight to high-fidelity prototypes lately. Thoughts?",
        author: {
          id: 45,
          name: "David Park",
          avatar:
            "https://ui-avatars.com/api/?name=David+Park&background=3498db&color=fff",
          role: "member",
        },
        createdAt: "2025-09-21T07:20:00Z",
        likes: 34,
        comments: 16,
        isLiked: false,
      },
      {
        id: 8,
        content:
          "Just finished a 6-month UX research project on e-commerce checkout flows. Key finding: reducing form fields by 40% increased conversion by 23%! Detailed case study in comments 👇",
        author: {
          id: 67,
          name: "Lisa Chang",
          avatar:
            "https://ui-avatars.com/api/?name=Lisa+Chang&background=e74c3c&color=fff",
          role: "member",
        },
        createdAt: "2025-09-20T15:30:00Z",
        likes: 125,
        comments: 28,
        isLiked: true,
        images: [
          "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
        ],
      },
      {
        id: 9,
        content:
          "Hot take: Dark mode isn't always better for accessibility. Context matters! Here's when to use light vs dark themes based on user research...",
        author: {
          id: 23,
          name: "Marcus Thompson",
          avatar:
            "https://ui-avatars.com/api/?name=Marcus+Thompson&background=2ecc71&color=fff",
          role: "moderator",
        },
        createdAt: "2025-09-20T13:15:00Z",
        likes: 89,
        comments: 42,
        isLiked: false,
      },
      {
        id: 10,
        content:
          "Figma Auto Layout vs CSS Flexbox: Understanding the differences helped me become a better designer AND developer. Here's my comparison guide... 🎨💻",
        author: {
          id: 56,
          name: "Rachel Kim",
          avatar:
            "https://ui-avatars.com/api/?name=Rachel+Kim&background=9b59b6&color=fff",
          role: "member",
        },
        createdAt: "2025-09-20T10:45:00Z",
        likes: 67,
        comments: 12,
        isLiked: true,
      },
    ],
  },
  {
    id: 3,
    name: "Startup Founders",
    members: 2340,
    isPrivate: false,
    coverImage:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=200&fit=crop",
    category: "HSC",
    description:
      "Connect with fellow entrepreneurs, share startup experiences, and learn from successful founders. Get advice on funding, scaling, and building great products.",
    rules: [
      "Share genuine startup experiences",
      "No pyramid schemes or MLM",
      "Provide value before asking for help",
      "Respect intellectual property",
    ],
    tags: ["Startup", "Entrepreneurship", "Business", "Funding", "Growth"],
    createdBy: "Mike Chen",
    createdAt: "2022-11-08",
    posts: 567,
    admin: {
      id: 3,
      name: "Mike Chen",
      avatar:
        "https://ui-avatars.com/api/?name=Mike+Chen&background=4ecdc4&color=fff",
    },
    recentPosts: [
      {
        id: 11,
        content:
          "🚀 Just closed our Series A! $5M raised. Key lessons: 1) Traction speaks louder than projections 2) Team matters more than idea 3) Timing is everything. AMA about the fundraising process!",
        author: {
          id: 3,
          name: "Mike Chen",
          avatar:
            "https://ui-avatars.com/api/?name=Mike+Chen&background=4ecdc4&color=fff",
          role: "admin",
        },
        createdAt: "2025-09-21T11:00:00Z",
        likes: 234,
        comments: 67,
        isLiked: true,
        isPinned: true,
      },
      {
        id: 12,
        content:
          "Struggling with product-market fit. We have users but they're not paying. How do you know when to pivot vs. when to persist? Looking for honest advice from those who've been there.",
        author: {
          id: 89,
          name: "Jennifer Walsh",
          avatar:
            "https://ui-avatars.com/api/?name=Jennifer+Walsh&background=e67e22&color=fff",
          role: "member",
        },
        createdAt: "2025-09-21T06:30:00Z",
        likes: 45,
        comments: 23,
        isLiked: false,
      },
      {
        id: 13,
        content:
          "Hiring your first 10 employees is HARD. Here's what I wish I knew: 1) Hire for attitude, train for skill 2) Culture matters from day one 3) Don't compromise on values. What's your biggest hiring lesson?",
        author: {
          id: 76,
          name: "Carlos Rodriguez",
          avatar:
            "https://ui-avatars.com/api/?name=Carlos+Rodriguez&background=8e44ad&color=fff",
          role: "member",
        },
        createdAt: "2025-09-20T18:45:00Z",
        likes: 87,
        comments: 31,
        isLiked: true,
      },
      {
        id: 14,
        content:
          "Remote-first startup challenges: Maintaining company culture across 12 time zones. We've tried everything - virtual coffee breaks, async standups, quarterly retreats. What works for you?",
        author: {
          id: 43,
          name: "Priya Sharma",
          avatar:
            "https://ui-avatars.com/api/?name=Priya+Sharma&background=16a085&color=fff",
          role: "member",
        },
        createdAt: "2025-09-20T14:20:00Z",
        likes: 56,
        comments: 19,
        isLiked: false,
      },
      {
        id: 15,
        content:
          "Bootstrap vs. VC funding: We've been profitable since month 6 without external funding. Sometimes the 'harder' path is actually easier. Here's our journey and why we chose bootstrap...",
        author: {
          id: 91,
          name: "Tom Anderson",
          avatar:
            "https://ui-avatars.com/api/?name=Tom+Anderson&background=2980b9&color=fff",
          role: "member",
        },
        createdAt: "2025-09-20T12:10:00Z",
        likes: 123,
        comments: 28,
        isLiked: true,
      },
    ],
  },
];

export const mockSuggestedGroups: Group[] = [
  {
    id: 4,
    name: "Web3 Enthusiasts",
    members: 890,
    isPrivate: false,
    coverImage:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=200&fit=crop",
    category: "Medical College",
    description:
      "Explore the future of the internet with blockchain, cryptocurrencies, NFTs, and decentralized applications. Learn and discuss Web3 technologies.",
    rules: [
      "No financial advice or pump and dump",
      "Focus on technology, not speculation",
      "Share educational content",
      "Beginner-friendly discussions welcome",
    ],
    tags: ["Web3", "Blockchain", "Crypto", "NFT", "DeFi"],
    createdBy: "Alex Turner",
    createdAt: "2023-06-10",
    posts: 123,
    admin: {
      id: 4,
      name: "Alex Turner",
      avatar:
        "https://ui-avatars.com/api/?name=Alex+Turner&background=9b59b6&color=fff",
    },
    recentPosts: [
      {
        id: 16,
        content:
          "🔮 Ethereum merge anniversary thoughts: Layer 2 scaling is where the real innovation is happening. Arbitrum, Optimism, Polygon - which one are you building on and why? Share your L2 experiences!",
        author: {
          id: 4,
          name: "Alex Turner",
          avatar:
            "https://ui-avatars.com/api/?name=Alex+Turner&background=9b59b6&color=fff",
          role: "admin",
        },
        createdAt: "2025-09-21T15:30:00Z",
        likes: 189,
        comments: 52,
        isLiked: true,
        isPinned: true,
      },
      {
        id: 17,
        content:
          "Hot take: Most NFT projects are solving the wrong problem. Real utility comes from provable ownership of digital assets, not expensive JPEGs. Building a supply chain tracking dApp - thoughts?",
        author: {
          id: 112,
          name: "Sofia Martinez",
          avatar:
            "https://ui-avatars.com/api/?name=Sofia+Martinez&background=e74c3c&color=fff",
          role: "moderator",
        },
        createdAt: "2025-09-21T09:15:00Z",
        likes: 78,
        comments: 34,
        isLiked: false,
      },
      {
        id: 18,
        content:
          "DeFi security audit nightmare: Found 3 critical vulnerabilities in a project that's already live with $2M TVL. How do we balance speed to market with security in DeFi? This keeps me up at night.",
        author: {
          id: 67,
          name: "Kevin Wu",
          avatar:
            "https://ui-avatars.com/api/?name=Kevin+Wu&background=f39c12&color=fff",
          role: "member",
        },
        createdAt: "2025-09-20T22:40:00Z",
        likes: 134,
        comments: 41,
        isLiked: true,
      },
      {
        id: 19,
        content:
          "Web3 UX is still terrible. Users shouldn't need a PhD in cryptography to use your dApp. Working on wallet abstraction - who else is tackling the UX problem in Web3?",
        author: {
          id: 98,
          name: "Maya Patel",
          avatar:
            "https://ui-avatars.com/api/?name=Maya+Patel&background=1abc9c&color=fff",
          role: "member",
        },
        createdAt: "2025-09-20T16:25:00Z",
        likes: 201,
        comments: 68,
        isLiked: true,
      },
      {
        id: 20,
        content:
          "Solidity gas optimization tips thread 🧵: 1) Use events instead of storage for data you don't need to query 2) Pack structs efficiently 3) Use assembly for simple operations. What's your favorite gas-saving trick?",
        author: {
          id: 154,
          name: "James Kim",
          avatar:
            "https://ui-avatars.com/api/?name=James+Kim&background=34495e&color=fff",
          role: "member",
        },
        createdAt: "2025-09-20T13:50:00Z",
        likes: 167,
        comments: 29,
        isLiked: false,
      },
    ],
  },
  {
    id: 5,
    name: "Digital Marketing",
    members: 1560,
    isPrivate: false,
    coverImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop",
    category: "HSC",
    description:
      "Master digital marketing strategies, SEO, social media marketing, content creation, and analytics. Share campaigns and learn from experts.",
    rules: [
      "Share case studies and results",
      "No direct promotion without value",
      "Help others grow their skills",
      "Stay updated with latest trends",
    ],
    tags: ["Digital Marketing", "SEO", "Social Media", "Content", "Analytics"],
    createdBy: "Emma Rodriguez",
    createdAt: "2023-04-18",
    posts: 298,
    admin: {
      id: 5,
      name: "Emma Rodriguez",
      avatar:
        "https://ui-avatars.com/api/?name=Emma+Rodriguez&background=f39c12&color=fff",
    },
    recentPosts: [
      {
        id: 21,
        content:
          "🎯 Google Ads update: Performance Max campaigns are now showing 40% better ROAS for e-commerce clients. The AI optimization is finally getting good. Here's my setup strategy...",
        author: {
          id: 5,
          name: "Emma Rodriguez",
          avatar:
            "https://ui-avatars.com/api/?name=Emma+Rodriguez&background=f39c12&color=fff",
          role: "admin",
        },
        createdAt: "2025-09-21T14:20:00Z",
        likes: 156,
        comments: 42,
        isLiked: true,
        isPinned: true,
      },
      {
        id: 22,
        content:
          "TikTok organic reach is dead for most brands. Spent $50k testing and here's what actually works in 2024: 1) Authentic UGC-style content 2) Trend hijacking within 24hrs 3) Micro-influencer partnerships. Thoughts?",
        author: {
          id: 183,
          name: "Marcus Thompson",
          avatar:
            "https://ui-avatars.com/api/?name=Marcus+Thompson&background=e74c3c&color=fff",
          role: "moderator",
        },
        createdAt: "2025-09-21T10:45:00Z",
        likes: 89,
        comments: 31,
        isLiked: false,
      },
      {
        id: 23,
        content:
          "Email marketing isn't dead! Just hit 47% open rate and 12% CTR with a B2B SaaS client. Secret: Hyper-personalization using behavioral data. Stop sending generic newsletters! 📧",
        author: {
          id: 145,
          name: "Sarah Kim",
          avatar:
            "https://ui-avatars.com/api/?name=Sarah+Kim&background=9b59b6&color=fff",
          role: "member",
        },
        createdAt: "2025-09-21T08:30:00Z",
        likes: 234,
        comments: 56,
        isLiked: true,
      },
      {
        id: 24,
        content:
          "LinkedIn algorithm cracked: Posts with carousels get 3x more engagement than single images. Just tested this across 15 B2B accounts. Who else is seeing this trend?",
        author: {
          id: 76,
          name: "Daniel Chen",
          avatar:
            "https://ui-avatars.com/api/?name=Daniel+Chen&background=1abc9c&color=fff",
          role: "member",
        },
        createdAt: "2025-09-20T19:15:00Z",
        likes: 167,
        comments: 38,
        isLiked: true,
      },
      {
        id: 25,
        content:
          "iOS 17.1 update broke attribution for half our campaigns. Meta and Google both showing inflated CPAs. Anyone else seeing this? How are you adjusting your reporting? 😩",
        author: {
          id: 201,
          name: "Alex Rivera",
          avatar:
            "https://ui-avatars.com/api/?name=Alex+Rivera&background=34495e&color=fff",
          role: "member",
        },
        createdAt: "2025-09-20T15:40:00Z",
        likes: 78,
        comments: 23,
        isLiked: false,
      },
    ],
  },
];

// Career & Job Groups - Separate section for professional opportunities
export const mockCareerGroups: Group[] = [
  {
    id: 7,
    name: "Job Opportunities Bangladesh",
    members: 2340,
    isPrivate: false,
    coverImage:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=200&fit=crop",
    category: "Job & Career",
    description:
      "Community for sharing job circulars, internship opportunities, and career openings across Bangladesh. Help each other find great opportunities!",
    rules: [
      "Verify job authenticity before posting",
      "Include application deadlines and links",
      "No spam or repeated postings",
      "Help fellow members with questions",
      "Report fake job posts immediately",
    ],
    tags: ["Jobs", "Career", "Opportunities", "Bangladesh", "Hiring"],
    createdBy: "Farhan Ahmed",
    createdAt: "2023-01-15",
    posts: 1840,
    admin: {
      id: 7,
      name: "Farhan Ahmed",
      avatar:
        "https://ui-avatars.com/api/?name=Farhan+Ahmed&background=2ecc71&color=fff",
    },
    recentPosts: [
      {
        id: 26,
        content:
          "🔥 URGENT: Grameenphone hiring Software Engineers (3-5 years exp). Salary: 80k-120k BDT. Deadline: Oct 5. Apply here: https://careers.grameenphone.com/jobs/se-2024\n\nRequirements:\n- Java/Python/C#\n- Microservices experience\n- Good communication skills\n\nGood luck everyone! 🚀",
        author: {
          id: 7,
          name: "Farhan Ahmed",
          avatar:
            "https://ui-avatars.com/api/?name=Farhan+Ahmed&background=2ecc71&color=fff",
          role: "admin",
        },
        createdAt: "2025-09-22T10:20:00Z",
        likes: 234,
        comments: 67,
        isLiked: true,
        isPinned: true,
      },
      {
        id: 27,
        content:
          "Brac Bank is looking for MIS Officers. Just saw this on their website. 2+ years experience needed. Last date Sept 30. Anyone applying? Let me know if you need any info!",
        author: {
          id: 145,
          name: "Nadia Rahman",
          avatar:
            "https://ui-avatars.com/api/?name=Nadia+Rahman&background=e67e22&color=fff",
          role: "member",
        },
        createdAt: "2025-09-21T16:45:00Z",
        likes: 156,
        comments: 43,
        isLiked: false,
      },
      {
        id: 28,
        content:
          "Has anyone heard back from Robi after applying for the Data Analyst position? I applied 2 weeks ago, no response yet. What's the usual timeline? 🤔",
        author: {
          id: 198,
          name: "Tanvir Hossain",
          avatar:
            "https://ui-avatars.com/api/?name=Tanvir+Hossain&background=3498db&color=fff",
          role: "member",
        },
        createdAt: "2025-09-21T14:30:00Z",
        likes: 89,
        comments: 52,
        isLiked: true,
      },
    ],
  },
  {
    id: 8,
    name: "Internship Hub Bangladesh",
    members: 1650,
    isPrivate: false,
    coverImage:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop",
    category: "Job & Career",
    description:
      "A dedicated space for students and fresh graduates to find internship opportunities, share experiences, and get advice on starting their careers.",
    rules: [
      "Share verified internship postings only",
      "Include stipend information if available",
      "Respect others' experiences and questions",
      "No promotional spam",
      "Help juniors with application tips",
    ],
    tags: [
      "Internship",
      "Students",
      "Fresh Graduates",
      "Career Start",
      "Training",
    ],
    createdBy: "Sadia Khan",
    createdAt: "2023-03-22",
    posts: 987,
    admin: {
      id: 8,
      name: "Sadia Khan",
      avatar:
        "https://ui-avatars.com/api/?name=Sadia+Khan&background=9b59b6&color=fff",
    },
    recentPosts: [
      {
        id: 29,
        content:
          "📢 BRAC internship program for CSE/EEE students! 3-month paid internship (15k BDT/month). Apply by Oct 10. Great learning opportunity for juniors!\n\nDM me if you need help with the application process. I did this internship last year and it was amazing! ✨",
        author: {
          id: 8,
          name: "Sadia Khan",
          avatar:
            "https://ui-avatars.com/api/?name=Sadia+Khan&background=9b59b6&color=fff",
          role: "admin",
        },
        createdAt: "2025-09-22T09:15:00Z",
        likes: 312,
        comments: 98,
        isLiked: true,
        isPinned: true,
      },
      {
        id: 30,
        content:
          "Just completed my Marketing internship at Unilever! 6 months of amazing learning. AMA about the application process, interview questions, or working experience. Happy to help! 😊",
        author: {
          id: 167,
          name: "Rifat Chowdhury",
          avatar:
            "https://ui-avatars.com/api/?name=Rifat+Chowdhury&background=e74c3c&color=fff",
          role: "member",
        },
        createdAt: "2025-09-21T18:20:00Z",
        likes: 189,
        comments: 76,
        isLiked: true,
      },
      {
        id: 31,
        content:
          "Need advice: Should I take a 6-month unpaid internship at a big company or 3-month paid (10k) at a startup? Both are in digital marketing. What matters more for CV?",
        author: {
          id: 234,
          name: "Mehedi Hassan",
          avatar:
            "https://ui-avatars.com/api/?name=Mehedi+Hassan&background=16a085&color=fff",
          role: "member",
        },
        createdAt: "2025-09-21T11:40:00Z",
        likes: 67,
        comments: 124,
        isLiked: false,
      },
    ],
  },
  {
    id: 9,
    name: "Freelance & Remote Work BD",
    members: 1890,
    isPrivate: false,
    coverImage:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=400&h=200&fit=crop",
    category: "Job & Career",
    description:
      "Connect with fellow freelancers, find remote work opportunities, share tips, and grow your freelancing career. Discuss platforms like Upwork, Fiverr, and Freelancer.com.",
    rules: [
      "Share legitimate opportunities only",
      "No direct client solicitation",
      "Help others with pricing and proposals",
      "Share your success stories",
      "Respect confidentiality agreements",
    ],
    tags: ["Freelance", "Remote Work", "Upwork", "Fiverr", "Digital Nomad"],
    createdBy: "Mahmud Alam",
    createdAt: "2023-02-08",
    posts: 1456,
    admin: {
      id: 9,
      name: "Mahmud Alam",
      avatar:
        "https://ui-avatars.com/api/?name=Mahmud+Alam&background=f39c12&color=fff",
    },
    recentPosts: [
      {
        id: 32,
        content:
          "🎉 Hit $5k/month on Upwork! Started 2 years ago with $0. Key lessons:\n\n1. Niche down (I focus only on React + Node)\n2. Under-promise, over-deliver\n3. Build long-term client relationships\n4. Invest in JSS (Job Success Score)\n\nAMA if you're starting out!",
        author: {
          id: 9,
          name: "Mahmud Alam",
          avatar:
            "https://ui-avatars.com/api/?name=Mahmud+Alam&background=f39c12&color=fff",
          role: "admin",
        },
        createdAt: "2025-09-22T08:30:00Z",
        likes: 445,
        comments: 167,
        isLiked: true,
        isPinned: true,
      },
      {
        id: 33,
        content:
          "Beware of this Fiverr scam: Client asks you to work outside Fiverr 'to avoid fees'. I almost fell for it. Always keep communication on platform! Lost a potential order but saved my account.",
        author: {
          id: 189,
          name: "Tasnim Akter",
          avatar:
            "https://ui-avatars.com/api/?name=Tasnim+Akter&background=e67e22&color=fff",
          role: "moderator",
        },
        createdAt: "2025-09-21T20:10:00Z",
        likes: 267,
        comments: 89,
        isLiked: true,
      },
      {
        id: 34,
        content:
          "Remote job alert: US company hiring full-stack devs (React/Python). $3k-5k/month, fully remote. No degree required, just strong portfolio. DM for company name and application link!",
        author: {
          id: 156,
          name: "Rakib Ahmed",
          avatar:
            "https://ui-avatars.com/api/?name=Rakib+Ahmed&background=27ae60&color=fff",
          role: "member",
        },
        createdAt: "2025-09-21T15:25:00Z",
        likes: 378,
        comments: 134,
        isLiked: true,
      },
    ],
  },
  {
    id: 10,
    name: "Career Guidance & CV Help",
    members: 2120,
    isPrivate: false,
    coverImage:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=200&fit=crop",
    category: "Job & Career",
    description:
      "Get help with resume building, cover letters, interview preparation, and career planning. Experienced professionals share advice and review CVs for free!",
    rules: [
      "Be respectful when giving feedback",
      "Share CVs using image/pdf links",
      "No job postings (use other groups)",
      "Keep career advice professional",
      "Protect personal information",
    ],
    tags: [
      "Resume",
      "CV",
      "Interview",
      "Career Advice",
      "Professional Development",
    ],
    createdBy: "Asif Rahman",
    createdAt: "2023-04-12",
    posts: 1678,
    admin: {
      id: 10,
      name: "Asif Rahman",
      avatar:
        "https://ui-avatars.com/api/?name=Asif+Rahman&background=3498db&color=fff",
    },
    recentPosts: [
      {
        id: 35,
        content:
          "🆘 CV Review Thread! Drop your CV link in comments (Google Drive/Imgur) and I'll review them tonight. Mention your target role. First 20 only!\n\n8+ years in HR, reviewed 1000+ CVs. Let's get you interview-ready! 💼",
        author: {
          id: 10,
          name: "Asif Rahman",
          avatar:
            "https://ui-avatars.com/api/?name=Asif+Rahman&background=3498db&color=fff",
          role: "admin",
        },
        createdAt: "2025-09-22T07:45:00Z",
        likes: 523,
        comments: 156,
        isLiked: true,
        isPinned: true,
      },
      {
        id: 36,
        content:
          "Interview tip: When they ask 'Why should we hire you?', don't just list skills. Tell a story about solving a similar problem. Landed 3 offers using this approach!\n\nExample: Instead of 'I'm good at React', say 'At my last project, I optimized React app load time from 4s to 1.2s...'",
        author: {
          id: 178,
          name: "Nabila Hossain",
          avatar:
            "https://ui-avatars.com/api/?name=Nabila+Hossain&background=e74c3c&color=fff",
          role: "moderator",
        },
        createdAt: "2025-09-21T19:30:00Z",
        likes: 412,
        comments: 98,
        isLiked: true,
      },
      {
        id: 37,
        content:
          "Bomb interview question: 'Where do you see yourself in 5 years?' How do you answer without sounding too ambitious or too complacent? Help! Interview tomorrow 😰",
        author: {
          id: 223,
          name: "Fahim Islam",
          avatar:
            "https://ui-avatars.com/api/?name=Fahim+Islam&background=9b59b6&color=fff",
          role: "member",
        },
        createdAt: "2025-09-21T13:15:00Z",
        likes: 145,
        comments: 87,
        isLiked: false,
      },
    ],
  },
  {
    id: 11,
    name: "IT Jobs Bangladesh",
    members: 1780,
    isPrivate: false,
    coverImage:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop",
    category: "Job & Career",
    description:
      "Specialized group for IT professionals. Share job openings for developers, designers, QA engineers, DevOps, and all tech roles across Bangladesh.",
    rules: [
      "Tech jobs only (dev, design, QA, etc.)",
      "Mention tech stack clearly",
      "Include salary range if possible",
      "No irrelevant posts",
      "Help with tech interview prep",
    ],
    tags: [
      "IT Jobs",
      "Software Developer",
      "Web Developer",
      "Tech Career",
      "Programming",
    ],
    createdBy: "Shakib Hasan",
    createdAt: "2023-05-20",
    posts: 2103,
    admin: {
      id: 11,
      name: "Shakib Hasan",
      avatar:
        "https://ui-avatars.com/api/?name=Shakib+Hasan&background=1abc9c&color=fff",
    },
    recentPosts: [
      {
        id: 38,
        content:
          "🚀 Brain Station 23 mass hiring! 50+ positions:\n\n- Jr Dev (React/Angular): 35k-50k\n- Mid-level (Full Stack): 70k-100k\n- Sr Dev (Microservices): 120k-180k\n- DevOps Engineer: 90k-140k\n\nApply: https://brainstation-23.com/careers\n\nRef code: BSD2024 (use this!)",
        author: {
          id: 11,
          name: "Shakib Hasan",
          avatar:
            "https://ui-avatars.com/api/?name=Shakib+Hasan&background=1abc9c&color=fff",
          role: "admin",
        },
        createdAt: "2025-09-22T11:00:00Z",
        likes: 687,
        comments: 203,
        isLiked: true,
        isPinned: true,
      },
      {
        id: 39,
        content:
          "Pathao Tech interview experience:\n\nRound 1: DSA (medium level)\nRound 2: System design (ride-sharing scalability)\nRound 3: Behavioral\n\nOverall positive experience. Got offer: 95k for 3 YOE. Worth applying if you're into challenging problems!",
        author: {
          id: 192,
          name: "Tamim Shahriar",
          avatar:
            "https://ui-avatars.com/api/?name=Tamim+Shahriar&background=34495e&color=fff",
          role: "member",
        },
        createdAt: "2025-09-21T17:50:00Z",
        likes: 289,
        comments: 112,
        isLiked: true,
      },
      {
        id: 40,
        content:
          "Red flag alert: Company X (not naming publicly, DM for details) asked for 6-month bond with 3 lakh penalty. 45k salary, 10 hour/day. Fresh grads beware! Know your worth! ⚠️",
        author: {
          id: 211,
          name: "Samira Ahmed",
          avatar:
            "https://ui-avatars.com/api/?name=Samira+Ahmed&background=e67e22&color=fff",
          role: "moderator",
        },
        createdAt: "2025-09-21T12:20:00Z",
        likes: 456,
        comments: 167,
        isLiked: true,
      },
    ],
  },
];

// Combined groups data for easy access
export const allMockGroups: Group[] = [
  ...mockMyGroups,
  ...mockSuggestedGroups,
  ...mockCareerGroups,
];

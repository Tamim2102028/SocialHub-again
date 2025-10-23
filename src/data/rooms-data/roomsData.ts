export interface Room {
  id: string;
  name: string;
  status: "open" | "hide";
  members: string[]; // list of member names or ids
  coverImage?: string; // optional url/path to an image
  createdBy?: string; // user id or name of creator
  createdAt?: string; // ISO date string
  lastActivityAt?: string; // ISO date string
}

export const sampleRooms: Room[] = [
  {
    id: "r1",
    name: "Math Study Group",
    status: "open",
    members: ["1", "4", "9", "2", "3"],
    coverImage: "https://picsum.photos/seed/r1/800/450",
    createdBy: "1",
    createdAt: "2024-09-10T10:00:00.000Z",
    lastActivityAt: new Date().toISOString(),
  },
  {
    id: "r2",
    name: "Frontend Helpers",
    status: "open",
    members: ["7", "11", "5", "6"],
    coverImage: "https://picsum.photos/seed/r2/800/450",
    createdBy: "7",
    createdAt: "2025-01-15T08:30:00.000Z",
  },
  {
    id: "r3",
    name: "Private Study Room",
    status: "hide",
    members: ["1", "3", "4", "2"],
    coverImage: "https://picsum.photos/seed/r3/800/450",
    createdBy: "3",
    createdAt: "2025-06-02T12:00:00.000Z",
  },
  {
    id: "r4",
    name: "Exam Prep — 2025",
    status: "open",
    members: ["9", "11", "10"],
    coverImage: "https://picsum.photos/seed/r4/800/450",
    createdBy: "9",
    createdAt: "2025-03-20T15:45:00.000Z",
  },
  {
    id: "r5",
    name: "Gaming Lounge",
    status: "open",
    members: ["2", "3", "5", "7", "8"],
    coverImage: "https://picsum.photos/seed/r5/800/450",
    createdBy: "2",
    createdAt: "2024-12-01T20:00:00.000Z",
  },
  {
    id: "r6",
    name: "Career & Internships",
    status: "open",
    members: ["5", "6", "7"],
    coverImage: "https://picsum.photos/seed/r6/800/450",
    createdBy: "5",
    createdAt: "2025-02-11T09:20:00.000Z",
  },
  {
    id: "r7",
    name: "Study-Buddy Pairing",
    status: "open",
    members: ["1", "8", "10"],
    coverImage: "https://picsum.photos/seed/r7/800/450",
    createdBy: "8",
    createdAt: "2025-07-07T07:07:07.000Z",
  },
  {
    id: "r8",
    name: "Alumni Network",
    status: "hide",
    members: ["2", "1"],
    coverImage: "https://picsum.photos/seed/r8/800/450",
    createdBy: "2",
    createdAt: "2023-11-11T11:11:11.000Z",
  },
];

export default sampleRooms;

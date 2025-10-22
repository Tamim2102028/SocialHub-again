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
    id: "room-1",
    name: "Math Study Group",
    status: "open",
    members: ["u1", "u4", "u9", "u2", "u3"],
    coverImage: "https://picsum.photos/seed/room-1/800/450",
    createdBy: "u1",
    createdAt: "2024-09-10T10:00:00.000Z",
    lastActivityAt: new Date().toISOString(),
  },
  {
    id: "room-2",
    name: "Frontend Helpers",
    status: "open",
    members: ["u7", "u11", "u5", "u6"],
    coverImage: "https://picsum.photos/seed/room-2/800/450",
    createdBy: "u7",
    createdAt: "2025-01-15T08:30:00.000Z",
  },
  {
    id: "room-3",
    name: "Private Study Room",
    status: "hide",
    members: ["u3", "u4", "u2"],
    coverImage: "https://picsum.photos/seed/room-3/800/450",
    createdBy: "u3",
    createdAt: "2025-06-02T12:00:00.000Z",
  },
  {
    id: "room-4",
    name: "Exam Prep — 2025",
    status: "open",
    members: ["u9", "u11", "u10"],
    coverImage: "https://picsum.photos/seed/room-4/800/450",
    createdBy: "u9",
    createdAt: "2025-03-20T15:45:00.000Z",
  },
  {
    id: "room-5",
    name: "Gaming Lounge",
    status: "open",
    members: ["u2", "u3", "u5", "u7", "u8"],
    coverImage: "https://picsum.photos/seed/room-5/800/450",
    createdBy: "u2",
    createdAt: "2024-12-01T20:00:00.000Z",
  },
  {
    id: "room-6",
    name: "Career & Internships",
    status: "open",
    members: ["u5", "u6", "u7"],
    coverImage: "https://picsum.photos/seed/room-6/800/450",
    createdBy: "u5",
    createdAt: "2025-02-11T09:20:00.000Z",
  },
  {
    id: "room-7",
    name: "Study-Buddy Pairing",
    status: "open",
    members: ["u8", "u8"],
    coverImage: "https://picsum.photos/seed/room-7/800/450",
    createdBy: "u8",
    createdAt: "2025-07-07T07:07:07.000Z",
  },
  {
    id: "room-8",
    name: "Alumni Network",
    status: "hide",
    members: ["u2", "u1"],
    coverImage: "https://picsum.photos/seed/room-8/800/450",
    createdBy: "u2",
    createdAt: "2023-11-11T11:11:11.000Z",
  },
];

export default sampleRooms;

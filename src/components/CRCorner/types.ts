export interface Poll {
  id: number;
  question: string;
  options: { id: number; text: string; votes: number }[];
  totalVotes: number;
  isEnded?: boolean;
  endedAt?: string;
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  postedBy: string;
  postedById?: string;
  hasFile?: boolean;
  fileName?: string;
  fileUrl?: string;
  readBy?: string[];
}

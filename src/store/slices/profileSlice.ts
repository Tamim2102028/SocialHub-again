import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  getCurrentUserId,
  getUserById,
} from "../../data/profile-data/userData";

interface ProfileState {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  avatar: string;
  bio?: string;
  role: ("student" | "teacher" | "system")[];
  category: "university" | "hsc";
  university?: {
    name: string;
    dept: string;
    section?: string;
    subsection?: string;
    roll?: string;
  };
  college?: {
    name: string;
    dept: "science" | "arts" | "commerce";
    section?: string; // optional for teachers
    subsection?: string;
    roll?: string; // optional for teachers
    sscBatch: string;
    level?: "1st year" | "2nd year" | "admission"; // optional for teachers
  };
  gender?: "male" | "female";
  friends: string[];
  pendingRequests?: string[];
  saved?: string[];
  // groups the user has joined (ids)
  joinedGroup?: string[];
  // groups the user has sent join requests to (ids)
  sentRequestGroup?: string[];
}

// Load current user data as initial state
const getCurrentUserData = (): ProfileState => {
  const currentUserId = getCurrentUserId();
  const userData = getUserById(currentUserId);

  if (userData) {
    return {
      id: userData.id,
      name: userData.name,
      username: userData.username,
      email: userData.email,
      phone: userData.phone,
      avatar: userData.avatar,
      bio: userData.bio,
      role: userData.role,
      category: userData.category,
      university: userData.university,
      college: userData.college,
      gender: userData.gender,
      friends: userData.friends || [],
      pendingRequests: userData.pendingRequests || [],
      saved: userData.saved || [],
      joinedGroup: userData.joinedGroup || [],
      sentRequestGroup: userData.sentRequestGroup || [],
    };
  } else {
    return {
      id: "",
      name: "",
      username: "",
      email: "",
      phone: "",
      avatar: "",
      bio: "",
      role: ["student"],
      category: "university" as const,
      university: {
        name: "",
        dept: "",
      },
      college: undefined,
      gender: undefined,
      friends: [],
      pendingRequests: [],
      saved: [],
      joinedGroup: [],
      sentRequestGroup: [],
    };
  }
};

const initialState: ProfileState = getCurrentUserData();

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfile(state, action: PayloadAction<Partial<ProfileState>>) {
      return { ...state, ...action.payload };
    },
    loadProfile(_, action: PayloadAction<ProfileState>) {
      return action.payload;
    },
    reloadProfile() {
      return getCurrentUserData();
    },
    clearProfile() {
      // will use while user logout to clear profile data
      return {
        id: "",
        name: "",
        username: "",
        email: "",
        phone: "",
        avatar: "",
        bio: "",
        role: ["student"],
        category: "university" as const,
        university: {
          name: "",
          dept: "",
        },
        college: undefined,
        gender: undefined,
        friends: [],
        pendingRequests: [],
        saved: [],
      };
    },
  },
});

export const { updateProfile, loadProfile, reloadProfile, clearProfile } =
  profileSlice.actions;
export default profileSlice.reducer;

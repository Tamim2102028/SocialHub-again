import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import {
  getCurrentUserId,
  getUserById,
} from "../../services/userService";
import type { RootState } from "../store";

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
    dept: string;
    section?: string; // optional for teachers
    subsection?: string;
    roll?: string; // optional for teachers
    sscBatch: string;
    level?: "1st year" | "2nd year" | "admission"; // optional for teachers
  };
  gender?: "male" | "female";
  saved?: string[];
  // groups the user has joined (ids)
  joinedGroup?: string[];
  // groups the user pre-joined (ids) - used for showing institution-specific groups
  preJoinedGroup?: string[];
  // groups the user has sent join requests to (ids)
  sentRequestGroup?: string[];
}

// Load current user data as initial state
const getCurrentUserData = (): ProfileState => {
  const currentUserId = getCurrentUserId();
  const userData = getUserById(currentUserId);

  if (userData) {
    // Map the fixture `UserData` shape into the profile slice shape expected by UI
    return {
      id: userData.id,
      name: userData.name,
      username: userData.username,
      email: userData.email,
      phone: userData.phone,
      avatar: userData.avatar,
      bio: userData.bio,
      role: userData.role,
      // derive category from educationLevel
      category: userData.educationLevel === "UNIVERSITY" ? "university" : "hsc",
      // normalize university/college fields to the older shape used across the app
      university: userData.university
        ? {
            name: String(userData.university.name || ""),
            dept: String(userData.university.department || ""),
            section: userData.university.section,
            subsection: userData.university.subsection,
            roll: undefined,
          }
        : undefined,
      college: userData.college
        ? {
            name: String(userData.college.name || ""),
            dept: String(userData.college.department || ""),
            section: undefined,
            subsection: undefined,
            roll: undefined,
            sscBatch: "",
          }
        : undefined,
      gender: userData.gender,
      saved: userData.saved || [],
      joinedGroup: userData.joinedGroup || [],
      preJoinedGroup: userData.preJoinedGroup || [],
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
      saved: [],
      joinedGroup: [],
      preJoinedGroup: [],
      sentRequestGroup: [],
    };
  }
};

const initialState: ProfileState = getCurrentUserData();

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    fetchAllUserData() {
      // This will be used to fetch all user data
    },

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
        preJoinedGroup: [],
      };
    },
  },
});

export const { updateProfile, loadProfile, reloadProfile, clearProfile } =
  profileSlice.actions;
export default profileSlice.reducer;

/**
 * Selector helper to resolve any user by id. This wraps the in-repo helper so
 * components can call `useAppSelector((s) => selectUserById(s, id))` and keep
 * data access consistent across the app. It intentionally uses the module
 * fixture `getUserById` for now (preview-only behavior).
 */
export const selectUserById = (_state: RootState, id: string) =>
  getUserById(id);

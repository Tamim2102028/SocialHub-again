import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getCurrentUserId, getUserById } from "../../data/userData";

interface ProfileState {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  university: string;
  gender?: "male" | "female";
  friends: string[];
  pendingRequests?: string[];
  saved?: string[];
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
      avatar: userData.avatar,
      bio: userData.bio,
      university: userData.university,
      gender: userData.gender,
      friends: userData.friends || [],
      pendingRequests: userData.pendingRequests || [],
      saved: userData.saved || [],
    };
  } else {
    return {
      id: "",
      name: "",
      username: "",
      avatar: "",
      bio: "",
      university: "",
      gender: undefined,
      friends: [],
      pendingRequests: [],
      saved: [],
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
        avatar: "",
        bio: "",
        university: "",
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

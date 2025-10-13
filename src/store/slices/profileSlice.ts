import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ProfileState {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  university: string;
  friends: string[];
  pendingRequests?: string[];
  saved?: string[];
}

// Simple initial state for profile editing
const initialState: ProfileState = {
  id: "",
  name: "",
  username: "",
  avatar: "",
  bio: "",
  university: "",
  friends: [],
  pendingRequests: [],
  saved: [],
};

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
    clearProfile() {
      return initialState;
    },
  },
});

export const { updateProfile, loadProfile, clearProfile } =
  profileSlice.actions;
export default profileSlice.reducer;

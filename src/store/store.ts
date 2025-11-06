import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice.js";
import postsSlice from "./slices/postsSlice.js";
import notificationsSlice from "./slices/notificationsSlice.js";
import uiSlice from "./slices/uiSlice.js";
import tuitionSlice from "./slices/tuitionSlice.js";
import filesSlice from "./slices/filesSlice";
import communityStudyArchiveSlice from "./slices/communityStudyArchiveSlice";
import profileSlice from "./slices/profileSlice";
import messagesSlice from "./slices/messagesSlice";
import bloodDonationSlice from "./slices/mainMore/bloodDonationSlice.js";
import tournamentSlice from "./slices/tournamentSlice";
import achievementSlice from "./slices/achievementSlice";
import groupSlice from "./slices/groupSlice";
import classRoomSlice from "./slices/classRoom/classRoomSlice.js";
import roomPostsSlice from "./slices/classRoom/roomPostsSlice.js";
import friendsSlice from "./slices/friendsSlice";
import { baseApi } from "./api/baseApi";

export const store = configureStore({
  reducer: {
    // RTK Query API
    [baseApi.reducerPath]: baseApi.reducer,

    // Existing slices
    auth: authSlice,
    posts: postsSlice,
    notifications: notificationsSlice,
    ui: uiSlice,
    tuition: tuitionSlice,
    files: filesSlice,
    communityStudyArchive: communityStudyArchiveSlice,
    profile: profileSlice,
    roomPosts: roomPostsSlice,
    classRoom: classRoomSlice,
    groups: groupSlice,
    messages: messagesSlice,
    bloodDonation: bloodDonationSlice,
    tournament: tournamentSlice,
    achievement: achievementSlice,
    friends: friendsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

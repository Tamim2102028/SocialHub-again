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
import classRoomSlice from "./slices/classRoomSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    posts: postsSlice,
    notifications: notificationsSlice,
    ui: uiSlice,
    tuition: tuitionSlice,
    files: filesSlice,
    communityStudyArchive: communityStudyArchiveSlice,
    profile: profileSlice,
    classRoom: classRoomSlice,
    groups: groupSlice,
    messages: messagesSlice,
    bloodDonation: bloodDonationSlice,
    tournament: tournamentSlice,
    achievement: achievementSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

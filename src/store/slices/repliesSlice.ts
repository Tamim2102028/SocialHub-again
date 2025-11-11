import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  repliesData,
  type ReplyData,
} from "../../data/profile-data/profilePostCommentRepliesData";
import type { RootState } from "../store";

interface RepliesState {
  replies: ReplyData[];
}

const initialState: RepliesState = {
  replies: repliesData,
};

const repliesSlice = createSlice({
  name: "replies",
  initialState,
  reducers: {
    addReply(
      state,
      action: PayloadAction<{
        commentId: string;
        userId: string;
        content: string;
      }>
    ) {
      const newReply: ReplyData = {
        replyId: `rp${Date.now()}`,
        commentId: action.payload.commentId,
        userId: action.payload.userId,
        content: action.payload.content,
        createdAt: new Date().toISOString(),
      };
      state.replies.push(newReply);
    },

    deleteReply(state, action: PayloadAction<string>) {
      state.replies = state.replies.filter((r) => r.replyId !== action.payload);
    },

    updateReply(
      state,
      action: PayloadAction<{ replyId: string; content: string }>
    ) {
      const r = state.replies.find((x) => x.replyId === action.payload.replyId);
      if (r) r.content = action.payload.content;
    },
  },
});

export const { addReply, deleteReply, updateReply } = repliesSlice.actions;
export default repliesSlice.reducer;

// selectors
export const selectRepliesByCommentId = (state: RootState, commentId: string) =>
  state.replies.replies.filter((r) => r.commentId === commentId);

export const selectReplyById = (state: RootState, replyId: string) =>
  state.replies.replies.find((r) => r.replyId === replyId);

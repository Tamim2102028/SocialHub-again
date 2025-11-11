import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  commentsData,
  type CommentData,
} from "../../data/profile-data/profilePostCommentsData";
import type { RootState, AppDispatch } from "../store";
import { decrementCommentCount } from "./postsSlice";

interface CommentsState {
  comments: CommentData[];
}

const initialState: CommentsState = {
  comments: commentsData,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment(
      state,
      action: PayloadAction<{
        postId: string;
        userId: string;
        content: string;
      }>
    ) {
      const newComment: CommentData = {
        commentId: `c${Date.now()}`,
        postId: action.payload.postId,
        userId: action.payload.userId,
        content: action.payload.content,
        createdAt: new Date().toISOString(),
      };
      state.comments.push(newComment);
    },

    deleteComment(state, action: PayloadAction<string>) {
      state.comments = state.comments.filter(
        (comment) => comment.commentId !== action.payload
      );
    },

    updateComment(
      state,
      action: PayloadAction<{
        commentId: string;
        content: string;
      }>
    ) {
      const comment = state.comments.find(
        (c) => c.commentId === action.payload.commentId
      );
      if (comment) {
        comment.content = action.payload.content;
      }
    },
  },
});

export const { addComment, deleteComment, updateComment } =
  commentsSlice.actions;
export default commentsSlice.reducer;

// Thunk: delete comment and decrement the parent post's comment count
export const deleteCommentAndDecrement =
  (commentId: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const comment = state.comments.comments.find(
      (c) => c.commentId === commentId
    );
    // delete comment first
    dispatch(deleteComment(commentId));

    // if we know the postId, decrement its comment count
    if (comment && comment.postId) {
      dispatch(decrementCommentCount(comment.postId));
    }
  };

// Selectors
export const selectCommentsByPostId = (state: RootState, postId: string) =>
  state.comments.comments.filter((comment) => comment.postId === postId);

export const selectCommentById = (state: RootState, commentId: string) =>
  state.comments.comments.find((comment) => comment.commentId === commentId);

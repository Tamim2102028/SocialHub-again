import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { selectUserById } from "../../store/slices/profileSlice";
import {
  deleteCommentAndDecrement,
  toggleLikeComment,
} from "../../store/slices/commentsSlice";
import { formatPostDate, formatPostClock } from "../../utils/dateUtils";
import { confirmDelete, showSuccess } from "../../utils/sweetAlert";
import type { CommentData } from "../../data/profile-data/profilePostCommentsData";

interface CommentItemProps {
  comment: CommentData;
  postOwnerId: string; // ID of the post owner
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, postOwnerId }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const currentUserId = useAppSelector((state) => state.auth.user?.id);
  const commentUser = useAppSelector((state) =>
    selectUserById(state, comment.userId)
  );

  // Check if current user can delete this comment
  // (either the comment creator or the post owner)
  const canDelete =
    currentUserId === comment.userId || currentUserId === postOwnerId;

  const isLiked =
    !!currentUserId &&
    !!comment.likedBy &&
    comment.likedBy.includes(currentUserId);
  const likesCount = comment.likedBy ? comment.likedBy.length : 0;

  const handleProfileClick = () => {
    navigate(`/profile/${comment.userId}`);
  };

  const handleDelete = async () => {
    const result = await confirmDelete("this comment");

    if (result) {
      dispatch(deleteCommentAndDecrement(comment.commentId));
      await showSuccess({
        title: "Deleted!",
        text: "Comment deleted successfully",
      });
    }
  };

  return (
    <div className="flex space-x-3">
      <img
        src={commentUser?.avatar || "https://via.placeholder.com/32"}
        alt={commentUser?.name || "User"}
        className="h-8 w-8 cursor-pointer rounded-full bg-gray-300 object-cover transition-all hover:ring-2 hover:ring-blue-300"
        onClick={handleProfileClick}
      />
      <div className="flex-1">
        <div className="rounded-lg bg-gray-100 px-3 py-2">
          <span
            className="ing-sition-colors cursor-pointer text-sm font-semibold text-gray-900 hover:text-blue-600 hover:underline"
            onClick={handleProfileClick}
          >
            {commentUser?.name || "User"}
          </span>
          <p className="text-sm text-gray-700">{comment.content}</p>
        </div>
        <div className="mt-1 flex items-center space-x-2 text-xs text-gray-500">
          <span>{formatPostDate(comment.createdAt)}</span>
          <span className="h-1 w-1 rounded-full bg-gray-400" />
          <span>{formatPostClock(comment.createdAt)}</span>
          <span className="h-1 w-1 rounded-full bg-gray-400" />
          <button
            onClick={() => {
              const userId = currentUserId || "1";
              dispatch(
                toggleLikeComment({ commentId: comment.commentId, userId })
              );
            }}
            className={`cursor-pointer hover:underline ${isLiked ? "font-medium text-green-700" : "text-gray-600"}`}
          >
            Like{likesCount > 0 ? ` · ${likesCount}` : ""}
          </button>
          {/* Reply removed as per request */}

          {/* Delete button - only visible for comment creator or post owner */}
          {canDelete && (
            <>
              <span className="h-1 w-1 rounded-full bg-gray-400" />
              <button
                onClick={handleDelete}
                className="cursor-pointer font-medium text-red-600 hover:underline"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;

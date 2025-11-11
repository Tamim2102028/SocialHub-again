import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { selectUserById } from "../../store/slices/profileSlice";
import type { UserData } from "../../data/profile-data/userData";
import {
  deleteCommentAndDecrement,
  toggleLikeComment,
} from "../../store/slices/commentsSlice";
import {
  addReply,
  selectRepliesByCommentId,
} from "../../store/slices/repliesSlice";
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

  const currentUser = useAppSelector((state) => state.profile);

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

  // Reply UI state
  const [showReplyInput, setShowReplyInput] = React.useState(false);
  const [replyText, setReplyText] = React.useState("");

  const replies = useAppSelector((state) =>
    selectRepliesByCommentId(state, comment.commentId)
  );

  // Map of reply user data by id to avoid calling hooks inside loops
  const replyUsersMap = useAppSelector((state) => {
    const map: Record<string, UserData | null> = {};
    replies.forEach((r) => {
      map[r.userId] = selectUserById(state, r.userId);
    });
    return map;
  });

  const handleSendReply = () => {
    const text = replyText.trim();
    if (!text) return;
    const userId = currentUserId || "1";
    dispatch(addReply({ commentId: comment.commentId, userId, content: text }));
    setReplyText("");
    setShowReplyInput(false);
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

        {/* Date / Time and action buttons immediately under the comment */}
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

          <span className="h-1 w-1 rounded-full bg-gray-400" />

          <button
            onClick={() => setShowReplyInput((s) => !s)}
            className="cursor-pointer text-gray-600 hover:underline"
          >
            Reply
          </button>

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

        {/* Reply input (appears under the buttons) */}
        {showReplyInput && (
          <div className="mt-2 pl-10">
            <div className="flex items-start space-x-3">
              <img
                src={currentUser.avatar || "https://via.placeholder.com/32"}
                alt={currentUser.name || "You"}
                className="h-8 w-8 rounded-full bg-gray-300 object-cover"
              />
              <div className="flex-1">
                <textarea
                  autoFocus
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={2}
                  className="w-full rounded border border-gray-200 p-2 text-sm"
                  placeholder="Write a reply..."
                />
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={handleSendReply}
                    className="rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white"
                  >
                    Reply
                  </button>
                  <button
                    onClick={() => setShowReplyInput(false)}
                    className="rounded border border-gray-300 px-3 py-1 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Replies list (after the comment controls) */}
        {replies && replies.length > 0 && (
          <div className="mt-2 space-y-2 pl-10">
            {replies.map((r) => {
              const replyUser = replyUsersMap[r.userId];
              return (
                <div
                  key={r.replyId}
                  className="flex items-start space-x-2 text-sm"
                >
                  <img
                    src={replyUser?.avatar || "https://via.placeholder.com/24"}
                    alt={replyUser?.name || "User"}
                    className="h-6 w-6 rounded-full bg-gray-200 object-cover"
                  />
                  <div className="rounded-lg bg-gray-50 px-2 py-1">
                    <div className="font-semibold text-gray-900">
                      {replyUser?.name || "User"}
                    </div>
                    <div className="text-gray-700">{r.content}</div>
                    <div className="mt-1 text-xs text-gray-400">
                      {formatPostDate(r.createdAt)} •{" "}
                      {formatPostClock(r.createdAt)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;

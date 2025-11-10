import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { selectUserById } from "../../store/slices/profileSlice";
import { formatPostDate, formatPostClock } from "../../utils/dateUtils";
import type { CommentData } from "../../data/profile-data/profilePostCommentsData";

interface CommentItemProps {
  comment: CommentData;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const navigate = useNavigate();
  const commentUser = useAppSelector((state) =>
    selectUserById(state, comment.userId)
  );

  const handleProfileClick = () => {
    navigate(`/profile/${comment.userId}`);
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
            className="cursor-pointer text-sm font-semibold text-gray-900 transition-colors hover:text-blue-600 hover:underline"
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
          <button className="hover:underline">Like</button>
          <span className="h-1 w-1 rounded-full bg-gray-400" />
          <button className="hover:underline">Reply</button>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;

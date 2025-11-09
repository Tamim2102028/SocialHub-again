import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  toggleLikePost,
  toggleBookmarkPost,
} from "../../store/slices/postsSlice";
import { togglePostMenu } from "../../store/slices/uiSlice";
import {
  FaHeart,
  FaShare,
  FaEllipsisH,
  FaRegHeart,
  FaRegComment,
  FaRegBookmark,
  FaUserPlus,
  FaEyeSlash,
  FaFlag,
} from "react-icons/fa";

import type { PostData } from "../../data/profile-data/profilePostData";
import { selectUserById } from "../../store/slices/profileSlice";
import { formatPostDate, formatPostClock } from "../../utils/dateUtils";

interface HomePostCardProps {
  post: PostData;
}

const HomePostCard: React.FC<HomePostCardProps> = ({ post }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [imageError, setImageError] = useState(false);
  const showMenu = useAppSelector(
    (state) => state.ui.menus.postMenus[post.postId] || false
  );

  // Get user data for the post author via selector
  const userData = useAppSelector((s) => selectUserById(s, post.userId));
  const isLiked = post.likedBy.includes("1"); // Current user ID

  const handleLike = () => {
    dispatch(toggleLikePost(post.postId));
  };

  const handleBookmark = () => {
    dispatch(toggleBookmarkPost(post.postId));
  };

  const handleProfileClick = () => {
    navigate(`/profile/${post.userId}`);
  };

  return (
    <div className="rounded-lg border border-gray-400 bg-white shadow">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <img
            src={
              imageError
                ? "https://via.placeholder.com/40"
                : userData?.avatar || "https://via.placeholder.com/40"
            }
            alt={userData?.name || "User"}
            className="h-10 w-10 cursor-pointer rounded-full bg-gray-300 transition-all hover:ring-2 hover:ring-blue-300"
            onClick={handleProfileClick}
            onError={() => setImageError(true)}
          />
          <div>
            <h3
              className="cursor-pointer font-semibold text-gray-900 transition-colors hover:text-blue-600 hover:underline"
              onClick={handleProfileClick}
            >
              {userData?.name || "User"}
            </h3>
            <p className="flex items-center gap-2 text-sm text-gray-500">
              <span>
                @
                <span className="text-gray-500">
                  {userData?.username || "username"}
                </span>
              </span>
              <span className="h-1 w-1 rounded-full bg-gray-400" aria-hidden />
              <span>{formatPostDate(post.createdAt)}</span>
              <span className="h-1 w-1 rounded-full bg-gray-400" aria-hidden />
              <span>{formatPostClock(post.createdAt)}</span>
            </p>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => dispatch(togglePostMenu(post.postId))}
            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-200"
            title="More actions"
          >
            <FaEllipsisH className="h-4 w-4" />
          </button>

          {showMenu && (
            <div className="absolute top-full right-0 z-50 mt-1 w-48 rounded-lg border border-gray-200 bg-white shadow-lg">
              <div className="py-1">
                <button
                  onClick={handleBookmark}
                  className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
                >
                  <FaRegBookmark className="h-4 w-4" />
                  <span className="font-medium">Save post</span>
                </button>
                <button className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50">
                  <FaUserPlus className="h-4 w-4" />
                  <span className="font-medium">
                    Follow @{userData?.username || "username"}
                  </span>
                </button>
                <button className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50">
                  <FaEyeSlash className="h-4 w-4" />
                  <span className="font-medium">Hide this post</span>
                </button>
                <button className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-red-600 transition-colors hover:bg-gray-50">
                  <FaFlag className="h-4 w-4" />
                  <span className="font-medium">Report post</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="whitespace-pre-wrap text-gray-900">{post.content}</p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block cursor-pointer rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Post Images */}
      {post.images && post.images.length > 0 && (
        <div className="px-4 pb-3">
          {post.images.length === 1 ? (
            <img
              src={post.images[0]}
              alt="Post content"
              className="h-auto max-h-96 w-full rounded-lg object-cover"
            />
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {post.images.slice(0, 4).map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Post content ${index + 1}`}
                    className="h-48 w-full rounded-lg object-cover"
                  />
                  {index === 3 && post.images && post.images.length > 4 && (
                    <div className="bg-opacity-50 absolute inset-0 flex items-center justify-center rounded-lg bg-black">
                      <span className="text-lg font-semibold text-white">
                        +{post.images!.length - 4}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Post Stats */}
      <div className="border-t border-gray-100 px-4 py-2">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-3">
            <span>{post.likedBy.length} likes</span>
            <span className="text-gray-300">•</span>
            <span>{post.comments} comments</span>
            <span className="text-gray-300">•</span>
            <span>{post.sharesBy.length} shares</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="border-t border-gray-100 px-4 py-3">
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={handleLike}
            className={`flex items-center justify-center space-x-2 rounded-lg px-3 py-2 transition-colors ${
              isLiked
                ? "bg-red-50 text-red-600 hover:bg-red-100"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {isLiked ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
            <span className="text-sm font-medium">Like</span>
          </button>

          <button
            onClick={() => setShowCommentBox(!showCommentBox)}
            className={`flex items-center justify-center space-x-2 rounded-lg px-3 py-2 transition-colors ${
              showCommentBox
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FaRegComment size={18} />
            <span className="text-sm font-medium">Comment</span>
          </button>

          <button className="flex items-center justify-center space-x-2 rounded-lg px-3 py-2 text-gray-600 transition-colors hover:bg-gray-100">
            <FaShare size={18} />
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>
      </div>

      {/* Quick Comment Input - Show only when comment button is clicked */}
      {showCommentBox && (
        <div className="border-t border-gray-100 px-4 pb-4">
          <div className="mt-3 flex items-center space-x-3">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
              alt="Your avatar"
              className="h-8 w-8 rounded-full bg-gray-300"
            />
            <input
              type="text"
              placeholder="Write a comment..."
              className="flex-1 rounded-full border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePostCard;

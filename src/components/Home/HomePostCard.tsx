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
} from "react-icons/fa";

import type { PostData } from "../../data/postData";
import { getUserById } from "../../data/userData";

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

  // Get user data for the post author
  const userData = getUserById(post.userId);
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

  const formatTime = (timestamp: string) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInHours = Math.floor(
      (now.getTime() - postTime.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return "Yesterday";
    return postTime.toLocaleDateString();
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
            <p className="text-sm text-gray-500">
              @
              <span
                className="cursor-pointer transition-colors hover:text-blue-600 hover:underline"
                onClick={handleProfileClick}
              >
                {userData?.username || "username"}
              </span>{" "}
              • {formatTime(post.createdAt)}
            </p>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => dispatch(togglePostMenu(post.postId))}
            className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <FaEllipsisH size={16} />
          </button>

          {showMenu && (
            <div className="ring-opacity-5 absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black">
              <div className="py-1">
                <button
                  onClick={handleBookmark}
                  className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                >
                  {/* TODO: Implement bookmark functionality */}
                  <>
                    <FaRegBookmark className="mr-3" size={14} />
                    Save post
                  </>
                </button>
                <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                  Follow @{userData?.username || "username"}
                </button>
                <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                  Hide this post
                </button>
                <button className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100">
                  Report post
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="whitespace-pre-wrap text-gray-900">{post.content}</p>
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
          <div className="flex items-center space-x-4">
            <span>{post.likedBy.length} likes</span>
            <span>{post.comments} comments</span>
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

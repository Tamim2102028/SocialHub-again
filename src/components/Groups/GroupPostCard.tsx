import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaShare,
  FaEllipsisH,
  FaRegHeart,
  FaRegComment,
  FaBookmark,
  FaRegBookmark,
  FaUserShield,
  FaThumbtack,
} from "react-icons/fa";

interface Author {
  id: number;
  name: string;
  avatar: string;
  role?: "admin" | "moderator" | "member";
}

interface GroupPost {
  id: number;
  content: string;
  author: Author;
  createdAt: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
  images?: string[];
  isPinned?: boolean;
}

interface GroupPostCardProps {
  post: GroupPost;
  isGroupMember: boolean;
}

const GroupPostCard: React.FC<GroupPostCardProps> = ({
  post,
  isGroupMember,
}) => {
  const navigate = useNavigate();
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    setShowMenu(false);
  };

  const handleProfileClick = () => {
    navigate(`/profile/${post.author.id}`);
  };

  const getRoleBadge = () => {
    if (post.author.role === "admin") {
      return (
        <span className="ml-2 inline-flex items-center gap-1 rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
          <FaUserShield size={10} />
          Admin
        </span>
      );
    }
    if (post.author.role === "moderator") {
      return (
        <span className="ml-2 inline-flex items-center gap-1 rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
          <FaUserShield size={10} />
          Mod
        </span>
      );
    }
    return null;
  };

  return (
    <div className="rounded-lg border border-gray-400 bg-white shadow">
      {/* Pinned Post Badge */}
      {post.isPinned && (
        <div className="border-b border-gray-200 bg-blue-50 px-4 py-2">
          <div className="flex items-center gap-2 text-sm text-blue-700">
            <FaThumbtack size={12} />
            <span className="font-medium">Pinned Post</span>
          </div>
        </div>
      )}

      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="h-10 w-10 cursor-pointer rounded-full bg-gray-300 transition-all hover:ring-2 hover:ring-blue-300"
            onClick={handleProfileClick}
          />
          <div>
            <div className="flex items-center">
              <h3
                className="cursor-pointer font-semibold text-gray-900 transition-colors hover:text-blue-600 hover:underline"
                onClick={handleProfileClick}
              >
                {post.author.name}
              </h3>
              {getRoleBadge()}
            </div>
            <p className="text-sm text-gray-500">{post.createdAt}</p>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
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
                  {isBookmarked ? (
                    <>
                      <FaBookmark className="mr-3 text-blue-600" size={14} />
                      Remove bookmark
                    </>
                  ) : (
                    <>
                      <FaRegBookmark className="mr-3" size={14} />
                      Save post
                    </>
                  )}
                </button>
                {isGroupMember && (
                  <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                    Turn on notifications for this post
                  </button>
                )}
                <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                  Copy link
                </button>
                <button className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100">
                  Report to group admins
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
                        +{post.images.length - 4}
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
            <span>{likesCount} likes</span>
            <span>{post.comments} comments</span>
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

      {/* Quick Comment Input */}
      {showCommentBox && (
        <div className="border-t border-gray-100 px-4 pb-4">
          <div className="mt-3 flex items-center space-x-3">
            <img
              src="https://ui-avatars.com/api/?name=You&background=3b82f6&color=fff"
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

export default GroupPostCard;

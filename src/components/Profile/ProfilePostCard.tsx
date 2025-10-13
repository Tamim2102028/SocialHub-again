import React, { useState } from "react";
import {
  FaHeart,
  FaShare,
  FaEllipsisH,
  FaRegHeart,
  FaRegComment,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";

interface Author {
  id: string;
  name: string;
  username: string;
  avatar: string;
}

interface ProfilePost {
  id: string;
  content: string;
  author: Author;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  image?: string;
}

interface ProfilePostCardProps {
  post: ProfilePost;
  isOwnProfile: boolean;
}

const ProfilePostCard: React.FC<ProfilePostCardProps> = ({
  post,
  isOwnProfile,
}) => {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [isLiked, setIsLiked] = useState(post.isLiked);
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

  return (
    <div className="rounded-lg border border-gray-400 bg-white shadow">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="h-10 w-10 rounded-full bg-gray-300"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
            <p className="text-sm text-gray-500">
              @{post.author.username} • {post.timestamp}
            </p>
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
                {isOwnProfile ? (
                  <>
                    <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                      Edit post
                    </button>
                    <button className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100">
                      Delete post
                    </button>
                  </>
                ) : (
                  <>
                    <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                      Follow @{post.author.username}
                    </button>
                    <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                      Hide this post
                    </button>
                    <button className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100">
                      Report post
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="whitespace-pre-wrap text-gray-900">{post.content}</p>
      </div>

      {/* Post Image */}
      {post.image && (
        <div className="px-4 pb-3">
          <img
            src={post.image}
            alt="Post content"
            className="h-auto max-h-96 w-full rounded-lg object-cover"
          />
        </div>
      )}

      {/* Post Stats */}
      <div className="border-t border-gray-100 px-4 py-2">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span>{likesCount} likes</span>
            <span>{post.comments} comments</span>
            <span>{post.shares} shares</span>
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
              src={post.author.avatar}
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

export default ProfilePostCard;

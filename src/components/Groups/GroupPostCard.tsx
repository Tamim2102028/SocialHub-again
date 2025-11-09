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
  FaLink,
  FaFlag,
} from "react-icons/fa";
import type { GroupPost } from "../../data/group-data/groupPostsData";
import { useAppSelector } from "../../store/hooks";
import { selectUserById } from "../../store/slices/profileSlice";
import { formatPostDate, formatPostClock } from "../../utils/dateUtils";

type Props = {
  post: GroupPost;
};

const GroupPostCardSimple: React.FC<Props> = ({ post }) => {
  const navigate = useNavigate();
  const author = useAppSelector((s) => selectUserById(s, post.createdBy));
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likedBy?.length || 0);
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
            src={author?.avatar}
            alt={author?.name}
            className="h-10 w-10 cursor-pointer rounded-full bg-gray-300 transition-all hover:ring-2 hover:ring-blue-300"
            onClick={() => navigate(`/profile/${post.createdBy}`)}
          />
          <div>
            <h3
              className="cursor-pointer font-semibold text-gray-900 transition-colors hover:text-blue-600 hover:underline"
              onClick={() => navigate(`/profile/${post.createdBy}`)}
            >
              {author?.name || post.createdBy}
            </h3>
            <p className="flex items-center gap-2 text-sm text-gray-500">
              <span>
                @
                <span className="text-gray-500">
                  {author?.username || post.createdBy}
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
            onClick={() => setShowMenu(!showMenu)}
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
                  className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-gray-50 ${isBookmarked ? "text-blue-600" : "text-gray-700"}`}
                >
                  {isBookmarked ? (
                    <>
                      <FaBookmark className="h-4 w-4 flex-shrink-0" />
                      <span className="font-medium">Remove bookmark</span>
                    </>
                  ) : (
                    <>
                      <FaRegBookmark className="h-4 w-4 flex-shrink-0" />
                      <span className="font-medium">Save post</span>
                    </>
                  )}
                </button>
                <button className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50">
                  <FaLink className="h-4 w-4 flex-shrink-0" />
                  <span className="font-medium">Copy link</span>
                </button>
                <button className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-red-600 transition-colors hover:bg-gray-50">
                  <FaFlag className="h-4 w-4 flex-shrink-0" />
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
            <span>{likesCount} likes</span>
            <span className="text-gray-300">•</span>
            <span>{0} comments</span>
            <span className="text-gray-300">•</span>
            <span>{post.sharesBy?.length || 0} shares</span>
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
              src={author?.avatar}
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

export default GroupPostCardSimple;

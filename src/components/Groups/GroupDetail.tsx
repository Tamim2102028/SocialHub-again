import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoArrowBackOutline, IoEllipsisHorizontal } from "react-icons/io5";
import {
  FaUsers,
  FaLock,
  FaGlobe,
  FaUserPlus,
  FaUserMinus,
  FaSearch,
  FaImage,
  FaVideo,
  FaSmile,
} from "react-icons/fa";
import { allMockGroups } from "./data/groupsData";
import GroupPostCard from "./GroupPostCard";

const GroupDetail: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const [isJoined, setIsJoined] = useState(false);

  const group = allMockGroups.find((g) => g.id === parseInt(groupId || "0"));

  const handleJoinToggle = () => {
    setIsJoined(!isJoined);
  };

  if (!group) {
    return (
      <div className="flex min-h-96 flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Group Not Found</h2>
        <p className="text-gray-600">
          The group you're looking for doesn't exist.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          <IoArrowBackOutline />
          Go Back
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Group Cover & Header */}
      <div className="border-b border-gray-300 bg-white">
        {/* Cover Photo with back button */}
        <div className="relative h-80 w-full">
          <img
            src={group.coverImage}
            alt={group.name}
            className="h-full w-full object-cover"
          />

          {/* Back Button - Overlay on Cover */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-3 left-3 flex cursor-pointer items-center gap-1 rounded-lg bg-blue-50 px-3 py-2 text-black"
          >
            <IoArrowBackOutline className="text-xl" />
            <span className="font-semibold">Back</span>
          </button>

          {/* Group Name Overlay */}
          <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/60 to-transparent p-6">
            <h1 className="mb-2 text-4xl font-bold text-white">{group.name}</h1>
            <div className="flex items-center gap-4 text-sm text-white/90">
              <div className="flex items-center gap-1">
                {group.isPrivate ? (
                  <FaLock className="text-sm" />
                ) : (
                  <FaGlobe className="text-sm" />
                )}
                <span>{group.isPrivate ? "Private" : "Public"} group</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <FaUsers className="text-sm" />
                <span>{group.members.toLocaleString()} members</span>
              </div>
            </div>
          </div>
        </div>
        {/* Group Actions Bar */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={handleJoinToggle}
                className={`rounded-lg px-6 py-2 text-sm font-semibold transition-all ${
                  isJoined
                    ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {isJoined ? (
                  <>
                    <FaUserMinus className="mr-2 inline" />
                    Joined
                  </>
                ) : (
                  <>
                    <FaUserPlus className="mr-2 inline" />
                    Join Group
                  </>
                )}
              </button>
              <button className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-300">
                Invite
              </button>
              <button className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-300">
                <FaSearch className="mr-2 inline" />
                Search
              </button>
            </div>
            <button className="rounded-lg bg-gray-200 p-2 text-gray-700 transition-colors hover:bg-gray-300">
              <IoEllipsisHorizontal className="text-lg" />
            </button>
          </div>
        </div>
        {/* Navigation Tabs */}
        <div className="border-t border-gray-200">
          <div className="px-6">
            <div className="flex gap-8">
              <button className="border-b-2 border-blue-600 py-4 font-semibold text-blue-600">
                Discussion
              </button>
              <button className="py-4 font-semibold text-gray-600 hover:text-gray-900">
                Members
              </button>
              <button className="py-4 font-semibold text-gray-600 hover:text-gray-900">
                About
              </button>
              <button className="py-4 font-semibold text-gray-600 hover:text-gray-900">
                Events
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-3">
        {/* Create Post */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <img
              src="https://ui-avatars.com/api/?name=You&background=3b82f6&color=fff"
              alt="Your avatar"
              className="h-10 w-10 rounded-full"
            />
            <div className="flex-1">
              <input
                type="text"
                placeholder="Write something..."
                className="w-full rounded-full border-0 bg-gray-100 px-4 py-3 text-sm placeholder-gray-500 transition-colors focus:bg-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 border-t border-gray-200 pt-2">
            <button className="flex items-center gap-2 text-gray-600 transition-colors hover:text-green-600">
              <FaImage className="text-green-500" />
              <span className="text-sm font-medium">Photo/Video</span>
            </button>
            <button className="flex items-center gap-2 text-gray-600 transition-colors hover:text-blue-600">
              <FaVideo className="text-blue-500" />
              <span className="text-sm font-medium">Live Video</span>
            </button>
            <button className="flex items-center gap-2 text-gray-600 transition-colors hover:text-yellow-600">
              <FaSmile className="text-yellow-500" />
              <span className="text-sm font-medium">Feeling/Activity</span>
            </button>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-3">
          {group.recentPosts && group.recentPosts.length > 0 ? (
            group.recentPosts.map((post) => (
              <GroupPostCard 
                key={post.id} 
                post={post} 
                isGroupMember={isJoined}
              />
            ))
          ) : (
            <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
              <p className="text-gray-500">
                No posts yet. Be the first to share something!
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GroupDetail;

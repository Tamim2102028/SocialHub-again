import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { getGroupById } from "../../data/group-data/groupsData";
import {
  getCurrentUserId,
  getUserById,
  updateUserById,
} from "../../data/profile-data/userData";
import GroupPostList from "./GroupPostList";

const GroupDetail: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const group = useMemo(
    () => (groupId ? getGroupById(groupId) : undefined),
    [groupId]
  );
  const [activeTab, setActiveTab] = useState<"posts" | "pinned">("posts");
  const currentUserId = getCurrentUserId();
  const user = getUserById(currentUserId);
  const navigate = useNavigate();

  if (!group) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold">Group not found</h2>
      </div>
    );
  }

  const isMember = !!user?.joinedGroup?.includes(group.id);
  const isRequested = !!user?.sentRequestGroup?.includes(group.id);

  const handleJoin = () => {
    if (isMember || isRequested) return;
    const updated = [...(user?.sentRequestGroup || []), group.id];
    updateUserById(currentUserId, { sentRequestGroup: updated });
    // local UI: set requested
    // (other lists update via parent callbacks elsewhere)
  };

  const handleCancel = () => {
    if (!isRequested) return;
    const updated = (user?.sentRequestGroup || []).filter(
      (g) => g !== group.id
    );
    updateUserById(currentUserId, { sentRequestGroup: updated });
  };

  // Posts are read-only preview content coming from groupPostsData.ts

  return (
    <div className="space-y-5 overflow-hidden rounded-lg">
      <div className="space-y-2.5">
        {/* Cover Image and Back Button */}
        <div className="relative">
          <img
            src={group.coverImage}
            alt={group.name}
            className="h-56 w-full rounded-lg object-cover"
          />
          <button
            onClick={() => navigate(-1)}
            aria-label="Back"
            title="Back"
            className="absolute top-3 left-3 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white text-lg text-gray-700 shadow-md transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <FaArrowLeft />
          </button>
        </div>
        {/* Group Info */}
        <div className="flex items-center justify-between gap-3">
          {/* Group Name and Description */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{group.name}</h1>
            <p className="mt-1 text-sm text-gray-600">{group.description}</p>

            <div className="mt-3 flex items-center gap-4 text-sm text-gray-700">
              <span className="font-medium">
                {group.members?.length || 0} members
              </span>
              <span className="text-gray-500">•</span>
              <span className="capitalize">{group.privacy}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="shrink-0">
            {!isMember && !isRequested && (
              <button
                onClick={handleJoin}
                className="rounded-md bg-blue-600 px-4 py-2 text-white"
              >
                Join Group
              </button>
            )}

            {isRequested && (
              <button
                onClick={handleCancel}
                className="rounded-md bg-red-600 px-4 py-2 text-white"
              >
                Cancel Request
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="flex gap-1">
        <button
          onClick={() => setActiveTab("posts")}
          className={`rounded-md px-4 py-2 text-left text-sm font-medium transition-colors ${
            activeTab === "posts"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          All posts
        </button>

        <button
          onClick={() => setActiveTab("pinned")}
          className={`rounded-md px-4 py-2 text-left text-sm font-medium transition-colors ${
            activeTab === "pinned"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Pinned
        </button>
      </nav>

      {/* Posts and pinned post list */}
      <GroupPostList groupId={group.id} mode={activeTab} />
    </div>
  );
};

export default GroupDetail;

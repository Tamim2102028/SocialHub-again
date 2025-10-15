import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaUsers } from "react-icons/fa";
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
  // simple tick to force re-syncs when in-memory data is updated elsewhere
  const [refreshTick, setRefreshTick] = useState<number>(0);
  const currentUserId = getCurrentUserId();
  const currentUser = getUserById(currentUserId);
  const navigate = useNavigate();

  void refreshTick;
  const isRequested = !!currentUser?.sentRequestGroup?.includes(
    group?.id || ""
  );
  const isMember = !!currentUser?.joinedGroup?.includes(group?.id || "");

  const handleJoin = () => {
    if (!group) return;
    const current = getUserById(currentUserId);
    if (!current) return;
    const alreadyRequested = (current.sentRequestGroup || []).includes(
      group.id
    );
    const alreadyMember = (current.joinedGroup || []).includes(group.id);
    if (alreadyRequested || alreadyMember) {
      // already in desired state
      return;
    }

    const updated = [...(current.sentRequestGroup || []), group.id];
    updateUserById(currentUserId, { sentRequestGroup: updated });
    setRefreshTick((t) => t + 1);
  };

  const handleCancel = () => {
    if (!group) return;
    const current = getUserById(currentUserId);
    if (!current) return;
    const updated = (current.sentRequestGroup || []).filter(
      (g) => g !== group.id
    );
    updateUserById(currentUserId, { sentRequestGroup: updated });
    setRefreshTick((t) => t + 1);
  };

  // If the group wasn't found, show a small placeholder and back button.
  if (!group) {
    return (
      <div className="space-y-4 rounded-lg bg-white p-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            aria-label="Back"
            title="Back"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg text-gray-700 shadow-md transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <FaArrowLeft />
          </button>
          <h2 className="text-lg font-medium text-gray-900">Group not found</h2>
        </div>
        <p className="text-sm text-gray-600">
          The group you requested does not exist.
        </p>
      </div>
    );
  }

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
            <div className="flex items-center gap-3">
              <h1 className="flex items-center justify-center gap-3 text-2xl font-semibold text-gray-900">
                <span>{group.name}</span>
                <span
                  aria-label={`${group.members?.length || 0} members`}
                  className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-sm font-medium text-gray-800"
                >
                  <FaUsers className="mr-1" />
                  <span>{group.members?.length || 0}</span>
                </span>
              </h1>
            </div>

            <p className="mt-1 text-sm text-gray-600">{group.description}</p>
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

import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { getGroupById } from "../../data/group-data/groupsData";
import {
  getCurrentUserId,
  getUserById,
  updateUserById,
} from "../../data/profile-data/userData";
import {} from "../../data/group-data/groupPostsData";
import GroupPostList from "./GroupPostList";
 

const GroupDetail: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const group = useMemo(
    () => (groupId ? getGroupById(groupId) : undefined),
    [groupId]
  );
  const currentUserId = getCurrentUserId();
  const user = getUserById(currentUserId);

  

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

  const handleJoinNow = () => {
    // For preview: directly add to joinedGroup
    if (isMember) return;
    const updated = [...(user?.joinedGroup || []), group.id];
    updateUserById(currentUserId, { joinedGroup: updated });
  };

  // Posts are read-only preview content coming from groupPostsData.ts

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <img
          src={group.coverImage}
          alt={group.name}
          className="h-56 w-full object-cover"
        />
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
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

            <div className="shrink-0">
              {!isMember && !isRequested && (
                <button
                  onClick={handleJoin}
                  className="rounded-md bg-blue-600 px-4 py-2 text-white"
                >
                  Send Join Request
                </button>
              )}

              {isRequested && (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleCancel}
                    className="rounded-md bg-red-600 px-4 py-2 text-white"
                  >
                    Cancel Request
                  </button>
                  <button
                    onClick={handleJoinNow}
                    className="rounded-md bg-green-600 px-4 py-2 text-white"
                  >
                    (Preview) Join Now
                  </button>
                </div>
              )}

              {isMember && (
                <div className="text-sm text-green-700">You are a member</div>
              )}
            </div>
          </div>

          <hr className="my-6" />

          {/* Posts list */}
          <div>
            <h2 className="mb-4 text-lg font-semibold">Posts</h2>
            <GroupPostList groupId={group.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDetail;

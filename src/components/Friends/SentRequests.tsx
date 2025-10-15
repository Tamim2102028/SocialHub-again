import React, { useState } from "react";
import FriendCard from "./FriendCard";
import {
  getCurrentUserId,
  getUserById,
  updateUserById,
} from "../../data/profile-data/userData";

const SentRequests: React.FC = () => {
  const [, setRefreshTick] = useState(0);
  const currentUserId = getCurrentUserId();
  const currentUser = getUserById(currentUserId);

  if (!currentUser) {
    return <div>User not found</div>;
  }

  const handleCancelRequest = (targetId: string) => {
    const target = getUserById(targetId);
    if (!target) return;

    const currentSent = new Set(currentUser.sentRequests || []);
    currentSent.delete(targetId);
    updateUserById(currentUserId, {
      sentRequests: Array.from(currentSent),
    });

    const targetPending = new Set(target.pendingRequests || []);
    targetPending.delete(currentUserId);
    updateUserById(targetId, {
      pendingRequests: Array.from(targetPending),
    });

    setRefreshTick((t) => t + 1);
  };

  // Get sent requests data from current user's sentRequests list
  const sentRequests = (currentUser.sentRequests || [])
    .map((requestId) => {
      const requestedUser = getUserById(requestId);
      if (!requestedUser) return null;

      // Get university/college name based on category
      const institutionName =
        requestedUser.category === "university"
          ? requestedUser.university?.name
          : requestedUser.college?.name;

      return {
        id: requestedUser.id,
        name: requestedUser.name,
        avatar: requestedUser.avatar,
        university: institutionName || "Unknown Institution",
      };
    })
    .filter((request) => request !== null);

  return (
    <div className="space-y-3">
      {sentRequests.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">
            No sent requests
          </h3>
          <p className="mt-2 text-gray-600">
            You haven't sent any friend requests yet.
          </p>
        </div>
      ) : (
        sentRequests.map((request) => (
          <FriendCard
            key={request.id}
            id={request.id}
            name={request.name}
            avatar={request.avatar}
            university={request.university}
            type="sent"
            onCancelRequest={handleCancelRequest}
          />
        ))
      )}
    </div>
  );
};

export default SentRequests;

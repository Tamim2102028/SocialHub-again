import React, { useState } from "react";
import FriendCard from "./FriendCard";
import { getCurrentUserId, getUserById, updateUserById } from "../../data/profile-data/userData";
import { useAppSelector } from "../../store/hooks";
import { selectUserById } from "../../store/slices/profileSlice";

const FriendRequests: React.FC = () => {
  const [, setRefreshTick] = useState(0);
  const currentUserId = getCurrentUserId();
  const currentUser = useAppSelector((s) => selectUserById(s, currentUserId));

  if (!currentUser) {
    return <div>User not found</div>;
  }

  const handleAccept = (requesterId: string) => {
    const requester = getUserById(requesterId);
    if (!requester) return;

    // Update current user: add to friends, remove from pendingRequests
    const currentFriendsArr = currentUser.friends || [];
    const newCurrentFriends = [
      requesterId,
      ...currentFriendsArr.filter((id) => id !== requesterId),
    ];
    const currentPending = new Set(currentUser.pendingRequests || []);
    currentPending.delete(requesterId);
    updateUserById(currentUserId, {
      friends: newCurrentFriends,
      pendingRequests: Array.from(currentPending),
    });

    // Update requester: add current user to friends, remove current user from sentRequests
    const requesterFriendsArr = requester.friends || [];
    const newRequesterFriends = [
      currentUserId,
      ...requesterFriendsArr.filter((id) => id !== currentUserId),
    ];
    const requesterSent = new Set(requester.sentRequests || []);
    requesterSent.delete(currentUserId);
    updateUserById(requesterId, {
      friends: newRequesterFriends,
      sentRequests: Array.from(requesterSent),
    });

    setRefreshTick((t) => t + 1);
  };

  const handleDecline = (requesterId: string) => {
    const requester = getUserById(requesterId);
    if (!requester) return;

    const currentPending = new Set(currentUser.pendingRequests || []);
    currentPending.delete(requesterId);
    updateUserById(currentUserId, {
      pendingRequests: Array.from(currentPending),
    });

    const requesterSent = new Set(requester.sentRequests || []);
    requesterSent.delete(currentUserId);
    updateUserById(requesterId, {
      sentRequests: Array.from(requesterSent),
    });

    setRefreshTick((t) => t + 1);
  };

  // Get pending friend requests data from current user's pendingRequests list
  const friendRequests = (currentUser.pendingRequests || [])
    .map((requestId) => {
      const requester = getUserById(requestId);
      if (!requester) return null;

      // Get university/college name based on category
      const institutionName =
        requester.category === "university"
          ? requester.university?.name
          : requester.college?.name;

      return {
        id: requester.id,
        name: requester.name,
        avatar: requester.avatar,
        university: institutionName || "Unknown Institution",
      };
    })
    .filter((request) => request !== null);

  return (
    <div className="space-y-3">
      {friendRequests.map((request) => (
        <FriendCard
          key={request.id}
          id={request.id}
          name={request.name}
          avatar={request.avatar}
          university={request.university}
          type="request"
          onAccept={handleAccept}
          onDecline={handleDecline}
        />
      ))}
    </div>
  );
};

export default FriendRequests;

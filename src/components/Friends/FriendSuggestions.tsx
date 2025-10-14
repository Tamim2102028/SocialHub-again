import React, { useState } from "react";
import FriendCard from "./FriendCard";
import {
  getCurrentUserId,
  getUserById,
  usersData,
  updateUserById,
} from "../../data/userData";

const FriendSuggestions: React.FC = () => {
  const [, setRefreshTick] = useState(0);
  const currentUserId = getCurrentUserId();
  const currentUser = getUserById(currentUserId);

  if (!currentUser) {
    return <div>User not found</div>;
  }

  const handleAddFriend = (targetId: string) => {
    const target = getUserById(targetId);
    if (!target) return;

    const currentSent = [...(currentUser.sentRequests || [])];
    // Remove if already exists to avoid duplicates, then add at the beginning
    const filteredSent = currentSent.filter(id => id !== targetId);
    updateUserById(currentUserId, {
      sentRequests: [targetId, ...filteredSent],
    });

    const targetPending = new Set(target.pendingRequests || []);
    targetPending.add(currentUserId);
    updateUserById(targetId, {
      pendingRequests: Array.from(targetPending),
    });

    setRefreshTick((t) => t + 1);
  };

  // Get friend suggestions - users who are not current user, not friends, not in pending requests, and not in sent requests
  const friendSuggestions = usersData
    .filter(
      (user) =>
        user.id !== currentUserId && // Not current user
        !currentUser.friends.includes(user.id) && // Not already a friend
        !(currentUser.pendingRequests || []).includes(user.id) && // Not in pending requests
        !(currentUser.sentRequests || []).includes(user.id) // Not in sent requests
    )
    .slice(0, 10) // Limit to 10 suggestions
    .map((user) => {
      // Get university/college name based on category
      const institutionName =
        user.category === "university"
          ? user.university?.name
          : user.college?.name;

      return {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        university: institutionName || "Unknown Institution",
      };
    });

  return (
    <div className="space-y-3">
      {friendSuggestions.map((suggestion) => (
        <FriendCard
          key={suggestion.id}
          id={suggestion.id}
          name={suggestion.name}
          avatar={suggestion.avatar}
          university={suggestion.university}
          type="suggestion"
          onAddFriend={handleAddFriend}
        />
      ))}
    </div>
  );
};

export default FriendSuggestions;

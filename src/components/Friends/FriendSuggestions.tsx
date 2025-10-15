import React, { useState } from "react";
import FriendCard from "./FriendCard";
import {
  getCurrentUserId,
  getUserById,
  usersData,
  updateUserById,
} from "../../data/profile-data/userData";

const FriendSuggestions: React.FC = () => {
  const [, setRefreshTick] = useState(0);
  const currentUserId = getCurrentUserId();
  const currentUser = getUserById(currentUserId);

  if (!currentUser) {
    return <div>User not found</div>;
  }

  // Get friend suggestions - users who are not current user, not friends, and not in pending requests
  const friendSuggestions = usersData
    .filter(
      (user) =>
        user.id !== currentUserId && // Not current user
        !currentUser.friends.includes(user.id) && // Not already a friend
        !(currentUser.pendingRequests || []).includes(user.id) && // Not in pending requests
        !(currentUser.sentRequests || []).includes(user.id) // Not in sent requests
    )
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

  // Handler for adding a friend (moved out of inline for clarity)
  const handleAddFriend = (targetId: string) => {
    const target = getUserById(targetId);
    if (!target) return;

    const currentSent = new Set(currentUser.sentRequests || []);
    currentSent.add(targetId);
    updateUserById(currentUserId, {
      sentRequests: Array.from(currentSent),
    });

    const targetPending = new Set(target.pendingRequests || []);
    targetPending.add(currentUserId);
    updateUserById(targetId, {
      pendingRequests: Array.from(targetPending),
    });

    // Remove the user from suggestions immediately by triggering a re-render
    setRefreshTick((t) => t + 1);
  };

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

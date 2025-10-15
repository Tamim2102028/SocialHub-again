import React, { useState } from "react";
import FriendCard from "./FriendCard";
import {
  getCurrentUserId,
  getUserById,
  updateUserById,
} from "../../data/profile-data/userData";

const FriendsList: React.FC = () => {
  const [, setRefreshTick] = useState(0);
  const currentUserId = getCurrentUserId();
  const currentUser = getUserById(currentUserId);

  if (!currentUser) {
    return <div>User not found</div>;
  }

  const handleUnfriend = (friendId: string) => {
    const friend = getUserById(friendId);
    if (!friend) return;

    // Remove from current user's friends list
    const currentFriends = currentUser.friends.filter((id) => id !== friendId);
    updateUserById(currentUserId, {
      friends: currentFriends,
    });

    // Remove current user from friend's friends list
    const friendFriends = friend.friends.filter((id) => id !== currentUserId);
    updateUserById(friendId, {
      friends: friendFriends,
    });

    setRefreshTick((t) => t + 1);
  };

  // Get friends data from current user's friends list
  const friends = currentUser.friends
    .map((friendId) => {
      const friend = getUserById(friendId);
      if (!friend) return null;

      // Get university/college name based on category
      const institutionName =
        friend.category === "university"
          ? friend.university?.name
          : friend.college?.name;

      return {
        id: friend.id,
        name: friend.name,
        avatar: friend.avatar,
        university: institutionName || "Unknown Institution",
      };
    })
    .filter((friend) => friend !== null);

  return (
    <div className="space-y-3">
      {friends.map((friend) => (
        <FriendCard
          key={friend.id}
          id={friend.id}
          name={friend.name}
          avatar={friend.avatar}
          university={friend.university}
          type="friend"
          onUnfriend={handleUnfriend}
        />
      ))}
    </div>
  );
};

export default FriendsList;

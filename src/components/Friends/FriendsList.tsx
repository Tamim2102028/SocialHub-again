import React from "react";
import FriendCard from "./FriendCard";
import { getCurrentUserId, getUserById } from "../../data/userData";

const FriendsList: React.FC = () => {
  const currentUserId = getCurrentUserId();
  const currentUser = getUserById(currentUserId);
  
  if (!currentUser) {
    return <div>User not found</div>;
  }

  // Get friends data from current user's friends list
  const friends = currentUser.friends.map(friendId => {
    const friend = getUserById(friendId);
    if (!friend) return null;
    
    // Get university/college name based on category
    const institutionName = friend.category === "university" 
      ? friend.university?.name 
      : friend.college?.name;
    
    return {
      id: friend.id,
      name: friend.name,
      avatar: friend.avatar,
      university: institutionName || "Unknown Institution"
    };
  }).filter(friend => friend !== null);

  return (
    <div className="space-y-4">
      {friends.map((friend) => (
        <FriendCard
          key={friend.id}
          id={friend.id}
          name={friend.name}
          avatar={friend.avatar}
          university={friend.university}
          type="friend"
        />
      ))}
    </div>
  );
};

export default FriendsList;

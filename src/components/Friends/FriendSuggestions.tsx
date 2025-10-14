import React from "react";
import FriendCard from "./FriendCard";
import { getCurrentUserId, getUserById, usersData } from "../../data/userData";

const FriendSuggestions: React.FC = () => {
  const currentUserId = getCurrentUserId();
  const currentUser = getUserById(currentUserId);
  
  if (!currentUser) {
    return <div>User not found</div>;
  }

  // Get friend suggestions - users who are not current user, not friends, and not in pending requests
  const friendSuggestions = usersData
    .filter(user => 
      user.id !== currentUserId && // Not current user
      !currentUser.friends.includes(user.id) && // Not already a friend
      !(currentUser.pendingRequests || []).includes(user.id) // Not in pending requests
    )
    .slice(0, 10) // Limit to 10 suggestions
    .map(user => {
      // Get university/college name based on category
      const institutionName = user.category === "university" 
        ? user.university?.name 
        : user.college?.name;
      
      return {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        university: institutionName || "Unknown Institution"
      };
    });

  return (
    <div className="space-y-4">
      {friendSuggestions.map((suggestion) => (
        <FriendCard
          key={suggestion.id}
          id={suggestion.id}
          name={suggestion.name}
          avatar={suggestion.avatar}
          university={suggestion.university}
          type="suggestion"
        />
      ))}
    </div>
  );
};

export default FriendSuggestions;

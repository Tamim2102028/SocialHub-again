import React from "react";
import FriendCard from "./FriendCard";
import { getCurrentUserId, getUserById } from "../../data/userData";

const FriendRequests: React.FC = () => {
  const currentUserId = getCurrentUserId();
  const currentUser = getUserById(currentUserId);
  
  if (!currentUser) {
    return <div>User not found</div>;
  }

  // Get pending friend requests data from current user's pendingRequests list
  const friendRequests = (currentUser.pendingRequests || []).map(requestId => {
    const requester = getUserById(requestId);
    if (!requester) return null;
    
    // Get university/college name based on category
    const institutionName = requester.category === "university" 
      ? requester.university?.name 
      : requester.college?.name;
    
    return {
      id: requester.id,
      name: requester.name,
      avatar: requester.avatar,
      university: institutionName || "Unknown Institution"
    };
  }).filter(request => request !== null);

  return (
    <div className="space-y-4">
      {friendRequests.map((request) => (
        <FriendCard
          key={request.id}
          id={request.id}
          name={request.name}
          avatar={request.avatar}
          university={request.university}
          type="request"
        />
      ))}
    </div>
  );
};

export default FriendRequests;

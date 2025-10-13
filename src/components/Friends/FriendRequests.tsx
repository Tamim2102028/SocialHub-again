import React from "react";
import { useAppSelector } from "../../store/hooks";
import { usersData, getCurrentUserId } from "../../data/userData";
import FriendCard from "./FriendCard";

const FriendRequests: React.FC = () => {
  const searchQuery = useAppSelector((state) => state.ui.friends.searchQuery);

  // TODO: Replace with real friend request logic
  // Show users who have sent a friend request to the current user
  const currentUser = usersData.find((u) => u.id === getCurrentUserId());
  const requests = (currentUser?.pendingRequests || [])
    .map((id) => usersData.find((u) => u.id === id))
    .filter((f): f is import("../../data/userData").UserData => Boolean(f));
  const filteredRequests = requests.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAcceptRequest = (id: string) => {
    // TODO: Implement accept friend request logic
    console.log("Accepting friend request:", id);
  };

  const handleRejectRequest = (id: string) => {
    // TODO: Implement reject friend request logic
    console.log("Rejecting friend request:", id);
  };

  if (filteredRequests.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-500">
          {searchQuery
            ? "No friend requests found matching your search."
            : "No pending friend requests."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filteredRequests.map((request) => (
        <FriendCard
          key={request.id}
          friend={request}
          type="request"
          onAcceptRequest={handleAcceptRequest}
          onRejectRequest={handleRejectRequest}
        />
      ))}
    </div>
  );
};

export default FriendRequests;

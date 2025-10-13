import React from "react";
import { useAppSelector } from "../../store/hooks";
import { usersData, getCurrentUserId } from "../../data/userData";
import FriendCard from "./FriendCard";

const FriendSuggestions: React.FC = () => {
  const searchQuery = useAppSelector((state) => state.ui.friends.searchQuery);

  // Suggest users who are not the current user, not already friends, and not in pendingRequests
  const currentUserId = getCurrentUserId();
  const currentUser = usersData.find((u) => u.id === currentUserId);
  const excludeIds = new Set([
    currentUserId,
    ...(currentUser?.friends || []),
    ...(currentUser?.pendingRequests || []),
  ]);
  const suggestions = usersData.filter((user) => !excludeIds.has(user.id));
  const filteredSuggestions = suggestions.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddFriend = (id: string) => {
    // TODO: Implement add friend logic
    console.log("Adding friend:", id);
  };

  if (filteredSuggestions.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-500">
          {searchQuery
            ? "No friend suggestions found matching your search."
            : "No friend suggestions available."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filteredSuggestions.map((suggestion) => (
        <FriendCard
          key={suggestion.id}
          friend={suggestion}
          type="suggestion"
          onAddFriend={handleAddFriend}
        />
      ))}
    </div>
  );
};

export default FriendSuggestions;

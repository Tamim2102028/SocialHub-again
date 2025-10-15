import React from "react";
import FriendCard from "./FriendCard";
import { usersData } from "../../data/profile-data/userData";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectUserById, sendFriendRequest } from "../../store/slices/profileSlice";

const FriendSuggestions: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((s) => selectUserById(s, s.profile.id));

  if (!currentUser) {
    return <div>User not found</div>;
  }

  // Get friend suggestions - users who are not current user, not friends, and not in pending requests
  const friendSuggestions = usersData
    .filter(
      (user) =>
        user.id !== currentUser.id && // Not current user
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
    dispatch(sendFriendRequest(targetId));
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

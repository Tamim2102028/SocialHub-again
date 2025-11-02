import React from "react";
import FriendCard from "../shared/FriendCard";
import { usersData } from "../../data/profile-data/userData";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectUserById } from "../../store/slices/profileSlice";
import {
  selectFriendsForUser,
  selectPendingRequestsForUser,
  selectSentRequestsByUser,
  sendFriendRequest,
} from "../../store/slices/friendsSlice";
import type { RootState } from "../../store/store";

const FriendSuggestions: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((s) => selectUserById(s, s.profile.id));

  // Get friend data from Redux friends slice
  const friendIds = useAppSelector((s: RootState) =>
    selectFriendsForUser(s, currentUser?.id || "")
  );
  const pendingRequestIds = useAppSelector((s: RootState) =>
    selectPendingRequestsForUser(s, currentUser?.id || "")
  );
  const sentRequestIds = useAppSelector((s: RootState) =>
    selectSentRequestsByUser(s, currentUser?.id || "")
  );

  if (!currentUser) {
    return <div>User not found</div>;
  }

  // Get friend suggestions - users who are not current user, not friends, and not in pending requests
  const friendSuggestions = usersData
    .filter(
      (user) =>
        user.id !== currentUser.id && // Not current user
        !friendIds.includes(user.id) && // Not already a friend
        !pendingRequestIds.includes(user.id) && // Not in pending requests
        !sentRequestIds.includes(user.id) // Not in sent requests
    )
    .map((user) => {
      // Get university/college name based on education level
      const institutionName =
        user.educationLevel === "UNIVERSITY"
          ? user.university?.name
          : user.college?.name;

      return {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        university: institutionName || "Unknown Institution",
      };
    });

  // Handler for adding a friend
  const handleAddFriend = (targetId: string) => {
    dispatch(
      sendFriendRequest({ senderId: currentUser.id, receiverId: targetId })
    );
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

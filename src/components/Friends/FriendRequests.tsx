import React from "react";
import FriendCard from "./FriendCard";
import { getUserById } from "../../services/userService";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectUserById, acceptFriendRequest, declineFriendRequest } from "../../store/slices/profileSlice";

const FriendRequests: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((s) => selectUserById(s, s.profile.id));

  if (!currentUser) {
    return <div>User not found</div>;
  }

  const handleAccept = (requesterId: string) => {
    dispatch(acceptFriendRequest(requesterId));
  };

  const handleDecline = (requesterId: string) => {
    dispatch(declineFriendRequest(requesterId));
  };

  // Get pending friend requests data from current user's pendingRequests list
  const friendRequests = (currentUser.pendingRequests || [])
    .map((requestId) => {
      const requester = getUserById(requestId);
      if (!requester) return null;

      const institutionName =
        requester.category === "university"
          ? requester.university?.name
          : requester.college?.name;

      return {
        id: requester.id,
        name: requester.name,
        avatar: requester.avatar,
        university: institutionName || "Unknown Institution",
      };
    })
    .filter((request) => request !== null) as Array<{
    id: string;
    name: string;
    avatar: string;
    university: string;
  }>;

  return (
    <div className="space-y-3">
      {friendRequests.map((request) => (
        <FriendCard
          key={request.id}
          id={request.id}
          name={request.name}
          avatar={request.avatar}
          university={request.university}
          type="request"
          onAccept={handleAccept}
          onDecline={handleDecline}
        />
      ))}
    </div>
  );
};

export default FriendRequests;

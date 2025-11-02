import React from "react";
import FriendCard from "../shared/FriendCard";
import { getUserById } from "../../services/userService";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectUserById } from "../../store/slices/profileSlice";
import {
  selectPendingRequestsForUser,
  acceptFriendRequest,
  rejectFriendRequest,
} from "../../store/slices/friendsSlice";
import type { RootState } from "../../store/store";

const FriendRequests: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((s) => selectUserById(s, s.profile.id));

  // Get pending requests from Redux friends slice
  const requesterIds = useAppSelector((s: RootState) =>
    selectPendingRequestsForUser(s, currentUser?.id || "")
  );

  if (!currentUser) {
    return <div>User not found</div>;
  }

  const handleAccept = (requesterId: string) => {
    dispatch(
      acceptFriendRequest({ senderId: requesterId, receiverId: currentUser.id })
    );
  };

  const handleDecline = (requesterId: string) => {
    dispatch(
      rejectFriendRequest({ senderId: requesterId, receiverId: currentUser.id })
    );
  };

  // Get pending friend requests data from requesterIds
  const friendRequests = requesterIds
    .map((requestId) => {
      const requester = getUserById(requestId);
      if (!requester) return null;

      const institutionName =
        requester.educationLevel === "UNIVERSITY"
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
    <div>
      {friendRequests.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">
            No friend requests
          </h3>
          <p className="mt-2 text-gray-600">
            You don't have any pending friend requests.
          </p>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default FriendRequests;

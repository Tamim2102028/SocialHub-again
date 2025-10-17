import React from "react";
import FriendCard from "./FriendCard";
import { getUserById } from "../../services/userService";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectUserById, cancelFriendRequest } from "../../store/slices/profileSlice";

const SentRequests: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((s) => selectUserById(s, s.profile.id));

  if (!currentUser) {
    return <div>User not found</div>;
  }




  const handleCancelRequest = (targetId: string) => {
    dispatch(cancelFriendRequest(targetId));
  };

  // Get sent requests data from current user's sentRequests list
  const sentRequests = (currentUser.sentRequests || [])
    .map((requestId) => {
      const requestedUser = getUserById(requestId);
      if (!requestedUser) return null;

      const institutionName =
        requestedUser.category === "university"
          ? requestedUser.university?.name
          : requestedUser.college?.name;

      return {
        id: requestedUser.id,
        name: requestedUser.name,
        avatar: requestedUser.avatar,
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
      {sentRequests.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">
            No sent requests
          </h3>
          <p className="mt-2 text-gray-600">
            You haven't sent any friend requests yet.
          </p>
        </div>
      ) : (
        sentRequests.map((request) => (
          <FriendCard
            key={request.id}
            id={request.id}
            name={request.name}
            avatar={request.avatar}
            university={request.university}
            type="sent"
            onCancelRequest={handleCancelRequest}
          />
        ))
      )}
    </div>
  );
};

export default SentRequests;

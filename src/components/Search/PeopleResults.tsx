import React from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  selectFilteredPeople,
  sendFriendRequest,
  cancelFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  unfriend,
} from "../../store/slices/search/searchSlice";
import FriendCard from "../shared/FriendCard";

interface PeopleResultsProps {
  isVisible: boolean;
}

const PeopleResults: React.FC<PeopleResultsProps> = ({ isVisible }) => {
  const dispatch = useAppDispatch();
  const filteredPeople = useAppSelector(selectFilteredPeople);

  if (!isVisible) return null;
  if (filteredPeople.length === 0) return null;

  // Map relationStatus to FriendCard type
  const getCardType = (
    status?: "friend" | "pending" | "none" | "received"
  ): "friend" | "request" | "suggestion" | "search" | "sent" => {
    if (status === "friend") return "friend";
    if (status === "received") return "request";
    if (status === "pending") return "sent";
    return "suggestion";
  };

  const handleAddFriend = (id: string) => {
    dispatch(sendFriendRequest(id));
  };

  const handleCancelRequest = (id: string) => {
    dispatch(cancelFriendRequest(id));
  };

  const handleAccept = (id: string) => {
    dispatch(acceptFriendRequest(id));
  };

  const handleDecline = (id: string) => {
    dispatch(declineFriendRequest(id));
  };

  const handleUnfriend = (id: string) => {
    dispatch(unfriend(id));
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold text-gray-900">
        People ({filteredPeople.length})
      </h2>
      <div className="space-y-4">
        {filteredPeople.map((person) => (
          <FriendCard
            key={person.id}
            id={person.id}
            name={person.name}
            avatar={person.avatar}
            university={person.university || ""}
            type={getCardType(person.relationStatus)}
            onAddFriend={handleAddFriend}
            onCancelRequest={handleCancelRequest}
            onAccept={handleAccept}
            onDecline={handleDecline}
            onUnfriend={handleUnfriend}
          />
        ))}
      </div>
    </div>
  );
};

export default PeopleResults;

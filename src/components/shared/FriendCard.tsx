import React from "react";
import { FaUserPlus, FaComment, FaCheck, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

interface FriendCardProps {
  id: string;
  name: string;
  avatar: string;
  university: string;
  type: "friend" | "request" | "suggestion" | "search" | "sent";
  onAccept?: (id: string) => void;
  onDecline?: (id: string) => void;
  onAddFriend?: (id: string) => void;
  // called when a previously-sent friend request should be cancelled
  onCancelRequest?: (id: string) => void;
  // called when removing an existing friend
  onUnfriend?: (id: string) => void;
  // optional custom element to render on the right (e.g., a menu button)
  menuElement?: React.ReactNode;
}

const FriendCard: React.FC<FriendCardProps> = ({
  id,
  name,
  avatar,
  university,
  type,
  onAccept,
  onDecline,
  onAddFriend,
  onCancelRequest,
  onUnfriend,
  menuElement,
}) => {
  const renderActions = () => {
    if (type === "friend") {
      return (
        <div className="flex items-center space-x-2">
          <div className="flex items-center rounded-lg bg-blue-100 px-4 py-2 text-blue-600">
            <FaComment className="mr-2" />
            Message
          </div>
          <button
            type="button"
            onClick={() => onUnfriend && onUnfriend(id)}
            className="flex items-center rounded-lg bg-red-100 px-3 py-2 text-red-600 hover:bg-red-200"
          >
            <FaTimes className="mr-1" />
            Unfriend
          </button>
        </div>
      );
    } else if (type === "request") {
      return (
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => onAccept && onAccept(id)}
            className="flex items-center rounded-lg bg-green-100 px-3 py-2 text-green-600 hover:bg-green-200"
          >
            <FaCheck className="mr-1" />
            Accept
          </button>
          <button
            type="button"
            onClick={() => onDecline && onDecline(id)}
            className="flex items-center rounded-lg bg-red-100 px-3 py-2 text-red-600 hover:bg-red-200"
          >
            <FaTimes className="mr-1" />
            Decline
          </button>
        </div>
      );
    } else if (type === "suggestion") {
      return (
        <button
          type="button"
          onClick={() => onAddFriend && onAddFriend(id)}
          className="flex items-center rounded-lg bg-blue-100 px-4 py-2 text-blue-600 hover:bg-blue-200"
        >
          <FaUserPlus className="mr-2" />
          Add Friend
        </button>
      );
    } else if (type === "sent") {
      return (
        <div className="flex">
          <button
            type="button"
            onClick={() => onCancelRequest && onCancelRequest(id)}
            className="flex items-center rounded-lg bg-red-100 px-3 py-2 text-red-600 hover:bg-red-200"
          >
            <FaTimes className="mr-1" />
            Cancel Request
          </button>
        </div>
      );
    } else if (type === "search") {
      return null;
    } else {
      return null;
    }
  };

  return (
    <div className="flex items-center space-x-3 rounded-lg border border-gray-300 bg-white p-3 shadow-sm">
      <img
        src={avatar}
        alt={name}
        className="h-12 w-12 rounded-full object-cover"
      />
      <div className="flex-1">
        <h3>
          <NavLink
            to={`/profile/${id}`}
            className="font-semibold text-gray-900 transition-colors hover:text-blue-600 hover:underline"
          >
            {name}
          </NavLink>
        </h3>
        {university && <p className="text-sm text-gray-500">{university}</p>}
      </div>
      <div className="flex items-center gap-2">
        {renderActions()}
        {menuElement && <div>{menuElement}</div>}
      </div>
    </div>
  );
};

export default FriendCard;

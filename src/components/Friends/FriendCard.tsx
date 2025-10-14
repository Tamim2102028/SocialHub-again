import React from "react";
import { FaUserPlus, FaComment, FaCheck, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

interface FriendCardProps {
  id: string;
  name: string;
  avatar: string;
  university: string;
  type: "friend" | "request" | "suggestion" | "search";
}

const FriendCard: React.FC<FriendCardProps> = ({
  id,
  name,
  avatar,
  university,
  type,
}) => {
  const renderActions = () => {
    if (type === "friend") {
      return (
        <div className="flex items-center rounded-lg bg-blue-100 px-4 py-2 text-blue-600">
          <FaComment className="mr-2" />
          Message
        </div>
      );
    } else if (type === "request") {
      return (
        <div className="flex space-x-2">
          <div className="flex items-center rounded-lg bg-green-100 px-3 py-2 text-green-600">
            <FaCheck className="mr-1" />
            Accept
          </div>
          <div className="flex items-center rounded-lg bg-red-100 px-3 py-2 text-red-600">
            <FaTimes className="mr-1" />
            Decline
          </div>
        </div>
      );
    } else if (type === "suggestion") {
      return (
        <div className="flex items-center rounded-lg bg-blue-100 px-4 py-2 text-blue-600">
          <FaUserPlus className="mr-2" />
          Add Friend
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
        {university && (
          <p className="text-sm text-gray-500">{university}</p>
        )}
      </div>
      {renderActions()}
    </div>
  );
};

export default FriendCard;

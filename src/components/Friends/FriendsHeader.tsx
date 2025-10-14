import React from "react";
import { FaSearch } from "react-icons/fa";

interface FriendsHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const FriendsHeader: React.FC<FriendsHeaderProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-900">Friends</h1>
      <div className="relative">
        <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400" />
        <input
          type="text"
          placeholder="Search friends..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-64 rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default FriendsHeader;

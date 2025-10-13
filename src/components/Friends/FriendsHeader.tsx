import React from "react";
import { FaUsers, FaSearch } from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setFriendsSearchQuery } from "../../store/slices/uiSlice";

const FriendsHeader: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.ui.friends.searchQuery);

  return (
    <div className="flex items-center justify-between">
      <h1 className="flex items-center text-2xl font-bold text-gray-900">
        <FaUsers className="mr-3 text-blue-600" />
        Friends
      </h1>
      <div className="relative">
        <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-500" />
        <input
          type="text"
          placeholder="Search friends..."
          value={searchQuery}
          onChange={(e) => dispatch(setFriendsSearchQuery(e.target.value))}
          className="rounded-lg border border-gray-300 bg-white py-2 pr-4 pl-10 text-base font-medium placeholder-gray-400"
        />
      </div>
    </div>
  );
};

export default FriendsHeader;

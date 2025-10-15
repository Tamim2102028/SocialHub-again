import React from "react";
import { BsStars } from "react-icons/bs";
import { FaBars, FaTimes } from "react-icons/fa";

interface AIHeaderProps {
  onMenuToggle: () => void;
  isSidebarOpen: boolean;
}

const AIHeader: React.FC<AIHeaderProps> = ({ onMenuToggle, isSidebarOpen }) => {
  return (
    <div className="flex items-center gap-3 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2">
      {/* Menu Toggle Button */}
      <button
        onClick={onMenuToggle}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-700 transition-colors hover:border hover:bg-white/50"
      >
        {isSidebarOpen ? (
          <FaTimes className="h-4 w-4" />
        ) : (
          <FaBars className="h-4 w-4" />
        )}
      </button>

      {/* AI Icon */}
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500">
        <BsStars className="text-xl text-white" />
      </div>

      {/* Title */}
      <div className="flex-1">
        <h2 className="text-base font-bold text-gray-900">Study Helper AI</h2>
      </div>
    </div>
  );
};

export default AIHeader;

import React from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";

interface ActionBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onNewFolder: () => void;
  onUpload: () => void;
}

const ActionBar: React.FC<ActionBarProps> = ({
  searchQuery,
  onSearchChange,
  onNewFolder,
  onUpload,
}) => {
  return (
    <div className="flex items-center justify-between">
      {/* Buttons */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onNewFolder}
          className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
        >
          <FaPlus className="h-4 w-4" />
          New Folder
        </button>
        <button
          onClick={onUpload}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm text-white transition-colors hover:bg-blue-700"
        >
          <FiUpload className="h-4 w-4" />
          Upload File
        </button>
      </div>

      {/* search bar */}
      <div className="flex items-center space-x-3">
        <div className="relative">
          <FaSearch className="absolute top-1/2 left-3 h-3 w-3 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search files..."
            className="w-full rounded-md border border-blue-500 py-2 pr-3 pl-8 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ActionBar;

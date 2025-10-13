import React from "react";
import { FaFolder, FaPlus, FaUpload } from "react-icons/fa";

interface EmptyStateProps {
  searchQuery: string;
  onNewFolder: () => void;
  onUpload: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  searchQuery,
  onNewFolder,
  onUpload,
}) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
      <FaFolder className="mx-auto mb-3 text-4xl text-gray-300" />
      <h3 className="mb-2 text-base font-medium text-gray-900">
        {searchQuery ? "No files found" : "This folder is empty"}
      </h3>
      <p className="mb-4 text-sm text-gray-500">
        {searchQuery
          ? "Try adjusting your search terms."
          : "Upload files or create folders to get started."}
      </p>
      {!searchQuery && (
        <div className="flex justify-center space-x-3">
          <button
            onClick={onNewFolder}
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
          >
            <FaPlus className="h-3 w-3" />
            New Folder
          </button>
          <button
            onClick={onUpload}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm text-white transition-colors hover:bg-blue-700"
          >
            <FaUpload className="h-3 w-3" />
            Upload File
          </button>
        </div>
      )}
    </div>
  );
};

export default EmptyState;

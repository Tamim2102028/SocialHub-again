import React, { useState } from "react";
import {
  FaFolder,
  FaFile,
  FaFileAlt,
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFileImage,
  FaFileVideo,
  FaFileAudio,
  FaFileCode,
  FaArrowLeft,
} from "react-icons/fa";
import ActionBar from "./PersonalFiles/ActionBar";
import Breadcrumb from "./PersonalFiles/Breadcrumb";
import FilesList from "./PersonalFiles/FilesList";
import EmptyState from "./PersonalFiles/EmptyState";
import NewFolderModal from "./PersonalFiles/NewFolderModal";
import UploadModal from "./PersonalFiles/UploadModal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  navigateToFolder,
  navigateBack,
  navigateToBreadcrumb,
  createNewFolder as createFolder,
  uploadFiles as uploadFilesToStore,
  selectCurrentFiles,
  selectCurrentPath,
  selectBreadcrumbPath,
} from "../../store/slices/filesSlice";
import type { FileItem } from "./PersonalFiles/data/personalFilesData";

const PersonalFiles: React.FC = () => {
  // Redux state and actions
  const dispatch = useAppDispatch();
  const currentFiles = useAppSelector(selectCurrentFiles);
  const currentPath = useAppSelector(selectCurrentPath);
  const breadcrumbPath = useAppSelector(selectBreadcrumbPath);

  // Local UI state (only for modals and search)
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const getFileIcon = (item: FileItem) => {
    if (item.type === "folder") {
      return <FaFolder className="text-blue-500" />;
    }

    const fileExtension = item.name.split(".").pop()?.toLowerCase();

    switch (fileExtension) {
      case "pdf":
        return <FaFilePdf className="text-red-500" />;
      case "doc":
      case "docx":
        return <FaFileWord className="text-blue-600" />;
      case "xls":
      case "xlsx":
        return <FaFileExcel className="text-green-600" />;
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <FaFileImage className="text-purple-500" />;
      case "mp4":
      case "avi":
      case "mov":
        return <FaFileVideo className="text-indigo-500" />;
      case "mp3":
      case "wav":
        return <FaFileAudio className="text-yellow-500" />;
      case "js":
      case "ts":
      case "jsx":
      case "tsx":
      case "py":
      case "java":
        return <FaFileCode className="text-gray-700" />;
      case "txt":
        return <FaFileAlt className="text-gray-500" />;
      default:
        return <FaFile className="text-gray-500" />;
    }
  };

  // Navigation functions using Redux actions
  const handleNavigateToFolder = (folderId: string, folderName: string) => {
    dispatch(navigateToFolder({ id: folderId, name: folderName }));
  };

  const handleNavigateToBreadcrumb = (index: number) => {
    dispatch(navigateToBreadcrumb(index));
  };

  const handleNavigateBack = () => {
    dispatch(navigateBack());
  };

  // File management functions using Redux actions
  const handleCreateNewFolder = (folderName: string) => {
    dispatch(createFolder(folderName));
  };

  const handleUploadFiles = (files: File[]) => {
    dispatch(uploadFilesToStore(files));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const filteredFiles = currentFiles.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-3">
      {/* Action Bar */}
      <ActionBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNewFolder={() => setShowNewFolderModal(true)}
        onUpload={() => setShowUploadModal(true)}
      />

      {/* Navigation with Back Button and Breadcrumbs */}
      <div className="flex items-center space-x-3">
        {/* Back Button */}
        <button
          onClick={handleNavigateBack}
          disabled={currentPath.length === 0}
          className={`rounded-lg p-2 transition-colors ${
            currentPath.length === 0
              ? "cursor-not-allowed bg-gray-100 text-gray-400"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
          }`}
          title="Go back"
        >
          <FaArrowLeft className="h-4 w-4" />
        </button>

        {/* Breadcrumbs */}
        <Breadcrumb
          currentPath={breadcrumbPath}
          onNavigate={handleNavigateToBreadcrumb}
        />
      </div>

      {/* Files Display */}
      {filteredFiles.length > 0 ? (
        <FilesList
          files={filteredFiles}
          onFolderClick={handleNavigateToFolder}
          getFileIcon={getFileIcon}
          formatDate={formatDate}
        />
      ) : (
        <EmptyState
          searchQuery={searchQuery}
          onNewFolder={() => setShowNewFolderModal(true)}
          onUpload={() => setShowUploadModal(true)}
        />
      )}

      {/* Modals */}
      <NewFolderModal
        isOpen={showNewFolderModal}
        onClose={() => setShowNewFolderModal(false)}
        onCreateFolder={handleCreateNewFolder}
      />
      <UploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUploadFiles={handleUploadFiles}
      />
    </div>
  );
};

export default PersonalFiles;

import React, { useState } from "react";
import { FaFolder, FaUsers } from "react-icons/fa";
import PersonalFiles from "../components/FilesAndArchive/PersonalFiles";
import CommunityStudyArchive from "../components/FilesAndArchive/CommunityStudyArchive";

const FilesAndArchive: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"personal" | "community">(
    "personal"
  );

  return (
    <>
      {/* Header */}
      <div className="border-b bg-gray-50">
        {/* Tab Navigation */}
        <div className="flex justify-evenly">
          <button
            onClick={() => setActiveTab("personal")}
            className={`flex items-center gap-2 border-b-2 px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === "personal"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:border-black hover:text-black"
            }`}
          >
            <FaFolder className="text-lg" />
            My Personal Files
          </button>
          <button
            onClick={() => setActiveTab("community")}
            className={`flex items-center gap-2 border-b-2 px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === "community"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:border-black hover:text-black"
            }`}
          >
            <FaUsers className="text-lg" />
            Community Study Archive
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="w-full">
        {activeTab === "personal" && <PersonalFiles />}
        {activeTab === "community" && <CommunityStudyArchive />}
      </div>
    </>
  );
};

export default FilesAndArchive;

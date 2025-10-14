import React from "react";
import GroupsHeader from "../components/Groups/GroupsHeader";
import MyGroups from "../components/Groups/MyGroups";
import SuggestedGroups from "../components/Groups/SuggestedGroups";
import CareerGroups from "../components/Groups/CareerGroups";
import UniversityGroups from "../components/Groups/UniversityGroups";

const Groups: React.FC = () => {
  // Static data for demonstration

  const [activeTab, setActiveTab] = React.useState<
    "my" | "university" | "career" | "suggested"
  >("my");

  return (
    <>
      <GroupsHeader />
      <div className="mb-6 flex gap-2 border-b border-gray-200">
        <button
          className={`px-4 py-2 font-medium transition-colors ${activeTab === "my" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600 hover:text-blue-600"}`}
          onClick={() => setActiveTab("my")}
        >
          My Groups
        </button>
        <button
          className={`px-4 py-2 font-medium transition-colors ${activeTab === "university" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600 hover:text-blue-600"}`}
          onClick={() => setActiveTab("university")}
        >
          University Groups
        </button>
        <button
          className={`px-4 py-2 font-medium transition-colors ${activeTab === "career" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600 hover:text-blue-600"}`}
          onClick={() => setActiveTab("career")}
        >
          Career & Job Groups
        </button>
        <button
          className={`px-4 py-2 font-medium transition-colors ${activeTab === "suggested" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600 hover:text-blue-600"}`}
          onClick={() => setActiveTab("suggested")}
        >
          Suggested Groups
        </button>
      </div>
      {activeTab === "my" && <MyGroups />}
      {activeTab === "university" && <UniversityGroups />}
      {activeTab === "career" && <CareerGroups />}
      {activeTab === "suggested" && <SuggestedGroups />}
    </>
  );
};

export default Groups;

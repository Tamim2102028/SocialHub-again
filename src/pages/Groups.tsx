import React from "react";
import GroupsHeader from "../components/Groups/GroupsHeader";
import MyGroups from "../components/Groups/MyGroups";
import SuggestedGroups from "../components/Groups/SuggestedGroups";
import CareerGroups from "../components/Groups/CareerGroups";
import UniversityGroups from "../components/Groups/UniversityGroups";
import SentGroupRequests from "../components/Groups/SentGroupRequests.tsx";

const Groups: React.FC = () => {
  // Static data for demonstration

  const [activeTab, setActiveTab] = React.useState<
    "my" | "university" | "career" | "suggested" | "requests"
  >("my");

  const tabs: { key: typeof activeTab; label: string }[] = [
    { key: "my", label: "My Groups" },
    { key: "university", label: "University Groups" },
    { key: "career", label: "Career & Job Groups" },
    { key: "suggested", label: "Suggested Groups" },
    { key: "requests", label: "Sent Requests" },
  ];

  return (
    <>
      <GroupsHeader />
      <div className="flex justify-between border-b border-gray-200">
        {tabs.map((t) => (
          <button
            key={t.key}
            className={`py-1 font-medium transition-colors ${activeTab === t.key ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600 hover:text-blue-600"}`}
            onClick={() => setActiveTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === "my" && <MyGroups />}
      {activeTab === "requests" && <SentGroupRequests />}
      {activeTab === "university" && <UniversityGroups />}
      {activeTab === "career" && <CareerGroups />}
      {activeTab === "suggested" && <SuggestedGroups />}
    </>
  );
};

export default Groups;

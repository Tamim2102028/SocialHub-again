import React from "react";
import GroupCard from "./GroupCard";
import type { Group } from "../../data/groupsData";

interface SuggestedGroupsProps {
  groups: Group[];
}

const SuggestedGroups: React.FC<SuggestedGroupsProps> = ({ groups }) => {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        Suggested Groups
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <GroupCard key={group.groupId} group={group} showJoinButton={true} />
        ))}
      </div>
    </div>
  );
};

export default SuggestedGroups;

import React from "react";
import GroupCard from "./GroupCard";

import type { Group } from "../../data/groupsData";

interface GroupCardProps {
  group: Group;
  showJoinButton: boolean;
}

interface MyGroupsProps {
  groups: Group[];
}

const MyGroups: React.FC<MyGroupsProps> = ({ groups }) => {
  return (
    <div className="mb-8">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        My Groups ({groups.length})
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <GroupCard key={group.groupId} group={group} showJoinButton={false} />
        ))}
      </div>
    </div>
  );
};

export default MyGroups;

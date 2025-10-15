import React, { useState } from "react";
import GroupCard from "./GroupCard";
import { getGroupById } from "../../data/group-data/groupsData";
import {
  getCurrentUserId,
  getUserById,
} from "../../data/profile-data/userData";

// Pick some groups by id to suggest (display-only)
const suggestedIds = ["g19", "g5", "g13"];

const SuggestedGroups: React.FC = () => {
  // tick state to trigger re-evaluation after join/cancel actions
  const [, setRefreshTick] = useState(0);

  const groups = suggestedIds
    .map((id) => getGroupById(id))
    .filter(Boolean)
    .filter((g) => g!.privacy !== "closed")
    .filter((g) => {
      const user = getUserById(getCurrentUserId());
      const joined = new Set(user?.joinedGroup || []);
      const sent = new Set(user?.sentRequestGroup || []);
      return !joined.has(g!.id) && !sent.has(g!.id);
    })
    .map((g) => ({
      id: g!.id,
      name: g!.name,
      description: g!.description,
      coverImage: g!.coverImage,
      memberCount: g!.members?.length || 0,
      privacy: g!.privacy,
    }));

  return (
    <div>
      <h2 className="mb-3 text-xl font-semibold text-gray-900">
        Suggested Groups ({groups.length})
      </h2>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <GroupCard
            key={group.id}
            group={group}
            showJoinButton={true}
            onRequestChange={() => setRefreshTick((t) => t + 1)}
          />
        ))}
      </div>
    </div>
  );
};

export default SuggestedGroups;

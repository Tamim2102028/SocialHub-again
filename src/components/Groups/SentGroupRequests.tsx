import React from "react";
import {
  getCurrentUserId,
  getUserById,
} from "../../data/profile-data/userData";
import { getGroupById } from "../../data/group-data/groupsData";
import GroupCard from "./GroupCard";

const SentGroupRequests: React.FC = () => {
  const userId = getCurrentUserId();
  const user = getUserById(userId);

  const sent = user?.sentRequestGroup || [];

  const [, setRefreshTick] = React.useState(0);

  if (sent.length === 0) {
    return (
      <div className="mb-8">
        <h2 className="mb-2 text-xl font-semibold text-gray-900">
          Sent Requests
        </h2>
        <p className="text-sm text-gray-600">
          You have no pending group requests.
        </p>
      </div>
    );
  }

  const requestGroups = sent
    .map((gid) => getGroupById(gid))
    .filter(Boolean)
    // exclude groups that are closed — sent requests to closed groups shouldn't appear here
    .filter((g) => g && g.privacy !== "closed")
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
        Sent Requests ({requestGroups.length})
      </h2>
      {requestGroups.length === 0 && (
        <p className="mb-4 text-sm text-gray-600">
          You have no pending group requests (closed groups are not listed).
        </p>
      )}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {requestGroups.map((group) => (
          <GroupCard
            key={group.id}
            group={group}
            showJoinButton={false}
            showCancelButton={true}
            onRequestChange={() => setRefreshTick((t) => t + 1)}
          />
        ))}
      </div>
    </div>
  );
};

export default SentGroupRequests;

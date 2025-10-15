import React from "react";
import { getCurrentUserId, getUserById } from "../../data/userData";
import { getGroupById } from "../../data/groupsData";
import GroupCard from "./GroupCard";

const SentGroupRequests: React.FC = () => {
  const userId = getCurrentUserId();
  const user = getUserById(userId);

  const sent = user?.sentRequestGroup || [];

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
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {requestGroups.map((group) => (
          <GroupCard key={group.id} group={group} showJoinButton={false} />
        ))}
      </div>
    </div>
  );
};

export default SentGroupRequests;

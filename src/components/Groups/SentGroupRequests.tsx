import React from "react";
import { getCurrentUserId, getUserById } from "../../data/userData";
import { getGroupById } from "../../data/groupsData";

const SentGroupRequests: React.FC = () => {
  const userId = getCurrentUserId();
  const user = getUserById(userId);

  const sent = user?.sentRequestGroup || [];

  if (sent.length === 0) {
    return (
      <div className="mt-6 mb-8">
        <h3 className="mb-2 text-lg font-semibold text-gray-900">Sent Requests</h3>
        <p className="text-sm text-gray-600">You have no pending group requests.</p>
      </div>
    );
  }

  return (
    <div className="mt-6 mb-8">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">Sent Requests ({sent.length})</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sent.map((groupId) => {
          const group = getGroupById(groupId);
          if (!group) return null;
          return (
            <div key={group.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="mb-2 text-sm font-semibold text-gray-900">{group.name}</div>
              <div className="text-xs text-gray-600 mb-3">{group.description}</div>
              <div className="text-xs text-gray-500">Status: Pending</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SentGroupRequests;

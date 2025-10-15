import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaUsers, FaLock, FaGlobe, FaBan } from "react-icons/fa";
import {
  getCurrentUserId,
  getUserById,
  updateUserById,
} from "../../../data/profile-data/userData";

// Accepts group with 'id' property instead of 'groupId'.
type SmallGroup = {
  id: string;
  name: string;
  description?: string;
  coverImage?: string;
  memberCount?: number;
  privacy?: string;
  category?: string;
};

type GroupCardProps = {
  group: SmallGroup;
  showJoinButton?: boolean;
  showCancelButton?: boolean;
  onRequestChange?: (groupId: string, requested: boolean) => void;
};

const GroupCard: React.FC<GroupCardProps> = ({
  group,
  showJoinButton = false,
  showCancelButton = false,
  onRequestChange,
}) => {
  const currentUserId = getCurrentUserId();
  const [isRequested, setIsRequested] = useState(false);

  useEffect(() => {
    const user = getUserById(currentUserId);
    setIsRequested(!!user?.sentRequestGroup?.includes(group.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group.id]);

  const handleJoin = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const user = getUserById(currentUserId);
    if (!user) return;
    const sent = new Set(user.sentRequestGroup || []);
    if (!sent.has(group.id)) {
      const updated = [...(user.sentRequestGroup || []), group.id];
      updateUserById(currentUserId, { sentRequestGroup: updated });
      setIsRequested(true);
      if (onRequestChange) onRequestChange(group.id, true);
    }
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const user = getUserById(currentUserId);
    if (!user) return;
    const updated = (user.sentRequestGroup || []).filter(
      (id) => id !== group.id
    );
    updateUserById(currentUserId, { sentRequestGroup: updated });
    setIsRequested(false);
    if (onRequestChange) onRequestChange(group.id, false);
  };
  return (
    <NavLink
      to={`/groups/${group.id}`}
      className="cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative overflow-hidden">
        <img
          src={group.coverImage || "/images/default-group-cover.jpg"}
          alt={group.name}
          className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />

        {/* Privacy Badge (closed / private / public) */}
        <div className="absolute top-3 right-3">
          {group.privacy === "closed" ? (
            <div className="flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1.5 text-xs font-semibold text-white">
              <FaBan size={10} />
              Closed
            </div>
          ) : group.privacy === "private" ? (
            <div className="flex items-center gap-1.5 rounded-full bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white">
              <FaLock size={10} />
              Private
            </div>
          ) : (
            <div className="flex items-center gap-1.5 rounded-full bg-green-600 px-3 py-1.5 text-xs font-semibold text-white">
              <FaGlobe size={10} />
              Public
            </div>
          )}
        </div>
      </div>

      <div className="p-4">
        <h3 className="mb-2 text-lg font-bold text-gray-900">{group.name}</h3>

        <div className="mb-3 flex items-center gap-2 text-sm text-gray-600">
          <FaUsers size={14} />
          <span className="font-medium">
            {group.memberCount?.toLocaleString()} members
          </span>
        </div>

        {showJoinButton && !isRequested && (
          <button
            type="button"
            onClick={handleJoin}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Join Group
          </button>
        )}

        {isRequested && showCancelButton && (
          <button
            type="button"
            onClick={handleCancel}
            className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
          >
            Cancel Request
          </button>
        )}

        {isRequested && !showCancelButton && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="w-full rounded-lg bg-gray-300 px-4 py-2 text-sm font-semibold text-gray-700"
            disabled
          >
            Requested
          </button>
        )}
      </div>
    </NavLink>
  );
};

export default GroupCard;

import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaLock, FaGlobe } from "react-icons/fa";
import type { Group } from "../../data/groupsData";

interface GroupCardProps {
  group: Group;
  showJoinButton?: boolean;
}

const GroupCard: React.FC<GroupCardProps> = ({
  group,
  showJoinButton = false,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/groups/${group.groupId}`);
  };

  const handleJoinClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking join button
    // Handle join logic here
    console.log("Joining group:", group.name);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative overflow-hidden">
        <img
          src={group.coverImage || "/images/default-group-cover.jpg"}
          alt={group.name}
          className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />

        {/* Privacy/Category Badge */}
        <div className="absolute top-3 right-3">
          {group.privacy === "private" ? (
            <div className="flex items-center gap-1.5 rounded-full bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white">
              <FaLock size={10} />
              Private
            </div>
          ) : group.category ? (
            <div className="rounded-full bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white">
              {group.category}
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
            {group.memberCount.toLocaleString()} members
          </span>
        </div>

        {showJoinButton && (
          <button
            onClick={handleJoinClick}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Join Group
          </button>
        )}
      </div>
    </div>
  );
};

export default GroupCard;

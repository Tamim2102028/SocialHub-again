import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { selectFilteredGroups } from "../../store/slices/search/searchSlice";
import { getMemberCount } from "../../data/group-data/groupMembers";
import { FaUsers, FaLock, FaGlobe } from "react-icons/fa";

interface GroupsResultsProps {
  isVisible: boolean;
}

const GroupsResults: React.FC<GroupsResultsProps> = ({ isVisible }) => {
  const navigate = useNavigate();
  const filteredGroups = useAppSelector(selectFilteredGroups);

  if (!isVisible) return null;
  if (filteredGroups.length === 0) return null;

  const handleGroupClick = (groupId: string) => {
    navigate(`/groups/${groupId}`);
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold text-gray-900">
        Groups ({filteredGroups.length})
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredGroups.map((group) => (
          <div
            key={group.id}
            onClick={() => handleGroupClick(group.id)}
            className="cursor-pointer rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:scale-105 hover:shadow-md"
          >
            {/* Group Image */}
            <div className="mb-3 flex items-center space-x-3">
              <img
                src={group.profileImage || "https://via.placeholder.com/60"}
                alt={group.name}
                className="h-16 w-16 rounded-lg object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/60";
                }}
              />
              <div className="flex-1">
                <h3 className="line-clamp-1 font-semibold text-gray-900">
                  {group.name}
                </h3>
                <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                  {group.privacy === "private" ? (
                    <div className="flex items-center gap-1">
                      <FaLock className="h-3 w-3" />
                      <span>Private</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <FaGlobe className="h-3 w-3" />
                      <span>Public</span>
                    </div>
                  )}
                  {group.groupFor && (
                    <>
                      <span className="text-gray-400">•</span>
                      <span className="capitalize">{group.groupFor}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Group Description */}
            {group.description && (
              <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                {group.description}
              </p>
            )}

            {/* Group Stats */}
            <div className="flex items-center justify-between border-t border-gray-100 pt-3">
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <FaUsers className="h-4 w-4" />
                <span>{getMemberCount(group.id)} members</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleGroupClick(group.id);
                }}
                className="rounded-lg bg-green-500 px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-green-600"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupsResults;

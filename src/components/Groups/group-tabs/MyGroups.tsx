import GroupCard from "../utils/GroupCard";
import {
  getCurrentUserId,
  getUserById,
} from "../../../data/profile-data/userData";
import { getGroupById } from "../../../data/group-data/groupsData";

const MyGroups = () => {
  const userId = getCurrentUserId();
  const user = getUserById(userId);
  const joined = user?.joinedGroup || [];

  const groups = joined
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
        My Groups ({groups.length})
      </h2>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <GroupCard key={group.id} group={group} showJoinButton={false} />
        ))}
      </div>
    </div>
  );
};

export default MyGroups;

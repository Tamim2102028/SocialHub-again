import GroupCard from "./GroupCard";
import { getGroupById } from "../../data/groupsData";

// Pick some groups by id to suggest (display-only)
const suggestedIds = ["g19", "g5", "g13"];

const SuggestedGroups = () => {
  const groups = suggestedIds
    .map((id) => getGroupById(id))
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
        Suggested Groups ({groups.length})
      </h2>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <GroupCard key={group.id} group={group} showJoinButton={true} />
        ))}
      </div>
    </div>
  );
};

export default SuggestedGroups;

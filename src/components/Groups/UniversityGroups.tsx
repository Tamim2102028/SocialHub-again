import GroupCard from "./GroupCard";
import { getActiveGroups } from "../../data/groupsData";
import { getCurrentUserId, getUserById } from "../../data/userData";

const UniversityGroups = () => {
  const userId = getCurrentUserId();
  const user = getUserById(userId);

  // Get active groups and filter by category/institution.
  const all = getActiveGroups();

  const filtered = all.filter((g) => {
    // If user is university-level, show only groups that are university categories
    // and optionally match the user's university name when available.
    if (user?.category === "university") {
      if (!g.categories?.includes("university")) return false;
      if (user.university?.name && g.university?.name) {
        const uName = String(user.university.name).trim().toLowerCase();
        const gName = String(g.university.name).trim().toLowerCase();
        return uName === gName;
      }
      return true;
    }

    // If user is hsc-level, show hsc groups and try to match college name if available.
    if (user?.category === "hsc") {
      if (!g.categories?.includes("hsc")) return false;
      if (user.college?.name && g.college?.name) {
        const uName = String(user.college.name).trim().toLowerCase();
        const gName = String(g.college.name).trim().toLowerCase();
        return uName === gName;
      }
      return true;
    }

    // Fallback: show groups that belong to 'university' category
    return g.categories?.includes("university");
  });

  const groups = filtered.map((g) => ({
    id: g.id,
    name: g.name,
    description: g.description,
    coverImage: g.coverImage,
    memberCount: g.members?.length || 0,
    privacy: g.privacy,
  }));

  return (
    <div>
      <h2 className="mb-3 text-xl font-semibold text-gray-900">
        University Groups ({groups.length})
      </h2>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <GroupCard key={group.id} group={group} showJoinButton={true} />
        ))}
      </div>
    </div>
  );
};

export default UniversityGroups;

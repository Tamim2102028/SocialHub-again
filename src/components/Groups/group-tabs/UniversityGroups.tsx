import GroupCard from "../utils/GroupCard";
import type { Group } from "../../../data/group-data/groupsData";
import { useAppSelector } from "../../../store/hooks";

const UniversityGroups = () => {
  const user = useAppSelector((s) => s.profile);

  // Use the user's joined groups and filter them by category/institution.
  const joinedIds = user?.joinedGroup || [];
  const allGroups = useAppSelector((s) => s.groups.groups || []);
  const joinedGroups = joinedIds
    .map((gid) => allGroups.find((g) => g.id === gid))
    .filter((g): g is Group => Boolean(g));

  // closed pre-created groups that should be visible only in University tab
  const closedPrecreated = allGroups.filter((grp) => grp.privacy === "closed");

  const filtered = joinedGroups
    // keep joined groups that match institution/category rules
    .filter((g) => {
      if (user?.category === "university") {
        if (!g.categories?.includes("university")) return false;
        if (user.university?.name && g.university?.name) {
          const uName = String(user.university.name).trim().toLowerCase();
          const gName = String(g.university.name).trim().toLowerCase();
          return uName === gName;
        }
        return true;
      }

      if (user?.category === "hsc") {
        if (!g.categories?.includes("hsc")) return false;
        if (user.college?.name && g.college?.name) {
          const uName = String(user.college.name).trim().toLowerCase();
          const gName = String(g.college.name).trim().toLowerCase();
          return uName === gName;
        }
        return true;
      }

      return false;
    });

  const groups = filtered.map((g) => ({
    id: g.id,
    name: g.name,
    description: g.description,
    coverImage: g.coverImage,
    memberCount: g.members?.length || 0,
    privacy: g.privacy,
  }));

  // Add closed pre-created groups that match user's institution and are not already included
  const institutionClosed = closedPrecreated.filter((g) => {
    if (user?.category === "university") {
      if (!g.categories?.includes("university")) return false;
      if (user.university?.name && g.university?.name) {
        return (
          String(user.university.name).trim().toLowerCase() ===
          String(g.university.name).trim().toLowerCase()
        );
      }
      return false;
    }
    if (user?.category === "hsc") {
      if (!g.categories?.includes("hsc")) return false;
      if (user.college?.name && g.college?.name) {
        return (
          String(user.college.name).trim().toLowerCase() ===
          String(g.college.name).trim().toLowerCase()
        );
      }
      return false;
    }
    return false;
  });

  institutionClosed.forEach((g) => {
    // avoid duplicates
    if (!groups.find((x) => x.id === g.id)) {
      groups.push({
        id: g.id,
        name: g.name,
        description: g.description,
        coverImage: g.coverImage,
        memberCount: g.members?.length || 0,
        privacy: g.privacy,
      });
    }
  });

  return (
    <div>
      <h2 className="mb-3 text-xl font-semibold text-gray-900">
        University Groups ({groups.length})
      </h2>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <GroupCard key={group.id} group={group} showJoinButton={false} />
        ))}
      </div>
    </div>
  );
};

export default UniversityGroups;

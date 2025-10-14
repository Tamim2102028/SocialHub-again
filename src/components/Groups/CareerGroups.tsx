import GroupCard from "./GroupCard";
import { FaBriefcase } from "react-icons/fa";
import { getGroupById } from "../../data/groupsData";

const pick = ["g21", "g22", "g23"];

const CareerGroups = () => {
  const groups = pick
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
    <div className="mt-8">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
          <FaBriefcase className="text-xl text-white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Career & Job Groups
          </h2>
          <p className="text-sm text-gray-600">
            Find opportunities, share jobs, and grow your career
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <GroupCard key={group.id} group={group} showJoinButton={true} />
        ))}
      </div>
    </div>
  );
};

export default CareerGroups;

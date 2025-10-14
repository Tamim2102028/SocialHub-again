import GroupCard from "./GroupCard";

// Hardcoded static data for demonstration
const staticMyGroups = [
  {
    id: "m1",
    name: "BUET CSE 1st Year",
    description: "A group for BUET CSE 1st year students.",
    coverImage: "buet-cse-1.jpg",
    memberCount: 150,
    privacy: "public",
  },
  {
    id: "m2",
    name: "RUET ME 3rd Year",
    description: "Mechanical Engineering 3rd year at RUET.",
    coverImage: "ruet-me-3.jpg",
    memberCount: 90,
    privacy: "public",
  },
];

const MyGroups = () => (
  <div className="mb-8">
    <h2 className="mb-4 text-xl font-semibold text-gray-900">
      My Groups ({staticMyGroups.length})
    </h2>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {staticMyGroups.map((group) => (
        <GroupCard key={group.id} group={group} showJoinButton={false} />
      ))}
    </div>
  </div>
);

export default MyGroups;

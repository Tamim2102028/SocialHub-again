import GroupCard from "./GroupCard";


// Hardcoded static data for demonstration
const staticUniversityGroups = [
  {
    id: "u1",
    name: "BUET Architecture",
    description: "BUET Architecture students group.",
    coverImage: "buet-arch.jpg",
    memberCount: 60,
    privacy: "public",
  },
  {
    id: "u2",
    name: "CUET CE 4th Year",
    description: "Civil Engineering 4th year at CUET.",
    coverImage: "cuet-ce-4.jpg",
    memberCount: 45,
    privacy: "private",
  },
];

const UniversityGroups = () => (
  <div className="mt-8">
    <h2 className="mb-4 text-xl font-semibold text-gray-900">
      University Groups
    </h2>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {staticUniversityGroups.map((group) => (
        <GroupCard key={group.id} group={group} showJoinButton={true} />
      ))}
    </div>
  </div>
);

export default UniversityGroups;

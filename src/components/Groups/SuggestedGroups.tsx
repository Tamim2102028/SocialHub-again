import GroupCard from "./GroupCard";

// Hardcoded static data for demonstration
const staticSuggestedGroups = [
  {
    id: "s1",
    name: "General Discussion",
    description: "A group for general discussions.",
    coverImage: "general.jpg",
    memberCount: 500,
    privacy: "public",
  },
  {
    id: "s2",
    name: "HSC Science 2024",
    description: "HSC Science batch for 2024.",
    coverImage: "hsc-science.jpg",
    memberCount: 300,
    privacy: "public",
  },
];

const SuggestedGroups = () => (
  <div>
    <h2 className="mb-4 text-xl font-semibold text-gray-900">
      Suggested Groups
    </h2>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {staticSuggestedGroups.map((group) => (
        <GroupCard key={group.id} group={group} showJoinButton={true} />
      ))}
    </div>
  </div>
);

export default SuggestedGroups;

import GroupCard from "./GroupCard";
import { FaBriefcase } from "react-icons/fa";

// Hardcoded static data for demonstration
const staticCareerGroups = [
  {
    id: "c1",
    name: "Software Engineering Jobs",
    description: "A group for sharing software engineering job opportunities.",
    coverImage: "software-jobs.jpg",
    memberCount: 1200,
    privacy: "public",
  },
  {
    id: "c2",
    name: "Government Jobs Bangladesh",
    description: "Updates and discussions about government jobs in Bangladesh.",
    coverImage: "govt-jobs.jpg",
    memberCount: 950,
    privacy: "public",
  },
  {
    id: "c3",
    name: "Freelancing & Remote Jobs",
    description: "Find and share freelancing and remote job opportunities.",
    coverImage: "freelance-jobs.jpg",
    memberCount: 800,
    privacy: "public",
  },
];

const CareerGroups = () => (
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
      {staticCareerGroups.map((group) => (
        <GroupCard key={group.id} group={group} showJoinButton={true} />
      ))}
    </div>
  </div>
);

export default CareerGroups;

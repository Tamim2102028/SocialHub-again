import React from "react";
import GroupCard from "./GroupCard";
import { FaBriefcase } from "react-icons/fa";

interface Group {
  id: number;
  name: string;
  members: number;
  isPrivate: boolean;
  coverImage: string;
  category?: string;
}

interface CareerGroupsProps {
  groups: Group[];
}

const CareerGroups: React.FC<CareerGroupsProps> = ({ groups }) => {
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

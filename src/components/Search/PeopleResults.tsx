import type { SearchPerson } from "./data/searchData";
import React from "react";
import { mockSearchResults } from "./data/searchData";
import FriendCard from "../Friends/FriendCard";
import type { Friend } from "../Friends/data/friendsData";

interface PeopleResultsProps {
  searchQuery: string;
  isVisible: boolean;
}

const PeopleResults: React.FC<PeopleResultsProps> = ({
  searchQuery,
  isVisible,
}) => {
  if (!isVisible) return null;

  // Map search people to FriendCard's Friend type
  const universities = [
    "New York University",
    "Stanford University",
    "University of Texas",
    "University of Washington",
    "Harvard University",
    "MIT",
    "Oxford University",
    "Cambridge University",
  ];
  const roles: Friend["role"][] = ["student", "teacher"];

  // Stable mutual friends based on index (won't change on re-render)
  const getMutualFriends = (idx: number) => ((idx * 3) % 15) + 1;

  const mapPersonToFriend = (person: SearchPerson, idx: number): Friend => ({
    id: String(idx),
    name: person.name,
    username: person.username.replace(/^@/, ""),
    avatar:
      typeof person.avatar === "string" && person.avatar.startsWith("http")
        ? person.avatar
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=3b82f6&color=fff&size=60`,
    mutualFriends: getMutualFriends(idx),
    university: universities[idx % universities.length],
    role: roles[idx % roles.length],
  });

  // Filter people based on search query
  const filteredPeople = mockSearchResults.people.filter((person) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      person.name.toLowerCase().includes(query) ||
      person.username.toLowerCase().includes(query)
    );
  });

  // Mock logic to assign relation type
  const getRelationType = (
    idx: number
  ): "friend" | "request" | "suggestion" | "search" => {
    if (idx % 4 === 0) return "friend";
    if (idx % 4 === 1) return "request";
    if (idx % 4 === 2) return "suggestion";
    return "search";
  };

  if (filteredPeople.length === 0) return null;

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold text-gray-900">
        People ({filteredPeople.length})
      </h2>
      <div className="space-y-4">
        {filteredPeople.map((person, idx) => (
          <FriendCard
            key={person.username}
            friend={mapPersonToFriend(person, idx)}
            type={getRelationType(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default PeopleResults;

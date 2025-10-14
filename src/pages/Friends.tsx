import React, { useState, useMemo } from "react";
import FriendsHeader from "../components/Friends/FriendsHeader";
import FriendsTabs from "../components/Friends/FriendsTabs";
import FriendsList from "../components/Friends/FriendsList";
import FriendRequests from "../components/Friends/FriendRequests";
import FriendSuggestions from "../components/Friends/FriendSuggestions";
import SentRequests from "../components/Friends/SentRequests";
import FriendCard from "../components/Friends/FriendCard";
import { usersData, getCurrentUserId } from "../data/userData";

const Friends: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "all" | "requests" | "suggestions" | "sent"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");

  const currentUserId = getCurrentUserId();

  // Tab-specific search results filtering
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const currentUser = usersData.find((user) => user.id === currentUserId);

    if (!currentUser) return [];

    const searchTerm = searchQuery.toLowerCase();

    // Filter users based on search term first
    const filteredUsers = usersData.filter((user) => {
      if (user.id === currentUserId) return false;

      return (
        user.name.toLowerCase().includes(searchTerm) ||
        user.username.toLowerCase().includes(searchTerm) ||
        (user.university?.name || user.college?.name || "")
          .toLowerCase()
          .includes(searchTerm)
      );
    });

    // Then filter based on active tab
    switch (activeTab) {
      case "all":
        return filteredUsers.filter((user) =>
          currentUser.friends.includes(user.id)
        );

      case "requests":
        return filteredUsers.filter((user) =>
          currentUser.pendingRequests?.includes(user.id)
        );

      case "suggestions":
        return filteredUsers.filter(
          (user) =>
            !currentUser.friends.includes(user.id) &&
            !currentUser.pendingRequests?.includes(user.id)
        );

      case "sent":
        return filteredUsers.filter((user) =>
          currentUser.sentRequests?.includes(user.id)
        );

      default:
        return filteredUsers;
    }
  }, [searchQuery, activeTab, currentUserId]);

  const renderSearchResults = () => {
    if (searchResults.length === 0) {
      return (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">
            No results found
          </h3>
          <p className="mt-2 text-gray-600">
            No users found for "{searchQuery}"
          </p>
        </div>
      );
    } else {
      return (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Search Results ({searchResults.length})
          </h2>
          <div className="grid gap-3">
            {searchResults.map((user) => (
              <FriendCard
                key={user.id}
                id={user.id}
                name={user.name}
                avatar={user.avatar}
                university={
                  user.university?.name || user.college?.name || "No University"
                }
                type={
                  activeTab === "all"
                    ? "friend"
                    : activeTab === "requests"
                      ? "request"
                      : activeTab === "sent"
                        ? "search"
                        : "suggestion"
                }
              />
            ))}
          </div>
        </div>
      );
    }
  };

  const renderContent = () => {
    // Normal tab content with search overlay
    switch (activeTab) {
      case "all":
        return searchQuery.trim() ? renderSearchResults() : <FriendsList />;
      case "requests":
        return searchQuery.trim() ? renderSearchResults() : <FriendRequests />;
      case "suggestions":
        return searchQuery.trim() ? (
          renderSearchResults()
        ) : (
          <FriendSuggestions />
        );
      case "sent":
        return searchQuery.trim() ? renderSearchResults() : <SentRequests />;
      default:
        return searchQuery.trim() ? renderSearchResults() : <FriendsList />;
    }
  };

  return (
    <>
      <FriendsHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <FriendsTabs activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </>
  );
};

export default Friends;

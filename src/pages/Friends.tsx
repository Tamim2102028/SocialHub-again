import React from "react";
import { useAppSelector } from "../store/hooks";
import FriendsHeader from "../components/Friends/FriendsHeader";
import FriendsTabs from "../components/Friends/FriendsTabs";
import FriendsList from "../components/Friends/FriendsList";
import FriendRequests from "../components/Friends/FriendRequests";
import FriendSuggestions from "../components/Friends/FriendSuggestions";

const Friends: React.FC = () => {
  const activeTab = useAppSelector((state) => state.ui.friends.activeTab);

  const renderContent = () => {
    switch (activeTab) {
      case "friends":
        return <FriendsList />;
      case "requests":
        return <FriendRequests />;
      case "suggestions":
        return <FriendSuggestions />;
      default:
        return <FriendsList />;
    }
  };

  return (
    <>
      <FriendsHeader />
      <FriendsTabs />
      {renderContent()}
    </>
  );
};

export default Friends;

import React from "react";
import FriendCard from "./FriendCard";
import { getUserById } from "../../services/userService";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectUserById, unfriend } from "../../store/slices/profileSlice";

const FriendsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((s) => selectUserById(s, s.profile.id));

  if (!currentUser) {
    return <div>User not found</div>;
  }

  const handleUnfriend = (friendId: string) => {
    dispatch(unfriend(friendId));
  };

  // Get friends data from current user's friends list
  const friends = currentUser.friends
    .map((friendId) => {
      const friend = getUserById(friendId);
      if (!friend) return null;

      // Get university/college name based on category
      const institutionName =
        friend.category === "university"
          ? friend.university?.name
          : friend.college?.name;

      return {
        id: friend.id,
        name: friend.name,
        avatar: friend.avatar,
        university: institutionName || "Unknown Institution",
      };
    })
    .filter((friend) => friend !== null);

  return (
    <div className="space-y-3">
      {friends.map((friend) => (
        <FriendCard
          key={friend.id}
          id={friend.id}
          name={friend.name}
          avatar={friend.avatar}
          university={friend.university}
          type="friend"
          onUnfriend={handleUnfriend}
        />
      ))}
    </div>
  );
};

export default FriendsList;

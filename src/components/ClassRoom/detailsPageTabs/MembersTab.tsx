import React from "react";
import FriendCard from "../../Friends/FriendCard";
import EmptyState from "../EmptyState";
import { type UserData } from "../../../data/profile-data/userData";

interface Props {
  members: string[] | undefined;
  users: UserData[];
  currentUserId?: string;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
  onAddFriend: (id: string) => void;
  onCancelRequest: (id: string) => void;
  onUnfriend: (id: string) => void;
  currentUser?: UserData | null;
}

const MembersTab: React.FC<Props> = ({
  members,
  users,
  onAccept,
  onDecline,
  onAddFriend,
  onCancelRequest,
  onUnfriend,
  currentUser,
}) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900">
        Members ({members?.length || 0})
      </h2>
      <div className="mt-3 space-y-2.5">
        {members && members.length > 0 ? (
          members.map((m) => {
            const user = users.find((u) => u.id === m);
            if (!user) return null;

            const isFriend = currentUser?.friends?.includes(user.id);
            const hasPending = currentUser?.pendingRequests?.includes(user.id);
            const hasSent = currentUser?.sentRequests?.includes(user.id);

            let type: Parameters<typeof FriendCard>[0]["type"] = "search";
            const isCurrent = currentUser && m === currentUser.id;
            if (isCurrent) type = "search";
            else if (isFriend) type = "friend";
            else if (hasPending) type = "request";
            else if (hasSent) type = "sent";
            else type = "suggestion";

            const institutionName =
              user.educationLevel === "UNIVERSITY"
                ? user.university?.name
                : user.college?.name;

            return (
              <FriendCard
                key={user.id}
                id={user.id}
                name={user.name}
                avatar={user.avatar}
                university={institutionName || "Unknown Institution"}
                type={type}
                onAccept={onAccept}
                onDecline={onDecline}
                onAddFriend={onAddFriend}
                onCancelRequest={onCancelRequest}
                onUnfriend={onUnfriend}
              />
            );
          })
        ) : (
          <EmptyState
            title="No members yet"
            message="This room doesn't have members yet. Invite classmates to join the room so you can collaborate and share resources together."
            actionLabel="Invite members"
            onAction={() => {
              /* placeholder: can wire to invite flow */
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MembersTab;

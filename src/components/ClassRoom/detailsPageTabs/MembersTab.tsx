import React from "react";
import FriendCard from "../../Friends/FriendCard";
import { type UserData } from "../../../data/profile-data/userData";
import { BsThreeDots } from "react-icons/bs";
import Swal from "sweetalert2";

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
  onRemoveMember?: (id: string) => void;
  onMakeAdmin?: (id: string) => void;
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
  onRemoveMember,
  onMakeAdmin,
}) => {
  const handleMemberMenu = async (userId: string, userName?: string) => {
    await Swal.fire({
      title: `${userName ?? "Member"} options`,
      html: `
        <div class="flex flex-col items-center gap-2 min-w-[180px]">
          <button id="swal-remove" class="w-50 px-3 py-2 rounded border border-red-100 bg-white text-red-600 hover:bg-red-50">Remove from room</button>
          <button id="swal-admin" class="w-50 px-3 py-2 rounded border border-gray-200 bg-white text-gray-700 hover:bg-gray-50">Make admin</button>
        </div>
      `,
      showConfirmButton: false,
      showCloseButton: true,
      didOpen: () => {
        const popup = Swal.getPopup();
        if (!popup) return;
        const removeBtn = popup.querySelector(
          "#swal-remove"
        ) as HTMLButtonElement | null;
        const adminBtn = popup.querySelector(
          "#swal-admin"
        ) as HTMLButtonElement | null;

        const onRemove = () => {
          if (onRemoveMember) onRemoveMember(userId);
          Swal.close();
        };

        const onMakeAdmin = () => {
          if (onMakeAdmin) onMakeAdmin(userId);
          Swal.close();
        };

        removeBtn?.addEventListener("click", onRemove);
        adminBtn?.addEventListener("click", onMakeAdmin);

        const removeListeners = () => {
          removeBtn?.removeEventListener("click", onRemove);
          adminBtn?.removeEventListener("click", onMakeAdmin);
        };

        const observer = new MutationObserver(() => {
          if (!document.contains(popup)) {
            removeListeners();
            observer.disconnect();
          }
        });
        observer.observe(document, { childList: true, subtree: true });
      },
    });
  };
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900">
        Members ({members?.length || 0})
      </h2>
      <div className="mt-3 space-y-2.5">
        {members && members.length > 0
          ? members.map((m) => {
              const user = users.find((u) => u.id === m);
              if (!user) return null;

              const isFriend = currentUser?.friends?.includes(user.id);
              const hasPending = currentUser?.pendingRequests?.includes(
                user.id
              );
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
                  menuElement={
                    <button
                      onClick={() => handleMemberMenu(user.id, user.name)}
                      className="p-1 text-gray-500 hover:text-gray-800"
                      aria-label="Member menu"
                    >
                      <BsThreeDots className="h-5 w-5" />
                    </button>
                  }
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default MembersTab;

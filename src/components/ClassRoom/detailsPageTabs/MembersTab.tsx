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
  // admin and member management callbacks (optional)
  onRemoveMember?: (id: string) => void;
  onMakeAdmin?: (id: string) => void;
  onRemoveAdmin?: (id: string) => void;
  // room metadata
  creatorId?: string | undefined;
  admins?: string[] | undefined;
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
  onRemoveAdmin,
  creatorId,
  admins,
}) => {
  const handleMemberMenu = async (
    userId: string,
    userName?: string,
    isAdmin?: boolean
  ) => {
    const adminLabel = isAdmin ? "Remove admin" : "Make admin";
    const isCreator =
      !!currentUser && !!creatorId && currentUser.id === creatorId;

    // Only creator can manage admin status
    const showAdminBtn = isCreator;

    // Determine who can remove this member:
    // - Creator can remove anyone (except themselves, but that's already filtered)
    // - Regular admin can only remove non-admin members
    const isCurrentUserAdmin =
      !!currentUser && !!admins && admins.includes(currentUser.id);
    const canRemove = isCreator || (isCurrentUserAdmin && !isAdmin);

    const adminHtml = showAdminBtn
      ? `<button id="swal-admin" class="w-50 px-3 py-2 rounded border border-gray-200 bg-white text-gray-700 hover:bg-gray-50">${adminLabel}</button>`
      : "";

    const removeHtml = canRemove
      ? `<button id="swal-remove" class="w-50 px-3 py-2 rounded border border-red-100 bg-white text-red-600 hover:bg-red-50">Remove from room</button>`
      : "";

    await Swal.fire({
      title: `${userName ?? "Member"} options`,
      html: `
        <div class="flex flex-col items-center gap-2 min-w-[200px]">
          ${removeHtml}
          ${adminHtml}
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

        const onRemoveClick = () => {
          // If removing an admin, first remove their admin status
          if (isAdmin && onRemoveAdmin) {
            onRemoveAdmin(userId);
          }
          // Then remove them from the room
          if (onRemoveMember) onRemoveMember(userId);
          Swal.close();
        };

        const onMakeAdminClick = () => {
          // only creator can make/remove admins
          if (!currentUser || currentUser.id !== creatorId) {
            Swal.fire({
              title: "Not allowed",
              text: "Only the room creator can change admin status.",
              icon: "error",
            });
            return;
          }
          if (isAdmin) {
            if (onRemoveAdmin) onRemoveAdmin(userId);
          } else {
            if (onMakeAdmin) onMakeAdmin(userId);
          }
          Swal.close();
        };

        if (removeBtn) removeBtn.addEventListener("click", onRemoveClick);
        if (adminBtn) adminBtn.addEventListener("click", onMakeAdminClick);

        const removeListeners = () => {
          if (removeBtn) removeBtn.removeEventListener("click", onRemoveClick);
          if (adminBtn) adminBtn.removeEventListener("click", onMakeAdminClick);
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

              const isAdmin = !!admins && admins.includes(user.id);
              const isOwner = !!creatorId && user.id === creatorId;

              const isCurrentUserCreator =
                !!currentUser && !!creatorId && currentUser.id === creatorId;
              const isCurrentUserAdmin =
                !!currentUser && !!admins && admins.includes(currentUser.id);

              // Show menu if:
              // - Current user is creator/admin AND
              // - Target user is not the creator (creator can't be removed) AND
              // - Target user is not the current user themselves (can't manage yourself)
              const canShowMenu =
                (isCurrentUserCreator || isCurrentUserAdmin) &&
                user.id !== creatorId &&
                user.id !== currentUser?.id;

              let roleLabel = "";
              if (isOwner && isAdmin) {
                roleLabel = " • Owner • Admin";
              } else if (isOwner) {
                roleLabel = " • Owner";
              } else if (isAdmin) {
                roleLabel = " • Admin";
              }

              return (
                <FriendCard
                  key={user.id}
                  id={user.id}
                  name={user.name}
                  avatar={user.avatar}
                  university={
                    (institutionName || "Unknown Institution") + roleLabel
                  }
                  type={type}
                  onAccept={onAccept}
                  onDecline={onDecline}
                  onAddFriend={onAddFriend}
                  onCancelRequest={onCancelRequest}
                  onUnfriend={onUnfriend}
                  menuElement={
                    canShowMenu ? (
                      <button
                        onClick={() =>
                          handleMemberMenu(user.id, user.name, isAdmin)
                        }
                        className="p-1 text-gray-500 hover:text-gray-800"
                        aria-label="Member menu"
                      >
                        <BsThreeDots className="h-5 w-5" />
                      </button>
                    ) : undefined
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

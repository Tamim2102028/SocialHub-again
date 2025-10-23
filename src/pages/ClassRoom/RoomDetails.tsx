import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaUsers, FaImage, FaInfoCircle, FaThumbtack } from "react-icons/fa";
import { BsPostcard } from "react-icons/bs";
import sampleRooms, { type Room } from "../../data/roomsData";
import { usersData } from "../../data/profile-data/userData";
import FriendCard from "../../components/Friends/FriendCard";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectUserById,
  sendFriendRequest,
  cancelFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  unfriend,
} from "../../store/slices/profileSlice";
import confirm from "../../utils/confirm";

const RoomDetails: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();

  // find room from sample data
  const room: Room | undefined = sampleRooms.find((r) => r.id === roomId);

  const [activeTab, setActiveTab] = useState<
    "posts" | "pinned" | "members" | "media" | "about"
  >("members");

  const tabs: Array<{
    id: "posts" | "pinned" | "members" | "media" | "about";
    label: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }> = [
    { id: "posts", label: "Posts", icon: BsPostcard },
    { id: "pinned", label: "Pinned", icon: FaThumbtack },
    { id: "members", label: "Members", icon: FaUsers },
    { id: "media", label: "Media", icon: FaImage },
    { id: "about", label: "About", icon: FaInfoCircle },
  ];

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((s) => selectUserById(s, s.profile.id));

  if (!room) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900">Room Not Found</h2>
        <p className="mt-2 text-gray-600">
          The room you're looking for doesn't exist or has been removed.
        </p>
        <div className="mt-4">
          <Link to="/classroom" className="text-blue-600 hover:underline">
            Back to Rooms
          </Link>
        </div>
      </div>
    );
  }

  const creator = room.createdBy
    ? usersData.find((u) => u.id === room.createdBy)
    : undefined;

  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-gray-300 bg-white p-3 shadow-sm">
        <div className="flex items-start gap-4">
          <img
            src={
              room.coverImage || `https://picsum.photos/seed/${room.id}/600/300`
            }
            alt={room.name}
            className="h-36 w-64 rounded object-cover"
          />

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{room.name}</h1>
            {creator && (
              <p className="mt-1 text-sm text-gray-600">
                <Link
                  to={`/profile/${creator.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {creator.name}
                </Link>
              </p>
            )}

            <p className="mt-2 text-sm text-gray-700">
              Status: <span className="font-medium">{room.status}</span>
            </p>

            {room.createdAt && (
              <p className="mt-1 text-xs text-gray-500">
                Created: {new Date(room.createdAt).toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Tabs (Posts, Pinned, Members, Media, About) */}
      <div className="mx-auto max-w-5xl rounded-lg bg-white shadow">
        {/* Tabs */}
        <div className="border-b border-gray-200 bg-white">
          <div className="flex justify-between px-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 border-b-2 px-6 py-4 font-semibold transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                <tab.icon className="h-5 w-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-3">
          {activeTab === "posts" && (
            <div className="text-sm text-gray-600">No posts for this room.</div>
          )}

          {activeTab === "pinned" && (
            <div className="text-sm text-gray-600">No pinned items.</div>
          )}

          {activeTab === "members" && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Members ({room.members ? room.members.length : 0})
              </h2>
              <div className="mt-3 space-y-2.5">
                {room.members && room.members.length > 0 ? (
                  room.members.map((m) => {
                    const user = usersData.find((u) => u.id === m);

                    if (!user) return null;

                    // Determine relation type relative to current user
                    const isFriend = currentUser?.friends?.includes(user.id);
                    const hasPending = currentUser?.pendingRequests?.includes(
                      user.id
                    );
                    const hasSent = currentUser?.sentRequests?.includes(
                      user.id
                    );

                    let type: Parameters<typeof FriendCard>[0]["type"] =
                      "search";
                    const isCurrent = currentUser && m === currentUser.id;
                    if (isCurrent) {
                      // show current user but without friend actions
                      type = "search";
                    } else if (isFriend) type = "friend";
                    else if (hasPending)
                      type = "request"; // they requested current user
                    else if (hasSent)
                      type = "sent"; // current user sent request to them
                    else type = "suggestion"; // not friends, not pending

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
                        onAccept={(id) => dispatch(acceptFriendRequest(id))}
                        onDecline={(id) => dispatch(declineFriendRequest(id))}
                        onAddFriend={(id) => dispatch(sendFriendRequest(id))}
                        onCancelRequest={(id) =>
                          dispatch(cancelFriendRequest(id))
                        }
                        onUnfriend={async (id) => {
                          const ok = await confirm({
                            title: "Are you sure?",
                            text: "You will remove this friend.",
                            confirmButtonText: "Yes, unfriend",
                            icon: "warning",
                          });
                          if (ok) dispatch(unfriend(id));
                        }}
                      />
                    );
                  })
                ) : (
                  <div className="text-sm text-gray-600">No members yet.</div>
                )}
              </div>
            </div>
          )}

          {activeTab === "media" && (
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="aspect-square rounded-xl bg-gradient-to-br from-purple-400 to-pink-400"
                />
              ))}
            </div>
          )}

          {activeTab === "about" && (
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-bold text-gray-900">Details</h3>
                <p className="text-gray-700">
                  Status: <span className="font-medium">{room.status}</span>
                </p>
                {creator && (
                  <p className="text-gray-700">
                    Created by:{" "}
                    <Link
                      to={`/profile/${creator.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {creator.name}
                    </Link>
                  </p>
                )}
                {room.createdAt && (
                  <p className="text-gray-700">
                    Created: {new Date(room.createdAt).toLocaleString()}
                  </p>
                )}
                {room.lastActivityAt && (
                  <p className="text-gray-700">
                    Last activity:{" "}
                    {new Date(room.lastActivityAt).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;

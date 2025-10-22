import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaUsers,
  FaBell,
  FaShareAlt,
  FaEllipsisH,
  FaImage,
  FaInfoCircle,
  FaThumbtack,
  FaSearch,
} from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  requestJoinGroup,
  cancelJoinRequest,
  selectGroupById,
  selectIsMember,
  selectHasRequested,
} from "../../store/slices/groupSlice";
import { leaveGroup } from "../../store/slices/groupSlice";
import { selectUserById } from "../../store/slices/profileSlice";
import GroupPostList from "./GroupPostList";
import { BsPostcard } from "react-icons/bs";
import { findGroupById } from "../../data/group-data/groupResolver";
import Swal from "sweetalert2";

const GroupDetail: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // resolve using central helper (handles pg* vs g* resolution)
  const liveGroup = useAppSelector((s) =>
    groupId ? selectGroupById(s, groupId) : undefined
  );

  // Resolve group using the centralized resolver. See `groupResolver.ts` for
  // notes about simplifying this when backend IDs become uniform.
  const resolved = groupId ? findGroupById(groupId) : undefined;
  const group = liveGroup || resolved;

  const isRequested = useAppSelector((s) =>
    groupId ? selectHasRequested(s, groupId) : false
  );

  const isMember = useAppSelector((s) =>
    groupId ? selectIsMember(s, groupId) : false
  );

  // load member user objects (avoid calling hooks inside loops)
  const memberUsers = useAppSelector((s) =>
    (group?.members || []).map((id) => selectUserById(s, id))
  );

  const [activeTab, setActiveTab] = useState<
    "posts" | "pinned" | "members" | "media" | "about"
  >("posts");

  const handleJoin = () => {
    if (!groupId) return;
    dispatch(requestJoinGroup(groupId));
  };

  const handleCancel = () => {
    if (!groupId) return;
    dispatch(cancelJoinRequest(groupId));
  };

  // cancel handler removed (not used in this layout)

  // If the group wasn't found, show a small placeholder and back button.
  if (!group) {
    return (
      <div className="space-y-4 rounded-lg bg-white p-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            aria-label="Back"
            title="Back"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg text-gray-700 shadow-md transition-colors hover:bg-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <FaArrowLeft />
          </button>
          <h2 className="text-lg font-medium text-gray-900">Group not found</h2>
        </div>
        <p className="text-sm text-gray-600">
          The group you requested does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5 overflow-hidden">
      {/* Cover */}
      <div className="relative">
        {group.coverImage ? (
          <img
            src={group.coverImage}
            alt={group.name}
            className="h-64 w-full object-cover"
          />
        ) : (
          <div className="h-64 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
        )}

        <div className="mx-auto max-w-5xl px-4">
          <div className="relative -mt-20">
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <div className="flex flex-col items-start gap-6 md:flex-row">
                {/* Avatar */}
                <div>
                  {group.profileImage ? (
                    <img
                      src={group.profileImage}
                      alt={group.name}
                      className="h-32 w-32 rounded-2xl object-cover shadow-xl"
                    />
                  ) : (
                    <div className="flex h-32 w-32 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-4xl font-bold text-white shadow-xl">
                      {group.name
                        ? group.name
                            .split(" ")
                            .slice(0, 2)
                            .map((n) => n[0])
                            .join("")
                        : "G"}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900">
                        {group.name}
                      </h1>
                      <p className="mt-1 text-gray-600">
                        Public Group · {group.members?.length || 0} members
                      </p>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <FaEllipsisH className="h-6 w-6" />
                    </button>
                  </div>

                  <p className="mt-4 text-gray-700">{group.description}</p>

                  {/* Action Buttons */}
                  <div className="mt-6 flex flex-wrap gap-3">
                    {!isMember &&
                      !isRequested &&
                      group.privacy !== "closed" && (
                        <button
                          onClick={handleJoin}
                          className="rounded-lg bg-blue-600 px-6 py-2.5 font-semibold text-white transition hover:bg-blue-700"
                        >
                          Join Group
                        </button>
                      )}

                    {isRequested && !isMember && (
                      <button
                        onClick={handleCancel}
                        className="rounded-lg bg-red-600 px-6 py-2.5 font-semibold text-white transition hover:bg-red-700"
                      >
                        Cancel Request
                      </button>
                    )}

                    {isMember &&
                      (group.privacy === "closed" ? (
                        <div className="rounded-lg bg-gray-100 px-6 py-2.5 font-semibold text-gray-700">
                          Closed
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            Swal.fire({
                              title: "Are you sure?",
                              text: "You will leave this group and will need to join again.",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Yes, leave group!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                dispatch(leaveGroup(group.id));
                              }
                            });
                          }}
                          className="rounded-lg bg-gray-200 px-6 py-2.5 font-semibold text-gray-700 transition hover:bg-gray-300"
                        >
                          Joined
                        </button>
                      ))}

                    <button className="flex items-center gap-2 rounded-lg bg-gray-200 px-6 py-2.5 font-semibold text-gray-700 hover:bg-gray-300">
                      <FaBell className="h-4 w-4" />
                      Notifications
                    </button>

                    <button className="flex items-center gap-2 rounded-lg bg-gray-200 px-6 py-2.5 font-semibold text-gray-700 hover:bg-gray-300">
                      <FaShareAlt className="h-4 w-4" />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs and content */}
      <div className="mx-auto max-w-5xl">
        <div className="rounded-xl bg-white shadow">
          {/* Tabs  */}
          <div className="border-b border-gray-200 bg-white">
            <div className="flex justify-between gap-1 px-3">
              {(
                [
                  { id: "posts", label: "Posts", icon: BsPostcard },
                  { id: "pinned", label: "Pinned Posts", icon: FaThumbtack },
                  { id: "members", label: "Members", icon: FaUsers },
                  { id: "media", label: "Media", icon: FaImage },
                  { id: "about", label: "About", icon: FaInfoCircle },
                ] as Array<{
                  id: "posts" | "pinned" | "members" | "media" | "about";
                  label: string;
                  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
                }>
              ).map((tab) => (
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

          {/* Tab content */}
          <div className="p-5">
            {activeTab === "posts" && (
              <div className="space-y-4">
                {isMember && (
                  <div className="mb-6 rounded-xl bg-gray-50 p-4">
                    <input
                      type="text"
                      placeholder="Share something with the group..."
                      className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                )}

                {/* Use existing GroupPostList for posts */}
                <GroupPostList groupId={group.id} mode={"posts"} />
              </div>
            )}

            {activeTab === "pinned" && (
              <GroupPostList groupId={group.id} mode={"pinned"} />
            )}

            {activeTab === "members" && (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">
                    Members ({group.members?.length || 0})
                  </h2>
                  <div className="relative">
                    <FaSearch className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search members..."
                      className="rounded-lg border border-gray-200 py-2 pr-4 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {memberUsers.map((member, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 rounded-xl bg-gray-50 p-4 transition-colors hover:bg-gray-100"
                    >
                      <img
                        src={member?.avatar}
                        alt={member?.name}
                        className="h-12 w-12 rounded-full bg-gray-200 object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {member?.name || "Member"}
                        </h3>
                        <p className="text-sm text-gray-500">Member</p>
                      </div>
                    </div>
                  ))}
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
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 font-bold text-gray-900">Description</h3>
                  <p className="text-gray-700">{group.description}</p>
                </div>
                <div>
                  <h3 className="mb-2 font-bold text-gray-900">Privacy</h3>
                  <p className="text-gray-700">
                    Public - Anyone can see posts and members
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDetail;

import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaUsers, FaImage, FaInfoCircle, FaThumbtack } from "react-icons/fa";
import { BsPostcard } from "react-icons/bs";
import sampleRooms, { type Room } from "../../data/rooms-data/roomsData";
import { usersData } from "../../data/profile-data/userData";
import { roomPosts } from "../../data/rooms-data/roomPostData";
import PostsTab from "../../components/ClassRoom/detailsPageTabs/PostsTab";
// PinnedTab replaced by rendering PostsTab with pinned posts
import MembersTab from "../../components/ClassRoom/detailsPageTabs/MembersTab";
import MediaTab from "../../components/ClassRoom/detailsPageTabs/MediaTab";
import AboutTab from "../../components/ClassRoom/detailsPageTabs/AboutTab";
import { addReply } from "../../store/slices/classRoom/roomPostsSlice";
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

  const room: Room | undefined = sampleRooms.find((r) => r.id === roomId);

  const [activeTab, setActiveTab] = useState<
    "posts" | "pinned" | "members" | "media" | "about"
  >("posts");

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

  const [showReplyFor, setShowReplyFor] = useState<Record<string, boolean>>({});
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const postsFromStore = useAppSelector((s) => s.roomPosts?.posts || roomPosts);

  const toggleReply = (postId: string) =>
    setShowReplyFor((s) => ({ ...s, [postId]: !s[postId] }));

  const submitReply = (postId: string) => {
    const text = (replyText[postId] || "").trim();
    if (!text) return;

    const newReply = {
      id: `reply-${postId}-${Date.now()}`,
      authorId: currentUser?.id,
      content: text,
      createdAt: new Date().toISOString(),
    };
    dispatch(addReply({ postId, reply: newReply }));
    setReplyText((r) => ({ ...r, [postId]: "" }));
    setShowReplyFor((s) => ({ ...s, [postId]: false }));
  };

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

      <div className="mx-auto max-w-5xl rounded-lg bg-white shadow">
        <div className="border-b border-gray-200 bg-white">
          <div className="flex justify-between px-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 border-b-2 px-6 py-4 font-semibold transition-colors ${activeTab === tab.id ? "border-blue-600 text-blue-600" : "border-transparent text-gray-600 hover:text-gray-900"}`}
              >
                <tab.icon className="h-5 w-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-3">
          {activeTab === "posts" && (
            <div className="space-y-3">
              <PostsTab
                roomId={room.id}
                posts={postsFromStore}
                users={usersData}
                showReplyFor={showReplyFor}
                replyText={replyText}
                toggleReply={toggleReply}
                setReplyText={setReplyText}
                submitReply={submitReply}
                currentUserId={currentUser?.id}
              />
            </div>
          )}

          {activeTab === "pinned" && (
            <div className="space-y-3">
              <PostsTab
                roomId={room.id}
                posts={postsFromStore.filter((p) => p.pinned)}
                users={usersData}
                showReplyFor={showReplyFor}
                replyText={replyText}
                toggleReply={toggleReply}
                setReplyText={setReplyText}
                submitReply={submitReply}
                currentUserId={currentUser?.id}
              />
            </div>
          )}

          {activeTab === "members" && (
            <MembersTab
              members={room.members}
              users={usersData}
              currentUser={currentUser}
              onAccept={(id: string) => dispatch(acceptFriendRequest(id))}
              onDecline={(id: string) => dispatch(declineFriendRequest(id))}
              onAddFriend={(id: string) => dispatch(sendFriendRequest(id))}
              onCancelRequest={(id: string) =>
                dispatch(cancelFriendRequest(id))
              }
              onUnfriend={async (id: string) => {
                const ok = await confirm({
                  title: "Are you sure?",
                  text: "You will remove this friend.",
                  confirmButtonText: "Yes, unfriend",
                  icon: "warning",
                });
                if (ok) dispatch(unfriend(id));
              }}
            />
          )}

          {activeTab === "media" && <MediaTab />}

          {activeTab === "about" && (
            <AboutTab
              status={room.status}
              creator={
                creator ? { id: creator.id, name: creator.name } : undefined
              }
              createdAt={room.createdAt}
              lastActivityAt={room.lastActivityAt}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;

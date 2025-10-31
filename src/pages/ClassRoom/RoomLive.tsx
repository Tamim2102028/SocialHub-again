import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import sampleRooms from "../../data/rooms-data/roomsData";
import { usersData } from "../../data/profile-data/userData";
import { useAppSelector } from "../../store/hooks";
import { selectUserById } from "../../store/slices/profileSlice";

type ChatMessage = {
  id: string;
  authorId?: string;
  content: string;
  createdAt: string;
};

const RoomLive: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const room = sampleRooms.find((r) => r.id === roomId);
  const currentUser = useAppSelector((s) => selectUserById(s, s.profile.id));

  const creator = useMemo(() => {
    if (!room?.createdBy) return undefined;
    return usersData.find((u) => u.id === room.createdBy);
  }, [room]);

  // Local in-memory state for demo live features
  const [isLive, setIsLive] = useState<boolean>(false);
  const [participants, setParticipants] = useState<string[]>(() =>
    room?.createdBy ? [room.createdBy] : []
  );
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // ensure creator is listed
    if (!room?.createdBy) return;
    setParticipants((p) =>
      p.includes(room.createdBy!) ? p : [...p, room.createdBy!]
    );
  }, [room]);

  // initialize dayjs relativeTime plugin (for human-friendly timestamps)
  useEffect(() => {
    dayjs.extend(relativeTime);
  }, []);

  if (!room) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900">Live not found</h2>
        <p className="mt-2 text-gray-600">This live session does not exist.</p>
        <div className="mt-4">
          <Link to="/classroom" className="text-blue-600 hover:underline">
            Back to Rooms
          </Link>
        </div>
      </div>
    );
  }

  const isCreator = !!currentUser && room.createdBy === currentUser.id;
  const isTeacher = !!currentUser && currentUser.role?.includes("teacher");
  const isJoined = !!currentUser && participants.includes(currentUser.id);

  const handleStartEnd = () => {
    setIsLive((v) => !v);
    setMessages((m) => [
      ...m,
      {
        id: `sys-${Date.now()}`,
        content: `${!isLive ? "Live started" : "Live ended"} by ${currentUser?.name ?? "host"}`,
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  const handleJoinLeave = () => {
    if (!currentUser) return;
    setParticipants((p) =>
      p.includes(currentUser.id)
        ? p.filter((id) => id !== currentUser.id)
        : [...p, currentUser.id]
    );
    setMessages((m) => [
      ...m,
      {
        id: `sys-${Date.now()}`,
        content: `${currentUser.name} ${isJoined ? "left" : "joined"} the live`,
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  const handleSendMessage = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [
      ...m,
      {
        id: `m-${Date.now()}`,
        authorId: currentUser?.id,
        content: text,
        createdAt: new Date().toISOString(),
      },
    ]);
    setInput("");
  };

  return (
    <div className="grid auto-rows-min grid-cols-1 gap-6 lg:grid-cols-[2fr_360px]">
      {/* Main live area */}
      <div className="space-y-4">
        <div className="rounded-lg border border-gray-300 bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">{room.name}</h1>
              <div className="text-sm text-gray-600">
                Host: {creator ? creator.name : "Unknown"}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div
                className={`rounded px-2 py-1 text-sm font-medium ${isLive ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"}`}
              >
                {isLive ? "Live" : "Offline"}
              </div>

              {isTeacher && isCreator ? (
                <button
                  onClick={handleStartEnd}
                  className={`rounded px-3 py-1 text-sm font-medium text-white ${isLive ? "bg-gray-600 hover:bg-gray-700" : "bg-red-600 hover:bg-red-700"}`}
                >
                  {isLive ? "End live" : "Start live"}
                </button>
              ) : null}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
            <div>
              <div className="relative flex aspect-video min-h-[240px] w-full items-center justify-center overflow-hidden rounded bg-black text-white">
                {isLive ? (
                  <div className="text-center">
                    <div className="text-xl font-semibold">Live stream</div>
                    <div className="text-sm text-gray-200">
                      (streaming placeholder)
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-300">
                    Live is not started yet
                  </div>
                )}
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Participants: {participants.length}
                </div>
                <div>
                  {!isTeacher ? (
                    <button
                      onClick={handleJoinLeave}
                      className={`rounded px-3 py-1 text-sm font-medium text-white ${isJoined ? "bg-gray-600 hover:bg-gray-700" : "bg-blue-600 hover:bg-blue-700"}`}
                    >
                      {isJoined ? "Leave" : "Join"}
                    </button>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Small participants + chat summary on the right of the video */}
            <div className="mt-2 lg:mt-0">
              <div className="rounded border border-gray-200 bg-white p-3">
                <h3 className="text-sm font-semibold text-gray-900">
                  Participants
                </h3>
                <div className="mt-2 max-h-56 space-y-2 overflow-auto">
                  {participants.map((id) => {
                    const u = usersData.find((x) => x.id === id);
                    return (
                      <div key={id} className="flex items-center gap-2">
                        <img
                          src={u?.avatar}
                          alt={u?.name}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                        <div className="text-sm text-gray-700">
                          {u?.name ?? id}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat area (mobile / below video) */}
        <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900">Live chat</h3>
          <div className="mt-3 flex h-72 flex-col lg:h-80">
            <div className="mb-3 flex-1 space-y-2 overflow-auto">
              {messages.length === 0 ? (
                <div className="text-sm text-gray-500">No messages yet</div>
              ) : (
                messages.map((m) => {
                  const u = m.authorId
                    ? usersData.find((x) => x.id === m.authorId)
                    : undefined;
                  return (
                    <div key={m.id} className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium text-gray-800">
                          {u?.name ?? "System"}
                        </div>
                        <div className="text-xs text-gray-400">
                          {dayjs(m.createdAt).fromNow()}
                        </div>
                      </div>
                      <div className="text-sm text-gray-700">{m.content}</div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="mt-2 flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                placeholder={
                  isJoined
                    ? "Type a message..."
                    : "Join the live to send messages"
                }
                disabled={!isJoined}
              />
              <button
                onClick={handleSendMessage}
                disabled={!isJoined || !input.trim()}
                className="rounded bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right column: participants list + basic info (desktop) */}
      <aside className="hidden lg:block">
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900">Room info</h3>
          <div className="mt-2 text-sm text-gray-600">{room.name}</div>
          <div className="mt-2 text-sm text-gray-600">
            Members: {room.members?.length ?? 0}
          </div>
          <div className="mt-4">
            <h4 className="text-sm font-semibold">
              Participants ({participants.length})
            </h4>
            <div className="mt-2 max-h-64 space-y-2 overflow-auto">
              {participants.map((id) => {
                const u = usersData.find((x) => x.id === id);
                return (
                  <div key={id} className="flex items-center gap-2">
                    <img
                      src={u?.avatar}
                      alt={u?.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <div className="text-sm text-gray-700">{u?.name ?? id}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default RoomLive;

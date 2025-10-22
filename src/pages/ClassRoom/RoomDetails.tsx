import React from "react";
import { useParams, Link } from "react-router-dom";
import sampleRooms, { type Room } from "../../data/roomsData";
import { usersData } from "../../data/profile-data/userData";

const RoomDetails: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();

  // find room from sample data
  const room: Room | undefined = sampleRooms.find((r) => r.id === roomId);

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
    <div className="space-y-4">
      <div className="rounded-lg border border-gray-300 bg-white p-4 shadow-sm">
        <div className="flex items-start gap-4">
          <img
            src={room.coverImage || `https://picsum.photos/seed/${room.id}/600/300`}
            alt={room.name}
            className="h-36 w-64 rounded object-cover"
          />

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{room.name}</h1>
            {creator && (
              <p className="mt-1 text-sm text-gray-600">
                Created by:{" "}
                <Link to={`/profile/${creator.id}`} className="text-blue-600 hover:underline">
                  {creator.name}
                </Link>
              </p>
            )}

            <p className="mt-2 text-sm text-gray-700">
              Status: <span className="font-medium">{room.status}</span>
            </p>

            {room.createdAt && (
              <p className="mt-1 text-xs text-gray-500">Created: {new Date(room.createdAt).toLocaleString()}</p>
            )}
          </div>
        </div>
      </div>

      {/* Members list */}
      <div className="rounded-lg border border-gray-300 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Members</h2>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {room.members && room.members.length > 0 ? (
            room.members.map((m) => {
              const user = usersData.find((u) => u.id === m);
              return (
                <div key={m} className="flex items-center gap-3">
                  <img src={user?.avatar || "https://via.placeholder.com/40"} alt={user?.name} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <Link to={`/profile/${m}`} className="font-medium text-gray-900 hover:underline">
                      {user?.name || `User ${m}`}
                    </Link>
                    <div className="text-xs text-gray-500">{user?.username}</div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-sm text-gray-600">No members yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;

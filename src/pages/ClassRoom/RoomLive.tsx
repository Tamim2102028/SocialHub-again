import React from "react";
import { useParams, Link } from "react-router-dom";
import sampleRooms from "../../data/rooms-data/roomsData";
import { usersData } from "../../data/profile-data/userData";

const RoomLive: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const room = sampleRooms.find((r) => r.id === roomId);
  const creator = room?.createdBy
    ? usersData.find((u) => u.id === room.createdBy)
    : undefined;

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

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-gray-300 bg-white p-4 shadow-sm">
        <h1 className="text-2xl font-bold">Live — {room.name}</h1>
        {creator && (
          <div className="text-sm text-gray-600">by {creator.name}</div>
        )}
        <p className="mt-2 text-sm text-gray-500">Live session placeholder.</p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <p className="text-sm text-gray-700">
          Streaming UI will be integrated here.
        </p>
        <div className="mt-3">
          <Link
            to={`/classroom/rooms/${room.id}`}
            className="text-blue-600 hover:underline"
          >
            Back to room
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomLive;

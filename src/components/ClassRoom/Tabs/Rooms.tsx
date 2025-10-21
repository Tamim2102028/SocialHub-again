import React from "react";
import sampleRooms from "../../../data/roomsData";
import type { Room as SampleRoom } from "../../../data/roomsData";
import RoomForm from "../RoomForm";

// Rooms can come from local state (minimal shape) or from sampleRooms (richer shape).
type LocalRoom = {
  id: string;
  name: string;
  createdAt: string;
};

type CombinedRoom = LocalRoom | SampleRoom;

type CreatePayload = {
  university: string;
  department: string;
  section: string;
  subsection: string;
};

const Rooms: React.FC<{
  rooms?: CombinedRoom[];
  showCreateForm?: boolean;
  onCreate?: (data: CreatePayload) => void;
  onCancelCreate?: () => void;
}> = ({ rooms = [], showCreateForm = false, onCreate, onCancelCreate }) => {
  // use sampleRooms as fallback when no rooms provided from parent state
  const displayRooms: CombinedRoom[] = rooms.length > 0 ? rooms : sampleRooms;

  return (
    <div className="space-y-3">
      {/* header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Rooms</h2>
      </div>

      {/* create room form */}
      {showCreateForm && (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow">
          <div>
            <RoomForm
              onSubmit={(d) => onCreate?.(d)}
              onCancel={onCancelCreate}
            />
          </div>
        </div>
      )}

      {/* no rooms message */}
      {displayRooms.length === 0 ? (
        <div className="rounded-xl border border-gray-300 bg-white p-6 shadow">
          <p className="text-sm text-gray-600">
            No rooms yet. Create one to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {displayRooms.map((r) => {
            // Simplified card: only show cover image and room name
            const cover =
              (r as CombinedRoom & { coverImage?: string }).coverImage ||
              `https://picsum.photos/seed/${r.id}/400/225`;

            return (
              <div key={r.id} className="overflow-hidden rounded-lg shadow-sm">
                <div className="relative h-40 w-full bg-gray-100">
                  <img
                    src={cover}
                    alt={r.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-2">
                    <p className="truncate text-sm font-medium text-white">
                      {r.name}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Rooms;

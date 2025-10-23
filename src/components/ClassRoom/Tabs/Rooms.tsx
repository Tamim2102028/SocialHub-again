import React from "react";
import sampleRooms from "../../../data/roomsData";
import { FaEllipsisV } from "react-icons/fa";
import { usersData } from "../../../data/profile-data/userData";
import { Link } from "react-router-dom";
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
          {displayRooms
            .filter((rr) => (rr as SampleRoom).status !== "hide")
            .map((r) => {
              // cover image (use provided coverImage or fallback)
              const cover =
                (r as CombinedRoom & { coverImage?: string }).coverImage ||
                `https://picsum.photos/seed/${r.id}/400/225`;

              // get creator name from usersData (sample createdBy uses 'u' prefix)
              const createdById = (r as CombinedRoom & { createdBy?: string })
                .createdBy;
              const getCreatorName = (cid?: string) => {
                if (!cid) return undefined;
                const user = usersData.find((u) => u.id === cid);
                return user?.name;
              };
              const creatorName = getCreatorName(createdById);

              return (
                <div
                  key={r.id}
                  className="overflow-hidden rounded-lg shadow-sm"
                >
                  <Link
                    to={`/classroom/rooms/${r.id}`}
                    className="relative block h-40 w-full bg-gray-100"
                  >
                    <img
                      src={cover}
                      alt={r.name}
                      className="h-full w-full object-cover"
                    />

                    {/* three-dot menu button (visual only) */}
                    <button
                      onClick={(e) => e.stopPropagation()}
                      aria-label="room options"
                      className="absolute top-2 right-2 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/50"
                    >
                      <FaEllipsisV className="h-4 w-4" />
                    </button>

                    <div className="absolute top-0 left-0 w-full bg-black/70 p-2">
                      <p className="truncate text-sm font-medium text-white">
                        {r.name}
                      </p>
                      {creatorName && (
                        <p className="mt-0.5 truncate text-xs text-gray-200">
                          <Link
                            onClick={(e) => e.stopPropagation()}
                            to={`/profile/${createdById}`}
                            className="text-gray-200 hover:underline"
                          >
                            {creatorName}
                          </Link>
                        </p>
                      )}
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>
      )}
      {/* Hidden rooms section (rooms with status 'hide') */}
      {/** Use sampleRooms/displayRooms that include richer shape when available */}
      {(displayRooms as CombinedRoom[]).filter(
        (rr) => (rr as SampleRoom).status === "hide"
      ).length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-gray-900">Hidden rooms</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(displayRooms as CombinedRoom[])
              .filter((rr) => (rr as SampleRoom).status === "hide")
              .map((r) => {
                const cover =
                  (r as CombinedRoom & { coverImage?: string }).coverImage ||
                  `https://picsum.photos/seed/${r.id}/400/225`;

                const createdById = (r as CombinedRoom & { createdBy?: string })
                  .createdBy;
                const getCreatorName = (cid?: string) => {
                  if (!cid) return undefined;
                  const user = usersData.find((u) => u.id === cid);
                  return user?.name;
                };
                const creatorName = getCreatorName(createdById);

                return (
                  <div key={r.id} className="overflow-hidden rounded-lg shadow-sm">
                    <Link
                      to={`/classroom/rooms/${r.id}`}
                      className="relative block h-40 w-full bg-gray-100"
                    >
                      <img
                        src={cover}
                        alt={r.name}
                        className="h-full w-full object-cover"
                      />

                      {/* three-dot menu button (visual only) */}
                      <button
                        onClick={(e) => e.stopPropagation()}
                        aria-label="room options"
                        className="absolute top-2 right-2 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/50"
                      >
                        <FaEllipsisV className="h-4 w-4" />
                      </button>

                      <div className="absolute top-0 left-0 w-full bg-black/70 p-2">
                        <p className="truncate text-sm font-medium text-white">
                          {r.name}
                        </p>
                        {creatorName && (
                          <p className="mt-0.5 truncate text-xs text-gray-200">
                            <Link
                              onClick={(e) => e.stopPropagation()}
                              to={`/profile/${createdById}`}
                              className="text-gray-200 hover:underline"
                            >
                              {creatorName}
                            </Link>
                          </p>
                        )}
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Rooms;

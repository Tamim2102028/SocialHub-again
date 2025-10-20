import React from "react";
import dayjs from "dayjs";
import { usersData } from "../../../data/profile-data/userData";
import RoomForm from "../RoomForm";

type Room = {
  id: string;
  name: string;
  createdAt: string;
};

type CreatePayload = {
  university: string;
  department: string;
  section: string;
  subsection: string;
};

const Rooms: React.FC<{
  rooms?: Room[];
  showCreateForm?: boolean;
  onCreate?: (data: CreatePayload) => void;
  onCancelCreate?: () => void;
}> = ({ rooms = [], showCreateForm = false, onCreate, onCancelCreate }) => {
  return (
    <div className="space-y-3">
      {/* header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Rooms</h2>
      </div>

      {/* create room form */}
      {showCreateForm && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow">
          <h3 className="text-md mb-3 font-medium text-gray-900">
            Create Room
          </h3>
          <div>
            <RoomForm
              onSubmit={(d) => onCreate?.(d)}
              onCancel={onCancelCreate}
            />
          </div>
        </div>
      )}

      {/* no rooms message */}
      {rooms.length === 0 ? (
        <div className="rounded-xl border border-gray-300 bg-white p-6 shadow">
          <p className="text-sm text-gray-600">
            No rooms yet. Create one to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {rooms.map((r) => {
            // parse room.name which is stored as "University / Department / Section(-subsection)"
            const parts = r.name.split("/").map((p) => p.trim());
            const uni = parts[0] || "";
            const dept = parts[1] || "";
            const secPart = parts[2] || ""; // e.g. "A" or "A-1"
            let section = secPart;
            let subsection: string | undefined = undefined;
            if (secPart.includes("-")) {
              const [s, ss] = secPart.split("-").map((p) => p.trim());
              section = s;
              subsection = ss;
            }

            const activeCount = usersData.filter((u) => {
              if (!u.university) return false;
              if (u.university.name !== uni) return false;
              if (dept && u.university.department !== dept) return false;
              if (section && u.university.section !== section) return false;
              if (subsection && u.university.subsection !== subsection)
                return false;
              // treat `status` true as online
              return u.status === true;
            }).length;

            return (
              <div
                key={r.id}
                className="rounded-lg border border-gray-200 bg-white p-4 shadow transition-shadow hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-none items-center justify-center rounded-md bg-gradient-to-tr from-blue-500 to-indigo-500 font-bold text-white">
                    {r.name.split(" ")[0].slice(0, 2).toUpperCase()}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{r.name}</p>
                        <p className="text-xs text-gray-500">
                          Created:{" "}
                          {dayjs(r.createdAt).format("MMM D, YYYY h:mm A")}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                            {activeCount} online
                          </span>
                        </div>
                      </div>
                    </div>
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

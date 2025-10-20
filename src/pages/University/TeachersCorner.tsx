import React, { useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { mockTeachers } from "../../data/teachersData";
import type { Teacher } from "../../data/teachersData";

const TeachersCorner: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"classroom" | "teachers" | "more">(
    "classroom"
  );
  const [query, setQuery] = useState("");

  const [rooms, setRooms] = useState<
    Array<{ id: string; teacherId?: string; name: string; createdAt: string }>
  >([]);

  const filtered = useMemo(() => {
    return mockTeachers.filter((t) =>
      (t.name + " " + (t.subjects || []).join(" "))
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  }, [query]);

  const createRoom = (teacher?: Teacher) => {
    const id = `room_${Date.now()}`;
    const room = {
      id,
      teacherId: teacher?.id,
      name: teacher ? `${teacher.name} Room` : `Room ${rooms.length + 1}`,
      createdAt: new Date().toISOString(),
    };
    setRooms((r) => [room, ...r]);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        {/* Header */}
        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teachers Corner</h1>
          <p className="text-sm text-gray-600">
            Find and interact with teachers.
          </p>
        </div>

        {/* Create Room Button in Header */}
        {activeTab === "classroom" && (
          <button
            onClick={() => createRoom()}
            className="flex items-center gap-2 rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 transition-colors hover:border-blue-400 hover:bg-blue-100"
          >
            <FaPlus className="h-4 w-4" />
            Create Room
          </button>
        )}

        {/* Search Input: hidden while Class Room tab is active */}
        {activeTab !== "classroom" && (
          <div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search teachers..."
              className="w-64 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500"
            />
          </div>
        )}
      </div>

      {/* Tab Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab("classroom")}
          className={`rounded-md px-3 py-1 text-sm font-medium ${activeTab === "classroom" ? "bg-blue-600 text-white" : "border border-gray-200 bg-white text-gray-700"}`}
        >
          Class Room
        </button>
        <button
          onClick={() => setActiveTab("teachers")}
          className={`rounded-md px-3 py-1 text-sm font-medium ${activeTab === "teachers" ? "bg-blue-600 text-white" : "border border-gray-200 bg-white text-gray-700"}`}
        >
          Teachers
        </button>
        <button
          onClick={() => setActiveTab("more")}
          className={`rounded-md px-3 py-1 text-sm font-medium ${activeTab === "more" ? "bg-blue-600 text-white" : "border border-gray-200 bg-white text-gray-700"}`}
        >
          More
        </button>
      </div>

      <div>
        {activeTab === "classroom" && (
          <div className="space-y-4">
            <div className="rounded-lg border border-gray-100 bg-white p-4">
              <h4 className="mb-2 text-lg font-medium">Create Room</h4>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => createRoom()}
                  className="flex items-center gap-2 rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 hover:border-blue-400 hover:bg-blue-100"
                >
                  <FaPlus className="h-4 w-4" />
                  Create Generic Room
                </button>
                <div className="text-sm text-gray-500">
                  Use the Teachers tab to browse and create rooms for teachers.
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-100 bg-white p-3">
              <h4 className="mb-2 text-lg font-medium">Created Rooms</h4>
              {rooms.length === 0 ? (
                <div className="text-sm text-gray-500">
                  No rooms yet. Create a room to get started.
                </div>
              ) : (
                <ul className="space-y-2 text-sm">
                  {rooms.map((r) => (
                    <li
                      key={r.id}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <div className="font-medium">{r.name}</div>
                        <div className="text-xs text-gray-500">
                          {r.teacherId || "General"} •{" "}
                          {new Date(r.createdAt).toLocaleString()}
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">ID: {r.id}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {activeTab === "teachers" && (
          <div className="space-y-4">
            <div className="rounded-lg border border-gray-100 bg-white p-4">
              <h4 className="mb-2 text-lg font-medium">All Teachers</h4>
              <div className="space-y-3">
                {filtered.map((t) => (
                  <div
                    key={t.id}
                    className="flex items-center gap-3 rounded-md border border-gray-100 p-3"
                  >
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        {t.name}
                      </div>
                      <div className="text-xs text-gray-600">
                        {t.department || "-"} • {t.title || "-"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {t.university || "Unknown University"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "more" && (
          <div className="rounded-lg border border-gray-100 bg-white p-4">
            <h4 className="mb-2 text-lg font-medium">More</h4>
            <div className="text-sm text-gray-500">
              Placeholder tab — add announcements, polls, or other features
              here.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeachersCorner;

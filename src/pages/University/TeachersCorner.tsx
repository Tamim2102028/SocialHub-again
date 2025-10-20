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

  const getTeacherById = (id?: string) => mockTeachers.find((t) => t.id === id);
  const initials = (name?: string) => {
    if (!name) return "T";
    return name
      .split(" ")
      .map((s) => s[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const colorFor = (seed?: string) => {
    const colors = [
      "bg-blue-100 text-blue-800",
      "bg-green-100 text-green-800",
      "bg-pink-100 text-pink-800",
      "bg-yellow-100 text-yellow-800",
      "bg-purple-100 text-purple-800",
    ];
    if (!seed) return colors[0];
    let h = 0;
    for (let i = 0; i < seed.length; i++) h = (h << 5) - h + seed.charCodeAt(i);
    return colors[Math.abs(h) % colors.length];
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

      {/* Tab Content */}
      <div>
        {/* Classroom Tab Content */}
        {activeTab === "classroom" && (
          <div className="rounded-lg border border-gray-100 bg-white p-3">
            {rooms.length === 0 ? (
              <div className="py-10 text-center text-lg text-gray-500">
                No rooms yet. Create a room to get started.
              </div>
            ) : (
              <ul className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
                {rooms.map((r) => {
                  const teacher = getTeacherById(r.teacherId);
                  const seed = teacher?.name || r.name || r.id;
                  return (
                    <li key={r.id}>
                      <div className="w-full rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-lg">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex min-w-0 items-start gap-3">
                            <div
                              className={`flex h-12 w-12 items-center justify-center rounded-full ${colorFor(seed)} flex-shrink-0`}
                            >
                              <span className="font-semibold">
                                {initials(teacher?.name || r.name)}
                              </span>
                            </div>

                            <div className="min-w-0">
                              <div className="truncate font-medium text-gray-900">
                                {r.name}
                              </div>
                              <div className="truncate text-xs text-gray-500">
                                {teacher?.department
                                  ? `${teacher.department} • ${teacher.title || ""}`
                                  : teacher?.title || r.teacherId || "General"}
                              </div>
                              <div className="mt-2 flex max-w-[14rem] flex-wrap gap-2 overflow-hidden">
                                {(teacher?.subjects || [])
                                  .slice(0, 3)
                                  .map((s) => (
                                    <span
                                      key={s}
                                      className="truncate rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                                    >
                                      {s}
                                    </span>
                                  ))}
                                <span className="ml-1 text-xs text-gray-400">
                                  • {new Date(r.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-shrink-0 flex-col items-end gap-2">
                            <div className="flex gap-2 whitespace-nowrap">
                              <button className="rounded-md bg-blue-600 px-3 py-1 text-sm font-medium whitespace-nowrap text-white hover:bg-blue-700">
                                Open
                              </button>
                              <button className="rounded-md border border-gray-200 bg-white px-2 py-1 text-sm font-medium whitespace-nowrap text-gray-700">
                                More
                              </button>
                            </div>
                            <div className="text-xs text-gray-400">
                              ID: {r.id}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}

        {/* Teachers Tab Content */}
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

        {/* More Tab Content */}
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

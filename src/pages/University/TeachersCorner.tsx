import React, { useState } from "react";
import type { Teacher } from "../../data/teachersData";
import { mockTeachers } from "../../data/teachersData";
import TeachersList from "../../components/TeachersCorner/TeachersList";

const TeachersCornerClean: React.FC = () => {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<"list" | "classroom">("list");
  const [rooms, setRooms] = useState<
    Array<{ id: string; teacherId: string; name: string; createdAt: string }>
  >([]);

  const filtered = mockTeachers.filter((t) =>
    (t.name + " " + (t.subjects || []).join(" "))
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  const createRoomForTeacher = (teacher: Teacher) => {
    const room = {
      id: `room_${teacher.id}_${Date.now()}`,
      teacherId: teacher.id,
      name: `${teacher.name} Room`,
      createdAt: new Date().toISOString(),
    };
    setRooms((r) => [room, ...r]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teachers Corner</h1>
          <p className="text-sm text-gray-600">
            Find your teachers and interact with them.
          </p>
        </div>
        <div className="w-72">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search teachers by name or subject..."
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setTab("list")}
          className={`rounded-md px-3 py-1 text-sm font-medium ${tab === "list" ? "bg-blue-600 text-white" : "border border-gray-200 bg-white text-gray-700"}`}
        >
          List
        </button>
        <button
          onClick={() => setTab("classroom")}
          className={`rounded-md px-3 py-1 text-sm font-medium ${tab === "classroom" ? "bg-blue-600 text-white" : "border border-gray-200 bg-white text-gray-700"}`}
        >
          Class Room
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <aside className="md:col-span-1">
          <TeachersList teachers={filtered} onSelect={() => {}} />
        </aside>
        <main className="md:col-span-2">
          {tab === "list" ? (
            <div className="rounded-lg border border-gray-100 bg-white p-6">
              <h3 className="mb-4 text-lg font-semibold">Teacher IDs</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {filtered.map((t) => (
                  <li
                    key={t.id}
                    className="flex items-center justify-between gap-4"
                  >
                    <span>{t.id}</span>
                    <span className="text-xs text-gray-500">{t.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="space-y-4">
              {mockTeachers.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between rounded-lg border border-gray-100 bg-white p-4"
                >
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {t.name}
                    </div>
                    <div className="text-xs text-gray-500">{t.department}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => createRoomForTeacher(t)}
                      className="rounded-md bg-green-600 px-3 py-1 text-sm font-medium text-white hover:bg-green-700"
                    >
                      Create Room
                    </button>
                  </div>
                </div>
              ))}

              <div className="rounded-lg border border-gray-100 bg-white p-4">
                <h4 className="mb-2 text-sm font-semibold">Created Rooms</h4>
                {rooms.length === 0 ? (
                  <div className="text-sm text-gray-500">
                    No rooms yet. Create a room from above.
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
                            for {r.teacherId} •{" "}
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
        </main>
      </div>
    </div>
  );
};

export default TeachersCornerClean;

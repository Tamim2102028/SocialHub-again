import React, { useState } from "react";
import type { Teacher } from "../../data/teachersData";
import { mockTeachers } from "../../data/teachersData";
import TeachersList from "../../components/TeachersCorner/TeachersList";
import TeacherProfile from "../../components/TeachersCorner/TeacherProfile";

const TeachersCornerClean: React.FC = () => {
  const [selected, setSelected] = useState<Teacher | null>(null);
  const [query, setQuery] = useState("");

  const filtered = mockTeachers.filter((t) =>
    (t.name + " " + (t.subjects || []).join(" "))
      .toLowerCase()
      .includes(query.toLowerCase())
  );

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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <aside className="md:col-span-1">
          <TeachersList teachers={filtered} onSelect={(t) => setSelected(t)} />
        </aside>
        <main className="md:col-span-2">
          {selected ? (
            <TeacherProfile
              teacher={selected}
              onClose={() => setSelected(null)}
            />
          ) : (
            <div className="rounded-lg border border-gray-100 bg-white p-6 text-gray-600">
              Select a teacher to view details and interact.
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default TeachersCornerClean;

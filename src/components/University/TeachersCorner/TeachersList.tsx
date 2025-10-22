import React from "react";
import type { Teacher } from "../../../data/teachersData";

interface Props {
  teachers: Teacher[];
  onSelect: (t: Teacher) => void;
}

const TeachersList: React.FC<Props> = ({ teachers, onSelect }) => {
  return (
    <div className="space-y-3">
      {teachers.map((t) => (
        <button
          key={t.id}
          onClick={() => onSelect(t)}
          className="flex w-full items-center gap-3 rounded-lg border border-gray-100 bg-white p-3 text-left hover:shadow"
        >
          <img
            src={t.avatar}
            alt={t.name}
            className="h-12 w-12 flex-shrink-0 rounded-full object-cover"
          />

          <div className="flex-1">
            <div className="text-sm font-semibold text-gray-900">{t.name}</div>
            <div className="mt-1 text-xs text-gray-600">
              <div>{t.department || "-"}</div>
              <div>{t.title || "-"}</div>
              <div>{t.university || "Unknown University"}</div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default TeachersList;

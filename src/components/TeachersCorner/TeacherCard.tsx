import React from "react";
import type { Teacher } from "../../data/teachersData";

const TeacherCard: React.FC<{ teacher: Teacher }> = ({ teacher }) => {
  return (
    <div className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-100 bg-white p-3 hover:shadow">
      <img
        src={teacher.avatar}
        alt={teacher.name}
        className="h-12 w-12 rounded-full object-cover"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-gray-900">
            {teacher.name}
          </h4>
          <span className="text-xs text-gray-500">{teacher.department}</span>
        </div>
        <p className="text-xs text-gray-600">{teacher.title}</p>
        <div className="mt-1 flex flex-wrap gap-1">
          {(teacher.subjects || []).slice(0, 3).map((s) => (
            <span
              key={s}
              className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;

import React, { useState } from "react";
import type { Teacher } from "../../data/teachersData";
import { FaEnvelope, FaPhone, FaClock } from "react-icons/fa";

const TeacherProfile: React.FC<{ teacher: Teacher; onClose: () => void }> = ({
  teacher,
  onClose,
}) => {
  const [messageOpen, setMessageOpen] = useState(false);

  return (
    <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-6">
        <img
          src={teacher.avatar}
          alt={teacher.name}
          className="h-24 w-24 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {teacher.name}
              </h2>
              <p className="text-sm text-gray-600">
                {teacher.title} — {teacher.department}
              </p>
            </div>
            <button onClick={onClose} className="text-sm text-gray-500">
              Close
            </button>
          </div>

          <p className="mt-4 text-sm text-gray-700">{teacher.bio}</p>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <FaEnvelope className="h-4 w-4 text-blue-600" />
              <span>{teacher.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <FaPhone className="h-4 w-4 text-blue-600" />
              <span>{teacher.phone || "—"}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <FaClock className="h-4 w-4 text-blue-600" />
              <span>
                {(teacher.officeHours || []).length
                  ? `${(teacher.officeHours || []).length} upcoming slots`
                  : "No office hours"}
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => setMessageOpen((s) => !s)}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              {teacher.allowMessaging ? "Message" : "Request Contact"}
            </button>
            <button className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Book Office Hour
            </button>
          </div>

          {messageOpen && (
            <div className="mt-4 rounded-md border border-gray-200 bg-gray-50 p-3">
              <textarea
                className="w-full resize-none rounded-md border border-gray-300 p-2 text-sm"
                rows={3}
                placeholder={`Message to ${teacher.name}...`}
              />
              <div className="mt-2 flex justify-end">
                <button className="rounded-md bg-blue-600 px-3 py-1 text-sm font-medium text-white">
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;

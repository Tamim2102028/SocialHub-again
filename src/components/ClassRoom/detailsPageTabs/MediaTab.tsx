import React, { useState } from "react";
import { roomFiles } from "../../../data/rooms-data/roomFilesData";
import { usersData } from "../../../data/profile-data/userData";
import { formatPostDate } from "../../../utils/dateUtils";

interface Props {
  roomId: string;
}

const MediaTab: React.FC<Props> = ({ roomId }) => {
  const [active, setActive] = useState<"general" | "ct" | "assignments">(
    "general"
  );

  const filesForRoom = roomFiles.filter((f) => f.roomId === roomId);

  const filtered = filesForRoom.filter((f) =>
    active === "general"
      ? !!f.isGeneral
      : active === "ct"
        ? !!f.isCT
        : !!f.isAssignment
  );

  const counts = {
    general: filesForRoom.filter((f) => f.isGeneral).length,
    ct: filesForRoom.filter((f) => f.isCT).length,
    assignments: filesForRoom.filter((f) => f.isAssignment).length,
  };

  return (
    <div>
      <div className="flex items-center gap-3 border-b border-gray-200 pb-2">
        <button
          onClick={() => setActive("general")}
          className={`rounded px-3 py-2 text-sm font-medium ${
            active === "general"
              ? "bg-blue-50 text-blue-700"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          General ({counts.general})
        </button>
        <button
          onClick={() => setActive("ct")}
          className={`rounded px-3 py-2 text-sm font-medium ${
            active === "ct"
              ? "bg-blue-50 text-blue-700"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Class Test ({counts.ct})
        </button>
        <button
          onClick={() => setActive("assignments")}
          className={`rounded px-3 py-2 text-sm font-medium ${
            active === "assignments"
              ? "bg-blue-50 text-blue-700"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Assignments ({counts.assignments})
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {filtered.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white p-6 text-center">
            <h4 className="text-lg font-semibold text-gray-900">No files</h4>
            <p className="mt-2 text-sm text-gray-500">
              There are no files in this category yet.
            </p>
          </div>
        ) : (
          filtered.map((f) => {
            const user = usersData.find((u) => u.id === f.uploadedBy);
            return (
              <div
                key={f.id}
                className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3"
              >
                <div>
                  <div className="font-semibold text-gray-900">
                    {f.fileName}
                  </div>
                  <div className="text-xs text-gray-500">
                    <span>{user?.name ?? "Unknown"}</span>
                    <span className="mx-2">•</span>
                    <span>{formatPostDate(f.createdAt)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={f.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View
                  </a>
                  <a
                    download={f.fileName}
                    href={f.url}
                    className="text-sm text-gray-600 hover:text-gray-800"
                  >
                    Download
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MediaTab;

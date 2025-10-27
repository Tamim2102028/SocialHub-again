import React from "react";
import { Link } from "react-router-dom";
import { formatPostDate, formatPostClock } from "../../../utils/dateUtils";
import confirm from "../../../utils/confirm";

interface Props {
  status?: string;
  creator?: { id?: string; name?: string } | undefined;
  createdAt?: string | undefined;
  currentUserId?: string | undefined;
  roomId?: string | undefined;
  onDeleteRoom?: (id: string) => void;
}

const AboutTab: React.FC<Props> = ({
  status,
  creator,
  createdAt,
  currentUserId,
  roomId,
  onDeleteRoom,
}) => {
  const handleDelete = async () => {
    if (!roomId || !onDeleteRoom) return;
    const ok = await confirm({
      title: "Delete room?",
      text: "This will mark the room as deleted and remove it from lists.",
      confirmButtonText: "Delete",
      icon: "warning",
    });
    if (!ok) return;
    onDeleteRoom(roomId);
  };

  const isCreator =
    !!creator?.id && !!currentUserId && creator.id === currentUserId;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 font-bold text-gray-900">Details</h3>
        <p className="font-medium text-gray-500">
          Status: <span className="">{status}</span>
        </p>
        {creator && (
          <p className="font-medium text-gray-500">
            Created by:{" "}
            <Link
              to={`/profile/${creator.id}`}
              className="text-blue-600 hover:underline"
            >
              {creator.name}
            </Link>
          </p>
        )}
        {createdAt && (
          <p className="mt-1 text-sm text-gray-500">
            <span className="font-medium">Created:</span>
            <span className="ml-2 inline-flex items-center gap-2">
              <span>{formatPostDate(createdAt)}</span>
              <span className="h-1 w-1 rounded-full bg-gray-400" aria-hidden />
              <span>{formatPostClock(createdAt)}</span>
            </span>
          </p>
        )}

        {isCreator && onDeleteRoom && (
          <div className="mt-4">
            <button
              onClick={handleDelete}
              className="rounded bg-red-600 px-3 py-1 text-sm font-medium text-white hover:bg-red-700"
            >
              Delete room
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutTab;

import React from "react";
import EmptyState from "../EmptyState";
import { useAppSelector } from "../../../store/hooks";
import { selectPostsForRoom } from "../../../store/slices/classRoom/roomPostsSlice";
import { type UserData } from "../../../data/profile-data/userData";
import { Link } from "react-router-dom";

interface Props {
  roomId: string;
  users: UserData[];
}

const PinnedTab: React.FC<Props> = ({ roomId, users }) => {
  const posts = useAppSelector(selectPostsForRoom(roomId));
  const pinned = posts.filter((p) => p.pinned);

  if (pinned.length === 0)
    return (
      <EmptyState
        title="No pinned items"
        message="You haven't pinned any posts yet. Pin important posts to keep them at the top for quick access."
      />
    );

  return (
    <div className="space-y-4">
      {pinned.map((p) => {
        const author = users.find((u) => u.id === p.authorId);
        return (
          <div
            key={p.id}
            className="max-w-full overflow-hidden rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <img
                src={author?.avatar}
                alt={author?.name}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="font-semibold text-gray-900">
                  <Link
                    to={`/profile/${author?.id}`}
                    className="cursor-pointer transition-colors hover:text-blue-600 hover:underline"
                  >
                    {author?.name || "Unknown"}
                  </Link>
                </div>
                <p className="mt-2 text-justify text-sm break-words whitespace-pre-wrap text-gray-700">
                  {p.content}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PinnedTab;

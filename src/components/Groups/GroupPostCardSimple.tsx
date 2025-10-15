import React from "react";
import type { GroupPost } from "../../data/group-data/groupPostsData";
import { getUserById } from "../../data/profile-data/userData";

type Props = {
  post: GroupPost;
};

const GroupPostCardSimple: React.FC<Props> = ({ post }) => {
  const author = getUserById(post.createdBy);

  return (
    <article className="rounded-md bg-white p-4 shadow">
      <div className="mb-3 flex items-start gap-3">
        <img
          src={author?.avatar}
          alt={author?.name}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-gray-800">
                {author?.name || post.createdBy}
              </div>
              <div className="text-xs text-gray-500">
                @{author?.username || post.createdBy}
              </div>
            </div>
            <div className="text-xs text-gray-500">
              {new Date(post.createdAt).toLocaleString()}
            </div>
          </div>

          <div className="mt-2 text-sm text-gray-700">{post.content}</div>

          {post.images && post.images.length > 0 && (
            <img
              src={post.images[0]}
              alt="post"
              className="mt-3 h-60 w-full rounded-md object-cover"
            />
          )}

          <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
            <div>{post.likedBy?.length || 0} Likes</div>
            <div>{post.sharesBy?.length || 0} Shares</div>
            {post.tags && post.tags.length > 0 && (
              <div>{post.tags.join(", ")}</div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default GroupPostCardSimple;

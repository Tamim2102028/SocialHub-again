import React, { useMemo } from "react";
import type { GroupPost } from "../../data/group-data/groupPostsData";
import {
  getGroupPostsByGroupId,
  getPinnedGroupPosts,
} from "../../data/group-data/groupPostsData";
import GroupPostCardSimple from "./GroupPostCardSimple";

type Props = {
  groupId: string;
};

const GroupPostList: React.FC<Props> = ({ groupId }) => {
  const posts: GroupPost[] = useMemo(
    () => getGroupPostsByGroupId(groupId),
    [groupId]
  );
  const pinned = useMemo(() => getPinnedGroupPosts(groupId), [groupId]);

  if (!posts || posts.length === 0) {
    return <p className="text-sm text-gray-600">No posts yet.</p>;
  }

  return (
    <div className="space-y-4">
      {pinned.length > 0 && (
        <div className="border border-gray-500 p-3">
          <h3 className="mb-2 text-sm font-semibold">Pinned</h3>
          <div className="space-y-3">
            {pinned.map((p) => (
              <GroupPostCardSimple key={p.postId} post={p} />
            ))}
          </div>
        </div>
      )}

      {posts.map((p) => (
        <GroupPostCardSimple key={p.postId} post={p} />
      ))}
    </div>
  );
};

export default GroupPostList;

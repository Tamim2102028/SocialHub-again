import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import {
  editPost,
  deletePost,
  editReply,
  deleteReply,
  togglePinPost,
} from "../../../store/slices/classRoom/roomPostsSlice";
import { BsThreeDots } from "react-icons/bs";
import { formatPostDate, formatPostClock } from "../../../utils/dateUtils";
import { type RoomPost } from "../../../data/rooms-data/roomPostData";
import { type UserData } from "../../../data/profile-data/userData";

interface Props {
  roomId: string;
  posts: RoomPost[];
  users: UserData[];
  showReplyFor: Record<string, boolean>;
  replyText: Record<string, string>;
  toggleReply: (postId: string) => void;
  setReplyText: (
    updater: (r: Record<string, string>) => Record<string, string>
  ) => void;
  submitReply: (postId: string) => void;
  currentUserId?: string;
}

const PostsTab: React.FC<Props> = ({
  roomId,
  posts,
  users,
  showReplyFor,
  replyText,
  toggleReply,
  setReplyText,
  submitReply,
  currentUserId,
}) => {
  const [openMenu, setOpenMenu] = useState<{
    type: "post" | "reply";
    id: string;
  } | null>(null);
  const [postEditingId, setPostEditingId] = useState<string | null>(null);
  const [replyEditing, setReplyEditing] = useState<{
    postId: string;
    replyId: string;
  } | null>(null);
  const [postEditText, setPostEditText] = useState<Record<string, string>>({});
  const [replyEditText, setReplyEditText] = useState<Record<string, string>>(
    {}
  );

  const [expandedPosts, setExpandedPosts] = useState<Record<string, boolean>>(
    {}
  );

  const REPLIES_SHOWN = 3;

  const toggleExpand = (postId: string) =>
    setExpandedPosts((s) => ({ ...s, [postId]: !s[postId] }));

  const dispatch = useAppDispatch();

  const roomPosts = posts
    .filter((p) => p.roomId === roomId)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  if (roomPosts.length === 0)
    return <div className="text-sm text-gray-600">No posts for this room.</div>;

  return (
    <div className="space-y-4">
      {roomPosts.map((p) => {
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
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900">
                      <Link
                        to={`/profile/${author?.id}`}
                        className="cursor-pointer transition-colors hover:text-blue-600 hover:underline"
                      >
                        {author?.name || "Unknown"}
                      </Link>
                    </div>
                    <p className="flex items-center gap-2 text-sm text-gray-500">
                      <span>@{author?.username || "username"}</span>
                      <span
                        className="h-1 w-1 rounded-full bg-gray-400"
                        aria-hidden
                      />
                      <span>{formatPostDate(p.createdAt)}</span>
                      <span
                        className="h-1 w-1 rounded-full bg-gray-400"
                        aria-hidden
                      />
                      <span>{formatPostClock(p.createdAt)}</span>
                    </p>
                  </div>

                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenMenu(
                          openMenu &&
                            openMenu.type === "post" &&
                            openMenu.id === p.id
                            ? null
                            : { type: "post", id: p.id }
                        )
                      }
                      className="p-1 text-gray-500 hover:text-gray-800"
                      aria-label="Post menu"
                    >
                      <BsThreeDots className="h-5 w-5 cursor-pointer" />
                    </button>
                    {openMenu &&
                      openMenu.type === "post" &&
                      openMenu.id === p.id && (
                        <div className="absolute right-0 z-10 mt-8 w-40 rounded border bg-white shadow-sm">
                          <button
                            onClick={() => {
                              setPostEditingId(p.id);
                              setOpenMenu(null);
                              setPostEditText((s) => ({
                                ...s,
                                [p.id]: p.content,
                              }));
                            }}
                            className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              dispatch(togglePinPost(p.id));
                              setOpenMenu(null);
                            }}
                            className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                          >
                            {p.pinned ? "Unpin" : "Pin"}
                          </button>
                          <button
                            onClick={() => {
                              dispatch(deletePost(p.id));
                              setOpenMenu(null);
                            }}
                            className="block w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-gray-50"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                  </div>
                </div>
                {postEditingId === p.id ? (
                  <div className="mt-2">
                    <textarea
                      className="w-full rounded border border-gray-200 p-2 text-sm"
                      rows={4}
                      value={postEditText[p.id] ?? p.content}
                      onChange={(e) =>
                        setPostEditText((s) => ({
                          ...s,
                          [p.id]: e.target.value,
                        }))
                      }
                    />
                    <div className="mt-2 flex gap-2">
                      <button
                        onClick={() => {
                          const text = (postEditText[p.id] ?? p.content).trim();
                          if (text)
                            dispatch(editPost({ postId: p.id, content: text }));
                          setPostEditingId(null);
                        }}
                        className="rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setPostEditingId(null)}
                        className="rounded border border-gray-300 px-3 py-1 text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="mt-2 text-justify break-words whitespace-pre-wrap text-gray-700">
                    {p.content}
                  </p>
                )}

                <div className="mt-3 flex items-center gap-3">
                  <button
                    onClick={() => toggleReply(p.id)}
                    className="cursor-pointer text-sm font-medium text-blue-600 hover:underline"
                  >
                    Reply
                  </button>
                </div>

                {showReplyFor[p.id] && (
                  <div className="mt-2">
                    <textarea
                      value={replyText[p.id] || ""}
                      onChange={(e) =>
                        setReplyText((r) => ({ ...r, [p.id]: e.target.value }))
                      }
                      className="w-full rounded border border-gray-200 p-2 text-sm"
                      rows={3}
                    />
                    <div className="mt-2 flex gap-2">
                      <button
                        onClick={() => submitReply(p.id)}
                        className="rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white"
                      >
                        Reply
                      </button>
                      <button
                        onClick={() => toggleReply(p.id)}
                        className="rounded border border-gray-300 px-3 py-1 text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {(p.replies?.length ?? 0) > 0 &&
                  (() => {
                    const replies = p.replies || [];
                    const total = replies.length;
                    const isExpanded = !!expandedPosts[p.id];
                    const visible = isExpanded
                      ? replies
                      : replies.slice(0, REPLIES_SHOWN);

                    return (
                      <div className="mt-4 space-y-3">
                        {visible.map((r) => {
                          const rauthor = users.find(
                            (u) => u.id === r.authorId
                          );
                          return (
                            <div key={r.id} className="flex items-start gap-3">
                              <img
                                src={rauthor?.avatar}
                                alt={rauthor?.name}
                                className="h-8 w-8 rounded-full object-cover"
                              />
                              <div className="relative flex-1">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="font-semibold text-gray-900">
                                      {rauthor ? (
                                        <Link
                                          to={`/profile/${rauthor.id}`}
                                          className="cursor-pointer transition-colors hover:text-blue-600 hover:underline"
                                        >
                                          {rauthor.name}
                                        </Link>
                                      ) : r.authorId === currentUserId ? (
                                        "You"
                                      ) : (
                                        "Unknown"
                                      )}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      <span>{formatPostDate(r.createdAt)}</span>
                                      <span className="mx-2">•</span>
                                      <span>
                                        {formatPostClock(r.createdAt)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                {replyEditing &&
                                replyEditing.postId === p.id &&
                                replyEditing.replyId === r.id ? (
                                  <div className="mt-1">
                                    <textarea
                                      className="w-full rounded border border-gray-200 p-2 text-sm"
                                      rows={3}
                                      value={replyEditText[r.id] ?? r.content}
                                      onChange={(e) =>
                                        setReplyEditText((s) => ({
                                          ...s,
                                          [r.id]: e.target.value,
                                        }))
                                      }
                                    />
                                    <div className="mt-2 flex gap-2">
                                      <button
                                        onClick={() => {
                                          const text = (
                                            replyEditText[r.id] ?? r.content
                                          ).trim();
                                          if (text)
                                            dispatch(
                                              editReply({
                                                postId: p.id,
                                                replyId: r.id,
                                                content: text,
                                              })
                                            );
                                          setReplyEditing(null);
                                        }}
                                        className="rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white"
                                      >
                                        Save
                                      </button>
                                      <button
                                        onClick={() => setReplyEditing(null)}
                                        className="rounded border border-gray-300 px-3 py-1 text-sm"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <div>
                                    <p className="mt-1 text-justify text-sm break-words whitespace-pre-wrap text-gray-700">
                                      {r.content}
                                    </p>
                                    <div className="mt-2 flex gap-3">
                                      <button
                                        onClick={() => {
                                          setReplyEditing({
                                            postId: p.id,
                                            replyId: r.id,
                                          });
                                          setReplyEditText((s) => ({
                                            ...s,
                                            [r.id]: r.content,
                                          }));
                                        }}
                                        className="cursor-pointer text-sm font-medium text-blue-600 hover:underline"
                                      >
                                        Edit
                                      </button>
                                      <button
                                        onClick={() => {
                                          dispatch(
                                            deleteReply({
                                              postId: p.id,
                                              replyId: r.id,
                                            })
                                          );
                                        }}
                                        className="cursor-pointer text-sm font-medium text-red-600 hover:underline"
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}

                        {total > REPLIES_SHOWN && (
                          <div className="mt-1">
                            {!isExpanded ? (
                              <button
                                onClick={() => toggleExpand(p.id)}
                                className="text-sm font-medium text-gray-600 hover:underline"
                              >
                                View {total - REPLIES_SHOWN} more repl
                                {total - REPLIES_SHOWN === 1 ? "y" : "ies"}
                              </button>
                            ) : (
                              <button
                                onClick={() => toggleExpand(p.id)}
                                className="text-sm font-medium text-gray-600 hover:underline"
                              >
                                Hide replies
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })()}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostsTab;

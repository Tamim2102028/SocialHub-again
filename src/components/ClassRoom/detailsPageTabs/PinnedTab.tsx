import React from "react";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import {
  selectPostsForRoom,
  editPost,
  deletePost,
  togglePinPost,
} from "../../../store/slices/classRoom/roomPostsSlice";
import { type UserData } from "../../../data/profile-data/userData";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import Swal from "sweetalert2";
import { formatPostDate, formatPostClock } from "../../../utils/dateUtils";
import type { RoomPost } from "../../../data/rooms-data/roomPostData";

interface Props {
  roomId: string;
  users: UserData[];
}

const PinnedTab: React.FC<Props> = ({ roomId, users }) => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPostsForRoom(roomId));
  const pinned = posts
    .filter((p) => p.pinned)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const handlePostMenu = async (post: RoomPost) => {
    await Swal.fire({
      title: "Post options",
      html: `
        <div class="flex flex-col items-center gap-2 min-w-[160px]">
          <button id="swal-edit" class="w-50 px-3 py-2 rounded border border-gray-200 bg-white text-gray-700 hover:bg-gray-50">Edit</button>
          <button id="swal-unpin" class="w-50 px-3 py-2 rounded border border-gray-200 bg-white text-gray-700 hover:bg-gray-50">Unpin</button>
          <button id="swal-del" class="w-50 px-3 py-2 rounded border border-red-100 bg-white text-red-600 hover:bg-red-50">Delete</button>
        </div>
      `,
      showConfirmButton: false,
      showCloseButton: true,
      didOpen: () => {
        const popup = Swal.getPopup();
        if (!popup) return;
        const editBtn = popup.querySelector(
          "#swal-edit"
        ) as HTMLButtonElement | null;
        const unpinBtn = popup.querySelector(
          "#swal-unpin"
        ) as HTMLButtonElement | null;
        const delBtn = popup.querySelector(
          "#swal-del"
        ) as HTMLButtonElement | null;

        const onEdit = async () => {
          Swal.close();
          const { value } = await Swal.fire({
            title: "Edit post",
            input: "textarea",
            inputValue: post.content,
            showCancelButton: true,
            confirmButtonText: "Save",
          });
          if (value) {
            dispatch(editPost({ postId: post.id, content: value }));
          }
        };

        const onUnpin = () => {
          dispatch(togglePinPost(post.id));
          Swal.close();
        };

        const onDel = () => {
          dispatch(deletePost(post.id));
          Swal.close();
        };

        editBtn?.addEventListener("click", onEdit);
        unpinBtn?.addEventListener("click", onUnpin);
        delBtn?.addEventListener("click", onDel);

        const removeListeners = () => {
          editBtn?.removeEventListener("click", onEdit);
          unpinBtn?.removeEventListener("click", onUnpin);
          delBtn?.removeEventListener("click", onDel);
        };

        const observer = new MutationObserver(() => {
          if (!document.contains(popup)) {
            removeListeners();
            observer.disconnect();
          }
        });
        observer.observe(document, { childList: true, subtree: true });
      },
    });
  };

  if (pinned.length === 0)
    return (
      <div className="flex items-center justify-center rounded-lg border border-gray-200 bg-white p-8">
        <div className="max-w-md text-center">
          <h3 className="text-lg font-semibold text-gray-900">
            No pinned posts
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            There are currently no posts pinned in this room.
          </p>
        </div>
      </div>
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
                      onClick={() => handlePostMenu(p)}
                      className="p-1 text-gray-500 hover:text-gray-800"
                      aria-label="Post menu"
                    >
                      <BsThreeDots className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <p className="mt-2 text-justify break-words whitespace-pre-wrap text-gray-700">
                  {p.content}
                </p>

                {p.attachments && p.attachments.length > 0 && (
                  <div className="mt-3">
                    {(() => {
                      const images = p.attachments.filter((a) =>
                        (a.mimeType || "").startsWith("image/")
                      );
                      const others = p.attachments.filter(
                        (a) => !(a.mimeType || "").startsWith("image/")
                      );
                      return (
                        <div className="space-y-2">
                          {images.length > 0 && (
                            <div
                              className={`grid gap-2 ${images.length === 1 ? "grid-cols-1" : images.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}
                            >
                              {images.map((a) => (
                                <a
                                  key={a.id}
                                  href={a.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="overflow-hidden rounded bg-gray-100"
                                >
                                  <img
                                    src={a.url}
                                    alt={a.fileName}
                                    className="h-36 w-full object-cover"
                                  />
                                </a>
                              ))}
                            </div>
                          )}

                          {others.length > 0 && (
                            <div className="space-y-2">
                              {others.map((a) => (
                                <div
                                  key={a.id}
                                  className="flex items-center justify-between rounded border border-gray-100 bg-gray-50 p-2 text-sm"
                                >
                                  <div className="truncate text-gray-800">
                                    {a.fileName}
                                  </div>
                                  <div className="flex items-center gap-3">
                                    {a.url ? (
                                      <a
                                        href={a.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-blue-600 hover:underline"
                                      >
                                        View
                                      </a>
                                    ) : null}
                                    {a.url ? (
                                      <a
                                        download={a.fileName}
                                        href={a.url}
                                        className="text-gray-600 hover:text-gray-800"
                                      >
                                        Download
                                      </a>
                                    ) : null}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                )}

                <div className="mt-3">
                  <button
                    disabled
                    aria-disabled="true"
                    className="cursor-not-allowed text-sm font-medium text-gray-400"
                  >
                    Reply
                  </button>
                </div>

                {p.replies && p.replies.length > 0 && (
                  <div className="mt-4 space-y-3">
                    {p.replies.map((r) => {
                      const rauthor = users.find((u) => u.id === r.authorId);
                      return (
                        <div key={r.id} className="flex items-start gap-3">
                          <img
                            src={rauthor?.avatar}
                            alt={rauthor?.name}
                            className="h-8 w-8 rounded-full object-cover"
                          />
                          <div className="flex-1">
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
                                  ) : (
                                    "Unknown"
                                  )}
                                </div>
                                <div className="text-xs text-gray-500">
                                  <span>{formatPostDate(r.createdAt)}</span>
                                  <span className="mx-2">•</span>
                                  <span>{formatPostClock(r.createdAt)}</span>
                                </div>
                              </div>
                            </div>
                            <p className="mt-1 text-justify text-sm break-words whitespace-pre-wrap text-gray-700">
                              {r.content}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PinnedTab;

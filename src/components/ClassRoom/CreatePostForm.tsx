import React, { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { addPost } from "../../store/slices/classRoom/roomPostsSlice";
import type { RoomPost } from "../../data/rooms-data/roomPostData";

interface Props {
  roomId: string;
  currentUserId?: string;
  onClose?: () => void;
}

const CreatePostForm: React.FC<Props> = ({ roomId, currentUserId, onClose }) => {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    const content = text.trim();
    if (!content) return;

    const attachments = file
      ? [
          {
            id: `att-${Date.now()}`,
            fileName: file.name,
            url: URL.createObjectURL(file),
            mimeType: file.type,
            sizeKb: Math.round(file.size / 1024),
          },
        ]
      : [];

    const newPost: RoomPost = {
      id: `post-${Date.now()}`,
      roomId,
      authorId: currentUserId ?? "0",
      content,
      createdAt: new Date().toISOString(),
      replies: [],
      attachments: attachments.length ? attachments : undefined,
    };

    dispatch(addPost(newPost));
    setText("");
    if (file) setFile(null);
    onClose?.();
  };

  return (
    <div className="mx-auto max-w-5xl rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">Create post</h3>
      <textarea
        className="mt-2 w-full rounded border border-gray-200 p-2 text-sm"
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write something to the room..."
      />
      <div className="mt-2 flex items-center gap-3">
        <label className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
          <input
            type="file"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files && e.target.files[0];
              setFile(f || null);
            }}
          />
          Attach file
        </label>
        {file && (
          <div className="text-sm text-gray-700">
            {file.name} · {Math.round(file.size / 1024)} KB
            <button
              onClick={() => setFile(null)}
              className="ml-2 text-red-600 hover:underline"
            >
              Remove
            </button>
          </div>
        )}
      </div>
      <div className="mt-3 flex gap-2">
        <button
          onClick={handleSubmit}
          className="rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white disabled:opacity-50"
          disabled={text.trim() === ""}
        >
          Post
        </button>
        <button
          onClick={() => {
            setText("");
            onClose?.();
          }}
          className="rounded border border-gray-300 px-3 py-1 text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreatePostForm;

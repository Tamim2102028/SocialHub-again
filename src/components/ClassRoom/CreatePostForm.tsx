import React, { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { addPost } from "../../store/slices/classRoom/roomPostsSlice";
import type { RoomPost } from "../../data/rooms-data/roomPostData";

interface Props {
  roomId: string;
  currentUserId?: string;
  onClose?: () => void;
}

const CreatePostForm: React.FC<Props> = ({
  roomId,
  currentUserId,
  onClose,
}) => {
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    const content = text.trim();
    if (!content) return;

    const newPost: RoomPost = {
      id: `post-${Date.now()}`,
      roomId,
      authorId: currentUserId ?? "0",
      content,
      createdAt: new Date().toISOString(),
      replies: [],
    };

    dispatch(addPost(newPost));
    setText("");
    onClose?.();
  };

  return (
    <div className="mx-auto max-w-5xl rounded-lg border border-gray-500 bg-white p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">Create Post</h3>
      <textarea
        className="mt-2 w-full rounded border border-gray-200 p-2 text-sm"
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write something to the room..."
      />
      <div className="mt-2" />
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

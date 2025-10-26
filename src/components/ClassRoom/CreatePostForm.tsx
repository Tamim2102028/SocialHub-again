import React, { useState, useEffect } from "react";
import { FiFile, FiX } from "react-icons/fi";
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
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    const content = text.trim();
    if (!content) return;

    const attachments = file
      ? [
          {
            id: `att-${Date.now()}`,
            fileName: file.name,
            url: previewUrl ?? URL.createObjectURL(file),
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
    if (file) {
      setFile(null);
      // keep previewUrl for the posted attachment (it's now referenced by the post)
      setPreviewUrl(null);
    }
    onClose?.();
  };

  useEffect(() => {
    // cleanup preview URL when component unmounts or when previewUrl changes
    return () => {
      if (previewUrl) {
        try {
          URL.revokeObjectURL(previewUrl);
        } catch {
          // ignore
        }
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    setFile(f);
    if (previewUrl) {
      try {
        URL.revokeObjectURL(previewUrl);
      } catch {
        // ignore
      }
    }
    const url = URL.createObjectURL(f);
    setPreviewUrl(url);
  };

  return (
    <div className="mx-auto max-w-5xl rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">Create Post</h3>
      <textarea
        className="mt-2 w-full rounded border border-gray-200 p-2 text-sm"
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write something to the room..."
      />
      <div className="mt-2 flex items-start gap-3">
        <label className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
          <input type="file" className="hidden" onChange={handleFileChange} />
          <span className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1 text-sm font-medium hover:bg-gray-50">
            Attach File
          </span>
        </label>

        {file && (
          <div className="flex w-full items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-md bg-gradient-to-br from-gray-50 to-gray-100">
              {file.type.startsWith("image/") && previewUrl ? (
                <img
                  src={previewUrl}
                  alt={file.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-50 text-blue-700">
                  <FiFile className="h-5 w-5" />
                </div>
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <div
                  className="truncate text-sm font-semibold text-gray-900"
                  style={{ maxWidth: 420 }}
                >
                  {file.name}
                </div>
                <div className="ml-2 rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                  {file.name.split(".").pop()?.toUpperCase() ?? "FILE"}
                </div>
              </div>
              <div className="mt-1 text-xs text-gray-500">
                {(file.size / 1024).toFixed(1)} KB · {file.type || "file"}
              </div>
            </div>

            <button
              onClick={() => {
                if (previewUrl) {
                  try {
                    URL.revokeObjectURL(previewUrl);
                  } catch {
                    // ignore
                  }
                }
                setFile(null);
                setPreviewUrl(null);
              }}
              className="ml-auto inline-flex items-center gap-2 rounded-md bg-red-50 px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-100"
              aria-label="Remove attached file"
            >
              <FiX className="h-4 w-4" />
              <span>Remove</span>
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

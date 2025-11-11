import React from "react";
import { FaImage, FaVideo, FaPaperPlane } from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  setPostContent,
  setPostExpanded,
  clearPostContent,
} from "../../store/slices/uiSlice";

const CreatePost: React.FC = () => {
  const dispatch = useAppDispatch();
  const postContent = useAppSelector((state) => state.ui.createPost.content);
  const isExpanded = useAppSelector((state) => state.ui.createPost.isExpanded);
  const currentUser = useAppSelector((state) => state.profile);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postContent.trim()) {
      console.log("Creating post:", postContent);
      dispatch(clearPostContent());
    }
  };

  return (
    <div className="rounded-lg border border-gray-400 bg-white p-4 shadow">
      <form onSubmit={handleSubmit}>
        {/* User Avatar and Input */}
        <div className="flex space-x-3">
          <img
            src={currentUser.avatar || "https://via.placeholder.com/40"}
            alt={currentUser.name || "Your avatar"}
            className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
          />
          <div className="flex-1">
            <textarea
              value={postContent}
              onChange={(e) => dispatch(setPostContent(e.target.value))}
              onFocus={() => dispatch(setPostExpanded(true))}
              placeholder="What's on your mind?"
              className="w-full resize-none rounded-lg border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows={isExpanded ? 4 : 2}
            />
          </div>
        </div>

        {/* Expanded Options */}
        {isExpanded && (
          <div className="mt-4">
            {/* Media Options */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex space-x-4">
                <button
                  type="button"
                  className="flex items-center space-x-2 rounded-lg px-3 py-2 text-gray-600 transition-colors hover:bg-gray-100"
                >
                  <FaImage className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">Photo</span>
                </button>

                <button
                  type="button"
                  className="flex items-center space-x-2 rounded-lg px-3 py-2 text-gray-600 transition-colors hover:bg-gray-100"
                >
                  <FaVideo className="h-5 w-5 text-red-500" />
                  <span className="text-sm font-medium">Video</span>
                </button>
              </div>

              {/* Privacy Selector */}
              <select className="rounded-lg border border-gray-300 px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="public">🌐 Public</option>
                <option value="friends">👥 Friends</option>
                <option value="private">🔒 Only me</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  dispatch(clearPostContent());
                }}
                className="rounded-lg px-4 py-2 text-gray-600 transition-colors hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={!postContent.trim()}
                className="flex items-center space-x-2 rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FaPaperPlane className="h-4 w-4" />
                <span>Post</span>
              </button>
            </div>
          </div>
        )}

        {/* Simple Post Button (when not expanded) */}
        {!isExpanded && postContent && (
          <div className="mt-3 flex justify-end">
            <button
              type="submit"
              className="flex items-center space-x-2 rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
            >
              <FaPaperPlane className="h-4 w-4" />
              <span>Post</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreatePost;

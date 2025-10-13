import React from "react";
import { FaImage, FaVideo, FaSmile, FaPaperPlane } from "react-icons/fa";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postContent.trim()) {
      console.log("Creating post:", postContent);
      dispatch(clearPostContent());
    }
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-400 p-4">
      <form onSubmit={handleSubmit}>
        {/* User Avatar and Input */}
        <div className="flex space-x-3">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
            alt="Your avatar"
            className="h-10 w-10 rounded-full bg-gray-300 flex-shrink-0"
          />
          <div className="flex-1">
            <textarea
              value={postContent}
              onChange={(e) => dispatch(setPostContent(e.target.value))}
              onFocus={() => dispatch(setPostExpanded(true))}
              placeholder="What's on your mind?"
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={isExpanded ? 4 : 2}
            />
          </div>
        </div>

        {/* Expanded Options */}
        {isExpanded && (
          <div className="mt-4">
            {/* Media Options */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-4">
                <button
                  type="button"
                  className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FaImage className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">Photo</span>
                </button>

                <button
                  type="button"
                  className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FaVideo className="h-5 w-5 text-red-500" />
                  <span className="text-sm font-medium">Video</span>
                </button>

                <button
                  type="button"
                  className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FaSmile className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm font-medium">Feeling</span>
                </button>
              </div>

              {/* Privacy Selector */}
              <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="public">🌐 Public</option>
                <option value="friends">👥 Friends</option>
                <option value="private">🔒 Only me</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => {
                  dispatch(clearPostContent());
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={!postContent.trim()}
                className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FaPaperPlane className="h-4 w-4" />
                <span>Post</span>
              </button>
            </div>
          </div>
        )}

        {/* Simple Post Button (when not expanded) */}
        {!isExpanded && postContent && (
          <div className="flex justify-end mt-3">
            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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

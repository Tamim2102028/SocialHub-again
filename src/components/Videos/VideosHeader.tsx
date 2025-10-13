import React from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setVideoFilter } from "../../store/slices/uiSlice";

const VideosHeader: React.FC = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.ui.videos.filter);

  return (
    <div className="mb-6 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-900">Videos</h1>

      {/* Filter Tabs */}
      <div className="flex space-x-4">
        <button
          onClick={() => dispatch(setVideoFilter("all"))}
          className={`rounded-lg px-4 py-2 font-medium transition-colors ${
            filter === "all"
              ? "bg-blue-600 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          All
        </button>
        <button
          onClick={() => dispatch(setVideoFilter("trending"))}
          className={`rounded-lg px-4 py-2 font-medium transition-colors ${
            filter === "trending"
              ? "bg-blue-600 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Trending
        </button>
        <button
          onClick={() => dispatch(setVideoFilter("recent"))}
          className={`rounded-lg px-4 py-2 font-medium transition-colors ${
            filter === "recent"
              ? "bg-blue-600 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Recent
        </button>
      </div>
    </div>
  );
};

export default VideosHeader;

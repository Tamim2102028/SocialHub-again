import React from "react";
import { FaHashtag } from "react-icons/fa";
import { mockSearchResults } from "./data/searchData";

interface HashtagsResultsProps {
  searchQuery: string;
  isVisible: boolean;
}

const HashtagsResults: React.FC<HashtagsResultsProps> = ({
  searchQuery,
  isVisible,
}) => {
  if (!isVisible) return null;

  const handleHashtagClick = (tag: string) => {
    console.log("Navigating to hashtag:", tag);
  };

  // Filter hashtags based on search query
  const filteredHashtags = mockSearchResults.hashtags.filter((hashtag) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return hashtag.tag.toLowerCase().includes(query);
  });

  if (filteredHashtags.length === 0) return null;

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold text-gray-900">
        Hashtags ({filteredHashtags.length})
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredHashtags.map((hashtag) => (
          <div
            key={hashtag.tag}
            onClick={() => handleHashtagClick(hashtag.tag)}
            className="cursor-pointer rounded-lg bg-white p-4 shadow-sm transition-all hover:scale-105 hover:shadow-md"
          >
            <div className="flex items-center space-x-3">
              <FaHashtag className="h-6 w-6 text-green-600" />
              <div>
                <h3 className="font-semibold text-gray-900">{hashtag.tag}</h3>
                <p className="text-sm text-gray-600">{hashtag.posts}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HashtagsResults;

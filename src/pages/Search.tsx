import React, { useState } from "react";
import SearchHeader from "../components/Search/SearchHeader";
import SearchBar from "../components/Search/SearchBar";
import SearchFilters from "../components/Search/SearchFilters";
import PeopleResults from "../components/Search/PeopleResults";
import PostsResults from "../components/Search/PostsResults";
import HashtagsResults from "../components/Search/HashtagsResults";

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <>
      <SearchHeader />
      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <SearchFilters
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* Search Results */}
      <div className="space-y-5">
        <PeopleResults
          searchQuery={searchQuery}
          isVisible={activeFilter === "all" || activeFilter === "people"}
        />
        <PostsResults
          searchQuery={searchQuery}
          isVisible={activeFilter === "all" || activeFilter === "posts"}
        />
        <HashtagsResults
          searchQuery={searchQuery}
          isVisible={activeFilter === "all" || activeFilter === "hashtags"}
        />
      </div>

      {/* No Results */}
      {searchQuery && (
        <div className="mt-12 text-center">
          <div className="mb-4 text-6xl">🔍</div>
          <h3 className="mb-2 text-xl font-semibold text-gray-900">
            No results found
          </h3>
          <p className="text-gray-600">
            Try searching with different keywords or check your spelling
          </p>
        </div>
      )}
    </>
  );
};

export default Search;

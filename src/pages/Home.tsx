import React, { useState, useEffect } from "react";
import { useAppSelector } from "../store/hooks";
import HomePostCard from "../components/Home/HomePostCard";
import CreatePost from "../components/Home/CreatePost";
import LoadingSkeleton from "../components/Home/LoadingSkeleton";
import DailyXPClaim from "../components/Gaming/Dashboard/DailyXPClaim";

const Home: React.FC = () => {
  const { posts, loading } = useAppSelector((state) => state.posts);
  const { lastClaimDate } = useAppSelector((state) => state.tournament);
  const [canClaim, setCanClaim] = useState(false);

  // Check if user can claim today
  useEffect(() => {
    const today = new Date().toDateString();
    const lastClaim = lastClaimDate
      ? new Date(lastClaimDate).toDateString()
      : null;

    // Can claim if never claimed OR last claim was not today
    setCanClaim(!lastClaim || lastClaim !== today);
  }, [lastClaimDate]);

  if (loading) {
    return (
      <>
        {/* Loading skeleton */}
        <LoadingSkeleton />
      </>
    );
  }

  return (
    <>
      {/* Daily XP Claim - Only show if can claim today */}
      {canClaim && <DailyXPClaim />}

      {/* Create Post Section */}
      <CreatePost />

      {/* Feed Header */}
      <h2 className="text-xl font-semibold text-gray-900">Latest Posts</h2>

      {/* Posts List */}
      <div className="space-y-5">
        {posts.map((post) => (
          <HomePostCard key={post.postId} post={post} />
        ))}
      </div>

      {/* Load More Button */}
      <div className="flex justify-center">
        <button className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-gray-700 transition-colors hover:bg-gray-50">
          Load more posts
        </button>
      </div>
    </>
  );
};

export default Home;

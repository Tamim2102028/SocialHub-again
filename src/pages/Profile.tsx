import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaEdit,
  FaUser,
  FaUniversity,
  FaFolder,
  FaFileAlt,
  FaBookmark,
} from "react-icons/fa";
import { getPostsByUserId } from "../data/postData";
import { getUserById, getCurrentUserId } from "../data/userData";
import { getPublicFoldersByUserId } from "../data/publicFilesData";
import ProfilePosts from "../components/Profile/ProfilePosts";
import PublicFiles from "../components/Profile/PublicFiles";
import PageLoader from "./Fallbacks/PageLoader";

const Profile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"posts" | "files">("posts");
  const [isLoading, setIsLoading] = useState(true);

  // Get current user ID
  const currentUserId = getCurrentUserId();

  // Check if viewing own profile
  const isOwnProfile = !userId || userId === currentUserId;

  // Get actual user ID (default to current user ID)
  const actualUserId = userId || currentUserId;

  // Get dynamic user data based on userId
  // Always get from userData.ts for consistency and dynamic data
  const userData = getUserById(actualUserId);

  // Get user's posts
  const userPosts = getPostsByUserId(actualUserId);

  // Get user's public folders
  const userPublicFolders = getPublicFoldersByUserId(actualUserId);

  useEffect(() => {
    // Debug: Log the data being used
    console.log("Profile Debug:", {
      userId,
      actualUserId,
      isOwnProfile,
      userData: userData
        ? {
            id: userData.id,
            name: userData.name,
            username: userData.username,
            university: userData.university,
            avatar: userData.avatar,
            bio: userData.bio,
          }
        : null,
      currentUserId,
      userPosts: userPosts.length,
      userPublicFolders: userPublicFolders.length,
    });

    // Set loading to false after component mounts
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [
    userData,
    userId,
    actualUserId,
    isOwnProfile,
    currentUserId,
    userPosts.length,
    userPublicFolders.length,
  ]);

  // If user not found, show error
  if (!userData) {
    return (
      <>
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">User Not Found</h2>
          <p className="mt-2 text-gray-600">
            The user you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Go Home
          </button>
        </div>
      </>
    );
  }

  const handleEditProfile = () => {
    navigate("/profile/edit");
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <>
      {/* Profile Card */}
      <div className="rounded-lg border border-gray-300 bg-white p-5 shadow-sm">
        {/* Profile Header */}
        <div className="flex items-start space-x-5">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <img
              src={userData.avatar}
              alt={userData.name}
              className="h-32 w-32 rounded-full border-4 border-white shadow-lg"
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1 space-y-3">
            {/* Name and Username */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {userData.name}
              </h1>
              <p className="flex items-center gap-2 text-lg text-gray-600">
                <FaUser className="h-4 w-4" />@{userData.username}
              </p>
            </div>

            {/* Bio */}
            <div>
              <p className="leading-relaxed text-gray-700">{userData.bio}</p>
            </div>

            {/* University */}
            <div className="flex items-center gap-2">
              <FaUniversity className="h-4 w-4 text-blue-600" />
              <p className="font-medium text-gray-800">{userData.university}</p>
            </div>

            {/* Edit Button (only for own profile) */}
            {isOwnProfile && (
              <div className="pt-4">
                <button
                  onClick={handleEditProfile}
                  className="flex items-center gap-2 rounded-md bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
                >
                  <FaEdit className="h-4 w-4" />
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="rounded-t-lg border-b border-gray-200 bg-white">
        <nav className="flex space-x-8 px-6" aria-label="Profile sections">
          <button
            onClick={() => setActiveTab("posts")}
            className={`border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
              activeTab === "posts"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:border-black hover:text-black"
            }`}
          >
            <FaFileAlt className="mr-2 inline h-4 w-4" />
            Posts ({userPosts.length})
          </button>

          {/* Only show Public Files tab if viewing someone else's profile or if current user has public folders */}
          {(!isOwnProfile || userPublicFolders.length > 0) && (
            <button
              onClick={() => setActiveTab("files")}
              className={`border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
                activeTab === "files"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:border-black hover:text-black"
              }`}
            >
              <FaFolder className="mr-2 inline h-4 w-4" />
              Public Files ({userPublicFolders.length})
            </button>
          )}

          <button
            onClick={() => navigate("/profile/saved")}
            className={`px-1 py-4 text-sm font-medium text-gray-500 transition-colors hover:text-black`}
          >
            <FaBookmark className="mr-2 inline h-4 w-4" />
            Saved
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "posts" && (
          <div className="space-y-3">
            <ProfilePosts
              posts={userPosts}
              isOwnProfile={isOwnProfile}
              userData={{
                name: userData?.name || "User",
                username: userData?.username || "username",
                avatar: userData?.avatar || "https://via.placeholder.com/40",
              }}
            />
          </div>
        )}

        {activeTab === "files" && (
          <div className="space-y-3">
            <PublicFiles
              publicFolders={userPublicFolders}
              userName={userData.name}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;

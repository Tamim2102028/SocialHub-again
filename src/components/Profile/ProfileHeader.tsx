import React from "react";
import {
  FaEdit,
  FaUserPlus,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaLink,
} from "react-icons/fa";

interface UserData {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  location: string;
  joinDate: string;
  website: string;
  coverPhoto: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
    friends: number;
  };
}

interface ProfileHeaderProps {
  userData: UserData;
  isOwnProfile: boolean;
  onEditProfile?: () => void;
  onFollow?: () => void;
  onMessage?: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  userData,
  isOwnProfile,
  onEditProfile,
  onFollow,
  onMessage,
}) => {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      {/* Cover Photo */}
      <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600 md:h-64">
        <img
          src={userData.coverPhoto}
          alt="Cover"
          className="h-full w-full object-cover"
        />
        {isOwnProfile && (
          <button
            onClick={onEditProfile}
            className="bg-opacity-90 hover:bg-opacity-100 absolute right-4 bottom-4 rounded-lg bg-white px-3 py-2 text-sm font-medium transition-all"
          >
            <FaEdit className="mr-2 inline" />
            Edit Profile
          </button>
        )}
      </div>

      {/* Profile Info */}
      <div className="px-6 pb-6">
        <div className="-mt-16 flex flex-col items-center md:-mt-20 md:flex-row md:items-end">
          {/* Profile Picture */}
          <div className="relative">
            <img
              src={userData.avatar}
              alt={userData.name}
              className="h-32 w-32 rounded-full border-4 border-white bg-white shadow-lg md:h-40 md:w-40"
            />
          </div>

          {/* User Info */}
          <div className="mt-4 flex-1 text-center md:mt-0 md:ml-6 md:text-left">
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              {userData.name}
            </h1>
            <p className="text-lg text-gray-600">@{userData.username}</p>
            <p className="mt-2 max-w-2xl text-gray-700">{userData.bio}</p>

            {/* User Details */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600 md:justify-start">
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-1" />
                {userData.location}
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="mr-1" />
                Joined {userData.joinDate}
              </div>
              <div className="flex items-center">
                <FaLink className="mr-1" />
                <a
                  href={userData.website}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {userData.website}
                </a>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex items-center space-x-3 md:mt-0">
            {!isOwnProfile && (
              <>
                <button
                  onClick={onFollow}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                >
                  <FaUserPlus className="mr-2 inline" />
                  Follow
                </button>
                <button
                  onClick={onMessage}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
                >
                  <FaEnvelope className="mr-2 inline" />
                  Message
                </button>
              </>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 flex justify-center space-x-8 border-t border-gray-200 pt-6 md:justify-start">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {userData.stats.posts.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Posts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {userData.stats.followers.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {userData.stats.following.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Following</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {userData.stats.friends.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Friends</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;

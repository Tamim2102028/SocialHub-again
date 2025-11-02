import React from "react";
import { FaEdit, FaUserPlus, FaEnvelope } from "react-icons/fa";
import { useAppSelector } from "../../store/hooks";
import { selectFriendCount, selectPendingRequestsForUser } from "../../store/slices/friendsSlice";
import type { RootState } from "../../store/store";

interface UserData {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  university: string;
  gender?: "male" | "female";
  saved?: string[];
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
  // Get friend count and pending requests from Redux
  const friendCount = useAppSelector((s: RootState) =>
    selectFriendCount(s, userData.id)
  );
  const pendingRequestCount = useAppSelector((s: RootState) =>
    selectPendingRequestsForUser(s, userData.id).length
  );

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      {/* Profile Info */}
      <div className="px-6 py-6">
        <div className="flex flex-col items-center md:flex-row md:items-start">
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

            {/* University */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600 md:justify-start">
              <div className="flex items-center">
                <span className="font-medium">University:</span>
                <span className="ml-1">{userData.university}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex items-center space-x-3 md:mt-0">
            {isOwnProfile ? (
              <button
                onClick={onEditProfile}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
              >
                <FaEdit className="mr-2 inline" />
                Edit Profile
              </button>
            ) : (
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
              {friendCount}
            </div>
            <div className="text-sm text-gray-600">Friends</div>
          </div>
          {pendingRequestCount > 0 && (
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {pendingRequestCount}
              </div>
              <div className="text-sm text-gray-600">Pending Requests</div>
            </div>
          )}
          {userData.saved && (
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {userData.saved.length}
              </div>
              <div className="text-sm text-gray-600">Saved Posts</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;

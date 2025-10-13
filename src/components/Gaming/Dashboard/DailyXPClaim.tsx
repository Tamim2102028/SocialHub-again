import React, { useState, useEffect } from "react";
import { FaGift, FaClock, FaTrophy, FaCoins } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { claimDailyXP } from "../../../store/slices/tournamentSlice.ts";

const DailyXPClaim: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userXP, lastClaimDate } = useAppSelector((state) => state.tournament);

  const [canClaim, setCanClaim] = useState(false);
  const [timeUntilMidnight, setTimeUntilMidnight] = useState("");

  // Check if user can claim today
  useEffect(() => {
    const checkClaimAvailability = () => {
      const today = dayjs().format("YYYY-MM-DD");
      const lastClaim = lastClaimDate
        ? dayjs(lastClaimDate).format("YYYY-MM-DD")
        : null;

      // Can claim if never claimed OR last claim was not today
      setCanClaim(!lastClaim || lastClaim !== today);
    };

    checkClaimAvailability();
    // Check every minute in case they're waiting for midnight
    const interval = setInterval(checkClaimAvailability, 60000);
    return () => clearInterval(interval);
  }, [lastClaimDate]);

  // Calculate time until midnight
  useEffect(() => {
    const updateCountdown = () => {
      const now = dayjs();
      const midnight = dayjs().endOf("day");

      const totalSeconds = midnight.diff(now, "second");
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimeUntilMidnight(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleClaim = () => {
    dispatch(claimDailyXP());
  };

  return (
    <div className="relative space-y-3 overflow-hidden rounded-lg border border-gray-200 bg-white p-5 shadow">
      {/* Header with Stats */}
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-1">
          <h3 className="mb-1 text-2xl font-bold text-blue-600">
            Daily XP Claim
          </h3>
          <p className="text-sm text-gray-600">
            Claim your free 10 XP every day to participate in tournaments!
          </p>
          {canClaim && (
            <p className="text-sm font-medium text-orange-700">
              Claim expires at midnight ({timeUntilMidnight} remaining)
            </p>
          )}
        </div>
        <div className="flex gap-3">
          <div className="rounded-lg border border-gray-200 bg-green-50 px-4 py-2 text-center">
            <FaGift className="mx-auto mb-1 text-xl text-green-600" />
            <p className="text-xs text-gray-500">Daily Reward</p>
            <p className="font-bold text-gray-800">10 XP</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-orange-50 px-4 py-2 text-center">
            <FaCoins className="mx-auto mb-1 text-xl text-orange-600" />
            <p className="text-xs text-gray-500">Your XP</p>
            <p className="font-bold text-gray-800">{userXP} XP</p>
          </div>
        </div>
      </div>

      {/* Claim Button Section */}
      <div className="space-y-3">
        {!canClaim && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-center">
            <p className="text-sm font-medium text-green-700">
              ✅ Already claimed today!
            </p>
            <div className="mt-2 flex items-center justify-center gap-2 text-xs text-gray-600">
              <FaClock />
              <span>
                Next claim available in:{" "}
                <span className="font-bold text-blue-600">
                  {timeUntilMidnight}
                </span>
              </span>
            </div>
          </div>
        )}

        <button
          onClick={handleClaim}
          disabled={!canClaim}
          className={`w-full rounded-lg py-3 font-semibold text-white shadow transition-all ${
            canClaim
              ? "bg-blue-600 hover:bg-blue-700 active:scale-95"
              : "cursor-not-allowed bg-gray-400"
          }`}
        >
          {canClaim ? (
            <span className="flex items-center justify-center gap-2">
              <FaGift />
              Claim 10 XP Now
            </span>
          ) : (
            "Already Claimed Today"
          )}
        </button>

        <button
          onClick={() => navigate("/gaming/tournament")}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-blue-300 bg-white py-3 font-medium text-blue-600 transition-all hover:border-blue-400 hover:bg-blue-50 active:scale-95"
        >
          <FaTrophy />
          View Tournament
        </button>
      </div>
    </div>
  );
};

export default DailyXPClaim;

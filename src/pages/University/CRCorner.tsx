import React, { useState } from "react";
import {
  FaPoll,
  FaComments,
  FaPlus,
  FaBullhorn,
  FaFile,
  FaTimes,
} from "react-icons/fa";

interface Poll {
  id: number;
  question: string;
  options: { id: number; text: string; votes: number }[];
  totalVotes: number;
}

interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  postedBy: string;
  hasFile?: boolean;
  fileName?: string;
}

const CRCorner: React.FC = () => {
  const [selectedPoll, setSelectedPoll] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [attachedFile, setAttachedFile] = useState<File | null>(null);

  const [polls, setPolls] = useState<Poll[]>([
    {
      id: 1,
      question: "Do you support the new midterm exam schedule?",
      options: [
        { id: 1, text: "Yes, it works for me", votes: 45 },
        { id: 2, text: "No, needs adjustment", votes: 23 },
        { id: 3, text: "Neutral/Don't care", votes: 12 },
      ],
      totalVotes: 80,
    },
  ]);

  const announcements: Announcement[] = [
    {
      id: 1,
      title: "Class Representative Meeting",
      content:
        "All CRs are requested to attend the monthly meeting in Room 301.",
      date: "Oct 5, 2025",
      postedBy: "Tamim Ahmed (CR)",
    },
    {
      id: 2,
      title: "Circuit Analysis Notes - Shared by Sir",
      content:
        "Our professor has shared the complete lecture notes for Circuit Analysis. Download and study before the midterm exam.",
      date: "Oct 3, 2025",
      postedBy: "Sadia Rahman (CR)",
      hasFile: true,
      fileName: "Circuit_Analysis_Notes.pdf",
    },
    {
      id: 3,
      title: "Assignment Deadline Extended",
      content:
        "Good news! The CSE 305 assignment deadline has been extended to Oct 15. Make sure to submit on time.",
      date: "Oct 2, 2025",
      postedBy: "Tamim Ahmed (CR)",
    },
  ];

  const handleVote = (pollId: number, optionId: number) => {
    setPolls((prevPolls) =>
      prevPolls.map((poll) => {
        if (poll.id === pollId) {
          const updatedOptions = poll.options.map((option) => {
            // If this was previously selected and we're changing, decrease its count
            if (option.id === selectedPoll && selectedPoll !== optionId) {
              return { ...option, votes: option.votes - 1 };
            }
            // If this is the newly selected option, increase its count
            if (option.id === optionId && selectedPoll !== optionId) {
              return { ...option, votes: option.votes + 1 };
            }
            return option;
          });

          // Update total votes only when voting for the first time
          const totalVotes =
            selectedPoll === null ? poll.totalVotes + 1 : poll.totalVotes;

          return { ...poll, options: updatedOptions, totalVotes };
        }
        return poll;
      })
    );

    setSelectedPoll(optionId);
  };

  const handleCancelVote = (pollId: number) => {
    if (selectedPoll === null) return;

    setPolls((prevPolls) =>
      prevPolls.map((poll) => {
        if (poll.id === pollId) {
          const updatedOptions = poll.options.map((option) => {
            // Decrease vote count for the selected option
            if (option.id === selectedPoll) {
              return { ...option, votes: option.votes - 1 };
            }
            return option;
          });

          return {
            ...poll,
            options: updatedOptions,
            totalVotes: poll.totalVotes - 1,
          };
        }
        return poll;
      })
    );

    setSelectedPoll(null);
  };

  const handleSendFeedback = () => {
    if (feedback.trim()) {
      alert("Feedback sent successfully!");
      setFeedback("");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachedFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setAttachedFile(null);
  };

  const handleCreatePost = () => {
    if (postTitle.trim() && postContent.trim()) {
      alert("Announcement posted successfully!");
      setPostTitle("");
      setPostContent("");
      setAttachedFile(null);
      setShowCreatePost(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Header with Create Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">CR Corner</h1>
          <p className="mt-1 text-gray-600">
            Connect with your Class Representative and participate in class
            decisions
          </p>
        </div>
        <button
          onClick={() => setShowCreatePost(!showCreatePost)}
          className="flex items-center gap-2 rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 transition-colors hover:border-blue-400 hover:bg-blue-100"
        >
          <FaPlus className="h-5 w-5" />
          Create Announcement
        </button>
      </div>

      {/* Create Post Form - Full Width */}
      {showCreatePost && (
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaBullhorn className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                New Announcement
              </h3>
            </div>
            <button
              onClick={() => setShowCreatePost(false)}
              className="rounded p-1 text-gray-500 hover:bg-gray-100"
            >
              <FaTimes className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Announcement Title"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />

            <textarea
              placeholder="Write your announcement here..."
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              rows={4}
              className="w-full resize-none rounded-md border border-gray-300 px-4 py-3 text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />

            {/* File Attachment */}
            {attachedFile ? (
              <div className="flex items-center justify-between rounded-md border border-gray-300 bg-gray-50 p-3">
                <div className="flex items-center gap-2">
                  <FaFile className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-700">
                    {attachedFile.name}
                  </span>
                </div>
                <button
                  onClick={handleRemoveFile}
                  className="rounded p-1 text-red-500 hover:bg-red-50"
                >
                  <FaTimes className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-dashed border-gray-300 p-3 transition-colors hover:border-blue-400 hover:bg-blue-50">
                <FaFile className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-600">
                  Attach file (Notes, Assignment, etc.)
                </span>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png"
                />
              </label>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setShowCreatePost(false)}
                className="flex-1 rounded-md border border-gray-300 py-2.5 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePost}
                disabled={!postTitle.trim() || !postContent.trim()}
                className="flex-1 rounded-md bg-blue-600 py-2.5 text-base font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CR Announcements - Full Width */}
      <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <FaBullhorn className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Announcements</h2>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="flex flex-col rounded-md border border-gray-200 bg-gray-50 p-3 transition-shadow hover:shadow-sm"
            >
              <h4 className="mb-2 line-clamp-2 text-base font-semibold text-gray-900">
                {announcement.title}
              </h4>
              <p className="mb-3 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-700">
                {announcement.content}
              </p>

              {/* File Attachment Display */}
              {announcement.hasFile && (
                <div className="mb-3 flex items-center justify-between rounded bg-blue-50 px-3 py-2">
                  <div className="flex min-w-0 flex-1 items-center gap-2">
                    <FaFile className="h-4 w-4 flex-shrink-0 text-blue-600" />
                    <span className="truncate text-sm font-medium text-blue-700">
                      {announcement.fileName}
                    </span>
                  </div>
                  <button className="ml-2 flex-shrink-0 text-sm font-semibold text-blue-600 hover:text-blue-800">
                    Download
                  </button>
                </div>
              )}

              <div className="mt-auto flex items-center justify-between border-t border-gray-200 pt-3 text-sm text-gray-500">
                <span className="truncate font-medium">
                  {announcement.postedBy}
                </span>
                <span className="ml-2 flex-shrink-0">{announcement.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Poll - Full Width */}
      <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaPoll className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Active Poll</h2>
          </div>
          {selectedPoll !== null && (
            <button
              onClick={() => handleCancelVote(polls[0].id)}
              className="rounded-md border border-red-300 bg-red-50 px-4 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
            >
              Cancel Vote
            </button>
          )}
        </div>

        {polls.map((poll) => (
          <div key={poll.id}>
            <h3 className="mb-4 text-base font-medium text-gray-900">
              {poll.question}
            </h3>

            <div className="space-y-3">
              {poll.options.map((option) => {
                const percentage = (
                  (option.votes / poll.totalVotes) *
                  100
                ).toFixed(1);
                const isSelected = selectedPoll === option.id;

                return (
                  <div
                    key={option.id}
                    className={`relative w-full cursor-pointer overflow-hidden rounded-md border p-4 transition-all ${
                      isSelected
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50"
                    }`}
                    onClick={() => handleVote(poll.id, option.id)}
                  >
                    <div className="relative flex items-center justify-between">
                      <span className="text-base font-medium text-gray-900">
                        {option.text}
                      </span>
                      <span className="text-sm font-semibold text-blue-600">
                        {percentage}% ({option.votes} votes)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Poll Feedback Section */}
            <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <div className="mb-3 flex items-center gap-2">
                <FaComments className="h-4 w-4 text-blue-600" />
                <h4 className="text-base font-semibold text-gray-900">
                  Share Your Thoughts on This Poll
                </h4>
              </div>

              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full rounded-md border border-blue-700 p-3 text-sm text-gray-900 placeholder-gray-500"
                rows={3}
                placeholder="Share your opinion, concerns, or suggestions about this poll..."
              />

              <div className="mt-3 flex items-center justify-between">
                <p>Your feedback will be sent anonymously</p>
                <button
                  onClick={handleSendFeedback}
                  disabled={!feedback.trim()}
                  className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  Send Feedback
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CRCorner;

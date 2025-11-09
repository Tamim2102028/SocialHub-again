import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { selectUserById } from "../../store/slices/profileSlice";
import type { RootState } from "../../store/store";
import {
  FaPoll,
  FaComments,
  FaPlus,
  FaBullhorn,
  FaFile,
  FaTimes,
} from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

interface Poll {
  id: number;
  question: string;
  options: { id: number; text: string; votes: number }[];
  totalVotes: number;
  isEnded?: boolean;
  endedAt?: string;
}

interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  postedBy: string;
  postedById?: string;
  hasFile?: boolean;
  fileName?: string;
  fileUrl?: string;
  readBy?: string[]; // list of userIds who have marked this announcement as read
}

const CRCorner: React.FC = () => {
  // track selected option per poll: { [pollId]: optionId }
  const [selectedPolls, setSelectedPolls] = useState<
    Record<number, number | null>
  >({});
  const [feedback, setFeedback] = useState("");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [attachedFile, setAttachedFile] = useState<File | null>(null);

  // Poll creation state
  const [showCreatePoll, setShowCreatePoll] = useState(false);
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState<string[]>(["", ""]);

  // current logged-in user (from profile slice)
  const currentUser = useAppSelector((s: RootState) =>
    selectUserById(s, s.profile.id)
  );
  const navigate = useNavigate();

  const isCurrentUserCr = !!currentUser?.university?.isCr;

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
    {
      id: 2,
      question: "Should we organize a class trip this semester?",
      options: [
        { id: 1, text: "Yes, definitely!", votes: 67 },
        { id: 2, text: "Maybe next semester", votes: 28 },
        { id: 3, text: "Not interested", votes: 15 },
      ],
      totalVotes: 110,
      isEnded: true,
      endedAt: "Nov 5, 2025 at 3:45 PM",
    },
    {
      id: 3,
      question: "Which topic should we focus on for the study group?",
      options: [
        { id: 1, text: "Data Structures", votes: 42 },
        { id: 2, text: "Algorithms", votes: 38 },
        { id: 3, text: "Database Systems", votes: 25 },
        { id: 4, text: "Operating Systems", votes: 20 },
      ],
      totalVotes: 125,
      isEnded: true,
      endedAt: "Nov 3, 2025 at 10:30 AM",
    },
  ]);

  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: 1,
      title: "Class Representative Meeting",
      content:
        "All CRs are requested to attend the monthly meeting in Room 301.",
      date: "Oct 5, 2025",
      postedBy: "Tamim Ahmed",
      postedById: "tamim-id",
      readBy: [],
    },
    {
      id: 2,
      title: "Circuit Analysis Notes - Shared by Sir",
      content:
        "Our professor has shared the complete lecture notes for Circuit Analysis. Download and study before the midterm exam.",
      date: "Oct 3, 2025",
      postedBy: "Sadia Rahman",
      postedById: "sadia-id",
      readBy: [],
      hasFile: true,
      fileName: "Circuit_Analysis_Notes.pdf",
    },
    {
      id: 3,
      title: "Assignment Deadline Extended",
      content:
        "Good news! The CSE 305 assignment deadline has been extended to Oct 15. Make sure to submit on time.",
      date: "Oct 2, 2025",
      postedBy: "Tamim Ahmed",
      postedById: "tamim-id",
      readBy: [],
    },
  ]);

  // Toggle read state for a given announcement for the current user
  const toggleRead = (id: number) => {
    if (!currentUser?.id) return; // require logged-in user
    const userId = currentUser.id;
    setAnnouncements((prev) =>
      prev.map((a) => {
        if (a.id !== id) return a;
        const readSet = new Set(a.readBy || []);
        // Only add the user id (one-way). If already present, do nothing.
        if (readSet.has(userId)) return a;
        readSet.add(userId);
        return { ...a, readBy: Array.from(readSet) };
      })
    );
  };

  const handleVote = (pollId: number, optionId: number) => {
    const prevSelected = selectedPolls[pollId] ?? null;

    setPolls((prevPolls) =>
      prevPolls.map((poll) => {
        if (poll.id === pollId) {
          const updatedOptions = poll.options.map((option) => {
            // If this was previously selected and we're changing, decrease its count
            if (option.id === prevSelected && prevSelected !== optionId) {
              return { ...option, votes: option.votes - 1 };
            }
            // If this is the newly selected option, increase its count
            if (option.id === optionId && prevSelected !== optionId) {
              return { ...option, votes: option.votes + 1 };
            }
            return option;
          });

          // Update total votes only when voting for the first time for this poll
          const totalVotes =
            prevSelected === null ? poll.totalVotes + 1 : poll.totalVotes;

          return { ...poll, options: updatedOptions, totalVotes };
        }
        return poll;
      })
    );

    setSelectedPolls((prev) => ({ ...prev, [pollId]: optionId }));
  };

  const handleCancelVote = (pollId: number) => {
    const prevSelected = selectedPolls[pollId] ?? null;
    if (prevSelected === null) return;

    setPolls((prevPolls) =>
      prevPolls.map((poll) => {
        if (poll.id === pollId) {
          const updatedOptions = poll.options.map((option) => {
            // Decrease vote count for the previously selected option
            if (option.id === prevSelected) {
              return { ...option, votes: option.votes - 1 };
            }
            return option;
          });

          return {
            ...poll,
            options: updatedOptions,
            totalVotes: Math.max(0, poll.totalVotes - 1),
          };
        }
        return poll;
      })
    );

    setSelectedPolls((prev) => ({ ...prev, [pollId]: null }));
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
    if (!isCurrentUserCr) {
      alert("Only Class Representatives can create announcements.");
      return;
    }

    if (postTitle.trim() && postContent.trim()) {
      const newAnnouncement: Announcement = {
        id: Date.now(),
        title: postTitle.trim(),
        content: postContent.trim(),
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        // use the logged-in user's name if available
        postedBy: currentUser?.name || "CR",
        postedById: currentUser?.id,
        hasFile: !!attachedFile,
        fileName: attachedFile ? attachedFile.name : undefined,
        readBy: [],
      };

      // If there's an attached file, we store it in-memory using URL.createObjectURL
      if (attachedFile) {
        // attach a temporary download URL (not persisted)
        newAnnouncement.fileUrl = URL.createObjectURL(attachedFile);
      }

      setAnnouncements((prev) => [newAnnouncement, ...prev]);
      setPostTitle("");
      setPostContent("");
      setAttachedFile(null);
      setShowCreatePost(false);
    }
  };

  // Poll creation helpers
  const addPollOption = () => setPollOptions((s) => [...s, ""]);
  const removePollOption = (index: number) =>
    setPollOptions((s) => s.filter((_, i) => i !== index));
  const updatePollOption = (index: number, value: string) =>
    setPollOptions((s) => s.map((o, i) => (i === index ? value : o)));

  const handleCreatePoll = () => {
    if (!isCurrentUserCr) {
      alert("Only Class Representatives can create polls.");
      return;
    }

    const q = pollQuestion.trim();
    const opts = pollOptions.map((o) => o.trim()).filter(Boolean);
    if (!q || opts.length < 2) {
      alert("Please provide a question and at least two options.");
      return;
    }

    const newPoll: Poll = {
      id: Date.now(),
      question: q,
      options: opts.map((text, i) => ({ id: i + 1, text, votes: 0 })),
      totalVotes: 0,
    };

    setPolls((prev) => [newPoll, ...prev]);
    setPollQuestion("");
    setPollOptions(["", ""]);
    setShowCreatePoll(false);
  };

  const handleDownload = (announcement: Announcement) => {
    const maybeUrl = announcement.fileUrl;
    if (maybeUrl) {
      const link = document.createElement("a");
      link.href = maybeUrl;
      link.download = announcement.fileName || "attachment";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // Revoke object URL after a short delay
      setTimeout(() => URL.revokeObjectURL(maybeUrl), 5000);
      return;
    }

    // Fallback: just alert the filename (real app would fetch from server)
    alert(`Downloading ${announcement.fileName || "file"}`);
  };

  // track which announcement ids are expanded
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const toggleExpanded = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // which announcement menu is open (id -> boolean)
  const [menuOpenFor, setMenuOpenFor] = useState<number | null>(null);

  // which ended polls are expanded (full view)
  const [expandedPolls, setExpandedPolls] = useState<Record<number, boolean>>(
    {}
  );

  const toggleMenu = (id: number) => {
    setMenuOpenFor((prev) => (prev === id ? null : id));
  };

  const handleDeleteAnnouncement = (id: number) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    // close menu if it was open
    if (menuOpenFor === id) setMenuOpenFor(null);
  };

  const handleDeletePoll = (id: number) => {
    setPolls((prev) => prev.filter((p) => p.id !== id));
  };

  const handleEndPoll = (id: number) => {
    const now = new Date();
    const date = now.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const time = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    setPolls((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              isEnded: true,
              endedAt: `${date} at ${time}`,
            }
          : p
      )
    );
  };

  const toggleExpandPoll = (id: number) => {
    setExpandedPolls((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleReopenPoll = (id: number) => {
    setPolls((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              isEnded: false,
              endedAt: undefined,
            }
          : p
      )
    );
  };

  return (
    <div className="space-y-5">
      {/* Header with Create Button */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">CR Corner</h1>

        {isCurrentUserCr ? (
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowCreatePost(!showCreatePost)}
              className="flex items-center gap-2 rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 transition-colors hover:border-blue-400 hover:bg-blue-100"
            >
              <FaPlus className="h-4 w-4" />
              Announcement
            </button>
            <button
              onClick={() => setShowCreatePoll((s) => !s)}
              className="flex items-center gap-2 rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 transition-colors hover:border-blue-400 hover:bg-blue-100"
            >
              <FaPlus className="h-4 w-4" />
              Poll
            </button>
          </div>
        ) : null}
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

      {/* Create Poll Form (CR only) */}
      {showCreatePoll && isCurrentUserCr && (
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaPoll className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">New Poll</h3>
            </div>
            <button
              onClick={() => setShowCreatePoll(false)}
              className="rounded p-1 text-gray-500 hover:bg-gray-100"
            >
              <FaTimes className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Poll question"
              value={pollQuestion}
              onChange={(e) => setPollQuestion(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />

            <div className="space-y-2">
              {pollOptions.map((opt, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    value={opt}
                    onChange={(e) => updatePollOption(i, e.target.value)}
                    placeholder={`Option ${i + 1}`}
                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                  <button
                    onClick={() => removePollOption(i)}
                    disabled={pollOptions.length <= 2}
                    className="rounded bg-red-50 px-3 py-2 text-sm text-red-600 hover:bg-red-100 disabled:opacity-50"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <div>
                <button
                  onClick={addPollOption}
                  className="rounded bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100"
                >
                  Add option
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCreatePoll(false)}
                className="flex-1 rounded-md border border-gray-300 py-2.5 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePoll}
                disabled={
                  !pollQuestion.trim() ||
                  pollOptions.map((o) => o.trim()).filter(Boolean).length < 2
                }
                className="flex-1 rounded-md bg-blue-600 py-2.5 text-base font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                Create Poll
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CR Announcements - Full Width */}
      <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
        {/* Announcement Header */}
        <div className="mb-4 flex items-center gap-2">
          <FaBullhorn className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Announcements</h2>
        </div>
        {/* Announcement List */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-1">
          {announcements.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-md border border-dashed border-gray-200 bg-gray-50 p-6 text-center">
              <FaBullhorn className="h-8 w-8 text-gray-400" />
              <p className="max-w-xl text-sm text-gray-600">
                No announcements yet. Create the first announcement for your
                class so everyone stays informed.
              </p>
              <button
                onClick={() => setShowCreatePost(true)}
                className="flex items-center gap-2 rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 transition-colors hover:border-blue-400 hover:bg-blue-100"
              >
                <FaPlus className="h-5 w-5" />
                Create Announcement
              </button>
            </div>
          ) : (
            announcements.map((announcement) => {
              return (
                <div
                  key={announcement.id}
                  className={`relative flex flex-col overflow-visible rounded-md border p-3 transition-shadow hover:shadow-sm ${
                    (announcement.readBy || []).includes(currentUser!.id)
                      ? "border-gray-200 bg-gray-100 text-gray-500"
                      : "border-gray-500 bg-blue-100"
                  }`}
                >
                  {/* 3-dot menu button */}
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => toggleMenu(announcement.id)}
                      className="cursor-pointer rounded-full p-1 text-gray-600 hover:bg-gray-100"
                      aria-label="Open menu"
                    >
                      <BsThreeDots className="h-5 w-5" />
                    </button>

                    {/* menu popup */}
                    {menuOpenFor === announcement.id && (
                      <div className="absolute top-8 right-0 z-20 w-40 rounded-md border border-gray-200 bg-white shadow-lg">
                        <button
                          onClick={() => {
                            /* placeholder edit */
                            setMenuOpenFor(null);
                            alert("Edit not implemented yet");
                          }}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteAnnouncement(announcement.id)
                          }
                          className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-gray-50"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                  <h4 className="mb-2 line-clamp-2 text-base font-semibold text-gray-900">
                    {announcement.title}
                  </h4>
                  <div className="mb-3 text-sm leading-relaxed text-gray-700">
                    <p
                      className={`text-justify text-sm leading-relaxed text-gray-700 ${
                        expanded[announcement.id] ? "" : "line-clamp-3"
                      }`}
                    >
                      {announcement.content}
                    </p>

                    {/* See more / See less toggle */}
                    {announcement.content &&
                      announcement.content.split("\n").join(" ").length >
                        180 && (
                        <button
                          onClick={() => toggleExpanded(announcement.id)}
                          className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-800"
                        >
                          {expanded[announcement.id] ? "See less" : "See more"}
                        </button>
                      )}
                  </div>

                  {/* File Attachment Display */}
                  {announcement.hasFile && (
                    <div className="mb-3 flex items-center justify-between rounded bg-blue-50 px-3 py-2">
                      <div className="flex min-w-0 flex-1 items-center gap-2">
                        <FaFile className="h-4 w-4 flex-shrink-0 text-blue-600" />
                        <span className="truncate text-sm font-medium text-blue-700">
                          {announcement.fileName}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDownload(announcement)}
                        className="ml-2 flex-shrink-0 text-sm font-semibold text-blue-600 hover:text-blue-800"
                      >
                        Download
                      </button>
                    </div>
                  )}

                  <div className="flex items-center justify-between border-t border-gray-200 pt-3 text-sm text-gray-500">
                    <span className="truncate font-medium">
                      {announcement.postedById ? (
                        <button
                          onClick={() =>
                            navigate(`/profile/${announcement.postedById}`)
                          }
                          className="cursor-pointer text-sm font-medium text-gray-900 transition-colors hover:text-blue-600 hover:underline"
                        >
                          {announcement.postedBy}
                        </button>
                      ) : (
                        announcement.postedBy
                      )}
                    </span>
                    <div className="ml-2 flex items-center gap-3">
                      <span className="flex-shrink-0">{announcement.date}</span>

                      {/* Render mark-as-read toggle only for non-CR posters */}
                      <button
                        onClick={() => toggleRead(announcement.id)}
                        disabled={(announcement.readBy || []).includes(
                          currentUser!.id
                        )}
                        className={`cursor-pointer rounded px-2 py-0.5 text-sm font-medium transition-colors disabled:cursor-not-allowed ${
                          (announcement.readBy || []).includes(currentUser!.id)
                            ? "bg-gray-200 text-gray-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {(announcement.readBy || []).includes(currentUser!.id)
                          ? "Marked"
                          : "Mark as read"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Active Poll - Full Width */}
      <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        {/* Poll Header */}
        <div className="mb-4 flex items-center gap-3">
          <FaPoll className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Active Poll</h2>
        </div>

        {/* Poll List */}
        {polls.length === 0 ? (
          // No polls placeholder
          <div className="flex flex-col items-center justify-center gap-3 rounded-md border border-dashed border-gray-200 bg-gray-50 p-6 text-center">
            <FaPoll className="h-8 w-8 text-gray-400" />
            <p className="max-w-xl text-sm text-gray-600">
              No polls yet. Create the first poll to gather class feedback and
              start discussions.
            </p>
            <button
              onClick={() => setShowCreatePoll(true)}
              className="flex items-center gap-2 rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 transition-colors hover:border-blue-400 hover:bg-blue-100"
            >
              <FaPlus className="h-5 w-5" />
              Create Poll
            </button>
          </div>
        ) : (
          // Render polls - separate active and ended
          <>
            {/* Active Polls */}
            {polls.filter((p) => !p.isEnded).length > 0 && (
              <div className="space-y-4">
                {polls
                  .filter((p) => !p.isEnded)
                  .map((poll) => (
                    <div
                      key={poll.id}
                      className="mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                    >
                      <div className="mb-3">
                        <h3 className="text-base font-medium text-gray-900">
                          {poll.question}
                        </h3>
                      </div>

                      <div className="space-y-3">
                        {poll.options.map((option) => {
                          const percentage = poll.totalVotes
                            ? ((option.votes / poll.totalVotes) * 100).toFixed(
                                1
                              )
                            : "0.0";
                          const isSelected =
                            (selectedPolls[poll.id] ?? null) === option.id;

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

                      {/* Vote count and Action buttons */}
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 pt-4">
                        <div className="text-sm font-medium text-gray-600">
                          Total Votes: {poll.totalVotes}
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          {selectedPolls[poll.id] != null && (
                            <button
                              onClick={() => handleCancelVote(poll.id)}
                              className="rounded-md border border-red-300 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
                            >
                              Cancel Vote
                            </button>
                          )}
                          {isCurrentUserCr && (
                            <button
                              onClick={() => handleEndPoll(poll.id)}
                              className="rounded-md border border-orange-300 bg-orange-50 px-3 py-1.5 text-sm font-medium text-orange-600 transition-colors hover:bg-orange-100"
                            >
                              End Poll
                            </button>
                          )}
                          <button
                            onClick={() => handleDeletePoll(poll.id)}
                            className="rounded-md border border-red-300 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
                          >
                            Delete
                          </button>
                        </div>
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
                          className="w-full rounded-md border border-gray-300 p-3 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-700 focus:outline-none"
                          rows={3}
                          placeholder="Share your opinion, concerns, or suggestions about this poll..."
                        />

                        <div className="mt-3 flex items-center justify-between">
                          <p className="text-sm text-gray-500">
                            Your feedback will be sent anonymously
                          </p>
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
            )}

            {/* Ended Polls - Compact View */}
            {polls.filter((p) => p.isEnded).length > 0 && (
              <div className="mt-6">
                <h3 className="mb-3 text-sm font-semibold text-gray-600">
                  Ended Polls ({polls.filter((p) => p.isEnded).length})
                </h3>
                <div className="space-y-2">
                  {polls
                    .filter((p) => p.isEnded)
                    .map((poll) => {
                      const isExpanded = expandedPolls[poll.id];
                      const winningOption = poll.options.reduce(
                        (prev, current) =>
                          prev.votes > current.votes ? prev : current
                      );

                      return (
                        <div
                          key={poll.id}
                          className="rounded-lg border border-gray-200 bg-gray-50 p-3"
                        >
                          {!isExpanded ? (
                            // Compact View
                            <div
                              onClick={() => toggleExpandPoll(poll.id)}
                              className="cursor-pointer"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0 flex-1">
                                  <h4 className="truncate text-sm font-medium text-gray-900">
                                    {poll.question}
                                  </h4>
                                  <p className="mt-1 text-xs text-gray-500">
                                    Ended on {poll.endedAt} · {poll.totalVotes}{" "}
                                    votes
                                  </p>
                                  <p className="mt-1 text-xs font-medium text-blue-600">
                                    Winner: {winningOption.text} (
                                    {winningOption.votes} votes)
                                  </p>
                                </div>
                                <span className="flex-shrink-0 text-sm font-medium text-blue-600">
                                  Click to expand
                                </span>
                              </div>
                            </div>
                          ) : (
                            // Expanded View
                            <div>
                              <div className="mb-3 flex items-start justify-between">
                                <div className="flex-1">
                                  <h4 className="text-base font-medium text-gray-900">
                                    {poll.question}
                                  </h4>
                                  <p className="mt-1 text-xs text-gray-500">
                                    Ended on {poll.endedAt} · {poll.totalVotes}{" "}
                                    total votes
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  {isCurrentUserCr && (
                                    <button
                                      onClick={() => handleReopenPoll(poll.id)}
                                      className="flex-shrink-0 rounded-md border border-green-200 bg-green-50 px-3 py-1.5 text-sm font-medium text-green-600 transition-colors hover:border-green-300 hover:bg-green-100"
                                    >
                                      Reopen Poll
                                    </button>
                                  )}
                                  <button
                                    onClick={() => toggleExpandPoll(poll.id)}
                                    className="flex-shrink-0 rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600 transition-colors hover:border-blue-300 hover:bg-blue-100"
                                  >
                                    Collapse
                                  </button>
                                </div>
                              </div>

                              <div className="space-y-2">
                                {poll.options.map((option) => {
                                  const percentage = poll.totalVotes
                                    ? (
                                        (option.votes / poll.totalVotes) *
                                        100
                                      ).toFixed(1)
                                    : "0.0";
                                  const isWinner =
                                    option.id === winningOption.id;

                                  return (
                                    <div
                                      key={option.id}
                                      className={`rounded-md border p-3 ${
                                        isWinner
                                          ? "border-green-300 bg-green-50"
                                          : "border-gray-200 bg-white"
                                      }`}
                                    >
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-900">
                                          {option.text}
                                          {isWinner && (
                                            <span className="ml-2 text-xs font-semibold text-green-600">
                                              WINNER
                                            </span>
                                          )}
                                        </span>
                                        <span className="text-xs font-semibold text-gray-600">
                                          {percentage}% ({option.votes})
                                        </span>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CRCorner;

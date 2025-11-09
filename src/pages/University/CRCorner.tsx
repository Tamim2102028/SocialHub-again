import React, { useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { selectUserById } from "../../store/slices/profileSlice";
import type { RootState } from "../../store/store";
import { confirm } from "../../utils/sweetAlert";
import {
  FaPoll,
  FaPlus,
  FaBullhorn,
  FaTimes,
  FaFile,
} from "react-icons/fa";
import {
  PollCard,
  EndedPollCard,
  AnnouncementCard,
  type Poll,
  type Announcement,
} from "../../components/CRCorner";

const CRCorner: React.FC = () => {
  // track selected option per poll: { [pollId]: optionId }
  const [selectedPolls, setSelectedPolls] = useState<
    Record<number, number | null>
  >({});
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

  const handleDeletePoll = async (id: number) => {
    const confirmed = await confirm({
      title: "Delete Poll?",
      text: "Are you sure you want to delete this poll? This action cannot be undone.",
      icon: "warning",
      confirmButtonText: "Yes, delete it",
      isDanger: true,
    });

    if (confirmed) {
      setPolls((prev) => prev.filter((p) => p.id !== id));
    }
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
            announcements.map((announcement) => (
              <AnnouncementCard
                key={announcement.id}
                announcement={announcement}
                currentUserId={currentUser!.id}
                isExpanded={expanded[announcement.id] || false}
                isMenuOpen={menuOpenFor === announcement.id}
                onToggleExpanded={toggleExpanded}
                onToggleMenu={toggleMenu}
                onToggleRead={toggleRead}
                onEdit={() => {
                  setMenuOpenFor(null);
                  alert("Edit not implemented yet");
                }}
                onDelete={handleDeleteAnnouncement}
                onDownload={handleDownload}
              />
            ))
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
                    <PollCard
                      key={poll.id}
                      poll={poll}
                      isCurrentUserCr={isCurrentUserCr}
                      selectedOption={selectedPolls[poll.id] ?? null}
                      onVote={handleVote}
                      onCancelVote={handleCancelVote}
                      onEditPoll={() => alert("Edit poll feature coming soon!")}
                      onEndPoll={handleEndPoll}
                      onDeletePoll={handleDeletePoll}
                    />
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
                    .map((poll) => (
                      <EndedPollCard
                        key={poll.id}
                        poll={poll}
                        isCurrentUserCr={isCurrentUserCr}
                        isExpanded={expandedPolls[poll.id] || false}
                        onToggleExpand={toggleExpandPoll}
                        onReopenPoll={handleReopenPoll}
                      />
                    ))}
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

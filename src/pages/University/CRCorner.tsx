import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { selectUserById } from "../../store/slices/profileSlice";
import type { RootState } from "../../store/store";
import { confirm } from "../../utils/sweetAlert";
import { FaPoll, FaPlus, FaBullhorn, FaTimes, FaFile } from "react-icons/fa";
import dayjs from "dayjs";
import {
  PollCard,
  EndedPollCard,
  AnnouncementCard,
  type Poll,
  type Announcement,
} from "../../components/CRCorner";
import {
  selectAllPolls,
  selectActivePolls,
  selectEndedPolls,
  selectAllAnnouncements,
  createPoll,
  updatePoll,
  deletePoll,
  endPoll,
  reopenPoll,
  votePoll,
  cancelVote,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  toggleAnnouncementRead,
} from "../../store/slices/classRoom/crCornerSlice";

const CRCorner: React.FC = () => {
  const dispatch = useAppDispatch();

  // track selected option per poll: { [pollId]: optionId }
  const [selectedPolls, setSelectedPolls] = useState<
    Record<number, number | null>
  >({});
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  // Edit announcement state
  const [editingAnnouncementId, setEditingAnnouncementId] = useState<
    number | null
  >(null);
  const [existingFiles, setExistingFiles] = useState<
    Array<{ id: string; name: string; url?: string }>
  >([]);

  // Poll creation state
  const [showCreatePoll, setShowCreatePoll] = useState(false);
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState<string[]>(["", ""]);
  const [editingPollId, setEditingPollId] = useState<number | null>(null);

  // current logged-in user (from profile slice)
  const currentUser = useAppSelector((s: RootState) =>
    selectUserById(s, s.profile.id)
  );

  const isCurrentUserCr = !!currentUser?.university?.isCr;

  // Get data from Redux store
  const polls = useAppSelector(selectAllPolls);
  const announcements = useAppSelector(selectAllAnnouncements);
  const activePolls = useAppSelector(selectActivePolls);
  const endedPolls = useAppSelector(selectEndedPolls);

  // Toggle read state for a given announcement for the current user
  const toggleRead = (id: number) => {
    if (!currentUser?.id) return;
    dispatch(toggleAnnouncementRead({ id, userId: currentUser.id }));
  };

  const handleVote = (pollId: number, optionId: number) => {
    const prevSelected = selectedPolls[pollId] ?? null;

    // If changing vote, cancel previous vote first
    if (prevSelected !== null && prevSelected !== optionId) {
      dispatch(cancelVote({ pollId, optionId: prevSelected }));
    }

    // Vote for new option if not already voted for it
    if (prevSelected !== optionId) {
      dispatch(votePoll({ pollId, optionId }));
    }

    setSelectedPolls((prev) => ({ ...prev, [pollId]: optionId }));
  };

  const handleCancelVote = (pollId: number) => {
    const prevSelected = selectedPolls[pollId] ?? null;
    if (prevSelected === null) return;

    dispatch(cancelVote({ pollId, optionId: prevSelected }));
    setSelectedPolls((prev) => ({ ...prev, [pollId]: null }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setAttachedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveExistingFile = (fileId: string) => {
    setExistingFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const handleCreatePost = () => {
    if (!isCurrentUserCr) {
      alert("Only Class Representatives can create announcements.");
      return;
    }

    if (postTitle.trim() && postContent.trim()) {
      if (editingAnnouncementId) {
        // Update existing announcement
        const allFiles = [
          ...existingFiles,
          ...attachedFiles.map((file) => ({
            id: `${Date.now()}-${Math.random()}`,
            name: file.name,
            url: URL.createObjectURL(file),
          })),
        ];

        const updates: Partial<Announcement> & { id: number } = {
          id: editingAnnouncementId,
          title: postTitle.trim(),
          content: postContent.trim(),
          hasFile: allFiles.length > 0,
          files: allFiles,
        };

        dispatch(updateAnnouncement(updates));
      } else {
        // Create new announcement
        const files = attachedFiles.map((file) => ({
          id: `${Date.now()}-${Math.random()}`,
          name: file.name,
          url: URL.createObjectURL(file),
        }));

        const newAnnouncement: Announcement = {
          id: Date.now(),
          title: postTitle.trim(),
          content: postContent.trim(),
          date: dayjs().format("MMM D, YYYY"),
          postedBy: currentUser?.name || "CR",
          postedById: currentUser?.id,
          hasFile: files.length > 0,
          files,
          readBy: [],
        };

        dispatch(createAnnouncement(newAnnouncement));
      }

      setPostTitle("");
      setPostContent("");
      setAttachedFiles([]);
      setExistingFiles([]);
      setShowCreatePost(false);
      setEditingAnnouncementId(null);
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

    if (editingPollId) {
      // Update existing poll
      const poll = polls.find((p) => p.id === editingPollId);
      if (poll) {
        const updatedOptions = opts.map((text, i) => {
          const existingOption = poll.options[i];
          return existingOption
            ? { ...existingOption, text }
            : { id: poll.options.length + i + 1, text, votes: 0 };
        });
        dispatch(
          updatePoll({
            id: editingPollId,
            question: q,
            options: updatedOptions,
          })
        );
      }
    } else {
      // Create new poll
      const newPoll: Poll = {
        id: Date.now(),
        question: q,
        options: opts.map((text, i) => ({ id: i + 1, text, votes: 0 })),
        totalVotes: 0,
      };
      dispatch(createPoll(newPoll));
    }

    setPollQuestion("");
    setPollOptions(["", ""]);
    setShowCreatePoll(false);
    setEditingPollId(null);
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

  const handleEditPoll = (id: number) => {
    const poll = polls.find((p) => p.id === id);
    if (poll) {
      setEditingPollId(id);
      setPollQuestion(poll.question);
      setPollOptions(poll.options.map((opt) => opt.text));
      setShowCreatePoll(true);
    }
  };

  const handleEditAnnouncement = (id: number) => {
    const announcement = announcements.find((a) => a.id === id);
    if (announcement) {
      setEditingAnnouncementId(id);
      setPostTitle(announcement.title);
      setPostContent(announcement.content);

      // Load existing files
      if (announcement.files && announcement.files.length > 0) {
        setExistingFiles(announcement.files);
      } else if (announcement.hasFile && announcement.fileName) {
        // Backward compatibility with old single file
        setExistingFiles([
          {
            id: `${announcement.id}-file`,
            name: announcement.fileName,
            url: announcement.fileUrl,
          },
        ]);
      }

      setShowCreatePost(true);
      setMenuOpenFor(null);
    }
  };

  const handleDeleteAnnouncement = async (id: number) => {
    const confirmed = await confirm({
      title: "Delete Announcement?",
      text: "Are you sure you want to delete this announcement? This action cannot be undone.",
      icon: "warning",
      confirmButtonText: "Yes, delete it",
      isDanger: true,
    });

    if (confirmed) {
      dispatch(deleteAnnouncement(id));
      // close menu if it was open
      if (menuOpenFor === id) setMenuOpenFor(null);
    }
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
      dispatch(deletePoll(id));
    }
  };

  const handleEndPoll = (id: number) => {
    dispatch(
      endPoll({ id, endedAt: dayjs().format("MMM D, YYYY [at] h:mm A") })
    );
  };

  const toggleExpandPoll = (id: number) => {
    setExpandedPolls((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleReopenPoll = (id: number) => {
    dispatch(reopenPoll(id));
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
                {editingAnnouncementId
                  ? "Edit Announcement"
                  : "New Announcement"}
              </h3>
            </div>
            <button
              onClick={() => {
                setShowCreatePost(false);
                setEditingAnnouncementId(null);
                setPostTitle("");
                setPostContent("");
                setAttachedFiles([]);
                setExistingFiles([]);
              }}
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

            {/* File Attachments */}
            <div className="space-y-2">
              {/* Display existing files */}
              {existingFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between rounded-md border border-gray-300 bg-gray-50 p-3"
                >
                  <div className="flex items-center gap-2">
                    <FaFile className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-700">
                      {file.name}
                      <span className="ml-2 text-xs text-gray-500">
                        (Existing file)
                      </span>
                    </span>
                  </div>
                  <button
                    onClick={() => handleRemoveExistingFile(file.id)}
                    className="rounded p-1 text-red-500 hover:bg-red-50"
                  >
                    <FaTimes className="h-4 w-4" />
                  </button>
                </div>
              ))}

              {/* Display newly attached files */}
              {attachedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-md border border-gray-300 bg-blue-50 p-3"
                >
                  <div className="flex items-center gap-2">
                    <FaFile className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-700">{file.name}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveFile(index)}
                    className="rounded p-1 text-red-500 hover:bg-red-50"
                  >
                    <FaTimes className="h-4 w-4" />
                  </button>
                </div>
              ))}

              {/* Add file button */}
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-dashed border-gray-300 p-3 transition-colors hover:border-blue-400 hover:bg-blue-50">
                <FaPlus className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-600">
                  {existingFiles.length + attachedFiles.length > 0
                    ? "Add more files"
                    : "Attach files (Notes, Assignment, etc.)"}
                </span>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png"
                />
              </label>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowCreatePost(false);
                  setEditingAnnouncementId(null);
                  setPostTitle("");
                  setPostContent("");
                  setAttachedFiles([]);
                  setExistingFiles([]);
                }}
                className="flex-1 rounded-md border border-gray-300 py-2.5 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePost}
                disabled={!postTitle.trim() || !postContent.trim()}
                className="flex-1 rounded-md bg-blue-600 py-2.5 text-base font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {editingAnnouncementId ? "Update" : "Post"}
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
              <h3 className="text-lg font-semibold text-gray-900">
                {editingPollId ? "Edit Poll" : "New Poll"}
              </h3>
            </div>
            <button
              onClick={() => {
                setShowCreatePoll(false);
                setEditingPollId(null);
                setPollQuestion("");
                setPollOptions(["", ""]);
              }}
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
                    className="rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:border-red-300 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-red-200 disabled:hover:bg-red-50"
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
                {editingPollId ? "Update Poll" : "Create Poll"}
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
                onEdit={handleEditAnnouncement}
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
            {activePolls.length > 0 && (
              <div className="space-y-4">
                {activePolls.map((poll) => (
                  <PollCard
                    key={poll.id}
                    poll={poll}
                    isCurrentUserCr={isCurrentUserCr}
                    selectedOption={selectedPolls[poll.id] ?? null}
                    onVote={handleVote}
                    onCancelVote={handleCancelVote}
                    onEditPoll={handleEditPoll}
                    onEndPoll={handleEndPoll}
                    onDeletePoll={handleDeletePoll}
                  />
                ))}
              </div>
            )}

            {/* Ended Polls - Compact View */}
            {endedPolls.length > 0 && (
              <div className="mt-6">
                <h3 className="mb-3 text-sm font-semibold text-gray-600">
                  Ended Polls ({endedPolls.length})
                </h3>
                <div className="space-y-2">
                  {endedPolls.map((poll) => (
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

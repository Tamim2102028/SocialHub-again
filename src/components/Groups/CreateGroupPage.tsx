import React, { useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export interface CreateGroupData {
  name: string;
  description: string;
  category: string;
  privacy: "public" | "private";
  rules: string;
  tags: string[];
}

const CreateGroupPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CreateGroupData>({
    name: "",
    description: "",
    category: "",
    privacy: "public",
    rules: "",
    tags: [],
  });

  const [currentTag, setCurrentTag] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    "HSC",
    "University",
    "Medical College",
    "Study Groups",
    "Sports & Fitness",
    "Art & Design",
    "Music",
    "Gaming",
    "Science",
    "Languages",
    "Hobbies",
    "Other",
  ];

  const handleInputChange = (field: keyof CreateGroupData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      !formData.category
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    try {
      /**
       * 🔄 REAL BACKEND INTEGRATION NOTES:
       *
       * In production, this would be:
       *
       * const createGroup = async () => {
       *   const response = await fetch('/api/groups', {
       *     method: 'POST',
       *     headers: {
       *       'Authorization': `Bearer ${token}`,
       *       'Content-Type': 'application/json'
       *     },
       *     body: JSON.stringify({
       *       name: formData.name,
       *       description: formData.description,
       *       category: formData.category,
       *       privacy: formData.privacy,
       *       rules: formData.rules.split('\n').filter(rule => rule.trim()),
       *       tags: formData.tags,
       *       coverImage: uploadedImage // from file upload
       *     })
       *   });
       *
       *   if (!response.ok) {
       *     throw new Error('Failed to create group');
       *   }
       *
       *   const newGroup = await response.json();
       *   return newGroup;
       * };
       *
       * Backend validation would check:
       * - Group name uniqueness
       * - User permissions
       * - Image file type/size
       * - Spam detection
       * - Rate limiting
       *
       * Expected response time: 500-2000ms depending on:
       * - Image upload size
       * - Database write speed
       * - Validation complexity
       */

      // CURRENT: Simulate API call for demo
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Generate new group with mock data
      const newGroup = {
        id: Date.now(),
        name: formData.name,
        members: 1,
        isPrivate: formData.privacy === "private",
        coverImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=random&size=400`,
        category: formData.category,
      };

      // In a real app, you would save this to your state management or API
      console.log("New group created:", newGroup);

      // Show success message and navigate back to groups
      alert(`Group "${formData.name}" created successfully!`);
      navigate("/groups");
    } catch (error) {
      console.error("Error creating group:", error);
      alert("Failed to create group. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    navigate("/groups");
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleClose}
          className="flex cursor-pointer items-center gap-2"
        >
          <IoArrowBackOutline className="h-5 w-5" />
          Back to Groups
        </button>
      </div>

      {/* Create Group Form */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900">Create New Group</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleCreateGroup} className="space-y-6 p-6">
          {/* Group Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Group Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter group name"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              maxLength={50}
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              {formData.name.length}/50 characters
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe what your group is about..."
              rows={4}
              className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              maxLength={500}
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              {formData.description.length}/500 characters
            </p>
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Privacy */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Privacy Setting
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="privacy"
                  value="public"
                  checked={formData.privacy === "public"}
                  onChange={(e) => handleInputChange("privacy", e.target.value)}
                  className="mr-2"
                />
                <div>
                  <span className="font-medium">Public</span>
                  <p className="text-sm text-gray-500">
                    Anyone can find and join this group
                  </p>
                </div>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="privacy"
                  value="private"
                  checked={formData.privacy === "private"}
                  onChange={(e) => handleInputChange("privacy", e.target.value)}
                  className="mr-2"
                />
                <div>
                  <span className="font-medium">Private</span>
                  <p className="text-sm text-gray-500">
                    Only invited members can join
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Tags (Optional)
            </label>
            <div className="mb-2 flex gap-2">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                placeholder="Add a tag"
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addTag())
                }
              />
              <button
                type="button"
                onClick={addTag}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Group Rules */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Group Rules (Optional)
            </label>
            <textarea
              value={formData.rules}
              onChange={(e) => handleInputChange("rules", e.target.value)}
              placeholder="Set guidelines for your group members..."
              rows={3}
              className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              maxLength={300}
            />
            <p className="mt-1 text-xs text-gray-500">
              {formData.rules.length}/300 characters
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 border-t border-gray-200 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Creating...
                </div>
              ) : (
                "Create Group"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupPage;

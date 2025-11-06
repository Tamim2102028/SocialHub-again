import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FaImage,
  FaUsers,
  FaGraduationCap,
  FaBook,
  FaArrowLeft,
} from "react-icons/fa";
import type { Group } from "../../data/group-data/preGroupData";
import { addMemberToGroup } from "../../data/group-data/groupMembers";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { createGroup } from "../../store/slices/groupSlice";
import { groupSchema, type GroupFormData } from "../../schemas/groupSchema";
import { showToast } from "../../utils/toast";

const CreateGroupPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Get current user ID from Redux store
  const currentUserId = useAppSelector((state) => state.profile?.id);

  // Image previews
  const [coverPreview, setCoverPreview] = useState<string>("");
  const [profilePreview, setProfilePreview] = useState<string>("");

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<GroupFormData>({
    resolver: zodResolver(groupSchema),
    defaultValues: {
      name: "",
      description: "",
      groupFor: "students",
      gender: [],
      type: "academic",
      privacy: "public",
      tags: "",
      rules: "",
    },
  });

  const educationLevel = watch("educationLevel");

  // Handle checkbox for gender
  const handleGenderChange = (gender: "male" | "female") => {
    const currentGender = watch("gender") || [];
    const newGender = currentGender.includes(gender)
      ? currentGender.filter((g) => g !== gender)
      : [...currentGender, gender];
    setValue("gender", newGender);
  };

  // Handle image upload
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "cover" | "profile"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showToast.error("Image size must be less than 5MB");
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        showToast.error("Please upload an image file");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "cover") {
          setCoverPreview(reader.result as string);
        } else {
          setProfilePreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const onSubmit = async (data: GroupFormData) => {
    if (!currentUserId) {
      showToast.error("You must be logged in to create a group");
      return;
    }

    try {
      // Create new group object
      const newGroupId = `g${Date.now()}`;
      const newGroup: Group = {
        id: newGroupId,
        name: data.name,
        description: data.description,
        groupFor: data.groupFor,
        gender: data.gender && data.gender.length > 0 ? data.gender : undefined,
        type: data.type,
        privacy: data.privacy,
        educationLevel: data.educationLevel || undefined,
        coverImage: coverPreview || undefined,
        profileImage: profilePreview || undefined,
        tags: data.tags
          ? data.tags.split(",").map((tag) => tag.trim())
          : undefined,
        rules: data.rules
          ? data.rules.split("\n").filter((rule) => rule.trim())
          : undefined,
        systemCreated: false,
        postCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: "active",
      };

      // Add university data if applicable
      if (data.educationLevel === "UNIVERSITY" && data.universityName) {
        newGroup.university = {
          name: data.universityName,
          department: data.department || undefined,
          section: data.section || undefined,
          subsection: data.subsection || undefined,
          year: data.year
            ? (parseInt(data.year) as 1 | 2 | 3 | 4 | 5)
            : undefined,
          semester: data.semester
            ? (parseInt(data.semester) as 1 | 2)
            : undefined,
        };
      }

      // Add college data if applicable
      if (data.educationLevel === "COLLEGE" && data.collegeName) {
        newGroup.college = {
          name: data.collegeName,
          department: data.collegeDepartment || undefined,
          year: data.collegeYear || undefined,
          boardType: data.boardType || undefined,
          board: data.board || undefined,
          version: data.version || undefined,
          medium: data.medium || undefined,
        };
      }

      // Add current user as owner in groupMembers
      addMemberToGroup(currentUserId, newGroupId, "owner", "active");

      // Dispatch to Redux store
      dispatch(createGroup(newGroup));

      showToast.success(`${data.name} has been created successfully!`);
      navigate("/groups");
    } catch (error) {
      showToast.error("Failed to create group. Please try again.");
      console.error("Error creating group:", error);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4">
      {/* Header */}
      <div className="flex items-center gap-4 rounded-xl bg-white p-6 shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-gray-200"
          aria-label="Go back"
        >
          <FaArrowLeft />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Group</h1>
          <p className="text-gray-600">
            Build a community and connect with like-minded people
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <div className="rounded-xl bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center gap-2">
            <FaUsers className="text-2xl text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">
              Basic Information
            </h2>
          </div>

          <div className="space-y-4">
            {/* Group Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block font-semibold text-gray-700"
              >
                Group Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                {...register("name")}
                placeholder="Enter group name"
                className={`w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="mb-2 block font-semibold text-gray-700"
              >
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                {...register("description")}
                placeholder="Describe what your group is about"
                rows={4}
                className={`w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Tags */}
            <div>
              <label
                htmlFor="tags"
                className="mb-2 block font-semibold text-gray-700"
              >
                Tags (comma separated)
              </label>
              <input
                type="text"
                id="tags"
                {...register("tags")}
                placeholder="e.g., programming, study, projects"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Rules */}
            <div>
              <label
                htmlFor="rules"
                className="mb-2 block font-semibold text-gray-700"
              >
                Group Rules (one per line)
              </label>
              <textarea
                id="rules"
                {...register("rules")}
                placeholder="Enter group rules, one per line"
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Group Settings */}
        <div className="rounded-xl bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center gap-2">
            <FaBook className="text-2xl text-purple-600" />
            <h2 className="text-xl font-bold text-gray-900">Group Settings</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Group For */}
            <div>
              <label
                htmlFor="groupFor"
                className="mb-2 block font-semibold text-gray-700"
              >
                Group For
              </label>
              <select
                id="groupFor"
                {...register("groupFor")}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="students">Students</option>
                <option value="teachers">Teachers</option>
                <option value="both">Both</option>
              </select>
            </div>

            {/* Type */}
            <div>
              <label
                htmlFor="type"
                className="mb-2 block font-semibold text-gray-700"
              >
                Group Type
              </label>
              <select
                id="type"
                {...register("type")}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="academic">Academic</option>
                <option value="hall">Hall</option>
                <option value="jobs">Jobs</option>
                <option value="others">Others</option>
              </select>
            </div>

            {/* Privacy */}
            <div>
              <label
                htmlFor="privacy"
                className="mb-2 block font-semibold text-gray-700"
              >
                Privacy
              </label>
              <select
                id="privacy"
                {...register("privacy")}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="public">Public - Anyone can join</option>
                <option value="private">Private - Approval needed</option>
                <option value="closed">Closed - Invitation only</option>
              </select>
            </div>

            {/* Education Level */}
            <div>
              <label
                htmlFor="educationLevel"
                className="mb-2 block font-semibold text-gray-700"
              >
                Education Level
              </label>
              <select
                id="educationLevel"
                {...register("educationLevel")}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Select level</option>
                <option value="UNIVERSITY">University</option>
                <option value="MEDICAL_COLLEGE">Medical College</option>
                <option value="NATIONAL_UNIVERSITY">National University</option>
                <option value="COLLEGE">College</option>
                <option value="POLYTECHNIC">Polytechnic</option>
                <option value="SCHOOL">School</option>
              </select>
            </div>
          </div>

          {/* Gender Selection */}
          <div className="mt-4">
            <label className="mb-2 block font-semibold text-gray-700">
              Gender (optional)
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={(watch("gender") || []).includes("male")}
                  onChange={() => handleGenderChange("male")}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Male</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={(watch("gender") || []).includes("female")}
                  onChange={() => handleGenderChange("female")}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Female</span>
              </label>
            </div>
          </div>
        </div>

        {/* University Details (Conditional) */}
        {educationLevel === "UNIVERSITY" && (
          <div className="rounded-xl bg-white p-6 shadow-md">
            <div className="mb-4 flex items-center gap-2">
              <FaGraduationCap className="text-2xl text-green-600" />
              <h2 className="text-xl font-bold text-gray-900">
                University Details
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* University Name */}
              <div>
                <label
                  htmlFor="universityName"
                  className="mb-2 block font-semibold text-gray-700"
                >
                  University
                </label>
                <select
                  id="universityName"
                  {...register("universityName")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Select university</option>
                  <option value="BUET">BUET</option>
                  <option value="DU">DU</option>
                  <option value="RUET">RUET</option>
                  <option value="CUET">CUET</option>
                  <option value="KUET">KUET</option>
                </select>
              </div>

              {/* Department */}
              <div>
                <label
                  htmlFor="department"
                  className="mb-2 block font-semibold text-gray-700"
                >
                  Department
                </label>
                <select
                  id="department"
                  {...register("department")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Select department</option>
                  <option value="CSE">CSE</option>
                  <option value="EEE">EEE</option>
                  <option value="ME">ME</option>
                  <option value="CE">CE</option>
                  <option value="CHE">CHE</option>
                </select>
              </div>

              {/* Section */}
              <div>
                <label
                  htmlFor="section"
                  className="mb-2 block font-semibold text-gray-700"
                >
                  Section
                </label>
                <select
                  id="section"
                  {...register("section")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Select section</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>
              </div>

              {/* Subsection */}
              <div>
                <label
                  htmlFor="subsection"
                  className="mb-2 block font-semibold text-gray-700"
                >
                  Subsection
                </label>
                <select
                  id="subsection"
                  {...register("subsection")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Select subsection</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>

              {/* Year */}
              <div>
                <label
                  htmlFor="year"
                  className="mb-2 block font-semibold text-gray-700"
                >
                  Year
                </label>
                <select
                  id="year"
                  {...register("year")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Select year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                  <option value="5">5th Year</option>
                </select>
              </div>

              {/* Semester */}
              <div>
                <label
                  htmlFor="semester"
                  className="mb-2 block font-semibold text-gray-700"
                >
                  Semester
                </label>
                <select
                  id="semester"
                  {...register("semester")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Select semester</option>
                  <option value="1">1st Semester</option>
                  <option value="2">2nd Semester</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* College Details (Conditional) */}
        {educationLevel === "COLLEGE" && (
          <div className="rounded-xl bg-white p-6 shadow-md">
            <div className="mb-4 flex items-center gap-2">
              <FaGraduationCap className="text-2xl text-green-600" />
              <h2 className="text-xl font-bold text-gray-900">
                College Details
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* College Name */}
              <div>
                <label
                  htmlFor="collegeName"
                  className="mb-2 block font-semibold text-gray-700"
                >
                  College
                </label>
                <select
                  id="collegeName"
                  {...register("collegeName")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Select college</option>
                  <option value="Notre Dame College">Notre Dame College</option>
                  <option value="Holy Cross College">Holy Cross College</option>
                  <option value="Dhaka College">Dhaka College</option>
                  <option value="Rajuk College">Rajuk College</option>
                </select>
              </div>

              {/* Department */}
              <div>
                <label
                  htmlFor="collegeDepartment"
                  className="mb-2 block font-semibold text-gray-700"
                >
                  Department
                </label>
                <select
                  id="collegeDepartment"
                  {...register("collegeDepartment")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Select department</option>
                  <option value="science">Science</option>
                  <option value="commerce">Commerce</option>
                  <option value="arts">Arts</option>
                </select>
              </div>

              {/* Year */}
              <div>
                <label
                  htmlFor="collegeYear"
                  className="mb-2 block font-semibold text-gray-700"
                >
                  Year
                </label>
                <select
                  id="collegeYear"
                  {...register("collegeYear")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Select year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="admission">Admission</option>
                </select>
              </div>

              {/* Board Type */}
              <div>
                <label
                  htmlFor="boardType"
                  className="mb-2 block font-semibold text-gray-700"
                >
                  Board Type
                </label>
                <select
                  id="boardType"
                  {...register("boardType")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Select board type</option>
                  <option value="madrasah">Madrasah</option>
                  <option value="general">General</option>
                </select>
              </div>

              {/* Board */}
              <div>
                <label
                  htmlFor="board"
                  className="mb-2 block font-semibold text-gray-700"
                >
                  Board
                </label>
                <select
                  id="board"
                  {...register("board")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Select board</option>
                  <option value="dhaka">Dhaka</option>
                  <option value="chittagong">Chittagong</option>
                </select>
              </div>

              {/* Version */}
              <div>
                <label
                  htmlFor="version"
                  className="mb-2 block font-semibold text-gray-700"
                >
                  Version
                </label>
                <select
                  id="version"
                  {...register("version")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Select version</option>
                  <option value="bangla">Bangla</option>
                  <option value="english">English</option>
                </select>
              </div>

              {/* Medium */}
              <div>
                <label
                  htmlFor="medium"
                  className="mb-2 block font-semibold text-gray-700"
                >
                  Medium
                </label>
                <select
                  id="medium"
                  {...register("medium")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Select medium</option>
                  <option value="bangla">Bangla</option>
                  <option value="english">English</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Images */}
        <div className="rounded-xl bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center gap-2">
            <FaImage className="text-2xl text-pink-600" />
            <h2 className="text-xl font-bold text-gray-900">Group Images</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Cover Image */}
            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Cover Image
              </label>
              <div className="relative">
                {coverPreview ? (
                  <img
                    src={coverPreview}
                    alt="Cover preview"
                    className="h-40 w-full rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex h-40 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                    <div className="text-center">
                      <FaImage className="mx-auto mb-2 text-4xl text-gray-400" />
                      <p className="text-sm text-gray-500">
                        Upload cover image
                      </p>
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "cover")}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
              </div>
            </div>

            {/* Profile Image */}
            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Profile Image
              </label>
              <div className="relative">
                {profilePreview ? (
                  <img
                    src={profilePreview}
                    alt="Profile preview"
                    className="h-40 w-full rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex h-40 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                    <div className="text-center">
                      <FaImage className="mx-auto mb-2 text-4xl text-gray-400" />
                      <p className="text-sm text-gray-500">
                        Upload profile image
                      </p>
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "profile")}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            disabled={isSubmitting}
            className="flex-1 rounded-lg border-2 border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Creating..." : "Create Group"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateGroupPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCamera,
  FaUser,
  FaMapMarkerAlt,
  FaLink,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import { useAppDispatch } from "../store/hooks";
import { updateProfile } from "../store/slices/profileSlice";

const ProfileEdit: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (
    field: "avatar",
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormData((prev) => ({ ...prev, [field]: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form className="space-y-5">
      {/* Header */}
      <div className="rounded-lg border bg-white p-6 shadow-md">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
          <div className="flex gap-3">
            <button
              onClick={() => {
                navigate("/profile");
              }}
              className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
            >
              <FaTimes className="mr-2 inline" />
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                dispatch(updateProfile(formData));
                navigate("/profile");
              }}
              className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
            >
              <FaSave className="mr-2 inline" />
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Profile Picture Section */}
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Profile Picture
        </h2>
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src="https://picsum.photos/200/300"
              alt="Profile"
              className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg"
            />
            <label className="absolute right-0 bottom-0 cursor-pointer rounded-full bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700">
              <FaCamera size={14} />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload("avatar", e)}
                className="hidden"
              />
            </label>
          </div>
          <div className="text-sm text-gray-600">
            <p>Upload a new profile picture. Recommended size: 400 x 400px</p>
            <p className="mt-1">Supported formats: JPG, PNG, GIF</p>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Basic Information
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              <FaUser className="mr-2 inline" />
              Full Name
            </label>
            <input
              type="text"
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              onChange={(e) => handleInputChange("username", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your username"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Bio
          </label>
          <textarea
            onChange={(e) => handleInputChange("bio", e.target.value)}
            rows={4}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Tell us about yourself..."
          />
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            University
          </label>
          <input
            type="text"
            onChange={(e) => handleInputChange("university", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your university name"
          />
        </div>
      </div>

      {/* Contact Information */}
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Contact Information
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              <FaMapMarkerAlt className="mr-2 inline" />
              Location
            </label>
            <input
              type="text"
              onChange={(e) => handleInputChange("location", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your location"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              <FaLink className="mr-2 inline" />
              Website
            </label>
            <input
              type="url"
              onChange={(e) => handleInputChange("website", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="https://your-website.com"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProfileEdit;

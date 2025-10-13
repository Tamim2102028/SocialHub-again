import React from "react";
import { FaRobot } from "react-icons/fa";

const AIWelcomeContent: React.FC = () => {
  return (
    <div className="flex justify-center">
      <div className="max-w-2xl rounded-lg bg-white p-6 text-center shadow-md">
        {/* AI Icon */}
        <div className="mb-4 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
            <FaRobot className="text-3xl text-white" />
          </div>
        </div>

        {/* Welcome Message */}
        <h3 className="mb-2 text-xl font-bold text-gray-900">
          Welcome to Study Helper AI! 👋
        </h3>
        <p className="mb-4 text-gray-600">
          I'm here to help you with your studies. Ask me anything about:
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 gap-3 text-left">
          <div className="rounded-lg bg-blue-50 p-3">
            <p className="font-semibold text-blue-900">📚 Study Topics</p>
            <p className="text-xs text-blue-700">
              Math, Physics, Chemistry, etc.
            </p>
          </div>
          <div className="rounded-lg bg-purple-50 p-3">
            <p className="font-semibold text-purple-900">✍️ Assignments</p>
            <p className="text-xs text-purple-700">Get help with homework</p>
          </div>
          <div className="rounded-lg bg-green-50 p-3">
            <p className="font-semibold text-green-900">💡 Explanations</p>
            <p className="text-xs text-green-700">
              Understand complex concepts
            </p>
          </div>
          <div className="rounded-lg bg-orange-50 p-3">
            <p className="font-semibold text-orange-900">🎯 Exam Prep</p>
            <p className="text-xs text-orange-700">Practice and study tips</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIWelcomeContent;

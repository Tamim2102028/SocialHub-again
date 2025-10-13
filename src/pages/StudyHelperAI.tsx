import React, { useState } from "react";
import AIHeader from "../components/StudyHelper/AIHeader";
import ChatArea from "../components/StudyHelper/ChatArea";
import AISidebar from "../components/StudyHelper/AISidebar";
import AIMessageInput from "../components/StudyHelper/AIMessageInput";
import AIWelcomeContent from "../components/StudyHelper/AIWelcomeContent";

const StudyHelperAI: React.FC = () => {
  const [message, setMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hasMessages, setHasMessages] = useState(false);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Functionality will be added later
      console.log("Message:", message);
      setHasMessages(true); // Show chat area when message is sent
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-[calc(100vh-88px)] flex-col overflow-hidden rounded-lg bg-white shadow-sm">
      {/* Header */}
      <AIHeader
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />
      {/* Content Area with Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* AI Sidebar */}
        <AISidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
          {!hasMessages ? <AIWelcomeContent /> : <ChatArea />}
        </div>
      </div>
      {/* Message Input */}
      <AIMessageInput
        message={message}
        setMessage={setMessage}
        onSendMessage={handleSendMessage}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default StudyHelperAI;

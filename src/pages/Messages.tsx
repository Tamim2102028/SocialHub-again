import React from "react";
import ConversationList from "../components/Messages/ConversationList";
import ChatArea from "../components/Messages/ChatArea";

const Messages: React.FC = () => {
  return (
    <div className="flex h-[calc(100vh-88px)] overflow-hidden rounded-lg bg-white shadow-sm">
      <ConversationList />
      <ChatArea />
    </div>
  );
};

export default Messages;

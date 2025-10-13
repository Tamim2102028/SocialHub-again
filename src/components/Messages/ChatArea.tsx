import React from "react";
import { FaPaperPlane, FaEllipsisV, FaPhone, FaVideo } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setMessageText,
  clearMessageText,
} from "../../store/slices/messagesSlice";
import { mockConversations, mockMessages } from "./data/messagesData";

const ChatArea: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedConversation, messageText } = useAppSelector(
    (state) => state.messages
  );

  const selectedConv = mockConversations.find(
    (c) => c.id === selectedConversation
  );

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Handle send message logic here
      dispatch(clearMessageText());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      {/* Chat Header */}
      {selectedConv && (
        <div className="flex h-15 items-center justify-between border-b border-gray-200 px-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={selectedConv.avatar}
                alt={selectedConv.name}
                className="h-10 w-10 rounded-full object-cover"
              />
              {selectedConv.online && (
                <div className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {selectedConv.name}
              </h3>
              <p className="text-xs text-gray-500">
                {selectedConv.online ? "Active now" : "Offline"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-blue-600">
              <FaPhone className="h-5 w-5" />
            </button>
            <button className="text-gray-600 hover:text-blue-600">
              <FaVideo className="h-5 w-5" />
            </button>
            <button className="text-gray-600 hover:text-blue-600">
              <FaEllipsisV className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-1">
        <div className="space-y-4">
          {mockMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-md rounded-2xl px-4 py-2 ${
                  msg.sender === "me"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-900"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p
                  className={`mt-1 text-xs ${
                    msg.sender === "me" ? "text-blue-100" : "text-gray-500"
                  }`}
                >
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="flex items-center gap-2 border-t border-gray-200 bg-gray-50 px-3 py-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={messageText}
          onChange={(e) => dispatch(setMessageText(e.target.value))}
          onKeyDown={handleKeyDown}
          className="flex-1 rounded-2xl border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
        />
        <button
          onClick={handleSendMessage}
          disabled={!messageText.trim()}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-700 disabled:bg-gray-300"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default ChatArea;

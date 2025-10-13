import React from "react";
import { FaPaperPlane, FaPaperclip } from "react-icons/fa";

interface AIMessageInputProps {
  message: string;
  setMessage: (message: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

const AIMessageInput: React.FC<AIMessageInputProps> = ({
  message,
  setMessage,
  onSendMessage,
  onKeyPress,
}) => {
  return (
    <div className="flex items-center gap-3 border-t border-gray-200 bg-white p-2.5">
      {/* Attachment Button */}
      <button className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100">
        <FaPaperclip className="h-5 w-5" />
      </button>

      {/* Message Input Area */}
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={onKeyPress}
        placeholder="Ask me anything about your studies..."
        rows={1}
        className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 focus:border-blue-500 focus:outline-none"
      />

      {/* Send Button */}
      <button
        onClick={onSendMessage}
        disabled={!message.trim()}
        className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
          message.trim()
            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg"
            : "bg-gray-200 text-gray-400"
        }`}
      >
        <FaPaperPlane className="h-4 w-4" />
      </button>
    </div>
  );
};

export default AIMessageInput;

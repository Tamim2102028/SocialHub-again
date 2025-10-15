import React from "react";
import { useParams } from "react-router-dom";

const GroupDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="flex min-h-96 flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold text-gray-800">Group Detail</h2>
      <p className="text-gray-600">
        You opened group with ID: <span className="font-mono">{id}</span>
      </p>
    </div>
  );
};

export default GroupDetail;

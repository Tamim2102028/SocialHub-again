import React from "react";
import { Link } from "react-router-dom";

interface Props {
  status?: string;
  creator?: { id?: string; name?: string } | undefined;
  createdAt?: string | undefined;
  lastActivityAt?: string | undefined;
}

const AboutTab: React.FC<Props> = ({
  status,
  creator,
  createdAt,
  lastActivityAt,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 font-bold text-gray-900">Details</h3>
        <p className="text-gray-700">
          Status: <span className="font-medium">{status}</span>
        </p>
        {creator && (
          <p className="text-gray-700">
            Created by:{" "}
            <Link
              to={`/profile/${creator.id}`}
              className="text-blue-600 hover:underline"
            >
              {creator.name}
            </Link>
          </p>
        )}
        {createdAt && (
          <p className="text-gray-700">
            Created: {new Date(createdAt).toLocaleString()}
          </p>
        )}
        {lastActivityAt && (
          <p className="text-gray-700">
            Last activity: {new Date(lastActivityAt).toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default AboutTab;

import type { FC } from "react";
import { FaExclamationTriangle, FaRedo } from "react-icons/fa";

interface ErrorFallbackProps {
  error: Error | null;
  onReset?: () => void;
}

export const ErrorFallback: FC<ErrorFallbackProps> = ({ error, onReset }) => {
  const handleReload = () => {
    if (onReset) {
      onReset();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-red-100 p-4">
            <FaExclamationTriangle className="text-5xl text-red-600" />
          </div>
        </div>

        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Oops! Something went wrong
        </h1>

        <p className="mb-6 text-gray-600">
          We're sorry for the inconvenience. An unexpected error has occurred.
        </p>

        {error && (
          <div className="mb-6 rounded-lg bg-gray-100 p-4 text-left">
            <p className="mb-1 text-sm font-semibold text-gray-700">
              Error Details:
            </p>
            <p className="text-xs break-words text-gray-600">{error.message}</p>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => window.history.back()}
            className="flex-1 rounded-lg border-2 border-gray-300 bg-white px-4 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Go Back
          </button>
          <button
            onClick={handleReload}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            <FaRedo />
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

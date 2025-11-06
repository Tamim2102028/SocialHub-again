export const GroupCardSkeleton = () => {
  return (
    <div className="animate-pulse rounded-xl bg-white p-6 shadow-md">
      <div className="mb-4 flex items-center gap-4">
        <div className="h-16 w-16 rounded-lg bg-gray-300"></div>
        <div className="flex-1">
          <div className="mb-2 h-5 w-3/4 rounded bg-gray-300"></div>
          <div className="h-4 w-1/2 rounded bg-gray-300"></div>
        </div>
      </div>
      <div className="mb-4 space-y-2">
        <div className="h-4 w-full rounded bg-gray-300"></div>
        <div className="h-4 w-5/6 rounded bg-gray-300"></div>
      </div>
      <div className="flex gap-2">
        <div className="h-8 w-20 rounded-full bg-gray-300"></div>
        <div className="h-8 w-20 rounded-full bg-gray-300"></div>
      </div>
    </div>
  );
};

export const ProfileHeaderSkeleton = () => {
  return (
    <div className="animate-pulse rounded-xl bg-white shadow-md">
      <div className="h-64 w-full rounded-t-xl bg-gray-300"></div>
      <div className="px-6 pb-6">
        <div className="relative -mt-16 mb-4">
          <div className="h-32 w-32 rounded-full border-4 border-white bg-gray-300"></div>
        </div>
        <div className="space-y-3">
          <div className="h-8 w-48 rounded bg-gray-300"></div>
          <div className="h-4 w-64 rounded bg-gray-300"></div>
          <div className="flex gap-4">
            <div className="h-4 w-24 rounded bg-gray-300"></div>
            <div className="h-4 w-24 rounded bg-gray-300"></div>
            <div className="h-4 w-24 rounded bg-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const NotificationSkeleton = () => {
  return (
    <div className="animate-pulse border-b border-gray-200 p-4">
      <div className="flex gap-3">
        <div className="h-12 w-12 flex-shrink-0 rounded-full bg-gray-300"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 w-full rounded bg-gray-300"></div>
          <div className="h-4 w-3/4 rounded bg-gray-300"></div>
          <div className="h-3 w-24 rounded bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export const MessageSkeleton = () => {
  return (
    <div className="animate-pulse border-b border-gray-200 p-4">
      <div className="flex gap-3">
        <div className="h-14 w-14 flex-shrink-0 rounded-full bg-gray-300"></div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div className="h-5 w-32 rounded bg-gray-300"></div>
            <div className="h-3 w-16 rounded bg-gray-300"></div>
          </div>
          <div className="h-4 w-5/6 rounded bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export const CommentSkeleton = () => {
  return (
    <div className="animate-pulse border-b border-gray-100 p-4">
      <div className="flex gap-3">
        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"></div>
        <div className="flex-1">
          <div className="rounded-2xl bg-gray-200 p-4">
            <div className="mb-2 h-4 w-24 rounded bg-gray-300"></div>
            <div className="space-y-2">
              <div className="h-3 w-full rounded bg-gray-300"></div>
              <div className="h-3 w-4/5 rounded bg-gray-300"></div>
            </div>
          </div>
          <div className="mt-2 flex gap-4">
            <div className="h-3 w-12 rounded bg-gray-300"></div>
            <div className="h-3 w-12 rounded bg-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

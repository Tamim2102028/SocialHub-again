/**
 * Example: How to use RTK Query in your components
 * This shows real-world patterns for API integration
 */

import { useState } from "react";
import {
  useGetGroupsQuery,
  useGetGroupByIdQuery,
  useCreateGroupMutation,
  useJoinGroupMutation,
  useSearchGroupsQuery,
} from "@/store/api/groupApi";
import { GroupCardSkeleton } from "@/components/shared/Skeletons";
import { ErrorFallback } from "@/components/shared/ErrorFallback";
import { showToast } from "@/utils/toast";
import type { Group } from "@/data/group-data/preGroupData";

// Example 1: Fetch all groups with pagination
export const GroupsListExample = () => {
  const [page, setPage] = useState(1);

  // RTK Query hook - automatically handles loading, error, caching
  const { data, isLoading, isError, error, refetch } = useGetGroupsQuery({
    page,
    limit: 10,
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <GroupCardSkeleton key={i} />
          ))}
      </div>
    );
  }

  // Error state
  if (isError) {
    return <ErrorFallback error={error as Error} onReset={refetch} />;
  }

  // Success state
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data?.data.map((group) => (
          <div key={group.id} className="rounded-lg bg-white p-4 shadow">
            <h3 className="font-bold">{group.name}</h3>
            <p className="text-sm text-gray-600">{group.description}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center gap-2">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="rounded bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={!data?.hasMore}
          className="rounded bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

// Example 2: Fetch single group with automatic refetching
export const GroupDetailExample = ({ groupId }: { groupId: string }) => {
  // Automatically fetches when groupId changes
  // Caches the result - won't refetch if already cached
  const { data: group, isLoading } = useGetGroupByIdQuery(groupId, {
    // Optional: Refetch every 30 seconds
    pollingInterval: 30000,
    // Optional: Skip if no groupId
    skip: !groupId,
  });

  if (isLoading) return <GroupCardSkeleton />;

  return (
    <div>
      <h1>{group?.name}</h1>
      <p>{group?.description}</p>
    </div>
  );
};

// Example 3: Create group with mutation
export const CreateGroupExample = () => {
  const [createGroup, { isLoading: isCreating }] = useCreateGroupMutation();

  const handleSubmit = async (formData: Partial<Group>) => {
    try {
      // Call the mutation
      const result = await createGroup(formData).unwrap();

      showToast.success(`Group "${result.name}" created successfully!`);

      // Automatically invalidates cache and refetches group list
    } catch (error) {
      showToast.error("Failed to create group");
      console.error(error);
    }
  };

  return (
    <button
      onClick={() => handleSubmit({ name: "New Group", description: "Test" })}
      disabled={isCreating}
      className="rounded bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
    >
      {isCreating ? "Creating..." : "Create Group"}
    </button>
  );
};

// Example 4: Optimistic update - Join group
export const JoinGroupExample = ({ groupId }: { groupId: string }) => {
  const [joinGroup, { isLoading }] = useJoinGroupMutation();

  const handleJoin = async () => {
    try {
      await joinGroup(groupId).unwrap();
      showToast.success("Successfully joined the group!");

      // Automatically invalidates the group cache
      // Group data will be refetched automatically
    } catch (error) {
      showToast.error("Failed to join group");
    }
  };

  return (
    <button
      onClick={handleJoin}
      disabled={isLoading}
      className="rounded bg-green-500 px-4 py-2 text-white"
    >
      {isLoading ? "Joining..." : "Join Group"}
    </button>
  );
};

// Example 5: Search with debouncing
export const SearchGroupsExample = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Only makes API call when searchTerm changes
  // Automatically debounced by RTK Query
  const { data: searchResults, isFetching } = useSearchGroupsQuery(searchTerm, {
    // Skip if search term is empty
    skip: searchTerm.length < 3,
  });

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search groups..."
        className="w-full rounded border p-2"
      />

      {isFetching && <p>Searching...</p>}

      {searchResults && (
        <div className="mt-4">
          {searchResults.map((group) => (
            <div key={group.id} className="border-b p-2">
              {group.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Example 6: Prefetching data (good for performance)
export const GroupListWithPrefetch = () => {
  const { data } = useGetGroupsQuery({ page: 1 });

  // Prefetch next page on hover
  const handleMouseEnter = () => {
    // This will load the next page in background
    // When user clicks "Next", data is already cached!
  };

  return (
    <div>
      {data?.data.map((group) => (
        <div key={group.id}>{group.name}</div>
      ))}
      <button onMouseEnter={handleMouseEnter}>Next Page</button>
    </div>
  );
};

// Example 7: Manual refetch (force refresh)
export const ManualRefetchExample = () => {
  const { data, refetch, isFetching } = useGetGroupsQuery({ page: 1 });

  return (
    <div>
      <button
        onClick={() => refetch()}
        disabled={isFetching}
        className="rounded bg-blue-500 px-4 py-2 text-white"
      >
        {isFetching ? "Refreshing..." : "Refresh"}
      </button>

      {data?.data.map((group) => (
        <div key={group.id}>{group.name}</div>
      ))}
    </div>
  );
};

/**
 * Key Benefits of RTK Query:
 *
 * 1. ✅ Automatic caching - No duplicate API calls
 * 2. ✅ Loading states - isLoading, isFetching automatically handled
 * 3. ✅ Error handling - Standardized error states
 * 4. ✅ Cache invalidation - Auto-refetch on mutations
 * 5. ✅ Optimistic updates - Update UI before API response
 * 6. ✅ Polling - Auto-refetch at intervals
 * 7. ✅ Prefetching - Load data in background
 * 8. ✅ Type-safe - Full TypeScript support
 * 9. ✅ DevTools - See all API calls in Redux DevTools
 * 10. ✅ No boilerplate - Much less code than manual Redux
 */

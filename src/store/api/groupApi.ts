import { baseApi } from "./baseApi";
import type { Group } from "../../data/group-data/preGroupData";
import type { GroupMember } from "../../data/group-data/groupMembers";

// API Response types
interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Extend base API with group endpoints
export const groupApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all groups with pagination
    getGroups: builder.query<
      PaginatedResponse<Group>,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 10 }) =>
        `/groups?page=${page}&limit=${limit}`,
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Group" as const, id })),
              { type: "Group", id: "LIST" },
            ]
          : [{ type: "Group", id: "LIST" }],
    }),

    // Get single group by ID
    getGroupById: builder.query<Group, string>({
      query: (id) => `/groups/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Group", id }],
    }),

    // Create new group
    createGroup: builder.mutation<Group, Partial<Group>>({
      query: (body) => ({
        url: "/groups",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Group", id: "LIST" }],
    }),

    // Update group
    updateGroup: builder.mutation<Group, { id: string; data: Partial<Group> }>({
      query: ({ id, data }) => ({
        url: `/groups/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Group", id },
        { type: "Group", id: "LIST" },
      ],
    }),

    // Delete group
    deleteGroup: builder.mutation<void, string>({
      query: (id) => ({
        url: `/groups/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Group", id },
        { type: "Group", id: "LIST" },
      ],
    }),

    // Join group
    joinGroup: builder.mutation<void, string>({
      query: (groupId) => ({
        url: `/groups/${groupId}/join`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, groupId) => [
        { type: "Group", id: groupId },
      ],
    }),

    // Leave group
    leaveGroup: builder.mutation<void, string>({
      query: (groupId) => ({
        url: `/groups/${groupId}/leave`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, groupId) => [
        { type: "Group", id: groupId },
      ],
    }),

    // Get group members
    getGroupMembers: builder.query<GroupMember[], string>({
      query: (groupId) => `/groups/${groupId}/members`,
      providesTags: (_result, _error, groupId) => [
        { type: "Group", id: `${groupId}-members` },
      ],
    }),

    // Search groups
    searchGroups: builder.query<Group[], string>({
      query: (searchTerm) => `/groups/search?q=${searchTerm}`,
      providesTags: [{ type: "Group", id: "SEARCH" }],
    }),
  }),
  overrideExisting: false,
});

// Export hooks for usage in components
export const {
  useGetGroupsQuery,
  useGetGroupByIdQuery,
  useCreateGroupMutation,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
  useJoinGroupMutation,
  useLeaveGroupMutation,
  useGetGroupMembersQuery,
  useSearchGroupsQuery,
  useLazySearchGroupsQuery,
} = groupApi;

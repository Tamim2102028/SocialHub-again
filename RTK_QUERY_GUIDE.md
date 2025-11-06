# 🚀 RTK Query Implementation Guide

## ✅ What's Been Set Up

### 1. Base API Configuration

**File:** `src/store/api/baseApi.ts`

- Configured with your API base URL
- Auto-injects auth token from Redux state
- Defines tag types for cache management
- Ready for endpoint injection

### 2. Group API Endpoints

**File:** `src/store/api/groupApi.ts`

Complete CRUD operations for groups:

- ✅ `useGetGroupsQuery` - Fetch paginated groups
- ✅ `useGetGroupByIdQuery` - Fetch single group
- ✅ `useCreateGroupMutation` - Create new group
- ✅ `useUpdateGroupMutation` - Update existing group
- ✅ `useDeleteGroupMutation` - Delete group
- ✅ `useJoinGroupMutation` - Join group
- ✅ `useLeaveGroupMutation` - Leave group
- ✅ `useGetGroupMembersQuery` - Get group members
- ✅ `useSearchGroupsQuery` - Search groups

### 3. Store Integration

**File:** `src/store/store.ts`

- Added `baseApi` reducer
- Added RTK Query middleware
- Ready to use in components

### 4. Environment Variables

**Files:** `.env.development`, `.env.production`

- Development: `http://localhost:3000/api`
- Production: `https://api.socialhub.com`

---

## 📖 How to Use RTK Query

### Basic Query (GET Request)

```tsx
import { useGetGroupsQuery } from "@/store/api/groupApi";

function GroupsList() {
  const { data, isLoading, isError, error } = useGetGroupsQuery({
    page: 1,
    limit: 10,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.data.map((group) => (
        <div key={group.id}>{group.name}</div>
      ))}
    </div>
  );
}
```

### Mutation (POST/PUT/DELETE)

```tsx
import { useCreateGroupMutation } from "@/store/api/groupApi";
import { showToast } from "@/utils/toast";

function CreateGroup() {
  const [createGroup, { isLoading }] = useCreateGroupMutation();

  const handleCreate = async (groupData) => {
    try {
      const result = await createGroup(groupData).unwrap();
      showToast.success("Group created!");
      // Automatically refetches group list
    } catch (error) {
      showToast.error("Failed to create group");
    }
  };

  return (
    <button onClick={handleCreate} disabled={isLoading}>
      {isLoading ? "Creating..." : "Create"}
    </button>
  );
}
```

### With Loading Skeleton

```tsx
import { useGetGroupsQuery } from "@/store/api/groupApi";
import { GroupCardSkeleton } from "@/components/shared/Skeletons";

function Groups() {
  const { data, isLoading } = useGetGroupsQuery({ page: 1 });

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <GroupCardSkeleton key={i} />
          ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {data?.data.map((group) => (
        <GroupCard key={group.id} data={group} />
      ))}
    </div>
  );
}
```

---

## 🔄 Updating Your Existing Pages

### Step 1: Update Groups Page

**Before (using local state):**

```tsx
const groups = useAppSelector((state) => state.groups.groups);
```

**After (using RTK Query):**

```tsx
const { data: groups, isLoading } = useGetGroupsQuery({ page: 1, limit: 20 });
```

### Step 2: Update CreateGroupPage

**In your onSubmit:**

```tsx
import { useCreateGroupMutation } from "@/store/api/groupApi";

const [createGroup] = useCreateGroupMutation();

const onSubmit = async (data: GroupFormData) => {
  try {
    await createGroup(newGroup).unwrap();
    showToast.success("Group created!");
    navigate("/groups");
  } catch (error) {
    showToast.error("Failed to create group");
  }
};
```

---

## 🎯 Migration Strategy

### Phase 1: Test with One Feature (Groups)

1. Keep existing Redux slice for backward compatibility
2. Add RTK Query hooks alongside
3. Test thoroughly
4. Remove old code once working

### Phase 2: Expand to Other Features

```
✅ Groups API (Done)
🔜 Posts API
🔜 Comments API
🔜 Users API
🔜 Messages API
🔜 Notifications API
```

### Phase 3: Backend Integration

When backend is ready:

1. Update `.env` with real API URL
2. Remove mock data
3. Test endpoints
4. Handle real errors

---

## 🔧 Creating More API Endpoints

### Example: Posts API

```typescript
// src/store/api/postApi.ts
import { baseApi } from "./baseApi";
import type { Post } from "@/models/Post";

export const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => "/posts",
      providesTags: ["Post"],
    }),

    createPost: builder.mutation<Post, Partial<Post>>({
      query: (body) => ({
        url: "/posts",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Post"],
    }),

    likePost: builder.mutation<void, string>({
      query: (postId) => ({
        url: `/posts/${postId}/like`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, postId) => [
        { type: "Post", id: postId },
      ],
    }),
  }),
});

export const { useGetPostsQuery, useCreatePostMutation, useLikePostMutation } =
  postApi;
```

---

## 🛠️ Advanced Features

### 1. Optimistic Updates

Update UI before API response:

```typescript
useEffect(() => {
  if (data) {
    // Update UI immediately
    dispatch(updateLocalState(data));
  }
}, [data]);
```

### 2. Polling (Auto-refresh)

```typescript
const { data } = useGetGroupsQuery(
  { page: 1 },
  { pollingInterval: 30000 } // Refetch every 30s
);
```

### 3. Skip Queries

```typescript
const { data } = useGetGroupByIdQuery(groupId, {
  skip: !groupId, // Don't fetch if no ID
});
```

### 4. Manual Refetch

```typescript
const { refetch } = useGetGroupsQuery({ page: 1 });

<button onClick={refetch}>Refresh</button>
```

### 5. Prefetching

```typescript
import { useDispatch } from "react-redux";
import { groupApi } from "@/store/api/groupApi";

const dispatch = useDispatch();

const prefetchNextPage = () => {
  dispatch(
    groupApi.util.prefetch("getGroups", { page: 2 }, { force: false })
  );
};

<div onMouseEnter={prefetchNextPage}>Next Page</div>
```

---

## 🐛 Troubleshooting

### Issue: "Cannot read property 'data' of undefined"

**Solution:** Check if query is loading first:

```typescript
if (isLoading) return <Skeleton />;
if (!data) return null;
// Now safe to use data
```

### Issue: Cache not invalidating

**Solution:** Check tag types match:

```typescript
// In baseApi.ts
tagTypes: ["Group", "Post"];

// In mutation
invalidatesTags: ["Group"];
```

### Issue: Token not being sent

**Solution:** Check auth slice has token:

```typescript
// In authSlice
state.token = "your-token";
```

---

## 📚 Resources

- RTK Query Docs: https://redux-toolkit.js.org/rtk-query/overview
- Examples File: `EXAMPLES_RTK_QUERY.tsx`
- Redux DevTools: Install extension to see API calls

---

## ✅ Checklist

- [x] Base API configured
- [x] Group API endpoints created
- [x] Store updated with middleware
- [x] Environment variables set
- [ ] Update Groups page to use RTK Query
- [ ] Update CreateGroupPage mutation
- [ ] Test with mock backend/MSW
- [ ] Create more API endpoints (Posts, Users, etc.)
- [ ] Integrate with real backend

---

**Next Steps:**

1. Install Redux DevTools extension
2. Update Groups page to use `useGetGroupsQuery`
3. Test creating a group with `useCreateGroupMutation`
4. See API calls in Redux DevTools
5. Expand to other features!

**Ekhon tumi production-ready backend integration setup paiso! 🎉**

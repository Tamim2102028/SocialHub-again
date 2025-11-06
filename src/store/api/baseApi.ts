import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

// Base API configuration
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || "/api",
    prepareHeaders: (headers, { getState }) => {
      // Get token from Redux state
      const token = (getState() as RootState).auth.token;

      // If we have a token, include it in headers
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  // Define tag types for cache invalidation
  tagTypes: ["Group", "Post", "User", "Comment", "Notification", "Message"],
  // Empty endpoints - will be injected by feature APIs
  endpoints: () => ({}),
});

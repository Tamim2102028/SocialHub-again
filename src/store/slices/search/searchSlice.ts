import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

// Types
export interface SearchPerson {
  id: string;
  name: string;
  username: string;
  avatar: string;
  university?: string;
  role?: "student" | "teacher";
  mutualFriends?: number;
  relationStatus?: "friend" | "pending" | "none" | "received";
}

export interface SearchHashtag {
  id: string;
  tag: string;
  posts: string;
}

interface SearchState {
  query: string;
  activeFilter: "all" | "people" | "posts" | "hashtags";
  people: SearchPerson[];
  hashtags: SearchHashtag[];
  recentSearches: string[];
}

const initialState: SearchState = {
  query: "",
  activeFilter: "all",
  people: [
    {
      id: "2",
      name: "Tanvir Ahmed (2/15)",
      username: "tanvira",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
      university: "Dhaka College",
      role: "student",
      mutualFriends: 3,
      relationStatus: "none",
    },
    {
      id: "3",
      name: "Sabbir Hossain (3/15)",
      username: "sabbirh",
      avatar: "https://randomuser.me/api/portraits/men/11.jpg",
      university: "DU - CSE",
      role: "student",
      mutualFriends: 5,
      relationStatus: "received",
    },
    {
      id: "4",
      name: "Mahmudul Hasan (4/15)",
      username: "mahmudulh",
      avatar: "https://randomuser.me/api/portraits/men/13.jpg",
      university: "Dhaka College",
      role: "student",
      mutualFriends: 2,
      relationStatus: "friend",
    },
    {
      id: "5",
      name: "Fahim Hasan (5/15)",
      username: "fahimh",
      avatar: "https://randomuser.me/api/portraits/men/23.jpg",
      university: "Dhaka College",
      role: "student",
      mutualFriends: 8,
      relationStatus: "pending",
    },
    {
      id: "6",
      name: "Maliha Sultana (6/15)",
      username: "malihas",
      avatar: "https://randomuser.me/api/portraits/women/26.jpg",
      university: "Holy Cross College",
      role: "student",
      mutualFriends: 4,
      relationStatus: "none",
    },
    {
      id: "7",
      name: "Shirin Akter (7/15)",
      username: "shirina",
      avatar: "https://randomuser.me/api/portraits/women/24.jpg",
      university: "Rajuk College",
      role: "teacher",
      mutualFriends: 6,
      relationStatus: "none",
    },
    {
      id: "8",
      name: "Rony Ahmed (8/15)",
      username: "ronya",
      avatar: "https://randomuser.me/api/portraits/men/25.jpg",
      university: "RUET - ME",
      role: "teacher",
      mutualFriends: 7,
      relationStatus: "received",
    },
    {
      id: "9",
      name: "Sabbir khan (9/15)",
      username: "sabbirk",
      avatar: "https://randomuser.me/api/portraits/women/29.jpg",
      university: "CUET - ME",
      role: "student",
      mutualFriends: 3,
      relationStatus: "friend",
    },
    {
      id: "10",
      name: "Imran Hossain (10/15)",
      username: "imran10",
      avatar: "https://randomuser.me/api/portraits/men/30.jpg",
      university: "Notre Dame College",
      role: "student",
      mutualFriends: 5,
      relationStatus: "none",
    },
  ],
  hashtags: [
    { id: "1", tag: "#photography", posts: "12.3K posts" },
    { id: "2", tag: "#travel", posts: "8.7K posts" },
    { id: "3", tag: "#coding", posts: "5.2K posts" },
    { id: "4", tag: "#food", posts: "4.1K posts" },
  ],
  recentSearches: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
      if (
        action.payload.trim() &&
        !state.recentSearches.includes(action.payload)
      ) {
        state.recentSearches.unshift(action.payload);
        if (state.recentSearches.length > 10) {
          state.recentSearches = state.recentSearches.slice(0, 10);
        }
      }
    },

    setActiveFilter: (
      state,
      action: PayloadAction<"all" | "people" | "posts" | "hashtags">
    ) => {
      state.activeFilter = action.payload;
    },

    clearSearchQuery: (state) => {
      state.query = "";
    },

    clearRecentSearches: (state) => {
      state.recentSearches = [];
    },

    removeRecentSearch: (state, action: PayloadAction<string>) => {
      state.recentSearches = state.recentSearches.filter(
        (search) => search !== action.payload
      );
    },

    // Friend relation actions
    sendFriendRequest: (state, action: PayloadAction<string>) => {
      const person = state.people.find((p) => p.id === action.payload);
      if (person) {
        person.relationStatus = "pending";
      }
    },

    cancelFriendRequest: (state, action: PayloadAction<string>) => {
      const person = state.people.find((p) => p.id === action.payload);
      if (person) {
        person.relationStatus = "none";
      }
    },

    acceptFriendRequest: (state, action: PayloadAction<string>) => {
      const person = state.people.find((p) => p.id === action.payload);
      if (person) {
        person.relationStatus = "friend";
      }
    },

    declineFriendRequest: (state, action: PayloadAction<string>) => {
      const person = state.people.find((p) => p.id === action.payload);
      if (person) {
        person.relationStatus = "none";
      }
    },

    unfriend: (state, action: PayloadAction<string>) => {
      const person = state.people.find((p) => p.id === action.payload);
      if (person) {
        person.relationStatus = "none";
      }
    },
  },
});

export const {
  setSearchQuery,
  setActiveFilter,
  clearSearchQuery,
  clearRecentSearches,
  removeRecentSearch,
  sendFriendRequest,
  cancelFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  unfriend,
} = searchSlice.actions;

// Selectors
export const selectSearchQuery = (state: RootState) => state.search.query;
export const selectActiveFilter = (state: RootState) =>
  state.search.activeFilter;
export const selectRecentSearches = (state: RootState) =>
  state.search.recentSearches;

export const selectFilteredPeople = (state: RootState) => {
  const { query, people } = state.search;
  // Show nothing if search query is empty
  if (!query.trim()) return [];
  const lowerQuery = query.toLowerCase();
  return people.filter(
    (person) =>
      person.name.toLowerCase().includes(lowerQuery) ||
      person.username.toLowerCase().includes(lowerQuery)
  );
};

export const selectFilteredPosts = (state: RootState) => {
  const { query } = state.search;
  const posts = state.posts.posts; // Get posts from postsSlice
  // Show nothing if search query is empty
  if (!query.trim()) return [];
  const lowerQuery = query.toLowerCase();
  return posts.filter((post) => {
    // Search in post content
    return post.content.toLowerCase().includes(lowerQuery);
  });
};

export const selectFilteredHashtags = (state: RootState) => {
  const { query, hashtags } = state.search;
  // Show nothing if search query is empty
  if (!query.trim()) return [];
  const lowerQuery = query.toLowerCase();
  return hashtags.filter((hashtag) =>
    hashtag.tag.toLowerCase().includes(lowerQuery)
  );
};

export default searchSlice.reducer;

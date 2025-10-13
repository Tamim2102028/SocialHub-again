import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  groupsData,
  getGroupsByUserId,
  type Group,
} from "../../data/groupsData";

interface GroupsState {
  myGroups: Group[];
  suggestedGroups: Group[];
  careerGroups: Group[];
  loading: boolean;
  error: string | null;
  joinedGroups: string[]; // Array of group IDs user has joined
}

// Helper function to categorize groups
const categorizeGroups = (groups: Group[]) => {
  const myGroups = getGroupsByUserId("1"); // Current user ID
  const careerGroups = groups.filter(
    (group) =>
      group.category === "Job & Career" ||
      group.category === "Technology" ||
      group.category === "Education"
  );
  const suggestedGroups = groups.filter(
    (group) =>
      !myGroups.some((myGroup) => myGroup.groupId === group.groupId) &&
      !careerGroups.some((careerGroup) => careerGroup.groupId === group.groupId)
  );

  return { myGroups, suggestedGroups, careerGroups };
};

const { myGroups, suggestedGroups, careerGroups } =
  categorizeGroups(groupsData);

const initialState: GroupsState = {
  myGroups,
  suggestedGroups,
  careerGroups,
  loading: false,
  error: null,
  joinedGroups: myGroups.map((group) => group.groupId), // Initially joined groups
};

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    // Fetch groups
    fetchGroupsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchGroupsSuccess: (
      state,
      action: PayloadAction<{
        myGroups: Group[];
        suggestedGroups: Group[];
        careerGroups: Group[];
      }>
    ) => {
      state.myGroups = action.payload.myGroups;
      state.suggestedGroups = action.payload.suggestedGroups;
      state.careerGroups = action.payload.careerGroups;
      state.loading = false;
      state.error = null;
    },
    fetchGroupsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Join group
    joinGroup: (state, action: PayloadAction<string>) => {
      const groupId = action.payload;

      // Add to joined groups if not already joined
      if (!state.joinedGroups.includes(groupId)) {
        state.joinedGroups.push(groupId);
      }

      // Check suggested groups
      let groupIndex = state.suggestedGroups.findIndex(
        (g) => g.groupId === groupId
      );
      if (groupIndex !== -1) {
        const group = state.suggestedGroups[groupIndex];
        state.suggestedGroups.splice(groupIndex, 1);
        state.myGroups.push({
          ...group,
          memberCount: group.memberCount + 1,
        });
        return;
      }

      // Check career groups
      groupIndex = state.careerGroups.findIndex((g) => g.groupId === groupId);
      if (groupIndex !== -1) {
        const group = state.careerGroups[groupIndex];
        state.careerGroups.splice(groupIndex, 1);
        state.myGroups.push({
          ...group,
          memberCount: group.memberCount + 1,
        });
      }
    },

    // Leave group
    leaveGroup: (state, action: PayloadAction<string>) => {
      const groupId = action.payload;

      // Remove from joined groups
      state.joinedGroups = state.joinedGroups.filter((id) => id !== groupId);

      // Find and move from my groups back to appropriate category
      const groupIndex = state.myGroups.findIndex((g) => g.groupId === groupId);
      if (groupIndex !== -1) {
        const group = state.myGroups[groupIndex];
        state.myGroups.splice(groupIndex, 1);

        // Check if it's a career group
        if (
          group.category === "Job & Career" ||
          group.category === "Technology" ||
          group.category === "Education"
        ) {
          state.careerGroups.push({
            ...group,
            memberCount: Math.max(0, group.memberCount - 1),
          });
        } else {
          state.suggestedGroups.push({
            ...group,
            memberCount: Math.max(0, group.memberCount - 1),
          });
        }
      }
    },

    // Create new group
    createGroup: (state, action: PayloadAction<Group>) => {
      state.myGroups.unshift(action.payload);
      state.joinedGroups.push(action.payload.groupId);
    },

    // Update group info
    updateGroup: (
      state,
      action: PayloadAction<{
        groupId: string;
        updates: Partial<Group>;
      }>
    ) => {
      const { groupId, updates } = action.payload;

      // Update in my groups
      const myGroupIndex = state.myGroups.findIndex(
        (g) => g.groupId === groupId
      );
      if (myGroupIndex !== -1) {
        state.myGroups[myGroupIndex] = {
          ...state.myGroups[myGroupIndex],
          ...updates,
        };
      }

      // Update in suggested groups
      const suggestedGroupIndex = state.suggestedGroups.findIndex(
        (g) => g.groupId === groupId
      );
      if (suggestedGroupIndex !== -1) {
        state.suggestedGroups[suggestedGroupIndex] = {
          ...state.suggestedGroups[suggestedGroupIndex],
          ...updates,
        };
      }
    },

    // Update member count
    updateMemberCount: (
      state,
      action: PayloadAction<{
        groupId: string;
        count: number;
      }>
    ) => {
      const { groupId, count } = action.payload;

      // Update in my groups
      const myGroup = state.myGroups.find((g) => g.groupId === groupId);
      if (myGroup) {
        myGroup.memberCount = count;
      }

      // Update in suggested groups
      const suggestedGroup = state.suggestedGroups.find(
        (g) => g.groupId === groupId
      );
      if (suggestedGroup) {
        suggestedGroup.memberCount = count;
      }
    },

    // Clear error
    clearGroupsError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchGroupsStart,
  fetchGroupsSuccess,
  fetchGroupsFailure,
  joinGroup,
  leaveGroup,
  createGroup,
  updateGroup,
  updateMemberCount,
  clearGroupsError,
} = groupsSlice.actions;

export default groupsSlice.reducer;

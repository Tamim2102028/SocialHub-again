import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import sampleRooms, {
  type Room as SampleRoom,
} from "../../../data/rooms-data/roomsData";
import roomMembers, { 
  type RoomMember 
} from "../../../data/rooms-data/roomMembers";

export interface ClassRoomState {
  rooms: SampleRoom[];
  members: RoomMember[]; // Add members to Redux state
  currentUserId?: string;
}

const initialState: ClassRoomState = {
  rooms: sampleRooms.map((r: SampleRoom) => ({ ...r })),
  members: [...roomMembers], // Initialize with sample data
  currentUserId: undefined,
};

const classRoomSlice = createSlice({
  name: "classRoom",
  initialState,
  reducers: {
    loadRooms(state, action: PayloadAction<SampleRoom[]>) {
      state.rooms = action.payload.map((r) => ({ ...r }));
    },

    setCurrentUser(state, action: PayloadAction<string | undefined>) {
      state.currentUserId = action.payload;
    },

    toggleRoomStatus(
      state,
      action: PayloadAction<{ userId: string; roomId: string }>
    ) {
      // Find the membership and toggle its status
      const { userId, roomId } = action.payload;
      const membership = state.members.find(
        (m) => m.userId === userId && m.roomId === roomId
      );
      
      if (membership) {
        // Toggle between "open" and "hide"
        membership.status = membership.status === "hide" ? "open" : "hide";
      }
    },

    // helpers for future: create/update/delete room
    updateRoom(state, action: PayloadAction<SampleRoom>) {
      const updated = action.payload;
      const idx = state.rooms.findIndex((r: SampleRoom) => r.id === updated.id);
      if (idx >= 0) state.rooms[idx] = { ...updated };
      else state.rooms.push({ ...updated });
    },
  },
});

export const { loadRooms, setCurrentUser, toggleRoomStatus, updateRoom } =
  classRoomSlice.actions;
export default classRoomSlice.reducer;

// selectors
export const selectAllRooms = (state: { classRoom: ClassRoomState }) =>
  state.classRoom.rooms.filter((r) => !r.isDeleted);

export const selectOpenRooms = (state: { classRoom: ClassRoomState }) =>
  state.classRoom.rooms.filter((r) => !r.isDeleted);

export const selectHiddenRooms = (state: { classRoom: ClassRoomState }) =>
  state.classRoom.rooms.filter((r) => !r.isDeleted);

export const selectDeletedRooms = (state: { classRoom: ClassRoomState }) =>
  state.classRoom.rooms.filter((r) => r.isDeleted);

// Member selectors
export const selectAllMembers = (state: { classRoom: ClassRoomState }) =>
  state.classRoom.members;

export const selectVisibleRoomIds = (
  state: { classRoom: ClassRoomState },
  userId: string
) =>
  state.classRoom.members
    .filter((m) => m.userId === userId && (m.status === "open" || !m.status))
    .map((m) => m.roomId);

export const selectHiddenRoomIds = (
  state: { classRoom: ClassRoomState },
  userId: string
) =>
  state.classRoom.members
    .filter((m) => m.userId === userId && m.status === "hide")
    .map((m) => m.roomId);

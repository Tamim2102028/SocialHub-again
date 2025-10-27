import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import sampleRooms, {
  type Room as SampleRoom,
} from "../../../data/rooms-data/roomsData";

export interface ClassRoomState {
  rooms: SampleRoom[];
}

const initialState: ClassRoomState = {
  // clone fixture so reducers can mutate safely in-memory
  rooms: sampleRooms.map((r: SampleRoom) => ({ ...r })),
};

const classRoomSlice = createSlice({
  name: "classRoom",
  initialState,
  reducers: {
    loadRooms(state, action: PayloadAction<SampleRoom[]>) {
      state.rooms = action.payload.map((r) => ({ ...r }));
    },

    toggleRoomStatus(state, action: PayloadAction<string>) {
      const id = action.payload;
      const idx = state.rooms.findIndex((r: SampleRoom) => r.id === id);
      if (idx >= 0) {
        state.rooms[idx].status =
          state.rooms[idx].status === "hide" ? "open" : "hide";
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

export const { loadRooms, toggleRoomStatus, updateRoom } =
  classRoomSlice.actions;
export default classRoomSlice.reducer;

// selectors
export const selectAllRooms = (state: { classRoom: ClassRoomState }) =>
  state.classRoom.rooms;
export const selectOpenRooms = (state: { classRoom: ClassRoomState }) =>
  state.classRoom.rooms.filter((r) => r.status === "open");
export const selectHiddenRooms = (state: { classRoom: ClassRoomState }) =>
  state.classRoom.rooms.filter((r) => r.status === "hide");
export const selectDeletedRooms = (state: { classRoom: ClassRoomState }) =>
  state.classRoom.rooms.filter((r) => r.status === "delete");

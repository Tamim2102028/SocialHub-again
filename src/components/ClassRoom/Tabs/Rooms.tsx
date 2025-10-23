import React, { useEffect, useState } from "react";
// RoomCard contains the visual markup and needed imports
import type { Room as SampleRoom } from "../../../data/rooms-data/roomsData";
import RoomForm from "../RoomForm";
import RoomCard from "../RoomCard";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import type { RootState } from "../../../store/store";
import {
  toggleRoomStatus,
  selectOpenRooms,
  selectHiddenRooms,
} from "../../../store/slices/classRoom/classRoomSlice";
type CreatePayload = {
  university: string;
  department: string;
  section: string;
  subsection: string;
};
const Rooms: React.FC<{
  showCreateForm?: boolean;
  onCreate?: (data: CreatePayload) => void;
  onCancelCreate?: () => void;
}> = ({ showCreateForm = false, onCreate, onCancelCreate }) => {
  const dispatch = useAppDispatch();
  // read rooms from redux slice exclusively
  const openRooms = useAppSelector((s: RootState) => selectOpenRooms(s));
  const hiddenRooms = useAppSelector((s: RootState) => selectHiddenRooms(s));
  // keep menu state locally
  const [menuOpenFor, setMenuOpenFor] = useState<string | null>(null);

  useEffect(() => {
    // clear any open menu when room lists change
    setMenuOpenFor(null);
  }, [openRooms.length, hiddenRooms.length]);

  useEffect(() => {
    const onDocClick = () => setMenuOpenFor(null);
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const toggleMenu = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuOpenFor((prev) => (prev === id ? null : id));
  };

  const toggleRoomStatusLocal = (id: string) => {
    // dispatch redux action to toggle status
    dispatch(toggleRoomStatus(id));
    setMenuOpenFor(null);
  };

  return (
    <div className="space-y-3">
      {/* header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Rooms</h2>
      </div>

      {/* create room form */}
      {showCreateForm && (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow">
          <div>
            <RoomForm
              onSubmit={(d) => onCreate?.(d)}
              onCancel={onCancelCreate}
            />
          </div>
        </div>
      )}

      {/* no rooms message */}
      {openRooms.length + hiddenRooms.length === 0 ? (
        <div className="rounded-xl border border-gray-300 bg-white p-6 shadow">
          <p className="text-sm text-gray-600">
            No rooms yet. Create one to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {openRooms
            .filter((rr) => (rr as SampleRoom).status !== "hide")
            .map((r) => (
              <RoomCard
                key={r.id}
                room={r}
                menuOpenFor={menuOpenFor}
                toggleMenu={toggleMenu}
                onToggleStatus={toggleRoomStatusLocal}
              />
            ))}
        </div>
      )}

      {hiddenRooms.filter((rr) => (rr as SampleRoom).status === "hide").length >
        0 && (
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-gray-900">Hidden Rooms</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {hiddenRooms
              .filter((rr) => (rr as SampleRoom).status === "hide")
              .map((r) => (
                <RoomCard
                  key={r.id}
                  room={r}
                  menuOpenFor={menuOpenFor}
                  toggleMenu={toggleMenu}
                  onToggleStatus={toggleRoomStatusLocal}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Rooms;

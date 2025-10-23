import React from "react";
import dayjs from "dayjs";
import Header from "../components/ClassRoom/Header";
import ClassroomTabs from "../components/ClassRoom/ClassroomTabs";
// Section component removed per request
import { Routes, Route, Navigate } from "react-router-dom";
import { useMatch } from "react-router-dom";
import Rooms from "../components/ClassRoom/Tabs/Rooms";
import LiveTab from "../components/ClassRoom/Tabs/LiveTab";
import GroupsTab from "../components/ClassRoom/Tabs/GroupsTab";
import CommunityTab from "../components/ClassRoom/Tabs/CommunityTab";
import MoreTab from "../components/ClassRoom/Tabs/MoreTab";
import RoomDetails from "./ClassRoom/RoomDetails";

import { useAppDispatch } from "../store/hooks";
import { updateRoom } from "../store/slices/classRoomSlice";
import type { Room as SampleRoom } from "../data/roomsData";

const ClassRoom: React.FC = () => {
  const dispatch = useAppDispatch();
  const [showCreateForm, setShowCreateForm] = React.useState<boolean>(false);

  const openCreateForm = () => setShowCreateForm(true);
  const closeCreateForm = () => setShowCreateForm(false);

  const handleCreate = (data: {
    university: string;
    department: string;
    section: string;
    subsection: string;
  }) => {
    const id = `room_${Date.now()}`;
    const room: SampleRoom = {
      id,
      name: `${data.university} / ${data.department} / ${data.section}${data.subsection ? `-${data.subsection}` : ""}`,
      status: "open",
      members: [],
      createdAt: dayjs().toISOString(),
    };
    // dispatch to redux slice (updateRoom will add if not existing)
    dispatch(updateRoom(room));
    setShowCreateForm(false);
  };

  const matchIndex = useMatch({ path: "/classroom", end: true });

  return (
    <div className="space-y-5">
      <Header onOpenCreate={openCreateForm} showCreate={!!matchIndex} />
      <ClassroomTabs />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-1">
        <main>
          <Routes>
            <Route
              index
              element={
                <Rooms
                  showCreateForm={showCreateForm}
                  onCreate={handleCreate}
                  onCancelCreate={closeCreateForm}
                />
              }
            />
            <Route path="live" element={<LiveTab />} />
            <Route path="groups" element={<GroupsTab />} />
            <Route path="community" element={<CommunityTab />} />
            <Route path="more" element={<MoreTab />} />
            {/* room details route */}
            <Route path="rooms/:roomId" element={<RoomDetails />} />
            {/* redirect unknown to index */}
            <Route path="*" element={<Navigate to="." replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default ClassRoom;

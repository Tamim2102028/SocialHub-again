import React from "react";
import dayjs from "dayjs";
import Header from "../components/ClassRoom/Header";
import ClassroomTabs from "../components/ClassRoom/ClassroomTabs";
// Section component removed per request
import { Routes, Route, Navigate } from "react-router-dom";
import Rooms from "../components/ClassRoom/Tabs/Rooms";
import LiveTab from "../components/ClassRoom/Tabs/LiveTab";
import GroupsTab from "../components/ClassRoom/Tabs/GroupsTab";
import CommunityTab from "../components/ClassRoom/Tabs/CommunityTab";
import MoreTab from "../components/ClassRoom/Tabs/MoreTab";

type Room = {
  id: string;
  name: string;
  createdAt: string;
};

const ClassRoom: React.FC = () => {
  const [rooms, setRooms] = React.useState<Room[]>([]);
  const [showCreateForm, setShowCreateForm] = React.useState<boolean>(false);

  const openCreateForm = () => setShowCreateForm(true);
  const closeCreateForm = () => setShowCreateForm(false);

  const handleCreate = (data: { university: string; department: string; section: string; subsection: string }) => {
    const id = `room_${Date.now()}`;
    const room: Room = {
      id,
      name: `${data.university} / ${data.department} / ${data.section}${data.subsection ? `-${data.subsection}` : ""}`,
      createdAt: dayjs().toISOString(),
    };
    setRooms((prev) => [room, ...prev]);
    setShowCreateForm(false);
  };

  return (
    <div className="space-y-5">
  <Header onOpenCreate={openCreateForm} />
      <ClassroomTabs />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-1">
        <main>
          <Routes>
            <Route index element={<Rooms rooms={rooms} showCreateForm={showCreateForm} onCreate={handleCreate} onCancelCreate={closeCreateForm} />} />
            <Route path="live" element={<LiveTab />} />
            <Route path="groups" element={<GroupsTab />} />
            <Route path="community" element={<CommunityTab />} />
            <Route path="more" element={<MoreTab />} />
            {/* redirect unknown to index */}
            <Route path="*" element={<Navigate to="." replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default ClassRoom;

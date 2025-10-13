﻿import React, { useState, useMemo } from "react";
import { useAppSelector } from "../../store/hooks";
import UseTicketCard from "../../components/Gaming/Achievements/UseTicketCard";
import PartnerRestaurants from "../../components/Gaming/Achievements/PartnerRestaurants";
import TicketsTabs from "../../components/Gaming/Achievements/TicketsTabs";
import HowItWorks from "../../components/Gaming/Achievements/HowItWorks";

const Achievements: React.FC = () => {
  const { userTickets, restaurants } = useAppSelector(
    (state) => state.achievement
  );

  const [selectedTicketId, setSelectedTicketId] = useState("");
  const [activeTab, setActiveTab] = useState<"available" | "used">("available");

  const availableTickets = useMemo(
    () => userTickets.filter((t) => !t.isUsed),
    [userTickets]
  );

  const usedTickets = useMemo(
    () => userTickets.filter((t) => t.isUsed),
    [userTickets]
  );

  const handleUseTicket = (ticketId: string) => {
    setSelectedTicketId(ticketId);
  };

  return (
    <div className="space-y-5">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          🏆 Tournament Rewards
        </h2>
        <p className="mt-2 text-gray-600">
          Use your winning tickets at partner restaurants
        </p>
      </div>
      <PartnerRestaurants restaurants={restaurants} />

      {/* Show ticket usage card when a ticket is selected */}
      {selectedTicketId && (
        <UseTicketCard
          ticketId={selectedTicketId}
          onCancel={() => setSelectedTicketId("")}
        />
      )}

      <TicketsTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        availableTickets={availableTickets}
        usedTickets={usedTickets}
        restaurants={restaurants}
        onUseTicket={handleUseTicket}
      />
      <HowItWorks />
    </div>
  );
};

export default Achievements;

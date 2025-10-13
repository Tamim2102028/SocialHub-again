import React from "react";
import { useAppSelector } from "../../store/hooks";
import BloodDonationHeader from "../../components/MainMore/BloodDonation/BloodDonationHeader";
import BloodDonationTabs from "../../components/MainMore/BloodDonation/BloodDonationTabs";
import BloodRequestsTab from "../../components/MainMore/BloodDonation/BloodRequestsTab";
import FindDonorsTab from "../../components/MainMore/BloodDonation/FindDonorsTab";
import DonorListTab from "../../components/MainMore/BloodDonation/DonorListTab";

const BloodDonation: React.FC = () => {
  const { activeTab } = useAppSelector((state) => state.bloodDonation);

  return (
    <div className="mx-auto min-h-screen max-w-7xl space-y-5">
      <BloodDonationHeader />
      <BloodDonationTabs />

      {activeTab === "requests" && <BloodRequestsTab />}
      {activeTab === "donors" && <FindDonorsTab />}
      {activeTab === "donorList" && <DonorListTab />}

      {/* Motivational Footer */}
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center">
        <p className="text-sm font-medium text-red-800">
          Every drop counts. Every donor is a hero.
        </p>
      </div>
    </div>
  );
};

export default BloodDonation;

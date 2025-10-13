import React from "react";

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">ClassRoom</h1>
        <p className="text-gray-600">Join and manage your online classes.</p>
      </div>
    </header>
  );
};

export default Header;

import React from "react";

const ProfileHeader = ({ name, role, avatar }) => {
  return (
    <div className="bg-blue-600 text-white p-6 rounded-xl flex items-center gap-4">
      <img src={avatar} alt="Avatar" className="w-16 h-16 rounded-full border-2 border-white" />
      <div>
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-sm opacity-80">{role}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;

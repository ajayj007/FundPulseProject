import React from "react";

const ProfileCard = ({ name, role, avatar }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md flex items-center gap-4">
      <img src={avatar} alt="User" className="w-12 h-12 rounded-full" />
      <div>
        <h4 className="font-semibold">{name}</h4>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
  );
};

export default ProfileCard;

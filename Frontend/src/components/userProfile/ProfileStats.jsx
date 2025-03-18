import React from "react";

const ProfileStats = ({ projects, followers, following }) => {
  return (
    <div className="grid grid-cols-3 gap-4 text-center bg-white p-6 rounded-xl shadow-md">
      <div>
        <h4 className="text-xl font-bold">{projects}</h4>
        <p className="text-sm text-gray-500">Projects</p>
      </div>
      <div>
        <h4 className="text-xl font-bold">{followers}</h4>
        <p className="text-sm text-gray-500">Followers</p>
      </div>
      <div>
        <h4 className="text-xl font-bold">{following}</h4>
        <p className="text-sm text-gray-500">Following</p>
      </div>
    </div>
  );
};

export default ProfileStats;

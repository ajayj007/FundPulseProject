import React from "react";

const ProfileActivity = ({ activities }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <ul className="space-y-2">
        {activities.map((activity, index) => (
          <li key={index} className="text-gray-600">
            • {activity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileActivity;

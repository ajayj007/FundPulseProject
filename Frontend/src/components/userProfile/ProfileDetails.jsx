import React from "react";

const ProfileDetails = ({ email, phone, location }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
      <p>Email: {email}</p>
      <p>Phone: {phone}</p>
      <p>Location: {location}</p>
    </div>
  );
};

export default ProfileDetails;

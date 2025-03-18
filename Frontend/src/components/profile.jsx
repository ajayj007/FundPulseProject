import React from "react";
import ProfileHeader from "./userProfile/ProfileHeader";
import ProfileDetails from "./userProfile/ProfileDetails";
import ProfileStats from "./userProfile/ProfileStats";
import ProfileActivity from "./userProfile/ProfileActivity";
import InvestmentSlider from "./userProfile/InvestmentSlider";
import Header from "./dashboard/Header";

const Profile = () => {
  const user = {
    name: "John Doe",
    role: "Full-Stack Developer",
    avatar: "https://via.placeholder.com/100",
    email: "johndoe@example.com",
    phone: "+123 456 789",
    location: "New York, USA",
    projects: 12,
    followers: 320,
    following: 180,
    activities: ["Updated project X", "Followed Jane Smith", "Commented on a post"],
  };

  return (
    <>
      <Header />
      <div className="text-black p-6 bg-gray-100 min-h-screen">
        <ProfileHeader name={user.name} role={user.role} avatar={user.avatar} />
        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProfileDetails email={user.email} phone={user.phone} location={user.location} />
          <ProfileStats
            projects={user.projects}
            followers={user.followers}
            following={user.following}
          />
          <ProfileActivity activities={user.activities} />
        </div>
        <InvestmentSlider />
      </div>
    </>
  );
};

export default Profile;

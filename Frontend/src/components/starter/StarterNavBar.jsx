import { NavLink } from "react-router-dom";

export default function StarterNavBar() {
  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">StartupNav</div>
        <div className="flex space-x-4">
          {["Proposal", "Dashboard", "Team", "Settings"].map((tab) => (
            <NavLink
              key={tab}
              to={`/${tab.toLowerCase()}`}
              className={({ isActive }) =>
                `px-4 py-2 rounded ${isActive ? "bg-blue-500 text-white" : "text-gray-300"}`
              }
            >
              {tab}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

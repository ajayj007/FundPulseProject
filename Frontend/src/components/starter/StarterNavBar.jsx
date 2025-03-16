import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function StarterNavBar() {
  const [popup, setPopup] = useState(null);

  const popupLinks = {
    Signup: [
      { name: "Startup Signup", path: "/signup/startup" },
      { name: "Investor Signup", path: "/signup/investor" },
    ],
    Login: [
      { name: "Startup Login", path: "/login/startup" },
      { name: "Investor Login", path: "/login/investor" },
    ],
  };

  return (
    <>
      {/* Background Blur Overlay - Stays while the card is open */}
      {popup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg flex items-center justify-center z-40"
          onClick={() => setPopup(null)} // Close when clicking outside
        >
          <AnimatePresence>
            {/* Popup Card */}
            <motion.div
              key="popup"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg w-96 z-50"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
              <h3 className="text-gray-800 font-semibold text-center text-lg">{popup}</h3>

              <div className="mt-4 space-y-2">
                {popupLinks[popup].map(({ name, path }) => (
                  <NavLink
                    key={name}
                    to={path}
                    className="block w-full text-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                  >
                    {name}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Blur Effect on Page when Popup is Open */}
      <div className={popup ? "blur-lg" : ""}>
        <nav className="bg-gray-800 p-4 shadow-md relative z-50">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-white text-xl font-bold">StartupNav</div>

            <div className="flex space-x-4">
              {["Proposal", "Dashboard", "Team", "Settings"].map((name) => (
                <NavLink
                  key={name}
                  to={`/${name.toLowerCase()}`}
                  className="px-4 py-2 rounded text-gray-300 hover:text-white"
                >
                  {name}
                </NavLink>
              ))}

              {["Signup", "Login"].map((mainLink) => (
                <button
                  key={mainLink}
                  onClick={() => setPopup(mainLink)}
                  className="px-4 py-2 rounded text-gray-300 hover:text-white"
                >
                  {mainLink}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

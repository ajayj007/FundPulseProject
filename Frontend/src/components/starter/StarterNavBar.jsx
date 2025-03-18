import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, MessageCircle, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { connectWallet } from "../../services/blockchain";
import { truncate, useGlobalState } from "../../store";

export default function Navbar() {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);

  // 🔹 Wallet state from global store
  const [connectedAccount] = useGlobalState("connectedAccount");

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 py-3 bg-gray-900 backdrop-blur-lg border-b border-neutral-700/80">
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <span className="text-xl tracking-tight text-white font-bold">FundPulse</span>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8">
            {["ADD PROJECT", "BACK PROJECTS"].map((item, index) => (
              <li key={index}>
                <NavLink
                  to={`/${item.toLowerCase().replace(" ", "-")}`}
                  className="text-gray-300 hover:text-green-400 transition duration-300"
                >
                  {item}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-6">
            {/* Chat Icon */}
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="text-gray-300 hover:text-green-400 transition duration-300 hidden md:block"
            >
              <MessageCircle size={24} />
            </button>

            {/* Profile Icon with Dropdown */}
            <div className="relative" ref={profileDropdownRef}>
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="text-gray-300 hover:text-green-400 transition duration-300 hidden md:block"
              >
                <User size={24} />
              </button>
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg z-50">
                  <ul className="py-2">
                    <li>
                      <NavLink
                        to="/profile"
                        className="block px-4 py-2 text-gray-300 hover:bg-gray-700"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        My Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/settings"
                        className="block px-4 py-2 text-gray-300 hover:bg-gray-700"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        Settings
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/my-projects"
                        className="block px-4 py-2 text-gray-300 hover:bg-gray-700"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        My Projects
                      </NavLink>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Connect Wallet Button (Using Global State) */}
            <button
              onClick={connectWallet}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 hidden md:block"
            >
              {connectedAccount ? `Connected: ${truncate(connectedAccount, 4, 4, 11)}` : "Connect Wallet"}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-gray-300 hover:text-green-400 transition duration-300"
              onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            >
              {mobileDrawerOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <>
            {/* Full Screen Background */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-80 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileDrawerOpen(false)}
            />

            {/* Sidebar Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 right-0 w-3/4 sm:w-1/2 h-full bg-gray-900 shadow-lg flex flex-col items-center space-y-8 pt-24 z-50"
            >
              {["ADD PROJECT", "BACK PROJECTS"].map((item, index) => (
                <NavLink
                  key={index}
                  to={`/${item.toLowerCase().replace(" ", "-")}`}
                  className="text-white text-2xl hover:text-green-400 transition duration-300"
                  onClick={() => setMobileDrawerOpen(false)}
                >
                  {item}
                </NavLink>
              ))}
              <button
                onClick={connectWallet}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300"
              >
                {connectedAccount ? `Connected: ${truncate(connectedAccount, 4, 4, 11)}` : "Connect Wallet"}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

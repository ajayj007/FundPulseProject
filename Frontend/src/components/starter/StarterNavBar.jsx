// //Original Code
//
//
// import { useState } from "react";
// import { NavLink } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { Menu, X } from "lucide-react";

// export default function StarterNavBar() {
//   const [popup, setPopup] = useState(null);
//   const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

//   const toggleNavbar = () => {
//     setMobileDrawerOpen(!mobileDrawerOpen);
//   };

//   const handlePopupToggle = (popupType) => {
//     setPopup(popupType);
//   };

//   return (
//     <>
//       {/* Background Blur Overlay & Popup */}
//       <AnimatePresence>
//         {popup && (
//           <div
//             className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center z-40"
//             onClick={() => handlePopupToggle(null)} // Close popup when clicking outside
//           >
//             <motion.div
//               key="popup"
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.8 }}
//               transition={{ duration: 0.3, ease: "easeInOut" }}
//               className="bg-white/90 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl shadow-black/30 w-96 z-50 relative"
//               onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
//             >
//               {/* Close Button */}
//               <button
//                 onClick={() => handlePopupToggle(null)}
//                 className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-colors duration-200"
//               >
//                 <X size={24} />
//               </button>

//               {/* Popup Content */}
//               <h3 className="text-gray-800 font-semibold text-center text-2xl mb-6">{popup}</h3>

//               <div className="space-y-4">
//                 {popup === "Signup" ? (
//                   <>
//                     <NavLink
//                       to="/signup/startup"
//                       className="block w-full text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/40"
//                     >
//                       Startup Signup
//                     </NavLink>
//                     <NavLink
//                       to="/signup/investor"
//                       className="block w-full text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/40"
//                     >
//                       Investor Signup
//                     </NavLink>
//                   </>
//                 ) : (
//                   <>
//                     <NavLink
//                       to="/login/startup"
//                       className="block w-full text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/40"
//                     >
//                       Startup Login
//                     </NavLink>
//                     <NavLink
//                       to="/login/investor"
//                       className="block w-full text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/40"
//                     >
//                       Investor Login
//                     </NavLink>
//                   </>
//                 )}
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>

//       {/* Navbar */}
//       <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
//         <div className="container px-4 mx-auto relative lg:text-sm">
//           <div className="flex justify-between items-center">
//             {/* Logo or Brand Name */}
//             <div className="flex items-center flex-shrink-0">
//               <span className="text-xl tracking-tight text-white">StartupNav</span>
//             </div>

//             {/* Navbar Items - Shifted to the Right */}
//             <ul className="hidden lg:flex space-x-12">
//               {["Proposal", "Dashboard", "Team", "Settings"].map((item, index) => (
//                 <li key={index}>
//                   <NavLink
//                     to={`/${item.toLowerCase()}`}
//                     className="text-gray-300 hover:text-white transition duration-300"
//                   >
//                     {item}
//                   </NavLink>
//                 </li>
//               ))}
//             </ul>

//             {/* Mobile Menu Toggle */}
//             <div className="lg:hidden md:flex flex-col justify-end">
//               <button onClick={toggleNavbar} className="text-gray-300 hover:text-white">
//                 {mobileDrawerOpen ? <X /> : <Menu />}
//               </button>
//             </div>
//           </div>

//           {/* Mobile Drawer */}
//           {mobileDrawerOpen && (
//             <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
//               <ul>
//                 {["Proposal", "Dashboard", "Team", "Settings"].map((item, index) => (
//                   <li key={index} className="py-4">
//                     <NavLink
//                       to={`/${item.toLowerCase()}`}
//                       className="text-gray-300 hover:text-white transition duration-300"
//                     >
//                       {item}
//                     </NavLink>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* Blur Effect on Page when Popup is Open */}
//       <div className={popup ? "blur-lg" : ""}>{/* Your main content goes here */}</div>
//     </>
//   );
// }

//
//
//
// // // // # Experimental





import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, MessageCircle, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const profileDropdownRef = useRef(null);

  const connectWallet = () => {
    setWalletConnected(true);
    setWalletAddress("0x1234...abcd");
  };

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
                          setWalletConnected(false);
                          setWalletAddress("");
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

            {/* Connect Wallet Button */}
            <button
              onClick={connectWallet}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 hidden md:block"
            >
              {walletConnected ? `Connected: ${walletAddress}` : "Connect Wallet"}
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
                {walletConnected ? `Connected: ${walletAddress}` : "Connect Wallet"}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

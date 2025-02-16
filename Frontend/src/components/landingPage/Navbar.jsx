// import { Menu, X } from "lucide-react";
// import { useState } from "react";
// import logo from "/assets/logo.png";
// import { navItems } from "../../constants";
// import { Link, NavLink } from "react-router-dom";

// const Navbar = () => {
//   const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

//   const toggleNavbar = () => {
//     setMobileDrawerOpen(!mobileDrawerOpen);
//   };

//   return (
//     <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
//       <div className="container px-4 mx-auto relative lg:text-sm">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center flex-shrink-0">
//             <img className="h-10 w-10 mr-2" src={logo} alt="Logo" />
//             <span className="text-xl tracking-tight">VirtualR</span>
//           </div>
//           <ul className="hidden lg:flex ml-14 space-x-12">
//             {navItems.map((item, index) => (
//               <li key={index}>
//                 <a href={item.href}>{item.label}</a>
//               </li>
//             ))}
//           </ul>
//           <div className="hidden lg:flex justify-center space-x-12 items-center">
//             <NavLink to="/login" className="py-2 px-3 border rounded-md">
//               Sign In
//             </NavLink>
//             <NavLink
//               to="/signup"
//               className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md"
//             >
//               Create an account
//             </NavLink>
//           </div>
//           <div className="lg:hidden md:flex flex-col justify-end">
//             <button onClick={toggleNavbar}>{mobileDrawerOpen ? <X /> : <Menu />}</button>
//           </div>
//         </div>
//         {mobileDrawerOpen && (
//           <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
//             <ul>
//               {navItems.map((item, index) => (
//                 <li key={index} className="py-4">
//                   <a href={item.href}>{item.label}</a>
//                 </li>
//               ))}
//             </ul>
//             <div className="flex space-x-6">
//               <a href="#" className="py-2 px-3 border rounded-md">
//                 Sign In
//               </a>
//               <NavLink
//                 href="#"
//                 className="py-2 px-3 rounded-md bg-gradient-to-r from-orange-500 to-orange-800"
//               >
//                 Create an account
//               </NavLink>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// // // // #2
// import { Menu, X } from "lucide-react";
// import { useState, useEffect } from "react";
// import logo from "/assets/logo.png";
// import { navItems } from "../../constants";
// import { Link, NavLink } from "react-router-dom";

// const Navbar = () => {
//   const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
//   const [signInOpen, setSignInOpen] = useState(false);
//   const [signUpOpen, setSignUpOpen] = useState(false);

//   const toggleNavbar = () => {
//     setMobileDrawerOpen(!mobileDrawerOpen);
//   };

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (!event.target.closest(".dropdown")) {
//         setSignInOpen(false);
//         setSignUpOpen(false);
//       }
//     };

//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, []);

//   return (
//     <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
//       <div className="container px-4 mx-auto relative lg:text-sm">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center flex-shrink-0">
//             <img className="h-10 w-10 mr-2" src={logo} alt="Logo" />
//             <span className="text-xl tracking-tight">VirtualR</span>
//           </div>
//           <ul className="hidden lg:flex ml-14 space-x-12">
//             {navItems.map((item, index) => (
//               <li key={index}>
//                 <a href={item.href}>{item.label}</a>
//               </li>
//             ))}
//           </ul>
//           <div className="hidden lg:flex justify-center space-x-12 items-center">
//             {/* Sign In Button with Dropdown */}
//             <div className="relative dropdown">
//               <button
//                 onClick={() => setSignInOpen(!signInOpen)}
//                 className="py-2 px-3 border rounded-md"
//               >
//                 Sign In
//               </button>
//               {signInOpen && (
//                 <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
//                   <NavLink
//                     to="/LoginStartup"
//                     className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
//                   >
//                     Sign in as Startup
//                   </NavLink>
//                   <NavLink
//                     to="/LoginInvestor"
//                     className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
//                   >
//                     Sign in as Investor
//                   </NavLink>
//                 </div>
//               )}
//             </div>

//             {/* Create an Account Button with Dropdown */}
//             <div className="relative dropdown">
//               <button
//                 onClick={() => setSignUpOpen(!signUpOpen)}
//                 className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md"
//               >
//                 Create an Account
//               </button>
//               {signUpOpen && (
//                 <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
//                   <NavLink
//                     to="/SignupStartup"
//                     className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
//                   >
//                     Create as Startup
//                   </NavLink>
//                   <NavLink
//                     to="/SignupInvestor"
//                     className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
//                   >
//                     Create as Investor
//                   </NavLink>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="lg:hidden md:flex flex-col justify-end">
//             <button onClick={toggleNavbar}>{mobileDrawerOpen ? <X /> : <Menu />}</button>
//           </div>
//         </div>

//         {mobileDrawerOpen && (
//           <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
//             <ul>
//               {navItems.map((item, index) => (
//                 <li key={index} className="py-4">
//                   <a href={item.href}>{item.label}</a>
//                 </li>
//               ))}
//             </ul>
//             <div className="flex space-x-6">
//               <button
//                 onClick={() => setSignInOpen(!signInOpen)}
//                 className="py-2 px-3 border rounded-md"
//               >
//                 Sign In
//               </button>
//               <button
//                 onClick={() => setSignUpOpen(!signUpOpen)}
//                 className="py-2 px-3 rounded-md bg-gradient-to-r from-orange-500 to-orange-800"
//               >
//                 Create an Account
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "/assets/logo.png";
import { navItems } from "../../constants";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [account, setAccount] = useState(null);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown")) {
        setSignInOpen(false);
        setSignUpOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Connect Wallet Function
  // const connectWallet = async () => {
  //   if (!window.ethereum) {
  //     alert("MetaMask is not installed!");
  //     return;
  //   }
  //   try {
  //     const accounts = await window.ethereum.request({
  //       method: "eth_requestAccounts",
  //     });
  //     setAccount(accounts[0]);
  //   } catch (error) {
  //     console.error("Wallet connection failed:", error);
  //   }
  // };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img className="h-10 w-10 mr-2" src={logo} alt="Logo" />
            <span className="text-xl tracking-tight">FundPulse</span>
          </div>

          <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex justify-center space-x-6 items-center">
            {/* Sign In Button */}
            <div className="relative dropdown">
              <button
                onClick={() => setSignInOpen(!signInOpen)}
                className="py-2 px-3 border rounded-md"
              >
                Sign In
              </button>
              {signInOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
                  <NavLink
                    to="/LoginStartup"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Sign in as Startup
                  </NavLink>
                  <NavLink
                    to="/LoginInvestor"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Sign in as Investor
                  </NavLink>
                </div>
              )}
            </div>

            {/* Create an Account Button */}
            <div className="relative dropdown">
              <button
                onClick={() => setSignUpOpen(!signUpOpen)}
                className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md"
              >
                Create an Account
              </button>
              {signUpOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
                  <NavLink
                    to="/SignupStartup"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Create as Startup
                  </NavLink>
                  <NavLink
                    to="/SignupInvestor"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Create as Investor
                  </NavLink>
                </div>
              )}
            </div>

            {/* Connect Wallet Button */}
            {/* <button
              onClick={connectWallet}
              className="py-2 px-4 rounded-md bg-purple-600 text-white"
            >
              {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
            </button> */}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="py-4">
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
            <div className="flex space-x-6 mt-4">
              <button
                onClick={() => setSignInOpen(!signInOpen)}
                className="py-2 px-3 border rounded-md"
              >
                Sign In
              </button>
              <button
                onClick={() => setSignUpOpen(!signUpOpen)}
                className="py-2 px-3 rounded-md bg-gradient-to-r from-orange-500 to-orange-800"
              >
                Create an Account
              </button>
              {/* Mobile Connect Wallet Button */}
              {/* <button
                onClick={connectWallet}
                className="py-2 px-3 rounded-md bg-purple-600 text-white"
              >
                {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
              </button>  */}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./dashboard/Header";
import Home from "../views/Home";
// import Project from "../views/Project";
import ProposalForm from '../components/starter/ProposalForm'
import StarterNavBar from "../components/starter/StarterNavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadBlockchain = async () => {
      try {
        console.log("Loading blockchain...");
        await new Promise((resolve) => setTimeout(resolve, 2000));

        if (isMounted) {
          setLoaded(true);
          console.log("Blockchain loaded successfully");
        }
      } catch (error) {
        console.error("Error loading blockchain:", error);
      }
    };

    loadBlockchain();

    return () => {
      console.log("Dashboard component unmounting...");
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen relative">
      <Header />
      

      {/* {loaded && ( */}
        {/* <Routes> */}
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/projects/:id" element={<Project />} /> */}
          {/* <Route path="/proposal" element={<ProposalForm />} /> */}
          {/* <Route path="/team" element={<div>Team Page</div>} /> */}
          {/* <Route path="/settings" element={<div>Settings Page</div>} /> */}
        {/* </Routes> */}
      {/* )} */}

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Dashboard;

//#2
// import { useEffect, useState } from "react";
// import { Route, Routes } from "react-router-dom";
// import Header from "./dashboard/Header";
// import Home from "../views/Home";
// import Project from "../views/Project";
// import { isWallectConnected } from "../services/blockchain";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"; // Ensure Toast styles are loaded

// const Dashboard = () => {
//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     const loadBlockchain = async () => {
//       try {
//         await isWallectConnected();
//         console.log("Blockchain loaded");
//         setLoaded(true);
//       } catch (error) {
//         console.error("Error loading blockchain:", error);
//       }
//     };

//     loadBlockchain();

//     // Return a proper cleanup function (not an async function)
//     return () => {
//       console.log("Dashboard component unmounted");
//     };
//   }, []);

//   return (
//     <div className="min-h-screen relative">
//       <Header />
//       {loaded && (
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/projects/:id" element={<Project />} />
//         </Routes>
//       )}

//       <ToastContainer
//         position="bottom-center"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="dark"
//       />
//     </div>
//   );
// };

// export default Dashboard;

//#1
// import { useEffect, useState } from "react";
// import { Route, Routes } from "react-router-dom";
// import Header from "./dashboard/Header";
// import Home from "../views/Home";
// import Project from "../views/Project";
// import { isWallectConnected } from "../services/blockchain";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Dashboard = () => {
//   const [loaded, setLoaded] = useState(false);

//   useEffect(async () => {
//     await isWallectConnected();
//     console.log("Blockchain loaded");
//     setLoaded(true);
//   }, []);

//   return (
//     <div className="min-h-screen relative">
//       <Header />
//       {loaded ? (
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/projects/:id" element={<Project />} />
//         </Routes>
//       ) : null}

//       <ToastContainer
//         position="bottom-center"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="dark"
//       />
//     </div>
//   );
// };

// export default Dashboard;

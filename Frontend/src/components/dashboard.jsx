import {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import Header from "./dashboard/Header";
import Home from "../views/Home";
// import Project from "../views/Project";
import ProposalForm from "../components/starter/ProposalForm";
import {ToastContainer} from "react-toastify";
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

      {loaded && (
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/projects/:id" element={<Project />} /> */}
          <Route path="/proposal" element={<ProposalForm />} />
          {/* <Route path="/team" element={<div>Team Page</div>} /> */}
          <Route path="/settings" element={<div>Settings Page</div>} />
          <Route path="/startup/signup" element={<div>Signup Page</div>} />
          <Route path="/startup/login" element={<div>Login Page</div>} />
          {/* <Route path="/signup" element={<div>Login Page</div>} /> */}
        </Routes>
      )}

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


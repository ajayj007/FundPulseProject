import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import LoginInvestor from "./components/account/LoginInvestor.jsx";
import LoginStartup from "./components/account/LoginStartup.jsx";
import Demonikhil from "./demonikhil.jsx";
import SignUpStartup from "./components/account/SignupStartup.jsx";
import SignUpInvestor from "./components/Account/SignupInvestor.jsx";
import Dashboard from "./components/dashboard.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<App />} />
      <Route path="signUpStartup" element={<SignUpStartup />} />
      <Route path="signUpInvestor" element={<SignUpInvestor />} />
      <Route path="loginInvestor" element={<LoginInvestor />} />
      <Route path="loginStartup" element={<LoginStartup />} />
      <Route path="demo" element={<Demonikhil />} />

      <Route path="dashboard" element={<Dashboard />} />
    </Route>
  )
);

{
  /* <Route path="" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="user/:userid" element={<User />} />
      <Route path="github" element={<Github />} loader={githubInfo} /> */
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

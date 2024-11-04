import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import WorkSpace from "./pages/WorkSpace";
import NotFound from "./pages/NotFound";
import UserSetting from "./pages/UserSetting";
import SocialLoginRedirection from "./components/SocialLoginRedirection";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/workspace" element={<WorkSpace />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/usersetting" element={<UserSetting />} />

        <Route path="/*" element={<NotFound />} />

        <Route path="/oauth2/*" element={<SocialLoginRedirection />} />
      </Routes>
    </div>
  );
}

export default App;

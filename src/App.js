import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./component/home";
import Login from "./component/login";
import SignUp from "./component/signUp";
import MyPage from "./component/myPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/join"
        element={<SignUp />}
      />
      <Route
        path="/my-page"
        element={<MyPage />}
      />
    </Routes>
  );
}
export default App;

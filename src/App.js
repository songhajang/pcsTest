import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./component/home";
import Login from "./component/login";
import SignUp from "./component/signUp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/join"
        element={<SignUp />}
      />
    </Routes>
  );
}
export default App;

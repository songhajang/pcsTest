import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./component/home";
import Login from "./component/login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/join"
        element={
          <section>
            <h1>회원가입 페이지</h1>
          </section>
        }
      />
    </Routes>
  );
}
export default App;

import React from "react";
import BlogDashboard from "./components/BlogDashboard/BlogDashboard";
import Register from "./components/Auth/Register/Register";
import Login from "./components/Auth/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<BlogDashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

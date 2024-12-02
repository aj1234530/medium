import React from "react";
import LandingPage from "./pages/Landing";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import ExploreBlogs from "./components/Exploreblogs";
import Writeablog from "./components/Writeablog";
import Eachblog from "./components/Eachblog";
import { useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/landing" element={<LandingPage />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        {/* notice how components passed as element attribute*/}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/exploreblogs" element={<ExploreBlogs />}></Route>
        <Route path="/write" element={<Writeablog />}></Route>
        <Route path="/exploreblogs/:id" element={<Eachblog />}></Route>{" "}
        {/* use router-router parmas */}
      </Routes>
    </Router>
  );
}

export default App;

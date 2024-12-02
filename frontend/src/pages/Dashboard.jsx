import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  //useEffect - it run when component renders

  useEffect(() => {
    const tokenCheck = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("no token found");
        navigate("/landing");
        return; //but where i have to implement to landing page
      }
      try {
        const response = await axios.get(
          "http://localhost:3000/api/protected/dashboard",

          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response);
      } catch (error) {
        console.log(error);
        navigate("/landing"); //redirect to landing if there is error
      }
    };
    //invoke the token check fxn
    tokenCheck();
  }, [navigate]);

  return (
    <>
      <h1>Welcome to your dashboard.</h1>
      <h3>Try creating a blog or explore blogs.</h3>
      <div>
        <Link to="/write">
          {" "}
          <button>Create a blog</button>
        </Link>

        <Link to="/exploreblogs">
          <button>Explore blogs</button>
        </Link>
      </div>
    </>
  );
};
export default Dashboard;

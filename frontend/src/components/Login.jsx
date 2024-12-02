import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const token = localStorage.getItem("token");   //if there is token already navigate to the dashobard directly don't show the login form
    //if(token){
    //    navigate("/dashboard");
    // }
    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      setMessage(response.data.message);
      console.log(response); //for debugging
      //setTimeout(navigate("/dashboard"), 2000); can we do like wait for 2 sec to show the redirecting message
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.message);
      console.log(error); //for debugging
    }
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          required
          onChange={handleEmailChange}
        ></input>
        <input
          type="password"
          placeholder="password"
          required
          onChange={handlePasswordChange}
        ></input>
        <button type="submit">Login </button>
      </form>
      {message && <p>{message}</p>}
    </>
  );
};
export default Login;

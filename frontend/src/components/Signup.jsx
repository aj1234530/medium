import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); //navigate function for redirect
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/signup", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      console.log(response); //for debugging
      setMessage(response.data.message);
      //redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.message);
      console.log(error.response?.data?.message);
    }
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
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
          type="text"
          placeholder="name"
          required
          onChange={handleNameChange}
        ></input>
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
        <button type="submit">Singup</button>
      </form>
      {message && <p>{message}</p>}
    </>
  );
};
export default Signup;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
const Writeablog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/landing");
      console.log("please sign up"); //debug
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/protected/postablog",
        {
          title,
          body,
          category,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("token not found, please singup"); //debug
      navigate("/landing");
      return;
    }

    //calling
  }, []);

  return (
    <>
      <p>Write you blog here</p>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="title of the blog"
          type="text"
          onChange={handleTitleChange}
          required
        ></input>
        <input
          placeholder="category"
          type="text"
          onChange={handleCategoryChange}
        ></input>
        <textarea
          placeholder="write your blog body here"
          row="30"
          colos="50"
          onChange={handleBodyChange}
          required
        ></textarea>
        {/*rows-display no of visible test line , cols- width of text are in terms of chars */}
        <button type="submit">Submit your blog</button>
      </form>
      <Link to="/dashboard">
        <button>Go to dashboard</button>
      </Link>
    </>
  );
};
export default Writeablog;

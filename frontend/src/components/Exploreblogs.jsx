import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Eachblog from "./Eachblog";

const ExploreBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchBlogs = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("no token found, please login or signup");
        navigate("/landing");
        return;
      }
      try {
        const response = await axios.get(
          "http://localhost:3000/api/protected/blogs/all",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response.data);
        setBlogs(response.data.blogs);
        console.log(blogs);
        //console.log(response.data.blogs[1]); //gives blog with object having id prop,userId, title,body,category
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, [navigate]);

  return (
    <>
      {/* <Eachblog blogs={blogs} /> passing the prop here will render the each blog here but wnat ot render in different page right so sconecpt of react-router state see below in link*/}
      <p>This is the place for all the blogs</p>
      {blogs.map((blog) => {
        return (
          <li key="blog._id">
            <Link to={`/exploreblogs/${blog._id}`} state={{ blogs }}>
              {blog.title}
            </Link>
            {/* notice we are the passing the props to this component */}
          </li>
        );
      })}
      <Link to="/dashboard">
        <button>Go to dashboard</button>
      </Link>
      <Link to="/eachblog">
        <button>Visit detailed page</button>
      </Link>
    </>
  );
};
export default ExploreBlogs;

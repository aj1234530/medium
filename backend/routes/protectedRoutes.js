const express = require("express");
const jwt = require("jsonwebtoken");
//const bcrypt = require("bcrypt");
const JWT_SECRET = "FLJADSLKFJSKDHKSJDAFJSLDGHKASDGHKGJ";
const protectedRouter = express.Router();
const BlogPostModel = require("../models/blogModel");

//middleware for the authentication
const validateLogin = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  try {
    if (!token) {
      return res.status(400).json({ message: "unauthorised" });
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(400).json({ message: "Wrong token" });
      }
      req.user = decoded;
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
  next();
};

//protected routes
protectedRouter.get("/dashboard", validateLogin, (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to Your Dashboard", user: req.user });
});

//get all
protectedRouter.get("/blogs/all", validateLogin, async (req, res) => {
  try {
    console.log("Fetching blogs...");
    const blogs = await BlogPostModel.find();
    res.status(200).json({ blogs });
  } catch (error) {
    console.log("Error occurred:", error.message);

    res.status(500).json({ error: error.message });
  }
});
//get one
protectedRouter.get("/blogs/:id", validateLogin, async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await BlogPostModel.findById(id);
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//get by category
protectedRouter.get("/blogs/category", validateLogin, async (req, res) => {
  const { category } = req.body;
  try {
    const blogs = await BlogPostModel.find({ category: category });
    res.status(200).json({ blogs });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
});
//post a blog
protectedRouter.post("/postablog", validateLogin, async (req, res) => {
  const { title, body, category } = req.body;
  const email = req.user.userId; //email given in jwt userId field

  try {
    const blogpost = await BlogPostModel.create({
      title,
      body,
      category,
      userId: email, //check schema email is used for the used id field
    });
    res.status(200).json({ blogpost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//edit a blog
protectedRouter.patch("/blogs/edit/:id", validateLogin, async (req, res) => {
  const { id } = req.params;
  const { title, body, category } = req.body;
  try {
    //will this update title to null if no tile is sent in request body? like i only sent body
    const blogpost = await BlogPostModel.findByIdAndUpdate(
      { _id: id },
      { title: title, body: body, category: category },
      { new: true } //this will return the updated blog
    );

    res.status(200).json({ blogpost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//delete a blog
protectedRouter.delete("/blogs/delete/:id", validateLogin, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;
  try {
    const blog = await BlogPostModel.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    if (blog.userId.toString() !== userId) {
      return res
        .status(400)
        .json({ message: "Unauthorized to delete this blog post" });
    }
    const deletedBlog = await BlogPostModel.findByIdAndDelete(id);
    res.status(200).json(deletedBlog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = protectedRouter;

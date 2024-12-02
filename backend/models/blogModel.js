const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  userId: {
    type: String, //email will be used as the id of the blog
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
});

module.exports = mongoose.model("BlogPostModel", blogSchema);

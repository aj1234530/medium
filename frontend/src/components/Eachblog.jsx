import { useParams, useLocation } from "react-router-dom";
import ExploreBlogs from "./Exploreblogs";
import { Link } from "react-router-dom";
const Eachblog = () => {
  const location = useLocation(); //using the useLocation to access passed props to it use react-state

  const blogs = location.state?.blogs || [];
  const { id } = useParams();
  console.log(id);
  const blogToShow = blogs.find((blog) => blog._id == id);
  console.log(blogToShow);
  if (!blogToShow) {
    return <p>Blog not found.</p>;
  }
  return (
    <>
      <p>This is detailed page</p>
      <h3>{blogToShow.title}</h3>
      <p>{blogToShow.body}</p>
      <div>
        <button>Edit</button>
        <button>Delete</button>
      </div>
      <Link to="/exploreblogs">
        <button>Back to all blogs</button>
      </Link>
    </>
  );
};
export default Eachblog;

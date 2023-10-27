import { useContext, useEffect } from "react";
import { AppContext } from "../AppContext";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Blog from "./Blog";

const BlogsList = () => {
  const { state, getBlogs } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    getBlogs();
  }, []);
  const { blogs } = state;

  return blogs.length === 0 ? (
    <div>
      <p>No blogs found...</p>
      <Button variant="primary" onClick={() => navigate("/add-blog")}>
        Add a Blog
      </Button>
    </div>
  ) : (
    <>
      <Button variant="primary" onClick={() => navigate("/add-blog")}>
        Add a Blog
      </Button>
      {blogs.map((blog, index) => {
        return <Blog key={index} blog={blog} />;
      })}
    </>
  );
};
export default BlogsList;

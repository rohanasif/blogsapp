import { useContext } from "react";
import { AppContext } from "../AppContext";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BlogsList = () => {
  const { getBlogs } = useContext(AppContext);
  const navigate = useNavigate();
  const blogs = getBlogs();
  return blogs.length === 0 ? (
    <div>
      <p>No blogs found...</p>
      <Button variant="primary" onClick={navigate("/add-blog")}>
        Add a Blog
      </Button>
    </div>
  ) : (
    blogs.map((blog, index) => {
      return <Blog key={index} blog={blog} />;
    })
  );
};
export default BlogsList;

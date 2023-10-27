import { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { AppContext } from "../AppContext";

const Blog = ({ blog }) => {
  const { title, description, author, likes, id } = blog;
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const { editBlog, like, unlike, deleteBlog, getBlogs } =
    useContext(AppContext);

  const handleEdit = async () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    await editBlog(id, {
      ...blog,
      title: newTitle,
      description: newDescription,
    });
    setIsEditing(false);
  };

  const handleLike = async () => {
    await like(id);
  };

  const handleUnlike = async () => {
    await unlike(id);
  };

  const handleDelete = async () => {
    await deleteBlog(id);
    getBlogs();
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <Form.Group controlId="newTitle">
            <Form.Label>New Title</Form.Label>
            <Form.Control
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="newDescription">
            <Form.Label>New Description</Form.Label>
            <Form.Control
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </Form.Group>
          <Button variant="success" onClick={() => handleSave()}>
            Save
          </Button>
        </div>
      ) : (
        <div>
          <h2>{title}</h2>
          <h3>{description}</h3>
          <p>{author}</p>
          <p>Likes: {likes || 0}</p>
          <Button variant="primary" onClick={() => handleEdit()}>
            Edit Blog
          </Button>
          <Button variant="success" onClick={() => handleLike()}>
            Like
          </Button>
          <Button variant="warning" onClick={() => handleUnlike()}>
            Unlike
          </Button>
          <Button variant="danger" onClick={() => handleDelete()}>
            Delete Blog
          </Button>
        </div>
      )}
    </div>
  );
};

export default Blog;

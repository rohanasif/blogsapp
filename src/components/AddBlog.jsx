import { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { AppContext } from "../AppContext";
import { useNavigate } from "react-router-dom";
const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();
  const { addBlog } = useContext(AppContext);
  return (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Blog Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Blog Description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
        <Form.Label>Author</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Your Name"
          onChange={(e) => setAuthor(e.target.value)}
          value={author}
        />
      </Form.Group>
      <Button
        onClick={async () => {
          await addBlog({
            title,
            description,
            author,
            likes: 0,
          });
          setTitle("");
          setDescription("");
          setAuthor("");
          navigate("/");
        }}
      >
        Add Blog
      </Button>
    </Form>
  );
};

export default AddBlog;

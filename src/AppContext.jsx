import { createContext, useReducer } from "react";
import axios from "axios";

const initialState = { blogs: [] };

const AppContext = createContext();

const AppReducer = (state, action) => {
  switch (action.type) {
    case "ADD_BLOG":
      return { ...state, blogs: [...state.blogs, action.payload] };
    case "EDIT_BLOG":
      return {
        ...state,
        blogs: state.blogs.map((b) => {
          if (b.id === action.payload.id) {
            return action.payload;
          } else {
            return b;
          }
        }),
      };
    case "GET_BLOGS":
      return { ...state, blogs: action.payload };
    case "DELETE_BLOG":
      return {
        ...state,
        blogs: state.blogs.filter((b) => b.id !== action.payload.id),
      };
    default:
      throw new Error("Unknown action: " + action.type);
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const getBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:3000/blogs");
      dispatch({ type: "GET_BLOGS", payload: res.data });
    } catch (error) {
      console.error(error);
    }
  };
  const addBlog = async (blog) => {
    try {
      const res = await axios.post("http://localhost:3000/blogs", blog);
      dispatch({ type: "ADD_BLOG", payload: res.data });
    } catch (error) {
      console.error(error);
    }
  };
  const editBlog = async (id, updatedBlog) => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/blogs/${id}`,
        updatedBlog
      );
      dispatch({ type: "EDIT_BLOG", payload: res.data });
    } catch (error) {
      console.error(error);
    }
  };
  const deleteBlog = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/blogs/${id}`);
      dispatch({ type: "DELETE_BLOG", payload: res.data });
    } catch (error) {
      console.error(error);
    }
  };
  const like = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:3000/blogs/${id}`, {
        likes: 1,
      });
      dispatch({ type: "EDIT_BLOG", payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };

  const unlike = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:3000/blogs/${id}`, {
        likes: 0,
      });
      dispatch({ type: "EDIT_BLOG", payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        addBlog,
        editBlog,
        getBlogs,
        deleteBlog,
        like,
        unlike,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };

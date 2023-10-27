import { Route, Routes } from "react-router-dom";
import AddBlog from "./components/AddBlog";
import BlogsList from "./components/BlogsList";
import { AppProvider } from "./AppContext";

export default function App() {
  return (
    <AppProvider>
      <h1>Blogs</h1>
      <Routes>
        <Route path="/add-blog" element={<AddBlog />} />
        <Route path="/" element={<BlogsList />} />
      </Routes>
    </AppProvider>
  );
}

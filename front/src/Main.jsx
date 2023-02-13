import { Routes, Route, NavLink } from "react-router-dom";

import Home from "./routes/home";
import About from "./routes/about";
import Contact from "./routes/contact";
import Posts from "./routes/posts";
import Post from "./routes/post";
import NoMatch from "./routes/nomatch";
import PostIndex from "./routes/postindex";

const Layout = ({ children }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>{children}</div>
  );
};

function Main() {
  return (
    <div className="App">
      <h1>Hello React Router v6</h1>
      <ul>
        <li>
          <NavLink
            style={({ isActive }) => (isActive ? { color: "blue" } : undefined)}
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) => (isActive ? { color: "blue" } : undefined)}
            to="/about"
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) => (isActive ? { color: "blue" } : undefined)}
            to="/contact"
          >
            Contact
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : undefined)}
            to="/posts"
          >
            Posts
          </NavLink>
        </li>
      </ul>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/posts" element={<Posts />}>
          <Route index element={<PostIndex />} />
          <Route path=":postId" element={<Post />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default Main;

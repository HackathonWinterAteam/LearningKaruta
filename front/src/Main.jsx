// import { Routes, Route, NavLink } from "react-router-dom";

// import Home from "./pages/home";
// import Posts from "./routes/posts";
// import Post from "./routes/post";
// import NoMatch from "./pages/nomatch";
// import Signup from "./pages/signup";
// import Login from "./pages/login";

// function Main() {
//   return (
//     <div className="App">
//       <h1>コマンドカルタ</h1>
//       <ul>
//         <li>
//           <NavLink
//             style={({ isActive }) => (isActive ? { color: "blue" } : undefined)}
//             to="/"
//           >
//             Home
//           </NavLink>
//         </li>
//         <li>
//           <NavLink
//             style={({ isActive }) => (isActive ? { color: "blue" } : undefined)}
//             to="/signup"
//           >
//             Signup
//           </NavLink>
//         </li>
//         <li>
//           <NavLink
//             style={({ isActive }) => (isActive ? { color: "blue" } : undefined)}
//             to="/login"
//           >
//             Login
//           </NavLink>
//         </li>

//         <li>
//           <NavLink
//             className={({ isActive }) => (isActive ? "active" : undefined)}
//             to="/posts"
//           >
//             Posts
//           </NavLink>
//         </li>
//       </ul>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/posts" element={<Posts />}>
//           <Route path=":postId" element={<Post />} />
//         </Route>
//         <Route path="*" element={<NoMatch />} />
//       </Routes>
//     </div>
//   );
// }

// export default Main;

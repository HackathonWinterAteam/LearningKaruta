import { Routes, Route, NavLink } from "react-router-dom";

import Home from "../pages/home";
import NoMatch from "../pages/nomatch";
import Signup from "../pages/signup";
import Login from "../pages/login";
import Karuta from "../pages/karuta";
import ProtectedRoute from "../compornents/ProtectedRoute";
import Victory from "../Victory";
import Lose from "../Lose";
import Draw from "../Draw";
import Home_true from "../pages/home_true";

function Root() {
  return (
    <div className="App">
      {/* <h1>コマンドカルタ</h1> */}
      {/* <ul className="flex flex-row justify-center ">
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
            to="/signup"
          >
            Signup
          </NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) => (isActive ? { color: "blue" } : undefined)}
            to="/login"
          >
            Login
          </NavLink>
        </li>

        <li>
          <NavLink
            style={({ isActive }) => (isActive ? { color: "blue" } : undefined)}
            to="/karuta"
          >
            Karuta
          </NavLink>
        </li>
      </ul> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/karuta" element={<Karuta />} />
        <Route path="/victory" element={<Victory />} />
        <Route path="/lose" element={<Lose />} />
        <Route path="/draw" element={<Draw />} />
        <Route path="/home_true" element={<ProtectedRoute><Home_true /></ProtectedRoute>} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default Root;

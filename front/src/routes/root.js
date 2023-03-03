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
import Edit from "../pages/edit";

function Root() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/karuta" element={<Karuta />} />
        <Route path="/victory" element={<Victory />} />
        <Route path="/lose" element={<Lose />} />
        <Route path="/draw" element={<Draw />} />

        <Route path="/home_true" element={<ProtectedRoute><Home_true /></ProtectedRoute>} />
        <Route path="/edit" element={<Edit />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default Root;

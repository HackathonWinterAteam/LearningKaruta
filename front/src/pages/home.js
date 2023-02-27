import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";


function Home() {
  const [user, setUser] = useState([]);
  const { getUser } = useAuthContext();

  // Contextは使っていない
  useEffect(() => {
    const fetchUser = async () => {
      const user = getUser();
      // try {
      //   const response = await axios.get("http://localhost:8000/users/me");
      //   setUser(response.data.users);
      // } catch (error) {
      //     const errorMessage = error.response.data;
      //     if (errorMessage.detail === "トークン有効期限切れ"){
      //         const responce_refresh = await axios.get("http://localhost:8000/refresh_token");
      //         setUser(responce_refresh.data.users)
      //     }
      // }
      return user;
    };
    fetchUser();

  }, []);

  return (
    <>
      <h2>Homeだよ</h2>
      <ul>
        {user &&
          user.map((user) => (
            <li key={user._id}>
              Name:{user.name}/Email:{user.email}
            </li>
          ))}
      </ul>

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
    </>
  );
}

export default Home;

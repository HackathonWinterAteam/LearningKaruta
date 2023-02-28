import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { createRoutesFromChildren, NavLink } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";


const Home = () => {
  const { user, getUser, logout } = useAuthContext();

  useEffect(() => {
      getUser();
  }, []);


  return (
    <>
      <h2>Homeだよ</h2>
      <div>{user === null ? (
        <p>Loading...</p>
      ) : user ? (
        <p>Welcome, {user.user_name}!</p>
      ) : (
        <p>Failed to fetch user data</p>
      )}
  </div>
      {/* <ul>
        {user &&
          user.map((user) => (
            <li key={user._id}>
              Name:{user?.user_name}/Email:{user.email}
            </li>
          ))}
      </ul> */}

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
      <li>
        <NavLink
        to="/login" onClick={logout}>
          Logout
        </NavLink>
      </li>
    </>
  );
};

export default Home;

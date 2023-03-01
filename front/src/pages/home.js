import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { createRoutesFromChildren, NavLink } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";


const Home = () => {
  const { user, getUser, logout } = useAuthContext();

  useEffect(() => {
      getUser();
  }, []);

  const LoggidIn = () => {
    if (user.user_name !== undefined){
      return  <p>Welcome, {user.user_name}!</p>;
    } else {
      return <p></p>;
    }
  }



  console.log(user)

  return (
    <>
      <h2>Homeだよ</h2>
        {LoggidIn()}
        {user.user_name !== undefined ? (
             <p> Name: {user.user_name} / Email: {user.email} </p>
        ) : (
          <p></p>
        )
          }
      
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
      { user.user_name !== undefined ? (
        <li>
        <NavLink
        to="/login" onClick={logout}>
          Logout
        </NavLink>
      </li>
      ) : ( 
      <li>
        <NavLink
          style={({ isActive }) => (isActive ? { color: "blue" } : undefined)}
          to="/login"
        >
          Login
        </NavLink>
      </li>
      )
      }
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
};

export default Home;

import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { createRoutesFromChildren, NavLink } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
// import { Cookies } from "react-cookie";

const Home = () => {
  const { user, getUser, logout } = useAuthContext();

  useEffect(() => {
      getUser();
  }, []);


  console.log(user)

  return (
    <>
    <body className="px-32 w-screen h-screen font-body font-bold bg-darkWhite pb-16">
    
    <header className="py-4">
    <NavLink
          style={({ isActive }) => (isActive ? { color: "blue" } : undefined)}
          to="/"
        >
          Karuta Game
        </NavLink>
    </header>

    <div id="gameSelect" className="w-full h-auto  mt-14 p-12 bg-white flex justify-center mb-6 rounded-lg drop-shadow-Shadow">
      <div className="w-2/3 h-auto">
      <div id="info" className="flex justify-between pb-6">
        <p className="text-3xl text-paleBlack ">かるたをはじめる</p>
        <button className=" bg-white text-base rounded-2xl text-darkBlue  outline outline-1 outline-paleBlue py-2 px-6 drop-shadow-Shadow ">ゲームの遊び方</button>
      </div>
    <div id="genre" className="space-y-2">
      <div className="flex space-x-2  ">
      <NavLink className="GradationBluebtn text-3xl hover:bg-yellow">
        Linux
      </NavLink>

      <NavLink to="/karuta" className="GradationBluebtn text-3xl ">
        Git
      </NavLink>
      </div>
  
      <div className="flex space-x-2">
      <NavLink to="" className="GradationBluebtn text-3xl">
        カラーコード
      </NavLink>
      
      <NavLink className="GradationBluebtn text-3xl">
        Docker
      </NavLink>
      </div>
  
      
      {/* <NavLink>
        ショートカット
      </NavLink> */}
    </div>
    {/* <span>もっと見る</span> */}
    </div>
      </div>

      <div id="userLog" className="w-full h-auto  mb-12 px-12 py-8 bg-white flex justify-center rounded-lg drop-shadow-Shadow" >
        <div className="">
        <p className="text-paleBlack mb-8 text-base justify-center">会員登録・ログインをするとプレイ記録が表示されます。</p>
          <div className="flex space-x-16">
            <NavLink to="/signup" className="GradationYellowbtn">
              会員登録
            </NavLink>

            <NavLink to="/login" className="GradationYellowbtn">
              ログイン
            </NavLink>
          </div>
        </div>
    </div>

 

      {/* <ul>
        {user &&
          user.map((user) => (
            <li key={user._id}>
              Name:{user.name}/Email:{user.email}
            </li>
          ))}
      </ul> */}
      </body>

      {/* <li>
        <NavLink
          style={({ isActive }) => (isActive ? { color: "blue" } : undefined)}
          to="/signup"
        >
          Signup
        </NavLink>
      </li> */}
      {/* <li>
        <NavLink
          style={({ isActive }) => (isActive ? { color: "blue" } : undefined)}
          to="/login"
        >
          Login
        </NavLink>
      </li> */}
      {/* <li>
        <NavLink
          style={({ isActive }) => (isActive ? { color: "blue" } : undefined)}
          to="/karuta"
        >
          Karuta
        </NavLink>
      </li> */}
    </>
  );
};

export default Home;

import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
// import { Cookies } from "react-cookie";

function Home() {
  const [user, setUser] = useState([]);
  const { getUsers } = useAuthContext();

  // Contextは使っていない
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get("http://localhost:8000/users/me");
        setUser(response.data.users);
      } catch (error) {
          const errorMessage = error.response.data;
          if (errorMessage.detail === "トークン有効期限切れ"){
              const responce_refresh = await axios.get("http://localhost:8000/refresh_token");
              setUser(responce_refresh.data.users)
          }
      }
      return user;
    };
    getUser();
  }, []);

  return (
    <>
    <body className="px-32 font-body font-bold bg-darkWhite pb-16">
    
    <header className="py-4">
    <NavLink
          style={({ isActive }) => (isActive ? { color: "blue" } : undefined)}
          to="/"
        >
          Karuta Game
        </NavLink>
        <button className="bg-gradient-to-r from-indigo-400 to-darkBlue py-2 px-12 text-darkWhite rounded-3xl tracking-wider">
                <NavLink>
                ログアウト
                </NavLink>
                </button>
    </header>

    <div id="gameSelect" className="w-full h-auto  mt-14 p-12 bg-white flex justify-center mb-6 rounded-lg drop-shadow-Shadow">
      <div className="w-2/3 h-auto">
      <div id="info" className="flex justify-between pb-6">
        <p className="text-3xl text-paleBlack ">かるたをはじめる</p>
        <button className=" bg-white text-base rounded-2xl text-darkBlue  outline outline-1 outline-paleBlue py-2 px-6 drop-shadow-Shadow ">ゲームの遊び方</button>
      </div>
    <div id="genre" className="flex space-x-2">
      {/* <div className=""> */}
      <NavLink className="GradationBluebtn text-xl hover:bg-yellow">
        Linux
      </NavLink>

      <NavLink to="/karuta" className="GradationBluebtn text-xl ">
        Git
      </NavLink>
      {/* </div> */}
  
      {/* <div className=""> */}
      <NavLink to="" className="GradationBluebtn text-xl">
        カラーコード
      </NavLink>
      
      <NavLink className="GradationBluebtn text-xl">
        Docker
      </NavLink>
      {/* </div> */}
  
      
      {/* <NavLink>
        ショートカット
      </NavLink> */}
    </div>
    {/* <span>もっと見る</span> */}
    </div>
      </div>

      <div id="userLog" className="w-full h-auto  mb-12 p-6 bg-white justify-center rounded-lg drop-shadow-Shadow" >

        {/* ユーザープロフィール */}
          <div id="user" className="w-full h-36 flex space-x-2">
            <div id="prof" className="flex w-1/2 h-full space-x-9 py-6 pl-8 bg-white drop-shadow-Shadow rounded-lg">
              <img src={`${process.env.PUBLIC_URL}/imgs/icon_prof.jpg`} className="object-contain w-1/2 h-1/2"></img>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-base text-paleBlack">USER NAME</p>
                  <p className="text-base text-paleBlack">USER COMENT</p>
                </div>
                <button className="text-sm rounded-2xl py-1 px-4 text-paleBlue outline outline-1 outline-paleBlue space-x-4">編集</button>
              </div>
            </div>

            {/* プレイ記録 */}
            <div id="playData" className="space-x-4 flex w-1/2 text-paleBlack place-items-start rounded-lg drop-shadow-Shadow">
              <div className="justify-start w-1/3 h-full py-6 pl-6 space-y-2 bg-white rounded-lg">
                <p className="text-base ">プレイ回数</p>
                <div className="flex space-x-2 ">
                <p id="" className="text-4xl leading-none">100</p><p className="text-base leading-none">回</p>
                </div>
              </div>

              <div className="justify-start w-1/3 h-full py-6 pl-6 space-y-2 bg-white rounded-lg">
                <p className="text-base ">最速プレイ時間</p>
                <div className="flex space-x-2 ">
                <p id="" className="text-4xl leading-none">100</p><p className="text-base leading-none">秒</p>
                </div>
              </div>

              <div className="justify-start w-1/3 h-full py-6 pl-6 space-y-2 bg-white rounded-lg">
                <p className="text-base ">勝率</p>
                <div className="flex space-x-2 ">
                <p id="" className="text-4xl leading-none">100</p><p className="text-base leading-none">%</p>
                </div>
              </div>
            </div>
          </div>

          <div id="ranking" className="w-full">
            {/* 苦手、得意ワード */}
            <div className="w-1/2 h-auto flex ">
              <div className="p-8 ">
                <p>得意なワード</p>
                <li>git</li>
                <li>git</li>
                <li>git</li>
                <li>git</li>
              </div>

              <div className="p-8">
                <p>苦手なワード</p>
                <li>git</li>
                <li>git</li>
                <li>git</li>
                <li>git</li>
              </div>

            </div>
          </div>

        </div>

 

      <ul>
        {user &&
          user.map((user) => (
            <li key={user._id}>
              Name:{user.name}/Email:{user.email}
            </li>
          ))}
      </ul>
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
}

export default Home;

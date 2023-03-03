import axios from "../utils/axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function Edit() {


const { user, getUser, logout } = useAuthContext();


useEffect(() => {
    getUser();
    }, []);

    // const edit = async (data) => {

    //     const url = "http://localhost:8000/user_update/{user.user_id}";
    //     const response = await axios.put(url,
    //       data
    //     );
    //     console.log(response.data);
    //     navigate("/home_true");
    //     return "会員情報を編集しました"
    
    // };

    const navigate = useNavigate();


    const nameRef = useRef(null);
    const introRef = useRef(null);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     edit({
    //       user_name: nameRef.current.value,
    //       user_intro: introRef.current.value,

    //     });
    //   };
    

    return(
        <body className="px-32 font-body font-bold bg-darkWhite pb-16">
            <header className="py-4 flex justify-between">
                <NavLink
                style={({ isActive }) => (isActive ? { color: "blue" } : undefined)}
                to="/">
                    Karuta Game
                </NavLink>
                <button className="bg-gradient-to-r from-indigo-400 to-darkBlue py-2 px-12 text-darkWhite rounded-3xl tracking-wider">
                <NavLink to="/" onClick={logout}>
                ログアウト
                </NavLink>
                </button>
 
            </header>

            <div>
                <p>プロフィールを編集する</p>
                
                <form>
                <div className="">
                    <label htmlFor="name" className=""></label>
                    <input
                    id="name"
                    name="user_name"
                    ref={nameRef}
                    className=""
                    placeholder="お名前"
                    />
                </div>

                <div>
                <label htmlFor="name" className="block text-lg text-paleBlack"></label>
                    <input
                    id="name"
                    name="user_phrase"
                    ref={introRef}
                    className="border rounded-md b w-full p-2 text-lg text-paleBlack "
                    placeholder="一言"
                    />
                </div>
                <div className="">
            <button type="submit" className="">
              送信
            </button>
          </div>
                </form>
            </div>

        </body>
    );
};

export default Edit;
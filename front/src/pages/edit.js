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

    const edit = async (data) => {
        const url = "http://localhost:8000/user_update/";
        const response = await axios.put(url,
          data
        );
        console.log(response.data);
        navigate("/home_true");
        return "会員情報を編集しました"
    
    };

    const navigate = useNavigate();


    const nameRef = useRef(null);
    const introRef = useRef(null);
    const userIdRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        edit({
          user_id: userIdRef.current.value,
          user_name: nameRef.current.value,
          user_intro: introRef.current.value,

        });
      };
    

    return(
        <body className="w-screen h-screen px-32 font-body justify-center items-center font-bold pb-16 bg-darkWhite text-paleBlack">
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

            <div className="w-3/5 container mx-auto">
                <p className="text-center my-8">プロフィールを編集する</p>
                

                <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name" className="block text-lg  text-paleBlack"></label>
                    <input
                    id="name"
                    name="user_name"
                    ref={nameRef}
                    className="w-full p-2 border-b-2 border-darkBlue text-lg text-paleBlack"
                    placeholder="お名前"
                    />
                </div>

                <div>
                <label htmlFor="name" className="block text-lg  text-paleBlack mb-4"></label>
                    <input
                    id="name"
                    name="user_intro"
                    ref={introRef}
                    className="w-full p-2 border-b-2  border-darkBlue text-lg text-paleBlack "
                    placeholder="一言"
                    />
                </div>


                
                <div className="max-auto container flex justify-center items-center mt-12 space-x-6 ">
                <NavLink to="home_true" className="GradationYellowbtn">
                        戻る
                    </NavLink>
                <button type="submit" className="GradationYellowbtn ">
                        完了
                    </button>
                </div>
                 </form>
            </div>

  

        </body>

    );
};

export default Edit;
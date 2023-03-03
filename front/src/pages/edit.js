import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function Edit() {

    return(
        <body className="w-screen h-screen px-32 font-body justify-center items-center font-bold pb-16 bg-darkWhite text-paleBlack">
            <header className="py-4 flex justify-between">
                <NavLink
                style={({ isActive }) => (isActive ? { color: "blue" } : undefined)}
                to="/">
                    Karuta Game
                </NavLink>
                <button className="bg-gradient-to-r from-indigo-400 to-darkBlue py-2 px-12 text-darkWhite rounded-3xl tracking-wider">
                <NavLink>
                ログアウト
                </NavLink>
                </button>
 
            </header>

            <div className="w-3/5 container mx-auto">
                <p className="text-center my-8">プロフィールを編集する</p>
                
                <form className="">
                <div>
                    <label htmlFor="name" className="block text-lg  text-paleBlack"></label>
                    <input
                    id="name"
                    name="user_name"
                    // ref=""
                    className="w-full p-2 border-b-2 border-darkBlue text-lg text-paleBlack"
                    placeholder="お名前"
                    />
                </div>

                <div>
                <label htmlFor="name" className="block text-lg  text-paleBlack mb-4"></label>
                    <input
                    id="name"
                    name="user_phrase"
                    // ref=""
                    className="w-full p-2 border-b-2  border-darkBlue text-lg text-paleBlack "
                    placeholder="一言"
                    />
                </div>
                </form>
                
                <div className="max-auto container flex justify-center items-center mt-12 space-x-6 ">
                <NavLink to="home_true" className="GradationYellowbtn">
                        戻る
                    </NavLink>
                <NavLink to="home_true" className="GradationYellowbtn ">
                        完了
                    </NavLink>
                </div>
   
            </div>

  

        </body>

    );
};

export default Edit;
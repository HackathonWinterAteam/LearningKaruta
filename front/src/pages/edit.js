import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function Edit() {

    return(
        <body className="px-32 font-body font-bold bg-darkWhite pb-16">
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

            <div>
                <p>プロフィールを編集する</p>
                
                <form>
                <div className="">
                    <label htmlFor="name" className=""></label>
                    <input
                    id="name"
                    name="user_name"
                    ref=""
                    className=""
                    placeholder="お名前"
                    />
                </div>

                <div>
                <label htmlFor="name" className="block text-lg text-paleBlack"></label>
                    <input
                    id="name"
                    name="user_phrase"
                    ref=""
                    className="border rounded-md b w-full p-2 text-lg text-paleBlack "
                    placeholder="一言"
                    />
                </div>

                </form>
            </div>

        </body>
    );
};

export default Edit;
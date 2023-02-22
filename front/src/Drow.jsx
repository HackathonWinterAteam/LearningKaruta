import "./index.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Victory = () => {
    return(
        <div className="content-start font-body font-bold">
            <div className="relative">
                 {/* 背景画像表示 */}
                <div className="space-y-96 absolute opacity-60">
                    <div className="flex space-x-16  transform rotate-6">
        
                    <img src={`${process.env.PUBLIC_URL}/imgs/1.jpg`}  className="object-contain  w-2/12 h-auto " alt="" />
                    <img src={`${process.env.PUBLIC_URL}/imgs/2.jpg`}  className="object-contain  w-2/12 h-auto " alt="" />
                    <img src={`${process.env.PUBLIC_URL}/imgs/3.jpg`}  className="object-contain  w-2/12 h-auto " alt="" />
                    <img src={`${process.env.PUBLIC_URL}/imgs/4.jpg`}  className="object-contain  w-2/12 h-auto " alt="" />
                    <img src={`${process.env.PUBLIC_URL}/imgs/5.jpg`}  className="object-contain  w-2/12 h-auto " alt="" />
         
                    </div>
            
                <div className="flex space-x-16 transform rotate-6">
                <img src={`${process.env.PUBLIC_URL}/imgs/6.jpg`}  className="object-contain  w-2/12 h-auto " alt="" />
                <img src={`${process.env.PUBLIC_URL}/imgs/7.jpg`}  className="object-contain  w-2/12 h-auto " alt="" />
                <img src={`${process.env.PUBLIC_URL}/imgs/8.jpg`}  className="object-contain  w-2/12 h-auto " alt="" />
                <img src={`${process.env.PUBLIC_URL}/imgs/9.jpg`}  className="object-contain  w-2/12 h-auto " alt="" />
                <img src={`${process.env.PUBLIC_URL}/imgs/10.jpg`}  className="object-contain  w-2/12 h-auto " alt="" />
                </div>
                </div>

                <div className="absolute container h-auto m-52 flex">
                <div className="w-2/6 h-auto">
                    <img src={`${process.env.PUBLIC_URL}/imgs/drow.jpg`} className="object-contain" alt=""/>
                </div>
                <div className="">
                    <div className="ml-20">
                        <div className="text-4xl">
                            <div className="flex w-full mb-4 border-4 border-lightBlue">
                                <div className="flex justify-center py-4 w-1/2 bg-lightBlue">
                                <p className="text-white ">YOU</p>
                                </div>

                                <div className="px-20 py-4 w-1/2  bg-darkWhite">
                                <span className="text-lightBlue">10<span>枚</span></span>
                                </div>
                            </div>

                            <div className="flex w-full mb-4 border-4 border-lightBlue">
                                <div className="flex justify-center py-4 w-1/2 bg-lightBlue">
                                <p className="text-white ">CPU</p>
                                </div>

                                <div className="px-20 py-4 w-1/2  bg-darkWhite">
                                <span className="text-lightBlue">2 <span>枚</span></span>
                                </div>
                            </div>

                            <div>
                                        <NavLink className="relative inline-block px-14 py-4 text-2xl mr-14 mt-4 group">
                                        <span className="span_Shadow"></span>
                                        <span className="span_Shadow_2"></span>
                                        <span className="relative text-darkBlue group-hover:text-darkWhite ">次のゲームへ</span>
                                        </NavLink>
                                      
                                      <NavLink className="relative inline-block px-14 py-4 text-2xl group">
                                      <span className="span_Shadow"></span>
                                        <span className="span_Shadow_2"></span>
                                        <span className="relative text-darkBlue group-hover:text-darkWhite ">マイページへ</span>
                                      </NavLink>
                                </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
    </div>
    );
};

export default Victory;
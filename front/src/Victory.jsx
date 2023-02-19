import "./index.css";
import { useState } from "react";

import git_1 from './imgs/1.jpg';
import git_2 from './imgs/2.jpg'
import git_3 from './imgs/3.jpg'
import git_4 from './imgs/4.jpg'
import git_5 from './imgs/5.jpg'
import git_6 from './imgs/6.jpg'
import git_7 from './imgs/7.jpg'
import git_8 from './imgs/8.jpg'
import git_9 from './imgs/9.jpg'
import git_10 from './imgs/10.jpg'
import git_11 from './imgs/11.jpg'
import git_12 from './imgs/12.jpg'


const victory = () => {
    return(
        <div className="content-start font-body overflow-hidden font-bold">
            <div className="relative">
                 {/* 背景画像表示 */}
                <div className="space-y-96 absolute opacity-60">
                    <div className="flex space-x-16  transform rotate-6">
                    <img src={git_1} className="object-contain  w-2/12 h-auto " alt="" />
                    <img src={git_2} className="object-contain  w-2/12 h-auto " alt="" />
                    <img src={git_3} className="object-contain  w-2/12 h-auto " alt="" />
                    <img src={git_4} className="object-contain  w-2/12 h-auto " alt="" />
                    <img src={git_5} className="object-contain  w-2/12 h-auto " alt="" />
                    </div>
            
                <div className="flex space-x-16 transform rotate-6">
                <img src={git_6} className="object-contain  w-2/12 h-auto " alt="" />
                <img src={git_7} className="object-contain  w-2/12 h-auto " alt="" />
                <img src={git_8} className="object-contain  w-2/12 h-auto " alt="" />
                <img src={git_9} className="object-contain  w-2/12 h-auto " alt="" />
                <img src={git_10} className="object-contain  w-2/12 h-auto " alt="" />
                </div>
                </div>

                <div className="absolute container h-auto m-52 flex">
                <div className="w-1/4 h-auto">
                    <img src="../src/img/Frame 68.png" class="object-contain" alt=""/>
                </div>
                <div className="">
                    <div className="ml-20">
                        <div className="text-4xl">
                            <div className="flex w-full mb-4 border-4 border-lightBlue">
                                <div className="flex justify-center py-4 w-1/2 bg-lightBlue">
                                <p className="text-white ">YOU</p>
                                </div>

                                <div className="px-24 py-4 w-1/2  bg-darkWhite">
                                <span className="text-lightBlue">10 <span>枚</span></span>
                                </div>
                            </div>

                            <div className="flex w-full mb-4 border-4 border-lightBlue">
                                <div className="flex justify-center py-4 w-1/2 bg-lightBlue">
                                <p className="text-white ">CPU</p>
                                </div>

                                <div className="px-24 py-4 w-1/2  bg-darkWhite">
                                <span className="text-lightBlue">2 <span>枚</span></span>
                                </div>
                            </div>

                            <div>
                                    <a href="#_" class="relative inline-block px-14 py-4 text-2xl mr-14 mt-8 group">
                                        <span class="span_Shadow"></span>
                                        <span class="span_Shadow_2"></span>
                                        <span class="relative text-darkBlue group-hover:text-darkWhite ">次のゲームへ</span>
                                        </a>

                                    <a href="#_" class="relative inline-block px-14 py-4 text-2xl group">
                                        <span class="span_Shadow"></span>
                                        <span class="span_Shadow_2"></span>
                                        <span class="relative text-darkBlue group-hover:text-darkWhite ">マイページへ</span>
                                    </a>
                                </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Victory ;
import React from "react";
import { FaTired , FaLaughSquint } from 'react-icons/fa';

export const Modal = ({ modalClose, correctFlag }) => {

  return (
    <>
      <section
        className="fixed z-10 top-0 left-0 w-full h-full"
        onClick={modalClose}
      >
        <div className="w-full h-full bg-transparent-black"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-lg py-[50px] px-[50px] bg-white">
          {correctFlag === 1 ? (
            <div className="flex flex-col text-center place-items-center">
              <div>取れました！</div>
              <div><FaLaughSquint  size={70} /></div>
            </div>
          ):(
            <div className="flex flex-col text-center place-items-center">
              <div>取られました...</div>
              <FaTired size={70} />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

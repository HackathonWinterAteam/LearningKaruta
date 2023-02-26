import React from "react";

export const Modal = ({ modalClose, children }) => {

  return (
    <>
      <section
        className="fixed z-10 top-0 left-0 w-full h-full"
        onClick={modalClose}
      >
        <div className="w-full h-full bg-transparent-black"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-lg py-[10px] px-[30px] bg-white">
          <div className="">
            <p>{children}</p>
          </div>
          <div
            className="absolute top-2 right-4 cursor-pointer"
            onClick={modalClose}
          >
            閉じる
          </div>
        </div>
      </section>
    </>
  );
};

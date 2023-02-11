import "./index.css";
import { useState } from "react";

const Karuta = () => {
  // --- JSX ---

  // const efuda = {
  //   width: "40px",
  //   height: "40px",
  //   backgroundColor: "green",
  // };

  // // 上段の絵札
  // const upperRowEfuda = {
  //   display: "flex",
  //   justifyContent: "space-around",
  //   padding: "90px",
  // };

  // // 中段の絵札
  // const middleRowEfuda = {
  //   display: "flex",
  //   justifyContent: "space-around",
  //   padding: "90px",
  // };

  // // 下段の絵札
  // const lowerRowEfuda = {
  //   display: "flex",
  //   justifyContent: "space-around",
  //   padding: "90px",
  // };

  return (
    <div>
      {/* ゲーム画面のエリア */}
      <div>
        {/* 持っている札の表示エリア */}
        <div className=" fixed right-0 bottom-0 w-20 h-20 rounded-lg bg-yellow-300 text-blue-500 text-5xl text-center leading-normal outline-none  ">
          1
        </div>
        <div className=" fixed left-0 top-0 w-20 h-20 rounded-lg bg-blue-500 text-yellow-300 text-5xl text-center leading-normal outline-none ">
          1
        </div>

        <div className="flex flex-row mt-36 justify-around">
          <div className="efuda">1</div>
          <div className="dfuda">2</div>
          <div className="efuda">3</div>
        </div>

        <div className="flex flex-row mt-24 justify-around">
          <div className="efuda">4</div>
          <div className="efuda">5</div>
          <div className="efuda">6</div>
        </div>

        <div className="flex flex-row mt-24 justify-around">
          <div className="efuda">7</div>
          <div className="efuda">8</div>
          <div className="efuda">9</div>
        </div>

        {/* <div>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
        </div>

        <div>
          <div>6</div>
          <div>7</div>
        </div>

        <div>
          <div>8</div>
          <div>9</div>
          <div>10</div>
          <div>11</div>
          <div>12</div>
        </div> */}

        {/* 読み札の表示エリア */}
        <div></div>
      </div>
      {/* 勝敗画面のエリア 
    <div >
    {/* 合計枚数のエリア 
    <div >
        <button >you"の合計枚数"</button>
        <button >CPU"の合計枚数"</button>
    </div>
    {/* ユーザーの次のアクションを促すエリア 
    <div >
        <button className="">次のページへ</button>
        <button className="">マイページへ</button>
    </div>
    <div className="">
        <big>
        You
        <br />
        win
        </big>
        <big>
        You <br />
        loss
        </big>
        <big>ひきわけ</big>
    </div>
    </div> */}
    </div>
  );
};

export default Karuta;

import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Modal } from "../compornents/Modal";
import { useInterval } from "../compornents/useInterval";

import "../index.css";

const MKaruta = () => {
  //まずはカルタを用意
  const karutaLists = [
    {
      id: "1",
      question: "問題1 git init",
      answer: "1.jpg",
    },
    {
      id: "2",
      question: "問題2 git init",
      answer: "2.jpg",
    },
    {
      id: "3",
      question: "問題3 git init",
      answer: "3.jpg",
    },
    {
      id: "4",
      question: "問題4 git init",
      answer: "4.jpg",
    },
    {
      id: "5",
      question: "問題5 git init",
      answer: "5.jpg",
    },
    {
      id: "6",
      question: "問題6 git init",
      answer: "6.jpg",
    },
    {
      id: "7",
      question: "問題7 git init",
      answer: "7.jpg",
    },
    {
      id: "8",
      question: "問題8 git init",
      answer: "8.jpg",
    },
    {
      id: "9",
      question: "問題9 git init",
      answer: "9.jpg",
    },
  ];

  //useState
  const [yomiLists, setYomiLists] = useState(karutaLists); //読み札管理
  const [efudaLists, setEfudaLists] = useState(yomiLists); //絵札管理
  const [userScore, setUserScore] = useState(0); //ユーザーのスコア管理
  const [cpuScore, setCpuScore] = useState(0); //CPUのスコア管理
  const [isModalOpen, setIsModalOpen] = useState(false); //正誤判定後のモーダル管理
  const [isStarted, setIsStarted] = useState(false); //ゲーム開始ボタンの管理
  const [isKaruta, setIsKaruta] = useState(false); //絵札一覧の表示・非表示の管理
  const [isRunning, setIsRunning] = useState(false);
  const [isAnswered, setIsAnswered] = useState([]); //既に終了している絵札を管理
  const [showQuestion, setShowQuestion] = useState(""); //読み札の表示管理
  const [oneCharactorQuestion, setOneCharactorQuestion] = useState("");
  const [currentTurn, setCurrentTurn] = useState(0); //ターンカウント
  const [userAcquiredCards, setUserAcquiredCards] = useState([]); //ユーザーが取得した絵札の管理
  const [cpuAcquiredCards, setCpuAcquiredCards] = useState([]); //CPUが取得した絵札の管理

  //初期化
  const initGame = () => {
    setUserScore(0);
    setCpuScore(0);
    setUserAcquiredCards([]);
    setCpuAcquiredCards([]);
    setIsAnswered([]);
    setCurrentTurn(0);
    setIsKaruta(false);
    setIsStarted(false);
    setIsModalOpen(false);
  };

  //ゲームスタート
  const startGame = () => {
    setCards();
    setIsStarted(true);
    setIsRunning(true);
  };
  //ローディング画面
  //ゲーム画面に移る
  //データ（カルタオブジェクト）の取得
  //データのランダム選択（問題数分）

  //絵札のシャッフル
  const setCards = () => {
    shuffle(yomiLists);
    const result = shuffle([...yomiLists]);
    setEfudaLists(result);
  };

  //3秒待つ
  // useEffect(() => {
  //   if (!isStarted || currentTurn >= 9) return;
  //   setTimeout(() => {
  //     setIsKaruta(true);
  //     setOneCharactorQuestion(yomiLists[currentTurn].question);
  //     setIsRunning(true);
  //   }, 1000);
  //   // eslint-disable-next-line
  // }, [isStarted, currentTurn]);
  useEffect(() => {
    const delay = currentTurn === 0 ? 3000 : 500;
    if (!isStarted || currentTurn >= 9) return;
    setTimeout(() => {
      setShowQuestion("");
      setOneCharactorQuestion(yomiLists[currentTurn].question);
      setIsRunning(true);
      setIsKaruta(true);
    }, delay);
    // eslint-disable-next-line
  }, [isStarted, currentTurn]);

  //場に対応した読み札を表示（一文字ずつ表示）
  const updateQuestion = () => {
    if (oneCharactorQuestion === "" || isModalOpen) {
      setIsRunning(false);
    } else {
      const letter = oneCharactorQuestion.charAt(0);
      const newQuestion = oneCharactorQuestion.slice(1);
      setOneCharactorQuestion(newQuestion);
      setShowQuestion(showQuestion + letter);
    }
  };

  useInterval(
    () => {
      if (!isKaruta) return;
      updateQuestion();
    },
    isRunning ? 100 : null
  );

  //シャッフル関数
  const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  };
  //正誤判定
  const judge = (clickTarget) => {
    console.log(clickTarget);
    const index = efudaLists.findIndex(
      (efuda) => efuda.id === yomiLists[currentTurn].id
    );
    const newIsAnswerd = isAnswered.slice();
    newIsAnswerd.push(efudaLists[index].id);
    setIsAnswered(newIsAnswerd);
    if (clickTarget.id === yomiLists[currentTurn].id) {
      setUserScore(userScore + 1);

      const tempStorage = efudaLists[index].answer;
      const newAcquiredCard = [...userAcquiredCards];
      newAcquiredCard.push(tempStorage);
      setUserAcquiredCards(newAcquiredCard);
    } else {
      setCpuScore(cpuScore + 1);

      const tempCpuStorage = efudaLists[index].answer;
      const newCpuAcquiredCard = [...cpuAcquiredCards];
      newCpuAcquiredCard.push(tempCpuStorage);
      setCpuAcquiredCards(newCpuAcquiredCard);
    }
  };

  const efudaClick = (e) => {
    judge(e.target);
    modalOpen();
  };

  //問題文の表示
  //モーダルを表示
  const modalOpen = () => {
    setIsModalOpen(true);
  };

  //モーダルを閉じる
  const modalClose = () => {
    if (currentTurn < 8) {
      setIsModalOpen(false);
      setCurrentTurn((prev) => prev + 1);
    } else if (currentTurn === 8) {
      finishGame();
    }
  };

  //勝敗とスコア、ホーム画面へ飛ぶボタンが表示してあるのモーダル表示
  const finishGame = () => {
    setCurrentTurn(currentTurn + 1);
    setIsModalOpen(true);
  };

  return (
    <div>
      <ul>
        <li className="flex justify-end">
          <NavLink
            style={({ isActive }) => (isActive ? { color: "blue" } : undefined)}
            to="/"
          >
            Home
          </NavLink>
        </li>
      </ul>

      <div>
        {!isStarted && (
          <div className="start-screen">
            <button
              className="bg-gray-300 text-3xl"
              onClick={() => startGame()}
            >
              ゲーム開始
            </button>
          </div>
        )}
      </div>
      <div>
        {isKaruta && (
          <div>
            <div className="text-3xl text-center mb-3 bg-gray-300 ">
              <p>{showQuestion}</p>
            </div>
            <div className="fixed left-0 top-0 w-20 h-20 rounded-lg bg-blue-500 text-yellow-300 text-5xl text-center leading-normal outline-none">
              <p>{cpuScore}</p>
              <p className="text-2xl mt-2">{cpuAcquiredCards}</p>
            </div>
            <ul className="flex flex-wrap mt-20 ml-32 ">
              {currentTurn < 9 &&
                efudaLists
                  .filter((answeredElm) => !isAnswered.includes(answeredElm.id))
                  .map((efuda) => (
                    <div className=" mx-24 mb-10 w-40" key={efuda.id}>
                      <img
                        alt="画像"
                        src={`${process.env.PUBLIC_URL}/imgs/${efuda.answer}`}
                        onClick={(e) => efudaClick(e)}
                        id={efuda.id}
                      />
                    </div>
                  ))}
            </ul>
            <div className="fixed right-0 bottom-0 w-20 h-20 rounded-lg bg-yellow-300 text-blue-500 text-5xl text-center leading-normal outline-none">
              <p>{userScore}</p>
              <p className="text-2xl">{userAcquiredCards}</p>
            </div>
          </div>
        )}
        {isModalOpen ? (
          currentTurn < 9 ? (
            <Modal modalClose={modalClose}>問題の解説</Modal>
          ) : (
            <Modal modalClose={initGame}>終わり</Modal>
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );

  // // --- JSX ---

  // // const efuda = {
  // //   width: "40px",
  // //   height: "40px",
  // //   backgroundColor: "green",
  // // };

  // // // 上段の絵札
  // // const upperRowEfuda = {
  // //   display: "flex",
  // //   justifyContent: "space-around",
  // //   padding: "90px",
  // // };

  // // // 中段の絵札
  // // const middleRowEfuda = {
  // //   display: "flex",
  // //   justifyContent: "space-around",
  // //   padding: "90px",
  // // };

  // // // 下段の絵札
  // // const lowerRowEfuda = {
  // //   display: "flex",
  // //   justifyContent: "space-around",
  // //   padding: "90px",
  // // };

  // return (
  //   <div>
  //     {/* ゲーム画面のエリア */}
  //     <div>
  //       {/* 持っている札の表示エリア */}
  //       <div className=" fixed right-0 bottom-0 w-20 h-20 rounded-lg bg-yellow-300 text-blue-500 text-5xl text-center leading-normal outline-none  ">
  //         1
  //       </div>
  //       <div className=" fixed left-0 top-0 w-20 h-20 rounded-lg bg-blue-500 text-yellow-300 text-5xl text-center leading-normal outline-none ">
  //         1
  //       </div>

  //       <div className="flex flex-row mt-36 justify-around">
  //         <div className="w-20 h-20 bg-green-300 border">1</div>
  //         <div className="w-20 h-20 bg-green-300 border">2</div>
  //         <div className="w-20 h-20 bg-green-300 border">3</div>
  //       </div>

  //       <div className="flex flex-row mt-24 justify-around">
  //         <div className="w-20 h-20 bg-green-300 border">4</div>
  //         <div className="w-20 h-20 bg-green-300 border">5</div>
  //         <div className="w-20 h-20 bg-green-300 border">6</div>
  //       </div>

  //       <div className="flex flex-row mt-24 justify-around">
  //         <div className="w-20 h-20 bg-green-300 border">7</div>
  //         <div className="w-20 h-20 bg-green-300 border">8</div>
  //         <div className="w-20 h-20 bg-green-300 border">9</div>
  //       </div>

  //       {/* <div>
  //         <div>1</div>
  //         <div>2</div>
  //         <div>3</div>
  //         <div>4</div>
  //         <div>5</div>
  //       </div>

  //       <div>
  //         <div>6</div>
  //         <div>7</div>
  //       </div>

  //       <div>
  //         <div>8</div>
  //         <div>9</div>
  //         <div>10</div>
  //         <div>11</div>
  //         <div>12</div>
  //       </div> */}

  //       {/* 読み札の表示エリア */}
  //       <div></div>
  //     </div>
  //     {/* 勝敗画面のエリア
  //   <div >
  //   {/* 合計枚数のエリア
  //   <div >
  //       <button >you"の合計枚数"</button>
  //       <button >CPU"の合計枚数"</button>
  //   </div>
  //   {/* ユーザーの次のアクションを促すエリア
  //   <div >
  //       <button className="">次のページへ</button>
  //       <button className="">マイページへ</button>
  //   </div>
  //   <div className="">
  //       <big>
  //       You
  //       <br />
  //       win
  //       </big>
  //       <big>
  //       You <br />
  //       loss
  //       </big>
  //       <big>ひきわけ</big>
  //   </div>
  //   </div> */}
  //   </div>
  // );
};

export default MKaruta;

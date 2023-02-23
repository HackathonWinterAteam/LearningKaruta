import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Modal } from "../compornents/Modal";
import { useInterval } from "../compornents/useInterval";
import { getAllKaruta } from "../compornents/getKaruta";

import "../index.css";

const MKaruta = () => {
  //useState
  const [yomiLists, setYomiLists] = useState([]); //読み札管理
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
  const initialURL = "http://localhost:8000/karuta/1";
  useEffect(() => {
    const fetchKarutaData = async () => {
      let res = await getAllKaruta(initialURL);
      setYomiLists(res);
      console.log(res);
    };
    fetchKarutaData();
  },[])

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
    const delay = currentTurn === 0 ? 1500 : 500;
    if (!isStarted || currentTurn >= 9) return;
    setTimeout(() => {
      setShowQuestion("");
      setOneCharactorQuestion(yomiLists[currentTurn].card_text);
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
      (efuda) => efuda.card_id === yomiLists[currentTurn].card_id
    );
    const newIsAnswerd = isAnswered.slice();
    newIsAnswerd.push(efudaLists[index].card_id);
    setIsAnswered(newIsAnswerd);
    if (clickTarget.card_id == yomiLists[currentTurn].card_id) {
      setUserScore(userScore + 1);

      const tempStorage = efudaLists[index].answer_file_pass;
      const newAcquiredCard = [...userAcquiredCards];
      newAcquiredCard.push(tempStorage);
      setUserAcquiredCards(newAcquiredCard);
    } else {
      setCpuScore(cpuScore + 1);

      const tempCpuStorage = efudaLists[index].answer_file_pass;
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
    if (currentTurn < 9) {
      setIsModalOpen(false);
      setCurrentTurn((prev) => prev + 1);
    } else if (currentTurn === 9) {
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
            <div className="text-center bg-gray-100 h-[52px]">
              <p className="text-3xl py-2">{showQuestion}</p>
            </div>
            <div className="w-full h-[calc(100vh-100px)] text-center m-auto relative">
              <div className="flex absolute left-0 top-0">
                <div className="w-20 h-20 rounded-lg bg-blue-500 text-yellow text-5xl text-center leading-normal outline-none">
                  {cpuScore}
                </div>
                <div className="flex gap-4 flex-grow">
                  {cpuAcquiredCards.map((card) => (
                    <img
                      key={card.id}
                      src={`${process.env.PUBLIC_URL}/imgs/${card}`}
                      alt="画像"
                      className="w-20 object-contain"
                    />
                  ))}
                </div>
              </div>
              <ul className="w-[95%] h-3/5 absolute left-[3%] top-[16%] box-border grid grid-cols-5 grid-rows-2 gap-y-7">
                {currentTurn < 9 &&
                  efudaLists.map((efuda) =>
                    !isAnswered.includes(efuda.id) ? (
                      <div key={efuda.id} className="flex justify-center">
                        <img
                          alt="画像"
                          className="object-contain w-4/5"
                          src={`${process.env.PUBLIC_URL}/imgs/${efuda.answer_file_pass}`}
                          onClick={(e) => efudaClick(e)}
                          id={efuda.id}
                        />
                      </div>
                    ) : (
                      <div>{console.log("this")}</div>
                    )
                  )}
              </ul>
              <div className="flex absolute right-0 bottom-0">
                <div className="flex gap-4 flex-grow">
                  {userAcquiredCards.map((card) => (
                    <img
                      key={card.id}
                      src={`${process.env.PUBLIC_URL}/imgs/${card}`}
                      alt="画像"
                      className="w-20 object-contain"
                    />
                  ))}
                </div>
                <div className="w-20 h-20 rounded-lg bg-yellow text-blue-500 text-5xl text-center leading-normal outline-none">
                  {userScore}
                </div>
              </div>
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
  );};

export default MKaruta;

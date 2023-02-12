import React, { useEffect, useState } from "react";
import { useInterval } from "./useInterval";


const CommandKaruta = () => {
  //まずはカルタを用意
  const karutaLists =
  [
    {
      id: "1",
      question:"問題1",
      answer:"../1.png"
    },
    {
      id: "2",
      question:"問題2",
      answer:"../2.png"
    },
    {
      id: "3",
      question:"問題3",
      answer:"../3.png"
    },
    {
      id: "4",
      question:"問題4",
      answer:"../4.png"
    },
    {
      id: "5",
      question:"問題5",
      answer:"../5.png"
    },
    {
      id: "6",
      question:"問題6",
      answer:"../6.png"
    },
    {
      id: "7",
      question:"問題7",
      answer:"../7.png"
    },
    {
      id: "8",
      question:"問題8",
      answer:"../8.png"
    },
    {
      id: "9",
      question:"問題9",
      answer:"../9.png"
    },
  ]

  //useState
  const [yomiLists, setYomiLists] = useState(karutaLists); //読み札管理
  const [efudaLists, setEfudaLists] = useState(yomiLists); //絵札管理
  const [userScore, setUserScore] = useState(0); //ユーザーのスコア管理
  const [cpuScore, setCpuScore] = useState(0); //CPUのスコア管理
  const [isModalOpen, setModalOpen] = useState(false); //正誤判定後のモーダル管理
  const [isStarted, setIsStarted] = useState(false); //ゲーム開始ボタンの管理
  const [isKaruta, setIsKaruta] = useState(false); //絵札一覧の表示・非表示の管理
  const [isRunning,setIsRunning] = useState(false);
  const [isAnswered, setIsAnswered] = useState([]); //既に終了している絵札を管理
  const [showQuestion, setShowQuestion] = useState(""); //読み札の表示管理
  const [oneCharactorQuestion, setOneCharactorQuestion] = useState("");
  const [currentTurn, setCurrentTurn] = useState(0); //ターンカウント
  const [userAcquiredCards, setUserAcquiredCards] = useState([]); //ユーザーが取得した絵札の管理
  const [cpuAcquiredCards, setCpuAcquiredCards] = useState([]); //CPUが取得した絵札の管理

  //ゲームスタート
  const startGame = () => {
    setCards();
    setIsStarted(true);
    setIsRunning(true);
  }
  //ローディング画面
  //ゲーム画面に移る
  //データ（カルタオブジェクト）の取得
  //データのランダム選択（問題数分）

  //絵札のシャッフル
  const setCards = () => {
    shuffle(yomiLists)
    const result = shuffle([...yomiLists]);
    setEfudaLists(result)
  };

  //3秒待つ
  useEffect(() => {
    if (!isStarted || currentTurn >= 9) return;
    setTimeout(() => {
      setIsKaruta(true);
      setOneCharactorQuestion(yomiLists[currentTurn].question);
      setIsRunning(true);
    }, 1000);
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

  useInterval(() => {
      if (!isKaruta) return;
      updateQuestion();
    },
    isRunning ? 100 : null
  );

  //ユーザーがクリックした札に対する正誤判定

  //スコアの更新

  //正誤判定に対応したモーダルの表示

  //スコア表示
  //取得した（された）絵札を非表示にする

  //モーダルは2秒後に消える

  //次の問題へ移る

  //次の読み札を表示する

  //最終問題までループする

  //勝敗とスコア、ホーム画面へ飛ぶボタンが表示してあるのモーダル表示


  //関数
  //シャッフル関数
  const shuffle=(arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }
  //正誤判定
  const judge = (clickTarget) => {
    console.log(clickTarget);
    const index = efudaLists.findIndex((efuda) => efuda.id === yomiLists[currentTurn].id)
    const isAnswerdCopy = isAnswered.slice();
    isAnswerdCopy.push(efudaLists[index].id);
    setIsAnswered(isAnswerdCopy);
    if(clickTarget.id === yomiLists[currentTurn].id){
      setUserScore(userScore+1);

      const tempStorage = efudaLists[index].answer;
      const acquiredCardCopy = [...userAcquiredCards];
      acquiredCardCopy.push(tempStorage);
      setUserAcquiredCards(acquiredCardCopy);
      console.log("ok");
    }else{
      setCpuScore(cpuScore+1);

      const tempCpuStorage = efudaLists[index].answer;
      const cpuAcquiredCardCopy = [...cpuAcquiredCards];
      cpuAcquiredCardCopy.push(tempCpuStorage);
      setCpuAcquiredCards(cpuAcquiredCardCopy);
      console.log("no");
    }
  }

  const efudaClick = (e) => {
    judge(e.target);
    //次の問題へ
    setCurrentTurn(currentTurn+1);
  }

  //問題文の表示


  return (
    <div>
      <div>
      {!isStarted && (
        <div className="start-screen">
          <button onClick={() => startGame()}>ゲーム開始</button>
        </div>
      )}
      </div>
      <div>
        {isKaruta && (
        <div>
          <div>
            {/* 読み札の表示 */}
          </div>
          <div>
            <p>CPUスコア：{cpuScore}</p>
            <p>取得した札：{cpuAcquiredCards}</p>
          </div>
          <ul className="flex wrap field">
            {currentTurn < 9 &&
              efudaLists
                .filter((answeredElm) => !isAnswered.includes(answeredElm.id))
                .map((efuda) => (
                  <div key={efuda.id}>
                    <button onClick={(e) => efudaClick(e)} id={efuda.id}>
                      {efuda.answer}
                    </button>
                  </div>
                ))}
          </ul>
          <div>
            <p>ユーザースコア：{userScore}</p>
            <p>取得した札：{userAcquiredCards}</p>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default CommandKaruta;

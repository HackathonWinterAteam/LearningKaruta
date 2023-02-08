import React, { useEffect, useState } from "react";

import { useRef } from "react";

const CommandKaruta = () => {
  //まずはカルタを用意

  const karutaLists = [
    {
      id: 1,

      kaminoku: "問題1",

      simonoku: "git 1",

      answer: "../1.png",
    },

    {
      id: 2,

      kaminoku: "問題2",

      simonoku: "git 2",

      answer: "../2.png",
    },

    {
      id: 3,

      kaminoku: "問題3",

      simonoku: "git 3",

      answer: "../3.png",
    },

    {
      id: 4,

      kaminoku: "問題4",

      simonoku: "git 4",

      answer: "../4.png",
    },

    {
      id: 5,

      kaminoku: "問題5",

      simonoku: "git 5",

      answer: "../5.png",
    },

    {
      id: 6,

      kaminoku: "問題6",

      simonoku: "git 6",

      answer: "../6.png",
    },

    {
      id: 7,

      kaminoku: "問題7",

      simonoku: "git 7",

      answer: "../7.png",
    },

    {
      id: 8,

      kaminoku: "問題8",

      simonoku: "git 8",

      answer: "../8.png",
    },

    {
      id: 9,

      kaminoku: "問題9",

      simonoku: "git 9",

      answer: "../9.png",
    },
  ];

  //useState

  const [yomiLists, setYomiLists] = useState(karutaLists); //読み札管理

  const [efudaLists, setEfudaLists] = useState(yomiLists); //絵札管理

  const [getEfuda, setGetEfuda] = useState(0); //取得した絵札を画面右下にセットするための管理

  const [userScore, setUserScore] = useState(0); //ユーザーのスコア管理

  const [cpuScore, setCpuScore] = useState(0); //CPUのスコア管理

  const [showModal, setShowModal] = useState(false); //正誤判定後のモーダル管理

  const [isStarted, setIsStarted] = useState(false); //ゲーム開始ボタンの管理

  const [isKaruta, setIsKaruta] = useState(false); //絵札一覧の表示・非表示の管理

  const [isAnswered, setIsAnswered] = useState(true); //絵札クリックの可否を管理

  const [oneCharactor, setOneCharactor] = useState(""); //読み札の表示管理（1文字ずつ）

  const [currentTurn, setCurrentTurn] = useState(0); //turnカウント

  //ゲームスタート

  const startGame = () => {
    setCards();

    setIsStarted(true);

    setIsKaruta(true);

    readYomifuda(currentTurn);
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

  //絵札の配置

  //3秒待つ

  //場に対応した読み札を表示（一文字ずつ表示）

  const readYomifuda = (currentNum) => {
    let showYomifuda = "";
    if (currentNum < yomiLists.length - 1) showYomifuda = yomiLists[currentNum];

    console.log(showYomifuda);
  };

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

  const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [arr[j], arr[i]] = [arr[i], arr[j]];
    }

    return arr;
  };

  const efudaClick = () => {
    setIsAnswered(true);
  };

  // const readYomifuda = {

  // charactor,

  // readEnd,

  // speed : 100

  // }

  // const yomiElement = useRef();

  // useEffect(() => {

  // //マウント時の処理

  // const charItr = readYomifuda.charactor[Symbol.iterator]();

  // let timerId;

  // (function showChar() {

  // const nextChar = charItr.next();

  // if (nextChar.done) {

  // typeEnd();

  // return;

  // }

  // setText(current => current + nextChar.value);

  // timerId = setTimeout(showChar, readYomifuda.speed);

  // }());

  // // アンマウント時に念のためタイマー解除

  // return () => clearTimeout(timerId);

  // }, []);

  // // レンダリングのたびに表示エリアをスクロールする

  // useEffect(() => {

  // const el = yomiElement.current;

  // if (el.clientHeight < el.scrollHeight) {

  // el.scrollTop = el.scrollHeight - el.clientHeight;

  // }

  // });

  //問題文の表示

  // const oneCharactor = useRef(false);

  // useEffect(() => { // このeffectは初回レンダー時のみ呼ばれるeffect

  // oneCharactor.current = true

  // }, [])

  // useEffect(() => {// 『count』 が更新された場合『と』初回レンダー時に動くeffect

  // if(oneCharactor.current) { // 初回レンダー判定

  // oneCharactor.current = false // もう初回レンダーじゃないよ代入

  // } else {

  // const clueWords = yomiLists[currentTurn].clue

  // const showClue =()=> {

  // if(currentTurn < yomiLists.length-1){

  // setOneCharactor(prev => prev + clueWords[charCount.current]);

  // charCount.current++;

  // }

  // }

  // if (charCount.current <clueWords.length) {

  // let addChar = setTimeout(()=>{showClue(currentTurn)} , 100);

  // return () => clearTimeout(addChar);

  // }

  // }

  // }, [placeholder, isStarted]);

  return (
    <div>
      <div>
        {isStarted ? (
          <button>ゲーム中</button>
        ) : (
          <button onClick={() => startGame()}>ゲーム開始</button>
        )}
      </div>

      <div>
        {isKaruta && (
          <div>
            <div></div>
            <p></p>
          </div>
        )}
      </div>

      <div>
        {isKaruta && (
          <ul>
            {efudaLists.map(({ id, answer }) => {
              return (
                <div key={id}>
                  {isAnswered ? (
                    <button>{answer}</button>
                  ) : (
                    <button onClick={() => efudaClick()}>{answer}</button>
                  )}
                </div>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CommandKaruta;

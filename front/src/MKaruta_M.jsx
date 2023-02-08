import { useState } from "react";

import "./reset.css";
import "./App.css";

// Mkarutaはminoruが試行錯誤用に作ったものです。

// - **データ取得時にカルタがランダムで選出されること**

//読み句、絵札をセット（並べ替え、指定枚数選出）

// - ゲーム開始時にカルタの絵札が**シャッフルされて並べられること**
// - 場に読み札に対応した絵札があること
// - 読み札の上の句が**一文字ずつ表示されること**
//     - 同じ読み札の中で下の句は一気に表示されること
// - **取得した絵札が画面右下に表示されること**（新しく取れた一枚のみ表示、上書きされていく感じ）
// - スコアがカウントされて、ゲーム終了時にスコアが表示されること

// cssは、一度リセットcssで既存のスタイルを消して要素の配置場所を安定できるようにしたほうがいいかも

const MKaruta = () => {
  // CSS

  // 絵札の見た目のベース
  // const baseBox = {
  //   display: "inline-block" /* インラインブロック化 */,
  //   transform: "translate(100%, 100%)",
  //   position: "relative" /* 親要素               */,
  //   overflow: "hidden" /* はみ出しは非表示     */,
  //   margin: "50px" /* BOXの位置(中央寄せ)  */,
  //   width: "240px" /* BOXの横幅            */,
  //   height: "150px" /* BOXの高さ            */,
  //   background: "#fff" /* BOXの背景色          */,
  // };
  // 絵札の見た目の前面
  // const frontStr = {
  //   display: "inline-block" /* インラインブロック化 */,
  //   position: "absolute" /* 親要素からの相対位置 */,
  //   padding: "55px" /* BOX内の余白          */,
  //   border: "2px solid #999" /* BOXの枠線            */,
  //   fontSize: "18pt" /* 前景文字のサイズ     */,
  //   fontWeight: "bold" /* 太字                 */,
  //   textAlign: "center",
  //   top: 0 /* 親要素にサイズにする */,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  // };
  // 絵札の見た目の後面
  // const backStr = {
  //   position: "absolute" /* 親要素からの相対位置 */,
  //   display: "inline-block" /* インラインブロック化 */,
  //   whiteSpace: "nowrap" /* 折り返ししない       */,
  //   fontSize: "100pt" /* 背景透かし文字サイズ */,
  //   fontWeight: "bold" /* 太字                 */,
  //   color: "#FFD700" /* 背景透かし文字色     */,
  //   /* 中心寄せ＆角度       */
  //   top: "50%",
  //   left: "50%",
  //   transform: "translate(-50%, -50%)",
  // };

  const gameArea = {
    backgroundColor: "white",
    position: "relative",
    width: "100%",
    minHeight: "100vh",
  };

  const playerOwnEfudaAera = {
    margin: "0 auto",
    position: "absolute",
    width: "80px",
    height: "70px",
    right: "-5px",
    bottom: 0,
    background: "#F1D772",
    borderRadius: "8px",
    outline: "none",
    color: "#3F4CE2",
    fontSize: "50px",
    textAlign: "center",
    lineHeight: "70px",
  };

  const cpuOwnEfudaAera = {
    margin: "0 auto",
    position: "absolute",
    width: "80px",
    height: "70px",
    left: "-5px",
    top: 0,
    background: "#3F4CE2",
    borderRadius: "8px",
    outline: "none",
    color: "#F1D772",
    fontSize: "50px",
    textAlign: "center",
    lineHeight: "60px",
  };

  const efudaArea = {};

  const yomifudaArea = {};

  // --- データ ---

  const dataLists = [
    {
      name: "minoru",
      age: 19,
    },
    {
      id: 1,
      clue: "By the river, a brown tower stands alone.",
      yomiku: "青タイルが 光るレンガの ミナレット",
      answer: "../images/pictures/001_p.png",
      read: "../sounds/en/001_en.mp3",
      yomu: "../sounds/001_jp.mp3",
      flag: "../images/flags/001_AFG_50.png",
      subject: "Minaret of Jam, Afghanistan",
      area: "asia",
    },
    {
      id: 2,
      clue: "Not a pet. Cats live in the desert.",
      yomiku: "砂漠に暮らす 足裏黒い 元気な猫",
      answer: "../images/pictures/002_p.png",
      read: "../sounds/en/002_en.mp3",
      yomu: "../sounds/002_jp.mp3",
      flag: "../images/flags/028_BRN_50.png",
      subject: "Arabian Sand Cats, Bahrain",
      area: "asia",
    },
    {
      id: 3,
      clue: "Beat drums and carry paper animals in the New Year.",
      yomiku: "新年に はりぼて担ぎ 太鼓打つ",
      answer: "../images/pictures/003_p.png",
      read: "../sounds/en/003_en.mp3",
      yomu: "../sounds/003_jp.mp3",
      flag: "../images/flags/015_BAN_50.png",
      subject: "Pahela Baishakh (Bengali New Year), Bangladesh",
      area: "asia",
    },
  ];

  //  ---useState---

  const [basicLists, setBasicLists] = useState(dataLists); //読句用データ配列（使用札選出済）
  const [isKaruta, setIsKaruta] = useState(false); //絵札一覧の表示・非表示
  const [karutaLists, setKarutaLists] = useState(basicLists); //絵札用データ配列

  const setCards = () => {
    shuffle(basicLists);
    // shuffle(basicLists).splice(0,5)
    const result = shuffle([...basicLists]);
    setKarutaLists(result);
  };

  let yomiku = new Audio();

  const readClue = (currentNum) => {
    if (currentNum < basicLists.length - 1) {
    }
    yomiku.preload = "auto";
    yomiku.loop = false;

    console.log(basicLists);
    console.log(currentNum);
  };

  // --- 関数 ---

  const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  };

  // --- JSX ---

  return (
    <div>
      {/* ゲーム画面のエリア */}
      <div style={gameArea}>
        {/* 持っている札の表示エリア */}
        <div style={playerOwnEfudaAera}>1</div>
        <div style={cpuOwnEfudaAera}>1</div>
        {/* 絵札の表示エリア */}
        <div style={efudaArea}></div>
        {/* 読み札の表示エリア */}
        <div style={yomifudaArea}></div>
      </div>

      {/* 勝敗画面のエリア 
      <div className="resultArea">
        {/* 合計枚数のエリア 
        <div className="totalArea">
          <button className="total">you"の合計枚数"</button>
          <button className="total">CPU"の合計枚数"</button>
        </div>
        {/* ユーザーの次のアクションを促すエリア 
        <div className="nextActionArea">
          <button className="baseButton">次のページへ</button>
          <button className="baseButton">マイページへ</button>
        </div>
        <div className="WinLossResultArea">
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

  //   return (
  //     <>
  //       <button onClick={readClue}>テスト</button>
  //       <div style={baseBox}>
  //         <div style={backStr}>G</div>
  //         <div style={frontStr}>git init</div>
  //       </div>
  //       <div style={baseBox}>
  //         <div style={backStr}>G</div>
  //         <div style={frontStr}>git add</div>
  //       </div>

  //       {/* カルタの獲得枚数を数字で表示する */}
  //       <div style={ownEfuda}>1</div>
  //     </>
  //   );
};

export default MKaruta;

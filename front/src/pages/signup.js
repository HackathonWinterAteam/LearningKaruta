import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
import { useAuthContext } from "../context/AuthContext";

function Signup() {
  const { signup, ErrorMessage } = useAuthContext();
  // 認証用の記述
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    signup({
      user_name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  };

  // スタイルの定義
  const styleRoot = "Login container justify-center md:3/5 lg:w-1/5 xl:w-2/5 mx-auto mt-16 text-paleBlack";
  const styleHeader = "h-20 justify-center text-3xl";
  // const styleMain = "rounded-md";
  const styleRow = "flex flow-root";
  const styleInputLabel = "block text-lg text-black";
  const styleInput =
    "border rounded-md b w-full p-2 text-lg text-black";
  const styleBtn =
    "p-2 w-full my-8 rounded-lg bg-lightBlue hover:opacity-80 " +
    "text-teal-50 text-lg  font-black";

  const smallBtn =
    "ml-5 w-40" +
    "text-teal-50 text-lg text-darkBlue ";
  const h2styel="mx-5 my-2"

  // JSX
  return (
    <div className={styleRoot}>
      <header className={styleHeader}>
        <h1 className="text-center">ユーザー登録</h1>
      </header>
  
      <main className="justify-center w-full h-auto">
      <div className="flex justify-center w-full h-auto mb-10">
      <p className="text-base">アカウントをお持ちですか？</p>
        <button className={smallBtn} onClick={() => navigate("/login")}>
          ログイン
        </button>
      </div>

        <form onSubmit={handleSubmit}>
          <div className={styleRow}>
            <label htmlFor="name" className={styleInputLabel}></label>

            <input
              id="name"
              name="user_name"
              ref={nameRef}
              className={styleInput}
              placeholder="お名前"
            />
          </div>
          <div className={styleRow}>
            <label htmlFor="email" className={styleInputLabel}></label>
            <input
              type="email"
              id="email"
              name="email"
              ref={emailRef}
              autoComplete="email"
              required
              className={styleInput}
              placeholder="メールアドレス"
            />
          </div>
          <div className={styleRow}>
            <label htmlFor="password" className={styleInputLabel}></label>
            <input
              type="password"
              id="password"
              name="password"
              ref={passwordRef}
              placeholder="パスワード"
              className={styleInput}
              autoComplete="current-password"
              required
            />
          </div>
          <div>
            {ErrorMessage && <p>{ErrorMessage}</p>}
          </div>
          <div className="">
            <button type="submit" className={styleBtn}>
              ユーザー登録
            </button>
          </div>
        </form>
      </main>
      <div className="flex justify-center w-full h-auto mt-8">
      <NavLink to="/" className="GradationYellowbtn font-body font-bold ">
              ホームに戻る
        </NavLink>
      </div>

    </div>
  );
}

export default Signup;

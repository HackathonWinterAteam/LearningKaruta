import { useRef } from "react";
import { useNavigate } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
import { useAuthContext } from "../context/AuthContext";

function Signup() {
  const { signup } = useAuthContext();
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
  const styleRoot = "Login container md:3/5 lg:w-1/5 xl:w-2/5 mx-auto";
  const styleHeader = "h-20 flex justify-center items-center text-3xl";
  const styleMain = "p-3 rounded-md";
  const styleRow = "p-3 flex flow-root";
  const styleInputLabel = "block pb-1 text-lg text-black";
  const styleInput =
    "border rounded-md b w-full p-2 text-lg text-black";
  const styleBtn =
    "p-2 w-full rounded-lg bg-lightBlue hover:opacity-80 " +
    "text-teal-50 text-lg  font-black";

  const smallBtn =
    "ml-5 py-2 px-5 w-40 rounded-lg bg-lightBlue hover:opacity-80 " +
    "text-teal-50 text-lg font-black";
  const h2styel="mx-5 my-2"

  // JSX
  return (
    <div className={styleRoot}>
      <header className={styleHeader}>
        <h1 className="text-center">ユーザー登録</h1>
      </header>
      <main className={styleMain}>
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
          <div className={styleRow}>
            <button type="submit" className={styleBtn}>
              ユーザー登録
            </button>
          </div>
        </form>
      </main>
      <>
        <h2 className={h2styel}>アカウントをお持ちですか？</h2>
        <button className={smallBtn} onClick={() => navigate("/login")}>
          ログイン

          
        </button>
      </>
    </div>
  );
}

export default Signup;

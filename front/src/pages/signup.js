import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Signup() {
  const { signup } = useAuth();
  // 認証用の記述
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    signup({
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  };

  // スタイルの定義
  const styleRoot = "Login container md:3/5 lg:w-3/6 xl:w-2/5 ";
  const styleHeader = "h-20 flex justify-center items-center text-3xl";
  const styleMain = "border border-emerald-400 p-5 rounded-md";
  const styleRow = "p-5 flex flow-root";
  const styleInputLabel = "block pb-1 text-lg text-emerald-700";
  const styleInput =
    "border rounded-md border-emerald-500 w-full p-2 text-lg text-emerald-900";
  const styleBtn =
    "p-2 w-full rounded-lg bg-emerald-400 hover:opacity-80 " +
    "text-teal-50 text-lg hover:border-emerald-500 hover:ring-2 font-black";

  const smallBtn =
    "m-2 p-1 w-32 rounded-lg bg-emerald-400 hover:opacity-80 " +
    "text-teal-50 text-lg hover:border-emerald-500 hover:ring-2 font-black";

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
              name="name"
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
        <h2>アカウントをお持ちですか？</h2>
        <button className={smallBtn} onClick={() => navigate("/login")}>
          ログイン
        </button>
      </>
    </div>
  );
}

export default Signup;

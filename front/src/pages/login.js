import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
import { useAuthContext } from "../context/AuthContext";
import axios   from "../utils/axios";
import qs from "qs";

// import { useCookies } from "react-cookie";

axios.defaults.withCredentials = true;

const FormData = () => {

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      grant_type: "password",
      username: username,
      password: password,
      client_id: "your_client_id",
      client_secret: "your_client_secret"
    };
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      credentials: "include"
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/users/signin",
        qs.stringify(data),
        config
      );
      
      
      console.log(response.data);
      console.log(response.data.access_token);
      // login_set(response.data.access_token, response.data.refresh_token);


      if (response.data.access_token) {
        return console.log('ログイン済み')
        ;
      }
    
    } catch (error) {
      console.error(error);
    }
  };

  

  // スタイルの定義
  const styleRoot = "Login container md:3/5 lg:w-3/6 xl:w-2/5 mx-auto";
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
        <h1 className="text-center">ログイン</h1>
      </header>
      <main className={styleMain}>
        <form onSubmit={handleSubmit}>
          <div className={styleRow}>
            <label htmlFor="email" className={styleInputLabel}></label>
            <input
              type="email"
              id="email"
              name="email"
              ref={emailRef}
              // value={formValues.username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="メールアドレス"
              className={styleInput}
              autoComplete="email"
              required
            />
          </div>
          <div className={styleRow}>
            <label htmlFor="password" className={styleInputLabel}></label>
            <input
              type="password"
              id="password"
              name="password"
              ref={passwordRef}
              // value={formValues.email}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="パスワード"
              className={styleInput}
              autoComplete="current-password"
              required
            />
          </div>
          <div className={styleRow}>
            <button type="submit" className={styleBtn}>
              ログイン
            </button>
          </div>
        </form>
      </main>
      <>
        <h2>アカウントをお持ちでないですか？</h2>
        <button className={smallBtn} onClick={() => navigate("/signup")}>
          ユーザー登録
        </button>
      </>
    </div>
    
  );

};

export default FormData;

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
  const styleRoot = "Login container md:3/5 lg:w-1/5 xl:w-2/5 mx-auto font-body";
  const styleHeader = "mt-12 mb-4 flex justify-center items-center";
  const styleMain = "p-3 rounded-md";
  const styleRow = "p-3 flex flow-root";
  const styleInputLabel = "block pb-1 text-lg text-black";
  const styleInput =
    "border rounded-md border-yellow w-full p-2 text-lg text-black";
  const styleBtn =
    "p-2 w-full rounded-lg bg-yellow hover:opacity-80 " +
    "text-teal-50 text-lg  font-black";

  const smallBtn =
    "ml-5 py-2 px-5 w-40 rounded-lg bg-yellow hover:opacity-80 " +
    "text-teal-50 text-lg font-black";
  const h2Styel="mx-5 my-2"

  // JSX
  return (
    <div className={styleRoot}>
      <div className=""></div>
      <header className={styleHeader}>
        <h1 className="text-center text-4xl">ログイン</h1>
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
      <>
        <h2 className={h2Styel}>アカウントをお持ちでないですか？</h2>
        <button className={smallBtn} onClick={() => navigate("/signup")}>
          ユーザー登録
        </button>
      </>
      </main>
    </div>
    
  );

};

export default FormData;

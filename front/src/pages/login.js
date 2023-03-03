import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
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
  const [ErrorMessage, setErrorMessage] = useState("");

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

      if (response.data.user_name) {
        console.log('ログイン済み');
        navigate("/home_true");
      }
    } catch (error) {
      const errorMessage = error.response.data;
      if (errorMessage.detail === "Could not validate credentials") {

        setErrorMessage("メールアドレスまたはパスワードが違います");
        return ErrorMessage
      }
      else if (errorMessage.detail === "このメールアドレスは登録されていません") {
        setErrorMessage("このメールアドレスは登録されていません")
        return ErrorMessage
      }
  };
};

  

  const styleRoot = "Login container :3/5 lg:w-1/5 xl:w-2/5 mx-auto mt-16 text-paleBlack";
  const styleHeader = "h-20 justify-center items-center text-3xl";
  // const styleMain = "rounded-md";
  const styleRow = "flex flow-root";
  const styleInputLabel = "block text-lg text-black";
  const styleInput =
    "border rounded-md b w-full p-2 text-lg text-black";
  const styleBtn =
    "p-2 w-full mt-8 rounded-lg bg-lightBlue hover:opacity-80 " +
    "text-teal-50 text-lg  font-black";

  const smallBtn =
    "ml-5 w-40" +
    "text-teal-50 text-lg text-darkBlue ";
  const h2styel="mx-5 my-2"

  // JSX
  return (
    <div className={styleRoot}>
      <div className=""></div>
      <header className={styleHeader}>
        <h1 className="text-center text-4xl">ログイン</h1>
      </header>
      <main className="">
        <div className="flex justify-center w-full h-auto mb-10">
        <p className="text-base">アカウントをお持ちでないですか？</p>
        <button className={smallBtn} onClick={() => navigate("/signup")}>
          ユーザー登録
        </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styleRow}>
            <label htmlFor="email" className={styleInputLabel}></label>
            <input
              type="email"
              id="email"
              name="email"
              ref={emailRef}
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
          <div>
            { ErrorMessage && <p>{ErrorMessage}</p>}
          </div>
        </form>

        <div className="flex justify-center w-full h-auto mt-8">
      <NavLink to="/" className="GradationYellowbtn font-body font-bold ">
              ホームに戻る
        </NavLink>
      </div>
      </main>
    </div>
    
  );

};

export default FormData;

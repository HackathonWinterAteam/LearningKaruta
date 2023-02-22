import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
import axios   from "../utils/axios";
import qs from "qs";

const FormData = () => {
  // const [formValues, setFormValues] = useState({
  //   username: "",
  //   password: "",
  // });

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormValues({ ...formValues, [name]: value });
  // };

// const Login = () => {
  // const { login } = useAuth();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   login({
  //     email: emailRef.current.value,
  //     password: passwordRef.current.value,
  //   });
  // };
    /*window.location.href = `http://localhost:8000/users/signin/grant_type=&username=${emailRef}&password=${passwordRef}&scope=&client_id=&client_secret='
    `; */
  //   console.log(emailRef.current.value, passwordRef.current.value)
  
  // };
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
      }
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/users/signin",
        qs.stringify(data),
        config
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
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
          {/* <div className={styleRow}>
            <div><a href="#">パスワードを忘れた方</a></div>
          </div> */}
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


// export default function FormData() {
//   const navigate = useNavigate();
//   const smallBtn =
//     "m-2 p-1 w-32 rounded-lg bg-emerald-400 hover:opacity-80 " +
//     "text-teal-50 text-lg hover:border-emerald-500 hover:ring-2 font-black";

//   const [formValues, setFormValues] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormValues({ ...formValues, [name]: value });
//   };

//   return (
//     <main>
//     <form>
//       <input type="text" name="name" value={formValues.name} onChange={handleChange} />
//       <input type="email" name="email" value={formValues.email} onChange={handleChange} />
//     </form>
    
//     <button className={smallBtn} onClick={() => navigate("/")}>
//      login
//     </button>
//     </main>
//   );
// }
function Login() {
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

  return (
    <div className={styleRoot}>
      <header className={styleHeader}>
        <h1 className="text-center">ログイン画面</h1>
      </header>
      <main className={styleMain}>
        <form action="#" method="POST">
          <div className={styleRow}>
            <label htmlFor="email" className={styleInputLabel}></label>
            <input
              id="email"
              placeholder="メールアドレス"
              className={styleInput}
              name="email"
              type="email"
              autoComplete="email"
              required
            />
          </div>
          <div className={styleRow}>
            <label htmlFor="password" className={styleInputLabel}></label>
            <input
              id="password"
              placeholder="パスワード"
              className={styleInput}
              name="password"
              type="password"
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
    </div>
  );
}

export default Login;

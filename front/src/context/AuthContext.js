import { createContext, useContext, useState, useEffect } from 'react';
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
// AuthContextの作成
const AuthContext = createContext();

// useAuthContextの定義
export const useAuthContext = ()  => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children })  => {

  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [ErrorMessage, setErrorMessage] = useState("");

// サインアップ関数
  const signup = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/users/register",
        data
      );
      console.log(response.data);
      navigate("/login");
      return "会員登録しました"
    } catch (error) {
      const errorMessage = error.response.data;
      if (errorMessage.detail == "既に登録されているメールアドレスです"){
      setErrorMessage(errorMessage.detail)
      }
    }
  };

// 認証関数
  const  getUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/users/me");
      setUser(response.data)
      console.log(response.data)
    } catch (error) {
      const errorMessage = error.response.data;
      if (errorMessage.detail === "トークン有効期限切れ") {
        const responseRefresh = await axios.get("http://localhost:8000/refresh_token");
        setUser(responseRefresh.data);
      }
    }
  };

// ログアウト関数
  const logout = () => {
    const logout = axios.put("http://localhost:8000/signout");
    logout();
    setUser(null)
    return user
  };

// 編集
const edit = async (data) => {

    const user_id = user.user_id;
    const response = await axios.put(
      "http://localhost:8000/user_update/{user_id}",
      data
    );
    console.log(response.data);
    navigate("/home_true");
    return "会員情報を編集しました"

};


  const value = {
    user,
    getUser,
    signup,
    ErrorMessage,
    edit,
    logout
  };

  return (<AuthContext.Provider value={value}>
    {children}
    </AuthContext.Provider>);
};

export default AuthProvider;
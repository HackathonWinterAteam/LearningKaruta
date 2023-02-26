import { createContext, useContext, useState } from 'react';
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

// AuthContextの作成
const AuthContext = createContext();

// useAuthContextの定義
export const useAuthContext = ()  => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children })  => {
//   const { user, signup } = useAuth();

  const [user, setUser] = useState();
  const navigate = useNavigate();

// サインアップ関数
  const signup = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/users/register",
        data
      );
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    return "会員登録しました";
  };

// ユーザー取得関数
  const getUser = async () => {

    try {
      const response = await axios.get("http://localhost:8000/users/me");
      setUser(response.data.users);
    } catch (error) {
        const errorMessage = error.message;
        if (errorMessage.includes("トークン有効期限切れ")){
            const responce_refresh = await axios.get("http://localhost:8000/refresh_token");
            setUser(responce_refresh.data.users)
        }
    }
    return user;
  };

  const value = {
    getUser,    
    signup
  };

  return (<AuthContext.Provider value={value}>
    {children}
    </AuthContext.Provider>);
};

export default AuthProvider;
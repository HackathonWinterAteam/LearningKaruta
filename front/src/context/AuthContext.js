import { createContext, useContext, useState } from 'react';
// import useAuth from '../hooks/useAuth'; 
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuthContext = ()  => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children })  => {
//   const { user, signup } = useAuth();

  const [user, setUser] = useState();
  const navigate = useNavigate();


const a_token_row = document.cookie
  .split('; ')
  .find(row => row.startsWith('access_token='));
const a_token = a_token_row ? a_token_row.split('=')[1] : '';

const r_token_row = document.cookie
  .split('; ')
  .find(row => row.startsWith('refresh_token='));
const r_token = r_token_row ? r_token_row.split('=')[1] : '';


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

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/users/me",{
        headers: {
          'Authorization': `Bearer ${a_token}`
        }
      });
      const user_data = response.data.user;
      setUser(user_data);
    } catch (error) {
      const errorMessage = error.message;
      if (errorMessage.includes("トークン有効期限切れ")){
        const response_refresh = await axios.get("/refresh_token",{
          headers: {
            'Authorization': `Bearer ${r_token}`
          }
        });
        const user_data = response_refresh.data.user;
        setUser(user_data);
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
import { useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie"
// import Cookies from "js-cookie";

axios.defaults.withCredentials = true;


const a_token = document.cookie
.split('; ')
.find(row => row.startsWith('access_token='))
.split('=')[1];

console.log(a_token);

const r_token = document.cookie
.split('; ')
.find(row => row.startsWith('refresh_token='))
.split('=')[1];



const useAuth = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();

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
  };



  // const getTokenFromCookie = () => {
  //   const a_token = Cookies.get('access_token');
  //   const r_token = Cookies.get('refresh_token');
  //   return { a_token, r_token };
  // };

  // const { a_token, r_token } = getTokenFromCookie();

  // APIを叩いて取得したユーザーを状態に保存
  const getUser = async () => {
    try {
      const response = await axios.get("/users/me",{
        headers: {
          'Authorization': `Bearer ${a_token}`
        }
      });
      const user = response.data.user;
      setUser(user);
    } catch (error) {
      const errorMessage = error.message;
      if (errorMessage.includes("トークン有効期限切れ")){
        const response_refresh = await axios.get("/refresh_token",{
          headers: {
            'Authorization': `Bearer ${r_token}`
          }
        });
        const user = response_refresh.data.user;
        setUser(user);
      }
    }
  };

  // const [cookies, setCookie, removeCookie] = useCookies(["access_token", "refresh_token"]);
  // const [accessToken, setAccessToken] = useState(cookies.access_token || null);
  // const [refreshToken, setRefreshToken] = useState(cookies.access_token || null);

  // const login_set = (accessToken,refreshToken) => {
  //   setCookie("access_token", accessToken /*, { httpOnly: true }*/);
  //   setAccessToken(accessToken);
  //   setCookie("refresh_token", refreshToken /*, { httpOnly: true }*/);
  //   setRefreshToken(refreshToken);
  // };

  // const logout = () => {
  //   removeCookie("access_token", { path: "/" });
  //   removeCookie("refresh_token", { path: "/" });
  //   setAccessToken(null);
  //   setRefreshToken(null);
  // };


  return { user, signup };
};

export default useAuth;

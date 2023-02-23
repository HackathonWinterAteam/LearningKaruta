import { useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie"

axios.defaults.withCredentials = true;

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

  // const login = async (data) => {
  //   try {
  //     await axios.post("http://localhost:8000/users/signin", data,
  //     { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  //     // {
  //     //   grant_type: '',
  //     //   username: emailRef,
  //     //   password: passwordRef,
  //     //   scope: '',
  //     //   client_id: '',
  //     //   client_secret: '',
  //     // }
  //     );
  //     await getUser();
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getUser = async () => {
    try {
      const response = await axios.get("/users/me");
      const user = response.data.user;
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  const [cookies, setCookie, removeCookie] = useCookies(["access_token", "refresh_token"]);

  const [accessToken, setAccessToken] = useState(cookies.access_token || null);

  const [refreshToken, setRefreshToken] = useState(cookies.access_token || null);



  const login_set = (accessToken,refreshToken) => {
    setCookie("access_token", accessToken /*, { httpOnly: true }*/);
    setAccessToken(accessToken);
    setCookie("refresh_token", refreshToken /*, { httpOnly: true }*/);
    setRefreshToken(refreshToken);
  };

  // const login_r_set = (refreshToken) => {
  //   setCookie("refresh_token", refreshToken, { path: undefined });
  //   setRefreshToken(refreshToken);
  // };



  const logout = () => {
    removeCookie("access_token", { path: "/" });
    removeCookie("refresh_token", { path: "/" });
    setAccessToken(null);
    setRefreshToken(null);
  };


  return [ accessToken, refreshToken, login_set, user, signup, logout ];
};

export default useAuth;

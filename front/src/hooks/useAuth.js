import { useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie"

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

  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);

  const [accessToken, setAccessToken] = useState(cookies.access_token || null);

  const login_set = (accessToken) => {
    setCookie("access_token", accessToken, { path: undefined });
    setAccessToken(accessToken);
  };

  const logout = () => {
    removeCookie("access_token", { path: "/" });
    setAccessToken(null);
  };


  return [ accessToken, login_set, user, signup, logout ];
};

export default useAuth;
